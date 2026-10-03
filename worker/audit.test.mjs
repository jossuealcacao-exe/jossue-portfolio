import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { normalizeSite } from './audit.mjs';
import { handleRequest } from './index.mjs';
import { d1 } from './test-d1.mjs';

const ORIGIN = 'https://jossuealcala.com';
const APEX = 'https://apex.jossuealcala.com';

function environment(overrides = {}) {
	const emails = [];
	return {
		DB: d1(),
		emails,
		APEX_TOKEN: 'apex_test_token',
		RATE_LIMIT_SALT: 'salt',
		ALLOWED_ORIGINS: ORIGIN,
		CONTACT_EMAIL_TO: 'owner@example.com',
		CONTACT_EMAIL: { send: async (message) => emails.push(message) },
		ASSETS: { fetch: async () => new Response('asset') },
		...overrides,
	};
}

/** APEX simulado: create → id; report → lo que diga `state()`. Registra cada llamada. */
function mockApex({ create = () => ({ status: 202, body: { audit: { id: 'AUD-0000000001', status: 'queued' }, created: true } }), report = () => ({ status: 200, body: { id: 'AUD-0000000001', status: 'running' } }) } = {}) {
	const calls = [];
	const original = globalThis.fetch;
	globalThis.fetch = async (url, init = {}) => {
		const target = String(url);
		calls.push({ url: target, method: init.method ?? 'GET', headers: init.headers ?? {}, body: init.body ? JSON.parse(init.body) : null });
		if (target === `${APEX}/v1/chat-audits` && init.method === 'POST') {
			const out = create();
			return new Response(JSON.stringify(out.body), { status: out.status });
		}
		if (target.startsWith(`${APEX}/v1/chat-audits/`)) {
			const out = report();
			return new Response(JSON.stringify(out.body), { status: out.status });
		}
		throw new Error(`fetch inesperado ${target}`);
	};
	return { calls, restore: () => (globalThis.fetch = original) };
}

const visitor = { sid: 'sesion-a', locale: 'es', page: '/es/', name: 'Ana López', email: 'ana@tienda.mx', url: 'tienda.mx', consent: true };

function create(env, body = {}, ip = '203.0.113.20') {
	return handleRequest(new Request(`${ORIGIN}/api/audit`, { method: 'POST', headers: { Origin: ORIGIN, 'Content-Type': 'application/json', 'CF-Connecting-IP': ip }, body: JSON.stringify({ ...visitor, ...body }) }), env);
}

function status(env, id, sid = visitor.sid) {
	return handleRequest(new Request(`${ORIGIN}/api/audit/${id}?sid=${sid}`, { headers: { Origin: ORIGIN } }), env);
}

// Para que la siguiente consulta sí vaya a APEX (se consulta a lo mucho cada 4 s).
const age = (env, ms = 5000) => env.DB.raw.prepare('UPDATE ai_audits SET updated_at = updated_at - ?').run(ms);

test('only public sites with a real domain are accepted', () => {
	assert.deepEqual(normalizeSite('tienda.mx'), { url: 'https://tienda.mx/', domain: 'tienda.mx' });
	assert.deepEqual(normalizeSite('https://www.WU-Nutrition.com/productos?x=1#a'), { url: 'https://www.wu-nutrition.com/productos?x=1', domain: 'wu-nutrition.com' });
	for (const bad of ['', 'localhost', 'http://localhost:3000', 'http://127.0.0.1', 'http://192.168.1.10', 'http://[::1]/', 'http://intranet', 'https://router.local', 'https://admin.internal', 'http://user:pass@tienda.mx', 'https://tienda.mx:8443', 'javascript:alert(1)', 'ftp://tienda.mx']) {
		assert.equal(normalizeSite(bad), null, `aceptó: ${bad}`);
	}
});

test('asks for consent, a name, a real email and a valid site before calling APEX', async () => {
	const apex = mockApex();
	try {
		const env = environment();
		for (const [body, error] of [[{ consent: false }, 'consent_required'], [{ email: 'no-es-correo' }, 'invalid_email'], [{ name: '' }, 'invalid_name'], [{ url: 'http://localhost' }, 'invalid_url']]) {
			const response = await create(env, body);
			assert.equal(response.status, 400);
			assert.equal((await response.json()).error, error);
		}
		assert.equal(apex.calls.length, 0);
		assert.equal((await create(environment({ APEX_TOKEN: undefined }))).status, 503);
	} finally {
		apex.restore();
	}
});

test('the full path: request, progress, the 3 areas, the report link and one email to Jossué', async () => {
	let state = 'running';
	const apex = mockApex({
		report: () =>
			state === 'running'
				? { status: 200, body: { id: 'AUD-0000000001', status: 'running' } }
				: {
						status: 200,
						body: {
							id: 'AUD-0000000001',
							status: 'ready_for_review',
							health: 62.4,
							findings: [
								{ title: 'La portada tarda 4.1 s en mostrar lo principal en celular', category: 'velocidad', severity: 'high', business_effect: 'Se pierde gente antes de ver el producto.', recommendation: 'Comprimir y diferir las imágenes del carrusel.', effort: 'bajo' },
								{ title: 'El botón de compra no se ve sin bajar', category: 'conversión', severity: 'medium', business_effect: 'Menos clics a comprar.', recommendation: 'Subir el botón.', effort: 'bajo' },
								{ title: 'Sin datos estructurados de producto', category: 'seo', severity: 'low', business_effect: 'Menos visibilidad en Google.', recommendation: 'Agregar Product schema.', effort: 'medio' },
								{ title: 'Un cuarto que no debe salir', severity: 'low' },
							],
							report_url: `${APEX}/informe/tienda/abc123`,
							pdf_url: `${APEX}/informe/tienda/abc123.pdf`,
						},
					},
	});
	try {
		const env = environment();
		const created = await create(env);
		assert.equal(created.status, 202);
		const audit = await created.json();
		assert.match(audit.id, /^AE-[a-f0-9]{20}$/);
		assert.equal(audit.status, 'running');
		const [call] = apex.calls;
		assert.equal(call.headers.Authorization, 'Bearer apex_test_token');
		assert.equal(call.headers['Idempotency-Key'], audit.id);
		assert.deepEqual(call.body, { url: 'https://tienda.mx/', idempotency_key: audit.id, requester: { name: 'Ana López', email: 'ana@tienda.mx' }, consent: true, locale: 'es' });
		// También queda como recado, pero el correo a Jossué sale hasta que termina.
		assert.equal(env.DB.raw.prepare("SELECT need FROM ai_leads WHERE email = 'ana@tienda.mx'").get().need, 'Auditoría express de tienda.mx');
		assert.equal(env.emails.length, 0);

		age(env);
		assert.equal((await (await status(env, audit.id)).json()).status, 'running');
		state = 'ready';
		age(env);
		const done = await (await status(env, audit.id)).json();
		assert.equal(done.status, 'done');
		assert.equal(done.score, 62);
		assert.equal(done.findings.length, 3, 'solo 3 áreas');
		assert.equal(done.findings[0].severity, 'high');
		assert.equal(done.report_url, undefined, 'the visitor does not get the full report');
		assert.equal(done.pdf_url, undefined, 'nor the PDF');
		assert.equal(env.DB.raw.prepare('SELECT report_url FROM ai_audits').get().report_url, `${APEX}/informe/tienda/abc123`, 'the link stays for Jossué');
		assert.equal(env.emails.length, 1);
		assert.match(env.emails[0].subject, /^Auditoría · Ana López · tienda\.mx · 62\/100$/);
		assert.equal(env.emails[0].replyTo.email, 'ana@tienda.mx');
		assert.match(env.emails[0].text, /La portada tarda 4\.1 s/);
		assert.match(env.emails[0].text, /Informe: https:\/\/apex\.jossuealcala\.com\/informe\/tienda\/abc123/);
		// Ya terminada, no vuelve a consultar a APEX ni a mandar correo.
		const callsBefore = apex.calls.length;
		age(env);
		await status(env, audit.id);
		assert.equal(apex.calls.length, callsBefore);
		assert.equal(env.emails.length, 1);
	} finally {
		apex.restore();
	}
});

test('only the chat session that asked can read the audit', async () => {
	const apex = mockApex();
	try {
		const env = environment();
		const audit = await (await create(env)).json();
		assert.equal((await status(env, audit.id, 'otra-sesion')).status, 404);
		assert.equal((await status(env, 'AE-00000000000000000000')).status, 404);
	} finally {
		apex.restore();
	}
});

test('links that do not come from APEX are dropped', async () => {
	const apex = mockApex({ report: () => ({ status: 200, body: { status: 'ready_for_review', health: 70, findings: [{ title: 'Algo', severity: 'low' }], report_url: 'https://evil.example/phish', pdf_url: 'javascript:alert(1)' } }) });
	try {
		const env = environment();
		const audit = await (await create(env)).json();
		age(env);
		const done = await (await status(env, audit.id)).json();
		assert.equal(done.status, 'done');
		assert.equal(env.DB.raw.prepare('SELECT report_url, pdf_url FROM ai_audits').get().report_url, null);
		assert.equal(env.DB.raw.prepare('SELECT report_url, pdf_url FROM ai_audits').get().pdf_url, null);
	} finally {
		apex.restore();
	}
});

test('the same person asking again for the same site gets the same audit', async () => {
	const apex = mockApex();
	try {
		const env = environment();
		const first = await (await create(env)).json();
		const again = await (await create(env, { sid: 'sesion-b' })).json();
		assert.equal(again.id, first.id);
		assert.equal(again.reused, true);
		assert.equal(apex.calls.filter((call) => call.method === 'POST').length, 1);
		assert.equal((await status(env, first.id, 'sesion-b')).status, 200, 'la sesión nueva ya puede leerla');
	} finally {
		apex.restore();
	}
});

test('limits per IP, per domain and per day protect APEX and your inbox', async () => {
	const apex = mockApex();
	try {
		const env = environment();
		for (let index = 0; index < 3; index += 1) assert.notEqual((await create(env, { email: `p${index}@x.mx`, url: `sitio${index}.mx` })).status, 429);
		const fourth = await create(env, { email: 'p9@x.mx', url: 'otro.mx' });
		assert.equal(fourth.status, 429);
		assert.equal((await fourth.json()).error, 'limit_ip');

		await create(env, { email: 'a@a.mx', url: 'mismo.mx' }, '198.51.100.1');
		await create(env, { email: 'b@b.mx', url: 'mismo.mx' }, '198.51.100.2');
		const third = await create(env, { email: 'c@c.mx', url: 'mismo.mx' }, '198.51.100.3');
		assert.equal((await third.json()).error, 'limit_domain');

		const capped = environment({ AUDITS_PER_DAY: '1' });
		await create(capped, { email: 'uno@x.mx', url: 'uno.mx' }, '198.51.100.7');
		const over = await (await create(capped, { email: 'dos@x.mx', url: 'dos.mx' }, '198.51.100.8')).json();
		assert.equal(over.status, 'rejected');
		assert.match(over.error, /muchas auditorías/);
		assert.equal(capped.emails.length, 1, 'Jossué recibe el contacto para mandarla a mano');
	} finally {
		apex.restore();
	}
});

test('if APEX refuses or takes too long, the visitor is told and Jossué gets the lead', async () => {
	const down = mockApex({ create: () => ({ status: 503, body: { error: { code: 'unavailable' } } }) });
	try {
		const env = environment();
		const failed = await (await create(env)).json();
		assert.equal(failed.status, 'failed');
		assert.match(failed.error, /Jossué ya tiene tus datos/);
		assert.equal(env.emails.length, 1);
		assert.match(env.emails[0].subject, /^Auditoría · Ana López · tienda\.mx · sin terminar$/);
	} finally {
		down.restore();
	}
	const slow = mockApex();
	try {
		const env = environment();
		const audit = await (await create(env)).json();
		env.DB.raw.prepare('UPDATE ai_audits SET created_at = created_at - ?').run(9 * 60_000);
		const late = await (await status(env, audit.id)).json();
		assert.equal(late.status, 'failed');
		assert.match(late.error, /tardó más de lo normal/);
		assert.equal(env.emails.length, 1);
	} finally {
		slow.restore();
	}
});

test('an email that does not go out is not recorded as sent', async () => {
	const down = mockApex({ create: () => ({ status: 503, body: { error: { code: 'unavailable' } } }) });
	try {
		const env = environment({ CONTACT_EMAIL: { send: async () => { throw new Error('destination address not verified'); } } });
		const failed = await (await create(env)).json();
		assert.equal(failed.status, 'failed', 'the visitor still gets an answer');
		assert.equal(env.DB.raw.prepare('SELECT notified_at FROM ai_audits').get().notified_at, null);
	} finally {
		down.restore();
	}
});

test('a site that asks robots not to crawl it gets an honest message', async () => {
	const apex = mockApex({ report: () => ({ status: 200, body: { status: 'failed', error: 'robots.txt disallows /' } }) });
	try {
		const env = environment();
		const audit = await (await create(env)).json();
		age(env);
		const result = await (await status(env, audit.id)).json();
		assert.equal(result.status, 'failed');
		assert.match(result.error, /pide que no lo revisen robots/);
	} finally {
		apex.restore();
	}
});

test('retention promised in the privacy notice is enforced', async () => {
	const { purgeExpired } = await import('./ai.mjs');
	const env = environment();
	const db = env.DB.raw;
	db.exec(readFileSync(new URL('../migrations/0001_contact_submissions.sql', import.meta.url), 'utf8'));
	const now = Date.now();
	const old = now - 400 * 864e5;
	const recent = now - 10 * 864e5;
	db.prepare("INSERT INTO ai_messages (sid, ts, role, text, ip_hash) VALUES ('a', ?, 'user', 'viejo', 'x'), ('b', ?, 'user', 'nuevo', 'x')").run(now - 31 * 864e5, recent);
	db.prepare("INSERT INTO ai_leads (id, created_at, sid) VALUES ('l1', ?, 's'), ('l2', ?, 's')").run(new Date(old).toISOString(), new Date(recent).toISOString());
	db.prepare("INSERT INTO ai_audits (id, created_at, updated_at, sid, ip_hash, name, email, consent_at, url, domain, status) VALUES ('A1', ?, ?, 's', 'x', 'n', 'e', 1, 'u', 'd', 'done'), ('A2', ?, ?, 's', 'x', 'n', 'e', 1, 'u', 'd', 'done')").run(old, old, recent, recent);
	db.prepare("INSERT INTO submissions (id, created_at, name, email, project_type, message, consent, ip_hash) VALUES ('S1', ?, 'n', 'e', 'p', 'm', 1, 'x'), ('S2', ?, 'n', 'e', 'p', 'm', 1, 'x')").run(new Date(old).toISOString(), new Date(recent).toISOString());
	db.prepare("INSERT INTO ai_abuse (ts, key, kind, layer) VALUES (?, 'k', 'injection', 'rules'), (?, 'k', 'injection', 'rules')").run(now - 91 * 864e5, recent);
	db.prepare("INSERT INTO ai_blocks (key, until) VALUES ('ip:viejo', ?), ('system:provider-alert', 0)").run(now - 91 * 864e5);
	await purgeExpired(env, now);
	const count = (table) => db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get().n;
	assert.equal(count('ai_messages'), 1, 'chat: 30 días');
	assert.equal(count('ai_leads'), 1, 'recados: 12 meses');
	assert.equal(count('ai_audits'), 1, 'auditorías: 12 meses');
	assert.equal(count('submissions'), 1, 'formulario: 12 meses');
	assert.equal(count('ai_abuse'), 1, 'seguridad: 90 días');
	assert.deepEqual(db.prepare('SELECT key FROM ai_blocks').all().map((row) => row.key), ['system:provider-alert'], 'la marca del aviso de saldo se queda');
});

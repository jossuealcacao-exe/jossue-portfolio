import assert from 'node:assert/strict';
import test from 'node:test';
import { aiLeadEntry, submissionEntry, syncPending, syncRow } from './crm.mjs';
import { handleRequest } from './index.mjs';
import { d1 } from './test-d1.mjs';

const ORIGIN = 'https://jossuealcala.com';
const MONDAY_8AM = Date.parse('2026-10-05T14:00:00Z');
const TUESDAY_10AM = Date.parse('2026-10-06T16:00:00Z');
const person = { name: 'Ana López', email: 'ana@tienda.mx', phone: '33 1234 5678', topic: 'Mi tienda no vende', consent: true, locale: 'es', source: 'chat', page: '/es/servicios/' };

function environment(overrides = {}) {
	return {
		DB: d1(),
		RATE_LIMIT_SALT: 'salt',
		ALLOWED_ORIGINS: ORIGIN,
		BOOKING_SCARCITY: 'off',
		APEX_CRM_TOKEN: 'token-de-prueba',
		APEX_API_BASE: 'https://apex.test',
		ASSETS: { fetch: async () => new Response('asset') },
		...overrides,
	};
}

// El Worker deja vivo lo que manda con ctx.waitUntil; la prueba lo espera.
function context() {
	const pending = [];
	return { waitUntil: (promise) => pending.push(promise), settle: () => Promise.all(pending) };
}

/** APEX de mentira: guarda lo que le llega y responde lo que se le diga. */
function mockApex(status = 201) {
	const calls = [];
	const original = globalThis.fetch;
	globalThis.fetch = async (url, init) => {
		if (!String(url).startsWith('https://apex.test/')) return original(url, init);
		calls.push({ url: String(url), auth: init.headers.Authorization, body: JSON.parse(init.body) });
		const current = typeof status === 'function' ? status(calls.length) : status;
		return Response.json(current < 300 ? { ok: true } : { error: { code: current === 401 ? 'unauthenticated' : 'otro' } }, { status: current });
	};
	return { calls, restore: () => (globalThis.fetch = original) };
}

const post = (env, ctx, path, body) =>
	handleRequest(new Request(`${ORIGIN}${path}`, { method: 'POST', headers: { Origin: ORIGIN, 'Content-Type': 'application/json', 'CF-Connecting-IP': '203.0.113.40' }, body: JSON.stringify(body) }), env, ctx);

function at(ms, fn) {
	const real = Date.now;
	Date.now = () => ms;
	return Promise.resolve(fn()).finally(() => (Date.now = real));
}

test('a booked call reaches the APEX portfolio as «llamada», and its cancellation as «llamada_cancelada»', async () => {
	const env = environment();
	const apex = mockApex(201);
	try {
		await at(MONDAY_8AM, async () => {
			const ctx = context();
			const { booking } = await (await post(env, ctx, '/api/booking', { ...person, slot: TUESDAY_10AM })).json();
			await ctx.settle();
			assert.equal(apex.calls.length, 1);
			const [call] = apex.calls;
			assert.equal(call.url, 'https://apex.test/v1/portfolio-leads');
			assert.equal(call.auth, 'Bearer token-de-prueba');
			assert.deepEqual(call.body, {
				externo_id: booking.id,
				tipo: 'llamada',
				persona: { nombre: 'Ana López', email: 'ana@tienda.mx', telefono: '+523312345678' },
				consent_at: new Date(MONDAY_8AM).toISOString(),
				locale: 'es',
				tema: 'Mi tienda no vende',
				cuando: new Date(TUESDAY_10AM).toISOString(),
				pagina: '/es/servicios/',
			});
			const row = await env.DB.prepare('SELECT crm_synced_at FROM bookings WHERE id = ?').bind(booking.id).first();
			assert.ok(row.crm_synced_at, 'marked as delivered');

			const cancel = context();
			await post(env, cancel, '/api/booking/cancel', { id: booking.id, token: booking.token });
			await cancel.settle();
			assert.equal(apex.calls.length, 2, 'the call was already there, so only the cancellation goes');
			assert.equal(apex.calls[1].body.externo_id, `${booking.id}:cancelada`);
			assert.equal(apex.calls[1].body.tipo, 'llamada_cancelada');
		});
	} finally {
		apex.restore();
	}
});

test('what APEX could not take is retried by the cron; bad data is not retried forever', async () => {
	const env = environment();
	const apex = mockApex((n) => (n === 1 ? 503 : 201));
	try {
		await at(MONDAY_8AM, async () => {
			const ctx = context();
			const { booking } = await (await post(env, ctx, '/api/booking', { ...person, slot: TUESDAY_10AM })).json();
			await ctx.settle();
			assert.equal((await env.DB.prepare('SELECT crm_synced_at FROM bookings WHERE id = ?').bind(booking.id).first()).crm_synced_at, null);

			assert.deepEqual(await syncPending(env, MONDAY_8AM), { sent: 1 });
			assert.ok((await env.DB.prepare('SELECT crm_synced_at FROM bookings WHERE id = ?').bind(booking.id).first()).crm_synced_at);
			assert.deepEqual(await syncPending(env, MONDAY_8AM), { sent: 0 }, 'nothing left');
		});
	} finally {
		apex.restore();
	}

	// Un recado sin correo ni teléfono: APEX lo rechaza con 400 y no se vuelve a intentar.
	const refusing = mockApex(400);
	try {
		await env.DB.prepare("INSERT INTO ai_leads (id, created_at, sid, name) VALUES ('r1', ?, 's', 'Nadie')").bind(new Date(MONDAY_8AM).toISOString()).run();
		assert.equal(await syncRow(env, 'aiLead', await env.DB.prepare("SELECT * FROM ai_leads WHERE id = 'r1'").first()), false);
		assert.ok((await env.DB.prepare("SELECT crm_synced_at FROM ai_leads WHERE id = 'r1'").first()).crm_synced_at);
		assert.deepEqual(await syncPending(env, MONDAY_8AM), { sent: 0 });
		assert.equal(refusing.calls.length, 1);
	} finally {
		refusing.restore();
	}
});

test('without APEX_CRM_TOKEN nothing leaves the site and booking works the same', async () => {
	const env = environment({ APEX_CRM_TOKEN: undefined });
	const apex = mockApex(201);
	try {
		await at(MONDAY_8AM, async () => {
			const ctx = context();
			assert.equal((await post(env, ctx, '/api/booking', { ...person, slot: TUESDAY_10AM })).status, 201);
			await ctx.settle();
			assert.deepEqual(await syncPending(env, MONDAY_8AM), { sent: 0 });
		});
		assert.equal(apex.calls.length, 0);
	} finally {
		apex.restore();
	}
});

test('recados and the contact form map to what the portfolio expects', () => {
	assert.deepEqual(aiLeadEntry({ id: 'abc', created_at: '2026-10-05T14:00:00.000Z', locale: 'es', page: '/es/', name: 'Laura', email: 'laura@cafeolmo.mx', phone: '', company: 'Café Olmo', need: 'Mejorar la conversión', message: 'Tengo tráfico pero no vende.' }), {
		externo_id: 'RECADO-abc',
		tipo: 'recado',
		persona: { nombre: 'Laura', email: 'laura@cafeolmo.mx', telefono: null, empresa: 'Café Olmo' },
		consent_at: '2026-10-05T14:00:00.000Z',
		locale: 'es',
		tema: 'Mejorar la conversión',
		mensaje: 'Tengo tráfico pero no vende.',
		pagina: '/es/',
	});
	const form = submissionEntry({ id: 'f1', created_at: '2026-10-05T14:00:00.000Z', name: 'Pedro', email: 'pedro@tienda.mx', organization: '', site_url: 'tienda.mx', project_type: 'Shopify', budget: '50k', message: 'Quiero rediseñar' });
	assert.equal(form.externo_id, 'FORM-f1');
	assert.equal(form.sitio, 'tienda.mx');
	assert.equal(form.tema, 'Shopify · presupuesto: 50k');
	assert.equal(form.persona.empresa, null);
});

test('a rejected token is logged with APEX\'s reason and Jossué gets one alert a day, not one per row', async () => {
	const emails = [];
	const env = environment({ CONTACT_EMAIL_TO: 'owner@example.com', CONTACT_EMAIL: { send: async (message) => emails.push(message) } });
	const apex = mockApex(401);
	try {
		await at(MONDAY_8AM, async () => {
			const ctx = context();
			await post(env, ctx, '/api/booking', { ...person, slot: TUESDAY_10AM });
			await ctx.settle();
			await env.DB.prepare("INSERT INTO ai_leads (id, created_at, sid, name, email) VALUES ('r2', ?, 's', 'Laura', 'laura@cafeolmo.mx')").bind(new Date(MONDAY_8AM).toISOString()).run();
			assert.deepEqual(await syncPending(env, MONDAY_8AM), { sent: 0 });
		});
		const log = (await env.DB.prepare('SELECT kind, status, detail FROM crm_sync_log ORDER BY ts').all()).results;
		assert.ok(log.length >= 3, 'every failed attempt is written down');
		assert.ok(log.some((row) => row.kind === 'booking' && row.status === 401 && row.detail === 'unauthenticated'));
		const alerts = emails.filter((mail) => /rechazó el token/.test(mail.subject));
		assert.equal(alerts.length, 1);
		assert.match(alerts[0].text, /APEX_CRM_TOKEN/);
		assert.equal((await env.DB.prepare('SELECT count(*) AS n FROM bookings WHERE crm_synced_at IS NULL').first()).n, 1, 'still pending, to retry');
	} finally {
		apex.restore();
	}
});

test('POST /api/crm/sync sends what is pending now, only with the admin token, and says what is left', async () => {
	const env = environment({ ADMIN_TOKEN: 'admin-de-prueba' });
	const apex = mockApex(201);
	try {
		await env.DB.prepare("INSERT INTO ai_leads (id, created_at, sid, name, email) VALUES ('r3', ?, 's', 'Laura', 'laura@cafeolmo.mx')").bind(new Date().toISOString()).run();
		const call = (token) => handleRequest(new Request(`${ORIGIN}/api/crm/sync`, { method: 'POST', headers: { Origin: ORIGIN, ...(token ? { Authorization: `Bearer ${token}` } : {}) } }), env, context());
		assert.equal((await call()).status, 401);
		assert.equal((await call('otro')).status, 401);
		const body = await (await call('admin-de-prueba')).json();
		assert.equal(body.ok, true);
		assert.equal(body.sent, 1);
		assert.equal(body.enabled, true);
		assert.deepEqual(body.pending, { llamadas: 0, cancelaciones: 0, recados: 0, formularios: 0 });
		assert.equal(apex.calls[0].body.externo_id, 'RECADO-r3');
	} finally {
		apex.restore();
	}
});

test('with ?todo=1 old pending entries are sent too; by default only the last two weeks', async () => {
	const env = environment({ ADMIN_TOKEN: 'admin-de-prueba' });
	const apex = mockApex(201);
	try {
		await env.DB.prepare("INSERT INTO submissions (id, created_at, name, email, project_type, message, consent, ip_hash) VALUES ('f-viejo', '2026-01-10T12:00:00.000Z', 'Pedro', 'pedro@tienda.mx', 'Shopify', 'Hola', 1, 'h')").run();
		const call = (query) => handleRequest(new Request(`${ORIGIN}/api/crm/sync${query}`, { method: 'POST', headers: { Origin: ORIGIN, Authorization: 'Bearer admin-de-prueba' } }), env, context());
		assert.equal((await (await call('')).json()).pending.formularios, 1, 'out of the window, still pending');
		const body = await (await call('?todo=1')).json();
		assert.equal(body.sent, 1);
		assert.equal(body.pending.formularios, 0);
		assert.equal(apex.calls.at(-1).body.externo_id, 'FORM-f-viejo');
	} finally {
		apex.restore();
	}
});

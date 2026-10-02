// Auditoría express desde el chat de Jossue AI. La persona deja nombre, correo (con su permiso) y la
// dirección de su sitio; APEX corre su auditoría pública de una página y devuelve la «Salud / 100»,
// las 3 áreas de oportunidad y el enlace a su informe visual (HTML y PDF). El chat la muestra y a
// Jossué le llega un correo con todo.
//
// Solo se hacen en el chat: no hay formulario aparte. El token de APEX (APEX_TOKEN, con permisos
// `audits:write` y `reports:share` y nada más) vive como secreto del Worker; el navegador nunca habla
// con APEX directo.
//
//   POST /api/audit        { sid, locale, page, name, email, url, consent: true }
//   GET  /api/audit/:id?sid=…   estado; solo lo ve la sesión que la pidió

import { blockedUntil } from './guard.mjs';
import { notify, notifyEnabled } from './notify.mjs';

const APEX_DEFAULT = 'https://apex.jossuealcala.com';
const PER_IP_DAY = 3; // auditorías por IP al día
const PER_DOMAIN_DAY = 2; // por dominio al día (aunque cambien el correo)
const GLOBAL_DAY_DEFAULT = 40; // tope del día para todo el sitio (AUDITS_PER_DAY)
const POLL_EVERY_MS = 4000; // a lo mucho una consulta a APEX cada 4 s por auditoría
const GIVE_UP_MS = 8 * 60_000; // si en 8 minutos no terminó, se da por fallida (Jossué la sigue a mano)
const DAY = 864e5;

const apexBase = (env) => String(env.APEX_API_BASE || APEX_DEFAULT).replace(/\/$/, '');

/** Normaliza la dirección que escribe la persona. Devuelve null si no es un sitio público razonable. */
export function normalizeSite(raw) {
	let value = String(raw ?? '').trim().slice(0, 300);
	if (!value) return null;
	if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
	let url;
	try {
		url = new URL(value);
	} catch {
		return null;
	}
	if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || (url.port && !['80', '443'].includes(url.port))) return null;
	const host = url.hostname.toLowerCase().replace(/\.$/, '');
	// Nada de IPs, máquinas internas ni nombres sin dominio. APEX vuelve a validar (con DNS) antes de abrirla.
	if (!host.includes('.') || host.startsWith('[') || /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || /(^|\.)(localhost|local|internal|intranet|lan|home|corp|test|invalid|example)$/.test(host)) return null;
	if (!/^[a-z0-9.-]+$/.test(host) && !/^xn--/.test(host)) {
		try {
			url.hostname = new URL(`https://${host}`).hostname; // punycode
		} catch {
			return null;
		}
	}
	url.hash = '';
	return { url: url.toString(), domain: host.replace(/^www\./, '') };
}

const validEmail = (email) => /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i.test(email);

async function count(env, sql, ...params) {
	const row = await env.DB.prepare(sql).bind(...params).first().catch(() => null);
	return Number(row?.total ?? 0);
}

function publicAudit(row) {
	let findings;
	try {
		findings = row.findings ? JSON.parse(row.findings) : [];
	} catch {
		findings = [];
	}
	return {
		ok: true,
		id: row.id,
		status: row.status,
		domain: row.domain,
		url: row.url,
		score: row.score ?? null,
		findings,
		report_url: row.report_url ?? null,
		pdf_url: row.pdf_url ?? null,
		error: row.error ?? null,
	};
}

const VISITOR_ERRORS = {
	es: {
		busy: 'Hoy ya se hicieron muchas auditorías. Jossué te la manda por correo en cuanto pueda.',
		failed: 'No pude terminar la auditoría de tu sitio. Jossué ya tiene tus datos y te la manda por correo.',
		timeout: 'La auditoría tardó más de lo normal. Jossué ya tiene tus datos y te la manda por correo.',
		robots: 'Tu sitio pide que no lo revisen robots, así que no lo abrí. Jossué te puede hacer la revisión a mano.',
	},
	en: {
		busy: 'Many audits have been run today. Jossué will email yours as soon as he can.',
		failed: 'I could not finish your site audit. Jossué has your details and will email it to you.',
		timeout: 'The audit took longer than usual. Jossué has your details and will email it to you.',
		robots: 'Your site asks robots not to crawl it, so I did not open it. Jossué can review it by hand.',
	},
};

// ---------- APEX ----------

async function apex(env, path, init = {}) {
	const response = await fetch(`${apexBase(env)}${path}`, {
		...init,
		headers: { Authorization: `Bearer ${env.APEX_TOKEN}`, 'Content-Type': 'application/json', ...(init.headers ?? {}) },
	});
	const data = await response.json().catch(() => ({}));
	return { status: response.status, ok: response.ok, data };
}

/** Solo se aceptan enlaces de APEX (nadie puede colar otra dirección en el chat). */
function apexLink(env, value) {
	if (typeof value !== 'string') return null;
	try {
		const link = new URL(value);
		return link.origin === new URL(apexBase(env)).origin ? link.toString() : null;
	} catch {
		return null;
	}
}

const clip = (value, max) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

function cleanFindings(list) {
	return (Array.isArray(list) ? list : [])
		.slice(0, 3)
		.map((item) => ({
			title: clip(item?.title, 140),
			category: clip(item?.category_label || item?.category, 40),
			severity: ['high', 'medium', 'low'].includes(item?.severity) ? item.severity : 'medium',
			business_effect: clip(item?.business_effect, 400),
			recommendation: clip(item?.recommendation, 400),
			effort: clip(item?.effort, 40),
		}))
		.filter((item) => item.title);
}

// ---------- aviso a Jossué ----------

async function notifyOwner(env, row) {
	if (!notifyEnabled(env)) return false;
	const audit = publicAudit(row);
	const done = audit.status === 'done';
	const lines = [
		done ? `Auditoría express entregada en el chat · ${audit.domain}` : `Auditoría express sin terminar · ${audit.domain} (${audit.status}${row.error ? `: ${row.error}` : ''})`,
		'',
		`Quién: ${row.name} · ${row.email}`,
		`Sitio: ${row.url}`,
		`Pidió la auditoría en: ${row.page || 'el chat'} (${row.locale})`,
		`Permiso para escribirle: sí (${new Date(Number(row.consent_at)).toISOString()})`,
		'',
		...(done
			? [
					`Salud: ${audit.score ?? '—'} / 100`,
					'',
					audit.findings.length === 1 ? 'Lo que conviene corregir:' : `Las ${audit.findings.length} cosas que conviene corregir:`,
					...audit.findings.map((item, index) => `${index + 1}. ${item.title} (${item.severity})\n   Por qué importa: ${item.business_effect}${item.recommendation ? `\n   Qué haría: ${item.recommendation}` : ''}`),
					'',
					audit.report_url && `Informe: ${audit.report_url}`,
					audit.pdf_url && `PDF: ${audit.pdf_url}`,
				]
			: ['No hubo informe: escríbele tú con la revisión a mano.']),
		'',
		'Siguiente paso sugerido: escríbele hoy mismo y ofrécele revisar juntos la primera mejora.',
	].filter((line) => line !== null && line !== undefined && line !== false);
	return notify(env, {
		kind: 'audit',
		subject: `${clip(row.name, 40)} · ${audit.domain}${done && audit.score != null ? ` · ${audit.score}/100` : ' · sin terminar'}`,
		replyTo: { email: row.email, name: row.name },
		text: lines.join('\n'),
	});
}

async function save(env, row) {
	await env.DB.prepare(
		`UPDATE ai_audits SET updated_at = ?, apex_id = ?, status = ?, score = ?, findings = ?, summary = ?, report_url = ?, pdf_url = ?, error = ?, notified_at = ? WHERE id = ?`,
	)
		.bind(Date.now(), row.apex_id ?? null, row.status, row.score ?? null, row.findings ?? null, row.summary ?? null, row.report_url ?? null, row.pdf_url ?? null, row.error ?? null, row.notified_at ?? null, row.id)
		.run();
}

async function finish(env, row) {
	// notified_at solo se marca si el correo salió: el panel no puede decir «avisado» si no llegó.
	if (!row.notified_at && (await notifyOwner(env, row))) row.notified_at = Date.now();
	await save(env, row);
}

// ---------- rutas ----------

/** POST /api/audit */
export async function handleAuditCreate(request, env, { json, origin, ipHash }) {
	if (!env.DB) return json(503, { ok: false, error: 'audit_unavailable' }, origin);
	let body;
	try {
		body = await request.json();
	} catch {
		return json(400, { ok: false, error: 'invalid_json' }, origin);
	}
	const locale = body?.locale === 'en' ? 'en' : 'es';
	const copy = VISITOR_ERRORS[locale];
	const sid = String(body?.sid ?? '').replace(/[^\w-]/g, '').slice(0, 64);
	const name = clip(body?.name, 120);
	const email = clip(body?.email, 200).toLowerCase();
	const site = normalizeSite(body?.url);
	if (!sid || !name || name.length < 2 || /[<>{}]/.test(name)) return json(400, { ok: false, error: 'invalid_name' }, origin);
	if (!validEmail(email)) return json(400, { ok: false, error: 'invalid_email' }, origin);
	if (body?.consent !== true) return json(400, { ok: false, error: 'consent_required' }, origin);
	if (!site) return json(400, { ok: false, error: 'invalid_url' }, origin);
	if (!env.APEX_TOKEN) return json(503, { ok: false, error: 'audit_unavailable' }, origin);
	if (await blockedUntil(env, [`ip:${ipHash}`, `sid:${sid}`])) return json(429, { ok: false, error: 'blocked' }, origin);

	const now = Date.now();
	// La misma persona pidiendo otra vez el mismo sitio: se le devuelve la que ya tiene.
	const existing = await env.DB.prepare('SELECT * FROM ai_audits WHERE email = ? AND domain = ? AND created_at >= ? ORDER BY created_at DESC LIMIT 1').bind(email, site.domain, now - DAY).first().catch(() => null);
	if (existing && existing.status !== 'rejected') {
		if (existing.sid !== sid) {
			// Otra sesión: la deja leer desde esta (es la misma persona, con el mismo correo).
			await env.DB.prepare('UPDATE ai_audits SET sid = ? WHERE id = ?').bind(sid, existing.id).run().catch(() => null);
			existing.sid = sid;
		}
		return json(200, { ...publicAudit(existing), reused: true }, origin);
	}
	if ((await count(env, 'SELECT COUNT(*) AS total FROM ai_audits WHERE ip_hash = ? AND created_at >= ?', ipHash, now - DAY)) >= PER_IP_DAY) return json(429, { ok: false, error: 'limit_ip' }, origin);
	if ((await count(env, 'SELECT COUNT(*) AS total FROM ai_audits WHERE domain = ? AND created_at >= ?', site.domain, now - DAY)) >= PER_DOMAIN_DAY) return json(429, { ok: false, error: 'limit_domain' }, origin);
	const globalCap = Number(env.AUDITS_PER_DAY) > 0 ? Number(env.AUDITS_PER_DAY) : GLOBAL_DAY_DEFAULT;
	const busy = (await count(env, "SELECT COUNT(*) AS total FROM ai_audits WHERE created_at >= ? AND status != 'rejected'", now - DAY)) >= globalCap;

	const row = {
		id: `AE-${crypto.randomUUID().replace(/-/g, '').slice(0, 20)}`,
		created_at: now,
		updated_at: now,
		sid,
		ip_hash: ipHash,
		locale,
		page: clip(body?.page, 200),
		name,
		email,
		consent_at: now,
		url: site.url,
		domain: site.domain,
		apex_id: null,
		status: 'queued',
		notified_at: null,
	};
	await env.DB.prepare('INSERT INTO ai_audits (id, created_at, updated_at, sid, ip_hash, locale, page, name, email, consent_at, url, domain, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
		.bind(row.id, row.created_at, row.updated_at, row.sid, row.ip_hash, row.locale, row.page, row.name, row.email, row.consent_at, row.url, row.domain, row.status)
		.run();
	// También es un recado: aparece en el panel y en `npm run chats`. El correo a Jossué sale al terminar.
	await env.DB.prepare('INSERT INTO ai_leads (id, created_at, sid, locale, page, name, email, phone, company, need, message, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
		.bind(crypto.randomUUID(), new Date(now).toISOString(), sid, locale, row.page, name, email, '', site.domain, `Auditoría express de ${site.domain}`, `Pidió la auditoría express de ${site.url} en el chat.`, ipHash)
		.run()
		.catch((error) => console.error('audit lead failed', error?.message));

	if (busy) {
		Object.assign(row, { status: 'rejected', error: copy.busy, summary: 'Tope diario: Jossué la manda a mano' });
		await finish(env, row);
		return json(200, publicAudit(row), origin);
	}

	const created = await apex(env, '/v1/chat-audits', {
		method: 'POST',
		headers: { 'Idempotency-Key': row.id },
		body: JSON.stringify({ url: site.url, idempotency_key: row.id, requester: { name, email }, consent: true, locale }),
	}).catch((error) => ({ ok: false, status: 0, data: { error: { code: error?.name } } }));
	if (!created.ok || !created.data?.audit?.id) {
		const code = created.data?.error?.code;
		console.error('audit apex create failed', created.status, code);
		Object.assign(row, { status: 'failed', error: code === 'daily_limit' ? copy.busy : copy.failed, summary: `APEX no la aceptó (${created.status}${code ? ` ${code}` : ''})` });
		await finish(env, row);
		return json(200, publicAudit(row), origin);
	}
	Object.assign(row, { apex_id: created.data.audit.id, status: 'running' });
	await save(env, row);
	return json(202, publicAudit(row), origin);
}

/** GET /api/audit/:id?sid=… */
export async function handleAuditStatus(request, env, { json, origin }, id) {
	if (!env.DB) return json(503, { ok: false, error: 'audit_unavailable' }, origin);
	const sid = String(new URL(request.url).searchParams.get('sid') ?? '').replace(/[^\w-]/g, '').slice(0, 64);
	const row = await env.DB.prepare('SELECT * FROM ai_audits WHERE id = ?').bind(String(id).slice(0, 40)).first().catch(() => null);
	// Solo la sesión que la pidió. Cualquier otra cosa responde igual que si no existiera.
	if (!row || !sid || row.sid !== sid) return json(404, { ok: false, error: 'not_found' }, origin);
	const copy = VISITOR_ERRORS[row.locale === 'en' ? 'en' : 'es'];
	const now = Date.now();
	if (['queued', 'running'].includes(row.status) && row.apex_id && env.APEX_TOKEN) {
		if (now - Number(row.created_at) > GIVE_UP_MS) {
			Object.assign(row, { status: 'failed', error: copy.timeout, summary: 'Se tardó más de 8 minutos' });
			await finish(env, row);
		} else if (now - Number(row.updated_at) >= POLL_EVERY_MS) {
			const result = await apex(env, `/v1/chat-audits/${encodeURIComponent(row.apex_id)}`).catch(() => ({ ok: false, status: 0, data: {} }));
			const audit = result.data ?? {};
			if (result.ok && ['ready_for_review', 'partial', 'done'].includes(audit.status) && (audit.report_url || audit.findings?.length)) {
				const findings = cleanFindings(audit.findings);
				Object.assign(row, {
					status: 'done',
					score: Number.isFinite(Number(audit.health)) ? Math.round(Number(audit.health)) : null,
					findings: JSON.stringify(findings),
					summary: findings.map((item) => item.title).join(' · ').slice(0, 300),
					report_url: apexLink(env, audit.report_url),
					pdf_url: apexLink(env, audit.pdf_url),
					error: null,
				});
				await finish(env, row);
			} else if (result.ok && ['failed', 'qa_failed'].includes(audit.status)) {
				const robots = /robots/i.test(String(audit.error ?? ''));
				Object.assign(row, { status: 'failed', error: robots ? copy.robots : copy.failed, summary: clip(audit.error || audit.status, 200) });
				await finish(env, row);
			} else {
				row.status = 'running';
				await save(env, row);
			}
		}
	}
	return json(200, publicAudit(row), origin);
}

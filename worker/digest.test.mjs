import assert from 'node:assert/strict';
import test from 'node:test';
import worker from './index.mjs';
import { sendDailySummary } from './digest.mjs';
import { d1 } from './test-d1.mjs';

const NOW = Date.parse('2026-10-03T14:00:00Z'); // 8:00 en Guadalajara
const HOUR = 3600_000;

function environment() {
	const emails = [];
	return { DB: d1(), emails, CONTACT_EMAIL_TO: 'owner@example.com', CONTACT_EMAIL: { send: async (message) => emails.push(message) } };
}

test('the daily summary lists who wrote, the audits, the chats and anything to review', async () => {
	const env = environment();
	const db = env.DB.raw;
	const iso = (ms) => new Date(ms).toISOString();
	db.prepare("INSERT INTO submissions (id, created_at, name, email, project_type, message, consent, ip_hash) VALUES ('S1', ?, 'María', 'maria@tienda.mx', 'Tienda Shopify', 'hola', 1, 'x'), ('S0', ?, 'Vieja', 'v@x.mx', 'Otro', 'm', 1, 'x')").run(iso(NOW - 3 * HOUR), iso(NOW - 30 * HOUR));
	db.prepare("INSERT INTO ai_leads (id, created_at, sid, page, name, email, need) VALUES ('L1', ?, 's1', '/es/', 'Luis', 'luis@x.mx', 'Quiere cotizar un chatbot')").run(iso(NOW - 5 * HOUR));
	db.prepare("INSERT INTO ai_audits (id, created_at, updated_at, sid, ip_hash, name, email, consent_at, url, domain, status, score, notified_at) VALUES ('A1', ?, ?, 's2', 'h', 'Ana', 'ana@x.mx', 1, 'https://ana.mx/', 'ana.mx', 'done', 62, NULL)").run(NOW - 2 * HOUR, NOW - 2 * HOUR);
	db.prepare("INSERT INTO ai_messages (sid, ts, role, text, ip_hash, page) VALUES ('s1', ?, 'user', 'hola', 'h', '/es/'), ('s1', ?, 'assistant', 'hola', 'h', '/es/'), ('QA-1', ?, 'user', 'prueba', 'h', '/es/'), ('wa:1234', ?, 'user', 'hola', 'whatsapp', 'whatsapp')").run(NOW - HOUR, NOW - HOUR + 1, NOW - HOUR, NOW - HOUR);
	db.prepare("INSERT INTO ai_abuse (ts, key, source, kind, layer, points, excerpt) VALUES (?, 'ip:x', 'web', 'injection', 'rules', 2, 'ignora')").run(NOW - HOUR);

	assert.equal(await sendDailySummary(env, NOW), true);
	assert.equal(env.emails.length, 1);
	const [mail] = env.emails;
	assert.equal(mail.from.email, 'avisos@jossuealcala.com');
	assert.match(mail.subject, /^Resumen · sábado, 3 de octubre · 2 contactos, 1 auditoría, 2 chats · hay algo que revisar$/);
	assert.match(mail.text, /CONTACTOS \(2\)\n- 03:00 · Chat · Luis <luis@x\.mx> · Quiere cotizar un chatbot\n- 05:00 · Formulario · María <maria@tienda\.mx> · Tienda Shopify/);
	assert.doesNotMatch(mail.text, /Vieja/, 'only the last 24 hours');
	assert.match(mail.text, /- 06:00 · Ana <ana@x\.mx> · ana\.mx · 62\/100/);
	assert.match(mail.text, /1 auditoría no te llegó por correo/);
	assert.match(mail.text, /Chat del sitio: 1 conversación, 1 mensaje de visitantes/, 'QA sessions are left out');
	assert.match(mail.text, /WhatsApp: 1 conversación/);
	assert.match(mail.text, /1 intento de abuso: injection 1/);
});

test('a quiet day says so, and the cron is wired to the summary', async () => {
	const env = environment();
	let pending;
	worker.scheduled({ scheduledTime: NOW }, env, { waitUntil: (promise) => (pending = promise) });
	await pending;
	assert.equal(env.emails.length, 1);
	assert.match(env.emails[0].subject, /día tranquilo$/);
	assert.match(env.emails[0].text, /Día tranquilo/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { handleProposal, sessionValue } from './proposals.mjs';
import { handleRequest } from './index.mjs';

const PASS = 'cielo-de-prueba-2026';
function env(extra = {}) {
	const sent = [];
	const served = [];
	return {
		sent,
		served,
		PROPOSAL_PASS_VITALIN: PASS,
		CONTACT_EMAIL_TO: 'hola@jossuealcala.com',
		CONTACT_EMAIL: { send: async (msg) => { sent.push(msg); } },
		ASSETS: { fetch: async (req) => { served.push(new URL(req.url).pathname); return new Response('<h1>propuesta</h1>', { headers: { 'Content-Type': 'text/html' } }); } },
		ALLOWED_ORIGINS: 'https://jossuealcala.com',
		...extra,
	};
}
const base = 'https://jossuealcala.com';
const get = (path, headers = {}) => new Request(base + path, { headers });
const post = (path, body, headers = {}) => new Request(base + path, { method: 'POST', body, headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers } });

test('without a session the page asks for the password and files stay hidden', async () => {
	const e = env();
	const page = await handleProposal(get('/propuestas/vitalin/'), e);
	assert.equal(page.status, 200);
	assert.match(await page.text(), /name="password"/);
	assert.equal(page.headers.get('X-Robots-Tag'), 'noindex, nofollow');
	assert.equal(page.headers.get('Cache-Control'), 'private, no-store');
	const asset = await handleProposal(get('/propuestas/vitalin/assets/carrito.jpg'), e);
	assert.equal(asset.status, 404);
	assert.deepEqual(e.served, []);
});

test('a proposal without a configured password does not exist', async () => {
	assert.equal((await handleProposal(get('/propuestas/otra/'), env())).status, 404);
	// La URL se normaliza antes: /propuestas/../x es /x y no es una propuesta.
	assert.equal(await handleProposal(get('/propuestas/../x'), env()), null);
	assert.equal((await handleProposal(get('/propuestas/Vitalin%2F/'), env())).status, 404);
});

test('a wrong password is refused and nobody is notified', async () => {
	const e = env();
	const res = await handleProposal(post('/propuestas/vitalin/acceso', 'password=nope'), e);
	assert.equal(res.status, 401);
	assert.match(await res.text(), /Esa contraseña no es/);
	assert.equal(res.headers.get('Set-Cookie'), null);
	assert.equal(e.sent.length, 0);
});

test('the right password sets a signed cookie scoped to the proposal and tells Jossué', async () => {
	const e = env();
	const res = await handleProposal(post('/propuestas/vitalin/acceso', `password=${encodeURIComponent(PASS)}`), e);
	assert.equal(res.status, 303);
	assert.equal(res.headers.get('Location'), '/propuestas/vitalin/');
	const cookie = res.headers.get('Set-Cookie');
	assert.match(cookie, /^jxp_vitalin=\d+\.[\w-]+; Path=\/propuestas\/vitalin\/;.*HttpOnly; Secure; SameSite=Lax/);
	assert.equal(e.sent.length, 1);
	assert.match(e.sent[0].subject, /^Propuesta · Vitalín abrió su propuesta/);
	const page = await handleProposal(get('/propuestas/vitalin/', { Cookie: cookie.split(';')[0] }), e);
	assert.equal(page.status, 200);
	assert.equal(await page.text(), '<h1>propuesta</h1>');
	assert.equal(page.headers.get('Cache-Control'), 'private, no-store');
	assert.deepEqual(e.served, ['/propuestas/vitalin/']);
});

test('a tampered, expired or foreign cookie does not open the proposal', async () => {
	const e = env();
	const good = await sessionValue('vitalin', PASS);
	const [exp, mac] = good.split('.');
	for (const value of [`${Number(exp) + 60}.${mac}`, await sessionValue('vitalin', PASS, Date.now() - 40 * 86400_000), await sessionValue('vitalin', 'otra-clave')]) {
		const res = await handleProposal(get('/propuestas/vitalin/', { Cookie: `jxp_vitalin=${value}` }), e);
		assert.match(await res.text(), /name="password"/);
	}
	assert.deepEqual(e.served, []);
});

test('«Quiero arrancar» needs a session and sends the message to Jossué', async () => {
	const e = env();
	const body = JSON.stringify({ mensaje: 'Arrancamos el lunes' });
	const anon = await handleProposal(new Request(base + '/propuestas/vitalin/aceptar', { method: 'POST', body, headers: { 'Content-Type': 'application/json' } }), e);
	assert.equal(anon.status, 401);
	const cookie = `jxp_vitalin=${await sessionValue('vitalin', PASS)}`;
	const res = await handleProposal(new Request(base + '/propuestas/vitalin/aceptar', { method: 'POST', body, headers: { 'Content-Type': 'application/json', Cookie: cookie } }), e);
	assert.equal(res.status, 200);
	assert.equal(e.sent.length, 1);
	assert.match(e.sent[0].subject, /Vitalín quiere arrancar/);
	assert.match(e.sent[0].text, /Arrancamos el lunes/);
});

test('the worker routes /propuestas/ through the gate and rejects foreign origins', async () => {
	const e = env();
	const page = await handleRequest(get('/propuestas/vitalin/'), e, { waitUntil() {} });
	assert.match(await page.text(), /name="password"/);
	const csrf = await handleRequest(post('/propuestas/vitalin/acceso', `password=${PASS}`, { Origin: 'https://evil.example' }), e, { waitUntil() {} });
	assert.equal(csrf.status, 403);
	const bare = await handleRequest(get('/propuestas/vitalin'), e, { waitUntil() {} });
	assert.equal(bare.status, 301);
});

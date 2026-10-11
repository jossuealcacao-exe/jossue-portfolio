/* global btoa, setTimeout */
// Propuestas privadas: /propuestas/<cliente>/ se sirve solo con contraseña.
//
// Los archivos viven en public/propuestas/<cliente>/ y wrangler.jsonc manda /propuestas/* al Worker
// antes que a los assets, así que nada de esa carpeta sale sin pasar por aquí. La contraseña de cada
// cliente es un secreto de Cloudflare: PROPOSAL_PASS_<CLIENTE> (p. ej. PROPOSAL_PASS_VITALIN). Sin
// secreto, la propuesta no existe (404). Al entrar se guarda una cookie firmada con la propia
// contraseña: cambiarla cierra todas las sesiones abiertas.
//
// Avisos a Jossué: cuando alguien entra y cuando pulsa «Quiero arrancar».

import { notify } from './notify.mjs';

const SESSION_DAYS = 30;
const MAX_MESSAGE = 1200;
const SLUG = /^[a-z0-9-]{2,40}$/;
const enc = new TextEncoder();

const secretName = (slug) => `PROPOSAL_PASS_${slug.toUpperCase().replace(/-/g, '_')}`;
const cookieName = (slug) => `jxp_${slug.replace(/-/g, '_')}`;
// Cómo se escribe el nombre de cada cliente; si no está aquí, sale de la ruta.
const NAMES = { vitalin: 'Vitalín' };
const titleOf = (slug) => NAMES[slug] ?? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

async function sign(key, data) {
	const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
	const mac = new Uint8Array(await crypto.subtle.sign('HMAC', k, enc.encode(data)));
	return btoa(String.fromCharCode(...mac)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Comparación de tiempo constante: se comparan las firmas, que siempre miden lo mismo.
async function sameSecret(given, expected) {
	const [a, b] = await Promise.all([sign('compare', String(given ?? '')), sign('compare', String(expected ?? ''))]);
	let diff = a.length ^ b.length;
	for (let i = 0; i < Math.min(a.length, b.length); i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return diff === 0;
}

export async function sessionValue(slug, password, now = Date.now()) {
	const exp = Math.floor(now / 1000) + SESSION_DAYS * 86400;
	return `${exp}.${await sign(password, `${slug}.${exp}`)}`;
}

async function validSession(request, slug, password, now = Date.now()) {
	const raw = (request.headers.get('Cookie') ?? '').split(/;\s*/).find((c) => c.startsWith(`${cookieName(slug)}=`));
	if (!raw) return false;
	const [exp, mac] = raw.slice(cookieName(slug).length + 1).split('.');
	if (!/^\d+$/.test(exp ?? '') || Number(exp) * 1000 < now) return false;
	return sameSecret(mac, await sign(password, `${slug}.${exp}`));
}

const PRIVATE = {
	'Cache-Control': 'private, no-store',
	'X-Robots-Tag': 'noindex, nofollow',
	'Referrer-Policy': 'no-referrer',
	'X-Content-Type-Options': 'nosniff',
};

function loginPage(slug, { error = false } = {}) {
	const name = titleOf(slug);
	const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Propuesta para ${name} · Jossue Alcalá</title><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
:root{color-scheme:dark}*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;padding:1.5rem;font:420 1rem/1.55 -apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;color:#eef1ea;
background:radial-gradient(55% 60% at 74% 40%,#1a2142 0%,rgba(26,33,66,0) 70%),radial-gradient(45% 55% at 18% 96%,rgba(42,27,61,.7) 0%,rgba(42,27,61,0) 70%),#050605}
main{width:100%;max-width:24rem;display:grid;gap:1.4rem}
img{width:4rem;height:4rem;border-radius:22%;border:1px solid rgba(238,241,234,.16)}
p.k{margin:0;font-size:.8125rem;letter-spacing:.06em;text-transform:uppercase;color:#9aa197}
h1{margin:0;font-size:1.9rem;font-weight:620;letter-spacing:-.022em;line-height:1.1}
p{margin:0;color:#b9bfb5}
form{display:grid;gap:.8rem}
label{font-size:.875rem;color:#b9bfb5}
input{width:100%;background:#0c0e0c;color:#eef1ea;border:1px solid rgba(238,241,234,.22);border-radius:.9rem;padding:.9rem 1rem;font:inherit}
input:focus-visible,button:focus-visible{outline:2px solid #ece6d8;outline-offset:2px}
button{justify-self:start;background:#ece6d8;color:#12110e;border:0;border-radius:999px;padding:.9rem 1.5rem;font-family:inherit;font-size:1rem;font-weight:600;line-height:1;cursor:pointer}
.err{color:#e9a46a;font-size:.9375rem}
small{color:#9aa197}
</style></head><body><main>
<img src="/icon-512.png" alt="Jossue Alcalá">
<div><p class="k">Propuesta privada</p><h1>Hola, ${name}.</h1></div>
<p>Esta propuesta es solo para ti. Escribe la contraseña que te compartí para verla.</p>
<form method="post" action="/propuestas/${slug}/acceso">
<label for="pw">Contraseña</label>
<input id="pw" name="password" type="password" autocomplete="current-password" required autofocus>
${error ? '<p class="err" role="alert">Esa contraseña no es. Revísala o escríbeme y te la vuelvo a mandar.</p>' : ''}
<button type="submit">Ver la propuesta</button>
</form>
<small>¿No la tienes? Escríbeme a hola@jossuealcala.com</small>
</main></body></html>`;
	return new Response(html, { status: error ? 401 : 200, headers: { ...PRIVATE, 'Content-Type': 'text/html; charset=utf-8' } });
}

const notFound = () => new Response('Not found', { status: 404, headers: { ...PRIVATE, 'Content-Type': 'text/plain; charset=utf-8' } });

async function readForm(request) {
	const type = request.headers.get('Content-Type') ?? '';
	const text = (await request.text()).slice(0, 8192);
	if (type.includes('application/json')) {
		try { return JSON.parse(text) ?? {}; } catch { return {}; }
	}
	return Object.fromEntries(new URLSearchParams(text));
}

/** Atiende todo lo que cae bajo /propuestas/. Devuelve null si la ruta no es de propuestas. */
export async function handleProposal(request, env, ctx, now = Date.now()) {
	const url = new URL(request.url);
	const match = url.pathname.match(/^\/propuestas\/([^/]+)(\/.*)?$/);
	if (!match) return null;
	const [, slug, rest = ''] = match;
	const password = SLUG.test(slug) ? String(env[secretName(slug)] ?? '') : '';
	if (!password) return notFound();
	if (rest === '') return Response.redirect(new URL(`/propuestas/${slug}/`, url).toString(), 301);
	// Un POST solo vale desde la propia página: si el navegador dice de dónde viene, tiene que ser este sitio.
	const from = request.headers.get('Origin');
	if (request.method === 'POST' && from && from !== url.origin) return new Response('Forbidden', { status: 403, headers: PRIVATE });

	if (rest === '/acceso' && request.method === 'POST') {
		const fields = await readForm(request);
		if (!(await sameSecret(fields.password, password))) {
			await new Promise((r) => setTimeout(r, 400));
			return loginPage(slug, { error: true });
		}
		const cookie = `${cookieName(slug)}=${await sessionValue(slug, password, now)}; Path=/propuestas/${slug}/; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`;
		const opened = notify(env, { kind: 'proposal', subject: `${titleOf(slug)} abrió su propuesta`, text: `${titleOf(slug)} entró con su contraseña a https://jossuealcala.com/propuestas/${slug}/ (${new Date(now).toISOString()}).` });
		if (ctx?.waitUntil) ctx.waitUntil(opened); else await opened;
		return new Response(null, { status: 303, headers: { ...PRIVATE, Location: `/propuestas/${slug}/`, 'Set-Cookie': cookie } });
	}

	const authed = await validSession(request, slug, password, now);

	if (rest === '/aceptar' && request.method === 'POST') {
		if (!authed) return new Response(JSON.stringify({ ok: false }), { status: 401, headers: { ...PRIVATE, 'Content-Type': 'application/json' } });
		const fields = await readForm(request);
		const message = String(fields.mensaje ?? '').trim().slice(0, MAX_MESSAGE);
		const sent = await notify(env, {
			kind: 'proposal',
			subject: `${titleOf(slug)} quiere arrancar`,
			text: `${titleOf(slug)} pulsó «Quiero arrancar» en su propuesta.\n\n${message ? `Mensaje:\n${message}` : 'Sin mensaje.'}\n\nhttps://jossuealcala.com/propuestas/${slug}/`,
		});
		return new Response(JSON.stringify({ ok: sent }), { status: sent ? 200 : 502, headers: { ...PRIVATE, 'Content-Type': 'application/json' } });
	}

	if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405, headers: PRIVATE });
	if (!authed) {
		// La página pide contraseña; cualquier otro archivo de la carpeta simplemente no existe sin sesión.
		return rest === '/' || rest === '/index.html' ? loginPage(slug) : notFound();
	}
	const asset = await env.ASSETS.fetch(request);
	const response = new Response(asset.body, asset);
	for (const [k, v] of Object.entries(PRIVATE)) response.headers.set(k, v);
	return response;
}

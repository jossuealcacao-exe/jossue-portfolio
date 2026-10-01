// Jossue AI: el asistente del portafolio. Sigue la estructura de Daniela (Gemini por REST, sin
// SDK, respuesta en JSON con esquema, límites por sesión y por IP, texto guardado sin datos
// personales y con retención corta), pero su trabajo es otro: contar qué hace Jossué, con qué
// resultados, y llevar a la gente a hablar con él.
//
// Lo que sabe sale de /ai/knowledge.json, que Astro genera en el build con los mismos datos
// del sitio. La API key vive solo como secreto del Worker (GEMINI_API_KEY).

import { ALERT_LINE, canaryLine, guardedAnswer, recentAbuse } from './guard.mjs';
import { EXAMPLES, PERSONA } from './persona.mjs';

const DEFAULT_MODEL = 'gemini-3.5-flash';
// Si Gemini falla por algo pasajero (429, 5xx, red), se intenta una vez más con este modelo.
const FALLBACK_MODEL = 'gemini-2.5-flash';
const RETRYABLE = new Set([429, 500, 502, 503, 504]);
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const MAX_HISTORY = 12; // mensajes que se mandan al modelo
const MAX_TURNS = 30; // mensajes de la persona por conversación
const MAX_INPUT = 800; // caracteres por mensaje
const IP_WINDOW_MS = 10 * 60_000;
const IP_MAX_MESSAGES = 24;
const RETENTION_DAYS = 30;
const TEST_PREFIX = 'QA-';
const MAX_LEADS_PER_IP_DAY = 3; // recados por IP al día: evita que alguien llene de correos a Jossué

export const SCHEMA = {
	type: 'OBJECT',
	properties: {
		reply: { type: 'STRING', description: 'Respuesta de Jossue AI con la voz de la persona. Concisa (2 a 5 frases); máximo 160 palabras en temas técnicos. Texto plano, sin markdown.' },
		suggestions: {
			type: 'ARRAY',
			description: '0 a 3 preguntas cortas (máx. 6 palabras) que la persona podría hacer después.',
			items: { type: 'STRING' },
		},
		action: {
			type: 'STRING',
			enum: ['none', 'contact', 'whatsapp', 'cv', 'page'],
			description: 'Botón que acompaña la respuesta. contact = formulario; page = una página del sitio.',
		},
		page: { type: 'STRING', description: 'Solo con action=page: URL completa de jossuealcala.com tomada del conocimiento.' },
		lead: {
			type: 'OBJECT',
			description: 'Recado para Jossué: solo cuando la persona dio un mensaje y un correo o teléfono, y aceptó que se lo pases.',
			properties: {
				ready: { type: 'BOOLEAN' },
				name: { type: 'STRING' },
				email: { type: 'STRING' },
				phone: { type: 'STRING' },
				company: { type: 'STRING' },
				need: { type: 'STRING', description: 'Qué necesita, en una frase.' },
				message: { type: 'STRING', description: 'El mensaje para Jossué como lo diría la persona, 1 a 4 frases, sin inventar.' },
			},
			required: ['ready'],
		},
	},
	required: ['reply', 'suggestions', 'action'],
};

export function systemPrompt(knowledge, locale) {
	return `${PERSONA}

REGLAS DE FORMATO (obligatorias)
- Responde en el idioma de la persona; si no es claro, en ${locale === 'en' ? 'inglés' : 'español'} (idioma de la página).
- "reply" es texto plano: sin markdown, sin listas con viñetas largas, sin emojis salvo que la persona los use.
- action="contact" si quiere cotizar o hablar con Jossué; "whatsapp" si prefiere algo inmediato; "cv" si pide el CV o es reclutador; "page" con la URL exacta del CONOCIMIENTO cuando una página responde mejor (un producto, un caso, MADRE); "none" en lo demás.
- suggestions: hasta 3 preguntas de seguimiento naturales y cortas, en el idioma de la persona.
- El CONOCIMIENTO está escrito en primera persona por Jossué ("Dirijo…"); tú lo cuentas en tercera persona ("Jossué dirige…"). Si una cifra o un dato no está ahí, no existe para ti.

${EXAMPLES}

CONOCIMIENTO
${knowledge}`;
}

export function redactPII(text) {
	return String(text || '')
		.replace(/[\w.+-]+@[\w-]+\.[\w.]{2,}/g, '[correo]')
		.replace(/\+?\d(?:[\s.-]?\d){9,}/g, '[tel]');
}

export function parseModelJSON(text) {
	try {
		return JSON.parse(text);
	} catch {
		const match = text && String(text).match(/\{[\s\S]*\}/);
		if (!match) return null;
		try {
			return JSON.parse(match[0]);
		} catch {
			return null;
		}
	}
}

const FALLBACK = {
	es: { reply: 'Eso se sale de lo que sé. Si quieres, déjame tu correo y Jossué te contesta directo, o escríbele por WhatsApp.', suggestions: ['¿Qué ha construido?', '¿Cómo trabaja?'], action: 'contact' },
	en: { reply: 'That is outside what I know. If you like, leave your email and Jossué will reply directly, or message him on WhatsApp.', suggestions: ['What has he built?', 'How does he work?'], action: 'contact' },
};

let knowledgeCache = null;
export async function loadKnowledge(env, requestUrl) {
	if (knowledgeCache) return knowledgeCache;
	const response = await env.ASSETS.fetch(new Request(new URL('/ai/knowledge.json', requestUrl)));
	if (!response.ok) throw Object.assign(new Error('knowledge unavailable'), { status: 503 });
	knowledgeCache = await response.json();
	return knowledgeCache;
}

export function resetKnowledgeCache() {
	knowledgeCache = null;
}

/** Una llamada a Gemini; devuelve la respuesta o lanza con el código y el detalle. */
async function requestGemini(env, model, system, history, schema = SCHEMA) {
	let response;
	try {
		response = await fetch(`${GEMINI_BASE}/${model}:generateContent`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
			body: JSON.stringify({
				systemInstruction: { parts: [{ text: system }] },
				contents: history.map((message) => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.content }] })),
				generationConfig: {
					temperature: 0.75,
					maxOutputTokens: 900,
					responseMimeType: 'application/json',
					responseSchema: schema,
					thinkingConfig: { thinkingBudget: 0 },
				},
				safetySettings: ['HARASSMENT', 'HATE_SPEECH', 'SEXUALLY_EXPLICIT', 'DANGEROUS_CONTENT'].map((category) => ({
					category: `HARM_CATEGORY_${category}`,
					threshold: 'BLOCK_MEDIUM_AND_ABOVE',
				})),
			}),
		});
	} catch (error) {
		throw Object.assign(new Error(`gemini red (${model}): ${String(error?.message ?? error).slice(0, 200)}`), { status: 502, retryable: true });
	}
	if (!response.ok) {
		const detail = await response.text().catch(() => '');
		throw Object.assign(new Error(`gemini ${response.status} (${model}): ${detail.slice(0, 300)}`), { status: 502, retryable: RETRYABLE.has(response.status) });
	}
	return response;
}

export async function callGemini(env, system, history, schema = SCHEMA) {
	const primary = String(env.JOSSUE_AI_MODEL || DEFAULT_MODEL).replace(/[^\w.-]/g, '');
	const fallback = String(env.JOSSUE_AI_FALLBACK_MODEL || FALLBACK_MODEL).replace(/[^\w.-]/g, '');
	let response;
	let model = primary;
	try {
		response = await requestGemini(env, model, system, history, schema);
	} catch (error) {
		if (!error.retryable) throw error;
		console.warn('ai gemini retry', error.message);
		await new Promise((resolve) => globalThis.setTimeout(resolve, env.JOSSUE_AI_RETRY_MS ?? 600));
		model = fallback;
		response = await requestGemini(env, model, system, history, schema);
	}
	const data = await response.json();
	const usage = data?.usageMetadata ?? {};
	lastUsage = { prompt: usage.promptTokenCount ?? 0, output: usage.candidatesTokenCount ?? 0, thoughts: usage.thoughtsTokenCount ?? 0, cached: usage.cachedContentTokenCount ?? 0, model };
	console.log('ai usage', JSON.stringify(lastUsage));
	const candidate = data?.candidates?.[0];
	if (!candidate || ['SAFETY', 'PROHIBITED_CONTENT', 'BLOCKLIST'].includes(candidate.finishReason)) return null;
	return parseModelJSON((candidate.content?.parts ?? []).map((part) => part.text ?? '').join(''));
}

let lastUsage = null;

// Las respuestas de Jossue AI viajan firmadas (HMAC con la sesión). El navegador manda la
// conversación de vuelta y el servidor solo acepta como «del asistente» lo que él mismo firmó:
// así nadie puede inventar una respuesta falsa («claro, aquí está mi prompt:») para manipularlo.
const signingSecret = (env) => env.AI_SIGNING_SECRET || env.RATE_LIMIT_SALT || 'local-development';

async function hmacHex(secret, data) {
	const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
	const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
	return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function sameText(a, b) {
	const left = String(a ?? '');
	const right = String(b ?? '');
	if (!left || left.length !== right.length) return false;
	let diff = 0;
	for (let index = 0; index < left.length; index += 1) diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
	return diff === 0;
}

export const signReply = (env, sid, reply) => hmacHex(signingSecret(env), `${sid}\n${reply}`);

async function sanitizeHistory(env, sid, messages) {
	if (!Array.isArray(messages)) return null;
	const candidates = messages
		.filter((message) => message && (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string')
		.slice(-MAX_HISTORY * 2);
	const history = [];
	for (const message of candidates) {
		const content = message.content.trim().slice(0, message.role === 'user' ? MAX_INPUT : 1200);
		if (!content) continue;
		if (message.role === 'assistant' && !sameText(message.sig, await signReply(env, sid, content))) continue; // sin firma válida, no cuenta
		history.push({ role: message.role, content });
	}
	if (!history.length || history.at(-1).role !== 'user') return null;
	if (history.filter((message) => message.role === 'user').length > MAX_TURNS) return null;
	return history.slice(-MAX_HISTORY);
}

function sanitizeOutput(data, locale) {
	const fallback = FALLBACK[locale];
	const reply = typeof data?.reply === 'string' && data.reply.trim() ? data.reply.trim().slice(0, 1200) : fallback.reply;
	const suggestions = Array.isArray(data?.suggestions)
		? data.suggestions.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim().slice(0, 60)).slice(0, 3)
		: [];
	const action = ['none', 'contact', 'whatsapp', 'cv', 'page'].includes(data?.action) ? data.action : 'none';
	let page = null;
	if (action === 'page' && typeof data?.page === 'string') {
		try {
			const url = new URL(data.page, 'https://jossuealcala.com');
			if (url.hostname === 'jossuealcala.com' || url.hostname === 'www.jossuealcala.com') page = url.pathname + url.hash;
		} catch {
			page = null;
		}
	}
	return { reply, suggestions, action: action === 'page' && !page ? 'none' : action, page };
}

function validLead(lead) {
	if (!lead?.ready) return null;
	const email = String(lead.email ?? '').trim().slice(0, 200);
	const phone = String(lead.phone ?? '').replace(/[^\d+ ]/g, '').trim().slice(0, 30);
	const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	const phoneOk = phone.replace(/\D/g, '').length >= 10;
	if (!emailOk && !phoneOk) return null;
	return {
		name: String(lead.name ?? '').trim().slice(0, 120),
		email: emailOk ? email : '',
		phone: phoneOk ? phone : '',
		company: String(lead.company ?? '').trim().slice(0, 160),
		need: String(lead.need ?? '').trim().slice(0, 500),
		message: String(lead.message ?? '').trim().slice(0, 1500),
	};
}

async function tooManyFromIp(env, ipHash) {
	if (!env.DB) return false;
	const since = Date.now() - IP_WINDOW_MS;
	const row = await env.DB.prepare("SELECT COUNT(*) AS total FROM ai_messages WHERE ip_hash = ? AND ts >= ? AND role = 'user'")
		.bind(ipHash, since)
		.first()
		.catch(() => null);
	return Number(row?.total ?? 0) >= IP_MAX_MESSAGES;
}

async function saveTurn(env, { sid, ipHash, locale, page, question, answer, firstTurn }) {
	if (!env.DB || !sid) return;
	try {
		if (sid.startsWith(TEST_PREFIX) && firstTurn) await env.DB.prepare('DELETE FROM ai_messages WHERE sid = ?').bind(sid).run();
		const ts = Date.now();
		await env.DB.batch([
			env.DB.prepare("INSERT INTO ai_messages (sid, ts, role, text, ip_hash, locale, page) VALUES (?, ?, 'user', ?, ?, ?, ?)").bind(sid, ts, redactPII(question).slice(0, 2000), ipHash, locale, page),
			env.DB.prepare("INSERT INTO ai_messages (sid, ts, role, text, ip_hash, locale, page) VALUES (?, ?, 'assistant', ?, ?, ?, ?)").bind(sid, ts + 1, redactPII(answer).slice(0, 2000), ipHash, locale, page),
		]);
		// Purga perezosa, como en Daniela: de vez en cuando y no en cada turno.
		if (Math.random() < 0.03) await env.DB.prepare('DELETE FROM ai_messages WHERE ts < ?').bind(ts - RETENTION_DAYS * 864e5).run();
	} catch (error) {
		console.error('ai saveTurn failed', error?.message);
	}
}

async function tooManyLeads(env, ipHash) {
	if (!env.DB) return false;
	const since = new Date(Date.now() - 864e5).toISOString();
	const row = await env.DB.prepare('SELECT COUNT(*) AS total FROM ai_leads WHERE ip_hash = ? AND created_at >= ?').bind(ipHash, since).first().catch(() => null);
	return Number(row?.total ?? 0) >= MAX_LEADS_PER_IP_DAY;
}

async function saveLead(env, { sid, ipHash, locale, page, lead, transcript }) {
	const id = crypto.randomUUID();
	const createdAt = new Date().toISOString();
	if (env.DB) {
		await env.DB.prepare('INSERT INTO ai_leads (id, created_at, sid, locale, page, name, email, phone, company, need, message, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
			.bind(id, createdAt, sid, locale, page, lead.name, lead.email, lead.phone, lead.company, lead.need, lead.message, ipHash ?? '')
			.run()
			.catch((error) => console.error('ai saveLead failed', error?.message));
	}
	const recipient = String(env.CONTACT_EMAIL_TO ?? '').trim();
	if (!env.CONTACT_EMAIL || !recipient) return;
	const text = [
		'Jossue AI consiguió un contacto en jossuealcala.com',
		'',
		`Nombre: ${lead.name || '(sin nombre)'}`,
		lead.email && `Correo: ${lead.email}`,
		lead.phone && `Teléfono: ${lead.phone}`,
		lead.company && `Empresa: ${lead.company}`,
		`Necesita: ${lead.need || '(no lo dijo)'}`,
		'',
		'Mensaje:',
		lead.message || '(sin mensaje)',
		`Página: ${page}`,
		'',
		'Conversación (sin datos personales):',
		...transcript.map((message) => `${message.role === 'user' ? 'Persona' : 'Jossue AI'}: ${redactPII(message.content)}`),
	]
		.filter(Boolean)
		.join('\n');
	await env.CONTACT_EMAIL.send({
		to: recipient,
		from: { email: 'hola@jossuealcala.com', name: 'Jossue AI' },
		...(lead.email ? { replyTo: { email: lead.email, name: lead.name || lead.email } } : {}),
		subject: `Jossue AI · mensaje de ${(lead.name || lead.email || lead.phone).slice(0, 60)}${lead.need ? ` · ${lead.need.slice(0, 60)}` : ''}`,
		text,
	}).catch((error) => console.error('ai lead email failed', error?.name));
}

/** POST /api/ai  { sid, locale, page, messages: [{ role, content, sig? }] } */
export async function handleAi(request, env, { json, origin, ipHash }) {
	let body;
	try {
		body = await request.json();
	} catch {
		return json(400, { ok: false, error: 'Invalid JSON body' }, origin);
	}
	const locale = body?.locale === 'en' ? 'en' : 'es';
	const sid = String(body?.sid ?? '').replace(/[^\w-]/g, '').slice(0, 64);
	const page = String(body?.page ?? '').slice(0, 200);
	const history = sid ? await sanitizeHistory(env, sid, body?.messages) : null;
	if (!sid || !history) return json(400, { ok: false, error: 'Invalid messages' }, origin);
	if (!env.GEMINI_API_KEY) return json(503, { ok: false, error: 'ai_unavailable' }, origin);
	if (await tooManyFromIp(env, ipHash)) return json(429, { ok: false, error: 'rate_limited' }, origin);

	const question = history.at(-1).content;
	let result;
	let modelMs;
	try {
		const knowledge = await loadKnowledge(env, request.url);
		result = await guardedAnswer(env, {
			question,
			previousUser: history.slice(0, -1).filter((message) => message.role === 'user').map((message) => message.content),
			locale,
			keys: [`ip:${ipHash}`, `sid:${sid}`],
			source: 'web',
			seed: sid + question,
			runMain: async (alertMode, canary) => {
				const started = Date.now();
				const system = `${systemPrompt(knowledge[locale] ?? knowledge.es, locale)}\n\n${canaryLine(canary)}${alertMode ? `\n${ALERT_LINE}` : ''}`;
				const data = await callGemini(env, system, history);
				modelMs = Date.now() - started;
				return data ? { ...sanitizeOutput(data, locale), lead: validLead(data.lead) } : { ...FALLBACK[locale], page: null, lead: null };
			},
		});
	} catch (error) {
		console.error('ai request failed', error?.message);
		return json(Number(error?.status) === 503 ? 503 : 502, { ok: false, error: 'ai_failed' }, origin);
	}

	// Abuso detectado (o persona bloqueada): respuesta genérica, sin botones, sin recado.
	const output = result.output ?? { reply: result.reply, suggestions: [], action: 'none', page: null, lead: null };
	await saveTurn(env, { sid, ipHash, locale, page, question, answer: output.reply, firstTurn: history.filter((message) => message.role === 'user').length === 1 });
	let leadSaved = false;
	if (output.lead && !(await tooManyLeads(env, ipHash))) {
		await saveLead(env, { sid, ipHash, locale, page, lead: output.lead, transcript: [...history, { role: 'assistant', content: output.reply }] });
		leadSaved = true;
	}
	const sig = await signReply(env, sid, output.reply);
	// Diagnóstico (modelo, tokens, decisión del vigilante): solo con el token de administración.
	const admin = env.ADMIN_TOKEN && sameText((request.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, ''), env.ADMIN_TOKEN);
	const debug = admin ? { modelMs, usage: lastUsage, guard: result.guard ?? null, abuse: result.abuse } : undefined;
	return json(200, { ok: true, reply: output.reply, sig, suggestions: output.suggestions, action: output.action, page: output.page, leadSaved, ...(result.blocked ? { blocked: true } : {}), ...(debug ? { debug } : {}) }, origin);
}

/** GET /api/ai/chats  (Bearer ADMIN_TOKEN) — para leer conversaciones y afinar el prompt. */
export async function handleAiChats(request, env, { json, origin }) {
	const url = new URL(request.url);
	const days = Math.min(RETENTION_DAYS, Math.max(1, Number(url.searchParams.get('days') ?? 7) || 7));
	const since = Date.now() - days * 864e5;
	try {
		const [messages, leads] = await Promise.all([
			env.DB.prepare('SELECT sid, ts, role, text, locale, page FROM ai_messages WHERE ts >= ? ORDER BY sid, ts LIMIT 2000').bind(since).all(),
			env.DB.prepare('SELECT id, created_at AS createdAt, name, email, phone, company, need, message, page FROM ai_leads ORDER BY created_at DESC LIMIT 100').all(),
		]);
		const conversations = {};
		for (const row of messages.results ?? []) (conversations[row.sid] ??= []).push({ ts: row.ts, role: row.role, text: row.text, page: row.page, locale: row.locale });
		const abuse = await recentAbuse(env, days);
		return json(200, { ok: true, days, conversations, leads: leads.results ?? [], abuse }, origin);
	} catch {
		return json(500, { ok: false, error: 'Unable to read conversations' }, origin);
	}
}

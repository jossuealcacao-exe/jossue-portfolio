// Jossue AI en el WhatsApp Business de Jossué (Cloud API en modo coexistencia: el mismo número
// sigue en la app de Jossué). Jossue AI contesta a todos; cuando algo necesita a Jossué
// (cotizar, un proyecto en curso, pagos, una queja, que pidan hablar con él, algo personal o que
// no sabe) se lo pasa: avisa a la persona, le manda un correo a Jossué con el resumen y se calla
// en ese chat. En cuanto Jossué escribe desde la app (evento smb_message_echoes), el bot se pausa
// en ese chat y no vuelve hasta que pasan unas horas sin que él responda.
//
// Meta manda todo a POST /api/whatsapp. Se contesta 200 de inmediato y el trabajo sigue en
// segundo plano (ctx.waitUntil): Meta reintenta si tarda, y el id de cada mensaje evita contestar
// dos veces. El formato es el oficial de la Cloud API, con o sin un Tech Partner en medio.
//
// Cómo se sabe que un webhook viene de Meta, según cómo se conectó el número:
// - App de Meta propia: Meta firma con su App Secret → WHATSAPP_APP_SECRET y firma obligatoria.
// - Tech Partner con registro integrado (p. ej. Dualhook): Meta firma con la app DEL PARTNER y esa
//   firma no se puede comprobar. Entonces la URL lleva un segmento secreto largo
//   (/api/whatsapp/<WHATSAPP_WEBHOOK_KEY>) y además se exige el phone_number_id configurado.
//
// Secretos (wrangler secret put): WHATSAPP_TOKEN, WHATSAPP_VERIFY_TOKEN y uno de los dos de arriba.
// Variables: WHATSAPP_PHONE_NUMBER_ID; WHATSAPP_API_BASE y WHATSAPP_GRAPH_VERSION si se envía por
// un partner (Dualhook: https://api.dualhook.com y v25.0). Opcionales: WA_PAUSE_HOURS (después de
// que escribe Jossué) y WA_HANDOFF_HOURS (después de pasarle un chat).

import { PERSONA } from './persona.mjs';
import { SCHEMA, callGemini, loadKnowledge, redactPII } from './ai.mjs';
import { ALERT_LINE, blockedUntil, canaryLine, guardedAnswer } from './guard.mjs';

const KNOWLEDGE_URL = 'https://jossuealcala.com/';
const MAX_HISTORY = 14; // mensajes que se mandan al modelo
const HISTORY_DAYS = 7; // la memoria del chat que ve el modelo
const MAX_INPUT = 1000;
const MAX_PER_DAY = 40; // mensajes de una misma persona al día que contesta el bot
const STALE_MS = 15 * 60_000; // un mensaje con más de 15 min (reintentos, caídas) se guarda pero no se contesta
const RETENTION_DAYS = 30;
const DEFAULT_PAUSE_HOURS = 12;
const DEFAULT_HANDOFF_HOURS = 24;

/** El mismo esquema de la web, más la decisión de pasarle el chat a Jossué. */
export const WA_SCHEMA = {
	...SCHEMA,
	properties: {
		...SCHEMA.properties,
		handoff: {
			type: 'OBJECT',
			description: 'needed=true cuando la conversación necesita que Jossué conteste en persona.',
			properties: {
				needed: { type: 'BOOLEAN' },
				reason: { type: 'STRING', enum: ['quote', 'project', 'payment', 'complaint', 'asks_for_jossue', 'personal', 'unknown', 'other'] },
				summary: { type: 'STRING', description: 'En 1 o 2 frases: qué necesita la persona y qué tiene que decidir o contestar Jossué.' },
			},
			required: ['needed'],
		},
	},
	required: ['reply'],
};

const REASON = { quote: 'Quiere cotizar o contratar', project: 'Proyecto o cliente en curso', payment: 'Pagos, facturas o contratos', complaint: 'Queja', asks_for_jossue: 'Pide hablar contigo', personal: 'Algo personal o te conoce', unknown: 'Algo que Jossue AI no sabe', other: 'Necesita tu respuesta', media: 'Mandó un archivo, audio o imagen' };

export function waSystemPrompt(knowledge, { firstMessage, profileName }) {
	return `${PERSONA}

CANAL: WHATSAPP
- Estás contestando en el WhatsApp Business de Jossué. Mucha gente cree que le escribe a él directo.${firstMessage ? '\n- ES EL PRIMER MENSAJE de esta persona: empieza con una línea que diga que eres Jossue AI, el asistente de Jossué, y que si necesita algo de él se lo pasas.' : ''}
- Respuestas de chat: 1 a 3 frases, texto plano, sin markdown ni viñetas. Como mucho una URL de jossuealcala.com si de verdad ayuda.
- Ya tienes su número de WhatsApp: NO se lo pidas. Para un recado basta con lo que necesita (y su nombre si lo quiere dar).${profileName ? `\n- Su nombre de perfil de WhatsApp es «${profileName}»; úsalo con naturalidad solo si viene al caso.` : ''}
- Aquí solo atiendes temas del trabajo de Jossué. Si piden algo ajeno (tareas, poemas, programar algo general, que seas un asistente para todo), di con amabilidad que por aquí solo ves temas de Jossué.
- handoff.needed = true cuando: quiere cotizar, contratar o agendar una llamada (reason quote); habla de un proyecto en curso o es cliente (project); pagos, facturas o contratos (payment); una queja (complaint); pide hablar con Jossué (asks_for_jossue); es algo personal o parece que lo conoce (personal); o la respuesta no está en el CONOCIMIENTO (unknown).
- Con handoff.needed = true, tu reply dice que se lo pasas a Jossué y que él le contesta por aquí mismo. No prometas tiempos ("en cuanto pueda" está bien). No sigas vendiendo ni hagas más preguntas que las necesarias para que Jossué entienda el caso.
- handoff.summary: qué necesita y qué falta que conteste o decida Jossué, en 1 o 2 frases y en español.
- lead.ready = true solo si además dejó un recado claro para Jossué.
- Los mensajes marcados [Jossué] los escribió Jossué en persona desde su app: no te contradigas con ellos.

CONOCIMIENTO
${knowledge}`;
}

// ---------- utilidades ----------

const encoder = new TextEncoder();
const hex = (buffer) => [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');

async function hmacHex(secret, data) {
	const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
	return hex(await crypto.subtle.sign('HMAC', key, typeof data === 'string' ? encoder.encode(data) : data));
}

function sameText(a, b) {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let index = 0; index < a.length; index += 1) diff |= a.charCodeAt(index) ^ b.charCodeAt(index);
	return diff === 0;
}

/** Firma X-Hub-Signature-256 = sha256=HMAC(app secret, cuerpo exacto). */
export async function validSignature(rawBody, header, appSecret) {
	if (!appSecret || !header?.startsWith('sha256=')) return false;
	return sameText(header.slice(7), await hmacHex(appSecret, rawBody));
}

/** El número nunca se guarda tal cual en la base: se guarda su huella. */
const chatKey = async (env, waId) => `wa-${(await hmacHex(env.RATE_LIMIT_SALT || 'local-development', `wa:${waId}`)).slice(0, 24)}`;

function textOf(message) {
	if (message.type === 'text') return message.text?.body ?? '';
	if (message.type === 'button') return message.button?.text ?? '';
	if (message.type === 'interactive') return message.interactive?.button_reply?.title ?? message.interactive?.list_reply?.title ?? '';
	return '';
}

// ---------- estado del chat (D1) ----------

async function getChat(env, key) {
	const row = await env.DB.prepare('SELECT * FROM wa_chats WHERE chat_key = ?').bind(key).first().catch(() => null);
	return row ?? { chat_key: key, paused_until: 0, handoff_at: 0, owner_last_at: 0, greeted: 0, day: '', day_count: 0 };
}

async function putChat(env, chat) {
	await env.DB.prepare(
		`INSERT INTO wa_chats (chat_key, paused_until, handoff_at, owner_last_at, greeted, day, day_count, updated_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		 ON CONFLICT (chat_key) DO UPDATE SET paused_until = excluded.paused_until, handoff_at = excluded.handoff_at,
		 owner_last_at = excluded.owner_last_at, greeted = excluded.greeted, day = excluded.day, day_count = excluded.day_count,
		 updated_at = excluded.updated_at`,
	)
		.bind(chat.chat_key, chat.paused_until, chat.handoff_at, chat.owner_last_at, chat.greeted, chat.day, chat.day_count, Date.now())
		.run()
		.catch((error) => console.error('wa putChat failed', error?.message));
}

/** true si este id de mensaje ya se procesó (Meta reintenta los webhooks). */
async function alreadySeen(env, messageId) {
	if (!messageId) return false;
	const result = await env.DB.prepare('INSERT OR IGNORE INTO wa_events (id, ts) VALUES (?, ?)').bind(messageId, Date.now()).run().catch(() => null);
	return result ? Number(result.meta?.changes ?? 1) === 0 : false;
}

async function remember(env, key, role, text, ts = Date.now()) {
	await env.DB.prepare("INSERT INTO ai_messages (sid, ts, role, text, ip_hash, locale, page) VALUES (?, ?, ?, ?, 'whatsapp', 'es', 'whatsapp')")
		.bind(key, ts, role, redactPII(text).slice(0, 2000))
		.run()
		.catch((error) => console.error('wa remember failed', error?.message));
	if (Math.random() < 0.03) {
		const cutoff = Date.now() - RETENTION_DAYS * 864e5;
		await env.DB.batch([
			env.DB.prepare("DELETE FROM ai_messages WHERE page = 'whatsapp' AND ts < ?").bind(cutoff),
			env.DB.prepare('DELETE FROM wa_events WHERE ts < ?').bind(cutoff),
		]).catch(() => null);
	}
}

async function recentHistory(env, key) {
	const since = Date.now() - HISTORY_DAYS * 864e5;
	const { results } = await env.DB.prepare('SELECT role, text FROM ai_messages WHERE sid = ? AND ts >= ? ORDER BY ts DESC LIMIT ?').bind(key, since, MAX_HISTORY).all().catch(() => ({ results: [] }));
	return (results ?? []).reverse().map((row) => ({ role: row.role, content: row.text }));
}

// ---------- envío por la Cloud API ----------

function graphUrl(env) {
	const base = String(env.WHATSAPP_API_BASE || 'https://graph.facebook.com').replace(/\/$/, '');
	return `${base}/${env.WHATSAPP_GRAPH_VERSION || 'v25.0'}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
}

async function graph(env, payload) {
	const response = await fetch(graphUrl(env), {
		method: 'POST',
		headers: { Authorization: `Bearer ${env.WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({ messaging_product: 'whatsapp', ...payload }),
	});
	if (!response.ok) console.error('wa graph failed', response.status, (await response.text().catch(() => '')).slice(0, 300));
	return response.ok;
}

const markReadTyping = (env, messageId) => graph(env, { status: 'read', message_id: messageId, typing_indicator: { type: 'text' } });
const sendText = (env, to, body) => graph(env, { recipient_type: 'individual', to, type: 'text', text: { preview_url: true, body: body.slice(0, 4000) } });

// ---------- aviso a Jossué ----------

async function notifyOwner(env, { kind, waId, profileName, summary, lead, transcript }) {
	const recipient = String(env.CONTACT_EMAIL_TO ?? '').trim();
	if (env.DB && lead) {
		await env.DB.prepare('INSERT INTO ai_leads (id, created_at, sid, locale, page, name, email, phone, company, need, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
			.bind(crypto.randomUUID(), new Date().toISOString(), `wa:${waId.slice(-4)}`, 'es', 'whatsapp', lead.name || profileName || '', lead.email || '', `+${waId}`, lead.company || '', lead.need || summary || '', lead.message || '')
			.run()
			.catch((error) => console.error('wa lead failed', error?.message));
	}
	if (!env.CONTACT_EMAIL || !recipient) return;
	const who = profileName || `+${waId}`;
	const text = [
		`${REASON[kind] ?? REASON.other} · WhatsApp`,
		'',
		`Quién: ${who} (+${waId})`,
		`Abrir el chat: https://wa.me/${waId}`,
		summary && `Resumen: ${summary}`,
		lead?.message && `Recado: ${lead.message}`,
		'',
		'Jossue AI se queda callado en este chat hasta que contestes tú (o pasen unas horas).',
		'',
		'Conversación:',
		...transcript.map((message) => `${message.role === 'user' ? who : 'Jossue AI'}: ${message.content}`),
	]
		.filter((line) => line !== undefined && line !== null && line !== false)
		.join('\n');
	await env.CONTACT_EMAIL.send({
		to: recipient,
		from: { email: 'hola@jossuealcala.com', name: 'Jossue AI · WhatsApp' },
		subject: `WhatsApp · ${who.slice(0, 40)} necesita tu respuesta${summary ? ` · ${summary.slice(0, 70)}` : ''}`,
		text,
	}).catch((error) => console.error('wa owner email failed', error?.name));
}

// ---------- lógica ----------

const today = () => new Date().toISOString().slice(0, 10);
const hours = (value, fallback) => (Number(value) > 0 ? Number(value) : fallback) * 3600_000;

/** Jossué escribió desde su app: el bot se calla en ese chat por unas horas. */
async function onOwnerEcho(env, echo) {
	const waId = String(echo.to ?? '');
	if (!waId) return;
	const key = await chatKey(env, waId);
	const chat = await getChat(env, key);
	const now = Date.now();
	chat.owner_last_at = now;
	chat.paused_until = now + hours(env.WA_PAUSE_HOURS, DEFAULT_PAUSE_HOURS);
	chat.handoff_at = 0;
	chat.greeted = 1;
	await putChat(env, chat);
	const body = textOf(echo);
	if (body) await remember(env, key, 'assistant', `[Jossué] ${body}`, Number(echo.timestamp) * 1000 || now);
}

async function onIncoming(env, message, contact) {
	const waId = String(message.from ?? '');
	if (!waId || message.type === 'reaction' || (await alreadySeen(env, message.id))) return;
	const key = await chatKey(env, waId);
	const chat = await getChat(env, key);
	const now = Date.now();
	const sentAt = Number(message.timestamp) * 1000 || now;
	const text = textOf(message).trim().slice(0, MAX_INPUT);
	const profileName = String(contact?.profile?.name ?? '').trim().slice(0, 60);

	await remember(env, key, 'user', text || `[${message.type}]`, sentAt);

	// Jossué está atendiendo este chat, o ya se lo pasamos: el bot no se mete.
	if (chat.paused_until > now) return;
	if (chat.handoff_at && now - chat.handoff_at < hours(env.WA_HANDOFF_HOURS, DEFAULT_HANDOFF_HOURS)) return;
	if (now - sentAt > STALE_MS) return;

	if (chat.day !== today()) {
		chat.day = today();
		chat.day_count = 0;
	}
	if (chat.day_count >= MAX_PER_DAY) return;
	// Bloqueado por abuso: ni se lee ni se contesta.
	if (await blockedUntil(env, [`wa:${key}`])) return;
	chat.day_count += 1;

	await markReadTyping(env, message.id);

	// Audio, foto, documento, ubicación…: el bot todavía no los lee; se lo pasa a Jossué.
	if (!text) {
		const reply = 'Recibí tu mensaje, pero por ahora solo leo texto. Se lo paso a Jossué para que lo vea y te conteste por aquí.';
		await sendText(env, waId, reply);
		await remember(env, key, 'assistant', reply);
		chat.handoff_at = now;
		chat.greeted = 1;
		await putChat(env, chat);
		await notifyOwner(env, { kind: 'media', waId, profileName, summary: `Mandó un mensaje de tipo ${message.type}.`, transcript: await recentHistory(env, key) });
		return;
	}

	const history = await recentHistory(env, key);
	if (!history.length || history.at(-1).role !== 'user') history.push({ role: 'user', content: text });
	let result = null;
	try {
		const knowledge = await loadKnowledge(env, KNOWLEDGE_URL);
		const system = waSystemPrompt(knowledge.es, { firstMessage: !chat.greeted, profileName });
		result = await guardedAnswer(env, {
			question: text,
			previousUser: history.slice(0, -1).filter((item) => item.role === 'user').map((item) => item.content),
			locale: 'es',
			keys: [`wa:${key}`],
			source: 'whatsapp',
			seed: message.id,
			alert: { who: profileName || `+${waId}`, link: `https://wa.me/${waId}` },
			runMain: (alertMode, canary) => callGemini(env, `${system}\n\n${canaryLine(canary)}${alertMode ? `\n${ALERT_LINE}` : ''}`, history, WA_SCHEMA),
		});
	} catch (error) {
		console.error('wa ai failed', error?.message);
	}
	// Abuso: respuesta genérica, sin pasarle nada a Jossué (la alerta, si toca, ya salió por correo).
	if (result?.abuse) {
		await sendText(env, waId, result.reply);
		await remember(env, key, 'assistant', result.reply);
		chat.greeted = 1;
		await putChat(env, chat);
		return;
	}
	const output = result?.output ?? null;
	// Si el modelo falla, no se improvisa: se le pasa el chat a Jossué.
	const handoff = output ? Boolean(output.handoff?.needed) : true;
	const reply = output?.reply?.trim()
		? output.reply.trim().slice(0, 1200)
		: 'Ahorita no puedo contestarte bien, así que se lo paso a Jossué para que te responda por aquí.';

	await sendText(env, waId, reply);
	await remember(env, key, 'assistant', reply);
	chat.greeted = 1;
	const lead = output?.lead?.ready ? output.lead : null;
	if (handoff || lead) {
		if (handoff) chat.handoff_at = now;
		await putChat(env, chat);
		await notifyOwner(env, {
			kind: handoff ? output?.handoff?.reason || 'other' : 'quote',
			waId,
			profileName,
			summary: String(output?.handoff?.summary || lead?.need || '').slice(0, 400),
			lead,
			transcript: [...history, { role: 'assistant', content: reply }],
		});
		return;
	}
	await putChat(env, chat);
}

/** Procesa un webhook ya verificado. Se corre en segundo plano. */
export async function processWebhook(env, payload) {
	for (const entry of payload?.entry ?? []) {
		for (const change of entry?.changes ?? []) {
			const value = change?.value ?? {};
			// Solo el número configurado: otro phone_number_id en la misma app no es asunto de este bot.
			if (String(value.metadata?.phone_number_id ?? '') !== String(env.WHATSAPP_PHONE_NUMBER_ID)) continue;
			try {
				if (change.field === 'smb_message_echoes') {
					for (const echo of value.message_echoes ?? []) await onOwnerEcho(env, echo);
				} else if (change.field === 'messages') {
					for (const message of value.messages ?? []) await onIncoming(env, message, (value.contacts ?? []).find((contact) => contact.wa_id === message.from) ?? value.contacts?.[0]);
				}
				// history y smb_app_state_sync (historial y contactos de la app) no cambian nada aquí.
			} catch (error) {
				console.error('wa webhook item failed', change.field, error?.message);
			}
		}
	}
}

/** La URL lleva la llave correcta (solo cuenta en el modo sin firma, con WHATSAPP_WEBHOOK_KEY). */
function pathKeyOk(url, env) {
	const key = url.pathname.replace(/^\/api\/whatsapp\/?/, '');
	return Boolean(env.WHATSAPP_WEBHOOK_KEY) && env.WHATSAPP_WEBHOOK_KEY.length >= 24 && sameText(key, env.WHATSAPP_WEBHOOK_KEY);
}

/** GET /api/whatsapp[/<llave>] (verificación de Meta) y POST (mensajes). */
export async function handleWhatsApp(request, env, ctx) {
	const url = new URL(request.url);
	const signed = Boolean(env.WHATSAPP_APP_SECRET);
	// En modo sin firma, una URL sin la llave correcta no existe.
	if (!signed && !pathKeyOk(url, env)) return new Response('Not found', { status: 404 });
	if (request.method === 'GET') {
		const ok = url.searchParams.get('hub.mode') === 'subscribe' && env.WHATSAPP_VERIFY_TOKEN && sameText(url.searchParams.get('hub.verify_token') ?? '', env.WHATSAPP_VERIFY_TOKEN);
		return ok ? new Response(url.searchParams.get('hub.challenge') ?? '', { status: 200, headers: { 'Content-Type': 'text/plain' } }) : new Response('Forbidden', { status: 403 });
	}
	if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
	if (!env.WHATSAPP_TOKEN || !env.WHATSAPP_PHONE_NUMBER_ID || !env.DB || !env.GEMINI_API_KEY) return new Response('Not configured', { status: 503 });
	const raw = await request.arrayBuffer();
	if (raw.byteLength > 256 * 1024) return new Response('Too large', { status: 413 });
	if (signed && !(await validSignature(raw, request.headers.get('X-Hub-Signature-256'), env.WHATSAPP_APP_SECRET))) return new Response('Invalid signature', { status: 401 });
	let payload;
	try {
		payload = JSON.parse(new globalThis.TextDecoder().decode(raw));
	} catch {
		return new Response('Invalid JSON', { status: 400 });
	}
	if (payload?.object !== 'whatsapp_business_account') return new Response('Ignored', { status: 200 });
	const work = processWebhook(env, payload);
	if (ctx?.waitUntil) ctx.waitUntil(work);
	else await work;
	return new Response('ok', { status: 200 });
}

// Panel local de Jossue AI: conversaciones en tiempo real, dashboard, auditorías express, llamadas
// agendadas, recados y alertas de abuso. Réplica del visor de Daniela (~/jarvis/scripts/daniela_viewer.py).
//
//   npm run panel                         # 30 días, refresca cada 30 s, abre el navegador
//   npm run panel -- --dias 7 --intervalo 20 --qa --sin-auto --puerto 4466 --modelo-ia sonnet
//
// Datos: lee la base D1 de producción con tu sesión de wrangler (cuenta personal; wrangler.jsonc
// fija el account_id, así que con otra sesión falla en vez de leer otra cuenta). No usa tokens.
// Tiempo real: cada `intervalo` segundos trae solo lo nuevo; la página late contra /estado.json
// cada 4 s y baja /datos.json solo cuando cambió la versión.
// PII: escucha SOLO en 127.0.0.1 y sirve desde memoria. Los resúmenes con IA van por tu Claude Code
// con correos y teléfonos ocultos.
import { execFile, spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const UI = join(HERE, 'ui.html');
const DB = 'jossue-portfolio-contact';

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
	const index = args.indexOf(`--${name}`);
	return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const DAYS = Math.min(30, Math.max(1, Number(option('dias', 30)) || 30));
const INTERVAL_S = Math.max(10, Number(option('intervalo', 30)) || 30);
const PORT = Number(option('puerto', 4466)) || 4466;
const INCLUDE_QA = flag('qa');
const AUTO = !flag('sin-auto');
const AI_MODEL = option('modelo-ia', 'sonnet');

// ---------- D1 por wrangler ----------

function d1(sql) {
	return new Promise((resolve, reject) => {
		execFile('npx', ['--yes', 'wrangler@4.119.0', 'd1', 'execute', DB, '--remote', '--json', '--command', sql], { cwd: ROOT, maxBuffer: 64 * 1024 * 1024, timeout: 90_000 }, (error, stdout, stderr) => {
			const start = stdout.indexOf('[');
			if (start < 0) return reject(new Error((stderr || stdout || error?.message || 'wrangler sin respuesta').toString().slice(-400)));
			try {
				resolve(JSON.parse(stdout.slice(start)).map((block) => block.results ?? []));
			} catch (parseError) {
				reject(parseError);
			}
		});
	});
}

// ---------- estado en memoria ----------

const state = {
	version: 0,
	refreshedAt: 0,
	refreshing: false,
	error: '',
	lastTs: 0,
	lastAbuseTs: 0,
	messages: new Map(), // sid → [{ ts, role, text, page, locale }]
	leads: [],
	abuse: [],
	blocks: [],
	audits: [],
	auditsAvailable: false,
	calls: [],
	callBlocks: [],
	callsAvailable: false,
};

const since = () => Date.now() - DAYS * 864e5;

async function refresh() {
	if (state.refreshing) return;
	state.refreshing = true;
	try {
		const from = Math.max(state.lastTs, since());
		const qa = INCLUDE_QA ? '' : " AND sid NOT LIKE 'QA-%'";
		const [messages, leads, abuse, blocks] = await d1(
			[
				`SELECT sid, ts, role, text, page, locale FROM ai_messages WHERE ts > ${from}${qa} ORDER BY ts`,
				`SELECT id, created_at, sid, locale, page, name, email, phone, company, need, message FROM ai_leads ORDER BY created_at DESC LIMIT 500`,
				`SELECT ts, key, source, kind, layer, points, excerpt FROM ai_abuse WHERE ts > ${Math.max(state.lastAbuseTs, since())} ORDER BY ts`,
				`SELECT key, until, reason, count, alerted_at FROM ai_blocks ORDER BY until DESC LIMIT 200`,
			].join('; '),
		);
		let changed = false;
		for (const row of messages) {
			const list = state.messages.get(row.sid) ?? [];
			list.push({ ts: Number(row.ts), role: row.role, text: row.text, page: row.page, locale: row.locale });
			state.messages.set(row.sid, list);
			state.lastTs = Math.max(state.lastTs, Number(row.ts));
			changed = true;
		}
		for (const row of abuse) {
			state.abuse.push({ ...row, ts: Number(row.ts) });
			state.lastAbuseTs = Math.max(state.lastAbuseTs, Number(row.ts));
			changed = true;
		}
		if (JSON.stringify(leads) !== JSON.stringify(state.leads)) changed = true;
		if (JSON.stringify(blocks) !== JSON.stringify(state.blocks)) changed = true;
		state.leads = leads;
		state.blocks = blocks.filter((row) => !String(row.key).startsWith('system:'));
		// Auditorías express (tabla ai_audits): puede no existir todavía.
		try {
			const [audits] = await d1(`SELECT id, created_at, updated_at, sid, name, email, url, domain, status, score, summary, report_url, error FROM ai_audits WHERE created_at > ${since()} ORDER BY created_at DESC LIMIT 500`);
			if (JSON.stringify(audits) !== JSON.stringify(state.audits)) changed = true;
			state.audits = audits;
			state.auditsAvailable = true;
		} catch {
			state.auditsAvailable = false;
		}
		// Llamadas agendadas (tabla bookings): de hace 7 días en adelante, y los días bloqueados.
		try {
			const [calls, callBlocks] = await d1(
				[
					`SELECT id, created_at, slot_start, slot_end, status, name, email, phone, topic, source, page, cancelled_by, notified_at FROM bookings WHERE slot_start > ${Date.now() - 7 * 864e5} ORDER BY slot_start LIMIT 500`,
					`SELECT day, reason, created_at FROM booking_blocks WHERE day >= '${new Date(Date.now() - 6 * 3600e3).toISOString().slice(0, 10)}' ORDER BY day`,
				].join('; '),
			);
			if (JSON.stringify([calls, callBlocks]) !== JSON.stringify([state.calls, state.callBlocks])) changed = true;
			state.calls = calls;
			state.callBlocks = callBlocks;
			state.callsAvailable = true;
		} catch {
			state.callsAvailable = false;
		}
		// Purga en memoria lo que salió de la ventana.
		const cutoff = since();
		for (const [sid, list] of state.messages) if ((list.at(-1)?.ts ?? 0) < cutoff) state.messages.delete(sid);
		state.abuse = state.abuse.filter((row) => row.ts >= cutoff);
		state.error = '';
		if (changed || !state.refreshedAt) state.version += 1;
	} catch (error) {
		state.error = String(error?.message ?? error).slice(0, 400);
	} finally {
		state.refreshedAt = Date.now();
		state.refreshing = false;
	}
}

// ---------- armado de conversaciones ----------

const MOCK = /^(Buen intento|Lo de «ignora|Aprecio la creatividad|Mi prompt es como|Qué curiosidad tan|Si te digo cómo estoy hecho|Código por encargo|Aquí no regalamos|Respira\. Yo también|Esto ya parece prueba|Tomo nota del cariño|Aquí se habla de|Casi me haces|Por hoy ya fue suficiente|Nice try|"Ignore your rules"|My prompt is like|Very specific curiosity|I do not write code|Breathe\. Me too|Noted, with love|You almost got me|That is enough for today)/;

function site(page) {
	const value = String(page || '');
	if (value === 'whatsapp') return 'WhatsApp';
	if (value.includes('madre.run')) return 'madre.run';
	return 'jossuealcala.com';
}

function conversations() {
	const abuseBySid = new Map();
	for (const row of state.abuse) {
		const key = String(row.key);
		if (!key.startsWith('sid:')) continue;
		const sid = key.slice(4);
		abuseBySid.set(sid, [...(abuseBySid.get(sid) ?? []), row]);
	}
	const leadSids = new Set(state.leads.map((lead) => lead.sid));
	const auditBySid = new Map(state.audits.map((audit) => [audit.sid, audit]));
	return [...state.messages.entries()]
		.map(([sid, list]) => {
			const user = list.filter((message) => message.role === 'user');
			const attempts = abuseBySid.get(sid) ?? [];
			const blocked = list.some((message) => message.role === 'assistant' && /^(Por hoy ya fue suficiente|That is enough for today)/.test(message.text));
			return {
				sid,
				first: list[0]?.ts ?? 0,
				last: list.at(-1)?.ts ?? 0,
				site: site(list[0]?.page),
				page: list[0]?.page ?? '',
				locale: list[0]?.locale ?? 'es',
				turns: user.length,
				opening: user[0]?.text ?? '',
				messages: list.map((message) => ({ ...message, mock: message.role === 'assistant' && MOCK.test(message.text) })),
				lead: leadSids.has(sid),
				audit: auditBySid.get(sid) ?? null,
				abuse: attempts.map((row) => ({ ts: row.ts, kind: row.kind, layer: row.layer })),
				blocked,
				qa: sid.startsWith('QA-'),
			};
		})
		.sort((a, b) => b.last - a.last);
}

function dataset() {
	return {
		version: state.version,
		refreshedAt: state.refreshedAt,
		days: DAYS,
		includeQa: INCLUDE_QA,
		conversations: conversations(),
		leads: state.leads,
		abuse: state.abuse.slice(-500).reverse(),
		blocks: state.blocks,
		audits: state.audits,
		auditsAvailable: state.auditsAvailable,
		calls: state.calls,
		callBlocks: state.callBlocks,
		callsAvailable: state.callsAvailable,
	};
}

// ---------- exportar y resumir ----------

const redact = (text) => String(text || '').replace(/[\w.+-]+@[\w-]+\.[\w.]{2,}/g, '<correo>').replace(/\+?\d(?:[\s.-]?\d){9,}/g, '<tel>');
const fmt = (ts) => new Date(ts).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' });

function pick(sids) {
	const all = conversations();
	if (!sids?.length) return all;
	const wanted = new Set(sids);
	return all.filter((conversation) => wanted.has(conversation.sid));
}

function toMarkdown(list) {
	return list
		.map((c) => [`## ${fmt(c.first)} · ${c.site} · ${c.turns} preguntas${c.lead ? ' · recado' : ''}${c.audit ? ' · auditoría' : ''}${c.abuse.length ? ' · abuso' : ''}`, '', ...c.messages.map((m) => `**${m.role === 'user' ? 'Visitante' : 'Jossue AI'}:** ${m.text}`), ''].join('\n'))
		.join('\n');
}

function toCsv(list) {
	const cell = (value) => {
		const text = String(value ?? '');
		const safe = /^[=+\-@]/.test(text) ? `'${text}` : text; // que Excel no lo ejecute como fórmula
		return `"${safe.replace(/"/g, '""')}"`;
	};
	const rows = [['sid', 'fecha', 'sitio', 'pagina', 'rol', 'texto']];
	for (const c of list) for (const m of c.messages) rows.push([c.sid, new Date(m.ts).toISOString(), c.site, m.page, m.role, m.text]);
	return rows.map((row) => row.map(cell).join(',')).join('\n');
}

const AI_SYSTEM = `Eres analista de las conversaciones de Jossue AI, el asistente del portafolio de Jossué Alcalá (ecommerce, Shopify, IA). Escribe en español, claro y breve, con encabezados cortos en markdown. No inventes: todo sale de las transcripciones. Los correos y teléfonos ya vienen ocultos.`;
const AI_SET = (n) => `Analiza estas ${n} conversaciones. Dame: 1) panorama en 3 líneas; 2) qué busca la gente (temas y frecuencia); 3) oportunidades comerciales concretas (quién mostró interés real y qué le faltó para dejar sus datos o pedir la auditoría); 4) fallas del asistente (respuestas malas, bloqueos injustos, preguntas sin resolver); 5) tres cambios concretos para la persona o el flujo.`;
const AI_ONE = `Resume esta conversación: qué quería la persona, qué respondió el asistente, si hubo interés comercial y qué haría Jossué para darle seguimiento.`;

function claudeBinary() {
	return process.env.CLAUDE_CODE_EXECPATH || 'claude';
}

function summarize(list, scope) {
	return new Promise((resolve, reject) => {
		let total = 0;
		const blocks = [];
		for (const c of list.slice(0, 80)) {
			const text = [`--- ${fmt(c.first)} · ${c.site} · ${c.turns} preguntas`, ...c.messages.map((m) => `${m.role === 'user' ? 'Visitante' : 'Jossue AI'}: ${redact(m.text)}`)].join('\n');
			if (total + text.length > 120_000 && blocks.length) break;
			blocks.push(text);
			total += text.length;
		}
		const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('CLAUDE')));
		const child = spawn(claudeBinary(), ['-p', scope === 'chat' ? AI_ONE : AI_SET(blocks.length), '--system-prompt', AI_SYSTEM, '--model', AI_MODEL], { cwd: tmpdir(), env });
		let out = '';
		let err = '';
		const timer = globalThis.setTimeout(() => child.kill('SIGTERM'), 420_000);
		child.stdout.on('data', (chunk) => (out += chunk));
		child.stderr.on('data', (chunk) => (err += chunk));
		child.on('error', (error) => reject(new Error(`No encuentro Claude Code (${error.message}). Define CLAUDE_CODE_EXECPATH o instala el CLI.`)));
		child.on('close', (code) => {
			globalThis.clearTimeout(timer);
			if (code === 0) resolve({ summary: out.trim(), conversations: blocks.length, total: list.length, model: AI_MODEL });
			else reject(new Error((err || out || `claude terminó con ${code}`).slice(-500)));
		});
		child.stdin.end(blocks.join('\n\n'));
	});
}

// ---------- HTTP ----------

const send = (res, status, body, type = 'application/json; charset=utf-8', extra = {}) => {
	res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra });
	res.end(body);
};
const json = (res, value, status = 200) => send(res, status, JSON.stringify(value));

async function body(req) {
	let raw = '';
	for await (const chunk of req) {
		raw += chunk;
		if (raw.length > 1e6) throw new Error('cuerpo muy grande');
	}
	return raw ? JSON.parse(raw) : {};
}

const server = createServer(async (req, res) => {
	// Solo desde esta Mac: además del bind a 127.0.0.1, se rechaza cualquier Host ajeno (DNS rebinding).
	if (!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(req.headers.host ?? '')) return send(res, 403, 'forbidden', 'text/plain');
	const url = new URL(req.url, `http://${req.headers.host}`);
	try {
		if (req.method === 'GET' && url.pathname === '/') return send(res, 200, await readFile(UI, 'utf8'), 'text/html; charset=utf-8');
		if (req.method === 'GET' && url.pathname === '/estado.json') return json(res, { version: state.version, refreshedAt: state.refreshedAt, refreshing: state.refreshing, error: state.error, interval: INTERVAL_S, auto: AUTO, conversations: state.messages.size });
		if (req.method === 'GET' && url.pathname === '/datos.json') return json(res, dataset());
		if (req.method === 'GET' && url.pathname === '/exportar') {
			const list = pick((url.searchParams.get('sids') || '').split(',').filter(Boolean));
			const format = url.searchParams.get('formato') || 'md';
			const stamp = new Date().toISOString().slice(0, 10);
			if (format === 'csv') return send(res, 200, toCsv(list), 'text/csv; charset=utf-8', { 'Content-Disposition': `attachment; filename="jossue-ai-${stamp}.csv"` });
			if (format === 'json') return send(res, 200, JSON.stringify(list, null, 2), 'application/json; charset=utf-8', { 'Content-Disposition': `attachment; filename="jossue-ai-${stamp}.json"` });
			return send(res, 200, toMarkdown(list), 'text/markdown; charset=utf-8', { 'Content-Disposition': `attachment; filename="jossue-ai-${stamp}.md"` });
		}
		// Las acciones POST piden el encabezado propio: una página ajena no puede dispararlas.
		if (req.method === 'POST' && req.headers['x-panel'] !== '1') return send(res, 403, 'forbidden', 'text/plain');
		if (req.method === 'POST' && url.pathname === '/refrescar') {
			await refresh();
			return json(res, { ok: true, version: state.version });
		}
		// Agenda: bloquear o liberar un día y cancelar una llamada. Escribe en producción con tu sesión de wrangler.
		if (req.method === 'POST' && url.pathname.startsWith('/llamadas/')) {
			const input = await body(req);
			const day = String(input.day ?? '');
			const id = String(input.id ?? '');
			if (url.pathname === '/llamadas/bloquear') {
				if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return json(res, { error: 'Fecha inválida.' }, 400);
				const reason = String(input.reason ?? '').replace(/[^\p{L}\p{N} .,:()-]/gu, '').slice(0, 80);
				await d1(`INSERT INTO booking_blocks (day, reason, created_at) VALUES ('${day}', '${reason}', ${Date.now()}) ON CONFLICT (day) DO UPDATE SET reason = excluded.reason`);
			} else if (url.pathname === '/llamadas/liberar') {
				if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return json(res, { error: 'Fecha inválida.' }, 400);
				await d1(`DELETE FROM booking_blocks WHERE day = '${day}'`);
			} else if (url.pathname === '/llamadas/cancelar') {
				if (!/^CALL-[a-f0-9]{16}$/.test(id)) return json(res, { error: 'Llamada inválida.' }, 400);
				await d1(`UPDATE bookings SET status = 'cancelled', cancelled_at = ${Date.now()}, cancelled_by = 'jossue' WHERE id = '${id}' AND status = 'confirmed'`);
			} else return send(res, 404, 'not found', 'text/plain');
			await refresh();
			return json(res, { ok: true, version: state.version });
		}
		if (req.method === 'POST' && url.pathname === '/resumir') {
			const { sids, scope } = await body(req);
			const list = pick(Array.isArray(sids) ? sids : []);
			if (!list.length) return json(res, { error: 'No hay conversaciones en el filtro.' }, 400);
			return json(res, await summarize(list, scope));
		}
		return send(res, 404, 'not found', 'text/plain');
	} catch (error) {
		return json(res, { error: String(error?.message ?? error).slice(0, 500) }, 500);
	}
});

server.listen(PORT, '127.0.0.1', async () => {
	const address = `http://127.0.0.1:${PORT}`;
	console.log(`Panel de Jossue AI en ${address} · ${DAYS} días · ${AUTO ? `refresco cada ${INTERVAL_S} s` : 'refresco manual'}${INCLUDE_QA ? ' · con pruebas QA' : ''} · IA: claude/${AI_MODEL} · Ctrl-C para cerrarlo`);
	await refresh();
	console.log(state.error ? `⚠ ${state.error}` : `${state.messages.size} conversaciones, ${state.leads.length} recados, ${state.audits.length} auditorías, ${state.calls.filter((call) => call.status === 'confirmed' && Number(call.slot_start) > Date.now()).length} llamadas próximas`);
	if (AUTO) globalThis.setInterval(refresh, INTERVAL_S * 1000);
	if (!flag('sin-navegador')) execFile('open', [address], () => {});
});

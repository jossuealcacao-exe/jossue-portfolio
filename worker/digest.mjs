// Resumen diario a Jossué: lo que pasó en las últimas 24 horas en jossuealcala.com, en un correo.
// Lo dispara el cron de wrangler.jsonc a las 8:00 de Guadalajara (14:00 UTC; México ya no cambia
// de horario). Sale de la misma base que el panel; si una consulta falla, esa parte dice que no se
// pudo leer en lugar de inventar un cero.
import { notify, notifyEnabled } from './notify.mjs';

const DAY_MS = 24 * 60 * 60_000;
const TZ = 'America/Mexico_City';
const hour = new Intl.DateTimeFormat('es-MX', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false });
const day = new Intl.DateTimeFormat('es-MX', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long' });
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const short = new Intl.DateTimeFormat('es-MX', { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
const whenShort = (ms) => short.format(new Date(ms));
const line = (value, max = 80) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

async function rows(env, sql, ...params) {
	try {
		const { results } = await env.DB.prepare(sql).bind(...params).all();
		return results ?? [];
	} catch (error) {
		console.error('digest query failed', String(error?.message ?? '').slice(0, 200));
		return null;
	}
}

export async function collectSummary(env, now = Date.now()) {
	const since = now - DAY_MS;
	const sinceIso = new Date(since).toISOString();
	const todayEnd = now + 16 * 3600_000; // a las 8:00, «hoy» es lo que queda del día
	const [forms, leads, audits, chats, chatPages, abuse, blocks, provider, booked, calls] = await Promise.all([
		rows(env, 'SELECT created_at, name, email, project_type FROM submissions WHERE created_at >= ? ORDER BY created_at', sinceIso),
		rows(env, 'SELECT created_at, page, name, email, phone, need FROM ai_leads WHERE created_at >= ? ORDER BY created_at', sinceIso),
		rows(env, 'SELECT created_at, name, email, domain, status, score, notified_at FROM ai_audits WHERE created_at >= ? ORDER BY created_at', since),
		rows(
			env,
			`SELECT CASE WHEN page = 'whatsapp' THEN 'whatsapp' ELSE 'web' END AS channel, COUNT(DISTINCT sid) AS conversations, SUM(role = 'user') AS messages
			 FROM ai_messages WHERE ts >= ? AND sid NOT LIKE 'QA-%' GROUP BY channel`,
			since,
		),
		rows(
			env,
			`SELECT page, COUNT(DISTINCT sid) AS conversations FROM ai_messages
			 WHERE ts >= ? AND sid NOT LIKE 'QA-%' AND page != 'whatsapp' GROUP BY page ORDER BY conversations DESC LIMIT 3`,
			since,
		),
		rows(env, 'SELECT kind, COUNT(*) AS total FROM ai_abuse WHERE ts >= ? GROUP BY kind ORDER BY total DESC', since),
		rows(env, "SELECT COUNT(*) AS total FROM ai_blocks WHERE until > ? AND key NOT LIKE 'system:%'", now),
		rows(env, "SELECT reason, alerted_at FROM ai_blocks WHERE key = 'system:provider-alert' AND alerted_at >= ?", since),
		rows(env, 'SELECT created_at, slot_start, name, email, phone, topic, status FROM bookings WHERE created_at >= ? ORDER BY created_at', since),
		rows(env, "SELECT slot_start, name, phone, topic FROM bookings WHERE status = 'confirmed' AND slot_start >= ? AND slot_start < ? ORDER BY slot_start", now, todayEnd),
	]);
	return { since, now, forms, leads, audits, chats, chatPages, abuse, blocks, provider, booked, calls };
}

export function summaryEmail(data) {
	const { since, now, forms, leads, audits, chats, chatPages, abuse, blocks, provider, booked = [], calls = [] } = data;
	const at = (value) => hour.format(new Date(typeof value === 'number' ? value : Date.parse(value)));
	const unreadable = '- No pude leer esta parte de la base; revísala en el panel.';

	const contacts = [
		...(forms ?? []).map((row) => ({ when: Date.parse(row.created_at), text: `Formulario · ${line(row.name, 60)} <${line(row.email, 80)}> · ${line(row.project_type, 60)}` })),
		...(booked ?? []).map((row) => ({ when: Number(row.created_at), text: `Llamada · ${line(row.name, 60)} <${line(row.email, 80)}> · ${line(row.phone, 20)} · para el ${whenShort(Number(row.slot_start))}${row.status === 'cancelled' ? ' (la canceló)' : ''}` })),
		...(leads ?? []).map((row) => ({
			when: Date.parse(row.created_at),
			text: `${row.page === 'whatsapp' ? 'WhatsApp' : 'Chat'} · ${line(row.name || '(sin nombre)', 60)}${row.email ? ` <${line(row.email, 80)}>` : ''}${row.phone ? ` · ${line(row.phone, 20)}` : ''}${row.need ? ` · ${line(row.need, 70)}` : ''}`,
		})),
	].sort((a, b) => a.when - b.when);

	const web = (chats ?? []).find((row) => row.channel === 'web');
	const whatsapp = (chats ?? []).find((row) => row.channel === 'whatsapp');
	const abuseTotal = (abuse ?? []).reduce((sum, row) => sum + Number(row.total), 0);
	const activeBlocks = Number(blocks?.[0]?.total ?? 0);
	const doneAudits = (audits ?? []).filter((row) => row.status === 'done');
	const silent = doneAudits.filter((row) => !row.notified_at).length + (audits ?? []).filter((row) => row.status === 'failed' && !row.notified_at).length;

	const watch = [
		provider === null ? null : provider.length ? `- Jossue AI se quedó sin servicio de Gemini (${line(provider[0].reason, 40)}). Revisa el saldo en ai.studio.` : null,
		silent ? `- ${plural(silent, 'auditoría no te llegó', 'auditorías no te llegaron')} por correo: revisa que hola@jossuealcala.com siga verificada en Cloudflare.` : null,
		(audits ?? []).some((row) => row.status === 'failed') ? `- ${plural((audits ?? []).filter((row) => row.status === 'failed').length, 'auditoría falló', 'auditorías fallaron')}: esa gente dejó sus datos; escríbele tú.` : null,
	].filter(Boolean);

	const contactCount = forms === null || leads === null || booked === null ? null : contacts.length;
	const parts = [
		contactCount === null ? null : plural(contactCount, 'contacto', 'contactos'),
		audits === null ? null : plural(audits.length, 'auditoría', 'auditorías'),
		chats === null ? null : plural(Number(web?.conversations ?? 0) + Number(whatsapp?.conversations ?? 0), 'chat', 'chats'),
	].filter(Boolean);
	if (calls?.length) parts.unshift(`${plural(calls.length, 'llamada', 'llamadas')} hoy`);
	const quiet = contactCount === 0 && audits?.length === 0 && !web && !whatsapp && !abuseTotal && !watch.length && !calls?.length;

	const text = [
		`Lo que pasó en jossuealcala.com desde el ${day.format(new Date(since))} a las ${at(since)} hasta hoy a las ${at(now)} (hora de Guadalajara).`,
		quiet ? '\nDía tranquilo: nadie escribió, no hubo auditorías y no pasó nada raro.' : null,
		calls === null ? `\nLLAMADAS DE HOY\n${unreadable}` : calls.length ? ['', `LLAMADAS DE HOY (${calls.length})`, ...calls.map((row) => `- ${at(Number(row.slot_start))} · ${line(row.name, 60)} · ${line(row.phone, 20)}${row.topic ? ` · ${line(row.topic, 70)}` : ''}`)].join('\n') : null,
		watch.length ? ['', 'PARA REVISAR', ...watch].join('\n') : null,
		'',
		`CONTACTOS (${contactCount ?? '?'})`,
		...(contactCount === null ? [unreadable] : contacts.length ? contacts.map((item) => `- ${at(item.when)} · ${item.text}`) : ['- Ninguno.']),
		'',
		`AUDITORÍAS EXPRESS (${audits?.length ?? '?'})`,
		...(audits === null
			? [unreadable]
			: audits.length
				? audits.map((row) => `- ${at(Number(row.created_at))} · ${line(row.name, 60)} <${line(row.email, 80)}> · ${line(row.domain, 60)} · ${row.status === 'done' ? `${row.score ?? '—'}/100` : row.status === 'failed' ? 'falló' : 'en curso'}`)
				: ['- Ninguna.']),
		'',
		'CONVERSACIONES',
		...(chats === null
			? [unreadable]
			: [
					`- Chat del sitio: ${plural(Number(web?.conversations ?? 0), 'conversación', 'conversaciones')}, ${plural(Number(web?.messages ?? 0), 'mensaje', 'mensajes')} de visitantes.`,
					chatPages?.length ? `- Dónde abrieron el chat: ${chatPages.map((row) => `${line(row.page || '(sin página)', 60)} (${row.conversations})`).join(', ')}.` : null,
					`- WhatsApp: ${plural(Number(whatsapp?.conversations ?? 0), 'conversación', 'conversaciones')}.`,
				].filter(Boolean)),
		'',
		'SEGURIDAD',
		...(abuse === null
			? [unreadable]
			: [
					abuseTotal ? `- ${plural(abuseTotal, 'intento de abuso', 'intentos de abuso')}: ${abuse.map((row) => `${row.kind} ${row.total}`).join(', ')}.` : '- Sin intentos de abuso.',
					`- ${plural(activeBlocks, 'bloqueo activo', 'bloqueos activos')}.`,
				]),
		'',
		'Las conversaciones completas están en el panel: npm run panel, en tu Mac.',
	]
		.filter((item) => item !== null)
		.join('\n');

	return {
		kind: 'summary',
		subject: `${day.format(new Date(now))} · ${quiet ? 'día tranquilo' : parts.join(', ')}${watch.length ? ' · hay algo que revisar' : ''}`,
		text,
	};
}

export async function sendDailySummary(env, now = Date.now()) {
	if (!env.DB || !notifyEnabled(env)) return false;
	return notify(env, summaryEmail(await collectSummary(env, now)));
}

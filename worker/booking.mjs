// Agenda de llamadas de 10 minutos con Jossué. La persona elige un horario libre en /es/agenda/, deja
// su nombre, correo y teléfono, y Jossué le llama a esa hora. Disponibilidad fija (hora de Guadalajara,
// UTC-6 todo el año): martes, miércoles y viernes de 10:00 a 18:00 y sábado de 9:00 a 13:00, con 5 min
// de colchón entre llamadas. Los días que Jossué no puede se bloquean desde el panel (booking_blocks).
//
//   GET  /api/booking/slots                    horarios libres de los próximos 21 días
//   POST /api/booking                          { slot, name, email, phone, topic, consent, locale, source, page }
//   POST /api/booking/cancel                   { id, token }  (la persona, con el token que recibió)
//   GET  /api/booking/:id.ics?t=…              su cita para su calendario
//   GET  /api/booking/calendar.ics?key=…       feed privado para el Calendario de Jossué (CALENDAR_FEED_KEY)
//
// A Jossué le llega un aviso «Llamada agendada» al momento y el feed pone la cita en su calendario.

import { blockedUntil } from './guard.mjs';
import { notify } from './notify.mjs';

export const OFFSET_MIN = -360; // Guadalajara: UTC-6, sin horario de verano desde 2022
export const SCHEDULE = {
	2: [[10 * 60, 18 * 60]], // martes
	3: [[10 * 60, 18 * 60]], // miércoles
	5: [[10 * 60, 18 * 60]], // viernes
	6: [[9 * 60, 13 * 60]], // sábado
};
export const CALL_MIN = 10;
const STEP_MIN = 15; // 10 de llamada + 5 de colchón
const NOTICE_MS = 2 * 3600_000; // no se agenda con menos de 2 horas
const HORIZON_DAYS = 21;
const PER_IP_DAY = 3;
const MIN = 60_000;
const DAY = 864e5;
const TZ = 'America/Mexico_City';
const SOURCES = new Set(['web', 'chat', 'auditoria', 'whatsapp', 'contacto', 'inicio']);

const clip = (value, max) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const validEmail = (email) => /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i.test(email);

/** Fecha local de Guadalajara (AAAA-MM-DD) de un instante. */
export function localDay(ms) {
	return new Date(ms + OFFSET_MIN * MIN).toISOString().slice(0, 10);
}

/** «martes 6 de octubre a las 10:15» (o «Tuesday, October 6 at 10:15 AM»), hora de Guadalajara. */
export function whenLabel(ms, locale = 'es') {
	const en = locale === 'en';
	const parts = Object.fromEntries(
		new Intl.DateTimeFormat(en ? 'en-US' : 'es-MX', { timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', hour12: en })
			.formatToParts(new Date(ms))
			.map((part) => [part.type, part.value]),
	);
	return en
		? `${parts.weekday}, ${parts.month} ${parts.day} at ${parts.hour}:${parts.minute} ${parts.dayPeriod ?? ''}`.trim()
		: `${parts.weekday} ${parts.day} de ${parts.month} a las ${parts.hour}:${parts.minute}`;
}

/** +52 33 1234 5678 para leerlo; el resto, tal cual. */
export function phoneLabel(phone) {
	const match = /^\+52(\d{2})(\d{4})(\d{4})$/.exec(String(phone));
	return match ? `+52 ${match[1]} ${match[2]} ${match[3]}` : String(phone);
}

/** Todos los inicios posibles según el horario, de `now` a HORIZON_DAYS, sin quitar ocupados. */
export function candidateSlots(now = Date.now()) {
	const slots = [];
	const today = Date.parse(`${localDay(now)}T00:00:00Z`); // medianoche local, expresada como UTC «de pared»
	for (let d = 0; d <= HORIZON_DAYS; d += 1) {
		const wall = today + d * DAY;
		const weekday = new Date(wall).getUTCDay();
		for (const [from, to] of SCHEDULE[weekday] ?? []) {
			for (let minute = from; minute + CALL_MIN <= to; minute += STEP_MIN) {
				const start = wall + minute * MIN - OFFSET_MIN * MIN;
				if (start >= now + NOTICE_MS) slots.push(start);
			}
		}
	}
	return slots;
}

async function takenAndBlocked(env, now) {
	const [taken, blocked] = await Promise.all([
		env.DB.prepare("SELECT slot_start FROM bookings WHERE status = 'confirmed' AND slot_start >= ?").bind(now).all(),
		env.DB.prepare('SELECT day FROM booking_blocks WHERE day >= ?').bind(localDay(now)).all(),
	]);
	return { taken: new Set((taken.results ?? []).map((row) => Number(row.slot_start))), blocked: new Set((blocked.results ?? []).map((row) => row.day)) };
}

export async function freeSlots(env, now = Date.now()) {
	const { taken, blocked } = await takenAndBlocked(env, now);
	return candidateSlots(now).filter((start) => !taken.has(start) && !blocked.has(localDay(start)));
}

/** Teléfono con lada. 10 dígitos se toman como México (+52). */
export function normalizePhone(raw) {
	const text = String(raw ?? '').trim();
	const digits = text.replace(/\D/g, '');
	// El «1» de los celulares mexicanos ya no se marca: +52 1 33… y +52 33… son el mismo número.
	if (digits.length === 13 && digits.startsWith('521')) return `+52${digits.slice(3)}`;
	if (digits.length === 12 && digits.startsWith('52')) return `+${digits}`;
	if (digits.length === 10 && !/^\+/.test(text)) return `+52${digits}`;
	if (/^\+/.test(text) && digits.length >= 10 && digits.length <= 15) return `+${digits}`;
	return null;
}

const toHex = (buffer) => [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
const sha256 = async (text) => toHex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
function newToken() {
	const bytes = crypto.getRandomValues(new Uint8Array(24));
	return globalThis.btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function sameText(a, b) {
	const [left, right] = await Promise.all([sha256(String(a)), sha256(String(b))]);
	let diff = 0;
	for (let i = 0; i < left.length; i += 1) diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
	return diff === 0 && Boolean(a);
}

// ---------- calendario (.ics) ----------

const icsDate = (ms) => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const icsText = (value) => String(value ?? '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
function fold(line) {
	// Líneas de 75 octetos como pide RFC 5545, sin partir un carácter de UTF-8 a la mitad.
	const out = [];
	let current = '';
	let bytes = 0;
	for (const char of line) {
		const size = new TextEncoder().encode(char).length;
		if (bytes + size > (out.length ? 74 : 75)) {
			out.push(current);
			current = '';
			bytes = 0;
		}
		current += char;
		bytes += size;
	}
	out.push(current);
	return out.join('\r\n ');
}

function icsEvent(row, perspective) {
	const forOwner = perspective === 'owner';
	const summary = forOwner ? `Llamar a ${row.name} (10 min)` : row.locale === 'en' ? 'Call with Jossué Alcalá (10 min)' : 'Llamada con Jossué Alcalá (10 min)';
	const description = forOwner
		? [`Teléfono: ${row.phone}`, `Correo: ${row.email}`, row.topic && `Tema: ${row.topic}`, `Agendó desde: ${row.source}`, `WhatsApp: https://wa.me/${row.phone.replace(/\D/g, '')}`].filter(Boolean).join('\n')
		: row.locale === 'en'
			? `Jossué will call you at ${row.phone}. To cancel or change it: https://jossuealcala.com/en/book-a-call/`
			: `Jossué te llama al ${row.phone}. Para cancelar o cambiarla: https://jossuealcala.com/es/agenda/`;
	return [
		'BEGIN:VEVENT',
		`UID:${row.id}@jossuealcala.com`,
		`DTSTAMP:${icsDate(Number(row.cancelled_at || row.created_at))}`,
		`DTSTART:${icsDate(Number(row.slot_start))}`,
		`DTEND:${icsDate(Number(row.slot_end))}`,
		`SUMMARY:${icsText(summary)}`,
		`DESCRIPTION:${icsText(description)}`,
		`LOCATION:${icsText(forOwner ? `tel:${row.phone}` : row.phone)}`,
		`STATUS:${row.status === 'cancelled' ? 'CANCELLED' : 'CONFIRMED'}`,
		...(row.status === 'cancelled' ? [] : ['BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${icsText(summary)}`, `TRIGGER:-PT${forOwner ? 10 : 15}M`, 'END:VALARM']),
		'END:VEVENT',
	];
}

export function calendar(rows, perspective, name) {
	const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//jossuealcala.com//Agenda//ES', 'CALSCALE:GREGORIAN', `X-WR-CALNAME:${icsText(name)}`, 'X-WR-TIMEZONE:America/Mexico_City', 'REFRESH-INTERVAL;VALUE=DURATION:PT15M', 'X-PUBLISHED-TTL:PT15M'];
	for (const row of rows) lines.push(...icsEvent(row, perspective));
	lines.push('END:VCALENDAR');
	return `${lines.map(fold).join('\r\n')}\r\n`;
}

const icsResponse = (body, filename) =>
	new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8', 'Content-Disposition': `inline; filename="${filename}"`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });

// ---------- rutas ----------

const ERRORS = {
	es: {
		slot_taken: 'Alguien acaba de tomar ese horario. Elige otro, por favor.',
		slot_invalid: 'Ese horario ya no está disponible. Elige otro, por favor.',
		already_booked: 'Ese correo ya tiene una llamada agendada. Para cambiarla, cancélala desde esta página en el navegador donde la agendaste, o escríbeme por WhatsApp.',
		limit_ip: 'Ya se agendaron varias llamadas desde tu conexión hoy. Escríbeme por WhatsApp y lo vemos.',
	},
	en: {
		slot_taken: 'Someone just took that time. Please pick another.',
		slot_invalid: 'That time is no longer available. Please pick another.',
		already_booked: 'That email already has a call booked. To change it, cancel it from this page in the browser where you booked it, or message me on WhatsApp.',
		limit_ip: 'Several calls were already booked from your connection today. Message me on WhatsApp and we will sort it out.',
	},
};

export async function handleSlots(env, { json, origin }, now = Date.now()) {
	if (!env.DB) return json(503, { ok: false, error: 'booking_unavailable' }, origin);
	const slots = await freeSlots(env, now).catch(() => null);
	if (!slots) return json(503, { ok: false, error: 'booking_unavailable' }, origin);
	const days = [];
	for (const start of slots) {
		const day = localDay(start);
		if (days.at(-1)?.date !== day) days.push({ date: day, slots: [] });
		days.at(-1).slots.push(start);
	}
	return json(200, { ok: true, timezone: TZ, callMinutes: CALL_MIN, days }, origin);
}

export async function handleBookingCreate(request, env, { json, origin, ipHash }, now = Date.now()) {
	if (!env.DB) return json(503, { ok: false, error: 'booking_unavailable' }, origin);
	let body;
	try {
		body = await request.json();
	} catch {
		return json(400, { ok: false, error: 'invalid_json' }, origin);
	}
	const locale = body?.locale === 'en' ? 'en' : 'es';
	if (clip(body?.website, 10)) return json(200, { ok: true, booking: null }, origin); // trampa para bots
	const name = clip(body?.name, 120);
	const email = clip(body?.email, 200).toLowerCase();
	const phone = normalizePhone(body?.phone);
	const slot = Number(body?.slot);
	if (!name || name.length < 2 || /[<>{}]/.test(name)) return json(400, { ok: false, error: 'invalid_name' }, origin);
	if (!validEmail(email)) return json(400, { ok: false, error: 'invalid_email' }, origin);
	if (!phone) return json(400, { ok: false, error: 'invalid_phone' }, origin);
	if (body?.consent !== true) return json(400, { ok: false, error: 'consent_required' }, origin);
	if (await blockedUntil(env, [`ip:${ipHash}`])) return json(429, { ok: false, error: 'blocked' }, origin);

	const errors = ERRORS[locale];
	const recent = await env.DB.prepare('SELECT COUNT(*) AS total FROM bookings WHERE ip_hash = ? AND created_at >= ?').bind(ipHash, now - DAY).first().catch(() => null);
	if (Number(recent?.total ?? 0) >= PER_IP_DAY) return json(429, { ok: false, error: 'limit_ip', message: errors.limit_ip }, origin);
	// No se dice cuándo: cualquiera podría escribir el correo de otra persona para averiguarlo.
	const upcoming = await env.DB.prepare("SELECT id FROM bookings WHERE email = ? AND status = 'confirmed' AND slot_start >= ? LIMIT 1").bind(email, now).first().catch(() => null);
	if (upcoming) return json(409, { ok: false, error: 'already_booked', message: errors.already_booked }, origin);
	if (!(await freeSlots(env, now)).includes(slot)) return json(409, { ok: false, error: 'slot_invalid', message: errors.slot_invalid }, origin);

	const token = newToken();
	const row = {
		id: `CALL-${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`,
		created_at: now,
		slot_start: slot,
		slot_end: slot + CALL_MIN * MIN,
		status: 'confirmed',
		name,
		email,
		phone,
		topic: clip(body?.topic, 300),
		locale,
		source: SOURCES.has(body?.source) ? body.source : 'web',
		page: clip(body?.page, 200),
		ip_hash: ipHash,
		consent_at: now,
		token_hash: await sha256(token),
	};
	try {
		await env.DB.prepare(
			`INSERT INTO bookings (id, created_at, slot_start, slot_end, status, name, email, phone, topic, locale, source, page, ip_hash, consent_at, token_hash)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		)
			.bind(row.id, row.created_at, row.slot_start, row.slot_end, row.status, row.name, row.email, row.phone, row.topic, row.locale, row.source, row.page, row.ip_hash, row.consent_at, row.token_hash)
			.run();
	} catch (error) {
		if (/UNIQUE|constraint/i.test(String(error?.message))) return json(409, { ok: false, error: 'slot_taken', message: errors.slot_taken }, origin);
		console.error('booking insert failed', String(error?.message ?? '').slice(0, 200));
		return json(503, { ok: false, error: 'booking_unavailable' }, origin);
	}

	if (await notifyBooked(env, row)) await env.DB.prepare('UPDATE bookings SET notified_at = ? WHERE id = ?').bind(Date.now(), row.id).run().catch(() => null);
	return json(201, { ok: true, booking: { id: row.id, token, slot: row.slot_start, end: row.slot_end, when: whenLabel(row.slot_start, locale), phone: phoneLabel(row.phone) } }, origin);
}

export async function handleBookingCancel(request, env, { json, origin }) {
	if (!env.DB) return json(503, { ok: false, error: 'booking_unavailable' }, origin);
	let body;
	try {
		body = await request.json();
	} catch {
		return json(400, { ok: false, error: 'invalid_json' }, origin);
	}
	const row = await bookingByToken(env, body?.id, body?.token);
	if (!row) return json(404, { ok: false, error: 'not_found' }, origin);
	if (row.status === 'cancelled') return json(200, { ok: true, status: 'cancelled' }, origin);
	const now = Date.now();
	await env.DB.prepare("UPDATE bookings SET status = 'cancelled', cancelled_at = ?, cancelled_by = 'visitante' WHERE id = ?").bind(now, row.id).run();
	await notify(env, {
		kind: 'callCancelled',
		subject: `${row.name} · ${whenLabel(Number(row.slot_start))}`,
		replyTo: { email: row.email, name: row.name },
		text: [`${row.name} canceló su llamada de ${whenLabel(Number(row.slot_start))} (hora de Guadalajara).`, '', `Teléfono: ${row.phone}`, `Correo: ${row.email}`, row.topic && `Tema: ${row.topic}`, '', 'El horario quedó libre otra vez en la agenda.'].filter(Boolean).join('\n'),
	});
	return json(200, { ok: true, status: 'cancelled' }, origin);
}

async function bookingByToken(env, id, token) {
	const cleanId = String(id ?? '').replace(/[^\w-]/g, '').slice(0, 40);
	if (!cleanId || !token) return null;
	const row = await env.DB.prepare('SELECT * FROM bookings WHERE id = ?').bind(cleanId).first().catch(() => null);
	if (!row || !(await sameText(await sha256(String(token)), row.token_hash))) return null;
	return row;
}

export async function handleBookingIcs(request, env, id) {
	const url = new URL(request.url);
	const row = await bookingByToken(env, id, url.searchParams.get('t'));
	if (!row) return new Response('Not found', { status: 404 });
	return icsResponse(calendar([row], 'visitor', row.locale === 'en' ? 'Call with Jossué' : 'Llamada con Jossué'), 'llamada-jossue.ics');
}

export async function handleCalendarFeed(request, env) {
	const key = new URL(request.url).searchParams.get('key') ?? '';
	if (!env.CALENDAR_FEED_KEY || !env.DB || !(await sameText(key, env.CALENDAR_FEED_KEY))) return new Response('Not found', { status: 404 });
	const { results } = await env.DB.prepare('SELECT * FROM bookings WHERE slot_start >= ? ORDER BY slot_start').bind(Date.now() - 30 * DAY).all();
	return icsResponse(calendar(results ?? [], 'owner', 'Llamadas · jossuealcala.com'), 'llamadas.ics');
}

// ---------- aviso a Jossué ----------

function notifyBooked(env, row) {
	const digits = row.phone.replace(/\D/g, '');
	return notify(env, {
		kind: 'call',
		subject: `${row.name} · ${whenLabel(row.slot_start)}${row.topic ? ` · ${row.topic.slice(0, 60)}` : ''}`,
		replyTo: { email: row.email, name: row.name },
		text: [
			`${row.name} agendó una llamada de 10 minutos.`,
			'',
			`Cuándo: ${whenLabel(row.slot_start)} (hora de Guadalajara)`,
			`Llámale al: ${phoneLabel(row.phone)}`,
			`WhatsApp: https://wa.me/${digits}`,
			`Correo: ${row.email}`,
			`Tema: ${row.topic || '(no lo dijo)'}`,
			`Agendó desde: ${row.source}${row.page ? ` · ${row.page}` : ''}`,
			`Permiso para contactarle: sí (${new Date(row.consent_at).toISOString()})`,
			'',
			'Ya está en tu calendario «Llamadas · jossuealcala.com» (si lo suscribiste). Si no puedes, responde este correo o escríbele por WhatsApp.',
		].join('\n'),
	});
}

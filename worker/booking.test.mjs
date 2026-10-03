import assert from 'node:assert/strict';
import test from 'node:test';
import { agenda, candidateSlots, localDay, normalizePhone, offeredSlots } from './booking.mjs';
import { handleRequest } from './index.mjs';
import { d1 } from './test-d1.mjs';

const ORIGIN = 'https://jossuealcala.com';
// Lunes 5 de octubre de 2026, 8:00 en Guadalajara (14:00 UTC).
const MONDAY_8AM = Date.parse('2026-10-05T14:00:00Z');
const TUESDAY_10AM = Date.parse('2026-10-06T16:00:00Z');

function environment(overrides = {}) {
	const emails = [];
	return {
		DB: d1(),
		emails,
		RATE_LIMIT_SALT: 'salt',
		ALLOWED_ORIGINS: ORIGIN,
		CONTACT_EMAIL_TO: 'owner@example.com',
		CONTACT_EMAIL: { send: async (message) => emails.push(message) },
		CALENDAR_FEED_KEY: 'llave-del-feed-de-prueba',
		BOOKING_SCARCITY: 'off',
		ASSETS: { fetch: async () => new Response('asset') },
		...overrides,
	};
}

const person = { name: 'Ana López', email: 'ana@tienda.mx', phone: '33 1234 5678', topic: 'Mi tienda no vende', consent: true, locale: 'es', source: 'auditoria', page: '/es/agenda/' };
const post = (env, path, body, ip = '203.0.113.30') =>
	handleRequest(new Request(`${ORIGIN}${path}`, { method: 'POST', headers: { Origin: ORIGIN, 'Content-Type': 'application/json', 'CF-Connecting-IP': ip }, body: JSON.stringify(body) }), env);
const get = (env, path) => handleRequest(new Request(`${ORIGIN}${path}`, { headers: { Origin: ORIGIN } }), env);

// Las rutas usan la hora real; para probar con un lunes fijo se congela Date.now.
function at(ms, fn) {
	const real = Date.now;
	Date.now = () => ms;
	return Promise.resolve(fn()).finally(() => (Date.now = real));
}

test('availability is Tuesday, Wednesday and Friday 10–12 and 16–20:30, and Saturday 9–13, Guadalajara time', () => {
	const slots = candidateSlots(MONDAY_8AM);
	const byDay = new Map();
	for (const start of slots) byDay.set(localDay(start), [...(byDay.get(localDay(start)) ?? []), start]);
	const firstWeek = [...byDay.keys()].slice(0, 4);
	assert.deepEqual(firstWeek, ['2026-10-06', '2026-10-07', '2026-10-09', '2026-10-10'], 'no Monday or Thursday (office) and no Sunday');
	const tuesday = byDay.get('2026-10-06');
	assert.equal(tuesday[0], TUESDAY_10AM, 'first call at 10:00 local');
	assert.ok(tuesday.includes(Date.parse('2026-10-06T17:45:00Z')), 'last morning call at 11:45, ends 11:55');
	assert.ok(!tuesday.includes(Date.parse('2026-10-06T18:00:00Z')), 'nothing between 12:00 and 16:00');
	assert.equal(tuesday.find((start) => start > Date.parse('2026-10-06T18:00:00Z')), Date.parse('2026-10-06T22:00:00Z'), 'afternoon starts at 16:00');
	assert.equal(tuesday.at(-1), Date.parse('2026-10-07T02:15:00Z'), 'last call at 20:15, ends 20:25');
	assert.equal(tuesday.length, 8 + 18, 'every 15 minutes: 10 of call, 5 of margin');
	const saturday = byDay.get('2026-10-10');
	assert.equal(saturday[0], Date.parse('2026-10-10T15:00:00Z'), 'Saturday from 9:00');
	assert.equal(saturday.at(-1), Date.parse('2026-10-10T18:45:00Z'), 'last Saturday call at 12:45');
	// Con menos de 2 horas no se agenda.
	const tuesdayAt11 = Date.parse('2026-10-06T17:00:00Z');
	assert.equal(candidateSlots(tuesdayAt11)[0], Date.parse('2026-10-06T22:00:00Z'), 'at 11:00 the next call is 16:00');
});

test('phones are stored with their country code', () => {
	assert.equal(normalizePhone('33 1234 5678'), '+523312345678');
	assert.equal(normalizePhone('+52 1 33 1234 5678'), '+523312345678');
	assert.equal(normalizePhone('5213312345678'), '+523312345678');
	assert.equal(normalizePhone('+1 (415) 555-0100'), '+14155550100');
	assert.equal(normalizePhone('12345'), null);
});

test('booking a call: free slots, the booking, the alert to Jossué, the .ics and the calendar feed', async () => {
	const env = environment();
	await at(MONDAY_8AM, async () => {
		const slots = await (await get(env, '/api/booking/slots')).json();
		assert.equal(slots.ok, true);
		assert.equal(slots.days[0].date, '2026-10-06');
		assert.equal(slots.days[0].slots[0], TUESDAY_10AM);

		const created = await post(env, '/api/booking', { ...person, slot: TUESDAY_10AM });
		assert.equal(created.status, 201);
		const { booking } = await created.json();
		assert.match(booking.id, /^CALL-[a-f0-9]{16}$/);
		assert.equal(booking.phone, '+52 33 1234 5678');
		assert.equal(booking.when, 'martes 6 de octubre a las 10:00');

		assert.equal(env.emails.length, 1);
		const [mail] = env.emails;
		assert.equal(mail.from.email, 'avisos@jossuealcala.com');
		assert.equal(mail.subject, 'Llamada agendada · Ana López · martes 6 de octubre a las 10:00 · Mi tienda no vende');
		assert.equal(mail.replyTo.email, 'ana@tienda.mx');
		assert.match(mail.text, /Llámale al: \+52 33 1234 5678/);
		assert.match(mail.text, /https:\/\/wa\.me\/523312345678/);

		const after = await (await get(env, '/api/booking/slots')).json();
		assert.notEqual(after.days[0].slots[0], TUESDAY_10AM, 'the slot is gone');

		const ics = await get(env, `/api/booking/${booking.id}.ics?t=${booking.token}`);
		assert.equal(ics.status, 200);
		assert.match(ics.headers.get('Content-Type'), /text\/calendar/);
		const visitorIcs = await ics.text();
		assert.match(visitorIcs, /DTSTART:20261006T160000Z/);
		assert.match(visitorIcs, /SUMMARY:Llamada con Jossué Alcalá \(10 min\)/);
		assert.doesNotMatch(visitorIcs, /ana@tienda\.mx/, 'the visitor file does not carry what only Jossué needs');
		assert.equal((await get(env, `/api/booking/${booking.id}.ics?t=otro`)).status, 404);

		assert.equal((await get(env, '/api/booking/calendar.ics?key=mal')).status, 404, 'the feed needs its key');
		const feed = await (await get(env, '/api/booking/calendar.ics?key=llave-del-feed-de-prueba')).text();
		assert.match(feed, /X-WR-CALNAME:Llamadas · jossuealcala\.com/);
		assert.match(feed, /SUMMARY:Llamar a Ana López \(10 min\)/);
		for (const line of feed.split('\r\n')) assert.ok(new TextEncoder().encode(line).length <= 75, `folded: ${line}`);
		assert.match(feed, /LOCATION:tel:\+523312345678/);
		assert.match(feed, /STATUS:CONFIRMED/);
	});
});

test('nobody can book a taken, invalid or blocked slot, or a second call with the same email', async () => {
	const env = environment();
	await at(MONDAY_8AM, async () => {
		assert.equal((await post(env, '/api/booking', { ...person, slot: TUESDAY_10AM })).status, 201);
		const taken = await post(env, '/api/booking', { ...person, email: 'otra@x.mx', slot: TUESDAY_10AM }, '203.0.113.31');
		assert.equal(taken.status, 409);
		assert.equal((await taken.json()).error, 'slot_invalid');

		const again = await (await post(env, '/api/booking', { ...person, slot: TUESDAY_10AM + 15 * 60_000 })).json();
		assert.equal(again.error, 'already_booked');
		assert.doesNotMatch(again.message, /octubre|10:00/, 'does not reveal when the other call is');

		const monday = Date.parse('2026-10-05T17:00:00Z');
		assert.equal((await (await post(env, '/api/booking', { ...person, email: 'b@x.mx', slot: monday }, '203.0.113.32')).json()).error, 'slot_invalid', 'Mondays are not open');
		assert.equal((await (await post(env, '/api/booking', { ...person, email: 'c@x.mx', phone: '123', slot: TUESDAY_10AM + 30 * 60_000 }, '203.0.113.33')).json()).error, 'invalid_phone');
		assert.equal((await (await post(env, '/api/booking', { ...person, email: 'd@x.mx', consent: false, slot: TUESDAY_10AM + 30 * 60_000 }, '203.0.113.34')).json()).error, 'consent_required');

		env.DB.raw.prepare("INSERT INTO booking_blocks (day, reason, created_at) VALUES ('2026-10-07', 'viaje', 0)").run();
		const slots = await (await get(env, '/api/booking/slots')).json();
		assert.ok(!slots.days.some((day) => day.date === '2026-10-07'), 'a blocked day disappears');
		const wednesday = Date.parse('2026-10-07T16:00:00Z');
		assert.equal((await (await post(env, '/api/booking', { ...person, email: 'e@x.mx', slot: wednesday }, '203.0.113.35')).json()).error, 'slot_invalid');
	});
});

test('the visitor can cancel with their token, and Jossué is told', async () => {
	const env = environment();
	await at(MONDAY_8AM, async () => {
		const { booking } = await (await post(env, '/api/booking', { ...person, slot: TUESDAY_10AM })).json();
		assert.equal((await post(env, '/api/booking/cancel', { id: booking.id, token: 'no-es' })).status, 404);
		const cancelled = await (await post(env, '/api/booking/cancel', { id: booking.id, token: booking.token })).json();
		assert.equal(cancelled.status, 'cancelled');
		assert.equal(env.emails.length, 2);
		assert.match(env.emails[1].subject, /^Llamada cancelada · Ana López/);
		const slots = await (await get(env, '/api/booking/slots')).json();
		assert.equal(slots.days[0].slots[0], TUESDAY_10AM, 'the slot is free again');
		const feed = await (await get(env, '/api/booking/calendar.ics?key=llave-del-feed-de-prueba')).text();
		assert.match(feed, /STATUS:CANCELLED/, 'the calendar removes it');
		assert.equal((await post(env, '/api/booking', { ...person, slot: TUESDAY_10AM + 15 * 60_000 })).status, 201, 'and can book again');
	});
});

test('booking caps per connection protect the agenda', async () => {
	const env = environment();
	await at(MONDAY_8AM, async () => {
		for (let i = 0; i < 3; i += 1) assert.equal((await post(env, '/api/booking', { ...person, email: `p${i}@x.mx`, slot: TUESDAY_10AM + i * 15 * 60_000 })).status, 201);
		const capped = await post(env, '/api/booking', { ...person, email: 'p9@x.mx', slot: TUESDAY_10AM + 5 * 15 * 60_000 });
		assert.equal(capped.status, 429);
		assert.equal((await capped.json()).error, 'limit_ip');
	});
});

test('limited capacity: each day opens a stable share of its times, some days none, and only those can be booked', async () => {
	const slots = candidateSlots(MONDAY_8AM);
	// Sobre un año de fechas: el reparto se parece al buscado y la misma fecha da siempre lo mismo.
	const sample = Array.from({ length: 26 }, (_, i) => 1000 + i);
	const dates = Array.from({ length: 365 }, (_, i) => new Date(Date.UTC(2026, 9, 1) + i * 864e5).toISOString().slice(0, 10));
	const counts = dates.map((day) => offeredSlots(sample, day).length);
	assert.deepEqual(counts, dates.map((day) => offeredSlots(sample, day).length), 'the same date always opens the same times');
	const share = (test) => counts.filter(test).length / counts.length;
	assert.ok(share((n) => n === 0) > 0.12 && share((n) => n === 0) < 0.3, 'about one day in five is full');
	assert.ok(share((n) => n > 0 && n <= 2) > 0.2 && share((n) => n > 0 && n <= 2) < 0.4, 'about three in ten have one or two');
	assert.ok(share((n) => n >= 3) > 0.35, 'the rest are open');
	const env = environment({ BOOKING_SCARCITY: 'on' });
	await at(MONDAY_8AM, async () => {
		const list = await agenda(env, MONDAY_8AM);
		assert.ok(list.slice(0, 3).some((day) => day.slots.length > 0), 'never three full days in a row at the start');
		const weeks = new Map();
		for (const day of list) { const d = new Date(`${day.date}T12:00:00Z`); const key = new Date(d.getTime() - ((d.getUTCDay() + 6) % 7) * 864e5).toISOString().slice(0, 10); weeks.set(key, [...(weeks.get(key) ?? []), day]); }
		for (const days of weeks.values()) if (days.length >= 2) assert.ok(days.some((day) => day.slots.length === 0) || days.slice(0, 3).length < 3, `every week with two or more days has a full one (${days.map((day) => day.date).join(', ')})`);
		const body = await (await get(env, '/api/booking/slots')).json();
		assert.ok(body.days.every((day) => day.full === (day.slots.length === 0)), 'a day with no times is marked full');
		const hidden = slots.find((start) => !body.days.flatMap((day) => day.slots).includes(start));
		const refused = await (await post(env, '/api/booking', { ...person, slot: hidden })).json();
		assert.equal(refused.error, 'slot_invalid', 'a time that is not offered cannot be booked');
		const open = body.days.find((day) => day.slots.length)?.slots[0];
		assert.equal((await post(env, '/api/booking', { ...person, email: 'abierto@x.mx', slot: open })).status, 201);
	});
});

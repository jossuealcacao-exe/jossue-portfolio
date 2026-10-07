// La cartera de APEX (apex.jossuealcala.com/cartera) es el CRM: ahí se le da seguimiento a cada
// persona que me busca. Este módulo le manda lo que pasa en el sitio:
//
//   - una llamada agendada y, si se cancela, su cancelación (bookings)
//   - un recado que alguien le dejó a Jossue AI (ai_leads)
//   - un mensaje del formulario de contacto (submissions)
//
// Va a POST /v1/portfolio-leads con un token que solo tiene `portfolio:write` (APEX_CRM_TOKEN): escribe
// en la cartera y nada más. APEX reconoce los reintentos por `externo_id`, así que mandar dos veces lo
// mismo no duplica nada. Se intenta al momento (sin hacer esperar a la persona) y el cron diario
// reintenta lo que quedó pendiente. Sin token, no se manda nada y el sitio funciona igual.

import { notify } from './notify.mjs';

const APEX_DEFAULT = 'https://apex.jossuealcala.com';
const TIMEOUT_MS = 8000;
const RETRY_DAYS = 14;
const RETRY_BATCH = 25;

export const crmEnabled = (env) => Boolean(env.APEX_CRM_TOKEN && env.DB);
const apexBase = (env) => String(env.APEX_API_BASE || APEX_DEFAULT).replace(/\/$/, '');
const iso = (value) => new Date(typeof value === 'number' || /^\d+$/.test(String(value)) ? Number(value) : value).toISOString();
const orNull = (value) => (String(value ?? '').trim() ? String(value).trim() : null);
const clip = (value, max) => orNull(String(value ?? '').slice(0, max));

/** La llamada, como la entiende la cartera. */
export function bookingEntry(row) {
	return {
		externo_id: row.id,
		tipo: 'llamada',
		persona: { nombre: clip(row.name, 120) ?? 'Sin nombre', email: orNull(row.email), telefono: orNull(row.phone) },
		consent_at: iso(row.consent_at),
		locale: row.locale === 'en' ? 'en' : 'es',
		tema: clip(row.topic, 500),
		cuando: iso(row.slot_start),
		pagina: clip(row.page, 200),
	};
}

export function bookingCancelEntry(row) {
	return { ...bookingEntry(row), externo_id: `${row.id}:cancelada`, tipo: 'llamada_cancelada' };
}

/** El recado: quien deja su contacto en el chat lo deja para que Jossué le escriba. */
export function aiLeadEntry(row) {
	return {
		externo_id: `RECADO-${row.id}`,
		tipo: 'recado',
		persona: { nombre: clip(row.name, 120) ?? 'Sin nombre', email: orNull(row.email), telefono: orNull(row.phone), empresa: clip(row.company, 160) },
		consent_at: iso(row.created_at),
		locale: row.locale === 'en' ? 'en' : 'es',
		tema: clip(row.need, 500),
		mensaje: clip(row.message, 2000),
		pagina: clip(row.page, 200),
	};
}

/** El formulario: la casilla de consentimiento es obligatoria para mandarlo. */
export function submissionEntry(row) {
	return {
		externo_id: `FORM-${row.id}`,
		tipo: 'formulario',
		persona: { nombre: clip(row.name, 120) ?? 'Sin nombre', email: orNull(row.email), empresa: clip(row.organization, 160) },
		consent_at: iso(row.created_at),
		locale: 'es',
		sitio: clip(row.site_url, 500),
		tema: clip([row.project_type, row.budget && `presupuesto: ${row.budget}`].filter(Boolean).join(' · '), 500),
		mensaje: clip(row.message, 2000),
	};
}

const KINDS = {
	booking: { table: 'bookings', column: 'crm_synced_at', entry: bookingEntry },
	bookingCancel: { table: 'bookings', column: 'crm_cancel_synced_at', entry: bookingCancelEntry },
	aiLead: { table: 'ai_leads', column: 'crm_synced_at', entry: aiLeadEntry },
	submission: { table: 'submissions', column: 'crm_synced_at', entry: submissionEntry },
};

/**
 * Manda una fila a la cartera y la marca si llegó.
 *
 * 200/201: llegó (201 nueva, 200 ya estaba). Un 400 es un dato que APEX no acepta (sin correo ni
 * teléfono, por ejemplo): reintentarlo daría lo mismo, así que también se marca y queda en el
 * registro. 401/403/429/5xx o un corte de red se dejan sin marcar para el siguiente intento.
 */
export async function syncRow(env, kind, row) {
	if (!crmEnabled(env)) return false;
	const { table, column, entry } = KINDS[kind];
	let status;
	let detail = '';
	try {
		const response = await fetch(`${apexBase(env)}/v1/portfolio-leads`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${env.APEX_CRM_TOKEN}`, 'Content-Type': 'application/json' },
			body: JSON.stringify(entry(row)),
			signal: globalThis.AbortSignal.timeout(TIMEOUT_MS),
		});
		status = response.status;
		// El código de error de APEX (unauthenticated, insufficient_scope…) dice qué arreglar.
		if (status !== 200 && status !== 201) detail = String((await response.json().catch(() => ({})))?.error?.code ?? '').slice(0, 80);
	} catch (error) {
		await logFailure(env, kind, row.id, 0, String(error?.name ?? error).slice(0, 80));
		return false;
	}
	const delivered = status === 200 || status === 201;
	if (!delivered) await logFailure(env, kind, row.id, status, detail);
	if (!delivered && status !== 400) return false;
	await env.DB.prepare(`UPDATE ${table} SET ${column} = ? WHERE id = ?`).bind(Date.now(), row.id).run().catch(() => null);
	return delivered;
}

/**
 * Anota el intento fallido. Si APEX rechazó el token (401/403), además avisa a Jossué una vez al día:
 * hasta que se arregle, nada llega a la cartera, y eso no puede quedar en silencio.
 */
async function logFailure(env, kind, rowId, status, detail) {
	console.error('crm sync failed', kind, status, detail);
	const tokenProblem = status === 401 || status === 403;
	const alreadyWarned = tokenProblem
		? await env.DB.prepare('SELECT 1 FROM crm_sync_log WHERE status IN (401, 403) AND ts >= ? LIMIT 1').bind(Date.now() - 864e5).first().catch(() => null)
		: true;
	await env.DB.prepare('INSERT INTO crm_sync_log (ts, kind, row_id, status, detail) VALUES (?, ?, ?, ?, ?)').bind(Date.now(), kind, String(rowId), status, detail).run().catch(() => null);
	if (!alreadyWarned) {
		await notify(env, {
			kind: 'alert',
			subject: `La cartera de APEX rechazó el token del portafolio (${status}${detail ? ` · ${detail}` : ''})`,
			text: [
				`APEX respondió ${status}${detail ? ` (${detail})` : ''} al registrar una entrada del portafolio. Hasta que se arregle, las llamadas, recados y formularios no llegan a la cartera; se guardan y se reintentan solos cada día.`,
				'',
				'Qué revisar: que APEX_CRM_TOKEN (wrangler secret put APEX_CRM_TOKEN) sea el token completo, sin comillas, con el alcance portfolio:write y sin revocar. Se acuña desde la consola de apex.jossuealcala.com (ver docs/PORTAFOLIO.md en APEX).',
				'',
				'Este aviso llega como máximo una vez al día.',
			].join('\n'),
		}).catch(() => null);
	}
}

/** Lo manda sin hacer esperar a nadie: el Worker sigue vivo hasta que termine. */
export function syncLater(env, ctx, kind, row) {
	if (!crmEnabled(env)) return;
	const pending = syncRow(env, kind, row).catch(() => false);
	if (ctx?.waitUntil) ctx.waitUntil(pending);
}

/** La cancelación necesita que su llamada ya esté en la cartera: si no estaba, va primero. */
export function syncCancellation(env, ctx, row) {
	if (!crmEnabled(env)) return;
	const pending = (async () => {
		if (!row.crm_synced_at && !(await syncRow(env, 'booking', row))) return false;
		return syncRow(env, 'bookingCancel', row);
	})().catch(() => false);
	if (ctx?.waitUntil) ctx.waitUntil(pending);
}

/** Lo que no llegó en las últimas dos semanas, en lotes cortos. Lo llama el cron. */
export async function syncPending(env, now = Date.now()) {
	if (!crmEnabled(env)) return { sent: 0 };
	const since = now - RETRY_DAYS * 864e5;
	const sinceIso = new Date(since).toISOString();
	const queries = [
		['booking', 'SELECT * FROM bookings WHERE crm_synced_at IS NULL AND created_at >= ? ORDER BY created_at LIMIT ?', since],
		// Una cancelación va después de su llamada: APEX la anota en la misma ficha.
		['bookingCancel', "SELECT * FROM bookings WHERE status = 'cancelled' AND crm_cancel_synced_at IS NULL AND crm_synced_at IS NOT NULL AND created_at >= ? ORDER BY created_at LIMIT ?", since],
		['aiLead', 'SELECT * FROM ai_leads WHERE crm_synced_at IS NULL AND created_at >= ? ORDER BY created_at LIMIT ?', sinceIso],
		['submission', 'SELECT * FROM submissions WHERE crm_synced_at IS NULL AND created_at >= ? ORDER BY created_at LIMIT ?', sinceIso],
	];
	await env.DB.prepare('DELETE FROM crm_sync_log WHERE ts < ?').bind(now - 30 * 864e5).run().catch(() => null);
	let sent = 0;
	for (const [kind, sql, from] of queries) {
		const { results } = await env.DB.prepare(sql).bind(from, RETRY_BATCH).all().catch(() => ({ results: [] }));
		for (const row of results ?? []) if (await syncRow(env, kind, row)) sent += 1;
	}
	return { sent };
}

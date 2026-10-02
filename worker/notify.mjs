// Avisos a Jossué por correo. Todos salen de avisos@jossuealcala.com: en Mail se marca como VIP y
// solo esos suenan en el iPhone y la Mac. El asunto empieza por el tipo para saber qué es sin abrirlo.
// Llegan a CONTACT_EMAIL_TO (hola@jossuealcala.com), que tiene que estar verificada en Email Routing.

export const NOTIFY_FROM = 'avisos@jossuealcala.com';
const SENDER_NAME = 'Avisos · jossuealcala.com';

export const KINDS = {
	client: 'Nuevo cliente',
	audit: 'Auditoría',
	call: 'Llamada agendada',
	callCancelled: 'Llamada cancelada',
	whatsapp: 'WhatsApp',
	alert: 'Alerta',
	summary: 'Resumen',
};

export function notifyEnabled(env) {
	return Boolean(env.CONTACT_EMAIL && String(env.CONTACT_EMAIL_TO ?? '').trim());
}

/** Manda un aviso. Devuelve true solo si salió; un fallo queda en el registro con su motivo. */
export async function notify(env, { kind, subject, text, replyTo }) {
	const to = String(env.CONTACT_EMAIL_TO ?? '').trim();
	if (!env.CONTACT_EMAIL || !to) return false;
	const title = String(subject ?? '').replace(/\s+/g, ' ').trim().slice(0, 180);
	try {
		await env.CONTACT_EMAIL.send({
			to,
			from: { email: NOTIFY_FROM, name: SENDER_NAME },
			...(replyTo?.email ? { replyTo } : {}),
			subject: `${KINDS[kind] ?? 'Aviso'} · ${title}`,
			text,
		});
		return true;
	} catch (error) {
		console.error(`notify ${kind} failed`, error?.name, String(error?.message ?? '').slice(0, 200));
		return false;
	}
}

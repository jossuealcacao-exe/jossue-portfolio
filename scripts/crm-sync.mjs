// Manda ya a la cartera de APEX lo que tenga pendiente el portafolio (llamadas, cancelaciones,
// recados y formularios) —lo mismo que hace el cron de las 8:00— y dice cómo quedó.
// Usa el token de administración de `npm run chats` (CONTACT_ADMIN_TOKEN en .env.api); no lo imprime.
//
//   npm run crm:sync
const token = process.env.CONTACT_ADMIN_TOKEN?.trim();
const base = process.env.CONTACT_SUBMISSIONS_ENDPOINT?.trim().replace(/\/api\/submissions$/, '') || 'https://jossuealcala.com';
if (!token) {
	console.error('Falta CONTACT_ADMIN_TOKEN. Agrégalo a .env.api.');
	process.exit(1);
}
const response = await fetch(`${base}/api/crm/sync`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
const result = await response.json().catch(() => ({}));
if (!response.ok) {
	console.error(response.status === 401 ? '401: el token no coincide con el ADMIN_TOKEN del worker.' : `Error ${response.status}`);
	process.exit(1);
}
const { pending, recentFailures, sent, enabled } = result;
console.log(enabled ? `Enviadas ahora a la cartera: ${sent}` : 'El worker no tiene APEX_CRM_TOKEN: no se manda nada.');
console.log(`Pendientes: ${pending.llamadas} llamadas, ${pending.cancelaciones} cancelaciones, ${pending.recados} recados, ${pending.formularios} formularios`);
for (const fail of recentFailures) console.log(`  ✖ ${new Date(fail.ts).toLocaleString('es-MX')} · ${fail.kind} ${fail.row_id} · ${fail.status || 'sin respuesta'} ${fail.detail}`);

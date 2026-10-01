// Conversaciones de Jossue AI y recados que dejó la gente, en texto legible.
// Usa el mismo token de administración que `npm run submissions` (CONTACT_ADMIN_TOKEN en .env.api).
//
//   npm run chats            últimos 7 días
//   npm run chats -- 30      últimos 30 días (máximo 30: después se borran solos)
//   npm run chats -- 7 --json   la respuesta tal cual, para guardarla o procesarla
const token = process.env.CONTACT_ADMIN_TOKEN?.trim();
const base = process.env.CONTACT_SUBMISSIONS_ENDPOINT?.trim().replace(/\/api\/submissions$/, '') || 'https://jossuealcala.com';
const days = Number(process.argv.find((arg) => /^\d+$/.test(arg)) ?? 7);
const asJson = process.argv.includes('--json');

if (!token) {
	console.error('Falta CONTACT_ADMIN_TOKEN. Agrégalo a .env.api.');
	process.exit(1);
}

const response = await fetch(`${base}/api/ai/chats?days=${days}`, { headers: { Authorization: `Bearer ${token}` } });
const payload = await response.json().catch(() => ({}));
if (!response.ok) {
	console.error(response.status === 401 ? '401: el token no coincide con el ADMIN_TOKEN del worker.' : `Error ${response.status}: ${payload.error ?? 'desconocido'}`);
	process.exit(1);
}
if (asJson) {
	console.log(JSON.stringify(payload, null, 2));
	process.exit(0);
}

const conversations = Object.entries(payload.conversations ?? {})
	.map(([sid, turns]) => ({ sid, turns, last: turns.at(-1)?.ts ?? 0 }))
	.filter((conversation) => !conversation.sid.startsWith('QA-'))
	.sort((a, b) => b.last - a.last);

const when = (ts) => new Date(ts).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' });
const abuse = payload.abuse ?? { events: [], blocks: [] };
if (abuse.events.length || abuse.blocks.length) {
	console.log(`\nALERTAS DE ABUSO · ${abuse.events.length} intentos, ${abuse.blocks.length} bloqueos`);
	for (const block of abuse.blocks) console.log(`  ⛔ bloqueado hasta ${new Date(block.until).toLocaleString('es-MX')} · ${block.reason} · ${block.count} vez/veces`);
	for (const event of abuse.events.slice(0, 30)) console.log(`  · ${when(event.ts)} · ${event.source} · ${event.kind} (detectó: ${event.layer}) · ${event.excerpt}`);
}

console.log(`\nRECADOS (${payload.leads?.length ?? 0})`);
for (const lead of payload.leads ?? []) {
	console.log(`\n• ${lead.createdAt} · ${lead.name || 'sin nombre'} · ${[lead.email, lead.phone].filter(Boolean).join(' · ')}${lead.company ? ` · ${lead.company}` : ''}`);
	if (lead.need) console.log(`  Necesita: ${lead.need}`);
	if (lead.message) console.log(`  Mensaje: ${lead.message}`);
	if (lead.page) console.log(`  Desde: ${lead.page}`);
}

console.log(`\nCONVERSACIONES · últimos ${payload.days} días (${conversations.length}, sin las de prueba)`);
for (const { sid, turns } of conversations) {
	console.log(`\n── ${sid} · ${when(turns[0].ts)} · ${turns[0].page ?? ''} · ${turns[0].locale ?? ''}`);
	for (const turn of turns) console.log(`  ${turn.role === 'user' ? 'Visitante' : 'Jossue AI'}: ${turn.text.replace(/\s+/g, ' ')}`);
}
console.log('');

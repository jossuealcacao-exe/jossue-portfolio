-- Capa anti abusos de Jossue AI: cada intento detectado y los bloqueos activos.
-- key es una huella (IP con HMAC, id de sesión o huella del chat de WhatsApp), nunca un dato crudo.
CREATE TABLE IF NOT EXISTS ai_abuse (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	ts INTEGER NOT NULL,
	key TEXT NOT NULL,
	source TEXT NOT NULL DEFAULT 'web', -- web o whatsapp
	kind TEXT NOT NULL, -- injection, extraction, code, stress, abuse, leak
	layer TEXT NOT NULL, -- rules, guard u output: qué candado lo detectó
	points INTEGER NOT NULL DEFAULT 1,
	excerpt TEXT NOT NULL DEFAULT '' -- el mensaje recortado, sin correos ni teléfonos
);

CREATE INDEX IF NOT EXISTS ai_abuse_key_ts_idx ON ai_abuse (key, ts);
CREATE INDEX IF NOT EXISTS ai_abuse_ts_idx ON ai_abuse (ts);

CREATE TABLE IF NOT EXISTS ai_blocks (
	key TEXT PRIMARY KEY,
	until INTEGER NOT NULL,
	reason TEXT NOT NULL DEFAULT '',
	count INTEGER NOT NULL DEFAULT 1, -- cuántas veces se ha bloqueado
	alerted_at INTEGER NOT NULL DEFAULT 0 -- último correo de alerta a Jossué
);

-- Recados por IP al día (tope anti spam).
ALTER TABLE ai_leads ADD COLUMN ip_hash TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS ai_leads_ip_idx ON ai_leads (ip_hash, created_at);

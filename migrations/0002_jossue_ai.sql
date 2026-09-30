-- Jossue AI: turnos de conversación (texto sin correos ni teléfonos, se purgan a los 30 días)
-- y los contactos que la gente deja a propósito para que Jossué le escriba.
CREATE TABLE IF NOT EXISTS ai_messages (
	sid TEXT NOT NULL,
	ts INTEGER NOT NULL,
	role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
	text TEXT NOT NULL,
	ip_hash TEXT NOT NULL,
	locale TEXT NOT NULL DEFAULT 'es',
	page TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS ai_messages_sid_idx ON ai_messages (sid, ts);
CREATE INDEX IF NOT EXISTS ai_messages_rate_idx ON ai_messages (ip_hash, ts DESC);
CREATE INDEX IF NOT EXISTS ai_messages_ts_idx ON ai_messages (ts);

CREATE TABLE IF NOT EXISTS ai_leads (
	id TEXT PRIMARY KEY,
	created_at TEXT NOT NULL,
	sid TEXT NOT NULL,
	locale TEXT NOT NULL DEFAULT 'es',
	page TEXT NOT NULL DEFAULT '',
	name TEXT NOT NULL DEFAULT '',
	email TEXT NOT NULL DEFAULT '',
	phone TEXT NOT NULL DEFAULT '',
	company TEXT NOT NULL DEFAULT '',
	need TEXT NOT NULL DEFAULT '',
	message TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS ai_leads_created_at_idx ON ai_leads (created_at DESC);

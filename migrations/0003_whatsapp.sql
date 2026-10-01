-- Jossue AI en WhatsApp: estado de cada chat y mensajes ya procesados.
-- El número de la persona no se guarda: chat_key es una huella (HMAC) del número.
CREATE TABLE IF NOT EXISTS wa_chats (
	chat_key TEXT PRIMARY KEY,
	paused_until INTEGER NOT NULL DEFAULT 0, -- Jossué escribió desde su app: el bot no contesta hasta esta hora
	handoff_at INTEGER NOT NULL DEFAULT 0, -- cuándo se le pasó el chat a Jossué (el bot se calla un rato)
	owner_last_at INTEGER NOT NULL DEFAULT 0, -- último mensaje de Jossué en persona
	greeted INTEGER NOT NULL DEFAULT 0, -- el bot ya se presentó
	day TEXT NOT NULL DEFAULT '',
	day_count INTEGER NOT NULL DEFAULT 0, -- respuestas del bot hoy en este chat
	updated_at INTEGER NOT NULL DEFAULT 0
);

-- Ids de mensajes de Meta ya vistos: Meta reintenta los webhooks y no hay que contestar dos veces.
CREATE TABLE IF NOT EXISTS wa_events (
	id TEXT PRIMARY KEY,
	ts INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS wa_events_ts_idx ON wa_events (ts);

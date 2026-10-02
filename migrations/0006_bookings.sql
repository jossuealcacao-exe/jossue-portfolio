-- Llamadas de 10 minutos que la gente agenda en /es/agenda/. Jossué les llama a su número a la hora.
-- La disponibilidad (martes, miércoles y viernes 10–18 h, sábado 9–13 h, hora de Guadalajara) vive en
-- worker/booking.mjs; aquí solo las citas y los días que Jossué bloquea desde el panel.
CREATE TABLE IF NOT EXISTS bookings (
	id TEXT PRIMARY KEY,
	created_at INTEGER NOT NULL,
	slot_start INTEGER NOT NULL, -- inicio en ms UTC
	slot_end INTEGER NOT NULL,
	status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed, cancelled
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	phone TEXT NOT NULL, -- con lada, p. ej. +523312345678
	topic TEXT NOT NULL DEFAULT '',
	locale TEXT NOT NULL DEFAULT 'es',
	source TEXT NOT NULL DEFAULT 'web', -- web, chat, auditoria, whatsapp
	page TEXT NOT NULL DEFAULT '',
	ip_hash TEXT NOT NULL,
	consent_at INTEGER NOT NULL,
	token_hash TEXT NOT NULL, -- SHA-256 del token con el que la persona cancela o baja su .ics
	cancelled_at INTEGER,
	cancelled_by TEXT, -- visitante o jossue
	notified_at INTEGER
);

-- Un horario no se puede dar dos veces: el índice gana cualquier carrera entre dos personas.
CREATE UNIQUE INDEX IF NOT EXISTS bookings_slot_confirmed_idx ON bookings (slot_start) WHERE status = 'confirmed';
CREATE INDEX IF NOT EXISTS bookings_start_idx ON bookings (slot_start);
CREATE INDEX IF NOT EXISTS bookings_ip_idx ON bookings (ip_hash, created_at);
CREATE INDEX IF NOT EXISTS bookings_email_idx ON bookings (email, slot_start);

CREATE TABLE IF NOT EXISTS booking_blocks (
	day TEXT PRIMARY KEY, -- AAAA-MM-DD en hora de Guadalajara
	reason TEXT NOT NULL DEFAULT '',
	created_at INTEGER NOT NULL
);

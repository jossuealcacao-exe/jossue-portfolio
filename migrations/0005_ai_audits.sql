-- Auditorías express que la gente pide en el chat de Jossue AI. Las corre APEX
-- (POST /v1/chat-audits); aquí vive lo que el chat necesita para mostrarlas y para avisarle a Jossué.
CREATE TABLE IF NOT EXISTS ai_audits (
	id TEXT PRIMARY KEY, -- id propio (también es la idempotency_key hacia APEX)
	created_at INTEGER NOT NULL,
	updated_at INTEGER NOT NULL,
	sid TEXT NOT NULL, -- la sesión del chat que la pidió: solo ella puede leerla
	ip_hash TEXT NOT NULL,
	locale TEXT NOT NULL DEFAULT 'es',
	page TEXT NOT NULL DEFAULT '',
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	consent_at INTEGER NOT NULL, -- cuándo aceptó que Jossué le escriba sobre la auditoría
	url TEXT NOT NULL,
	domain TEXT NOT NULL,
	apex_id TEXT,
	status TEXT NOT NULL, -- queued, running, done, failed, rejected
	score INTEGER, -- la «Salud / 100» del informe
	findings TEXT, -- JSON: hasta 3 áreas de oportunidad
	summary TEXT, -- una línea para el panel
	report_url TEXT,
	pdf_url TEXT,
	error TEXT,
	notified_at INTEGER -- cuándo se le avisó a Jossué
);

CREATE INDEX IF NOT EXISTS ai_audits_ip_idx ON ai_audits (ip_hash, created_at);
CREATE INDEX IF NOT EXISTS ai_audits_domain_idx ON ai_audits (domain, created_at);
CREATE INDEX IF NOT EXISTS ai_audits_created_idx ON ai_audits (created_at);

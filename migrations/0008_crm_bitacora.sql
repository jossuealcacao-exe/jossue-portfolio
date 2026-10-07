-- Lo que no llegó a la cartera de APEX y por qué (código HTTP o error de red). Sin esto, un token mal
-- puesto se ve igual que un cron que no corrió: nada se marca y nadie sabe por qué. Se guarda una
-- fila por intento fallido; las de más de 30 días se borran solas (worker/crm.mjs).
CREATE TABLE IF NOT EXISTS crm_sync_log (
	ts INTEGER NOT NULL,
	kind TEXT NOT NULL,
	row_id TEXT NOT NULL,
	status INTEGER NOT NULL, -- 0 = no hubo respuesta (red, tiempo)
	detail TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS crm_sync_log_ts_idx ON crm_sync_log (ts DESC);

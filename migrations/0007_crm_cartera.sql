-- La cartera de APEX (apex.jossuealcala.com): cada llamada agendada, su cancelación, cada recado a
-- Jossue AI y cada mensaje del formulario se registra ahí para darle seguimiento (worker/crm.mjs).
-- Aquí solo se marca qué ya llegó: el envío se intenta al momento y el cron reintenta lo pendiente.
ALTER TABLE bookings ADD COLUMN crm_synced_at INTEGER;
ALTER TABLE bookings ADD COLUMN crm_cancel_synced_at INTEGER;
ALTER TABLE ai_leads ADD COLUMN crm_synced_at INTEGER;
ALTER TABLE submissions ADD COLUMN crm_synced_at INTEGER;

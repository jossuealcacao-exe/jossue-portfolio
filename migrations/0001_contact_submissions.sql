CREATE TABLE IF NOT EXISTS submissions (
	id TEXT PRIMARY KEY,
	created_at TEXT NOT NULL,
	name TEXT NOT NULL,
	email TEXT NOT NULL,
	organization TEXT NOT NULL DEFAULT '',
	site_url TEXT NOT NULL DEFAULT '',
	project_type TEXT NOT NULL,
	budget TEXT NOT NULL DEFAULT '',
	message TEXT NOT NULL,
	consent INTEGER NOT NULL CHECK (consent = 1),
	ip_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS submissions_created_at_idx ON submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS submissions_rate_limit_idx ON submissions (ip_hash, created_at DESC);

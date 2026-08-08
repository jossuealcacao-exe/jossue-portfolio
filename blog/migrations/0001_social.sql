CREATE TABLE IF NOT EXISTS reactions (
	id TEXT PRIMARY KEY,
	post_slug TEXT NOT NULL,
	type TEXT NOT NULL CHECK (type IN ('like', 'share')),
	client_id TEXT NOT NULL,
	created_at TEXT NOT NULL,
	UNIQUE (post_slug, type, client_id)
);

CREATE INDEX IF NOT EXISTS reactions_post_slug_idx ON reactions (post_slug);

CREATE TABLE IF NOT EXISTS comments (
	id TEXT PRIMARY KEY,
	post_slug TEXT NOT NULL,
	body TEXT NOT NULL CHECK (length(body) BETWEEN 3 AND 1000),
	status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
	created_at TEXT NOT NULL,
	approved_at TEXT
);

CREATE INDEX IF NOT EXISTS comments_moderation_idx ON comments (status, created_at DESC);
CREATE INDEX IF NOT EXISTS comments_post_idx ON comments (post_slug, status, approved_at DESC);

const json = (data, status = 200) => new Response(JSON.stringify(data), {
	status,
	headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

const readBody = async (request) => {
	try { return await request.json(); } catch { return null; }
};

const validSlug = (value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const validClient = (value) => typeof value === 'string' && /^[a-zA-Z0-9-]{16,80}$/.test(value);

const socialState = async (db, slug) => {
	const counts = await db.prepare("SELECT type, COUNT(*) AS total FROM reactions WHERE post_slug = ? GROUP BY type").bind(slug).all();
	const comments = await db.prepare("SELECT id, body, created_at AS createdAt FROM comments WHERE post_slug = ? AND status = 'approved' ORDER BY approved_at DESC, created_at DESC LIMIT 100").bind(slug).all();
	const values = Object.fromEntries((counts.results ?? []).map((row) => [row.type, Number(row.total)]));
	return { likes: values.like ?? 0, shares: values.share ?? 0, comments: comments.results ?? [] };
};

const authorized = (request, env) => {
	const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
	return Boolean(env.ADMIN_TOKEN && token && token === env.ADMIN_TOKEN);
};

const api = async (request, env, url) => {
	if (!env.DB) return json({ error: 'social_database_not_configured' }, 503);

	const socialMatch = url.pathname.match(/^\/api\/posts\/([^/]+)\/social$/);
	if (socialMatch) {
		const slug = decodeURIComponent(socialMatch[1]);
		if (!validSlug(slug)) return json({ error: 'invalid_slug' }, 400);
		if (request.method === 'GET') return json(await socialState(env.DB, slug));
		if (request.method === 'POST') {
			const body = await readBody(request);
			if (!body || !['like', 'share'].includes(body.action) || !validClient(body.clientId)) return json({ error: 'invalid_reaction' }, 400);
			await env.DB.prepare('INSERT OR IGNORE INTO reactions (id, post_slug, type, client_id, created_at) VALUES (?, ?, ?, ?, ?)').bind(crypto.randomUUID(), slug, body.action, body.clientId, new Date().toISOString()).run();
			return json(await socialState(env.DB, slug), 201);
		}
		return json({ error: 'method_not_allowed' }, 405);
	}

	const commentMatch = url.pathname.match(/^\/api\/posts\/([^/]+)\/comments$/);
	if (commentMatch && request.method === 'POST') {
		const slug = decodeURIComponent(commentMatch[1]);
		const body = await readBody(request);
		const comment = typeof body?.body === 'string' ? body.body.trim() : '';
		if (!validSlug(slug) || comment.length < 3 || comment.length > 1000) return json({ error: 'invalid_comment' }, 400);
		await env.DB.prepare("INSERT INTO comments (id, post_slug, body, status, created_at) VALUES (?, ?, ?, 'pending', ?)").bind(crypto.randomUUID(), slug, comment, new Date().toISOString()).run();
		return json({ ok: true, status: 'pending' }, 202);
	}

	if (url.pathname === '/api/moderation/comments' && request.method === 'GET') {
		if (!authorized(request, env)) return json({ error: 'unauthorized' }, 401);
		const status = ['pending', 'approved', 'rejected'].includes(url.searchParams.get('status')) ? url.searchParams.get('status') : 'pending';
		const rows = await env.DB.prepare('SELECT id, post_slug AS postSlug, body, status, created_at AS createdAt, approved_at AS approvedAt FROM comments WHERE status = ? ORDER BY created_at DESC LIMIT 200').bind(status).all();
		return json({ comments: rows.results ?? [] });
	}

	const moderationMatch = url.pathname.match(/^\/api\/moderation\/comments\/([^/]+)$/);
	if (moderationMatch && request.method === 'PATCH') {
		if (!authorized(request, env)) return json({ error: 'unauthorized' }, 401);
		const body = await readBody(request);
		if (!['approved', 'rejected'].includes(body?.status)) return json({ error: 'invalid_status' }, 400);
		const approvedAt = body.status === 'approved' ? new Date().toISOString() : null;
		await env.DB.prepare('UPDATE comments SET status = ?, approved_at = ? WHERE id = ?').bind(body.status, approvedAt, decodeURIComponent(moderationMatch[1])).run();
		return json({ ok: true, status: body.status });
	}

	return json({ error: 'not_found' }, 404);
};

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.pathname.startsWith('/api/')) {
			const origin = request.headers.get('origin');
			const allowedOrigin = origin === 'http://localhost:4322' || origin === 'https://blog.jossuealcala.com' ? origin : null;
			const cors = allowedOrigin ? { 'access-control-allow-origin': allowedOrigin, 'access-control-allow-headers': 'authorization, content-type', 'access-control-allow-methods': 'GET, POST, PATCH, OPTIONS', vary: 'Origin' } : {};
			if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
			const response = await api(request, env, url);
			const headers = new Headers(response.headers);
			Object.entries(cors).forEach(([key, value]) => headers.set(key, value));
			return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
		}
		return env.ASSETS.fetch(request);
	},
};

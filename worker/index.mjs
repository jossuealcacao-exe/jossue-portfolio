const MAX_BODY_BYTES = 64 * 1024;
const RATE_LIMIT_MS = 60_000;
const CONTACT_FROM = 'hola@jossuealcala.com';
const CANONICAL_ORIGIN = 'https://jossuealcala.com';
const DEFAULT_LOCALE = 'es';
const SUPPORTED_LOCALES = new Set(['es', 'en']);

function preferredLocale(acceptLanguage) {
	const preferences = String(acceptLanguage ?? '')
		.split(',')
		.map((entry, index) => {
			const [languageRange, ...parameters] = entry.trim().split(';');
			const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith('q='));
			const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1;
			return {
				locale: languageRange.toLowerCase().split('-')[0],
				quality: Number.isFinite(quality) ? quality : 0,
				index,
			};
		})
		.filter(({ quality }) => quality > 0)
		.sort((left, right) => right.quality - left.quality || left.index - right.index);

	return preferences.find(({ locale }) => SUPPORTED_LOCALES.has(locale))?.locale ?? DEFAULT_LOCALE;
}

function localeRedirect(request, url) {
	const locale = preferredLocale(request.headers.get('Accept-Language'));
	const destination = new URL(`/${locale}/`, CANONICAL_ORIGIN);
	destination.search = url.search;
	return new Response(null, {
		status: 302,
		headers: {
			'Cache-Control': 'private, no-store',
			Location: destination.toString(),
			Vary: 'Accept-Language',
		},
	});
}

function clean(value, maxLength) {
	return String(value ?? '').trim().slice(0, maxLength);
}

function singleLine(value, maxLength) {
	return clean(value, maxLength).replace(/[\r\n]+/g, ' ');
}

function validateSubmission(fields) {
	const submission = {
		name: clean(fields.name, 120),
		email: clean(fields.email, 200),
		organization: clean(fields.organization, 160),
		siteUrl: clean(fields.siteUrl, 500),
		projectType: clean(fields.projectType, 120),
		budget: clean(fields.budget, 120),
		message: clean(fields.message, 3000),
		consent: clean(fields.consent, 10),
	};
	const errors = {};
	if (!submission.name) errors.name = 'Name is required';
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) errors.email = 'A valid email is required';
	if (!submission.projectType) errors.projectType = 'Project type is required';
	if (submission.message.length < 20) errors.message = 'Message must contain at least 20 characters';
	if (submission.consent !== 'yes') errors.consent = 'Consent is required';
	return { submission, errors };
}

function json(status, payload, origin = null) {
	const headers = new Headers({
		'Cache-Control': 'no-store',
		'Content-Type': 'application/json; charset=utf-8',
		Vary: 'Origin',
	});
	if (origin) headers.set('Access-Control-Allow-Origin', origin);
	return new Response(status === 204 ? null : JSON.stringify(payload), { status, headers });
}

function allowedOrigins(env) {
	return String(env.ALLOWED_ORIGINS ?? 'https://jossuealcala.com,https://www.jossuealcala.com')
		.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean);
}

function requestOrigin(request, env) {
	const origin = request.headers.get('Origin');
	if (!origin) return null;
	return allowedOrigins(env).includes(origin) ? origin : false;
}

async function parseFields(request) {
	const contentLength = Number(request.headers.get('Content-Length') ?? 0);
	if (contentLength > MAX_BODY_BYTES) throw Object.assign(new Error('Request body too large'), { status: 413 });
	const contentType = request.headers.get('Content-Type') ?? '';
	if (contentType.includes('application/json')) {
		try {
			const parsed = await request.json();
			return parsed && typeof parsed === 'object' ? parsed : {};
		} catch {
			throw Object.assign(new Error('Invalid JSON body'), { status: 400 });
		}
	}
	if (!contentType.includes('multipart/form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
		throw Object.assign(new Error('Unsupported content type'), { status: 415 });
	}
	const form = await request.formData();
	return Object.fromEntries(form.entries());
}

async function hmac(value, secret) {
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
	const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
	return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function safeEqual(left, right) {
	if (!left || !right) return false;
	const [leftHash, rightHash] = await Promise.all([hmac(left, 'token-comparison'), hmac(right, 'token-comparison')]);
	return leftHash === rightHash;
}

function contactEmail(submission, id, createdAt, recipient) {
	const optionalField = (label, value) => (value ? `${label}: ${value}` : null);
	const lines = [
		'Nueva solicitud desde jossuealcala.com',
		'',
		`ID: ${id}`,
		`Fecha: ${createdAt}`,
		`Nombre: ${singleLine(submission.name, 120)}`,
		`Correo: ${singleLine(submission.email, 200)}`,
		optionalField('Organizacion', singleLine(submission.organization, 160)),
		optionalField('Sitio', singleLine(submission.siteUrl, 500)),
		`Tipo de proyecto: ${singleLine(submission.projectType, 120)}`,
		optionalField('Presupuesto', singleLine(submission.budget, 120)),
		'',
		'Mensaje:',
		submission.message,
	].filter((line) => line !== null);

	return {
		to: recipient,
		from: { email: CONTACT_FROM, name: 'Portafolio Jossue Alcala' },
		replyTo: { email: submission.email, name: singleLine(submission.name, 120) },
		subject: `Nueva solicitud: ${singleLine(submission.projectType, 70)} - ${singleLine(submission.name, 70)}`,
		text: lines.join('\n'),
	};
}

async function sendContactNotification(env, submission, id, createdAt) {
	const recipient = clean(env.CONTACT_EMAIL_TO, 200);
	if (!env.CONTACT_EMAIL || !recipient) return false;

	try {
		await env.CONTACT_EMAIL.send(contactEmail(submission, id, createdAt, recipient));
		return true;
	} catch (error) {
		console.error('Contact email notification failed', {
			submissionId: id,
			name: error?.name ?? 'Error',
		});
		return false;
	}
}

function clientIp(request) {
	return request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ?? 'unknown';
}

async function handleContact(request, env, origin) {
	try {
		const fields = await parseFields(request);
		if (fields.faxNumber) return new Response(null, { status: 204 });
		const { submission, errors } = validateSubmission(fields);
		if (Object.keys(errors).length) return json(422, { ok: false, errors }, origin);

		const ipHash = await hmac(clientIp(request), env.RATE_LIMIT_SALT || 'local-development');
		const threshold = new Date(Date.now() - RATE_LIMIT_MS).toISOString();
		const recent = await env.DB.prepare('SELECT id FROM submissions WHERE ip_hash = ? AND created_at >= ? LIMIT 1')
			.bind(ipHash, threshold)
			.first();
		if (recent) return json(429, { ok: false, error: 'Please wait before submitting again' }, origin);

		const id = crypto.randomUUID();
		const createdAt = new Date().toISOString();
		await env.DB.prepare(
			`INSERT INTO submissions
			(id, created_at, name, email, organization, site_url, project_type, budget, message, consent, ip_hash)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
		)
			.bind(
				id,
				createdAt,
				submission.name,
				submission.email,
				submission.organization,
				submission.siteUrl,
				submission.projectType,
				submission.budget,
				submission.message,
				ipHash,
			)
			.run();
		const notified = await sendContactNotification(env, submission, id, createdAt);
		return json(201, { ok: true, id, notified }, origin);
	} catch (error) {
		const status = Number(error?.status) || 500;
		return json(status, { ok: false, error: status === 500 ? 'Unable to store submission' : error.message }, origin);
	}
}

async function handleSubmissions(request, env, origin) {
	const authorization = request.headers.get('Authorization') ?? '';
	const providedToken = authorization.replace(/^Bearer\s+/i, '');
	if (!env.ADMIN_TOKEN || !(await safeEqual(providedToken, env.ADMIN_TOKEN))) {
		return json(401, { ok: false, error: 'Unauthorized' }, origin);
	}

	const url = new URL(request.url);
	const limit = Math.min(Math.max(Number(url.searchParams.get('limit') ?? 50) || 50, 1), 100);
	const offset = Math.max(Number(url.searchParams.get('offset') ?? 0) || 0, 0);
	try {
		const [count, page] = await Promise.all([
			env.DB.prepare('SELECT COUNT(*) AS total FROM submissions').first(),
			env.DB.prepare(
				`SELECT id, created_at AS createdAt, name, email, organization, site_url AS siteUrl,
				project_type AS projectType, budget, message
				FROM submissions ORDER BY created_at DESC LIMIT ? OFFSET ?`,
			)
				.bind(limit, offset)
				.all(),
		]);
		return json(200, { ok: true, total: Number(count?.total ?? 0), limit, offset, submissions: page.results ?? [] }, origin);
	} catch {
		return json(500, { ok: false, error: 'Unable to read submissions' }, origin);
	}
}

export async function handleRequest(request, env) {
	const url = new URL(request.url);
	if (url.pathname === '/' && (request.method === 'GET' || request.method === 'HEAD')) {
		return localeRedirect(request, url);
	}
	const legacyBlog = url.pathname.match(/^\/(es|en)\/blog(?:\/(.*))?\/?$/);
	if (legacyBlog) {
		const [, locale, tail = ''] = legacyBlog;
		return Response.redirect(`https://blog.jossuealcala.com/${locale}/${tail}`, 301);
	}
	const origin = requestOrigin(request, env);
	if (origin === false) return json(403, { ok: false, error: 'Origin not allowed' });

	if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
		const response = json(204, {}, origin);
		response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		return response;
	}
	if (url.pathname === '/healthz' && request.method === 'GET') {
		return json(
			200,
			{
				ok: true,
				service: 'portfolio-worker',
				queryEnabled: Boolean(env.ADMIN_TOKEN),
				notificationEnabled: Boolean(env.CONTACT_EMAIL && env.CONTACT_EMAIL_TO),
			},
			origin,
		);
	}
	if (url.pathname === '/api/contact' && request.method === 'POST') return handleContact(request, env, origin);
	if (url.pathname === '/api/submissions' && request.method === 'GET') return handleSubmissions(request, env, origin);
	if (url.pathname.startsWith('/api/')) return json(404, { ok: false, error: 'Not found' }, origin);
	return env.ASSETS.fetch(request);
}

export default { fetch: handleRequest };

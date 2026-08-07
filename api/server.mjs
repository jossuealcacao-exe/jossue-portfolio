import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DEFAULT_PORT = 8787;
const MAX_BODY_BYTES = 64 * 1024;
const RATE_LIMIT_MS = 60_000;

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function asList(value, fallback) {
	const values = String(value ?? '')
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean);
	return values.length ? values : fallback;
}

function safeEqual(left, right) {
	if (!left || !right) return false;
	const a = Buffer.from(left);
	const b = Buffer.from(right);
	return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function sendJson(response, status, payload, origin) {
	response.writeHead(status, {
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Origin': origin ?? 'null',
		'Content-Type': 'application/json; charset=utf-8',
		'Cache-Control': 'no-store',
		'Vary': 'Origin',
	});
	response.end(JSON.stringify(payload));
}

async function readBody(request) {
	const chunks = [];
	let size = 0;
	for await (const chunk of request) {
		size += chunk.length;
		if (size > MAX_BODY_BYTES) throw Object.assign(new Error('Request body too large'), { status: 413 });
		chunks.push(chunk);
	}
	return Buffer.concat(chunks);
}

function parseMultipart(body, contentType) {
	const boundaryMatch = contentType.match(/boundary="?([^";]+)"?/i);
	if (!boundaryMatch) throw Object.assign(new Error('Missing multipart boundary'), { status: 400 });
	const boundary = `--${boundaryMatch[1]}`;
	const text = body.toString('utf8');
	const fields = {};
	for (const part of text.split(boundary).slice(1)) {
		if (part === '--' || part === '--\r\n' || !part.trim()) continue;
		const headerEnd = part.indexOf('\r\n\r\n');
		if (headerEnd < 0) continue;
		const headers = part.slice(0, headerEnd);
		const name = headers.match(/name="([^"]+)"/i)?.[1];
		if (!name) continue;
		fields[name] = part.slice(headerEnd + 4).replace(/\r\n$/, '');
	}
	return fields;
}

function parseFields(body, contentType = '') {
	if (contentType.includes('application/json')) {
		try {
			const parsed = JSON.parse(body.toString('utf8'));
			return parsed && typeof parsed === 'object' ? parsed : {};
		} catch {
			throw Object.assign(new Error('Invalid JSON body'), { status: 400 });
		}
	}
	if (contentType.includes('multipart/form-data')) return parseMultipart(body, contentType);
	return Object.fromEntries(new URLSearchParams(body.toString('utf8')));
}

function clean(value, maxLength) {
	return String(value ?? '').trim().slice(0, maxLength);
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

async function readStore(dataFile) {
	try {
		const parsed = JSON.parse(await fs.readFile(dataFile, 'utf8'));
		return { version: 1, submissions: Array.isArray(parsed.submissions) ? parsed.submissions : [] };
	} catch (error) {
		if (error.code !== 'ENOENT') throw error;
		return { version: 1, submissions: [] };
	}
}

async function writeStore(dataFile, store) {
	await fs.mkdir(path.dirname(dataFile), { recursive: true });
	const tempFile = `${dataFile}.${process.pid}.tmp`;
	await fs.writeFile(tempFile, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
	await fs.rename(tempFile, dataFile);
}

function getOrigin(request, allowedOrigins) {
	const origin = request.headers.origin;
	return origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0] ?? 'null';
}

export function createContactServer(options = {}) {
	const dataFile = options.dataFile ?? process.env.CONTACT_DATA_FILE ?? path.join(projectRoot, 'api', 'data', 'submissions.json');
	const adminToken = options.adminToken ?? process.env.CONTACT_ADMIN_TOKEN ?? '';
	const allowedOrigins = options.allowedOrigins ?? asList(process.env.CONTACT_ALLOWED_ORIGINS, [
		'http://localhost:4321',
		'http://127.0.0.1:4321',
		'http://192.168.100.110:4321',
	]);
	const recentSubmissions = new Map();

	return http.createServer(async (request, response) => {
		const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
		const origin = getOrigin(request, allowedOrigins);

		if (request.method === 'OPTIONS') return sendJson(response, 204, {}, origin);
		if (url.pathname === '/healthz' && request.method === 'GET') {
			return sendJson(response, 200, { ok: true, service: 'contact-api', queryEnabled: Boolean(adminToken) }, origin);
		}

		if (url.pathname === '/api/contact' && request.method === 'POST') {
			const ip = String(request.headers['x-forwarded-for'] ?? request.socket.remoteAddress ?? 'unknown').split(',')[0].trim();
			const lastSubmission = recentSubmissions.get(ip) ?? 0;
			if (Date.now() - lastSubmission < RATE_LIMIT_MS) {
				return sendJson(response, 429, { ok: false, error: 'Please wait before submitting again' }, origin);
			}
			try {
				const body = await readBody(request);
				const fields = parseFields(body, String(request.headers['content-type'] ?? ''));
				if (fields.faxNumber) return sendJson(response, 204, {}, origin);
				const { submission, errors } = validateSubmission(fields);
				if (Object.keys(errors).length) return sendJson(response, 422, { ok: false, errors }, origin);
				const store = await readStore(dataFile);
				const record = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...submission };
				store.submissions.push(record);
				await writeStore(dataFile, store);
				recentSubmissions.set(ip, Date.now());
				return sendJson(response, 201, { ok: true, id: record.id }, origin);
			} catch (error) {
				const status = error.status ?? 500;
				return sendJson(response, status, { ok: false, error: status === 500 ? 'Unable to store submission' : error.message }, origin);
			}
		}

		if (url.pathname === '/api/submissions' && request.method === 'GET') {
			const authorization = String(request.headers.authorization ?? '');
			if (!adminToken || !safeEqual(authorization.replace(/^Bearer\s+/i, ''), adminToken)) {
				return sendJson(response, 401, { ok: false, error: 'Unauthorized' }, origin);
			}
			try {
				const store = await readStore(dataFile);
				const limit = Math.min(Math.max(Number(url.searchParams.get('limit') ?? 50) || 50, 1), 100);
				const offset = Math.max(Number(url.searchParams.get('offset') ?? 0) || 0, 0);
				const submissions = store.submissions.slice().reverse().slice(offset, offset + limit);
				return sendJson(response, 200, { ok: true, total: store.submissions.length, limit, offset, submissions }, origin);
			} catch {
				return sendJson(response, 500, { ok: false, error: 'Unable to read submissions' }, origin);
			}
		}

		return sendJson(response, 404, { ok: false, error: 'Not found' }, origin);
	});
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	const port = Number(process.env.CONTACT_API_PORT ?? DEFAULT_PORT);
	const host = process.env.CONTACT_API_HOST ?? '0.0.0.0';
	const server = createContactServer();
	server.listen(port, host, () => {
		console.log(`Contact API listening on http://${host}:${port}`);
		console.log(`Storage: ${process.env.CONTACT_DATA_FILE ?? path.join('api', 'data', 'submissions.json')}`);
	});
}

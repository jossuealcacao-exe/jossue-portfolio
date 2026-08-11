import assert from 'node:assert/strict';
import test from 'node:test';
import { handleRequest } from './index.mjs';

function fakeDatabase() {
	const rows = [];
	return {
		rows,
		prepare(sql) {
			let params = [];
			return {
				bind(...values) {
					params = values;
					return this;
				},
				async first() {
					if (sql.startsWith('SELECT id')) return rows.find((row) => row.ipHash === params[0] && row.createdAt >= params[1]) ?? null;
					if (sql.startsWith('SELECT COUNT')) return { total: rows.length };
					return null;
				},
				async all() {
					return { results: rows.slice().reverse().slice(params[1], params[1] + params[0]) };
				},
				async run() {
					rows.push({
						id: params[0],
						createdAt: params[1],
						name: params[2],
						email: params[3],
						organization: params[4],
						siteUrl: params[5],
						projectType: params[6],
						budget: params[7],
						message: params[8],
						ipHash: params[9],
					});
					return { success: true };
				},
			};
		},
	};
}

function environment() {
	const emails = [];
	const assetRequests = [];
	return {
		DB: fakeDatabase(),
		emails,
		assetRequests,
		CONTACT_EMAIL_TO: 'owner@example.com',
		CONTACT_EMAIL: {
			async send(message) {
				emails.push(message);
			},
		},
		ADMIN_TOKEN: 'test-admin-token',
		RATE_LIMIT_SALT: 'test-rate-limit-salt',
		ALLOWED_ORIGINS: 'https://jossuealcala.com',
		ASSETS: {
			fetch: async (request) => {
				assetRequests.push(request);
				return new Response('asset');
			},
		},
	};
}

function validForm() {
	return new URLSearchParams({
		name: 'María Fernanda Ruiz',
		email: 'maria@example.com',
		organization: 'Tienda Prueba',
		projectType: 'Mejorar conversión (UX/CRO)',
		budget: '$50,000 – $120,000 MXN',
		message: 'El carrito abandona mucho en móvil y necesitamos entender por qué.',
		consent: 'yes',
	});
}

test('redirects the root directly to the preferred canonical locale', async () => {
	const cases = [
		{ language: 'en-US,en;q=0.9,es;q=0.8', expected: 'https://jossuealcala.com/en/?utm_source=test' },
		{ language: 'fr-FR,es-MX;q=0.9,en;q=0.8', expected: 'https://jossuealcala.com/es/?utm_source=test' },
		{ language: null, expected: 'https://jossuealcala.com/es/?utm_source=test' },
	];

	for (const { language, expected } of cases) {
		const env = environment();
		const headers = language ? { 'Accept-Language': language } : undefined;
		const response = await handleRequest(
			new Request('https://www.jossuealcala.com/?utm_source=test', { headers, redirect: 'manual' }),
			env,
		);
		assert.equal(response.status, 302);
		assert.equal(response.headers.get('Location'), expected);
		assert.equal(response.headers.get('Vary'), 'Accept-Language');
		assert.match(response.headers.get('Cache-Control'), /no-store/);
		assert.equal(env.assetRequests.length, 0);
	}
});

test('stores a valid contact and exposes it only with the admin token', async () => {
	const env = environment();
	const response = await handleRequest(
		new Request('https://jossuealcala.com/api/contact', {
			method: 'POST',
			headers: { Origin: 'https://jossuealcala.com' },
			body: validForm(),
		}),
		env,
	);
	assert.equal(response.status, 201);
	assert.deepEqual(await response.json(), { ok: true, id: env.DB.rows[0].id, notified: true });
	assert.equal(env.DB.rows.length, 1);
	assert.equal(env.emails.length, 1);
	assert.equal(env.emails[0].to, 'owner@example.com');
	assert.equal(env.emails[0].from.email, 'hola@jossuealcala.com');
	assert.equal(env.emails[0].replyTo.email, 'maria@example.com');
	assert.match(env.emails[0].text, /El carrito abandona mucho/);

	assert.equal((await handleRequest(new Request('https://jossuealcala.com/api/submissions'), env)).status, 401);
	const query = await handleRequest(
		new Request('https://jossuealcala.com/api/submissions', { headers: { Authorization: 'Bearer test-admin-token' } }),
		env,
	);
	const result = await query.json();
	assert.equal(query.status, 200);
	assert.equal(result.total, 1);
	assert.equal(result.submissions[0].email, 'maria@example.com');
});

test('keeps the stored submission when the email notification fails', async () => {
	const env = environment();
	env.CONTACT_EMAIL.send = async () => {
		throw new Error('Email provider unavailable');
	};
	const originalConsoleError = console.error;
	console.error = () => {};
	try {
		const response = await handleRequest(
			new Request('https://jossuealcala.com/api/contact', {
				method: 'POST',
				headers: { Origin: 'https://jossuealcala.com' },
				body: validForm(),
			}),
			env,
		);
		assert.equal(response.status, 201);
		assert.equal(env.DB.rows.length, 1);
		assert.equal((await response.json()).notified, false);
	} finally {
		console.error = originalConsoleError;
	}
});

test('rejects invalid origins, invalid fields and repeated submissions', async () => {
	const env = environment();
	const forbidden = await handleRequest(
		new Request('https://jossuealcala.com/api/contact', {
			method: 'POST',
			headers: { Origin: 'https://example.com' },
			body: validForm(),
		}),
		env,
	);
	assert.equal(forbidden.status, 403);

	const invalid = await handleRequest(
		new Request('https://jossuealcala.com/api/contact', {
			method: 'POST',
			headers: { Origin: 'https://jossuealcala.com' },
			body: new URLSearchParams({ name: 'A', email: 'invalid', message: 'short' }),
		}),
		env,
	);
	assert.equal(invalid.status, 422);

	const first = await handleRequest(
		new Request('https://jossuealcala.com/api/contact', {
			method: 'POST',
			headers: { Origin: 'https://jossuealcala.com', 'CF-Connecting-IP': '203.0.113.5' },
			body: validForm(),
		}),
		env,
	);
	assert.equal(first.status, 201);
	const repeated = await handleRequest(
		new Request('https://jossuealcala.com/api/contact', {
			method: 'POST',
			headers: { Origin: 'https://jossuealcala.com', 'CF-Connecting-IP': '203.0.113.5' },
			body: validForm(),
		}),
		env,
	);
	assert.equal(repeated.status, 429);
});

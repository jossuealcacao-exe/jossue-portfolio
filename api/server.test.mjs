import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createContactServer } from './server.mjs';

async function withServer(callback) {
	const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'jossue-contact-api-'));
	const dataFile = path.join(directory, 'submissions.json');
	const server = createContactServer({ dataFile, adminToken: 'test-admin-token', allowedOrigins: ['http://localhost:4321'] });
	await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
	const address = server.address();
	try {
		return await callback(`http://127.0.0.1:${address.port}`);
	} finally {
		await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
		await fs.rm(directory, { recursive: true, force: true });
	}
}

test('accepts a valid form and protects the submissions query', async () => {
	await withServer(async (baseUrl) => {
		const form = new FormData();
		form.set('name', 'María Fernanda Ruiz');
		form.set('email', 'maria@example.com');
		form.set('organization', 'Tienda Prueba');
		form.set('projectType', 'Mejorar conversión (UX/CRO)');
		form.set('budget', '$50,000 – $120,000 MXN');
		form.set('message', 'El carrito abandona mucho en móvil y necesitamos entender por qué.');
		form.set('consent', 'yes');
		const response = await fetch(`${baseUrl}/api/contact`, {
			method: 'POST',
			headers: { Origin: 'http://localhost:4321' },
			body: form,
		});
		assert.equal(response.status, 201);
		assert.equal((await response.json()).ok, true);

		assert.equal((await fetch(`${baseUrl}/api/submissions`)).status, 401);
		const query = await fetch(`${baseUrl}/api/submissions`, { headers: { Authorization: 'Bearer test-admin-token' } });
		const result = await query.json();
		assert.equal(query.status, 200);
		assert.equal(result.total, 1);
		assert.equal(result.submissions[0].email, 'maria@example.com');
	});
});

test('rejects invalid submissions before storage', async () => {
	await withServer(async (baseUrl) => {
		const response = await fetch(`${baseUrl}/api/contact`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ name: 'A', email: 'invalid', message: 'short' }),
		});
		assert.equal(response.status, 422);
		assert.deepEqual(Object.keys((await response.json()).errors).sort(), ['consent', 'email', 'message', 'projectType']);
	});
});

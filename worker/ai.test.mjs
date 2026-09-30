import assert from 'node:assert/strict';
import test from 'node:test';
import { resetKnowledgeCache, redactPII } from './ai.mjs';
import { handleRequest } from './index.mjs';

const ORIGIN = 'https://jossuealcala.com';

function aiDatabase() {
	const messages = [];
	const leads = [];
	const statement = (sql) => {
		let params = [];
		return {
			bind(...values) {
				params = values;
				return this;
			},
			async first() {
				if (sql.includes('COUNT(*)') && sql.includes('ai_messages')) {
					return { total: messages.filter((row) => row.ipHash === params[0] && row.ts >= params[1] && row.role === 'user').length };
				}
				return null;
			},
			async all() {
				if (sql.includes('FROM ai_messages')) return { results: messages.map((row) => ({ ...row })) };
				if (sql.includes('FROM ai_leads')) return { results: leads.map((row) => ({ ...row })) };
				return { results: [] };
			},
			async run() {
				if (sql.startsWith('INSERT INTO ai_messages')) {
					const role = sql.includes("'user'") ? 'user' : 'assistant';
					messages.push({ sid: params[0], ts: params[1], role, text: params[2], ipHash: params[3], locale: params[4], page: params[5] });
				} else if (sql.startsWith('INSERT INTO ai_leads')) {
					const [id, createdAt, sid, locale, page, name, email, phone, company, need, message] = params;
					leads.push({ id, createdAt, sid, locale, page, name, email, phone, company, need, message });
				} else if (sql.startsWith('DELETE FROM ai_messages WHERE sid')) {
					for (let index = messages.length - 1; index >= 0; index -= 1) if (messages[index].sid === params[0]) messages.splice(index, 1);
				}
				return { success: true };
			},
		};
	};
	return {
		messages,
		leads,
		prepare: statement,
		async batch(statements) {
			for (const item of statements) await item.run();
		},
	};
}

function environment(overrides = {}) {
	const emails = [];
	return {
		DB: aiDatabase(),
		emails,
		GEMINI_API_KEY: 'test-key',
		RATE_LIMIT_SALT: 'salt',
		ADMIN_TOKEN: 'admin-token',
		ALLOWED_ORIGINS: ORIGIN,
		CONTACT_EMAIL_TO: 'owner@example.com',
		CONTACT_EMAIL: {
			async send(message) {
				emails.push(message);
			},
		},
		ASSETS: {
			fetch: async (request) =>
				new URL(request.url).pathname === '/ai/knowledge.json'
					? Response.json({ es: 'CONOCIMIENTO-ES: Jossué dirige WU Nutrition.', en: 'KNOWLEDGE-EN' })
					: new Response('asset'),
		},
		...overrides,
	};
}

function mockGemini(payload) {
	const calls = [];
	const original = globalThis.fetch;
	globalThis.fetch = async (url, init) => {
		calls.push({ url: String(url), init, body: JSON.parse(init.body) });
		return Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(payload) }] } }] });
	};
	return { calls, restore: () => (globalThis.fetch = original) };
}

function ask(env, messages, extra = {}) {
	return handleRequest(
		new Request(`${ORIGIN}/api/ai`, {
			method: 'POST',
			headers: { Origin: ORIGIN, 'Content-Type': 'application/json', 'CF-Connecting-IP': '203.0.113.9' },
			body: JSON.stringify({ sid: 'abc123', locale: 'es', page: '/es/', messages, ...extra }),
		}),
		env,
	);
}

test.beforeEach(() => resetKnowledgeCache());

test('answers with the site knowledge and stores the turn without personal data', async () => {
	const env = environment();
	const gemini = mockGemini({ reply: 'Jossué dirige el ecommerce de WU Nutrition.', suggestions: ['¿Qué construyó?'], action: 'page', page: 'https://jossuealcala.com/es/madre/' });
	try {
		const response = await ask(env, [{ role: 'user', content: 'Hola, soy ana@example.com, ¿qué hace Jossué?' }]);
		assert.equal(response.status, 200);
		const body = await response.json();
		assert.equal(body.reply, 'Jossué dirige el ecommerce de WU Nutrition.');
		assert.deepEqual(body.suggestions, ['¿Qué construyó?']);
		assert.equal(body.action, 'page');
		assert.equal(body.page, '/es/madre/');
		assert.equal(body.leadSaved, false);

		assert.equal(gemini.calls.length, 1);
		assert.match(gemini.calls[0].url, /models\/gemini-[\w.-]+:generateContent$/);
		assert.equal(gemini.calls[0].init.headers['x-goog-api-key'], 'test-key');
		assert.match(gemini.calls[0].body.systemInstruction.parts[0].text, /CONOCIMIENTO-ES/);
		// La persona de Jossué viaja completa: voz, límites de privacidad y ejemplos.
		const system = gemini.calls[0].body.systemInstruction.parts[0].text;
		for (const rule of ['JOSSUE AI // PERSONA', 'Eres una IA', 'Nunca sacrifiques precisión', 'LinkedIn hubiera cobrado conciencia', 'EJEMPLOS DE TONO', 'keep_private'.replace('keep_private', 'Información privada')]) assert.ok(system.includes(rule), `falta en el prompt: ${rule}`);
		assert.equal(gemini.calls[0].body.contents.at(-1).role, 'user');

		assert.equal(env.DB.messages.length, 2);
		assert.match(env.DB.messages[0].text, /\[correo\]/);
		assert.doesNotMatch(env.DB.messages[0].text, /ana@example\.com/);
	} finally {
		gemini.restore();
	}
});

test('turns a volunteered contact into a lead and an email for Jossué', async () => {
	const env = environment();
	const gemini = mockGemini({
		reply: 'Listo, Jossué te escribe en menos de un día hábil.',
		suggestions: [],
		action: 'none',
		lead: { ready: true, name: 'Ana', email: 'ana@example.com', need: 'Rediseñar su tienda Shopify', message: 'Mi tienda se ve vieja y en celular casi nadie compra.' },
	});
	try {
		const response = await ask(env, [
			{ role: 'user', content: 'Quiero rediseñar mi tienda' },
			{ role: 'assistant', content: '¿Me dejas tu correo?' },
			{ role: 'user', content: 'Claro, ana@example.com, que me contacte' },
		]);
		const body = await response.json();
		assert.equal(body.leadSaved, true);
		assert.equal(env.DB.leads.length, 1);
		assert.equal(env.DB.leads[0].email, 'ana@example.com');
		assert.equal(env.emails.length, 1);
		assert.equal(env.emails[0].replyTo.email, 'ana@example.com');
		assert.match(env.emails[0].text, /Rediseñar su tienda Shopify/);
		assert.match(env.emails[0].text, /Mensaje:\nMi tienda se ve vieja/);
		assert.match(env.emails[0].subject, /mensaje de Ana/);
		assert.equal(env.DB.leads[0].message, 'Mi tienda se ve vieja y en celular casi nadie compra.');
		assert.doesNotMatch(env.emails[0].text.split('Conversación')[1], /ana@example\.com/);
	} finally {
		gemini.restore();
	}
});

test('ignores a lead without a real email or phone and links outside the site', async () => {
	const env = environment();
	const gemini = mockGemini({ reply: 'Claro.', suggestions: [], action: 'page', page: 'https://evil.example/', lead: { ready: true, email: 'no-es-correo' } });
	try {
		const body = await (await ask(env, [{ role: 'user', content: 'Hola' }])).json();
		assert.equal(body.action, 'none');
		assert.equal(body.page, null);
		assert.equal(body.leadSaved, false);
		assert.equal(env.emails.length, 0);
	} finally {
		gemini.restore();
	}
});

test('refuses bad input, missing key and floods', async () => {
	const invalid = await ask(environment(), [{ role: 'assistant', content: 'Hola' }]);
	assert.equal(invalid.status, 400);

	const noKey = await ask(environment({ GEMINI_API_KEY: undefined }), [{ role: 'user', content: 'Hola' }]);
	assert.equal(noKey.status, 503);

	const env = environment();
	const gemini = mockGemini({ reply: 'Hola.', suggestions: [], action: 'none' });
	try {
		let last;
		for (let index = 0; index < 25; index += 1) last = await ask(env, [{ role: 'user', content: `Pregunta ${index}` }], { sid: `s${index}` });
		assert.equal(last.status, 429);
		assert.equal(gemini.calls.length, 24);
	} finally {
		gemini.restore();
	}
});

test('conversations are readable only with the admin token', async () => {
	const env = environment();
	const denied = await handleRequest(new Request(`${ORIGIN}/api/ai/chats`, { headers: { Origin: ORIGIN } }), env);
	assert.equal(denied.status, 401);
	const allowed = await handleRequest(new Request(`${ORIGIN}/api/ai/chats`, { headers: { Origin: ORIGIN, Authorization: 'Bearer admin-token' } }), env);
	assert.equal(allowed.status, 200);
	assert.deepEqual((await allowed.json()).leads, []);
});

test('redacts emails and Mexican phone formats', () => {
	assert.equal(redactPII('escríbeme a ana.r+1@correo.mx o al 33 1632 6710'), 'escríbeme a [correo] o al [tel]');
	assert.equal(redactPII('pedido 45821'), 'pedido 45821');
});

test('a passing Gemini failure is retried once with the fallback model', async () => {
	const env = environment({ JOSSUE_AI_RETRY_MS: 0 });
	const calls = [];
	const original = globalThis.fetch;
	globalThis.fetch = async (url) => {
		calls.push(String(url));
		if (calls.length === 1) return new Response('{"error":{"code":503,"message":"The model is overloaded."}}', { status: 503 });
		return Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text: JSON.stringify({ reply: 'Aquí sigo.', suggestions: [], action: 'none' }) }] } }] });
	};
	try {
		const response = await ask(env, [{ role: 'user', content: '¿Qué es MADRE?' }]);
		assert.equal(response.status, 200);
		assert.equal((await response.json()).reply, 'Aquí sigo.');
		assert.equal(calls.length, 2);
		assert.match(calls[0], /gemini-3\.5-flash:generateContent$/);
		assert.match(calls[1], /gemini-2\.5-flash:generateContent$/);
	} finally {
		globalThis.fetch = original;
	}
});

test('a request Gemini rejects is not retried', async () => {
	const env = environment({ JOSSUE_AI_RETRY_MS: 0 });
	let calls = 0;
	const original = globalThis.fetch;
	globalThis.fetch = async () => { calls += 1; return new Response('{"error":{"code":400}}', { status: 400 }); };
	try {
		const response = await ask(env, [{ role: 'user', content: '¿Qué es MADRE?' }]);
		assert.equal(response.status, 502);
		assert.equal(calls, 1);
	} finally {
		globalThis.fetch = original;
	}
});

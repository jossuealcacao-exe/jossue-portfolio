import type { APIRoute } from 'astro';

// Buscadores y asistentes de IA pueden leer y citar el sitio: es un portafolio público y se
// quiere que aparezca en respuestas de ChatGPT, Claude, Perplexity, Gemini y Copilot (GEO).
// Solo se cierran los endpoints de la API.
const AI_AGENTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot'];

export const GET: APIRoute = ({ site }) => {
	const origin = site ?? new URL('https://portfolio.invalid');
	const isConfigured = !origin.hostname.endsWith('.invalid');
	const body = isConfigured
		? [
				'User-agent: *',
				'Allow: /',
				'Disallow: /api/',
				'',
				...AI_AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', 'Disallow: /api/', '']),
				`Sitemap: ${new URL('sitemap-index.xml', origin).href}`,
				`# Resumen para modelos de lenguaje: ${new URL('llms.txt', origin).href}`,
				`# Versión completa: ${new URL('llms-full.txt', origin).href}`,
			].join('\n')
		: 'User-agent: *\nDisallow: /';

	return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

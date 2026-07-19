import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const origin = site ?? new URL('https://portfolio.invalid');
	const isConfigured = !origin.hostname.endsWith('.invalid');
	const policy = isConfigured
		? `Allow: /\nSitemap: ${new URL('sitemap-index.xml', origin).href}`
		: 'Disallow: /';

	return new Response(`User-agent: *\n${policy}\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};

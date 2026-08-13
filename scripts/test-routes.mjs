import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const caseSlugs = [
	'wu-nutrition',
	'bloqio-cro-apps',
	'bloqio-builder',
	'la-carniceria-virtual',
	'come-verde',
	'miawseo',
	'vineria',
	'tiendaonline',
];
const routes = [
	'/',
	'/es/',
	'/es/trabajo/',
	...caseSlugs.map((slug) => `/es/trabajo/${slug}/`),
	'/es/servicios/',
	'/es/ia-y-sistemas/',
	'/es/acerca/',
	'/es/contacto/',
	'/es/recursos/ahp-plus/',
	'/en/',
	'/en/work/',
	...caseSlugs.map((slug) => `/en/work/${slug}/`),
	'/en/services/',
	'/en/ai-and-systems/',
	'/en/about/',
	'/en/contact/',
	'/en/resources/ahp-plus/',
];

const failures = [];
const forbiddenPublicClaims = [
	'57+',
	'57 usuarios',
	'57 users',
	'45 páginas',
	'45 pages',
	'↑ CR',
	'DUMO',
	'Resultados documentados en el CV',
	'Implementación revisada',
	'Implementation reviewed',
	'Revisión parcial',
	'Partial review',
	'Verificación pendiente',
	'Verification pending',
	'Plan de evidencia visual',
	'Visual evidence plan',
	'Capturas pendientes de producción',
	'Captures pending production',
	'Fuente de captura',
	'Capture source',
	'Auditoría 360',
	'360 audit',
	'evidencia de UX/CRO',
	'UX/CRO evidence',
];
for (const route of routes) {
	const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
	try {
		await access(file);
		const html = await readFile(file, 'utf8');
		for (const claim of forbiddenPublicClaims) {
			if (html.includes(claim)) failures.push(`Restricted claim "${claim}" found in ${route}.`);
		}
	} catch {
		failures.push(`Missing ${route} (${path.relative(root, file)})`);
	}
}

for (const asset of ['robots.txt', 'sitemap-index.xml', 'llms.txt']) {
	try {
		await access(path.join(dist, asset));
	} catch {
		failures.push(`Missing /${asset}`);
	}
}

try {
	const sitemap = await readFile(path.join(dist, 'sitemap-0.xml'), 'utf8');
	const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
	if (sitemapUrls.some((url) => new URL(url).pathname === '/')) {
		failures.push('The negotiated root URL must not be listed in the sitemap.');
	}
} catch {
	failures.push('Unable to inspect sitemap-0.xml.');
}

const rootHtml = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!rootHtml.includes('/es/')) failures.push('Root redirect does not point to /es/.');
const homeHtml = await readFile(path.join(dist, 'es', 'index.html'), 'utf8');
const caseHtml = await readFile(path.join(dist, 'es', 'trabajo', 'ahp-plus', 'index.html'), 'utf8');
const atlasEsHtml = await readFile(path.join(dist, 'es', 'recursos', 'ahp-plus', 'index.html'), 'utf8');
const atlasEnHtml = await readFile(path.join(dist, 'en', 'resources', 'ahp-plus', 'index.html'), 'utf8');
if (!caseHtml.includes('"@type":"CreativeWork"')) failures.push('Case studies must expose CreativeWork structured data.');
if (!caseHtml.includes('AHP+ 1.1.0') || !caseHtml.includes('Producto open source')) failures.push('AHP+ case must present the independent 1.1.0 product.');
if (caseHtml.includes('AHP+ 1.0') || caseHtml.includes('Producto propio / Pangea OS')) failures.push('AHP+ case still contains superseded 1.0 positioning.');
if (!caseHtml.includes('https://github.com/jossuealcacao-exe/ahp_plus') || !caseHtml.includes('https://www.npmjs.com/package/@jossuealcala/ahp-plus')) failures.push('AHP+ case must expose official GitHub and npm links.');
if (!atlasEsHtml.includes('npx ahp verify . --strict') || !atlasEsHtml.includes('data-ahp-command')) failures.push('Spanish AHP+ atlas must expose the CLI catalog in static HTML.');
if (!atlasEnHtml.includes('Commands by platform') || !atlasEnHtml.includes('/ahp verify strict')) failures.push('English AHP+ atlas must expose platform chat commands.');
if (!atlasEsHtml.includes('/en/resources/ahp-plus/')) failures.push('Spanish AHP+ atlas must link to its English equivalent.');
if (!homeHtml.includes('<meta name="google-adsense-account" content="ca-pub-5612202849073748">')) {
	failures.push('Home must expose the AdSense ownership verification meta tag.');
}
if (process.env.PUBLIC_GA4_ID) {
	if (!homeHtml.includes(`data-ga4-configured="true"`) || !homeHtml.includes(process.env.PUBLIC_GA4_ID)) {
		failures.push('Production build does not contain the configured GA4 measurement ID.');
	}
	if (!homeHtml.includes('push(arguments)')) {
		failures.push('GA4 must enqueue command arguments using the gtag.js transport contract.');
	}
}
const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
const adsTxt = await readFile(path.join(dist, 'ads.txt'), 'utf8');
if (!adsTxt.includes('google.com, pub-5612202849073748, DIRECT, f08c47fec0942fa0')) {
	failures.push('ads.txt does not contain the configured AdSense publisher.');
}
if (!process.env.PUBLIC_SITE_URL && !robots.includes('Disallow: /')) {
	failures.push('Unconfigured builds must block indexing in robots.txt.');
}

if (failures.length) {
	console.error(failures.join('\n'));
	process.exitCode = 1;
} else {
	console.log(`Verified ${routes.length} static routes plus robots, sitemap, and llms.txt.`);
}

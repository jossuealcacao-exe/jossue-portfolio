import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const caseSlugs = [
	'ahp-plus',
	'wu-nutrition',
	'bloqio-cro-apps',
	'bloqio-builder',
	'la-carniceria-virtual',
	'come-verde',
	'miawseo',
	'vineria',
	'tiendaonline',
];
const productSlugs = ['ahp-plus', 'bloqio-builder', 'daniela', 'miawseo', 'chatbots', 'consultoria', 'desarrollo-web', 'ia-aplicada'];
const routes = [
	'/',
	'/es/',
	'/es/trabajo/',
	...caseSlugs.map((slug) => `/es/trabajo/${slug}/`),
	'/es/productos/',
	...productSlugs.map((slug) => `/es/productos/${slug}/`),
	'/es/servicios/',
	'/es/ia-y-sistemas/',
	'/es/madre/',
	'/es/acerca/',
	'/es/contacto/',
	'/es/recursos/ahp-plus/',
	'/en/',
	'/en/work/',
	...caseSlugs.map((slug) => `/en/work/${slug}/`),
	'/en/products/',
	...productSlugs.map((slug) => `/en/products/${slug}/`),
	'/en/services/',
	'/en/ai-and-systems/',
	'/en/madre/',
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

// SEO y GEO por página: imagen para redes, descripción que cabe en el resultado y un solo h1.
for (const route of routes.filter((route) => route !== '/')) {
	const file = path.join(dist, route, 'index.html');
	const html = await readFile(file, 'utf8').catch(() => '');
	if (!html) continue;
	const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
	if (!/<meta property="og:image" content="[^"]+\.(jpg|png)"/.test(html)) failures.push(`${route} needs a JPG/PNG og:image.`);
	if (!description || description.length > 160) failures.push(`${route} description must be 1-160 characters (has ${description.length}).`);
	if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) failures.push(`${route} must have exactly one h1.`);
}

// Jossue AI: el conocimiento se genera del sitio y solo lleva información pública.
try {
	const knowledge = JSON.parse(await readFile(path.join(dist, 'ai', 'knowledge.json'), 'utf8'));
	for (const locale of ['es', 'en']) {
		const text = String(knowledge[locale] ?? '');
		if (!text.includes('MADRE') || !text.includes('Head of E-commerce') || !text.includes('/contacto/'.replace('contacto', locale === 'es' ? 'contacto' : 'contact'))) failures.push(`AI knowledge (${locale}) must cover products, profile and contact.`);
		for (const internal of ['DUMO', '57 usuarios', 'Fuentes:', 'ADMIN_TOKEN', 'GEMINI_API_KEY']) if (text.includes(internal)) failures.push(`AI knowledge (${locale}) leaks internal text: ${internal}`);
	}
} catch {
	failures.push('Missing or invalid /ai/knowledge.json');
}

for (const asset of ['robots.txt', 'sitemap-index.xml', 'llms.txt', 'llms-full.txt', 'favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'site.webmanifest']) {
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
	for (const pathname of ['/es/madre/', '/en/madre/']) {
		if (!sitemapUrls.some((url) => new URL(url).pathname === pathname)) failures.push(`Sitemap must include ${pathname}.`);
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
const madreEsHtml = await readFile(path.join(dist, 'es', 'madre', 'index.html'), 'utf8');
const madreEnHtml = await readFile(path.join(dist, 'en', 'madre', 'index.html'), 'utf8');
const productsEsHtml = await readFile(path.join(dist, 'es', 'productos', 'index.html'), 'utf8');
const aiProductEsHtml = await readFile(path.join(dist, 'es', 'productos', 'ia-aplicada', 'index.html'), 'utf8');
if (!caseHtml.includes('"@type":"CreativeWork"')) failures.push('Case studies must expose CreativeWork structured data.');
if (!caseHtml.includes('AHP+ 1.4.1') || !caseHtml.includes('Código abierto')) failures.push('AHP+ case must present the independent 1.4.1 product.');
if (caseHtml.includes('AHP+ 1.0') || caseHtml.includes('Producto propio / Pangea OS')) failures.push('AHP+ case still contains superseded 1.0 positioning.');
if (!caseHtml.includes('https://github.com/jossuealcacao-exe/ahp_plus') || !caseHtml.includes('https://www.npmjs.com/package/@jossuealcala/ahp-plus')) failures.push('AHP+ case must expose official GitHub and npm links.');
if (!atlasEsHtml.includes('npx ahp project verify . --strict') || !atlasEsHtml.includes('data-ahp-command')) failures.push('Spanish AHP+ atlas must expose the 1.4.1 CLI catalog in static HTML.');
if (!atlasEnHtml.includes('Ask in human language') || !atlasEnHtml.includes('/ahp verify strict')) failures.push('English AHP+ atlas must expose platform chat commands.');
if (!atlasEsHtml.includes('/en/resources/ahp-plus/')) failures.push('Spanish AHP+ atlas must link to its English equivalent.');
if (!madreEsHtml.includes('data-madre-page') || !madreEnHtml.includes('data-madre-page')) failures.push('MADRE pages must expose their stable page marker.');
if (!madreEsHtml.includes('/en/madre/') || !madreEnHtml.includes('/es/madre/')) failures.push('MADRE pages must link to their language equivalent.');
if (!madreEsHtml.includes('data-madre-explanatory') || !madreEnHtml.includes('data-madre-explanatory')) failures.push('MADRE conceptual demonstrations must be labeled as explanatory.');
if (!madreEsHtml.includes('npx @jossuealcala/madre start') || !madreEnHtml.includes('npx @jossuealcala/madre doctor')) failures.push('MADRE pages must expose the verified installation and doctor commands.');
if (!madreEsHtml.includes('MADRE 0.5.2') || !madreEsHtml.includes('https://github.com/jossuealcacao-exe/madre')) failures.push('MADRE page must expose the verified release and source repository.');
if (!madreEsHtml.includes('SoftwareApplication') || !madreEsHtml.includes('/images/madre/room-0.5.2.webp')) failures.push('MADRE page must expose verified software data and real product evidence.');
if (!madreEsHtml.includes('/es/contacto/') || !madreEsHtml.includes('/es/recursos/ahp-plus/')) failures.push('Spanish MADRE page must expose contact and AHP+ calls to action.');
if (!madreEnHtml.includes('/en/contact/') || !madreEnHtml.includes('/en/resources/ahp-plus/')) failures.push('English MADRE page must expose contact and AHP+ calls to action.');
if (!productsEsHtml.includes('data-product-catalog') || !productsEsHtml.includes('/es/madre/')) failures.push('Spanish product catalog must include MADRE as a product.');
if (!aiProductEsHtml.includes('data-product-detail="ia-aplicada"') || !aiProductEsHtml.includes('Soy una IA y respondo con lo que Jossué publica')) failures.push('Applied AI product must render with the Jossue AI disclosure.');
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

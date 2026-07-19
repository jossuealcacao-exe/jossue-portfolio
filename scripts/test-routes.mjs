import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const caseSlugs = ['wu-nutrition-dumo', 'bloqio-cro-apps', 'bloqio-builder', 'la-carniceria-virtual', 'come-verde'];
const routes = [
	'/',
	'/es/',
	'/es/trabajo/',
	...caseSlugs.map((slug) => `/es/trabajo/${slug}/`),
	'/es/servicios/',
	'/es/ia-y-sistemas/',
	'/es/acerca/',
	'/es/contacto/',
	'/en/',
	'/en/work/',
	...caseSlugs.map((slug) => `/en/work/${slug}/`),
	'/en/services/',
	'/en/ai-and-systems/',
	'/en/about/',
	'/en/contact/',
];

const failures = [];
for (const route of routes) {
	const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
	try {
		await access(file);
	} catch {
		failures.push(`Missing ${route} (${path.relative(root, file)})`);
	}
}

for (const asset of ['robots.txt', 'sitemap-index.xml']) {
	try {
		await access(path.join(dist, asset));
	} catch {
		failures.push(`Missing /${asset}`);
	}
}

const rootHtml = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!rootHtml.includes('/es/')) failures.push('Root redirect does not point to /es/.');
const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
if (!process.env.PUBLIC_SITE_URL && !robots.includes('Disallow: /')) {
	failures.push('Unconfigured builds must block indexing in robots.txt.');
}

if (failures.length) {
	console.error(failures.join('\n'));
	process.exitCode = 1;
} else {
	console.log(`Verified ${routes.length} static routes plus robots and sitemap.`);
}

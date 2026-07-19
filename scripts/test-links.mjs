import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.join(process.cwd(), 'dist');

async function collectHtml(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const target = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await collectHtml(target)));
		else if (entry.name.endsWith('.html')) files.push(target);
	}
	return files;
}

function localTarget(href) {
	if (!href.startsWith('/') || href.startsWith('//')) return null;
	const pathname = new URL(href, 'https://portfolio.invalid').pathname;
	if (path.extname(pathname)) return path.join(dist, pathname);
	return path.join(dist, pathname, 'index.html');
}

const htmlFiles = await collectHtml(dist);
const failures = [];
let checked = 0;

for (const htmlFile of htmlFiles) {
	const html = await readFile(htmlFile, 'utf8');
	for (const match of html.matchAll(/\shref="([^"]+)"/g)) {
		const href = match[1];
		const target = localTarget(href);
		if (!target) continue;
		checked += 1;
		try {
			await access(target);
		} catch {
			failures.push(`${path.relative(dist, htmlFile)} → ${href}`);
		}
	}
}

if (failures.length) {
	console.error(`Broken local links:\n${failures.join('\n')}`);
	process.exitCode = 1;
} else {
	console.log(`Verified ${checked} local links across ${htmlFiles.length} HTML files.`);
}

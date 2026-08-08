import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const contentRoot = path.join(process.cwd(), 'src', 'content', 'blog');
const failures = [];
const identities = new Set();

async function markdownFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const target = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await markdownFiles(target)));
		else if (/\.(md|mdoc)$/.test(entry.name)) files.push(target);
	}
	return files;
}

function scalar(frontmatter, key) {
	return frontmatter.match(new RegExp(`^${key}:\\s*["']?([^\\n"']+)["']?\\s*$`, 'm'))?.[1]?.trim();
}

const files = await markdownFiles(contentRoot);
for (const file of files) {
	const relative = path.relative(process.cwd(), file);
	const source = await readFile(file, 'utf8');
	const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) {
		failures.push(`${relative}: missing valid frontmatter.`);
		continue;
	}

	const [, frontmatter, body] = match;
	const required = ['lang', 'slug', 'title', 'description', 'category', 'categorySlug', 'publishedAt', 'readMinutes', 'heroImage'];
	for (const key of required) if (!scalar(frontmatter, key)) failures.push(`${relative}: missing ${key}.`);

	const lang = scalar(frontmatter, 'lang');
	const slug = scalar(frontmatter, 'slug');
	const identity = `${lang}/${slug}`;
	if (identities.has(identity)) failures.push(`${relative}: duplicate blog identity ${identity}.`);
	identities.add(identity);

	const readMinutes = Number(scalar(frontmatter, 'readMinutes'));
	const words = body.replace(/\[[^\]]+\]\([^)]+\)/g, ' ').replace(/[#*_`>-]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
	if (!Number.isFinite(readMinutes) || readMinutes < 1) failures.push(`${relative}: readMinutes must be a positive number.`);
	else if (words > readMinutes * 220) failures.push(`${relative}: ${words} words exceed the ${readMinutes}-minute reading budget.`);

	const sources = [...frontmatter.matchAll(/^\s+url:\s*["']?(https:\/\/[^\s"']+)["']?\s*$/gm)];
	if (!sources.length) failures.push(`${relative}: at least one HTTPS source is required.`);

	const imageValue = scalar(frontmatter, 'heroImage');
	if (imageValue) {
		const imagePath = path.resolve(path.dirname(file), imageValue);
		try {
			await access(imagePath);
		} catch {
			failures.push(`${relative}: hero image not found at ${imageValue}.`);
		}
	}
}

if (failures.length) {
	console.error(failures.join('\n'));
	process.exitCode = 1;
} else {
	console.log(`Validated ${files.length} localized blog entries with sources, images, and reading-time budgets.`);
}

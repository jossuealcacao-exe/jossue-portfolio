import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { postPath, publishedPosts, type Locale } from '../../data/blog';

export function getStaticPaths() { return [{ params: { lang: 'es' } }, { params: { lang: 'en' } }]; }
const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
export const GET: APIRoute = async ({ params, site }) => {
	const locale = params.lang as Locale;
	const origin = site ?? new URL('https://blog.invalid');
	const items = publishedPosts(await getCollection('blog'), locale).map((entry) => {
		const url = new URL(postPath(entry), origin).href;
		return `<item><title>${escapeXml(entry.data.title)}</title><description>${escapeXml(entry.data.description)}</description><link>${escapeXml(url)}</link><guid isPermaLink="true">${escapeXml(url)}</guid><pubDate>${entry.data.publishedAt.toUTCString()}</pubDate><dc:creator>${escapeXml(entry.data.author.name)}</dc:creator></item>`;
	}).join('');
	return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>Blog de Jossue Alcalá</title><link>${origin.href}</link><language>${locale === 'es' ? 'es-MX' : 'en-US'}</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};

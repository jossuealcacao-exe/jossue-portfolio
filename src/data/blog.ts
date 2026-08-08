import type { CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

export type BlogEntry = CollectionEntry<'blog'>;

export function isPublishedBlogPost(entry: BlogEntry, now = new Date()): boolean {
	return entry.data.publication.publish && !entry.data.draft && entry.data.publishedAt.getTime() <= now.getTime();
}

export function publishedBlogPosts(entries: BlogEntry[], locale: Locale, now = new Date()): BlogEntry[] {
	return entries
		.filter((entry) => entry.data.lang === locale && isPublishedBlogPost(entry, now))
		.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

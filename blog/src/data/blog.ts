import type { CollectionEntry } from 'astro:content';

export type Locale = 'es' | 'en';
export type BlogEntry = CollectionEntry<'blog'>;

export const categories = [
	{ es: { slug: 'inteligencia-artificial', label: 'Inteligencia artificial' }, en: { slug: 'artificial-intelligence', label: 'Artificial intelligence' } },
	{ es: { slug: 'desarrollo-web', label: 'Desarrollo web' }, en: { slug: 'web-development', label: 'Web development' } },
	{ es: { slug: 'ecommerce', label: 'Ecommerce' }, en: { slug: 'ecommerce', label: 'Ecommerce' } },
	{ es: { slug: 'tecnologia', label: 'Tecnología' }, en: { slug: 'technology', label: 'Technology' } },
	{ es: { slug: 'recursos', label: 'Recursos' }, en: { slug: 'resources', label: 'Resources' } },
] as const;

export const blogPath = (locale: Locale) => `/${locale}/`;
export const postPath = (entry: BlogEntry) => `/${entry.data.lang}/${entry.data.slug}/`;
export const categoryPath = (locale: Locale, slug: string) => `/${locale}/${locale === 'es' ? 'categoria' : 'category'}/${slug}/`;
export const publishedPosts = (entries: BlogEntry[], locale: Locale) => entries.filter((entry) => entry.data.lang === locale && entry.data.publication.publish && !entry.data.draft && entry.data.publishedAt <= new Date()).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
export const formatDate = (date: Date, locale: Locale) => new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Mexico_City' }).format(date);

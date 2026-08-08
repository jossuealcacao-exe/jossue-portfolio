import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogPosts = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdoc}',
		base: '../src/content/blog',
		generateId: ({ entry, data }) => `${String(data.lang ?? 'unknown')}/${String(data.slug ?? entry)}`,
	}),
	schema: ({ image }) =>
		z.object({
			lang: z.enum(['es', 'en']),
			slug: z.string(),
			counterpartSlug: z.string(),
			title: z.string(),
			description: z.string(),
			excerpt: z.string(),
			category: z.string(),
			categorySlug: z.string(),
			counterpartCategorySlug: z.string(),
			publishedAt: z.coerce.date(),
			updatedAt: z.coerce.date().optional(),
			readMinutes: z.number().int().positive().max(20),
			featured: z.boolean().default(false),
			draft: z.boolean().default(true),
			heroImage: image(),
			heroAlt: z.string(),
			supportImage: image().optional(),
			supportImageAlt: z.string().optional(),
			keywords: z.array(z.string()).min(1),
			author: z.object({ name: z.string() }),
			sources: z.array(z.object({ label: z.string(), url: z.url() })),
			publication: z.object({ publish: z.boolean() }),
		}),
});

export const collections = { blog: blogPosts };

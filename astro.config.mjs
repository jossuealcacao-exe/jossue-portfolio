// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const fallbackSite = 'https://portfolio.invalid';
const configuredSite = process.env.PUBLIC_SITE_URL?.trim();

if (!configuredSite) {
	console.warn(`[site] PUBLIC_SITE_URL is not set; using traceable fallback ${fallbackSite}`);
}

export default defineConfig({
	site: configuredSite || fallbackSite,
	output: 'static',
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => new URL(page).pathname !== '/',
		}),
	],
	build: {
		format: 'directory',
	},
});

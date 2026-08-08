// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const fallbackSite = 'https://blog.invalid';
const configuredSite = process.env.PUBLIC_SITE_URL?.trim();

if (!configuredSite) console.warn(`[blog] PUBLIC_SITE_URL is not set; using ${fallbackSite}`);

export default defineConfig({
	site: configuredSite || fallbackSite,
	output: 'static',
	trailingSlash: 'always',
	integrations: [sitemap()],
	build: { format: 'directory' },
});

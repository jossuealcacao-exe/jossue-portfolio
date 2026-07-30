export type ToolCategoryId = 'web' | 'ai' | 'paid-media' | 'apis';

export type ToolId =
	| 'shopify'
	| 'react'
	| 'typescript'
	| 'node'
	| 'github'
	| 'vite'
	| 'zustand'
	| 'zod'
	| 'astro'
	| 'playwright'
	| 'html5'
	| 'css'
	| 'javascript'
	| 'json'
	| 'youtube'
	| 'tiktok'
	| 'odoo'
	| 'googledrive'
	| 'looker'
	| 'googlechrome'
	| 'pagespeedinsights'
	| 'nextdotjs'
	| 'vitest'
	| 'testinglibrary'
	| 'python'
	| 'streamlit'
	| 'googlefonts'
	| 'cursor'
	| 'openai'
	| 'anthropic'
	| 'googlegemini'
	| 'googleads'
	| 'meta'
	| 'semrush'
	| 'cloudflare'
	| 'railway'
	| 'prisma'
	| 'postgresql'
	| 'googletagmanager'
	| 'ga4';

export interface ToolMark {
	id: ToolId;
	name: { es: string; en: string };
	src: string;
	width: number;
	height: number;
}

export interface ToolCategoryGroup {
	id: ToolCategoryId;
	label: { es: string; en: string };
	summary: { es: string; en: string };
	tools: ToolMark[];
}

const tool = (
	id: ToolId,
	name: string,
	file: string,
): ToolMark => ({
	id,
	name: { es: name, en: name },
	src: `/tools/${file}`,
	width: 24,
	height: 24,
});

const categories: ToolCategoryGroup[] = [
	{
		id: 'web',
		label: { es: 'Desarrollo web', en: 'Web development' },
		summary: {
			es: 'Storefronts, producto y desarrollo web.',
			en: 'Storefronts, product, and web development.',
		},
		tools: [
			tool('shopify', 'Shopify', 'shopify.svg'),
			tool('react', 'React', 'react.svg'),
			tool('typescript', 'TypeScript', 'typescript.svg'),
			tool('node', 'Node.js', 'nodedotjs.svg'),
			tool('vite', 'Vite', 'vite.svg'),
			tool('zustand', 'Zustand', 'zustand.png'),
			tool('zod', 'Zod', 'zod.svg'),
			tool('astro', 'Astro', 'astro.svg'),
			tool('playwright', 'Playwright', 'playwright.svg'),
			tool('github', 'GitHub', 'github.svg'),
		],
	},
	{
		id: 'ai',
		label: { es: 'IA aplicada', en: 'Applied AI' },
		summary: {
			es: 'Agentes, copilotos y desarrollo asistido con guardrails.',
			en: 'Agents, copilots, and guarded assisted development.',
		},
		tools: [
			tool('cursor', 'Cursor', 'cursor.svg'),
			tool('openai', 'OpenAI', 'openai.svg'),
			tool('anthropic', 'Claude', 'anthropic.svg'),
			tool('googlegemini', 'Gemini', 'googlegemini.svg'),
		],
	},
	{
		id: 'paid-media',
		label: { es: 'Paid media', en: 'Paid media' },
		summary: {
			es: 'Adquisición, medición y optimización de campañas.',
			en: 'Acquisition, measurement, and campaign optimization.',
		},
		tools: [
			tool('googleads', 'Google Ads', 'googleads.svg'),
			tool('meta', 'Meta Ads', 'meta.svg'),
			tool('semrush', 'Semrush', 'semrush.svg'),
			tool('ga4', 'Google Analytics 4', 'googleanalytics.svg'),
		],
	},
	{
		id: 'apis',
		label: { es: 'APIs e infraestructura', en: 'APIs and infrastructure' },
		summary: {
			es: 'Datos, despliegue, medición y backends conectados al negocio.',
			en: 'Data, deployment, measurement, and business-connected backends.',
		},
		tools: [
			tool('cloudflare', 'Cloudflare', 'cloudflare.svg'),
			tool('railway', 'Railway', 'railway.svg'),
			tool('prisma', 'Prisma', 'prisma.svg'),
			tool('postgresql', 'PostgreSQL', 'postgresql.svg'),
			tool('googletagmanager', 'Google Tag Manager', 'googletagmanager.svg'),
		],
	},
];

export function toolCategories(): ToolCategoryGroup[] {
	return categories;
}

const tools = categories.flatMap((category) => category.tools);
const stackOnlyTools: ToolMark[] = [
	tool('html5', 'HTML', 'html5.svg'),
	tool('css', 'CSS', 'css.svg'),
	tool('javascript', 'JavaScript', 'javascript.svg'),
	tool('json', 'JSON', 'json.svg'),
	tool('youtube', 'YouTube', 'youtube.svg'),
	tool('tiktok', 'TikTok', 'tiktok.svg'),
	tool('odoo', 'Odoo', 'odoo.svg'),
	tool('googledrive', 'Google Drive', 'googledrive.svg'),
	tool('looker', 'Looker Studio', 'looker.svg'),
	tool('googlechrome', 'Chrome', 'googlechrome.svg'),
	tool('pagespeedinsights', 'PageSpeed Insights', 'pagespeedinsights.svg'),
	tool('nextdotjs', 'Next.js', 'nextdotjs.svg'),
	tool('vitest', 'Vitest', 'vitest.svg'),
	tool('testinglibrary', 'Testing Library', 'testinglibrary.svg'),
	tool('python', 'Python', 'python.svg'),
	tool('streamlit', 'Streamlit', 'streamlit.svg'),
	tool('googlefonts', 'Google Fonts', 'googlefonts.svg'),
];
const allTools = [...tools, ...stackOnlyTools];

const aliases: Array<[RegExp, ToolId]> = [
	[/shopify/i, 'shopify'],
	[/liquid|theme app extensions|app embeds|polaris/i, 'shopify'],
	[/react/i, 'react'],
	[/typescript/i, 'typescript'],
	[/node/i, 'node'],
	[/github/i, 'github'],
	[/^vite(?:\s+\d+)?$/i, 'vite'],
	[/zustand/i, 'zustand'],
	[/\bzod\b/i, 'zod'],
	[/astro/i, 'astro'],
	[/playwright/i, 'playwright'],
	[/html/i, 'html5'],
	[/css/i, 'css'],
	[/javascript/i, 'javascript'],
	[/json/i, 'json'],
	[/youtube/i, 'youtube'],
	[/tiktok/i, 'tiktok'],
	[/odoo/i, 'odoo'],
	[/google drive/i, 'googledrive'],
	[/looker studio/i, 'looker'],
	[/chrome ux report|chrome devtools|lighthouse/i, 'googlechrome'],
	[/pagespeed/i, 'pagespeedinsights'],
	[/next\.?js|app router|route handlers/i, 'nextdotjs'],
	[/vitest/i, 'vitest'],
	[/testing library/i, 'testinglibrary'],
	[/python/i, 'python'],
	[/streamlit/i, 'streamlit'],
	[/fraunces|manrope/i, 'googlefonts'],
	[/cursor/i, 'cursor'],
	[/openai|codex/i, 'openai'],
	[/claude|anthropic/i, 'anthropic'],
	[/gemini/i, 'googlegemini'],
	[/google ads/i, 'googleads'],
	[/meta ads/i, 'meta'],
	[/semrush/i, 'semrush'],
	[/cloudflare/i, 'cloudflare'],
	[/railway/i, 'railway'],
	[/prisma/i, 'prisma'],
	[/postgres/i, 'postgresql'],
	[/google tag manager|\bgtm\b/i, 'googletagmanager'],
	[/google analytics|\bga4\b/i, 'ga4'],
];

export function toolForStackLabel(label: string): ToolMark | undefined {
	const alias = aliases.find(([pattern]) => pattern.test(label));
	return alias ? allTools.find((item) => item.id === alias[1]) : undefined;
}

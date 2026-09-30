export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export type PageKey = 'home' | 'products' | 'work' | 'services' | 'ai' | 'about' | 'contact' | 'ahpAtlas' | 'madre';

export const routes: Record<Locale, Record<PageKey, string>> = {
	es: {
		home: '/es/',
		products: '/es/productos/',
		work: '/es/trabajo/',
		services: '/es/servicios/',
		ai: '/es/ia-y-sistemas/',
		about: '/es/acerca/',
		contact: '/es/contacto/',
		ahpAtlas: '/es/recursos/ahp-plus/',
		madre: '/es/madre/',
	},
	en: {
		home: '/en/',
		products: '/en/products/',
		work: '/en/work/',
		services: '/en/services/',
		ai: '/en/ai-and-systems/',
		about: '/en/about/',
		contact: '/en/contact/',
		ahpAtlas: '/en/resources/ahp-plus/',
		madre: '/en/madre/',
	},
};

export const navigation = {
	es: [
		{ key: 'products', label: 'Productos' },
		{ key: 'work', label: 'Casos' },
		{ key: 'about', label: 'Sobre mí' },
		{ key: 'contact', label: 'Contacto' },
	],
	en: [
		{ key: 'products', label: 'Products' },
		{ key: 'work', label: 'Cases' },
		{ key: 'about', label: 'About' },
		{ key: 'contact', label: 'Contact' },
	],
} satisfies Record<Locale, Array<{ key: Exclude<PageKey, 'home'>; label: string }>>;

export const metadata: Record<Locale, Record<PageKey, { title: string; description: string }>> = {
	es: {
		home: {
			title: 'Jossue Alcalá — Ecommerce, Shopify e IA aplicada',
			description: 'Ecommerce e IA aplicada: dirijo el ecommerce de WU Nutrition y construyo tiendas Shopify, chatbots con IA y productos como MADRE y Daniela.',
		},
		products: {
			title: 'Productos y servicios — Jossue Alcalá',
			description: 'Chatbots con IA, MADRE, AHP+, Bloqio Builder, Daniela y Miawseo con demo en video, más consultoría y desarrollo web para tu negocio.',
		},
		work: {
			title: 'Casos: Shopify, ecommerce e IA — Jossue Alcalá',
			description: 'Nueve proyectos con capturas reales: tiendas que dirijo, productos que construí y conceptos, con qué pasaba, qué hice y qué cambió.',
		},
		services: {
			title: 'Servicios de Shopify, CRO e IA — Jossue Alcalá',
			description: 'Tiendas Shopify, diagnóstico de conversión, velocidad, medición, IA aplicada y apps a la medida. Diseño y me quedo a construirlo contigo.',
		},
		ai: {
			title: 'IA aplicada y AI Dev — Jossue Alcalá',
			description: 'Asistentes con datos reales y permisos, agentes de código y productos con IA en uso: MADRE, AHP+, Daniela y Jossue AI.',
		},
		about: {
			title: 'Sobre mí: Head of E-commerce y AI Dev — Jossue Alcalá',
			description: 'Más de 8 años en growth, paid media, SEO y CRO. Dirijo el ecommerce de WU Nutrition y Come Verde y construyo productos con IA. CV en PDF.',
		},
		contact: {
			title: 'Contacto — Jossue Alcalá · Shopify, CRO e IA',
			description: 'Escríbeme por correo, WhatsApp o el formulario, o pregúntale a Jossue AI. Contesto en menos de un día hábil.',
		},
		ahpAtlas: {
			title: 'AHP+ 1.4.1 — Continuidad verificable y Command Atlas',
			description: 'Entiende, instala y usa AHP+ 1.4.1: la memoria del proyecto en tu repositorio para cambiar de asistente sin empezar de cero.',
		},
		madre: {
			title: 'MADRE 0.5.2 — Tus agentes de código en una sala',
			description: 'MADRE coordina Codex, Claude Code, Gemini CLI y OpenCode con memoria compartida, permisos explícitos y control humano. Gratis y abierto.',
		},
	},
	en: {
		home: {
			title: 'Jossue Alcalá — Ecommerce, Shopify and applied AI',
			description: 'Ecommerce and applied AI: I lead ecommerce at WU Nutrition and build Shopify stores, AI chatbots and products like MADRE and Daniela.',
		},
		products: {
			title: 'Products and services — Jossue Alcalá',
			description: 'AI chatbots, MADRE, AHP+, Bloqio Builder, Daniela and Miawseo with video demos, plus consulting and web development for your business.',
		},
		work: {
			title: 'Cases: Shopify, ecommerce and AI — Jossue Alcalá',
			description: 'Nine projects with real screenshots: stores I lead, products I built and concepts, with what was going on, what I did and what changed.',
		},
		services: {
			title: 'Shopify, CRO and AI services — Jossue Alcalá',
			description: 'Shopify stores, conversion diagnosis, speed, measurement, applied AI and custom apps. I design it and stay to build it with you.',
		},
		ai: {
			title: 'Applied AI and AI Dev — Jossue Alcalá',
			description: 'Assistants with real data and permissions, coding agents and AI products in use: MADRE, AHP+, Daniela and Jossue AI.',
		},
		about: {
			title: 'About: Head of E-commerce and AI Dev — Jossue Alcalá',
			description: '8+ years across growth, paid media, SEO and CRO. I lead ecommerce at WU Nutrition and Come Verde and build AI products. PDF CV.',
		},
		contact: {
			title: 'Contact — Jossue Alcalá · Shopify, CRO and AI',
			description: 'Write by email, WhatsApp or the form, or ask Jossue AI. I reply within one business day.',
		},
		ahpAtlas: {
			title: 'AHP+ 1.4.1 — Verifiable continuity and Command Atlas',
			description: 'Understand, install and use AHP+ 1.4.1: project memory in your repository so you can switch assistants without starting over.',
		},
		madre: {
			title: 'MADRE 0.5.2 — Your coding agents in one room',
			description: 'MADRE coordinates Codex, Claude Code, Gemini CLI and OpenCode with shared memory, explicit permissions and human control. Free and open.',
		},
	},
};

export function isLocale(value: string | undefined): value is Locale {
	return value === 'es' || value === 'en';
}

export function findPageKey(locale: Locale, pathname: string): PageKey | undefined {
	return (Object.entries(routes[locale]) as Array<[PageKey, string]>).find(([, route]) => route === pathname)?.[0];
}

export function equivalentPath(pathname: string, from: Locale, to: Locale, counterpartSlug?: string): string {
	const pageKey = findPageKey(from, pathname);
	if (pageKey) return routes[to][pageKey];

	const casePrefix = routes[from].work;
	if (pathname.startsWith(casePrefix)) {
		const slug = counterpartSlug ?? pathname.slice(casePrefix.length).replaceAll('/', '');
		return `${routes[to].work}${slug}/`;
	}

	const productPrefix = routes[from].products;
	if (pathname.startsWith(productPrefix)) {
		const slug = counterpartSlug ?? pathname.slice(productPrefix.length).replaceAll('/', '');
		return `${routes[to].products}${slug}/`;
	}

	return routes[to].home;
}

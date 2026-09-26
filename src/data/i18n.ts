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
			title: 'Jossue Alcalá — Desarrollo web, Shopify y UX/CRO',
			description: 'Desarrollo y optimización de experiencias Shopify con UX orientada a CRO, IA aplicada y visión comercial.',
		},
		products: {
			title: 'Productos y soluciones — Jossue Alcalá',
			description: 'Auditoría ecommerce, CRO, Shopify, desarrollo web e IA aplicada convertidos en productos claros y contactables.',
		},
		work: {
			title: 'Trabajo seleccionado — Jossue Alcalá',
			description: 'Proyectos de Shopify, ecommerce, producto digital e IA aplicada para marcas y productos independientes.',
		},
		services: {
			title: 'Servicios — Jossue Alcalá',
			description: 'Desarrollo Shopify, estrategia UX/CRO, optimización ecommerce, analítica, automatización e IA aplicada.',
		},
		ai: {
			title: 'IA y sistemas — Jossue Alcalá',
			description: 'Productos, automatizaciones y sistemas de IA diseñados para integrarse con operaciones ecommerce reales.',
		},
		about: {
			title: 'Acerca — Jossue Alcalá',
			description: 'Trayectoria de Jossue Alcalá en ecommerce, Shopify, growth, producto digital, paid media e IA aplicada.',
		},
		contact: {
			title: 'Contacto — Jossue Alcalá',
			description: 'Correo, LinkedIn y WhatsApp para hablar sobre Shopify, UX/CRO, desarrollo web o producto.',
		},
		ahpAtlas: {
			title: 'AHP+ 1.4.1 — Continuidad verificable y Command Atlas',
			description: 'Entiende, instala y usa AHP+ 1.4.1 con evidencia real, ejemplos humanos y comandos para proyectos que cambian de asistente.',
		},
		madre: {
			title: 'MADRE 0.4.0 — Una sala local para tus agentes',
			description: 'Instala MADRE en macOS o Linux y coordina Codex, Claude Code, Gemini CLI y OpenCode con memoria compartida, permisos explícitos y control humano.',
		},
	},
	en: {
		home: {
			title: 'Jossue Alcalá — Web development, Shopify, and UX/CRO',
			description: 'Shopify development and optimization with CRO-oriented UX, applied AI, and commercial perspective.',
		},
		products: {
			title: 'Products and solutions — Jossue Alcalá',
			description: 'Ecommerce audits, CRO, Shopify, web development, and applied AI shaped into clear, contact-ready products.',
		},
		work: {
			title: 'Selected work — Jossue Alcalá',
			description: 'Shopify, ecommerce, digital product, and applied AI work for brands and independent products.',
		},
		services: {
			title: 'Services — Jossue Alcalá',
			description: 'Shopify development, UX/CRO strategy, ecommerce optimization, analytics, automation, and applied AI.',
		},
		ai: {
			title: 'AI and systems — Jossue Alcalá',
			description: 'AI products, automations, and systems designed for real ecommerce operations.',
		},
		about: {
			title: 'About — Jossue Alcalá',
			description: 'Jossue Alcalá’s experience across ecommerce, Shopify, growth, digital product, paid media, and applied AI.',
		},
		contact: {
			title: 'Contact — Jossue Alcalá',
			description: 'Email, LinkedIn, and WhatsApp for Shopify, UX/CRO, web development, or product conversations.',
		},
		ahpAtlas: {
			title: 'AHP+ 1.4.1 — Verifiable continuity and Command Atlas',
			description: 'Understand, install, and use AHP+ 1.4.1 with real evidence, human examples, and commands for projects that move between assistants.',
		},
		madre: {
			title: 'MADRE 0.4.0 — A local room for your agents',
			description: 'Install MADRE on macOS or Linux and coordinate Codex, Claude Code, Gemini CLI, and OpenCode with shared memory, explicit permissions, and human control.',
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

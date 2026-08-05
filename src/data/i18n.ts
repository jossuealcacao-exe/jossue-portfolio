export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export type PageKey = 'home' | 'work' | 'services' | 'ai' | 'about' | 'contact';

export const routes: Record<Locale, Record<PageKey, string>> = {
	es: {
		home: '/es/',
		work: '/es/trabajo/',
		services: '/es/servicios/',
		ai: '/es/ia-y-sistemas/',
		about: '/es/acerca/',
		contact: '/es/contacto/',
	},
	en: {
		home: '/en/',
		work: '/en/work/',
		services: '/en/services/',
		ai: '/en/ai-and-systems/',
		about: '/en/about/',
		contact: '/en/contact/',
	},
};

export const navigation = {
	es: [
		{ key: 'work', label: 'Proyectos' },
		{ key: 'services', label: 'Servicios' },
		{ key: 'about', label: 'Sobre mí' },
		{ key: 'contact', label: 'Contacto' },
	],
	en: [
		{ key: 'work', label: 'Projects' },
		{ key: 'services', label: 'Services' },
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
	},
	en: {
		home: {
			title: 'Jossue Alcalá — Web development, Shopify, and UX/CRO',
			description: 'Shopify development and optimization with CRO-oriented UX, applied AI, and commercial perspective.',
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

	return routes[to].home;
}

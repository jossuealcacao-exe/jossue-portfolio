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
		{ key: 'work', label: 'Trabajo' },
		{ key: 'services', label: 'Servicios' },
		{ key: 'ai', label: 'IA y sistemas' },
		{ key: 'about', label: 'Acerca' },
		{ key: 'contact', label: 'Contacto' },
	],
	en: [
		{ key: 'work', label: 'Work' },
		{ key: 'services', label: 'Services' },
		{ key: 'ai', label: 'AI & systems' },
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
			description: 'Casos estructurados con evidencia pendiente claramente identificada y sin métricas no verificadas.',
		},
		services: {
			title: 'Servicios — Jossue Alcalá',
			description: 'Shopify, desarrollo web, auditorías UX/CRO e implementación de sistemas digitales orientados al negocio.',
		},
		ai: {
			title: 'IA y sistemas — Jossue Alcalá',
			description: 'Un enfoque prudente para integrar IA, automatización y sistemas de trabajo con revisión humana.',
		},
		about: {
			title: 'Acerca — Jossue Alcalá',
			description: 'Principios de trabajo, alcance actual y criterios de evidencia de este portafolio.',
		},
		contact: {
			title: 'Contacto — Jossue Alcalá',
			description: 'Formulario accesible para iniciar una conversación; requiere un endpoint configurado para enviar.',
		},
	},
	en: {
		home: {
			title: 'Jossue Alcalá — Web development, Shopify, and UX/CRO',
			description: 'Shopify development and optimization with CRO-oriented UX, applied AI, and commercial perspective.',
		},
		work: {
			title: 'Selected work — Jossue Alcalá',
			description: 'Structured cases with evidence gaps made explicit and no unverified metrics.',
		},
		services: {
			title: 'Services — Jossue Alcalá',
			description: 'Shopify, web development, UX/CRO audits, and digital systems built around business needs.',
		},
		ai: {
			title: 'AI and systems — Jossue Alcalá',
			description: 'A careful approach to AI, automation, and working systems with human review.',
		},
		about: {
			title: 'About — Jossue Alcalá',
			description: 'Working principles, current scope, and evidence standards for this portfolio.',
		},
		contact: {
			title: 'Contact — Jossue Alcalá',
			description: 'An accessible conversation form that requires a configured endpoint before it can submit.',
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

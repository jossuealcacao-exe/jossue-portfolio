export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export type PageKey = 'home' | 'products' | 'work' | 'services' | 'ai' | 'about' | 'contact' | 'ahpAtlas' | 'madre' | 'privacy' | 'booking';

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
		privacy: '/es/privacidad/',
		booking: '/es/agenda/',
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
		privacy: '/en/privacy/',
		booking: '/en/book-a-call/',
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
			title: 'Jossue Alcalá — Tiendas en Shopify, chatbots e IA para negocios',
			description: 'Dirijo las ventas en línea de WU Nutrition y Come Verde. Hago tiendas en Shopify y chatbots con IA para negocios en México, y construí productos como MADRE y Daniela.',
		},
		products: {
			title: 'Productos y servicios — Jossue Alcalá',
			description: 'Chatbots con IA, MADRE, AHP+, Bloqio Builder, Daniela y Miawseo, cada uno con su video. También consultoría y páginas web para tu negocio.',
		},
		work: {
			title: 'Casos: Shopify, ecommerce e IA — Jossue Alcalá',
			description: 'Nueve proyectos con capturas reales: tiendas que dirijo, productos que construí y propuestas. En cada uno cuento qué pasaba, qué hice y qué cambió.',
		},
		services: {
			title: 'Servicios de Shopify, conversión e IA — Jossue Alcalá',
			description: 'Hago tiendas en Shopify, reviso por qué tu sitio no vende, lo hago cargar más rápido, mido qué funciona y armo herramientas con IA. Lo diseño y también lo construyo contigo.',
		},
		ai: {
			title: 'IA para atender clientes y para programar — Jossue Alcalá',
			description: 'Asistentes que atienden con la información real de tu negocio y herramientas con IA para programar. Cuatro ya están en uso: MADRE, AHP+, Daniela y Jossue AI.',
		},
		about: {
			title: 'Sobre mí: Head of E-commerce y desarrollador con IA — Jossue Alcalá',
			description: 'Más de 8 años en ventas en línea, publicidad digital, SEO y conversión. Dirijo el ecommerce de WU Nutrition y Come Verde y hago productos con IA. CV en PDF.',
		},
		booking: {
			title: 'Agenda una llamada de 10 minutos — Jossue Alcalá',
			description: 'Elige un horario y te llamo: 10 minutos para entender tu proyecto y decirte por dónde empezaría. Martes, miércoles, viernes y sábado por la mañana.',
		},
		privacy: {
			title: 'Aviso de privacidad — Jossue Alcalá',
			description: 'Qué datos recabo en el sitio, el chat Jossue AI, la auditoría express y WhatsApp, para qué los uso, cuánto tiempo los guardo y cómo ejercer tus derechos ARCO.',
		},
		contact: {
			title: 'Contacto — Jossue Alcalá · Shopify, chatbots e IA',
			description: 'Escríbeme por correo, WhatsApp o el formulario, o pregúntale a Jossue AI. Contesto en menos de un día hábil.',
		},
		ahpAtlas: {
			title: 'AHP+ 1.4.1 — Continuidad verificable y Command Atlas',
			description: 'Entiende, instala y usa AHP+ 1.4.1: la memoria del proyecto en tu repositorio para cambiar de asistente sin empezar de cero.',
		},
		madre: {
			title: 'MADRE 0.5.2 — Tus asistentes de IA para programar, en una sala',
			description: 'MADRE pone a Codex, Claude Code, Gemini CLI y OpenCode a trabajar en la misma conversación. Recuerda lo que se decidió y no cambia nada sin tu permiso. Gratis y de código abierto.',
		},
	},
	en: {
		home: {
			title: 'Jossue Alcalá — Shopify stores, chatbots and AI for businesses',
			description: 'I lead online sales at WU Nutrition and Come Verde. I build Shopify stores and AI chatbots for businesses in Mexico, and I made products like MADRE and Daniela.',
		},
		products: {
			title: 'Products and services — Jossue Alcalá',
			description: 'AI chatbots, MADRE, AHP+, Bloqio Builder, Daniela and Miawseo, each with its own video. Plus consulting and websites for your business.',
		},
		work: {
			title: 'Cases: Shopify, ecommerce and AI — Jossue Alcalá',
			description: 'Nine projects with real screenshots: stores I lead, products I built and proposals. For each one I tell what was going on, what I did and what changed.',
		},
		services: {
			title: 'Shopify, conversion and AI services — Jossue Alcalá',
			description: 'I build Shopify stores, find out why your site is not selling, make it load faster, measure what works and build AI tools. I design it and build it with you too.',
		},
		ai: {
			title: 'AI to serve customers and to code — Jossue Alcalá',
			description: 'Assistants that serve customers with your real business information, and AI tools for coding. Four are already in use: MADRE, AHP+, Daniela and Jossue AI.',
		},
		about: {
			title: 'About: Head of E-commerce and AI developer — Jossue Alcalá',
			description: '8+ years in online sales, digital ads, SEO and conversion. I lead ecommerce at WU Nutrition and Come Verde and build AI products. PDF CV.',
		},
		booking: {
			title: 'Book a 10-minute call — Jossue Alcalá',
			description: 'Pick a time and I call you: 10 minutes to understand your project and tell you where I would start. Tuesday, Wednesday, Friday and Saturday mornings.',
		},
		privacy: {
			title: 'Privacy notice — Jossue Alcalá',
			description: 'What data I collect on the site, the Jossue AI chat, the express audit and WhatsApp, what I use it for, how long I keep it and how to exercise your rights.',
		},
		contact: {
			title: 'Contact — Jossue Alcalá · Shopify, chatbots and AI',
			description: 'Write by email, WhatsApp or the form, or ask Jossue AI. I reply within one business day.',
		},
		ahpAtlas: {
			title: 'AHP+ 1.4.1 — Verifiable continuity and Command Atlas',
			description: 'Understand, install and use AHP+ 1.4.1: project memory in your repository so you can switch assistants without starting over.',
		},
		madre: {
			title: 'MADRE 0.5.2 — Your AI coding assistants in one room',
			description: 'MADRE gets Codex, Claude Code, Gemini CLI and OpenCode working in the same conversation. It remembers what was decided and changes nothing without your permission. Free and open source.',
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

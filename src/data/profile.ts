import type { Locale } from './i18n';

export const profile = {
	name: 'Jossue Alcalá',
	asOf: '2026-07-19',
	cvPdfAsOf: '2026-04-13',
	source: '_inputs/cv/Jossue_Alcala_CV.pdf',
	sourcePack: '_inputs/profile/master_portfolio_ai/',
	cvDownload: '/cv/Jossue-Alcala-CV.pdf',
	headline: {
		es: 'Head of E-commerce & Digital Growth · WU Nutrition / Come Verde',
		en: 'Head of E-commerce & Digital Growth · WU Nutrition / Come Verde',
	},
	subheadline: {
		es: 'Ecommerce · IA aplicada y AI Dev · Shopify · UX/CRO',
		en: 'Ecommerce · Applied AI and AI Dev · Shopify · UX/CRO',
	},
	summary: {
		es: 'Dirijo el ecommerce de WU Nutrition y Come Verde, con el presupuesto y los resultados del canal (P&L) a mi cargo. Además programo yo mismo las tiendas en Shopify, las apps, los sitios y las herramientas con IA que usa el equipo para vender. Mi otra especialidad es la IA aplicada al negocio: MADRE, AHP+ y Daniela son productos míos que ya están en uso. Llevo más de ocho años en crecimiento digital, publicidad pagada, SEO y conversión. Como decido y también programo, lo que propongo sí llega a funcionar.',
		en: 'I lead ecommerce at WU Nutrition and Come Verde, responsible for the channel budget and results (P&L). I also code the Shopify stores, apps, websites and AI tools the team uses to sell. My other specialty is AI applied to business: MADRE, AHP+ and Daniela are products of mine already in use. I have more than eight years in digital growth, paid advertising, SEO and conversion. Because I both decide and code, what I propose actually gets built.',
	},
	skills: {
		es: [
			'Shopify, Liquid, Theme Customization, Theme App Extensions, App Embeds, Shopify CLI, Polaris, App Bridge',
			'Conversión (CRO), crecimiento de ecommerce, fichas y listados de producto, buscador, señales de confianza, carrito lateral, botón de compra fijo y páginas de campaña',
			'HTML, CSS, JavaScript/TypeScript, React, Node, Prisma, PostgreSQL, GitHub, Railway, Cloudflare',
			'Performance marketing, paid media, SEO, GA4, GTM, Search Console, SEMrush, Screaming Frog, Looker Studio, Odoo, Klaviyo',
			'Programo con asistentes de IA (Claude Code, Codex, Cursor, ChatGPT) y uso AHP+ para no perder el hilo al cambiar de asistente; cada entrega lleva pruebas y documentación',
			'Automatizaciones de negocio: Growth OS, conectores MCP, tableros de indicadores, revisiones de publicidad pagada y reglas de marca, siempre con aprobación de una persona',
		],
		en: [
			'Shopify, Liquid, theme customization, Theme App Extensions, App Embeds, Shopify CLI, Polaris, App Bridge',
			'Conversion (CRO), ecommerce growth, product pages and listings, search, trust signals, cart drawer, sticky buy button and campaign pages',
			'HTML, CSS, JavaScript/TypeScript, React, Node, Prisma, PostgreSQL, GitHub, Railway, Cloudflare',
			'Performance marketing, paid media, SEO, GA4, GTM, Search Console, SEMrush, Screaming Frog, Looker Studio, Odoo, Klaviyo',
			'I code with AI assistants (Claude Code, Codex, Cursor, ChatGPT) and use AHP+ to keep the thread when switching assistants; every delivery comes with tests and documentation',
			'Business automations: Growth OS, MCP connectors, KPI dashboards, paid advertising reviews and brand rules, always with a person approving',
		],
	},
	aiCapabilities: {
		es: [
			'Asistentes dentro del producto que solo hacen lo que tienen permitido y se pueden deshacer (Blob en Bloqio Builder, Daniela en WU Nutrition).',
			'Programo con agentes de IA siguiendo siempre el mismo orden: contexto, alcance, plan, código, pruebas y documentación.',
			'MADRE y AHP+: herramientas propias para que varios agentes trabajen en el mismo proyecto sin perder el hilo.',
			'Un asistente para el negocio que cruza los datos de Odoo, Shopify, GA4, la publicidad y Klaviyo, señala dónde no cuadran los números y no ejecuta nada sin permiso.',
			'Análisis comercial con IA: revisión de la publicidad en Meta, inventario de piezas creativas, planes de recuperación y resúmenes para dirección.',
		],
		en: [
			'In-product assistants that only do what they are allowed to and can be undone (Blob in Bloqio Builder, Daniela at WU Nutrition).',
			'I code with AI agents in the same order every time: context, scope, plan, code, tests and documentation.',
			'MADRE and AHP+: my own tools so several agents can work on one project without losing the thread.',
			'A business assistant that crosses data from Odoo, Shopify, GA4, ads and Klaviyo, points out where the numbers disagree, and runs nothing without permission.',
			'AI-assisted commercial analysis: Meta advertising reviews, creative inventory, recovery plans and summaries for leadership.',
		],
	},
	kpis: [
		{
			label: { es: 'Experiencia profesional', en: 'Professional experience' },
			value: { es: '+8 años', en: '+8 years' },
			detail: {
				es: 'Crecimiento digital, publicidad pagada, SEO y mejora de sitios.',
				en: 'Digital growth, paid advertising, SEO, and website improvement.',
			},
			source: 'CV 2026-04-13',
		},
		{
			label: { es: 'HP Inc. · ventas / trimestre', en: 'HP Inc. · sales / quarter' },
			value: { es: '+21% MX · +35% PE', en: '+21% MX · +35% PE' },
			detail: {
				es: 'Estrategia comercial y de demanda con las cadenas de retail clave.',
				en: 'Commercial and demand strategies for key retailers.',
			},
			source: 'CV 2026-04-13',
		},
		{
			label: { es: 'HP Inc. · participación de mercado', en: 'HP Inc. · market share' },
			value: { es: '+4% MX · +6% PE', en: '+4% MX · +6% PE' },
			detail: {
				es: 'México en 2024 y Perú durante mi periodo en HP Perú.',
				en: 'Mexico in 2024 and Peru during my time at HP Peru.',
			},
			source: 'CV 2026-04-13',
		},
		{
			label: { es: 'Farmalisto · conversión en anuncios', en: 'Farmalisto · ad conversion' },
			value: { es: '+22%', en: '+22%' },
			detail: {
				es: 'Reconocimiento de marca y posicionamiento en plataformas de pago por clic (CPC).',
				en: 'Brand awareness and positioning on pay-per-click (CPC) platforms.',
			},
			source: 'CV 2026-04-13',
		},
		{
			label: { es: 'Farmalisto · presupuesto de publicidad', en: 'Farmalisto · advertising budget' },
			value: { es: '>$1 MDP/mes', en: '>$1M MXN/mo' },
			detail: {
				es: 'Manejé SEO y publicidad pagada con ese presupuesto mensual.',
				en: 'I ran SEO and paid advertising with that monthly budget.',
			},
			source: 'CV 2026-04-13',
		},
		{
			label: { es: 'La Carnicería Virtual · carga en celular', en: 'La Carnicería Virtual · mobile load' },
			value: { es: '3.6 s CrUX', en: '3.6 s CrUX' },
			detail: {
				es: 'Lo que tardaba en aparecer el contenido principal en celulares de visitantes reales (LCP), según datos de Google. Lo medí en el diagnóstico de la tienda.',
				en: 'How long the main content took to appear on real visitors’ phones (LCP), according to Google data. I measured it in the store diagnosis.',
			},
			source: 'Caso LCV',
		},
	],
	experience: [
		{
			role: {
				es: 'IA aplicada y desarrollo con agentes de IA',
				en: 'Applied AI and development with AI agents',
			},
			org: 'Productos propios · WU Nutrition',
			period: { es: '2025 – Actualidad', en: '2025 – Present' },
			highlights: {
				es: [
					'Construí y publiqué MADRE (versión 0.5.2): una sala en tu computadora donde Codex, Claude Code, Gemini CLI y OpenCode trabajan en el mismo proyecto, comparten memoria y no cambian nada sin permiso. En una sala de prueba ahorró 496,894 tokens (la unidad con la que se cobra el uso de la IA) en siete turnos.',
					'Creé AHP+ 1.4.1, un protocolo abierto que guarda el contexto dentro del propio proyecto (el repositorio) para cambiar de asistente o de computadora sin perder el hilo.',
					'Puse en producción Daniela en wunutrition.com: una asistente de compra con Gemini que responde con el catálogo real, arma combos y maneja el carrito con permiso de la clienta.',
					'Diseñé Jossue AI y Blob (Bloqio Builder): asistentes que solo hablan de lo que conocen, responden con un formato fijo, tienen límite de uso y pasan por revisión de una persona.',
					'Programo con agentes de IA (Claude Code, Codex, Cursor) con el mismo orden en cada entrega: contexto, plan, código, pruebas y documentación.',
				],
				en: [
					'I built and released MADRE (version 0.5.2): a room on your computer where Codex, Claude Code, Gemini CLI and OpenCode work on the same project, share memory and change nothing without permission. In a test room it saved 496,894 tokens (the unit AI usage is billed in) over seven turns.',
					'I created AHP+ 1.4.1, an open protocol that keeps project context inside the repository so you can switch assistant or computer without losing the thread.',
					'I shipped Daniela to production on wunutrition.com: a Gemini shopping assistant that answers with the real catalog, builds bundles and manages the cart with the shopper’s permission.',
					'I designed Jossue AI and Blob (Bloqio Builder): assistants that only talk about what they know, answer in a fixed format, have usage limits and go through human review.',
					'I code with AI agents (Claude Code, Codex, Cursor) in the same order every time: context, plan, code, tests and documentation.',
				],
			},
		},
		{
			role: {
				es: 'Head of E-commerce & Digital Growth',
				en: 'Head of E-commerce & Digital Growth',
			},
			org: 'WU Nutrition / Come Verde',
			period: { es: 'Nov 2025 – Actualidad', en: 'Nov 2025 – Present' },
			highlights: {
				es: [
					'Dirijo el ecommerce de WU Nutrition (tienda propia en Shopify) y el canal digital de Come Verde (retail y marketplaces), con el presupuesto y el P&L del canal a mi cargo.',
					'Junté en un solo tablero la tienda, la conversión, la publicidad, la base de clientes (CRM) y la analítica, para que el equipo decida con los mismos números.',
					'Programo yo mismo lo que sube a la tienda: fichas de producto, colecciones, páginas de campaña, carrito lateral y botón de compra fijo. También construí Daniela, la asistente que atiende en wunutrition.com con el catálogo real.',
					'Armé Growth OS, la herramienta con IA con la que el equipo revisa publicidad, marca y resultados. Nada se ejecuta sin que una persona lo apruebe.',
					'Doy seguimiento a los indicadores de retail (activaciones, rotación) y de venta directa en la misma revisión semanal.',
					'Dejo documentado cada proceso para que el equipo lo pueda mantener sin depender de mí.',
				],
				en: [
					'I lead ecommerce at WU Nutrition (its own Shopify store) and the digital channel at Come Verde (retail and marketplaces), with the channel budget and P&L on me.',
					'I put the store, conversion, advertising, the customer base (CRM) and analytics on one dashboard so the team decides with the same numbers.',
					'I write the store code myself: product pages, collections, campaign pages, cart drawer and sticky buy button. I also built Daniela, the assistant that serves wunutrition.com shoppers with the real catalog.',
					'I built Growth OS, the AI tool the team uses to review ads, brand and results. Nothing runs until a person approves it.',
					'I track retail indicators (activations, velocity) and direct sales in the same weekly review.',
					'I document every process so the team can maintain it without depending on me.',
				],
			},
		},
		{
			role: {
				es: 'Fundador / Shopify Product Builder',
				en: 'Founder / Shopify Product Builder',
			},
			org: 'Bloqio',
			period: { es: '2026 – Actualidad', en: '2026 – Present' },
			highlights: {
				es: [
					'Diseño y programo productos para tiendas Shopify que quieren vender más.',
					'Hice dos apps para Shopify: Prometeo (barra superior de avisos) y Hermes (botón de compra fijo), con su panel dentro del admin.',
					'Bloqio Builder, hoy en beta privada: armas tu sitio con bloques, lo ves en computadora y celular, y Blob, el asistente con IA, te ayuda a escribirlo.',
					'Lo construyo con React, TypeScript, Node y Postgres, y con AHP+ para pasar el trabajo entre asistentes de IA sin perder el hilo.',
				],
				en: [
					'I design and code products for Shopify stores that want to sell more.',
					'I made two Shopify apps: Prometeo (announcement top bar) and Hermes (sticky add to cart), each with its panel inside the admin.',
					'Bloqio Builder, now in private beta: you build your site with blocks, preview it on desktop and phone, and Blob, the AI assistant, helps you write it.',
					'I build it with React, TypeScript, Node and Postgres, plus AHP+ to hand work between AI assistants without losing the thread.',
				],
			},
		},
		{
			role: {
				es: 'Coordinador de Proyectos Digitales',
				en: 'Digital Project Coordinator',
			},
			org: 'Corporativo IMT (Innovación Médica y Tecnológica)',
			period: { es: 'Mar 2025 – Nov 2025', en: 'Mar 2025 – Nov 2025' },
			highlights: {
				es: [
					'Dirigí la estrategia de marketing digital, el desarrollo web comercial y el branding de 8 marcas.',
					'Abrí nuevos canales para conseguir clientes a partir de lo que mostraban los datos.',
					'Planeé y operé publicidad pagada y SEO para conseguir prospectos con interés real (leads calificados).',
				],
				en: [
					'I led digital marketing, commercial websites and branding for 8 brands.',
					'I opened new channels to win customers based on what the data showed.',
					'I planned and ran paid advertising and SEO to bring in qualified leads.',
				],
			},
		},
		{
			role: {
				es: 'Digital Sales Account Manager',
				en: 'Digital Sales Account Manager',
			},
			org: 'HP Inc.',
			period: { es: 'Nov 2021 – Feb 2025', en: 'Nov 2021 – Feb 2025' },
			highlights: {
				es: [
					'Llevé la estrategia comercial y de demanda con los retailers clave de México y Perú: las ventas por trimestre subieron +21% en México y +35% en Perú.',
					'La participación de mercado de HP creció +4% en México (2024) y +6% en Perú.',
					'Hice crecer el canal online y coordiné campañas en tienda física y en línea durante las temporadas fuertes.',
					'Compré publicidad digital segmentada según cada objetivo comercial.',
				],
				en: [
					'I ran commercial and demand strategy with key retailers in Mexico and Peru: quarterly sales grew +21% in Mexico and +35% in Peru.',
					'HP market share grew +4% in Mexico (2024) and +6% in Peru.',
					'I grew the online channel and coordinated in-store and online campaigns during peak seasons.',
					'I bought digital advertising segmented by each commercial goal.',
				],
			},
		},
		{
			role: {
				es: 'Senior Paid Media',
				en: 'Senior Paid Media',
			},
			org: 'Farmalisto México',
			period: { es: 'Oct 2020 – Nov 2021', en: 'Oct 2020 – Nov 2021' },
			highlights: {
				es: [
					'Llevé el reconocimiento de marca y el posicionamiento digital, con +22% en conversión en medios de pago por clic (CPC).',
					'Manejé campañas para atraer clientes en varios canales.',
					'Combiné SEO y publicidad pagada con presupuestos de más de $1 MDP al mes.',
				],
				en: [
					'I led brand awareness and digital positioning, with +22% conversion on pay-per-click (CPC) media.',
					'I managed campaigns to attract customers across several channels.',
					'I combined SEO and paid advertising with budgets above $1M MXN a month.',
				],
			},
		},
		{
			role: {
				es: 'Experiencia adicional',
				en: 'Additional experience',
			},
			org: 'Estrasol · Grupo Megamex',
			period: { es: '2017 – 2020', en: '2017 – 2020' },
			highlights: {
				es: [
					'Estratega SEM — Estrasol (Mar 2019 – Oct 2020).',
					'Brand Manager — Grupo Megamex (Ene 2017 – Mar 2019).',
				],
				en: [
					'SEM Strategist — Estrasol (Mar 2019 – Oct 2020).',
					'Brand Manager — Grupo Megamex (Jan 2017 – Mar 2019).',
				],
			},
		},
	],
	education: {
		es: [
			'Licenciatura en Mercadotecnia — Universidad de Guadalajara | 2013 – 2018',
			'Bachillerato Especializado en Sistemas y Redes — COBAEJ | 2009 – 2012',
			'Fundamentos de Prompting para IA, Publicidad en Motores de Búsqueda, Google Analytics y Tag Manager — Google Academy | 2025',
			'Prácticas Éticas Comerciales y Desarrollo de Estrategias Producto-Precio — HP Education Services | 2023',
		],
		en: [
			'B.A. in Marketing — Universidad de Guadalajara | 2013 – 2018',
			'Specialized High School Diploma in Systems and Networks — COBAEJ | 2009 – 2012',
			'AI Prompting Fundamentals, Search Engine Advertising, Google Analytics and Tag Manager — Google Academy | 2025',
			'Ethical Commercial Practices and Product-Price Strategy Development — HP Education Services | 2023',
		],
	},
	languages: {
		es: ['Español nativo', 'Inglés B1'],
		en: ['Native Spanish', 'English B1'],
	},
	links: [
		{
			label: { es: 'LinkedIn', en: 'LinkedIn' },
			href: 'https://www.linkedin.com/in/jossue-alcala',
			event: 'click_linkedin',
		},
		{
			label: { es: 'Perfil Bloqio', en: 'Bloqio profile' },
			href: 'https://bloqio.app/jossuealcala/',
			event: 'outbound_project_click',
		},
		{
			label: { es: 'Google Skillshop', en: 'Google Skillshop' },
			href: 'https://skillshop.credential.net/profile/jossuealcala9406/wallet',
			event: 'outbound_project_click',
		},
	],
	limitations: {
		es: [
			'El PDF descargable refleja el CV al 13 abr 2026; el sitio actualiza rol y capacidades al 19 jul 2026.',
			'KPIs comerciales de HP/Farmalisto se publican tal como aparecen en el CV; no se extrapolan a WU, Come Verde ni Bloqio.',
			'Métricas Bloqio (usuarios, páginas, MRR, satisfacción) permanecen sin publicar hasta fecha, definición, fuente y permiso.',
			'Marcas o unidades omitidas por decisión editorial no aparecen en títulos ni rutas públicas.',
		],
		en: [
			'The downloadable PDF reflects the CV as of 13 Apr 2026; the site updates role and capabilities as of 19 Jul 2026.',
			'HP/Farmalisto commercial KPIs are published as stated in the CV; they are not extrapolated to WU, Come Verde, or Bloqio.',
			'Bloqio metrics (users, pages, MRR, satisfaction) remain unpublished until date, definition, source, and permission exist.',
			'Brands or units omitted by editorial decision do not appear in public titles or routes.',
		],
	},
} as const;

export function profileCopy(locale: Locale) {
	return {
		headline: profile.headline[locale],
		subheadline: profile.subheadline[locale],
		summary: profile.summary[locale],
		skills: profile.skills[locale],
		aiCapabilities: profile.aiCapabilities[locale],
		kpis: profile.kpis.map((item) => ({
			label: item.label[locale],
			value: item.value[locale],
			detail: item.detail[locale],
			source: item.source,
		})),
		experience: profile.experience.map((item) => ({
			role: item.role[locale],
			org: item.org,
			period: item.period[locale],
			highlights: item.highlights[locale],
		})),
		education: profile.education[locale],
		languages: profile.languages[locale],
		links: profile.links.map((link) => ({
			label: link.label[locale],
			href: link.href,
			event: link.event,
		})),
		limitations: profile.limitations[locale],
		cvDownload: profile.cvDownload,
		cvPdfAsOf: profile.cvPdfAsOf,
	};
}

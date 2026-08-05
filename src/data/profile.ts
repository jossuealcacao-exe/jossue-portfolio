import type { Locale } from './i18n';

export const profile = {
	name: 'Jossue Alcalá',
	asOf: '2026-07-19',
	cvPdfAsOf: '2026-04-13',
	source: '_inputs/cv/Jossue_Alcala_CV.pdf',
	sourcePack: '_inputs/profile/master_portfolio_ai/',
	cvDownload: '/cv/Jossue-Alcala-CV.pdf',
	headline: {
		es: 'Chief Ecommerce Manager · WU Nutrition / Come Verde',
		en: 'Chief Ecommerce Manager · WU Nutrition / Come Verde',
	},
	subheadline: {
		es: 'Shopify Product · UX/CRO · Desarrollo web · IA aplicada',
		en: 'Shopify Product · UX/CRO · Web Development · Applied AI',
	},
	summary: {
		es: 'Especialista en ecommerce con más de ocho años de experiencia en growth, paid media, SEO y optimización digital. Trabajo entre negocio y ejecución para diseñar experiencias Shopify, conectar medición y convertir prioridades comerciales en soluciones operables.',
		en: 'Ecommerce specialist with more than eight years of experience across growth, paid media, SEO, and digital optimization. I work between business and delivery to design Shopify experiences, connect measurement, and turn commercial priorities into operable solutions.',
	},
	skills: {
		es: [
			'Shopify, Liquid, Theme Customization, Theme App Extensions, App Embeds, Shopify CLI, Polaris, App Bridge',
			'CRO, e-commerce growth, UX comercial, PDP/PLP, search, trust, cart drawers, sticky ATC, landing systems',
			'HTML, CSS, JavaScript/TypeScript, React, Node, Prisma, PostgreSQL, GitHub, Railway, Cloudflare',
			'Performance marketing, paid media, SEO, GA4, GTM, Search Console, SEMrush, Screaming Frog, Looker Studio, Odoo, Klaviyo',
			'Programación integral con IA: Claude Code, Codex, Cursor, ChatGPT; AHP, handoffs, QA y documentación operativa',
			'Automatizaciones de negocio: Growth OS, MCPs, dashboards/scorecards, auditorías paid media, brand strategy layer con guardrails y aprobación humana',
		],
		en: [
			'Shopify, Liquid, theme customization, Theme App Extensions, App Embeds, Shopify CLI, Polaris, App Bridge',
			'CRO, e-commerce growth, commerce UX, PDP/PLP, search, trust, cart drawers, sticky ATC, landing systems',
			'HTML, CSS, JavaScript/TypeScript, React, Node, Prisma, PostgreSQL, GitHub, Railway, Cloudflare',
			'Performance marketing, paid media, SEO, GA4, GTM, Search Console, SEMrush, Screaming Frog, Looker Studio, Odoo, Klaviyo',
			'AI-assisted full-stack programming: Claude Code, Codex, Cursor, ChatGPT; AHP, handoffs, QA, and operational documentation',
			'Business automations: Growth OS, MCPs, dashboards/scorecards, paid-media audits, brand-strategy layer with guardrails and human approval',
		],
	},
	aiCapabilities: {
		es: [
			'IA en producto: asistentes con acciones tipadas, validación server-side, rate limits, fallback y reversión (Blob en Bloqio Builder; Daniela en WU).',
			'Desarrollo asistido por agentes con flujo contexto → alcance → plan → ejecución → build/tests → handoff → documentación.',
			'Sistemas Operativos de IA: SO de Ingeniería de Prompts v1.0.0 (15 jul 2026), AHP, adaptadores multiplataforma.',
			'IA empresarial: copiloto con fuentes Odoo/Shopify/GA4/ads/Klaviyo, discrepancias visibles y sin acciones automáticas sin autorización.',
			'Análisis comercial asistido: auditorías Meta, inventario creativo, planes de recuperación, scorecards y síntesis ejecutiva.',
		],
		en: [
			'Product AI: assistants with typed actions, server-side validation, rate limits, fallback, and revert (Blob in Bloqio Builder; Daniela at WU).',
			'Agent-assisted development with context → scope → plan → execution → build/tests → handoff → documentation.',
			'AI Operating Systems: Prompt Engineering OS v1.0.0 (15 Jul 2026), AHP, multiplatform adapters.',
			'Enterprise AI: copilot over Odoo/Shopify/GA4/ads/Klaviyo sources, visible discrepancies, no automatic actions without approval.',
			'Assisted commercial analysis: Meta audits, creative inventory, recovery plans, scorecards, and executive synthesis.',
		],
	},
	kpis: [
		{
			label: { es: 'Experiencia profesional', en: 'Professional experience' },
			value: { es: '+8 años', en: '+8 years' },
			detail: {
				es: 'Growth, paid media, SEO y optimización digital.',
				en: 'Growth, paid media, SEO, and digital optimization.',
			},
			source: 'CV 2026-04-13',
		},
		{
			label: { es: 'HP Inc. · ventas / trimestre', en: 'HP Inc. · sales / quarter' },
			value: { es: '+21% MX · +35% PE', en: '+21% MX · +35% PE' },
			detail: {
				es: 'Estrategias comerciales y de demanda para retailers clave.',
				en: 'Commercial and demand strategies for key retailers.',
			},
			source: 'CV 2026-04-13',
		},
		{
			label: { es: 'HP Inc. · participación de mercado', en: 'HP Inc. · market share' },
			value: { es: '+4% MX · +6% PE', en: '+4% MX · +6% PE' },
			detail: {
				es: 'Impacto en México durante 2024 y en el periodo de HP Perú.',
				en: 'Impact in Mexico during 2024 and across the HP Peru period.',
			},
			source: 'CV 2026-04-13',
		},
		{
			label: { es: 'Farmalisto · conversión paid', en: 'Farmalisto · paid conversion' },
			value: { es: '+22%', en: '+22%' },
			detail: {
				es: 'Awareness y posicionamiento en plataformas CPC.',
				en: 'Awareness and positioning across CPC platforms.',
			},
			source: 'CV 2026-04-13',
		},
		{
			label: { es: 'Farmalisto · presupuesto medios', en: 'Farmalisto · media budget' },
			value: { es: '>$1 MDP/mes', en: '>$1M MXN/mo' },
			detail: {
				es: 'Estrategias SEO y paid media a esa escala.',
				en: 'SEO and paid media strategies at that scale.',
			},
			source: 'CV 2026-04-13',
		},
		{
			label: { es: 'LCV · LCP mobile (campo)', en: 'LCV · mobile LCP (field)' },
			value: { es: '3.6 s CrUX', en: '3.6 s CrUX' },
			detail: {
				es: 'Análisis de experiencia y rendimiento de La Carnicería Virtual.',
				en: 'Experience and performance analysis for La Carnicería Virtual.',
			},
			source: 'Caso LCV',
		},
	],
	experience: [
		{
			role: {
				es: 'Chief Ecommerce Manager',
				en: 'Chief Ecommerce Manager',
			},
			org: 'WU Nutrition / Come Verde',
			period: { es: 'Nov 2025 – Actualidad', en: 'Nov 2025 – Present' },
			highlights: {
				es: [
					'Coordino y desarrollo la operación ecommerce y growth digital de WU Nutrition (DTC Shopify) y Come Verde (CPG retail + marketplaces).',
					'Conecto storefront, CRO, paid media, CRM, analítica y documentación operativa en un solo sistema de decisión.',
					'Implemento componentes Shopify (PDP/PLP, landings, cart drawer, sticky ATC, trust) y producto conversacional conectado con datos comerciales de Shopify.',
					'Opero Growth OS y una capa de IA empresarial: scorecards, optimización de paid media, estrategia de marca con Claude, MCPs y aprobación humana.',
					'Coordino estrategias comerciales online y monitoreo KPIs CPG (brand building, activaciones, rotación) y métricas DTC.',
					'Documento procesos técnicos y operativos para mantenimiento, continuidad y escalabilidad del equipo.',
				],
				en: [
					'I coordinate and build the ecommerce and digital growth operation of WU Nutrition (Shopify DTC) and Come Verde (CPG retail + marketplaces).',
					'I connect storefront, CRO, paid media, CRM, analytics, and operational documentation into one decision system.',
					'I implement Shopify components (PDP/PLP, landings, cart drawer, sticky ATC, trust) and a conversational product connected to Shopify commerce data.',
					'I run Growth OS and an enterprise AI layer: scorecards, paid-media optimization, Claude brand strategy, MCPs, and human approval.',
					'I coordinate online commercial strategies and monitor CPG KPIs (brand building, activations, velocity) and DTC metrics.',
					'I document technical and operational processes for maintenance, continuity, and team scalability.',
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
					'Conceptualización y desarrollo de productos digitales orientados a conversión para merchants Shopify.',
					'Apps CRO: Prometeo (Top Bar) y Hermes (Sticky Add to Cart) con Theme App Extensions, admin embedded y compliance.',
					'Bloqio Builder: creador web con IA (Blob), esquema JSON, bloques, revisión guiada y preparación para publicar.',
					'Stack con Shopify CLI, React/TypeScript, GitHub, Railway/Cloudflare y flujos AHP entre agentes.',
				],
				en: [
					'Concept and development of conversion-oriented digital products for Shopify merchants.',
					'CRO apps: Prometeo (Top Bar) and Hermes (Sticky Add to Cart) with Theme App Extensions, embedded admin, and compliance.',
					'Bloqio Builder: AI website builder (Blob), JSON schema, blocks, guided review, and publish-ready flow.',
					'Stack with Shopify CLI, React/TypeScript, GitHub, Railway, and Cloudflare.',
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
					'Lideró estrategia de marketing digital, desarrollo web comercial y branding para 8 marcas.',
					'Diversificó canales de adquisición mediante análisis de datos, tendencias y oportunidades de crecimiento.',
					'Diseñó e implementó estrategias multicanal de paid media y SEO para captar leads calificados.',
				],
				en: [
					'Led digital marketing strategy, commercial web development, and branding for 8 brands.',
					'Diversified acquisition channels through data analysis, trends, and growth opportunities.',
					'Designed and implemented multichannel paid media and SEO strategies to capture qualified leads.',
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
					'Diseñó estrategias comerciales y de demanda para retailers clave en México y Perú (+21% ventas/Q MX, +35% PE).',
					'Impacto en participación de mercado: +4% HP México (2024) y +6% HP Perú.',
					'Impulsó el canal online y coordinó campañas omnicanal en temporadas clave.',
					'Gestionó compra de medios digitales segmentados para soportar objetivos comerciales.',
				],
				en: [
					'Designed commercial and demand strategies for key retailers in Mexico and Peru (+21% sales/Q MX, +35% PE).',
					'Market-share impact: +4% HP Mexico (2024) and +6% HP Peru.',
					'Drove the online channel and coordinated omnichannel campaigns in key seasons.',
					'Managed segmented digital media buying to support commercial goals.',
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
					'Lideró awareness y posicionamiento digital con +22% en conversión vía medios CPC.',
					'Gestionó campañas de adquisición multicanal.',
					'Combinó SEO y paid media con budgets superiores a $1 MDP/mes.',
				],
				en: [
					'Led digital awareness and positioning with +22% conversion via CPC media.',
					'Managed multichannel acquisition campaigns.',
					'Combined SEO and paid media with budgets above $1M MXN/month.',
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

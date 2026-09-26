import { routes, type Locale } from './i18n';

export type ProductSlug = 'madre' | 'bloqio-builder' | 'daniela' | 'desarrollo-web' | 'ia-aplicada';

type LocalizedText = Record<Locale, string>;

export type CommercialProduct = {
	slug: ProductSlug;
	kind: 'service-product' | 'owned-product';
	category: LocalizedText;
	title: LocalizedText;
	promise: LocalizedText;
	summary: LocalizedText;
	idealFor: LocalizedText;
	included: Record<Locale, string[]>;
	process: Record<Locale, string[]>;
	proofSlugs: string[];
	visualSlug: string;
	status?: LocalizedText;
};

export const commercialProducts: CommercialProduct[] = [
	{
		slug: 'madre',
		kind: 'owned-product',
		category: { es: 'Producto propio · Coordinación de IA', en: 'Owned product · AI coordination' },
		title: { es: 'MADRE', en: 'MADRE' },
		promise: {
			es: 'Un lugar compartido para coordinar personas y agentes sin perder contexto, autoría ni control.',
			en: 'A shared place to coordinate people and agents without losing context, authorship, or control.',
		},
		summary: {
			es: 'MADRE reúne conversación, memoria consultable, permisos explícitos y entregas revisables. Es un producto dentro del portfolio, no el nombre de la tienda.',
			en: 'MADRE brings together conversation, searchable memory, explicit permissions, and reviewable deliveries. It is a product inside the portfolio, not the store name.',
		},
		idealFor: {
			es: 'Proyectos donde una persona trabaja con varios agentes y necesita mantener claro quién propone, quién ejecuta y qué falta revisar.',
			en: 'Projects where one person works with several agents and needs clarity on who proposes, who executes, and what still needs review.',
		},
		included: {
			es: ['Sala compartida', 'Memoria consultable', 'Autoridad explícita por turno', 'Entregas visibles para revisión humana'],
			en: ['Shared room', 'Searchable memory', 'Explicit authority per turn', 'Visible deliveries for human review'],
		},
		process: {
			es: ['Objetivo', 'Contexto', 'Crew', 'Revisión'],
			en: ['Objective', 'Context', 'Crew', 'Review'],
		},
		proofSlugs: ['ahp-plus'],
		visualSlug: 'ahp-plus',
		status: { es: 'Producto en desarrollo', en: 'Product in development' },
	},
	{
		slug: 'bloqio-builder',
		kind: 'owned-product',
		category: { es: 'Producto propio · Constructor web con IA', en: 'Owned product · AI website builder' },
		title: { es: 'Bloqio Builder', en: 'Bloqio Builder' },
		promise: {
			es: 'Convertir una intención comercial en una página estructurada, revisable y lista para seguir construyendo.',
			en: 'Turn a commercial intent into a structured, reviewable page that is ready to keep building.',
		},
		summary: {
			es: 'Constructor web con IA, esquema JSON, bloques, revisión guiada y preparación para publicar. La IA propone dentro de un sistema visible; no sustituye la decisión del usuario.',
			en: 'An AI website builder with a JSON schema, blocks, guided review, and a publish-ready flow. AI proposes inside a visible system; it does not replace the user’s decision.',
		},
		idealFor: {
			es: 'Equipos que necesitan explorar y revisar una página comercial sin perder estructura ni control sobre el resultado.',
			en: 'Teams that need to explore and review a commercial page without losing structure or control over the result.',
		},
		included: {
			es: ['Definición del objetivo', 'Estructura por bloques', 'Asistencia guiada', 'Revisión antes de publicar'],
			en: ['Goal definition', 'Block-based structure', 'Guided assistance', 'Review before publishing'],
		},
		process: {
			es: ['Intención', 'Estructura', 'Construcción', 'Revisión'],
			en: ['Intent', 'Structure', 'Build', 'Review'],
		},
		proofSlugs: ['bloqio-builder'],
		visualSlug: 'bloqio-builder',
		status: { es: 'Producto en desarrollo', en: 'Product in development' },
	},
	{
		slug: 'daniela',
		kind: 'owned-product',
		category: { es: 'Producto de IA · Ecommerce', en: 'AI product · Ecommerce' },
		title: { es: 'Daniela', en: 'Daniela' },
		promise: {
			es: 'Acompañar decisiones de compra con información comercial de WU y acciones siempre revisables.',
			en: 'Support purchase decisions with WU commercial information and actions that remain reviewable.',
		},
		summary: {
			es: 'Asistente de IA para ecommerce conectado con datos comerciales de Shopify. Sus acciones son tipadas, se validan en servidor y contemplan límites, fallback y reversión.',
			en: 'An ecommerce AI assistant connected to Shopify commercial data. Its actions are typed, validated server-side, and designed with limits, fallback, and revert paths.',
		},
		idealFor: {
			es: 'Experiencias ecommerce donde la asistencia necesita contexto real del catálogo y límites claros antes de actuar.',
			en: 'Ecommerce experiences where assistance needs real catalog context and clear boundaries before taking action.',
		},
		included: {
			es: ['Caso de uso y fuentes', 'Acciones tipadas', 'Validación y límites', 'Fallback y reversión'],
			en: ['Use case and sources', 'Typed actions', 'Validation and boundaries', 'Fallback and revert'],
		},
		process: {
			es: ['Necesidad', 'Datos', 'Asistencia', 'Control'],
			en: ['Need', 'Data', 'Assistance', 'Control'],
		},
		proofSlugs: ['wu-nutrition'],
		visualSlug: 'wu-nutrition',
		status: { es: 'Sistema aplicado en WU', en: 'System applied at WU' },
	},
	{
		slug: 'desarrollo-web',
		kind: 'service-product',
		category: { es: 'Servicio · Producto digital', en: 'Service · Digital product' },
		title: { es: 'Desarrollo Web', en: 'Web Development' },
		promise: {
			es: 'Construir una tienda o producto web pensado para vender, operar y poder mantenerse.',
			en: 'Build a store or web product designed to sell, operate, and remain maintainable.',
		},
		summary: {
			es: 'Diseño y desarrollo storefronts, temas, componentes, integraciones y productos web. El alcance parte del problema comercial y termina con QA y una entrega documentada.',
			en: 'I design and build storefronts, themes, components, integrations, and web products. Scope starts from the commercial problem and ends with QA and a documented delivery.',
		},
		idealFor: {
			es: 'Marcas que necesitan lanzar, reconstruir o extender una experiencia comercial digital.',
			en: 'Brands that need to launch, rebuild, or extend a digital commercial experience.',
		},
		included: {
			es: ['Definición del alcance', 'Arquitectura y experiencia', 'Desarrollo e integración', 'QA y entrega documentada'],
			en: ['Scope definition', 'Architecture and experience', 'Development and integration', 'QA and documented delivery'],
		},
		process: {
			es: ['Alcance', 'Diseño', 'Construcción', 'Entrega'],
			en: ['Scope', 'Design', 'Build', 'Delivery'],
		},
		proofSlugs: ['come-verde', 'wu-nutrition', 'tiendaonline'],
		visualSlug: 'come-verde',
	},
	{
		slug: 'ia-aplicada',
		kind: 'service-product',
		category: { es: 'Servicio · Sistemas con control humano', en: 'Service · Human-controlled systems' },
		title: { es: 'IA Aplicada', en: 'Applied AI' },
		promise: {
			es: 'Convertir una tarea concreta en un sistema entendible, útil y controlable.',
			en: 'Turn a concrete task into a system that is understandable, useful, and controllable.',
		},
		summary: {
			es: 'Diseño asistentes, automatizaciones y flujos con IA alrededor de datos, permisos y revisión humana. Primero se define el trabajo; después se elige la tecnología.',
			en: 'I design AI assistants, automations, and workflows around data, permissions, and human review. The work is defined first; technology comes second.',
		},
		idealFor: {
			es: 'Equipos con una tarea repetitiva, una fuente de información clara y una persona responsable de la decisión.',
			en: 'Teams with a repetitive task, a clear information source, and a person responsible for the decision.',
		},
		included: {
			es: ['Definición del caso de uso', 'Límites y autoridad', 'Prototipo operativo', 'Pruebas, documentación y siguiente paso'],
			en: ['Use-case definition', 'Boundaries and authority', 'Working prototype', 'Tests, documentation, and next step'],
		},
		process: {
			es: ['Tarea', 'Datos', 'Control', 'Prueba'],
			en: ['Task', 'Data', 'Control', 'Test'],
		},
		proofSlugs: ['bloqio-builder', 'ahp-plus'],
		visualSlug: 'bloqio-builder',
	},
];

export function commercialProduct(slug: string) {
	return commercialProducts.find((product) => product.slug === slug);
}

export function productHref(product: CommercialProduct, locale: Locale) {
	return product.slug === 'madre' ? routes[locale].madre : `${routes[locale].products}${product.slug}/`;
}

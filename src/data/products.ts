import { routes, type Locale } from './i18n';

export type ProductSlug = 'auditoria-ecommerce' | 'cro-crecimiento' | 'shopify-desarrollo-web' | 'ia-aplicada' | 'madre';

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
		slug: 'auditoria-ecommerce',
		kind: 'service-product',
		category: { es: 'Diagnóstico comercial', en: 'Commercial diagnosis' },
		title: { es: 'Auditoría ecommerce', en: 'Ecommerce audit' },
		promise: {
			es: 'Saber qué está frenando la compra y qué conviene resolver primero.',
			en: 'See what is getting in the way of a purchase and what is worth fixing first.',
		},
		summary: {
			es: 'Reviso el recorrido, la propuesta, la experiencia móvil y los puntos de decisión. La entrega separa hallazgos, prioridades y próximos pasos para que el diagnóstico pueda convertirse en trabajo real.',
			en: 'I review the journey, proposition, mobile experience, and decision points. The delivery separates findings, priorities, and next steps so the diagnosis can become real work.',
		},
		idealFor: {
			es: 'Tiendas con tráfico o inversión activa que no tienen claro dónde se pierde la intención de compra.',
			en: 'Stores with active traffic or investment that cannot see where purchase intent is being lost.',
		},
		included: {
			es: ['Lectura del recorrido comercial', 'Revisión de fricciones UX/CRO', 'Prioridades explicadas en lenguaje claro', 'Ruta de trabajo para la siguiente etapa'],
			en: ['Commercial journey review', 'UX/CRO friction review', 'Priorities explained in plain language', 'A working route for the next stage'],
		},
		process: {
			es: ['Contexto', 'Recorrido', 'Prioridad', 'Recomendación'],
			en: ['Context', 'Journey', 'Priority', 'Recommendation'],
		},
		proofSlugs: ['la-carniceria-virtual'],
		visualSlug: 'la-carniceria-virtual',
	},
	{
		slug: 'cro-crecimiento',
		kind: 'service-product',
		category: { es: 'Optimización continua', en: 'Continuous optimization' },
		title: { es: 'CRO y crecimiento', en: 'CRO and growth' },
		promise: {
			es: 'Convertir más con una experiencia comercial que se pueda medir y mejorar.',
			en: 'Convert more with a commercial experience that can be measured and improved.',
		},
		summary: {
			es: 'Trabajo sobre momentos concretos del recorrido: descubrimiento, producto, confianza, carrito y seguimiento. Cada cambio parte de una hipótesis visible y termina con una forma de revisarlo.',
			en: 'I work on specific moments in the journey: discovery, product, trust, cart, and follow-up. Every change starts with a visible hypothesis and ends with a way to review it.',
		},
		idealFor: {
			es: 'Equipos que ya venden online y necesitan ordenar oportunidades, experiencia y ejecución.',
			en: 'Teams that already sell online and need to organize opportunities, experience, and execution.',
		},
		included: {
			es: ['Lectura de señales comerciales', 'Hipótesis y priorización', 'Diseño de mejoras', 'Implementación o acompañamiento técnico'],
			en: ['Commercial signal review', 'Hypotheses and prioritization', 'Improvement design', 'Implementation or technical support'],
		},
		process: {
			es: ['Señal', 'Hipótesis', 'Cambio', 'Revisión'],
			en: ['Signal', 'Hypothesis', 'Change', 'Review'],
		},
		proofSlugs: ['wu-nutrition', 'bloqio-cro-apps', 'come-verde'],
		visualSlug: 'wu-nutrition',
	},
	{
		slug: 'shopify-desarrollo-web',
		kind: 'service-product',
		category: { es: 'Construcción digital', en: 'Digital build' },
		title: { es: 'Shopify y desarrollo web', en: 'Shopify and web development' },
		promise: {
			es: 'Construir una tienda o producto web pensado para vender y para poder mantenerse.',
			en: 'Build a store or web product designed to sell and remain maintainable.',
		},
		summary: {
			es: 'Diseño y desarrollo la experiencia completa o la pieza que falta: storefront, tema, componentes, integración o producto web. El objetivo es que el resultado sirva al negocio y pueda seguir operándose.',
			en: 'I design and build the full experience or the missing piece: storefront, theme, components, integration, or web product. The goal is a result that serves the business and can keep operating.',
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
		category: { es: 'Sistemas con control humano', en: 'Human-controlled systems' },
		title: { es: 'IA aplicada', en: 'Applied AI' },
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
			es: 'MADRE es un producto de coordinación: reúne conversación, memoria consultable, permisos explícitos y entregas revisables. No es el nombre de la tienda ni una capa decorativa del sitio.',
			en: 'MADRE is a coordination product: it brings together conversation, searchable memory, explicit permissions, and reviewable deliveries. It is not the store name or a decorative site layer.',
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
];

export function commercialProduct(slug: string) {
	return commercialProducts.find((product) => product.slug === slug);
}

export function productHref(product: CommercialProduct, locale: Locale) {
	return product.slug === 'madre' ? routes[locale].madre : `${routes[locale].products}${product.slug}/`;
}


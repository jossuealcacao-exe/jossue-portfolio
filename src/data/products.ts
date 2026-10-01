import { routes, type Locale } from './i18n';

export type ProductSlug = 'madre' | 'ahp-plus' | 'bloqio-builder' | 'daniela' | 'miawseo' | 'chatbots' | 'consultoria' | 'desarrollo-web' | 'ia-aplicada';

/** Video de demostración: horizontal para pantallas anchas y vertical para teléfonos, sin audio. */
export type ProductDemo = { wide: string; tall: string; label: string; alt: string; credit?: string };

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
	/** Producto destacado: va arriba en la portada y en el catálogo, con su video. */
	featured?: boolean;
	demo?: Record<Locale, ProductDemo>;
};

export const commercialProducts: CommercialProduct[] = [
	{
		slug: 'madre',
		kind: 'owned-product',
		category: { es: 'Producto estrella · Agentes de IA', en: 'Flagship product · AI agents' },
		title: { es: 'MADRE', en: 'MADRE' },
		promise: {
			es: 'Tus agentes de código trabajando juntos, en una sola sala y con una sola memoria.',
			en: 'Your coding agents working together, in one room with one memory.',
		},
		summary: {
			es: 'MADRE abre una sala en tu navegador donde Codex, Claude Code, Gemini CLI y OpenCode leen la misma conversación, se pasan el trabajo y recuerdan lo que se decidió. Solo editan tu código cuando tú subes el permiso. Es gratis, de código abierto y corre en tu computadora.',
			en: 'MADRE opens a room in your browser where Codex, Claude Code, Gemini CLI and OpenCode read the same conversation, hand work to each other and remember what was decided. They only edit your code when you raise the permission. It is free, open source and runs on your machine.',
		},
		idealFor: {
			es: 'Quien ya usa uno o varios agentes de código y está cansado de copiar y pegar entre ellos, o de explicarle el proyecto a cada uno desde cero.',
			en: 'Anyone already using one or more coding agents who is tired of copying and pasting between them, or of explaining the project to each one from scratch.',
		},
		included: {
			es: ['Una sala para cuatro agentes', 'Memoria del proyecto en tu equipo', 'Permisos que subes tú, con copia y deshacer', 'Ahorro de tokens a la vista (ASH)'],
			en: ['One room for four agents', 'Project memory on your machine', 'Permissions you raise, with a copy and undo', 'Visible token savings (ASH)'],
		},
		process: {
			es: ['Instalas', 'Preguntas', 'Construyen', 'Revisas'],
			en: ['Install', 'Ask', 'Build', 'Review'],
		},
		proofSlugs: ['ahp-plus'],
		visualSlug: 'ahp-plus',
		status: { es: 'Beta pública · Gratis · 0.5.2', en: 'Public beta · Free · 0.5.2' },
		featured: true,
		demo: {
			es: { wide: '/videos/madre/madre-anuncio', tall: '/videos/madre/madre-vertical', label: 'Demo · 30 s', alt: 'Demo de MADRE: cuatro agentes trabajan en la misma conversación, construyen un sitio y la sala muestra los tokens ahorrados.' },
			en: { wide: '/videos/madre/madre-anuncio', tall: '/videos/madre/madre-vertical', label: 'Demo · 30 s', alt: 'MADRE demo: four agents work in the same conversation, build a website, and the room shows the tokens saved.' },
		},
	},
	{
		slug: 'ahp-plus',
		kind: 'owned-product',
		category: { es: 'Producto propio · Memoria para agentes', en: 'Owned product · Memory for agents' },
		title: { es: 'AHP+', en: 'AHP+' },
		promise: {
			es: 'La memoria de tu proyecto, guardada en tu repositorio, para que cualquier agente siga donde quedó el anterior.',
			en: 'Your project’s memory, kept in your repository, so any agent picks up where the last one stopped.',
		},
		summary: {
			es: 'AHP+ guarda con Git el estado del proyecto, las decisiones y las pruebas en una carpeta .ahp/. Si cambias de Codex a Claude Code, Cursor u OpenCode, o de computadora, el siguiente agente lee lo mismo y comprueba proyecto, rama y commit antes de tocar nada. Nunca hace commit ni push por ti.',
			en: 'AHP+ keeps your project’s state, decisions and test results in a .ahp/ folder, with Git. If you switch from Codex to Claude Code, Cursor or OpenCode, or to another machine, the next agent reads the same thing and checks project, branch and commit before touching anything. It never commits or pushes for you.',
		},
		idealFor: {
			es: 'Quien trabaja con agentes desde su IDE y cambia seguido de agente, de cuenta o de computadora.',
			en: 'Anyone working with agents from their IDE who often switches agent, account or machine.',
		},
		included: {
			es: ['Estado, decisiones y pruebas en .ahp/', 'Relevos entre agentes que se comprueban', 'Puntos de control para retomar una sesión', 'Sin dependencias: Node y Git'],
			en: ['State, decisions and test results in .ahp/', 'Checked handoffs between agents', 'Checkpoints to resume a session', 'No dependencies: Node and Git'],
		},
		process: {
			es: ['Instalas', 'Trabajas', 'Entregas', 'El otro comprueba'],
			en: ['Install', 'Work', 'Hand off', 'The next one checks'],
		},
		proofSlugs: ['ahp-plus'],
		visualSlug: 'ahp-plus',
		status: { es: 'Gratis · Código abierto · 1.4.1', en: 'Free · Open source · 1.4.1' },
		featured: true,
		demo: {
			es: { wide: '/videos/ahp/ahp-es', tall: '/videos/ahp/ahp-es-mobile', label: 'Demo · 36 s', alt: 'Demo de AHP+: el proyecto guarda su estado en .ahp/, Codex entrega el trabajo a Cursor y Cursor comprueba proyecto, rama y commit antes de seguir.' },
			en: { wide: '/videos/ahp/ahp-en', tall: '/videos/ahp/ahp-en-mobile', label: 'Demo · 36 s', alt: 'AHP+ demo: the project keeps its state in .ahp/, Codex hands the work to Cursor, and Cursor checks project, branch and commit before continuing.' },
		},
	},
	{
		slug: 'bloqio-builder',
		kind: 'owned-product',
		category: { es: 'Producto propio · Constructor web con IA', en: 'Owned product · AI website builder' },
		title: { es: 'Bloqio Builder', en: 'Bloqio Builder' },
		promise: {
			es: 'Dile qué quieres vender y te arma una página ordenada, que puedes revisar y seguir editando.',
			en: 'Tell it what you want to sell and it builds a tidy page you can review and keep editing.',
		},
		summary: {
			es: 'Un constructor de páginas con IA que trabaja por bloques. La IA propone la estructura y los textos; tú revisas cada parte y decides qué se publica.',
			en: 'An AI website builder with a JSON schema, blocks, guided review, and a publish-ready flow. AI proposes inside a visible system; it does not replace the user’s decision.',
		},
		idealFor: {
			es: 'Negocios que necesitan una página de venta pronto, sin perder el control de lo que dice.',
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
		status: { es: 'En beta privada', en: 'In private beta' },
		featured: true,
		demo: {
			es: { wide: '/videos/bloqio/bloqio-demo', tall: '/videos/bloqio/bloqio-demo-mobile', label: 'Demo · 24 s', alt: 'Demo de Bloqio Builder: el editor abre la página de un bar, se cambia el titular de la portada en vivo, se revisa la vista de celular y se aplica otro tema.' },
			en: { wide: '/videos/bloqio/bloqio-demo', tall: '/videos/bloqio/bloqio-demo-mobile', label: 'Demo · 24 s (in Spanish)', alt: 'Bloqio Builder demo: the editor opens a bar’s page, the cover headline is changed live, the phone view is checked, and another theme is applied.' },
		},
	},
	{
		slug: 'daniela',
		kind: 'owned-product',
		category: { es: 'Producto de IA · Ecommerce', en: 'AI product · Ecommerce' },
		title: { es: 'Daniela', en: 'Daniela' },
		promise: {
			es: 'Una asistente que ayuda a tus clientes a elegir y comprar, con la información real de tu tienda.',
			en: 'An assistant that helps your customers choose and buy, with your store’s real information.',
		},
		summary: {
			es: 'Asistente de IA para tiendas en línea, conectada al catálogo de Shopify. Cada cosa que puede hacer está definida y se revisa antes de ejecutarse, tiene límites claros y, si algo falla, se puede regresar.',
			en: 'An AI assistant for online stores, connected to the Shopify catalog. Everything it can do is defined and checked before it runs, it has clear limits and, if something fails, it can be undone.',
		},
		idealFor: {
			es: 'Tiendas que quieren atender mejor sin que la IA invente precios, productos ni promociones.',
			en: 'Stores that want to serve customers better without the AI making up prices, products or promotions.',
		},
		included: {
			es: ['Para qué sirve y de dónde saca la información', 'Qué acciones puede hacer', 'Revisión y límites', 'Plan B y forma de deshacer'],
			en: ['What it is for and where its information comes from', 'What actions it can take', 'Review and limits', 'Plan B and a way to undo'],
		},
		process: {
			es: ['Necesidad', 'Datos', 'Asistencia', 'Control'],
			en: ['Need', 'Data', 'Assistance', 'Control'],
		},
		proofSlugs: ['wu-nutrition'],
		visualSlug: 'wu-nutrition',
		status: { es: 'En uso en wunutrition.com', en: 'Live on wunutrition.com' },
		featured: true,
		demo: {
			es: { wide: '/videos/daniela/daniela-demo', tall: '/videos/daniela/daniela-demo-mobile', label: 'Demo · 15 s', alt: 'Demo de Daniela en wunutrition.com: una clienta cuenta que duerme mal por estrés, Daniela le recomienda un producto del catálogo con su precio y lo agrega al carrito.' },
			en: { wide: '/videos/daniela/daniela-demo', tall: '/videos/daniela/daniela-demo-mobile', label: 'Demo · 15 s (in Spanish)', alt: 'Daniela demo on wunutrition.com: a shopper says she sleeps badly from stress, Daniela recommends a catalog product with its price and adds it to the cart.' },
		},
	},
	{
		slug: 'miawseo',
		kind: 'owned-product',
		category: { es: 'Producto propio · Sitio editorial', en: 'Own product · Editorial site' },
		title: { es: 'Miawseo', en: 'Miawseo' },
		promise: {
			es: 'Un museo de razas de gato que se recorre como una red de metro, con un muro de fotos de la comunidad.',
			en: 'A cat-breed museum you explore like a metro network, with a community photo wall.',
		},
		summary: {
			es: 'Lo diseñé y lo programé completo en Next.js: 20 razas con 6 salas cada una, un buscador, y la Michi Plaza, donde la gente sube fotos de su gato. Ninguna foto se publica hasta que alguien la aprueba en el panel de moderación.',
			en: 'I designed and built it end to end in Next.js: 20 breeds with 6 rooms each, a search box, and Michi Plaza, where people upload photos of their cat. No photo goes public until someone approves it in the moderation panel.',
		},
		idealFor: {
			es: 'Muestra cómo convierto mucho contenido en un recorrido fácil de seguir, y cómo abro un sitio a que la gente participe sin perder el control.',
			en: 'It shows how I turn a lot of content into a path that is easy to follow, and how I let people contribute without losing control.',
		},
		included: {
			es: ['Navegación tipo metro para 20 razas', 'Salas con historia y fichas', 'Subida de fotos con filtros contra spam', 'Panel de moderación antes de publicar'],
			en: ['Metro-style navigation for 20 breeds', 'Rooms with history and profiles', 'Photo upload with spam filters', 'Moderation panel before publishing'],
		},
		process: {
			es: ['Contenido', 'Recorrido', 'Comunidad', 'Moderación'],
			en: ['Content', 'Path', 'Community', 'Moderation'],
		},
		proofSlugs: ['miawseo'],
		visualSlug: 'miawseo',
		status: { es: 'Proyecto propio', en: 'Own project' },
		featured: true,
		demo: {
			es: { wide: '/videos/miawseo/miawseo-demo', tall: '/videos/miawseo/miawseo-demo-mobile', label: 'Demo · 22 s', credit: 'Fotos de gatos: Wikimedia Commons, con licencias libres (CC BY, CC BY-SA y dominio público). Autoría y licencia de cada foto en el repositorio de Miawseo.', alt: 'Demo de Miawseo: la portada, el buscador de la Michiteca con «sphynx», la sala del Sphynx pasando dos láminas y la Michi Plaza con las razas.' },
			en: { wide: '/videos/miawseo/miawseo-demo', tall: '/videos/miawseo/miawseo-demo-mobile', label: 'Demo · 22 s (in Spanish)', credit: 'Cat photos: Wikimedia Commons, under free licenses (CC BY, CC BY-SA and public domain). Author and license of each photo in the Miawseo repository.', alt: 'Miawseo demo: the home page, the Michiteca search with “sphynx”, the Sphynx room moving through two panels, and Michi Plaza with the breeds.' },
		},
	},
	{
		slug: 'chatbots',
		kind: 'service-product',
		category: { es: 'Servicio · IA para ecommerce', en: 'Service · AI for ecommerce' },
		title: { es: 'Chatbots inteligentes', en: 'Smart chatbots' },
		promise: {
			es: 'Un asistente que atiende, vende y consulta pedidos con tus datos reales, a cualquier hora.',
			en: 'An assistant that serves, sells and checks orders with your real data, at any hour.',
		},
		summary: {
			es: 'Construyo chatbots como Daniela y Jossue AI: conectados a tu catálogo, tus pedidos y tu CRM, con límites y seguridad del lado del servidor. Recomiendan, arman el carrito, consultan un pedido y le pasan a tu equipo los contactos listos.',
			en: 'I build chatbots like Daniela and Jossue AI: connected to your catalog, orders and CRM, with limits and security on the server side. They recommend, build the cart, check an order and hand your team ready-to-work leads.',
		},
		idealFor: {
			es: 'Tiendas y marcas que reciben las mismas preguntas todos los días, pierden ventas por dudas sin resolver o quieren atender de noche sin contratar un turno más.',
			en: 'Stores and brands that get the same questions every day, lose sales to unanswered doubts, or want to serve at night without hiring another shift.',
		},
		included: {
			es: ['Diagnóstico de lo que preguntan tus clientes', 'Conexión con tu catálogo, pedidos y CRM', 'Seguridad, límites y blindaje anti abusos (doble candado: reglas, una IA vigilante y un inspector de respuestas)', 'Lanzamiento, lectura de conversaciones y mejora', 'Opcional: archivista (base de conocimiento propia con lo que preguntan tus clientes) y destilación (una IA local entrenada con tu negocio)'],
			en: ['Diagnosis of what your customers ask', 'Connection to your catalog, orders and CRM', 'Security, limits and an anti-abuse shield (double lock: rules, an AI guard and an answer inspector)', 'Launch, conversation review and improvement', 'Optional: archivist (your own knowledge base from what customers ask) and distillation (a local AI trained on your business)'],
		},
		process: {
			es: ['Diagnóstico', 'Datos y reglas', 'Prototipo con tus datos', 'Lanzamiento y mejora'],
			en: ['Diagnosis', 'Data and rules', 'Prototype with your data', 'Launch and improvement'],
		},
		proofSlugs: ['wu-nutrition'],
		visualSlug: 'wu-nutrition',
		status: { es: 'Daniela y Jossue AI en uso', en: 'Daniela and Jossue AI live' },
		demo: {
			es: { wide: '/videos/jossue-ai/jossue-ai-demo', tall: '/videos/jossue-ai/jossue-ai-demo-mobile', label: 'Demo · Jossue AI', alt: 'Demo de Jossue AI en jossuealcala.com: se abre el chat, pregunta qué ha construido Jossué y cómo funcionaría un chatbot para una tienda Shopify, y responde en segundos.' },
			en: { wide: '/videos/jossue-ai/jossue-ai-demo', tall: '/videos/jossue-ai/jossue-ai-demo-mobile', label: 'Demo · Jossue AI (in Spanish)', alt: 'Jossue AI demo on jossuealcala.com: the chat opens, asks what Jossué has built and how a chatbot would work for a Shopify store, and answers in seconds.' },
		},
	},
	{
		slug: 'consultoria',
		kind: 'service-product',
		category: { es: 'Consultoría · Ecommerce y growth', en: 'Consulting · Ecommerce and growth' },
		title: { es: 'Consultoría', en: 'Consulting' },
		promise: {
			es: 'Te ayudo a decidir qué hacer con tu ecommerce antes de gastar en construir.',
			en: 'I help you decide what to do with your ecommerce before you spend on building.',
		},
		summary: {
			es: 'Reviso tu tienda, tu publicidad y tus números, y te digo qué te está costando ventas, qué arreglar primero y qué puede esperar. Puede ser una sesión, una auditoría con plan priorizado o acompañamiento mensual con tu equipo.',
			en: 'I review your store, your advertising and your numbers, and tell you what is costing you sales, what to fix first and what can wait. It can be a session, an audit with a prioritized plan, or monthly guidance with your team.',
		},
		idealFor: {
			es: 'Marcas y equipos que ya venden en línea (o están por lanzar) y necesitan una segunda opinión clara antes de invertir en una tienda nueva, más pauta o IA.',
			en: 'Brands and teams already selling online (or about to launch) who need a clear second opinion before investing in a new store, more ads or AI.',
		},
		included: {
			es: ['Diagnóstico de tienda, pauta y medición', 'Lo que más te está costando ventas', 'Plan priorizado: qué primero y qué después', 'Acompañamiento para ejecutarlo con tu equipo'],
			en: ['Store, ads and measurement diagnosis', 'What is costing you the most sales', 'Prioritized plan: what first and what later', 'Guidance to carry it out with your team'],
		},
		process: {
			es: ['Llamada', 'Diagnóstico', 'Plan', 'Acompañamiento'],
			en: ['Call', 'Diagnosis', 'Plan', 'Guidance'],
		},
		proofSlugs: ['la-carniceria-virtual', 'come-verde', 'wu-nutrition'],
		visualSlug: 'la-carniceria-virtual',
	},
	{
		slug: 'desarrollo-web',
		kind: 'service-product',
		category: { es: 'Servicio · Producto digital', en: 'Service · Digital product' },
		title: { es: 'Desarrollo Web', en: 'Web Development' },
		promise: {
			es: 'Tu tienda o tu producto web, hecho para vender y fácil de mantener.',
			en: 'Your store or web product, built to sell and easy to maintain.',
		},
		summary: {
			es: 'Diseño y programo tiendas en línea, temas, integraciones y productos web. Empezamos por el problema de tu negocio y terminamos con pruebas y una entrega documentada.',
			en: 'I design and build storefronts, themes, components, integrations, and web products. Scope starts from the commercial problem and ends with QA and a documented delivery.',
		},
		idealFor: {
			es: 'Marcas que van a lanzar, rehacer o crecer su tienda en línea.',
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
			es: 'Una tarea de tu día a día, resuelta con IA y bajo tu control.',
			en: 'One of your daily tasks, handled with AI and under your control.',
		},
		summary: {
			es: 'Diseño asistentes y automatizaciones con IA a partir de tus datos, con permisos claros y una persona que revisa. Primero definimos el trabajo y después elegimos la tecnología.',
			en: 'I design AI assistants, automations, and workflows around data, permissions, and human review. The work is defined first; technology comes second.',
		},
		idealFor: {
			es: 'Equipos con una tarea que se repite, información ordenada y alguien que decide al final.',
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

export const featuredProducts = commercialProducts.filter((product) => product.featured);
export const otherProducts = commercialProducts.filter((product) => !product.featured);

export function productDemo(product: CommercialProduct, locale: Locale) {
	return product.demo?.[locale];
}

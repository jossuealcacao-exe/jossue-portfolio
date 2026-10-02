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
			es: 'Tus agentes de código trabajan en la misma conversación y recuerdan lo que se decidió, sin que tengas que copiar y pegar entre ellos.',
			en: 'Your coding agents work in the same conversation and remember what was decided, without you copying and pasting between them.',
		},
		summary: {
			es: 'MADRE abre una sala en tu navegador donde Codex, Claude Code, Gemini CLI y OpenCode leen la misma conversación y se pasan el trabajo. La memoria del proyecto se queda en tu computadora. Los agentes solo editan tu código cuando tú les subes el permiso. Es gratis y de código abierto.',
			en: 'MADRE opens a room in your browser where Codex, Claude Code, Gemini CLI and OpenCode read the same conversation and hand work to each other. The project memory stays on your machine. The agents only edit your code when you raise their permission. It is free and open source.',
		},
		idealFor: {
			es: 'Quien ya usa uno o varios agentes de código y está cansado de copiar y pegar entre ellos, o de explicarle el proyecto a cada uno desde cero.',
			en: 'Anyone already using one or more coding agents who is tired of copying and pasting between them, or of explaining the project to each one from scratch.',
		},
		included: {
			es: ['Una sala para cuatro agentes', 'Memoria del proyecto en tu computadora', 'Permisos que subes tú, con copia de respaldo y forma de deshacer', 'Cuántos tokens ahorras, a la vista (ASH)'],
			en: ['One room for four agents', 'Project memory on your machine', 'Permissions you raise, with a backup copy and a way to undo', 'How many tokens you save, in plain sight (ASH)'],
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
		category: { es: 'Producto propio · Memoria para agentes', en: 'Own product · Memory for agents' },
		title: { es: 'AHP+', en: 'AHP+' },
		promise: {
			es: 'Guarda la memoria de tu proyecto en tu repositorio para que cualquier agente siga donde se quedó el anterior.',
			en: 'It keeps your project’s memory in your repository so any agent picks up where the last one stopped.',
		},
		summary: {
			es: 'AHP+ guarda con Git el estado del proyecto, las decisiones y las pruebas en una carpeta .ahp/. Si cambias de Codex a Claude Code, Cursor u OpenCode, o de computadora, el siguiente agente lee lo mismo y comprueba proyecto, rama y commit antes de tocar nada. Nunca hace commit ni push por ti.',
			en: 'AHP+ keeps your project’s state, decisions and test results in a .ahp/ folder, with Git. If you switch from Codex to Claude Code, Cursor or OpenCode, or to another machine, the next agent reads the same thing and checks project, branch and commit before touching anything. It never commits or pushes for you.',
		},
		idealFor: {
			es: 'Quien trabaja con agentes desde su editor de código (IDE) y cambia seguido de agente, de cuenta o de computadora.',
			en: 'Anyone working with agents from their code editor (IDE) who often switches agent, account or machine.',
		},
		included: {
			es: ['Estado, decisiones y pruebas en .ahp/', 'Relevos entre agentes que se comprueban', 'Puntos de control para retomar una sesión', 'Sin dependencias extra, solo Node y Git'],
			en: ['State, decisions and test results in .ahp/', 'Checked handoffs between agents', 'Checkpoints to resume a session', 'No extra dependencies, just Node and Git'],
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
		category: { es: 'Producto propio · Constructor de páginas con IA', en: 'Own product · AI page builder' },
		title: { es: 'Bloqio Builder', en: 'Bloqio Builder' },
		promise: {
			es: 'Le dices qué vendes y te arma una página ordenada que puedes revisar y seguir editando.',
			en: 'You tell it what you sell and it builds a tidy page you can review and keep editing.',
		},
		summary: {
			es: 'Lo hice para negocios que necesitan una página sin contratar a un diseñador. La página se arma por bloques. Su asistente con IA propone las secciones y los textos, y tú decides qué se queda y qué se publica.',
			en: 'I made it for businesses that need a page without hiring a designer. The page is built from blocks. Its AI assistant proposes the sections and the copy, and you decide what stays and what gets published.',
		},
		idealFor: {
			es: 'Negocios que necesitan una página para vender pronto, sin perder el control de lo que dice.',
			en: 'Businesses that need a page to sell from soon, without losing control of what it says.',
		},
		included: {
			es: ['Le dices qué quieres lograr con tu página', 'Secciones por bloques que reordenas a tu gusto', 'Un asistente que propone cambios y espera tu sí', 'Revisión antes de publicar'],
			en: ['You say what you want your page to achieve', 'Block sections you rearrange as you like', 'An assistant that proposes changes and waits for your yes', 'Review before publishing'],
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
			es: { wide: '/videos/demos/bloqio-builder', tall: '/videos/demos/bloqio-builder-tall', label: 'Demo · 43 s', alt: 'Demo de Bloqio Builder: el problema de no tener diseñador, la página de un bar armada por bloques, el titular que se cambia en vivo, la vista de celular, el cambio de tema y lo que propone Blob, su asistente con IA, siempre con tu aprobación.' },
			en: { wide: '/videos/demos/bloqio-builder', tall: '/videos/demos/bloqio-builder-tall', label: 'Demo · 43 s (in Spanish)', alt: 'Bloqio Builder demo (in Spanish): no designer at hand, a bar’s page built from blocks, the headline changed live, the phone view, a theme change, and what Blob, its AI assistant, proposes, always with your approval.' },
		},
	},
	{
		slug: 'daniela',
		kind: 'owned-product',
		category: { es: 'Producto propio · Asistente de ventas con IA', en: 'Own product · AI sales assistant' },
		title: { es: 'Daniela', en: 'Daniela' },
		promise: {
			es: 'Contesta a tus clientes a cualquier hora, les recomienda productos de tu catálogo con su precio real y los agrega al carrito.',
			en: 'She answers your customers at any hour, recommends products from your catalog at their real price and adds them to the cart.',
		},
		summary: {
			es: 'La construí para la tienda en línea de WU Nutrition y está conectada a su catálogo de Shopify. Solo hace las acciones que le definí. El servidor revisa cada una antes de ejecutarla y, si algo falla, se puede deshacer.',
			en: 'I built her for WU Nutrition’s online store, connected to its Shopify catalog. She only takes the actions I defined for her. The server checks each one before it runs and, if something fails, it can be undone.',
		},
		idealFor: {
			es: 'Tiendas en línea que reciben las mismas preguntas todos los días y no quieren que la IA invente precios, productos ni promociones.',
			en: 'Online stores that get the same questions every day and do not want the AI making up prices, products or promotions.',
		},
		included: {
			es: ['Recomendaciones solo con productos de tu catálogo', 'Carrito y combos, siempre con el sí del cliente', 'Consulta de pedidos sin poder modificarlos', 'Paso a una persona por WhatsApp cuando hace falta'],
			en: ['Recommendations only from products in your catalog', 'Cart and bundles, always with the customer’s yes', 'Order lookups without being able to change them', 'Hand-off to a person on WhatsApp when needed'],
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
			es: { wide: '/videos/demos/daniela', tall: '/videos/demos/daniela-tall', label: 'Demo · 44 s', alt: 'Demo de Daniela en wunutrition.com: una clienta escribe de noche, Daniela le recomienda un producto real del catálogo con su precio y lo agrega al carrito; después, sus seis funciones y lo que no puede hacer.' },
			en: { wide: '/videos/demos/daniela', tall: '/videos/demos/daniela-tall', label: 'Demo · 44 s (in Spanish)', alt: 'Daniela demo on wunutrition.com (in Spanish): a shopper writes at night, Daniela recommends a real catalog product with its price and adds it to the cart; then her six functions and what she cannot do.' },
		},
	},
	{
		slug: 'miawseo',
		kind: 'owned-product',
		category: { es: 'Producto propio · Sitio de contenido', en: 'Own product · Content site' },
		title: { es: 'Miawseo', en: 'Miawseo' },
		promise: {
			es: 'Un museo de razas de gato que se recorre como una red de metro, con un muro de fotos de la comunidad.',
			en: 'A cat-breed museum you explore like a metro network, with a community photo wall.',
		},
		summary: {
			es: 'Lo diseñé y lo programé completo, en Next.js. Tiene 20 razas con 6 salas cada una, un buscador y la Michi Plaza, donde la gente sube fotos de su gato. Ninguna foto se publica hasta que alguien la aprueba en el panel de moderación.',
			en: 'I designed and built all of it, in Next.js. It has 20 breeds with 6 rooms each, a search box and Michi Plaza, where people upload photos of their cat. No photo goes public until someone approves it in the moderation panel.',
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
			es: { wide: '/videos/demos/miawseo', tall: '/videos/demos/miawseo-tall', label: 'Demo · 42 s', credit: 'Fotos de gatos: Wikimedia Commons, con licencias libres (CC BY, CC BY-SA y dominio público). Autoría y licencia de cada foto en el repositorio de Miawseo.', alt: 'Demo de Miawseo: 20 razas con 6 salas cada una ordenadas como una red de metro, el buscador con «sphynx», las salas del Sphynx, la Michi Plaza y cómo se moderan las fotos antes de publicarse.' },
			en: { wide: '/videos/demos/miawseo', tall: '/videos/demos/miawseo-tall', label: 'Demo · 42 s (in Spanish)', credit: 'Cat photos: Wikimedia Commons, under free licenses (CC BY, CC BY-SA and public domain). Author and license of each photo in the Miawseo repository.', alt: 'Miawseo demo (in Spanish): 20 breeds with 6 rooms each laid out as a metro map, the search with “sphynx”, the Sphynx rooms, Michi Plaza, and how photos are moderated before they go live.' },
		},
	},
	{
		slug: 'chatbots',
		kind: 'service-product',
		category: { es: 'Servicio · Atención y ventas con IA', en: 'Service · AI for customer service and sales' },
		title: { es: 'Chatbots inteligentes', en: 'Smart chatbots' },
		promise: {
			es: 'Tus clientes reciben respuesta a cualquier hora, con los productos, precios y pedidos reales de tu tienda.',
			en: 'Your customers get an answer at any hour, with your store’s real products, prices and orders.',
		},
		summary: {
			es: 'Construyo chatbots como Daniela y Jossue AI, conectados a tu catálogo, a tus pedidos y a tu sistema de clientes (CRM). Recomiendan productos, arman el carrito, consultan pedidos y le pasan a tu equipo los datos de quien quiere comprar. Las reglas y los límites se revisan en el servidor antes de cada acción.',
			en: 'I build chatbots like Daniela and Jossue AI, connected to your catalog, your orders and your customer system (CRM). They recommend products, build the cart, look up orders and pass your team the details of people who want to buy. Rules and limits are checked on the server before every action.',
		},
		idealFor: {
			es: 'Negocios que contestan las mismas preguntas todos los días, pierden ventas porque nadie responde a tiempo o quieren atender de noche sin contratar otro turno.',
			en: 'Businesses that answer the same questions every day, lose sales because nobody replies in time, or want to serve customers at night without hiring another shift.',
		},
		included: {
			es: ['Reviso qué te preguntan tus clientes y qué se queda sin respuesta', 'Conexión con tu catálogo, tus pedidos y tu sistema de clientes (CRM)', 'Protección contra abusos con reglas fijas, una segunda IA que vigila los mensajes y una revisión de cada respuesta', 'Lanzamiento, y después leo las conversaciones para corregir lo que falle', 'Opcional: una base de respuestas que se arma con lo que preguntan tus clientes (archivista) y una IA propia, entrenada con tu negocio, que corre de forma local (destilación)'],
			en: ['I review what your customers ask and what goes unanswered', 'Connection to your catalog, your orders and your customer system (CRM)', 'Abuse protection with fixed rules, a second AI that watches the messages and a check on every answer', 'Launch, and then I read the conversations to fix what goes wrong', 'Optional: a knowledge base built from what your customers ask (archivist) and your own AI, trained on your business, running locally (distillation)'],
		},
		process: {
			es: ['Diagnóstico', 'Datos y reglas', 'Prototipo con tus datos', 'Lanzamiento y mejora'],
			en: ['Diagnosis', 'Data and rules', 'Prototype with your data', 'Launch and improvement'],
		},
		proofSlugs: ['wu-nutrition'],
		visualSlug: 'wu-nutrition',
		status: { es: 'Daniela y Jossue AI en uso', en: 'Daniela and Jossue AI live' },
		demo: {
			es: { wide: '/videos/demos/chatbots', tall: '/videos/demos/chatbots-tall', label: 'Demo · 46 s', alt: 'Demo de chatbots con IA: el problema de las preguntas sin respuesta, Jossue AI contestando en jossuealcala.com y explicando cómo sería uno para una tienda Shopify, qué resuelve en un negocio y cómo se protege.' },
			en: { wide: '/videos/demos/chatbots', tall: '/videos/demos/chatbots-tall', label: 'Demo · 46 s (in Spanish)', alt: 'AI chatbots demo (in Spanish): the problem of unanswered questions, Jossue AI answering on jossuealcala.com and explaining how one would work for a Shopify store, what it solves for a business and how it is protected.' },
		},
	},
	{
		slug: 'consultoria',
		kind: 'service-product',
		category: { es: 'Consultoría · Ventas en línea', en: 'Consulting · Online sales' },
		title: { es: 'Consultoría', en: 'Consulting' },
		promise: {
			es: 'Te ayudo a decidir qué hacer con tu tienda en línea antes de que gastes en construir algo nuevo.',
			en: 'I help you decide what to do with your online store before you spend on building something new.',
		},
		summary: {
			es: 'Reviso tu tienda, tu publicidad y tus números, y te digo qué te está costando ventas, qué arreglar primero y qué puede esperar. Puede ser una sesión, una revisión completa con un plan en orden de prioridad o acompañamiento mensual con tu equipo.',
			en: 'I review your store, your advertising and your numbers, and tell you what is costing you sales, what to fix first and what can wait. It can be a single session, a full review with a plan in order of priority, or monthly guidance with your team.',
		},
		idealFor: {
			es: 'Negocios que ya venden en línea, o están por lanzar, y quieren una segunda opinión clara antes de invertir en una tienda nueva, en más publicidad o en IA.',
			en: 'Businesses already selling online, or about to launch, who want a clear second opinion before investing in a new store, more advertising or AI.',
		},
		included: {
			es: ['Revisión de tu tienda, tu publicidad y cómo mides tus ventas', 'Lo que más te está costando ventas', 'Un plan en orden, con qué hacer primero y qué después', 'Acompañamiento para hacerlo con tu equipo'],
			en: ['A review of your store, your advertising and how you track sales', 'What is costing you the most sales', 'A plan in order, with what to do first and what later', 'Guidance to carry it out with your team'],
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
		category: { es: 'Servicio · Tiendas y sitios web', en: 'Service · Online stores and websites' },
		title: { es: 'Desarrollo Web', en: 'Web Development' },
		promise: {
			es: 'Tu tienda en línea o tu sitio web, hecho para vender y fácil de mantener.',
			en: 'Your online store or website, built to sell and easy to maintain.',
		},
		summary: {
			es: 'Diseño y programo tiendas en línea, temas para tu tienda, sitios y herramientas web, y las conexiones con los sistemas que ya usas (integraciones). Empiezo por lo que tu negocio necesita resolver y termino con pruebas y un documento que explica cómo quedó todo.',
			en: 'I design and build online stores, store themes, websites and web tools, and the connections to the systems you already use (integrations). I start from what your business needs to solve and finish with testing and a document that explains how everything was built.',
		},
		idealFor: {
			es: 'Negocios que van a abrir su tienda en línea, rehacer una que no les vende o agregarle funciones.',
			en: 'Businesses about to open their online store, rebuild one that is not selling, or add features to it.',
		},
		included: {
			es: ['Qué se va a hacer y qué no, por escrito', 'Cómo se organiza el sitio y cómo lo usa tu cliente', 'Programación y conexión con tus sistemas', 'Pruebas antes de entregar y documentación'],
			en: ['What will and will not be done, in writing', 'How the site is organized and how your customer uses it', 'Development and connection to your systems', 'Testing before delivery, and documentation'],
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
		category: { es: 'Servicio · Tareas con IA y revisión humana', en: 'Service · AI tasks with human review' },
		title: { es: 'IA Aplicada', en: 'Applied AI' },
		promise: {
			es: 'Una tarea que tu equipo repite todos los días, resuelta con IA y con una persona que revisa el resultado.',
			en: 'A task your team repeats every day, handled with AI and with a person who reviews the result.',
		},
		summary: {
			es: 'Armo asistentes y automatizaciones con IA a partir de la información de tu negocio. Dejo claro qué puede hacer cada uno y quién revisa lo que entrega. Primero entiendo bien la tarea y después elijo la herramienta.',
			en: 'I build AI assistants and automations from your business information. I make clear what each one can do and who reviews what it delivers. I understand the task first and choose the tool after.',
		},
		idealFor: {
			es: 'Negocios con una tarea que se repite, la información para hacerla ya ordenada y alguien que da el visto bueno al final.',
			en: 'Businesses with a task that repeats, the information for it already in order, and someone who gives the final approval.',
		},
		included: {
			es: ['Qué tarea se resuelve y qué resultado esperas', 'Qué puede hacer la IA y qué decide una persona', 'Una primera versión que ya funciona', 'Pruebas, documentación y qué sigue'],
			en: ['Which task gets solved and what result you expect', 'What the AI can do and what a person decides', 'A first version that already works', 'Tests, documentation and what comes next'],
		},
		process: {
			es: ['Tarea', 'Datos', 'Control', 'Prueba'],
			en: ['Task', 'Data', 'Control', 'Test'],
		},
		proofSlugs: ['bloqio-builder', 'ahp-plus'],
		visualSlug: 'bloqio-builder',
		demo: {
			es: { wide: '/videos/demos/ia-aplicada', tall: '/videos/demos/ia-aplicada-tall', label: 'Demo · 41 s', alt: 'Demo animada de IA aplicada: tres tareas que se repiten (captura de pedidos, el reporte de la semana y los correos de soporte) resueltas con IA, con lo que no cuadra marcado para que una persona lo revise, y los cuatro pasos para trabajar: tarea, datos, control y prueba.' },
			en: { wide: '/videos/demos/ia-aplicada', tall: '/videos/demos/ia-aplicada-tall', label: 'Demo · 41 s (in Spanish)', alt: 'Animated Applied AI demo (in Spanish): three repeating tasks (order entry, the weekly report and support emails) handled with AI, with anything that does not match flagged for a person to review, and the four steps of the work: task, data, control and test.' },
		},
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

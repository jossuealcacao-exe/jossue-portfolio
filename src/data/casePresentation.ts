import type { Locale } from './i18n';

export type CaseSlug =
	| 'wu-nutrition'
	| 'bloqio-cro-apps'
	| 'bloqio-builder'
	| 'la-carniceria-virtual'
	| 'come-verde'
	| 'miawseo'
	| 'vineria'
	| 'ahp-plus'
	| 'tiendaonline';

export interface CasePresentation {
	category: string;
	summary: string;
	context: string;
	challenge: string;
	role: string;
	approach: string[];
	deliverables: string[];
	outcomes: string[];
	principles: string[];
	cta: string;
}

const presentations: Record<CaseSlug, Record<Locale, CasePresentation>> = {
	'wu-nutrition': {
		es: {
			category: 'Ecommerce DTC · Shopify',
			summary: 'Dirección ecommerce de punta a punta: storefront Shopify, adquisición, analítica e IA aplicada conectadas en una experiencia que convierte y que el equipo puede operar.',
			context: 'WU Nutrition comercializa suplementos DTC en Shopify y marketplaces. La operación exige conectar la promesa de campaña con el descubrimiento, la decisión de compra, el carrito y la relación posterior con el cliente.',
			challenge: 'Convertir iniciativas dispersas de growth en un sistema ecommerce consistente, reutilizable y preparado para evolucionar sin añadir complejidad innecesaria al equipo.',
			role: 'Como Head of E-commerce & Digital Growth, dirijo la estrategia ecommerce y participo directamente en diseño, desarrollo Shopify, UX/CRO, adquisición, analítica y automatización.',
			approach: [
				'Diseñar la experiencia como un recorrido continuo entre campaña, landing page, catálogo, producto y carrito.',
				'Construir componentes Shopify configurables para que el equipo pueda operar campañas y contenidos con autonomía.',
				'Usar IA y automatización dentro de flujos con datos comerciales validados y decisiones humanas.',
			],
			deliverables: [
				'Sistema modular de landing pages, home, PLP, PDP y componentes de confianza.',
				'Cart drawer con progresión de valor, recomendaciones y estados sincronizados con Shopify.',
				'Asistente conversacional, flujos CRM y sistema operativo de growth y medición.',
			],
			outcomes: [
				'Un sistema de componentes reutilizables para campañas, catálogo, carrito y conversión.',
				'Una operación conectada entre storefront, adquisición, CRM, analítica y automatización.',
			],
			principles: ['Continuidad entre adquisición y compra.', 'Configuración antes que dependencia.', 'IA aplicada con control de negocio.'],
			cta: 'Hablemos de una experiencia Shopify que conecte adquisición, producto y conversión.',
		},
		en: {
			category: 'DTC ecommerce · Shopify',
			summary: 'End-to-end ecommerce leadership: Shopify storefront, acquisition, analytics, and applied AI connected into an experience that converts and the team can operate.',
			context: 'WU Nutrition sells supplements through Shopify DTC and marketplaces. The operation needs campaign promises to continue through discovery, purchase decisions, cart, and the post-purchase relationship.',
			challenge: 'Turn fragmented growth initiatives into a consistent, reusable ecommerce system that can evolve without adding unnecessary complexity for the team.',
			role: 'As Head of E-commerce & Digital Growth, I lead ecommerce strategy and work hands-on across design, Shopify development, UX/CRO, acquisition, analytics, and automation.',
			approach: [
				'Design one continuous journey across campaigns, landing pages, catalog, product, and cart.',
				'Build configurable Shopify components so the team can operate campaigns and content independently.',
				'Use AI and automation inside workflows grounded in validated commerce data and human decisions.',
			],
			deliverables: [
				'Modular landing-page, home, PLP, PDP, and trust-component system.',
				'Cart drawer with value progression, recommendations, and Shopify-synced states.',
				'Conversational assistant, CRM flows, and a growth and measurement operating system.',
			],
			outcomes: [
				'A reusable component system for campaigns, catalog, cart, and conversion.',
				'A connected operation across storefront, acquisition, CRM, analytics, and automation.',
			],
			principles: ['Continuity from acquisition to purchase.', 'Configuration over dependency.', 'Applied AI with business control.'],
			cta: 'Let’s build a Shopify experience that connects acquisition, product, and conversion.',
		},
	},
	'bloqio-cro-apps': {
		es: {
			category: 'Producto Shopify · Apps',
			summary: 'Dos apps Shopify que convierten patrones de conversión en herramientas configurables: una top bar promocional y un sticky add-to-cart.',
			context: 'Los equipos ecommerce necesitan activar mensajes, promociones y accesos de compra sin editar el theme para cada campaña ni comprometer la experiencia móvil.',
			challenge: 'Productizar patrones CRO frecuentes para que funcionen con datos reales de Shopify y puedan operarse desde una interfaz clara.',
			role: 'Concepto, dirección de producto, UX/CRO, diseño de configuración, desarrollo de las apps y preparación de su operación.',
			approach: [
				'Usar Theme App Extensions y App Embeds para integrarse sin modificar el theme.',
				'Diseñar comportamiento mobile-first y sincronizado con producto, variante, cantidad y disponibilidad.',
				'Mantener una identidad compartida y una responsabilidad clara para cada producto.',
			],
			deliverables: [
				'Prometeo: mensajes, CTA, countdown, sticky y cierre persistente.',
				'Hermes: compra visible durante el scroll, variantes, cantidad y estados de inventario.',
				'Administración embedded, persistencia, compliance webhooks y despliegue.',
			],
			outcomes: ['Dos productos funcionales para storefronts Shopify.', 'Una arquitectura que permite instalar y configurar sin intervenir el código del theme.'],
			principles: ['Configuración simple.', 'Datos reales del storefront.', 'Experiencia móvil primero.'],
			cta: 'Conversemos sobre una app Shopify diseñada alrededor de una necesidad comercial concreta.',
		},
		en: {
			category: 'Shopify product · Apps',
			summary: 'Two Shopify apps turning conversion patterns into configurable tools: a promotional top bar and a sticky add-to-cart.',
			context: 'Ecommerce teams need to activate messages, promotions, and purchase access without editing the theme for every campaign or compromising mobile UX.',
			challenge: 'Productize common CRO patterns so they work with real Shopify data and remain easy to operate through a clear interface.',
			role: 'Product concept, direction, UX/CRO, configuration design, app development, and operational preparation.',
			approach: [
				'Use Theme App Extensions and App Embeds to integrate without modifying theme code.',
				'Design mobile-first behavior synchronized with product, variant, quantity, and availability.',
				'Give each product a focused responsibility within one shared design language.',
			],
			deliverables: [
				'Prometeo: messages, CTA, countdown, sticky behavior, and persistent dismiss.',
				'Hermes: persistent purchase access, variants, quantity, and inventory states.',
				'Embedded administration, persistence, compliance webhooks, and deployment.',
			],
			outcomes: ['Two functional products for Shopify storefronts.', 'An architecture merchants can install and configure without editing theme code.'],
			principles: ['Simple configuration.', 'Real storefront data.', 'Mobile experience first.'],
			cta: 'Let’s discuss a Shopify app built around a specific commercial need.',
		},
	},
	'bloqio-builder': {
		es: {
			category: 'Producto con IA · SaaS',
			summary: 'Creador web con IA donde el objetivo de negocio se vuelve una página estructurada y editable. La IA propone, la persona decide: de la idea a publicar sin caja negra.',
			context: 'Crear una web todavía obliga a muchas personas a entender plantillas, componentes y decisiones de diseño antes de poder expresar lo que su negocio necesita.',
			challenge: 'Reducir esa complejidad sin convertir la IA en una caja negra ni quitar al usuario el control sobre la estructura, el contenido y la publicación.',
			role: 'Founder y product builder. Definí concepto, estrategia, UX, arquitectura de bloques, comportamiento de la IA y dirección técnica del producto.',
			approach: [
				'Combinar conversación, vista previa y edición directa dentro del mismo flujo.',
				'Traducir solicitudes en acciones tipadas, validadas, agrupadas y reversibles.',
				'Diseñar la experiencia mobile-first desde onboarding hasta preparación para publicar.',
			],
			deliverables: [
				'Editor basado en esquema JSON, secciones modulares e inspector contextual.',
				'Blob, asistente con IA para copy, estructura y cambios controlados.',
				'Frontend, backend, autenticación, administración y flujos de cuenta.',
			],
			outcomes: ['Una aplicación full-stack que conecta creación asistida, edición visual y control de cambios.', 'Un recorrido completo desde el objetivo inicial hasta una página preparada para publicar.'],
			principles: ['La IA propone; la persona decide.', 'Cambios visibles y reversibles.', 'Complejidad progresiva.'],
			cta: 'Convirtamos una idea compleja en un producto que una persona real pueda entender y usar.',
		},
		en: {
			category: 'AI product · SaaS',
			summary: 'An AI website builder where a business goal becomes a structured, editable page. AI proposes, the person decides — from idea to publish, with no black box.',
			context: 'Building a website still asks many people to understand templates, components, and design decisions before they can express what their business actually needs.',
			challenge: 'Reduce that complexity without turning AI into a black box or taking control of structure, content, and publishing away from the user.',
			role: 'Founder and product builder. I defined the concept, strategy, UX, block architecture, AI behavior, and technical direction.',
			approach: [
				'Combine conversation, preview, and direct editing in one workflow.',
				'Turn requests into typed, validated, grouped, and reversible actions.',
				'Design mobile-first from onboarding through publish preparation.',
			],
			deliverables: [
				'JSON-schema editor, modular sections, and contextual inspector.',
				'Blob, an AI assistant for copy, structure, and controlled changes.',
				'Frontend, backend, authentication, administration, and account flows.',
			],
			outcomes: ['A full-stack application connecting assisted creation, visual editing, and change control.', 'A complete journey from an initial goal to a page prepared for publishing.'],
			principles: ['AI proposes; people decide.', 'Visible, reversible changes.', 'Progressive complexity.'],
			cta: 'Let’s turn a complex idea into a product real people can understand and use.',
		},
	},
	'la-carniceria-virtual': {
		es: {
			category: 'Estrategia Shopify · UX/CRO',
			summary: 'Análisis integral de un storefront Shopify para convertir fricción de experiencia, rendimiento y medición en un roadmap de optimización.',
			context: 'La Carnicería Virtual contaba con un catálogo amplio, una propuesta comercial sólida y oportunidades claras para mejorar velocidad, descubrimiento y confianza de compra.',
			challenge: 'Priorizar mejoras con impacto operativo y comercial sin empujar un rediseño innecesario ni confundir señales técnicas con resultados de negocio.',
			role: 'Lideré el análisis de UX/CRO, performance, SEO técnico, medición y arquitectura Shopify, y traduje los hallazgos en una secuencia de trabajo accionable.',
			approach: [
				'Recorrer home, colección, producto, carrito y capas técnicas como una sola experiencia.',
				'Cruzar comportamiento visible, recursos de red, datos de campo y laboratorio y estructura del theme.',
				'Ordenar oportunidades por impacto, esfuerzo y dependencia operativa.',
			],
			deliverables: ['Mapa de oportunidades de UX, performance, SEO y medición.', 'Priorización por impacto y esfuerzo.', 'Roadmap 30/60/90 para quick wins, mejoras estructurales y proyectos mayores.'],
			outcomes: ['Un plan de optimización enfocado en velocidad móvil, descubrimiento de catálogo y confianza.', 'Una secuencia clara para convertir análisis técnico en decisiones de producto.'],
			principles: ['Priorizar antes de rediseñar.', 'Conectar técnica y experiencia.', 'Diseñar para decidir.'],
			cta: 'Hablemos de una estrategia de optimización Shopify clara, priorizada y ejecutable.',
		},
		en: {
			category: 'Shopify strategy · UX/CRO',
			summary: 'A comprehensive Shopify storefront analysis translating experience, performance, and measurement friction into an optimization roadmap.',
			context: 'La Carnicería Virtual had a broad catalog, a strong commercial proposition, and clear opportunities to improve speed, discovery, and purchase confidence.',
			challenge: 'Prioritize improvements with operational and commercial relevance without forcing an unnecessary redesign or confusing technical signals with business outcomes.',
			role: 'I led the UX/CRO, performance, technical SEO, measurement, and Shopify architecture analysis, then translated findings into an actionable sequence.',
			approach: [
				'Review home, collection, product, cart, and technical layers as one experience.',
				'Connect visible behavior, network resources, field and lab data, and theme structure.',
				'Order opportunities by impact, effort, and operational dependency.',
			],
			deliverables: ['UX, performance, SEO, and measurement opportunity map.', 'Impact and effort prioritization.', 'A 30/60/90 roadmap for quick wins, structural improvements, and larger initiatives.'],
			outcomes: ['An optimization plan focused on mobile speed, catalog discovery, and confidence.', 'A clear sequence turning technical analysis into product decisions.'],
			principles: ['Prioritize before redesigning.', 'Connect technology and experience.', 'Design for decision-making.'],
			cta: 'Let’s shape a clear, prioritized, and executable Shopify optimization strategy.',
		},
	},
	'come-verde': {
		es: {
			category: 'Estrategia CPG · Growth',
			summary: 'Un sistema de medios y marca para una operación CPG que conecta estrategia, activaciones, marketplaces e IA aplicada.',
			context: 'Come Verde comercializa snacks saludables en retail físico y marketplaces, donde la construcción de marca y la rotación en anaquel requieren una lógica distinta a la de un ecommerce DTC.',
			challenge: 'Alinear marca, medios y medición alrededor de disponibilidad mental, distribución y ocasiones de consumo, sin reducir la estrategia a una métrica de venta directa.',
			role: 'Como Head of E-commerce & Digital Growth, dirijo la capa ecommerce y de medios, coordino con Brand y Comercial y diseño sistemas de planeación, activación y aprendizaje.',
			approach: [
				'Separar brand building, activaciones tácticas y performance de marketplaces.',
				'Alinear geotargeting y creatividad con distribución, temporalidad y objetivo comercial.',
				'Usar IA para acelerar briefs, variantes y síntesis dentro de una estrategia definida por el equipo.',
			],
			deliverables: ['Way of Work de medios digitales.', 'Playbooks de activación, matriz de canales y perfil de consumidor.', 'Growth OS con scorecards, reporting, experimentos y capa de estrategia asistida por IA.'],
			outcomes: ['Un marco operativo específico para CPG, distinto del playbook DTC.', 'Roles y decisiones más claros entre Brand, Media, Comercial e IA aplicada.'],
			principles: ['Marca antes que optimización táctica.', 'Distribución antes que alcance vacío.', 'IA alineada a una estrategia humana.'],
			cta: 'Construyamos un sistema de growth que conecte marca, retail y medición útil.',
		},
		en: {
			category: 'CPG strategy · Growth',
			summary: 'A media and brand operating system for a CPG business connecting strategy, activations, marketplaces, and applied AI.',
			context: 'Come Verde sells healthy snacks through physical retail and marketplaces, where brand building and shelf velocity require a different logic from DTC ecommerce.',
			challenge: 'Align brand, media, and measurement around mental availability, distribution, and consumption occasions without reducing strategy to a direct-sale metric.',
			role: 'As Head of E-commerce & Digital Growth, I lead ecommerce and media, coordinate with Brand and Commercial teams, and design systems for planning, activation, and learning.',
			approach: [
				'Separate brand building, tactical activations, and marketplace performance.',
				'Align geotargeting and creative with distribution, seasonality, and commercial goals.',
				'Use AI to accelerate briefs, variants, and synthesis inside a strategy defined by the team.',
			],
			deliverables: ['Digital media way of work.', 'Activation playbooks, channel matrix, and consumer profile.', 'Growth OS with scorecards, reporting, experiments, and AI-assisted strategy.'],
			outcomes: ['A CPG-specific operating model distinct from a DTC playbook.', 'Clearer decisions and roles across Brand, Media, Commercial, and applied AI.'],
			principles: ['Brand before tactical optimization.', 'Distribution before empty reach.', 'AI aligned with human strategy.'],
			cta: 'Let’s build a growth system connecting brand, retail, and useful measurement.',
		},
	},
	'miawseo': {
		es: {
			category: 'Producto editorial · Full-stack',
			summary: 'Producto editorial full-stack que vuelve intuitivo un catálogo profundo con wayfinding, narrativa y comunidad moderada. UX y desarrollo de extremo a extremo.',
			context: 'MIAWSEO es un producto auto-iniciado que transforma contenido editorial sobre gatos en una experiencia de descubrimiento, orientación y comunidad.',
			challenge: 'Organizar un catálogo profundo sin perder contexto y permitir contribuciones públicas sin comprometer la calidad del contenido.',
			role: 'Dirección de producto, arquitectura de información, diseño de experiencia e implementación full-stack.',
			approach: ['Usar una red de metro como sistema de orientación y descubrimiento.', 'Dar a cada raza una narrativa propia dentro de una arquitectura consistente.', 'Integrar participación comunitaria con validación y moderación antes de publicar.'],
			deliverables: ['Michiteca con búsqueda, estaciones y rutas por raza.', 'Veinte exhibiciones editoriales generadas desde datos tipados.', 'Flujo de contribución y panel de moderación de medios.'],
			outcomes: ['Un catálogo complejo convertido en una experiencia espacial y reconocible.', 'Una arquitectura preparada para combinar contenido editorial y participación comunitaria.'],
			principles: ['Wayfinding como producto.', 'Narrativa dentro del sistema.', 'Comunidad con moderación.'],
			cta: 'Hablemos de productos editoriales, catálogos complejos o comunidades digitales.',
		},
		en: {
			category: 'Editorial product · Full-stack',
			summary: 'A full-stack editorial product that makes a deep catalog intuitive through wayfinding, narrative, and moderated community. UX and development, end to end.',
			context: 'MIAWSEO is a self-initiated product transforming editorial content about cats into an experience of discovery, orientation, and community.',
			challenge: 'Organize a deep catalog without losing context and enable public contributions without compromising content quality.',
			role: 'Product direction, information architecture, experience design, and full-stack implementation.',
			approach: ['Use a metro network as the orientation and discovery system.', 'Give every breed its own narrative inside a consistent architecture.', 'Integrate community participation with validation and moderation before publishing.'],
			deliverables: ['Michiteca with search, stations, and breed routes.', 'Twenty editorial exhibitions generated from typed data.', 'Contribution flow and media moderation panel.'],
			outcomes: ['A complex catalog transformed into a recognizable spatial experience.', 'An architecture connecting editorial content and community participation.'],
			principles: ['Wayfinding as product.', 'Narrative inside the system.', 'Community with moderation.'],
			cta: 'Let’s discuss editorial products, complex catalogs, or digital communities.',
		},
	},
	'vineria': {
		es: {
			category: 'Producto editorial · Front-end',
			summary: 'Guía interactiva que hace accesible el vino con búsqueda, filtros y perfiles progresivos. UX editorial enfocada en claridad, descubrimiento y disfrute.',
			context: 'Vinería es un producto auto-iniciado para personas que quieren entender variedades, regiones, aromas y maridajes sin enfrentarse a una enciclopedia.',
			challenge: 'Convertir investigación extensa en una experiencia clara, visual y agradable para quien apenas comienza a explorar el tema.',
			role: 'Dirección editorial, diseño de producto, modelado de contenido e implementación front-end.',
			approach: ['Priorizar preguntas y decisiones reales del usuario sobre una taxonomía académica.', 'Usar búsqueda y filtros breves para reducir la carga inicial.', 'Revelar profundidad mediante perfiles, mapa, glosario y maridajes.'],
			deliverables: ['Catálogo tipado de veinticuatro variedades.', 'Explorador con búsqueda, filtros y perfiles en diálogo nativo.', 'Mapa de origen, módulos de maridaje, glosario y bitácora editorial.'],
			outcomes: ['Una experiencia educativa que equilibra orientación, profundidad y disfrute visual.', 'Un modelo de contenido preparado para crecer sin perder consistencia.'],
			principles: ['Claridad para principiantes.', 'Profundidad progresiva.', 'Contenido y navegación como un solo sistema.'],
			cta: 'Conversemos sobre experiencias editoriales, catálogos interactivos o productos educativos.',
		},
		en: {
			category: 'Editorial product · Front-end',
			summary: 'An interactive guide that makes wine approachable with search, filters, and progressive profiles. Editorial UX focused on clarity, discovery, and enjoyment.',
			context: 'Vinería is a self-initiated product for people who want to understand varieties, regions, aromas, and pairings without facing an encyclopedia.',
			challenge: 'Turn extensive research into a clear, visual, and enjoyable experience for people beginning to explore the subject.',
			role: 'Editorial direction, product design, content modeling, and front-end implementation.',
			approach: ['Prioritize real user questions over an academic taxonomy.', 'Use concise search and filters to lower the initial cognitive load.', 'Reveal depth progressively through profiles, map, glossary, and pairings.'],
			deliverables: ['Typed catalog of twenty-four varieties.', 'Explorer with search, filters, and profiles in a native dialog.', 'Origin map, pairing modules, glossary, and editorial research log.'],
			outcomes: ['An educational experience balancing orientation, depth, and visual enjoyment.', 'A content model designed to grow without losing consistency.'],
			principles: ['Clarity for beginners.', 'Progressive depth.', 'Content and navigation as one system.'],
			cta: 'Let’s discuss editorial experiences, interactive catalogs, or educational products.',
		},
	},
	'ahp-plus': {
		es: {
			category: 'Sistema IA · Protocolo operativo',
			summary: 'Convierto flujos con IA en sistemas operables y auditables: memoria verificable en Git, continuidad entre plataformas y handoffs que no dependen de recordar el chat.',
			context: 'Los equipos pueden usar Codex, Cursor, Claude Code, OpenCode o ChatGPT para construir software, pero la continuidad se rompe cuando el contexto vive solo en conversaciones, resúmenes o memoria privada del proveedor.',
			challenge: 'Diseñar un plano operativo que convierta memoria, decisiones, QA, riesgos y handoffs en datos versionados dentro del repositorio, sin reemplazar la autoridad humana ni los controles de Git.',
			role: 'Creador y arquitecto de AHP+. Definí el concepto, la especificación, el modelo de certeza, los registros, la CLI, la integración con Pangea OS y la narrativa de autoría para CV y portafolio.',
			approach: [
				'Tratar el repositorio como fuente de verdad y `/agent` como memoria canónica, no como una carpeta de notas libres.',
				'Separar hechos verificados, confirmaciones del usuario, inferencias, estados obsoletos y conflictos para reducir alucinaciones operativas.',
				'Convertir cada sesión importante en estado, evidencia, QA y siguiente acción reproducible para que otro agente pueda continuar.',
			],
			deliverables: [
				'Especificación AHP+ 1.0 con fuente canónica, certeza, registros, estados, evidencia, handoff, locks y conformidad.',
				'Runtime CLI en Node.js para verificar, consultar, registrar evidencia, generar briefs, crear handoffs y validar estructura.',
				'Integración dentro de Pangea OS para operar múltiples proyectos web con estado activo, QA receipts y continuidad entre agentes.',
				'Guía de autoría y wording para presentar el sistema de forma humana, vendible y honesta en CV y portafolio.',
			],
			outcomes: [
				'Un sistema operativo de continuidad para proyectos web asistidos por IA, con memoria portable y verificable.',
				'Un modelo claro para que la asistencia de IA tenga límites: evidencia antes que confianza, Git antes que recollection y humano antes que automatismo.',
			],
			principles: ['Memoria verificable.', 'Continuidad entre agentes.', 'Autoridad humana explícita.'],
			cta: 'Hablemos de cómo convertir flujos con IA en sistemas operables, auditables y listos para equipos reales.',
		},
		en: {
			category: 'AI systems · Operating protocol',
			summary: 'I turn AI workflows into operable, auditable systems: verifiable memory in Git, cross-platform continuity, and handoffs that don’t rely on remembering the chat.',
			context: 'Teams can use Codex, Cursor, Claude Code, OpenCode, or ChatGPT to build software, but continuity breaks when context lives only in conversations, summaries, or private provider memory.',
			challenge: 'Design an operating plane that turns memory, decisions, QA, risks, and handoffs into versioned repository data without replacing human authority or Git controls.',
			role: 'Creator and architect of AHP+. I defined the concept, specification, certainty model, records, CLI, Pangea OS integration, and authorship narrative for CV and portfolio use.',
			approach: [
				'Treat the repository as the source of truth and `/agent` as canonical memory, not as a folder of free-form notes.',
				'Separate verified facts, user confirmations, inferences, stale state, and conflicts to reduce operational hallucination.',
				'Turn every material session into state, evidence, QA, and a reproducible next action so another agent can continue.',
			],
			deliverables: [
				'AHP+ 1.0 specification covering canonical source, certainty, records, states, evidence, handoff, locks, and conformance.',
				'Node.js CLI runtime to verify, inspect, record evidence, generate briefs, create handoffs, and validate structure.',
				'Pangea OS integration for operating multiple web projects with active state, QA receipts, and cross-agent continuity.',
				'Authorship and portfolio wording that explains the system in a human, marketable, and honest way.',
			],
			outcomes: [
				'An operating continuity system for AI-assisted web projects, with portable and verifiable memory.',
				'A clear model for AI assistance with boundaries: evidence over confidence, Git over recollection, and humans over automation.',
			],
			principles: ['Verifiable memory.', 'Cross-agent continuity.', 'Explicit human authority.'],
			cta: 'Let’s discuss how to turn AI workflows into operable, auditable systems built for real teams.',
		},
	},
	tiendaonline: {
		es: {
			category: 'Concepto Shopify · Storefront',
			summary: 'Un theme Shopify OS 2.0 para una marca premium, diseñado alrededor de merchandising flexible, descubrimiento y compra móvil.',
			context: 'Casa Tecalli explora cómo una marca de alimentos premium puede traducir narrativa, catálogo y señales de confianza a una arquitectura nativa de Shopify.',
			challenge: 'Crear una experiencia comercial editable que funcione con las capacidades del Theme Editor y mantenga una ruta clara de catálogo a carrito.',
			role: 'Concepto, arquitectura del theme, diseño de storefront e implementación en Liquid, CSS y JavaScript.',
			approach: ['Mantener cada bloque comercial configurable desde Shopify.', 'Usar datos nativos para producto, variantes, disponibilidad y carrito.', 'Diseñar navegación, media y compra para teclado, touch y movimiento reducido.'],
			deliverables: ['Theme Online Store 2.0 con templates JSON y secciones configurables.', 'Home, colección, búsqueda, PDP, carrito, páginas de sistema y gift card.', 'Galería de producto, hotspots, countdown y flujos de compra.'],
			outcomes: ['Una arquitectura de storefront nativa y modular.', 'Un concepto preparado para adaptarse a contenido y catálogo reales de Shopify.'],
			principles: ['Editabilidad nativa.', 'Menos dependencias.', 'Compra móvil como punto de partida.'],
			cta: 'Hablemos de themes Shopify, secciones comerciales o una mejora concreta de storefront.',
		},
		en: {
			category: 'Shopify concept · Storefront',
			summary: 'A Shopify OS 2.0 theme for a premium brand, designed around flexible merchandising, discovery, and mobile purchase.',
			context: 'Casa Tecalli explores how a premium food brand can translate narrative, catalog, and confidence signals into a native Shopify architecture.',
			challenge: 'Create an editable commerce experience that works through the Theme Editor and keeps a clear path from catalog to cart.',
			role: 'Concept, theme architecture, storefront design, and implementation in Liquid, CSS, and JavaScript.',
			approach: ['Keep every commercial block configurable in Shopify.', 'Use native data for product, variants, availability, and cart.', 'Design navigation, media, and purchase for keyboard, touch, and reduced motion.'],
			deliverables: ['Online Store 2.0 theme with JSON templates and configurable sections.', 'Home, collection, search, PDP, cart, system pages, and gift card.', 'Product gallery, hotspots, countdown, and purchase flows.'],
			outcomes: ['A native, modular storefront architecture.', 'A concept prepared to adapt to real Shopify content and catalog data.'],
			principles: ['Native editability.', 'Fewer dependencies.', 'Mobile purchase as the starting point.'],
			cta: 'Let’s discuss Shopify themes, commercial sections, or a focused storefront improvement.',
		},
	},
};

export function casePresentation(slug: string, locale: Locale): CasePresentation | undefined {
	return presentations[slug as CaseSlug]?.[locale];
}

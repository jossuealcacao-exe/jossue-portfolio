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
			category: 'Tienda de suplementos · Shopify',
			summary: 'Dirijo el ecommerce de una marca de suplementos: la tienda, la publicidad que trae gente, los números que dicen qué funciona y la IA que ayuda a vender. Todo conectado, y operable por el equipo sin depender de mí.',
			context: 'WU Nutrition vende suplementos por su propia tienda y también en Amazon y Mercado Libre. El reto de fondo es que lo que promete un anuncio siga siendo verdad cuando la persona llega a la página, elige un producto, paga y vuelve meses después.',
			challenge: 'Había muchas iniciativas sueltas y cada una resolvía su parte. Faltaba juntarlas en algo que se pudiera reutilizar y que el equipo pudiera mover sin que cada cambio fuera un proyecto nuevo.',
			role: 'Soy Head of E-commerce & Digital Growth. Decido hacia dónde va el ecommerce, y además meto mano: diseño, programo la tienda, reviso por qué la gente no compra, manejo la publicidad y armo las automatizaciones.',
			approach: [
				'Tratar todo como un solo camino: el anuncio, la página a la que llega, el catálogo, el producto y el carrito. No como cinco piezas separadas.',
				'Dejar los bloques de la tienda configurables, para que el equipo lance campañas y cambie contenido sin pedirle nada a un programador.',
				'Usar IA donde ayuda, siempre con precios y datos reales por detrás y con una persona decidiendo al final.',
			],
			deliverables: [
				'Un set de bloques con los que se arman páginas de campaña, portada, catálogo y ficha de producto sin partir de cero.',
				'Un carrito lateral que muestra cuánto falta para el siguiente beneficio, sugiere productos y siempre refleja el stock real.',
				'Un asistente que responde dudas de compra, los correos automáticos al cliente y el tablero donde se ve si todo esto funciona.',
			],
			outcomes: [
				'Lanzar una campaña dejó de ser un desarrollo: se arma con bloques que ya existen.',
				'La tienda, la publicidad, los correos y los números dejaron de vivir en herramientas aisladas.',
			],
			principles: ['Lo que promete el anuncio tiene que cumplirse en la página.', 'Que el equipo pueda solo, sin depender de mí.', 'La IA propone; el negocio decide.'],
			cta: '¿Tienes campañas que traen gente pero no terminan en venta? De eso podemos hablar.',
		},
		en: {
			category: 'Supplement store · Shopify',
			summary: 'I run ecommerce for a supplement brand: the store, the advertising that brings people in, the numbers that say what works, and the AI that helps sell. All connected, and the team can operate it without me.',
			context: 'WU Nutrition sells supplements through its own store and also on Amazon and Mercado Libre. The underlying challenge is that whatever an ad promises has to still be true when the person lands on the page, picks a product, pays, and comes back months later.',
			challenge: 'There were many separate initiatives, each solving its own piece. What was missing was pulling them into something reusable the team could move without every change becoming a new project.',
			role: 'I am Head of E-commerce & Digital Growth. I decide where ecommerce is going, and I also do the work: design, code the store, dig into why people are not buying, run the advertising, and build the automations.',
			approach: [
				'Treat it all as one path: the ad, the page it lands on, the catalog, the product, and the cart. Not as five separate pieces.',
				'Keep the store blocks configurable, so the team launches campaigns and changes content without asking a developer for anything.',
				'Use AI where it genuinely helps, always with real prices and data behind it and a person deciding at the end.',
			],
			deliverables: [
				'A set of blocks for assembling campaign pages, the homepage, the catalog, and product pages without starting from scratch.',
				'A side cart that shows how much is left to the next perk, suggests products, and always reflects real stock.',
				'An assistant that answers buying questions, the automated customer emails, and the dashboard where you see whether any of it is working.',
			],
			outcomes: [
				'Launching a campaign stopped being a development job: it is assembled from blocks that already exist.',
				'The store, the advertising, the emails, and the numbers stopped living in separate tools.',
			],
			principles: ['What the ad promises has to hold up on the page.', 'The team should manage on its own, without depending on me.', 'AI proposes; the business decides.'],
			cta: 'Do your campaigns bring people in but not sales? That is worth a conversation.',
		},
	},
	'bloqio-cro-apps': {
		es: {
			category: 'Dos apps para vender más',
			summary: 'Dos apps que cualquier tienda Shopify puede instalar: una barra de avisos arriba para anunciar promociones, y un botón de compra que sigue visible mientras la gente baja por la página.',
			context: 'Cada vez que una tienda quiere anunciar una promoción, alguien tiene que entrar a tocar el código del sitio. Es lento, se rompe con facilidad y casi siempre termina viéndose mal en el celular.',
			challenge: 'Convertir dos trucos que todo el mundo usa a mano en productos instalables, que lean el precio y el stock reales de la tienda y se configuren desde una pantalla sencilla.',
			role: 'La idea, el diseño, la programación de las dos apps y dejarlas listas para que cualquiera las instale. Todo yo.',
			approach: [
				'Que se instalen encima de la tienda sin tocar su código, para que desinstalar no deje nada roto.',
				'Pensarlas primero para el celular, y que siempre sepan qué producto, qué talla y cuánto stock hay en ese momento.',
				'Que las dos se vean de la misma familia, pero que cada una haga una sola cosa bien.',
			],
			deliverables: [
				'Prometeo: la barra de arriba. Mensaje, botón, cuenta regresiva, y si el cliente la cierra no vuelve a aparecer.',
				'Hermes: el botón de comprar que te sigue al bajar, con talla, cantidad y aviso si algo se agotó.',
				'El panel de configuración dentro de Shopify, y todo lo que Shopify exige para publicar una app.',
			],
			outcomes: ['Dos apps funcionando, instalables en cualquier tienda Shopify.', 'Se configuran en minutos y sin programar: quien las instala no necesita ayuda de nadie.'],
			principles: ['Que se entienda sin manual.', 'Nunca mostrar un precio o un stock inventado.', 'Si no funciona en el celular, no funciona.'],
			cta: '¿Hay algo que tu equipo repite a mano cada campaña? Probablemente se puede volver producto.',
		},
		en: {
			category: 'Two apps for selling more',
			summary: 'Two apps any Shopify store can install: an announcement bar at the top for promotions, and a buy button that stays visible while people scroll down the page.',
			context: 'Every time a store wants to announce a promotion, someone has to go edit the site code. It is slow, it breaks easily, and it almost always ends up looking wrong on a phone.',
			challenge: 'Turn two tricks everyone builds by hand into installable products that read the store’s real price and stock and are set up from one simple screen.',
			role: 'The idea, the design, the code for both apps, and getting them ready for anyone to install. All me.',
			approach: [
				'Install on top of the store without touching its code, so uninstalling leaves nothing broken.',
				'Design for the phone first, and always know which product, which size, and how much stock exists right now.',
				'Make both look like the same family, but let each one do a single thing well.',
			],
			deliverables: [
				'Prometeo: the top bar. Message, button, countdown, and once a customer closes it, it stays closed.',
				'Hermes: the buy button that follows you down the page, with size, quantity, and a warning when something sells out.',
				'The settings panel inside Shopify, and everything Shopify requires to publish an app.',
			],
			outcomes: ['Two working apps, installable on any Shopify store.', 'Set up in minutes with no code: whoever installs them needs no help from anyone.'],
			principles: ['It should make sense without a manual.', 'Never show a made-up price or stock number.', 'If it does not work on a phone, it does not work.'],
			cta: 'Is your team redoing the same thing by hand every campaign? That can probably become a product.',
		},
	},
	'bloqio-builder': {
		es: {
			category: 'Creador de páginas con IA',
			summary: 'Le dices qué necesita tu negocio y arma la página. Pero no es una caja negra: ves cada bloque, lo editas a mano y puedes deshacer lo que la IA propuso. Tú publicas, no ella.',
			context: 'Para hacer una web hoy tienes que aprender de plantillas, bloques y decisiones de diseño antes de poder decir lo que tu negocio necesita. Mucha gente se queda en ese paso.',
			challenge: 'Quitar esa barrera sin caer en lo contrario: que la IA haga todo por dentro y la persona no entienda qué pasó ni pueda cambiarlo.',
			role: 'Es mi producto. Definí qué debía ser, cómo se usa, cómo están hechos los bloques por dentro, hasta dónde puede llegar la IA, y programé la aplicación.',
			approach: [
				'Que puedas pedirlo por chat, verlo al instante y corregirlo a mano, sin cambiar de pantalla.',
				'Que cada cosa que hace la IA sea un cambio concreto y con nombre, que puedas revisar y deshacer.',
				'Que funcione desde el celular de principio a fin, no solo en una computadora.',
			],
			deliverables: [
				'El editor: bloques que se arrastran y un panel que muestra las opciones del bloque que seleccionaste.',
				'Blob, el asistente que escribe los textos y propone la estructura, siempre como algo que puedes rechazar.',
				'Toda la aplicación por detrás: cuentas, inicio de sesión, guardado y administración.',
			],
			outcomes: ['Una aplicación completa y funcionando, donde pedir por chat y editar a mano conviven.', 'El camino entero cubierto: desde «quiero vender esto» hasta una página lista para publicar.'],
			principles: ['La IA propone; tú decides.', 'Nada cambia sin que lo veas y puedas deshacerlo.', 'Lo difícil aparece solo cuando lo necesitas.'],
			cta: '¿Tienes una idea complicada que nadie logra explicar? Eso es lo que más me gusta resolver.',
		},
		en: {
			category: 'AI page builder',
			summary: 'You tell it what your business needs and it builds the page. But it is not a black box: you see every block, edit it by hand, and can undo whatever the AI suggested. You publish, not it.',
			context: 'Building a website today means learning about templates, blocks, and design decisions before you can even say what your business needs. Plenty of people stop right there.',
			challenge: 'Remove that barrier without falling into the opposite trap: the AI doing everything internally while the person has no idea what happened or how to change it.',
			role: 'It is my product. I defined what it should be, how it is used, how the blocks work underneath, how far the AI is allowed to go, and I wrote the application.',
			approach: [
				'Let you ask in chat, see it immediately, and fix it by hand, without switching screens.',
				'Make everything the AI does a concrete, named change you can review and undo.',
				'Make it work from a phone end to end, not only on a computer.',
			],
			deliverables: [
				'The editor: blocks you drag, and a panel showing the options for whichever block you selected.',
				'Blob, the assistant that writes the text and proposes the structure, always as something you can reject.',
				'The whole application behind it: accounts, sign-in, saving, and administration.',
			],
			outcomes: ['A complete, working application where asking in chat and editing by hand live side by side.', 'The whole path covered: from “I want to sell this” to a page ready to publish.'],
			principles: ['AI proposes; you decide.', 'Nothing changes without you seeing it and being able to undo it.', 'The hard parts show up only when you need them.'],
			cta: 'Got a complicated idea nobody manages to explain? That is the kind of thing I most enjoy solving.',
		},
	},
	'la-carniceria-virtual': {
		es: {
			category: 'Diagnóstico de una tienda',
			summary: 'Revisé una carnicería online de arriba a abajo para encontrar por qué la gente entraba y no compraba. El resultado es una lista de arreglos ordenada por lo que más mueve la aguja.',
			context: 'La Carnicería Virtual tenía catálogo grande y una buena oferta. Lo que fallaba era otra cosa: el sitio cargaba lento, costaba encontrar el corte que buscabas, y faltaban señales que dieran confianza para pagar carne por internet.',
			challenge: 'Decir qué arreglar primero sin proponer un rediseño que nadie pidió, y sin confundir un número técnico que se ve feo con algo que sí esté costando ventas.',
			role: 'Revisé la experiencia, la velocidad, la búsqueda en Google, la medición y cómo está armada la tienda, y lo convertí en una lista de trabajo en orden.',
			approach: [
				'Recorrer la tienda como lo haría un cliente: portada, categoría, producto y carrito, sin saltarme pasos.',
				'Contrastar lo que se ve con lo que miden las herramientas y con cómo está construido el sitio por dentro.',
				'Ordenar cada hallazgo por cuánto mueve la venta, cuánto cuesta arreglarlo y de quién depende.',
			],
			deliverables: ['El mapa de todo lo que encontré, por área.', 'Cada cosa puntuada: cuánto suma y cuánto cuesta.', 'Un plan a 30, 60 y 90 días: primero lo barato y rápido, después lo de fondo.'],
			outcomes: ['Un plan concreto sobre tres frentes: que cargue rápido en el celular, que se encuentre el producto y que dé confianza pagar.', 'El equipo quedó con un orden claro en vez de una lista de problemas sueltos.'],
			principles: ['Primero entender, después rediseñar.', 'Un número técnico solo importa si le cuesta dinero al negocio.', 'Un análisis que no termina en decisiones no sirve.'],
			cta: '¿Sospechas que tu tienda pierde ventas pero no sabes dónde? Eso se puede averiguar.',
		},
		en: {
			category: 'Store diagnosis',
			summary: 'I reviewed an online butcher shop top to bottom to find why people came in and did not buy. The result is a list of fixes ordered by what moves the needle most.',
			context: 'La Carnicería Virtual had a large catalog and a good offer. What was failing was elsewhere: the site loaded slowly, finding the cut you wanted was hard, and it lacked the signals that make you comfortable buying meat online.',
			challenge: 'Say what to fix first without proposing a redesign nobody asked for, and without mistaking an ugly-looking technical number for something actually costing sales.',
			role: 'I did the full analysis — experience, speed, Google search, measurement, and how the store is put together — and turned it into an ordered list of work.',
			approach: [
				'Walk the store the way a customer would: homepage, category, product, and cart, skipping no steps.',
				'Compare what you can see with what the tools measure and with how the site is built underneath.',
				'Rank every finding by how much it moves sales, how much it costs to fix, and who it depends on.',
			],
			deliverables: ['A map of everything I found, by area.', 'Each item scored: how much it adds and how much it costs.', 'A 30, 60, and 90-day plan: the cheap and fast things first, the deeper ones after.'],
			outcomes: ['A concrete plan on three fronts: load fast on a phone, make products findable, and make paying feel safe.', 'The team ended up with a clear order instead of a pile of loose problems.'],
			principles: ['Understand first, redesign after.', 'A technical number only matters if it costs the business money.', 'An analysis that does not end in decisions is useless.'],
			cta: 'Suspect your store is losing sales but cannot tell where? That can be found out.',
		},
	},
	'come-verde': {
		es: {
			category: 'Marca de alimentos · Crecimiento',
			summary: 'Para una marca de alimentos: cómo se comunica, dónde se anuncia, cómo vende en Amazon y Mercado Libre, y qué parte de ese trabajo puede hacer la IA. Un solo sistema en lugar de esfuerzos sueltos.',
			context: 'Come Verde vende snacks saludables en tiendas físicas y en marketplaces. Ahí la lógica es distinta a la de una tienda propia: importa que la gente te recuerde en el súper y que el producto salga del anaquel, no solo que haga clic en un anuncio.',
			challenge: 'Poner de acuerdo a marca, publicidad y medición sobre tres cosas: que te recuerden, que el producto esté donde la gente lo busca y en qué momento del día se consume. Sin reducirlo todo a cuántas ventas cerró el anuncio de ayer.',
			role: 'Dirijo la parte de ecommerce y de medios, me coordino con los equipos de marca y comercial, y armo los sistemas con los que se planea, se lanza y se aprende de cada campaña.',
			approach: [
				'Separar tres cosas que suelen mezclarse: construir marca, empujar una promoción concreta y vender en marketplaces.',
				'Anunciar donde el producto realmente está en anaquel, y en la época del año en que se consume.',
				'Usar IA para acelerar lo repetitivo, como briefs, variantes de anuncio y resúmenes, dentro de una estrategia que define el equipo.',
			],
			deliverables: ['El manual de cómo se trabaja la publicidad digital, para que no dependa de quién esté ese mes.', 'Guías por tipo de campaña, qué canal sirve para qué, y quién es el cliente.', 'Un tablero donde se ve qué está funcionando, qué se está probando y qué aprendimos.'],
			outcomes: ['Una forma de trabajar hecha para producto de anaquel, no copiada de una tienda online.', 'Quedó claro quién decide qué entre marca, medios y comercial.'],
			principles: ['Primero que te recuerden; después optimizar el anuncio.', 'No anunciar donde el producto no está.', 'La IA acelera el trabajo; no decide la estrategia.'],
			cta: '¿Vendes en anaquel y en internet y sientes que van por caminos separados? Se pueden juntar.',
		},
		en: {
			category: 'Food brand · Growth',
			summary: 'For a food brand: how it speaks, where it advertises, how it sells on Amazon and Mercado Libre, and which part of that work AI can take. One system instead of scattered efforts.',
			context: 'Come Verde sells healthy snacks in physical stores and on marketplaces. The logic there is different from running your own store: what matters is that people remember you at the supermarket and that the product leaves the shelf, not just that they click an ad.',
			challenge: 'Get brand, advertising, and measurement to agree on three things: that people remember you, that the product sits where they look for it, and when in the day it gets eaten. Without reducing all of it to how many sales yesterday’s ad closed.',
			role: 'I lead the ecommerce and media side, coordinate with the brand and commercial teams, and build the systems used to plan, launch, and learn from every campaign.',
			approach: [
				'Separate three things that usually get mixed: building the brand, pushing a specific promotion, and selling on marketplaces.',
				'Advertise where the product is actually on the shelf, and in the season when people eat it.',
				'Use AI to speed up the repetitive parts — briefs, ad variants, summaries — inside a strategy the team defines.',
			],
			deliverables: ['The handbook for how digital advertising gets done, so it does not depend on who is around that month.', 'Guides by campaign type, which channel serves which purpose, and who the customer is.', 'A dashboard showing what is working, what is being tested, and what we learned.'],
			outcomes: ['A way of working built for shelf products, not copied from an online store.', 'It became clear who decides what across brand, media, and commercial.'],
			principles: ['First be remembered; optimize the ad after.', 'Do not advertise where the product is not.', 'AI speeds up the work; it does not decide the strategy.'],
			cta: 'Selling both on shelves and online, and they feel like separate worlds? They can be joined.',
		},
	},
	'miawseo': {
		es: {
			category: 'Sitio de contenido · Lo hice completo',
			summary: 'Un sitio sobre razas de gatos donde te mueves como en el metro: líneas, estaciones y rutas. La gente puede aportar contenido, pero nada se publica sin revisión. Lo diseñé y lo programé completo.',
			context: 'MIAWSEO es un proyecto que empecé por mi cuenta. La idea era simple: hay muchísima información sobre razas de gatos, y toda está organizada como enciclopedia, que es justo la forma más aburrida de descubrir algo.',
			challenge: 'Ordenar mucho contenido sin que te pierdas, y dejar que la gente aporte sin que eso arruine la calidad de lo que ya está publicado.',
			role: 'Todo: qué debía ser, cómo se organiza el contenido, cómo se ve, y la programación del sitio y del panel de moderación.',
			approach: ['Usar un mapa de metro como forma de navegar: sabes dónde estás y qué viene después sin pensarlo.', 'Que cada raza se cuente como una historia, no como una ficha técnica, pero siempre con la misma estructura.', 'Aceptar aportaciones del público, con una revisión obligatoria antes de que se publiquen.'],
			deliverables: ['La Michiteca: el catálogo navegable con buscador, estaciones y rutas.', 'Veinte exhibiciones temáticas que se arman solas desde los datos.', 'El formulario para que la gente aporte y el panel donde yo apruebo o rechazo.'],
			outcomes: ['Un catálogo grande que se recorre sin perderse, porque tiene forma de lugar y no de índice.', 'Contenido propio y aportaciones del público conviviendo sin que baje la calidad.'],
			principles: ['Saber dónde estás es parte del producto.', 'Contar, no enumerar.', 'Comunidad sí, pero con alguien revisando.'],
			cta: '¿Tienes mucho contenido y nadie encuentra nada? Ese problema tiene solución.',
		},
		en: {
			category: 'Content site · Built end to end',
			summary: 'A site about cat breeds where you move around like on a metro: lines, stations, and routes. People can contribute, but nothing publishes without review. I designed and coded all of it.',
			context: 'MIAWSEO is a project I started on my own. The idea was simple: there is a huge amount of information about cat breeds, and all of it is organized like an encyclopedia, which is the most boring possible way to discover anything.',
			challenge: 'Organize a lot of content without you getting lost, and let people contribute without that wrecking the quality of what is already published.',
			role: 'All of it: what it should be, how the content is organized, how it looks, and the code for both the site and the moderation panel.',
			approach: ['Use a metro map as the way to navigate: you know where you are and what comes next without thinking about it.', 'Tell every breed as a story rather than a spec sheet, always in the same structure.', 'Accept public contributions, with mandatory review before anything goes live.'],
			deliverables: ['The Michiteca: the browsable catalog with search, stations, and routes.', 'Twenty themed exhibitions that assemble themselves from the data.', 'The form people use to contribute and the panel where I approve or reject.'],
			outcomes: ['A large catalog you can wander without getting lost, because it is shaped like a place, not an index.', 'Original content and public contributions coexisting without quality dropping.'],
			principles: ['Knowing where you are is part of the product.', 'Tell, do not list.', 'Community yes, but with someone reviewing.'],
			cta: 'Got lots of content and nobody can find anything? That problem is solvable.',
		},
	},
	'vineria': {
		es: {
			category: 'Guía de vinos',
			summary: 'Una guía para elegir vino sin saber de vino. Buscas, filtras por lo que te gusta y cada ficha te va contando más solo si quieres seguir leyendo.',
			context: 'Vinería es un proyecto propio. Nace de algo que le pasa a mucha gente: quieres entender de vino, abres cualquier guía y te topas con un vocabulario que asume que ya sabes.',
			challenge: 'Convertir mucha investigación en algo que un principiante disfrute, sin volverlo tan simple que deje de ser útil cuando ya sabes un poco más.',
			role: 'Escribí el contenido, decidí cómo se estructura, diseñé la interfaz y programé el sitio.',
			approach: ['Organizar por lo que la gente pregunta («qué tomo con esto», «cuál me va a gustar») y no por cómo lo clasifica un sommelier.', 'Arrancar con pocas opciones: un buscador y cuatro filtros, no treinta.', 'Que la información profunda esté ahí, pero solo aparezca si decides seguir leyendo.'],
			deliverables: ['Veinticuatro variedades documentadas, todas con la misma estructura.', 'El explorador: buscas, filtras y abres la ficha sin salir de la página.', 'Mapa de dónde viene cada uno, con qué comida va, glosario y la bitácora de mi investigación.'],
			outcomes: ['Alguien que no sabe nada de vino puede elegir uno en dos minutos y entender por qué.', 'La estructura aguanta crecer: agregar variedades no obliga a rehacer nada.'],
			principles: ['Si un principiante no lo entiende, está mal escrito.', 'Lo complejo se muestra cuando lo pides, no antes.', 'Cómo navegas y qué lees son la misma decisión.'],
			cta: '¿Quieres explicar algo complicado a gente que empieza de cero? Ahí me muevo bien.',
		},
		en: {
			category: 'Wine guide',
			summary: 'A guide for choosing wine without knowing about wine. You search, filter by what you like, and each entry tells you more only if you want to keep reading.',
			context: 'Vinería is a project of my own. It comes from something that happens to a lot of people: you want to understand wine, you open any guide, and you hit a vocabulary that assumes you already know.',
			challenge: 'Turn a lot of research into something a beginner enjoys, without making it so simple that it stops being useful once you know a bit more.',
			role: 'I wrote the content, decided how it is structured, designed the interface, and coded the site.',
			approach: ['Organize around what people actually ask — what goes with this, which one will I like — not how a sommelier classifies it.', 'Start with few options: one search box and four filters, not thirty.', 'Keep the deep information available, but only show it if you choose to keep reading.'],
			deliverables: ['Twenty-four varieties documented, all in the same structure.', 'The explorer: you search, filter, and open an entry without leaving the page.', 'A map of where each comes from, what food it goes with, a glossary, and my research log.'],
			outcomes: ['Someone who knows nothing about wine can pick one in two minutes and understand why.', 'The structure holds up as it grows: adding varieties does not mean redoing anything.'],
			principles: ['If a beginner does not get it, it is badly written.', 'Complexity shows up when you ask for it, not before.', 'How you navigate and what you read are the same decision.'],
			cta: 'Need to explain something complicated to people starting from zero? That is where I do my best work.',
		},
	},
	'ahp-plus': {
		es: {
			category: 'Producto propio · Código abierto',
			summary: 'AHP+ mantiene el hilo del trabajo dentro del proyecto: qué se hizo, qué se comprobó y qué sigue. Así puedes cambiar de asistente, cuenta o computadora sin empezar de cero.',
			context: 'Los asistentes recuerdan cada conversación de forma distinta, pero esa memoria no siempre se puede comprobar ni viaja con el código. AHP+ 1.4.1 convierte el contexto importante en archivos del repositorio, para que Codex, Cursor, Claude Code, OpenCode, ChatGPT u otro agente puedan ubicarse antes de actuar.',
			challenge: 'Hacer portable el contexto sin convertirlo en burocracia: una lectura clara para personas, una estructura verificable para agentes y límites explícitos para que ninguna automatización sustituya la autoridad humana.',
			role: 'Creador y arquitecto de AHP+. Definí la especificación 1.4.1, el modelo de certeza y evidencia, la CLI pública, los adaptadores, los handoffs sellados, la mensajería causal, las salas de proyecto, la identidad por dispositivo y los límites de autoridad.',
			approach: [
				'Cada proyecto conserva su memoria operativa en .ahp/: estado, decisiones, pruebas, bloqueos y siguiente acción viajan con el trabajo.',
				'Cada afirmación declara su certeza; los eventos causales y handoffs se verifican antes de usarse como frontera de continuidad.',
				'La interacción se pide con lenguaje natural en el IDE y se ejecuta con una CLI reproducible; las acciones externas siguen necesitando autorización humana.',
			],
			deliverables: [
				'Especificación abierta y CLI AHP+ 1.4.1, publicadas como @jossuealcala/ahp-plus bajo licencia Apache-2.0.',
				'Instalación guiada con un comando, pulso de proyecto, contexto acotado, registros, checkpoints, locks cooperativos y handoffs.',
				'Adaptadores para Cursor, OpenCode, Codex, Claude Code, ChatGPT y agentes genéricos, con consulta acotada y salas de proyecto.',
				'Identidades Ed25519/X25519 por dispositivo, sobres AES-256-GCM y recibos firmados para transporte autorizado.',
			],
			outcomes: [
				'AHP+ 1.4.1 está publicado e instalable desde npm o GitHub.',
				'En este portafolio se ejecutó la CLI 1.4.1: verificación estricta de 21 archivos, handoff de Claude recibido como READY y respuesta causal guardada en una sala compartida.',
				'La prueba local quedó como LOCAL_CAPTURED: demuestra persistencia e integridad en el repositorio, no inyección en chats nativos ni transporte remoto.',
			],
			principles: ['El proyecto manda, no la conversación.', 'Nada se da por hecho sin prueba.', 'Lo importante lo autoriza una persona.'],
			cta: 'Hablemos de cómo hacer que el trabajo con IA sea más fácil de continuar, revisar y confiar.',
		},
		en: {
			category: 'Owned product · Open source',
			summary: 'AHP+ keeps the thread of the work inside the project: what was done, what was checked, and what comes next. You can switch assistant, account, or computer without starting over.',
			context: 'Assistants remember each conversation differently, but that memory cannot always be checked and does not travel with the code. AHP+ 1.4.1 turns important context into repository files so Codex, Cursor, Claude Code, OpenCode, ChatGPT, or another agent can orient itself before acting.',
			challenge: 'Make context portable without turning it into bureaucracy: a clear reading for people, a verifiable structure for agents, and explicit boundaries so automation never replaces human authority.',
			role: 'Creator and architect of AHP+. I defined the 1.4.1 specification, certainty and evidence model, public CLI, adapters, sealed handoffs, causal messaging, project rooms, per-device identity, and authority boundaries.',
			approach: [
				'Every project keeps its operating memory in .ahp/: state, decisions, proof, locks, and the next action travel with the work.',
				'Every claim states its certainty; causal events and handoffs are verified before they become a continuity boundary.',
				'Interaction is requested in natural language in the IDE and executed through a reproducible CLI; external actions still require human authorization.',
			],
			deliverables: [
				'Open specification and AHP+ 1.4.1 CLI, published as @jossuealcala/ahp-plus under Apache-2.0.',
				'One-command setup, project pulse, bounded context, records, checkpoints, cooperative locks, and handoffs.',
				'Adapters for Cursor, OpenCode, Codex, Claude Code, ChatGPT, and generic agents, with bounded consultation and project rooms.',
				'Per-device Ed25519/X25519 identities, AES-256-GCM envelopes, and signed receipts for authorized transport.',
			],
			outcomes: [
				'AHP+ 1.4.1 is published and installable from npm or GitHub.',
				'In this portfolio, the 1.4.1 CLI was executed: strict verification of 21 files, a Claude handoff received as READY, and a causal reply stored in a shared room.',
				'The local proof remains LOCAL_CAPTURED: it proves persistence and integrity in the repository, not native chat injection or remote transport.',
			],
			principles: ['The project is the source of truth, not the chat.', 'Nothing counts as done without proof.', 'A person authorizes what matters.'],
			cta: 'Let’s discuss making AI work easier to continue, review, and trust.',
		},
	},
	tiendaonline: {
		es: {
			category: 'Tienda de ejemplo · Concepto',
			summary: 'Una tienda de ejemplo que armé para mostrar cómo trabajo: pensada para que la marca se sienta cara, el producto se encuentre rápido y comprar desde el celular sea cómodo.',
			context: 'Casa Tecalli es una marca inventada de alimentos premium. La usé para responder una pregunta concreta: ¿qué tanto se puede lograr usando solo lo que Shopify ya trae, sin instalar aplicaciones de terceros?',
			challenge: 'Que se vea como una marca cara y al mismo tiempo el dueño pueda editarlo todo desde el panel de Shopify, sin tocar código y sin perderse en el camino al carrito.',
			role: 'La idea, cómo está armado el theme por dentro, el diseño de todas las pantallas y la programación.',
			approach: ['Que cada bloque se pueda mover, editar o apagar desde el panel de Shopify.', 'Nunca inventar datos: precio, talla y stock salen siempre de Shopify.', 'Que funcione igual con el dedo, con teclado, y para quien tiene desactivadas las animaciones.'],
			deliverables: ['Un theme completo, con todas las secciones configurables desde el panel.', 'Todas las pantallas: portada, categoría, buscador, producto, carrito, error 404 y tarjeta de regalo.', 'Galería de producto, puntos marcados sobre la foto, cuenta regresiva y el flujo de compra.'],
			outcomes: ['Una tienda que se ve cara sin depender de una sola app externa.', 'Está lista para cargarle catálogo real: no es una maqueta, funciona.'],
			principles: ['Si el dueño no lo puede editar solo, no sirve.', 'Cada app que instalas es algo que se puede romper.', 'Se diseña para el celular primero.'],
			cta: '¿Tu tienda depende de diez apps y ninguna hace bien lo suyo? Hay otra forma.',
		},
		en: {
			category: 'Sample store · Concept',
			summary: 'A sample store I built to show how I work: made so the brand feels premium, products are easy to find, and buying from a phone is comfortable.',
			context: 'Casa Tecalli is a made-up premium food brand. I used it to answer a concrete question: how far can you get using only what Shopify already gives you, without installing third-party apps?',
			challenge: 'Make it look like an expensive brand while the owner can still edit everything from the Shopify panel, without touching code and without anyone losing the path to the cart.',
			role: 'The idea, how the theme is built underneath, the design of every screen, and the code.',
			approach: ['Every block can be moved, edited, or switched off from the Shopify panel.', 'Never invent data: price, size, and stock always come from Shopify.', 'Works the same with a finger, with a keyboard, and for people who turned animations off.'],
			deliverables: ['A complete theme, with every section configurable from the panel.', 'Every screen: homepage, category, search, product, cart, 404, and gift card.', 'Product gallery, marked points over the photo, countdown, and the purchase flow.'],
			outcomes: ['A store that looks expensive without depending on a single external app.', 'It is ready for a real catalog: this is not a mockup, it works.'],
			principles: ['If the owner cannot edit it alone, it is no good.', 'Every app you install is one more thing that can break.', 'You design for the phone first.'],
			cta: 'Does your store depend on ten apps and none of them does its job well? There is another way.',
		},
	},
};

export function casePresentation(slug: string, locale: Locale): CasePresentation | undefined {
	return presentations[slug as CaseSlug]?.[locale];
}

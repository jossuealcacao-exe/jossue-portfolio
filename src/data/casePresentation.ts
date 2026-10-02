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
			summary: 'Dirijo la venta en línea de una marca de suplementos. Eso incluye la tienda, la publicidad que trae visitas, los números que dicen qué funciona y la asistente con IA que ayuda a vender. Lo armé para que el equipo lo opere sin depender de mí.',
			context: 'WU Nutrition vende suplementos por su propia tienda y también en Amazon y Mercado Libre. El reto de fondo es que lo que promete un anuncio siga siendo verdad cuando la persona llega a la página, elige un producto, paga y vuelve meses después.',
			challenge: 'Había muchas iniciativas sueltas y cada una resolvía su parte. Faltaba juntarlas en algo que se pudiera reutilizar y que el equipo pudiera mover sin que cada cambio fuera un proyecto nuevo.',
			role: 'Soy Head of E-commerce & Digital Growth. Decido hacia dónde va el ecommerce, y además meto mano: diseño, programo la tienda, reviso por qué la gente no compra, manejo la publicidad y armo las automatizaciones.',
			approach: [
				'Ver el anuncio, la página a la que llega, el catálogo, el producto y el carrito como un mismo camino que recorre el cliente, en lugar de cinco piezas que cada quien maneja por su lado.',
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
			cta: 'Si tus anuncios traen visitas pero no ventas, cuéntame qué vendes y lo reviso contigo.',
		},
		en: {
			category: 'Supplement store · Shopify',
			summary: 'I run online sales for a supplement brand. That includes the store, the advertising that brings visitors, the numbers that show what works, and the AI assistant that helps sell. I set it up so the team can run it without depending on me.',
			context: 'WU Nutrition sells supplements through its own store and also on Amazon and Mercado Libre. The underlying challenge is that whatever an ad promises has to still be true when the person lands on the page, picks a product, pays, and comes back months later.',
			challenge: 'There were many separate initiatives, each solving its own piece. What was missing was pulling them into something reusable the team could move without every change becoming a new project.',
			role: 'I am Head of E-commerce & Digital Growth. I decide where ecommerce is going, and I also do the work: design, code the store, dig into why people are not buying, run the advertising, and build the automations.',
			approach: [
				'See the ad, the page it lands on, the catalog, the product, and the cart as one path the customer walks, instead of five pieces each person handles separately.',
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
			cta: 'If your ads bring visitors but not sales, tell me what you sell and I will go through it with you.',
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
			cta: 'Si tu equipo repite la misma tarea a mano en cada campaña, probablemente se puede convertir en una herramienta.',
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
			cta: 'If your team repeats the same task by hand every campaign, it can probably become a tool.',
		},
	},
	'bloqio-builder': {
		es: {
			category: 'Creador de páginas con IA',
			summary: 'Le dices qué necesita tu negocio y arma la página. Ves cada bloque, lo puedes editar a mano y puedes deshacer lo que la IA propuso. Tú decides cuándo se publica.',
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
			cta: 'Si tienes una idea difícil de explicar, cuéntamela. Es el tipo de problema que más me gusta resolver.',
		},
		en: {
			category: 'AI page builder',
			summary: 'You tell it what your business needs and it builds the page. You see every block, can edit it by hand, and can undo whatever the AI suggested. You decide when it gets published.',
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
			cta: 'If you have an idea that is hard to explain, tell me about it. It is the kind of problem I most enjoy solving.',
		},
	},
	'la-carniceria-virtual': {
		es: {
			category: 'Diagnóstico de una tienda',
			summary: 'Revisé una carnicería online de arriba a abajo para encontrar por qué la gente entraba y no compraba. Entregué una lista de arreglos ordenada por cuánto ayuda cada uno a vender.',
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
			cta: 'Si sientes que tu tienda pierde ventas y no sabes en qué parte, se puede averiguar. Empiezo por recorrerla como cliente.',
		},
		en: {
			category: 'Store diagnosis',
			summary: 'I reviewed an online butcher shop top to bottom to find why people came in and did not buy. I delivered a list of fixes ordered by how much each one helps sales.',
			context: 'La Carnicería Virtual had a large catalog and a good offer. What was failing was elsewhere: the site loaded slowly, finding the cut you wanted was hard, and it lacked the signals that make you comfortable buying meat online.',
			challenge: 'Say what to fix first without proposing a redesign nobody asked for, and without mistaking an ugly-looking technical number for something actually costing sales.',
			role: 'I reviewed the experience, the speed, Google search, the measurement, and how the store is put together, and turned it into an ordered list of work.',
			approach: [
				'Walk the store the way a customer would: homepage, category, product, and cart, skipping no steps.',
				'Compare what you can see with what the tools measure and with how the site is built underneath.',
				'Rank every finding by how much it moves sales, how much it costs to fix, and who it depends on.',
			],
			deliverables: ['A map of everything I found, by area.', 'Each item scored: how much it adds and how much it costs.', 'A 30, 60, and 90-day plan: the cheap and fast things first, the deeper ones after.'],
			outcomes: ['A concrete plan on three fronts: load fast on a phone, make products findable, and make paying feel safe.', 'The team ended up with a clear order instead of a pile of loose problems.'],
			principles: ['Understand first, redesign after.', 'A technical number only matters if it costs the business money.', 'An analysis that does not end in decisions is useless.'],
			cta: 'If you feel your store is losing sales and cannot tell where, that can be found out. I start by walking through it as a customer.',
		},
	},
	'come-verde': {
		es: {
			category: 'Marca de alimentos · Crecimiento',
			summary: 'Trabajo con una marca de alimentos en cómo se comunica, dónde se anuncia, cómo vende en Amazon y Mercado Libre y qué parte de ese trabajo puede hacer la IA. La idea es que todo eso se planee junto y no cada área por su lado.',
			context: 'Come Verde vende snacks saludables en tiendas físicas y en marketplaces. Ahí la lógica es distinta a la de una tienda propia: importa que la gente te recuerde en el súper y que el producto salga del anaquel, no solo que haga clic en un anuncio.',
			challenge: 'Poner de acuerdo a marca, publicidad y medición sobre tres cosas: que te recuerden, que el producto esté donde la gente lo busca y en qué momento del día se consume. Sin reducirlo todo a cuántas ventas cerró el anuncio de ayer.',
			role: 'Dirijo la parte de ecommerce y de medios, me coordino con los equipos de marca y comercial, y armo los sistemas con los que se planea, se lanza y se aprende de cada campaña.',
			approach: [
				'Separar tres cosas que suelen mezclarse: construir marca, empujar una promoción concreta y vender en marketplaces.',
				'Anunciar donde el producto realmente está en anaquel, y en la época del año en que se consume.',
				'Usar IA para acelerar lo repetitivo, como las instrucciones para cada pieza (briefs), las variantes de anuncio y los resúmenes, dentro de una estrategia que define el equipo.',
			],
			deliverables: ['El manual de cómo se trabaja la publicidad digital, para que no dependa de quién esté ese mes.', 'Guías por tipo de campaña, qué canal sirve para qué, y quién es el cliente.', 'Un tablero donde se ve qué está funcionando, qué se está probando y qué aprendimos.'],
			outcomes: ['Una forma de trabajar hecha para producto de anaquel, no copiada de una tienda online.', 'Quedó claro quién decide qué entre marca, medios y comercial.'],
			principles: ['Primero que te recuerden; después se afina el anuncio.', 'No anunciar donde el producto no está.', 'La IA acelera el trabajo; no decide la estrategia.'],
			cta: 'Si vendes en tiendas físicas y en internet y cada canal va por su lado, se pueden planear juntos.',
		},
		en: {
			category: 'Food brand · Growth',
			summary: 'I work with a food brand on how it speaks, where it advertises, how it sells on Amazon and Mercado Libre, and which part of that work AI can take. The goal is to plan all of it together instead of each area on its own.',
			context: 'Come Verde sells healthy snacks in physical stores and on marketplaces. The logic there is different from running your own store: what matters is that people remember you at the supermarket and that the product leaves the shelf, not just that they click an ad.',
			challenge: 'Get brand, advertising, and measurement to agree on three things: that people remember you, that the product sits where they look for it, and when in the day it gets eaten. Without reducing all of it to how many sales yesterday’s ad closed.',
			role: 'I lead the ecommerce and media side, coordinate with the brand and commercial teams, and build the systems used to plan, launch, and learn from every campaign.',
			approach: [
				'Separate three things that usually get mixed: building the brand, pushing a specific promotion, and selling on marketplaces.',
				'Advertise where the product is actually on the shelf, and in the season when people eat it.',
				'Use AI to speed up the repetitive parts, such as briefs, ad variants and summaries, inside a strategy the team defines.',
			],
			deliverables: ['The handbook for how digital advertising gets done, so it does not depend on who is around that month.', 'Guides by campaign type, which channel serves which purpose, and who the customer is.', 'A dashboard showing what is working, what is being tested, and what we learned.'],
			outcomes: ['A way of working built for shelf products, not copied from an online store.', 'It became clear who decides what across brand, media, and commercial.'],
			principles: ['First be remembered; fine-tune the ad after.', 'Do not advertise where the product is not.', 'AI speeds up the work; it does not decide the strategy.'],
			cta: 'If you sell in physical stores and online and each channel goes its own way, they can be planned together.',
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
			principles: ['Saber dónde estás es parte del producto.', 'Cada raza se cuenta como una historia.', 'Comunidad sí, pero con alguien revisando.'],
			cta: 'Si tu sitio tiene mucho contenido y la gente no encuentra lo que busca, se puede reorganizar.',
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
			principles: ['Knowing where you are is part of the product.', 'Every breed is told as a story.', 'Community yes, but with someone reviewing.'],
			cta: 'If your site has lots of content and people cannot find what they need, it can be reorganized.',
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
			principles: ['Si un principiante no lo entiende, está mal escrito.', 'Lo complejo se muestra cuando lo pides, no antes.', 'El orden del sitio y el texto se deciden juntos.'],
			cta: 'Si necesitas explicar algo complicado a gente que empieza de cero, te ayudo a ordenarlo.',
		},
		en: {
			category: 'Wine guide',
			summary: 'A guide for choosing wine without knowing about wine. You search, filter by what you like, and each entry tells you more only if you want to keep reading.',
			context: 'Vinería is a project of my own. It comes from something that happens to a lot of people: you want to understand wine, you open any guide, and you hit a vocabulary that assumes you already know.',
			challenge: 'Turn a lot of research into something a beginner enjoys, without making it so simple that it stops being useful once you know a bit more.',
			role: 'I wrote the content, decided how it is structured, designed the interface, and coded the site.',
			approach: ['Organize around what people actually ask (“what goes with this?”, “which one will I like?”) and not around how a sommelier classifies it.', 'Start with few options: one search box and four filters, not thirty.', 'Keep the deep information available, but only show it if you choose to keep reading.'],
			deliverables: ['Twenty-four varieties documented, all in the same structure.', 'The explorer: you search, filter, and open an entry without leaving the page.', 'A map of where each comes from, what food it goes with, a glossary, and my research log.'],
			outcomes: ['Someone who knows nothing about wine can pick one in two minutes and understand why.', 'The structure holds up as it grows: adding varieties does not mean redoing anything.'],
			principles: ['If a beginner does not get it, it is badly written.', 'Complexity shows up when you ask for it, not before.', 'The site’s structure and its text are decided together.'],
			cta: 'If you need to explain something complicated to people starting from zero, I can help you put it in order.',
		},
	},
	'ahp-plus': {
		es: {
			category: 'Producto propio · Código abierto',
			summary: 'AHP+ mantiene el hilo del trabajo dentro del proyecto: qué se hizo, qué se comprobó y qué sigue. Así puedes cambiar de asistente, cuenta o computadora sin empezar de cero.',
			context: 'Los asistentes recuerdan cada conversación de forma distinta, pero esa memoria no siempre se puede comprobar ni viaja con el código. AHP+ 1.4.1 convierte el contexto importante en archivos del repositorio, para que Codex, Cursor, Claude Code, OpenCode, ChatGPT u otro agente puedan ubicarse antes de actuar.',
			challenge: 'Que el contexto viaje con el proyecto sin volverse papeleo. Tenía que leerse fácil para una persona, tener una estructura que un agente pudiera comprobar y dejar claro que ninguna automatización toma decisiones que le tocan a una persona.',
			role: 'Lo creé y lo diseñé yo. Definí la especificación 1.4.1, el modelo de certeza y evidencia, la CLI pública, los adaptadores, los handoffs sellados, la mensajería causal, las salas de proyecto, la identidad por dispositivo y los límites de autoridad.',
			approach: [
				'Cada proyecto conserva su memoria operativa en .ahp/: estado, decisiones, pruebas, bloqueos y siguiente acción viajan con el trabajo.',
				'Cada afirmación dice qué tan segura es. Los eventos causales y los traspasos de trabajo (handoffs) se verifican antes de usarse como punto para retomar el trabajo.',
				'Le pides las cosas en lenguaje normal desde tu editor (IDE) y se ejecutan con una herramienta de terminal (CLI) que da el mismo resultado cada vez. Lo que sale del proyecto sigue necesitando que una persona lo autorice.',
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
			cta: 'Si trabajas con varios asistentes de IA y pierdes el hilo al pasar de uno a otro, escríbeme y te cuento cómo lo resuelvo.',
		},
		en: {
			category: 'Owned product · Open source',
			summary: 'AHP+ keeps the thread of the work inside the project: what was done, what was checked, and what comes next. You can switch assistant, account, or computer without starting over.',
			context: 'Assistants remember each conversation differently, but that memory cannot always be checked and does not travel with the code. AHP+ 1.4.1 turns important context into repository files so Codex, Cursor, Claude Code, OpenCode, ChatGPT, or another agent can orient itself before acting.',
			challenge: 'Let context travel with the project without turning into paperwork. It had to be easy for a person to read, have a structure an agent could check, and make clear that no automation takes decisions that belong to a person.',
			role: 'I created and designed AHP+. I defined the 1.4.1 specification, certainty and evidence model, public CLI, adapters, sealed handoffs, causal messaging, project rooms, per-device identity, and authority boundaries.',
			approach: [
				'Every project keeps its operating memory in .ahp/: state, decisions, proof, locks, and the next action travel with the work.',
				'Every claim says how certain it is. Causal events and handoffs are verified before they are used as the point to resume work from.',
				'You ask in plain language from your editor (IDE), and it runs through a command-line tool (CLI) that gives the same result every time. Anything that leaves the project still needs a person to authorize it.',
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
			cta: 'If you work with several AI assistants and lose the thread when switching between them, write to me and I will show you how I solve it.',
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
			cta: 'Si tu tienda depende de muchas apps y cada una falla a su manera, se puede resolver con menos.',
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
			cta: 'If your store depends on many apps and each one fails in its own way, it can be done with fewer.',
		},
	},
};

export function casePresentation(slug: string, locale: Locale): CasePresentation | undefined {
	return presentations[slug as CaseSlug]?.[locale];
}

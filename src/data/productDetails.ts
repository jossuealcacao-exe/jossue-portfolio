// Contenido de las fichas de producto que usan la plantilla común (ProductDetail): Daniela,
// AHP+, Bloqio Builder y Miawseo. Cada dato sale del producto real (código, documentación o
// lo que el sitio ya publica); lo que no se pudo comprobar se dejó fuera. Los precios, cifras
// de clientes y datos internos no van aquí.
import type { IconName } from '../components/Icon.astro';
import type { Locale } from './i18n';
import type { ProductSlug } from './products';

type Text = Record<Locale, string>;
type TextList = Record<Locale, string[]>;

export type PdpScene = 'daniela' | 'ahp' | 'bloqio' | 'miawseo';

export type ProductDetailContent = {
	/** Nombre del bucle abstracto del héroe en /videos/hero/. */
	loop: string;
	loopAlt: Text;
	scene: PdpScene;
	/** Titular en dos tonos: lo que dice, y la continuación en gris. */
	title: Record<Locale, [string, string]>;
	lede: Text;
	/** Botón principal del héroe. */
	cta: Text;
	secondary: { label: Text; href: string | Text; external?: boolean };
	/** Comando de instalación con botón de copiar, bajo los botones del héroe. */
	command?: string;
	facts: Array<{ value: Text; label: Text }>;
	overview: {
		label: Text;
		title: Record<Locale, [string, string]>;
		lede: Text;
		beforeLabel: Text;
		afterLabel: Text;
		rows: Array<{ icon: IconName; title: Text; before: Text; after: Text }>;
	};
	how: {
		label: Text;
		title: Record<Locale, [string, string]>;
		lede: Text;
		caption: Text;
		steps: Array<{ title: Text; text: Text }>;
	};
	included: {
		label: Text;
		title: Record<Locale, [string, string]>;
		items: Array<{ icon: IconName; title: Text; text: Text }>;
	};
	limits: {
		label: Text;
		title: Record<Locale, [string, string]>;
		doesLabel: Text;
		doesNotLabel: Text;
		does: TextList;
		doesNot: TextList;
	};
	fit: { yes: TextList; no: TextList };
	faq: Record<Locale, Array<[string, string]>>;
	spec: Array<{ term: Text; detail: Text }>;
	close: { title: Record<Locale, [string, string]>; text: Text; cta: Text };
};

export const productDetails: Partial<Record<ProductSlug, ProductDetailContent>> = {
	daniela: {
		loop: 'daniela',
		loopAlt: {
			es: 'Animación abstracta: burbujas de chat que llegan a un nodo de revisión, de ahí a tarjetas de producto y al carrito, sobre un cielo oscuro.',
			en: 'Abstract animation: chat bubbles reaching a checking node, then product cards and the cart, over a dark sky.',
		},
		scene: 'daniela',
		title: {
			es: ['Una asistente que ayuda a elegir y comprar,', 'con los datos reales de la tienda.'],
			en: ['An assistant that helps people choose and buy,', 'with the store’s real data.'],
		},
		lede: {
			es: 'Daniela atiende a los clientes de WU Nutrition en wunutrition.com. Recomienda productos del catálogo de Shopify, arma combos, maneja el carrito y consulta pedidos. Los precios, las existencias y las promociones salen de la tienda, no de lo que la IA recuerde.',
			en: 'Daniela serves WU Nutrition’s customers on wunutrition.com. She recommends products from the Shopify catalog, builds bundles, manages the cart and checks orders. Prices, stock and promotions come from the store, not from what the AI remembers.',
		},
		cta: { es: 'Quiero un asistente como Daniela', en: 'I want an assistant like Daniela' },
		secondary: { label: { es: 'Platica con Daniela', en: 'Talk to Daniela' }, href: 'https://wunutrition.com/', external: true },
		facts: [
			{ value: { es: '6', en: '6' }, label: { es: 'funciones, y el servidor revisa cada una', en: 'functions, and the server checks each one' } },
			{ value: { es: '60 días', en: '60 days' }, label: { es: 'se guarda cada conversación, y después se borra', en: 'each conversation is kept, then deleted' } },
			{ value: { es: '3–8 s', en: '3–8 s' }, label: { es: 'tarda normalmente en contestar', en: 'is how long she usually takes to answer' } },
		],
		overview: {
			label: { es: 'Qué hace', en: 'What she does' },
			title: { es: ['Qué atiende Daniela', 'en la tienda de WU Nutrition'], en: ['What Daniela handles', 'in the WU Nutrition store'] },
			lede: {
				es: 'Daniela lee lo que escribe la clienta, consulta los sistemas de la tienda y responde con lo que encuentra. Estas son las situaciones que atiende hoy.',
				en: 'Daniela reads what the shopper writes, checks the store’s systems and answers with what she finds. These are the situations she handles today.',
			},
			beforeLabel: { es: 'Sin asistente', en: 'Without it' },
			afterLabel: { es: 'Con Daniela', en: 'With Daniela' },
			rows: [
				{
					icon: 'basket',
					title: { es: 'Elegir un producto', en: 'Choosing a product' },
					before: { es: 'La clienta recorre el catálogo y compara por su cuenta.', en: 'The shopper browses the catalog and compares on their own.' },
					after: { es: 'Cuenta qué busca y Daniela propone productos que existen y tienen stock, con su precio y sus promociones reales.', en: 'They say what they need and Daniela suggests products that exist and are in stock, with their real price and promotions.' },
				},
				{
					icon: 'layers',
					title: { es: 'Armar el carrito', en: 'Building the cart' },
					before: { es: 'Agrega productos uno por uno y calcula solo si le conviene un combo.', en: 'They add products one by one and work out alone whether a bundle pays off.' },
					after: { es: 'Daniela arma combos y maneja el carrito (agregar, cambiar cantidad, quitar), siempre con el sí de la clienta.', en: 'Daniela builds bundles and manages the cart (add, change quantity, remove), always with the shopper’s yes.' },
				},
				{
					icon: 'envelope',
					title: { es: '¿Dónde está mi pedido?', en: 'Where is my order?' },
					before: { es: 'Escribe a soporte y espera a que alguien lo busque.', en: 'They write to support and wait for someone to look it up.' },
					after: { es: 'Pide número de pedido y correo. Si coinciden, consulta el estado en Odoo (el sistema de pedidos) sin poder modificar nada.', en: 'She asks for the order number and email. If they match, she checks the status in Odoo (the order system) without being able to change anything.' },
				},
				{
					icon: 'badge-percent',
					title: { es: 'Descuentos', en: 'Discounts' },
					before: { es: 'Un código fijo que cualquiera puede compartir.', en: 'A fixed code anyone can share.' },
					after: { es: 'Códigos que sirven una sola vez y vencen pronto, creados en el servidor. Las ofertas por correo solo le llegan a quien aceptó recibirlas (en Klaviyo).', en: 'Codes that work once and expire soon, created on the server. Email offers only reach people who agreed to receive them (in Klaviyo).' },
				},
				{
					icon: 'bolt',
					title: { es: 'Atender de noche', en: 'Serving at night' },
					before: { es: 'La duda de las 11 de la noche espera hasta la mañana.', en: 'The 11 p.m. question waits until morning.' },
					after: { es: 'Daniela contesta en segundos, cualquier día a cualquier hora.', en: 'Daniela answers in seconds, any day, any hour.' },
				},
				{
					icon: 'chats',
					title: { es: 'Un caso delicado', en: 'A sensitive case' },
					before: { es: 'Llega a soporte sin contexto y hay que preguntar todo de nuevo.', en: 'It reaches support with no context and everything is asked again.' },
					after: { es: 'Daniela lo pasa a WhatsApp de soporte con un folio y el resumen de la plática.', en: 'Daniela hands it to support on WhatsApp with a reference number and a summary of the chat.' },
				},
			],
		},
		how: {
			label: { es: 'Cómo funciona', en: 'How it works' },
			title: { es: ['Qué pasa desde que la clienta escribe', 'hasta que recibe respuesta'], en: ['What happens from the moment the shopper writes', 'until she gets an answer'] },
			lede: {
				es: 'Elige un paso para ver qué ocurre en esa etapa. La IA no entra directo a la tienda. Todo pasa primero por el servidor, que es donde están las reglas.',
				en: 'Pick a step to see what happens at that stage. The AI does not reach the store directly. Everything goes through the server first, which is where the rules live.',
			},
			caption: { es: 'Ilustración de una conversación con Daniela', en: 'Illustration of a conversation with Daniela' },
			steps: [
				{
					title: { es: 'Necesidad', en: 'Need' },
					text: {
						es: 'La clienta escribe como hablaría con una persona. El mensaje llega al servidor (un Worker de Cloudflare), que aplica los límites por persona y borra correos y teléfonos antes de guardar nada.',
						en: 'The shopper writes the way they would talk to a person. The message reaches the server (a Cloudflare Worker), which applies per-person limits and strips emails and phone numbers before anything is stored.',
					},
				},
				{
					title: { es: 'Datos', en: 'Data' },
					text: {
						es: 'El servidor consulta el catálogo de Shopify (existencia y precio) y, si preguntan por un pedido, Odoo sin poder modificarlo. La IA no entra directo a ningún sistema.',
						en: 'The server checks the Shopify catalog (stock and price) and, if someone asks about an order, Odoo without being able to change it. The AI does not reach any system directly.',
					},
				},
				{
					title: { es: 'Asistencia', en: 'Assistance' },
					text: {
						es: 'La IA redacta la respuesta en un formato fijo, solo con lo que el servidor le entregó (producto, precio y promoción). Si la respuesta no cumple el formato, se descarta y en su lugar se manda una respuesta segura.',
						en: 'The AI writes the reply in a fixed format, using only what the server handed it (product, price and promotion). If the reply breaks the format, it is discarded and a safe reply goes out instead.',
					},
				},
				{
					title: { es: 'Control', en: 'Control' },
					text: {
						es: 'Agregar al carrito, consultar un pedido o crear un descuento lo ejecuta y valida el servidor. Si el caso es delicado o la IA tarda de más, pasa a WhatsApp con folio y resumen.',
						en: 'Adding to the cart, checking an order or creating a discount is run and validated by the server. If the case is sensitive or the AI is slow, it goes to WhatsApp with a reference number and summary.',
					},
				},
			],
		},
		included: {
			label: { es: 'Qué incluye', en: 'What is included' },
			title: { es: ['Las seis funciones de Daniela,', 'cada una con sus reglas'], en: ['Daniela’s six functions,', 'each with its own rules'] },
			items: [
				{ icon: 'basket', title: { es: 'Recomendación con catálogo real', en: 'Recommendations from the real catalog' }, text: { es: 'Solo productos de Shopify que existen y tienen stock, con su precio y sus promociones vigentes.', en: 'Only Shopify products that exist and are in stock, with their current price and promotions.' } },
				{ icon: 'layers', title: { es: 'Combos y carrito', en: 'Bundles and cart' }, text: { es: 'Arma combos y maneja el carrito de la tienda. Agregar, cambiar cantidad o quitar siempre pasa por la confirmación de la clienta.', en: 'Builds bundles and manages the store cart. Adding, changing quantity or removing always goes through the shopper’s confirmation.' } },
				{ icon: 'envelope', title: { es: 'Consulta de pedidos, sin modificar nada', en: 'Order lookups, without changing anything' }, text: { es: 'Consulta el estado en Odoo con número de pedido y correo, y los dos tienen que coincidir. No puede cambiar nada.', en: 'Checks the status in Odoo with order number and email, and both must match. She cannot change anything.' } },
				{ icon: 'badge-percent', title: { es: 'Descuentos de un solo uso', en: 'Single-use discounts' }, text: { es: 'Se crean en el servidor y vencen pronto. La clave de acceso a la tienda nunca llega al navegador del cliente.', en: 'Created on the server and expire soon. The store’s access key never reaches the customer’s browser.' } },
				{ icon: 'user', title: { es: 'Consentimiento de marketing', en: 'Marketing consent' }, text: { es: 'Las ofertas conectadas con Klaviyo solo le llegan a quien aceptó recibir promociones y no se ha dado de baja.', en: 'Offers connected to Klaviyo only reach people who agreed to receive promotions and have not opted out.' } },
				{ icon: 'chats', title: { es: 'Paso a una persona de soporte', en: 'Hand-off to a support person' }, text: { es: 'Cuando el caso es delicado, lo pasa a WhatsApp de soporte con un folio y el resumen de la plática.', en: 'When a case is sensitive, she hands it to support on WhatsApp with a reference number and a summary.' } },
			],
		},
		limits: {
			label: { es: 'Control y límites', en: 'Control and limits' },
			title: { es: ['Qué controles tiene Daniela', 'y qué no puede hacer'], en: ['What controls Daniela has', 'and what she cannot do'] },
			doesLabel: { es: 'Controles', en: 'Controls' },
			doesNotLabel: { es: 'Lo que no puede hacer', en: 'What she cannot do' },
			does: {
				es: [
					'Solo responde dentro de la página de la tienda (CORS) y limita los mensajes por conexión (límite por IP).',
					'Acepta 40 mensajes por conversación y 600 caracteres por mensaje.',
					'Pone topes por hora: 6 consultas de pedido y 8 descuentos de combo.',
					'Borra correos y teléfonos de lo que guarda y purga las conversaciones a los 60 días.',
					'Marca aparte las conversaciones de prueba para no ensuciar las métricas.',
				],
				en: [
					'Only answers inside the store’s own site (CORS) and limits messages per connection (per-IP limit).',
					'Accepts 40 messages per conversation and 600 characters per message.',
					'Sets hourly caps: 6 order lookups and 8 bundle discounts.',
					'Strips emails and phone numbers from what it stores and purges conversations after 60 days.',
					'Tags test conversations separately so they do not pollute the metrics.',
				],
			},
			doesNot: {
				es: [
					'Inventar precios, productos ni promociones.',
					'Dejar ver en el navegador las claves de acceso de la tienda o de la IA.',
					'Escribir en Odoo: solo lee, y solo con un número de pedido y un correo que coincidan.',
					'Contestar por su cuenta temas de salud, legales o financieros: da una respuesta segura o pasa con una persona.',
					'Revelar sus instrucciones ni cambiar sus reglas porque alguien se lo pida.',
				],
				en: [
					'Make up prices, products or promotions.',
					'Expose the store’s or the AI’s access keys in the browser.',
					'Write to Odoo: it only reads, and only with an order number and an email that match.',
					'Answer health, legal or financial topics on its own: it gives a safe answer or hands over to a person.',
					'Reveal its instructions or change its rules because someone asks.',
				],
			},
		},
		fit: {
			yes: {
				es: ['Tienes una tienda en Shopify y tus clientes preguntan lo mismo todos los días.', 'Quieres que recomiende solo lo que está en tu catálogo, con tu precio real.', 'Tu equipo atiende pedidos y quieres que lo repetido lo conteste el asistente.'],
				en: ['You run a Shopify store and customers ask the same things every day.', 'You want it to recommend only what is in your catalog, at your real price.', 'Your team handles orders and you want the repeated questions answered by the assistant.'],
			},
			no: {
				es: ['Esperas un bot que haga de todo sin reglas: cada función de Daniela está definida.', 'No tienes catálogo ordenado ni políticas escritas: primero toca ordenar eso.', 'Buscas algo que se instale en un clic: cada asistente se construye con tus sistemas.'],
				en: ['You expect a bot that does everything with no rules: each of Daniela’s functions is defined.', 'You have no tidy catalog or written policies: that comes first.', 'You want something installed in one click: each assistant is built around your systems.'],
			},
		},
		faq: {
			es: [
				['¿Puede inventar precios o productos?', 'No. Los precios y el stock vienen de los sistemas de la tienda, y el servidor valida cada acción antes de ejecutarla. La IA solo redacta la respuesta y la ordena.'],
				['¿Ve mis pedidos?', 'Solo en lectura y solo si el número de pedido y el correo coinciden. Las conversaciones se guardan sin correos ni teléfonos y se purgan a los 60 días.'],
				['¿Me manda promociones sin permiso?', 'No. Las ofertas conectadas con Klaviyo solo se usan si la persona aceptó recibir promociones y ese permiso sigue vigente.'],
				['¿Qué pasa si es un caso delicado o falla la IA?', 'Pasa a WhatsApp de soporte con un folio y el resumen de la plática. Si la IA tarda en contestar, hay un tiempo máximo de espera y un plan B, así que nadie se queda con la pantalla colgada.'],
				['¿Puedo tener un asistente como Daniela en mi tienda?', 'Sí. Construyo asistentes como ella para otras marcas, también para WhatsApp Business. Te doy el precio después de una llamada corta; usarla cuesta centavos de dólar por conversación.'],
			],
			en: [
				['Can she make up prices or products?', 'No. Prices and stock come from the store’s systems, and the server validates every action before running it. The AI only writes the reply and puts it in order.'],
				['Can she see my orders?', 'Only read-only, and only if the order number and email match. Conversations are stored without emails or phone numbers and purged after 60 days.'],
				['Does she send promotions without permission?', 'No. Offers connected to Klaviyo are only used if the person agreed to receive promotions and that permission still stands.'],
				['What happens in a sensitive case or if the AI fails?', 'It goes to support on WhatsApp with a reference number and a summary of the chat. If the AI is slow to answer there is a maximum wait and a plan B, so nobody is left staring at a frozen screen.'],
				['Can I have an assistant like Daniela in my store?', 'Yes. I build assistants like her for other brands, also for WhatsApp Business. I give you a price after a short call; running one costs cents of a dollar per conversation.'],
			],
		},
		spec: [
			{ term: { es: 'Tipo', en: 'Type' }, detail: { es: 'Producto propio, en uso en wunutrition.com', en: 'Own product, live on wunutrition.com' } },
			{ term: { es: 'Dónde habla', en: 'Where it talks' }, detail: { es: 'El widget de la tienda en Shopify; con las mismas reglas puede atender en WhatsApp Business', en: 'The store widget on Shopify; with the same rules it can also serve on WhatsApp Business' } },
			{ term: { es: 'Servidor', en: 'Server' }, detail: { es: 'Cloudflare Workers', en: 'Cloudflare Workers' } },
			{ term: { es: 'Modelo de IA', en: 'AI model' }, detail: { es: 'Gemini, y se puede cambiar por otro sin rehacer el asistente', en: 'Gemini, and it can be swapped for another without rebuilding the assistant' } },
			{ term: { es: 'Sistemas conectados', en: 'Connected systems' }, detail: { es: 'Shopify (catálogo y carrito), Odoo (pedidos, solo lectura), Klaviyo (consentimiento) y WhatsApp (relevo)', en: 'Shopify (catalog and cart), Odoo (orders, read-only), Klaviyo (consent) and WhatsApp (hand-off)' } },
			{ term: { es: 'Idioma', en: 'Language' }, detail: { es: 'Español', en: 'Spanish' } },
			{ term: { es: 'Precio de uno para tu tienda', en: 'Price of one for your store' }, detail: { es: 'Después de una llamada corta, cuando sepa con qué sistemas se conecta', en: 'After a short call, once I know which systems it connects to' } },
		],
		close: {
			title: { es: ['¿Quieres un asistente', 'como Daniela en tu tienda?'], en: ['Do you want an assistant', 'like Daniela in your store?'] },
			text: {
				es: 'Cuéntame qué te preguntan tus clientes y con qué sistemas trabajas. Te respondo en menos de un día hábil con cómo la armaría.',
				en: 'Tell me what your customers ask and which systems you use. I reply within one business day with how I would build it.',
			},
			cta: { es: 'Quiero un asistente así', en: 'I want an assistant like this' },
		},
	},

	'ahp-plus': {
		loop: 'ahp',
		loopAlt: {
			es: 'Animación abstracta: cuatro agentes alrededor de una carpeta .ahp/ se pasan el trabajo mientras un historial de confirmaciones avanza debajo.',
			en: 'Abstract animation: four agents around a .ahp/ folder pass the work along while a history of commits advances below.',
		},
		scene: 'ahp',
		title: {
			es: ['Memoria compartida para tus agentes de código,', 'guardada en tu repositorio.'],
			en: ['Shared memory for your coding agents,', 'stored in your repository.'],
		},
		lede: {
			es: 'AHP+ guarda con Git el estado del proyecto, las decisiones y las pruebas en una carpeta .ahp/. Si cambias de Codex a Claude Code, Cursor u OpenCode, de cuenta o de computadora, el siguiente agente lee lo mismo y comprueba proyecto, rama y commit antes de tocar nada.',
			en: 'AHP+ keeps the project’s state, decisions and test results in a .ahp/ folder, with Git. If you switch from Codex to Claude Code, Cursor or OpenCode, or change account or machine, the next agent reads the same thing and checks project, branch and commit before touching anything.',
		},
		cta: { es: 'Hablar de mi flujo con agentes', en: 'Talk about my agent workflow' },
		secondary: { label: { es: 'Ver todos los comandos', en: 'See every command' }, href: { es: '/es/recursos/ahp-plus/', en: '/en/resources/ahp-plus/' } },
		command: 'npx @jossuealcala/ahp-plus@1.4.1 setup .',
		facts: [
			{ value: { es: '0', en: '0' }, label: { es: 'dependencias de terceros: solo Node y Git', en: 'third-party dependencies: just Node and Git' } },
			{ value: { es: '64', en: '64' }, label: { es: 'formas de comando, en 16 categorías', en: 'command forms, in 16 categories' } },
			{ value: { es: '1.4.1', en: '1.4.1' }, label: { es: 'versión actual, licencia Apache-2.0', en: 'current version, Apache-2.0 license' } },
		],
		overview: {
			label: { es: 'Qué resuelve', en: 'What it solves' },
			title: { es: ['Al cambiar de agente, de cuenta o de computadora', 'se pierde el contexto del proyecto'], en: ['When you change agent, account or machine', 'the project context is lost'] },
			lede: {
				es: 'Un agente de código puede seguir una conversación, pero esa conversación no dice qué commit es el correcto, qué decisiones siguen vigentes ni qué pruebas se corrieron. AHP+ lo deja escrito en el repositorio, donde ya vive tu proyecto.',
				en: 'A coding agent can follow a conversation, but the conversation does not say which commit is the right one, which decisions still stand or which tests ran. AHP+ writes it down in the repository, where your project already lives.',
			},
			beforeLabel: { es: 'Sin AHP+', en: 'Without AHP+' },
			afterLabel: { es: 'Con AHP+', en: 'With AHP+' },
			rows: [
				{
					icon: 'chat',
					title: { es: 'Cambias de agente', en: 'You switch agents' },
					before: { es: 'Le explicas el proyecto desde cero al siguiente.', en: 'You explain the project from scratch to the next one.' },
					after: { es: 'Lee .ahp/ y retoma con el estado actual, las decisiones vigentes y lo que ya se probó.', en: 'It reads .ahp/ and picks up with the current state, the decisions in force and what was already tested.' },
				},
				{
					icon: 'check-list',
					title: { es: 'Saber qué se decidió', en: 'Knowing what was decided' },
					before: { es: 'La decisión quedó en un chat que ya no abres.', en: 'The decision stayed in a chat you no longer open.' },
					after: { es: 'Cada decisión, tarea, bug, riesgo y evidencia es su propio archivo en el repositorio, con su historial en Git.', en: 'Every decision, task, bug, risk and piece of evidence is its own file in the repository, with its history in Git.' },
				},
				{
					icon: 'shield',
					title: { es: 'Cambió el commit o la rama', en: 'The commit or branch changed' },
					before: { es: 'El agente nuevo trabaja sobre otra versión y nadie se entera.', en: 'The new agent works on another version and nobody notices.' },
					after: { es: 'Antes de seguir compara proyecto, rama, commit y cambios locales. Si no coinciden, se detiene y te pide resolver la diferencia.', en: 'Before continuing it compares project, branch, commit and local changes. If they do not match, it stops and asks you to sort out the difference.' },
				},
				{
					icon: 'terminal',
					title: { es: 'Cambias de computadora o de cuenta', en: 'You change machine or account' },
					before: { es: 'El contexto se queda en la máquina o la cuenta anterior.', en: 'The context stays on the previous machine or account.' },
					after: { es: 'Viaja con el repositorio. Haces pull y el siguiente agente tiene lo mismo.', en: 'It travels with the repository. You pull and the next agent has the same thing.' },
				},
			],
		},
		how: {
			label: { es: 'Cómo funciona', en: 'How it works' },
			title: { es: ['Cómo pasa el trabajo', 'de un agente a otro'], en: ['How work passes', 'from one agent to another'] },
			lede: {
				es: 'Elige un paso para ver qué se escribe en .ahp/ y qué comprueba el agente que recibe. Los comandos son los reales; los identificadores y el commit del ejemplo son ilustrativos.',
				en: 'Pick a step to see what is written to .ahp/ and what the receiving agent checks. The commands are the real ones; the identifiers and the commit in the example are illustrative.',
			},
			caption: { es: 'Ilustración de un relevo con AHP+', en: 'Illustration of a hand-off with AHP+' },
			steps: [
				{
					title: { es: 'Instalas', en: 'Install' },
					text: {
						es: 'Corres setup en tu repositorio. Crea la carpeta .ahp/ y deja instrucciones para Codex y Claude Code. Cursor y OpenCode se agregan aparte con el comando adapter install.',
						en: 'You run setup in your repository. It creates the .ahp/ folder and leaves instructions for Codex and Claude Code. Cursor and OpenCode are added separately with the adapter install command.',
					},
				},
				{
					title: { es: 'Trabajas', en: 'Work' },
					text: {
						es: 'Mientras trabaja, el agente anota decisiones, tareas, riesgos y pruebas con record add. Cada una es su propio archivo, así Git las junta sin conflictos.',
						en: 'While it works, the agent logs decisions, tasks, risks and test results with record add. Each one is its own file, so Git merges them without conflicts.',
					},
				},
				{
					title: { es: 'Entregas', en: 'Hand off' },
					text: {
						es: 'handoff create empaqueta el relevo: proyecto, rama, commit, estado y qué sigue. No hace commit ni push; eso lo haces tú.',
						en: 'handoff create packs the hand-off: project, branch, commit, state and what comes next. It does not commit or push; that is up to you.',
					},
				},
				{
					title: { es: 'El otro comprueba', en: 'The next one checks' },
					text: {
						es: 'handoff receive compara el relevo con el repositorio. Si todo coincide, el resultado es READY y el agente sigue. Si algo cambió, se detiene y te avisa.',
						en: 'handoff receive compares the hand-off with the repository. If everything matches the result is READY and the agent continues. If something changed it stops and tells you.',
					},
				},
			],
		},
		included: {
			label: { es: 'Qué incluye', en: 'What is included' },
			title: { es: ['Qué guarda en .ahp/', 'y qué instala en tu proyecto'], en: ['What it stores in .ahp/', 'and what it installs in your project'] },
			items: [
				{ icon: 'layers', title: { es: 'Estado, decisiones y pruebas', en: 'State, decisions and tests' }, text: { es: 'Un archivo por registro (decisión, tarea, bug, riesgo, QA, requisito, evidencia) dentro de .ahp/, versionado con Git.', en: 'One file per record (decision, task, bug, risk, QA, requirement, evidence) inside .ahp/, versioned with Git.' } },
				{ icon: 'shield', title: { es: 'Relevos que se comprueban', en: 'Hand-offs that get checked' }, text: { es: 'Compara proyecto, árbol, rama, commit y cambios locales. Si no coinciden, el resultado es RECONCILIATION_REQUIRED.', en: 'Compares project, tree, branch, commit and local changes. If they do not match, the result is RECONCILIATION_REQUIRED.' } },
				{ icon: 'compass', title: { es: 'Puntos de control', en: 'Checkpoints' }, text: { es: 'Marcan dónde quedó una sesión y cuál es la siguiente acción, para retomarla. No sustituyen tus commits ni tus respaldos.', en: 'Mark where a session stopped and what the next action is, so you can resume it. They do not replace your commits or backups.' } },
				{ icon: 'chats', title: { es: 'Mensajes entre agentes', en: 'Messages between agents' }, text: { es: 'message send, reply e inbox dejan avisos con una huella SHA-256, que prueba que no se alteraron. No guardan la conversación completa.', en: 'message send, reply and inbox leave notices with a SHA-256 fingerprint, which proves they were not altered. They do not store the full conversation.' } },
				{ icon: 'lock', title: { es: 'No ejecuta acciones sensibles', en: 'No sensitive actions' }, text: { es: 'Nunca hace commit, push, merge, deploy, publicación ni eliminación. Tampoco se da permisos a sí mismo.', en: 'It never commits, pushes, merges, deploys, publishes or deletes. It does not give itself permissions either.' } },
				{ icon: 'code', title: { es: 'Adaptadores por agente', en: 'Per-agent adapters' }, text: { es: 'Codex con la skill $ahp, Claude Code con CLAUDE.md, Cursor y OpenCode con /ahp, y cualquier otro agente con AGENTS.md.', en: 'Codex with the $ahp skill, Claude Code with CLAUDE.md, Cursor and OpenCode with /ahp, and any other agent with AGENTS.md.' } },
			],
		},
		limits: {
			label: { es: 'Control y límites', en: 'Control and limits' },
			title: { es: ['Qué hace AHP+ con tu repositorio', 'y qué no hace'], en: ['What AHP+ does with your repository', 'and what it does not do'] },
			doesLabel: { es: 'Lo que hace', en: 'What it does' },
			doesNotLabel: { es: 'Lo que no hace', en: 'What it does not do' },
			does: {
				es: [
					'Escribe en .ahp/ y detiene la escritura si el commit o el estado ya no son los esperados.',
					'Instala los adaptadores primero en modo plan, sin sobrescribir nada en silencio.',
					'Marca cada afirmación con su certeza: verificada, confirmada por ti, inferida, sin verificar, vencida o en conflicto.',
					'Corre en macOS, Windows y Linux con Node 20 o más; no pide dependencias de terceros.',
				],
				en: [
					'Writes to .ahp/ and stops writing if the commit or the state is no longer the expected one.',
					'Installs adapters in plan mode first, without silently overwriting anything.',
					'Labels each claim with its certainty: verified, confirmed by you, inferred, unverified, stale or conflicted.',
					'Runs on macOS, Windows and Linux with Node 20 or later; it needs no third-party dependencies.',
				],
			},
			doesNot: {
				es: [
					'Hacer commit, push, merge, deploy, publicar ni borrar.',
					'Copiar la conversación completa ni el razonamiento del modelo.',
					'Sustituir tus pruebas ni la revisión de una persona: solo registra lo que se observó.',
					'Darte permisos: READY significa que el relevo coincide con el repositorio, no que algo esté autorizado.',
					'Guardar tokens ni archivos .env: .ahp/ viaja con Git, trátalo como el repositorio.',
				],
				en: [
					'Commit, push, merge, deploy, publish or delete.',
					'Copy the full conversation or the model’s reasoning.',
					'Replace your tests or a person’s review: it only records what was observed.',
					'Grant permissions: READY means the hand-off matches the repository, not that anything is authorized.',
					'Store tokens or .env files: .ahp/ travels with Git, treat it like the repository.',
				],
			},
		},
		fit: {
			yes: {
				es: ['Trabajas con agentes de código desde un IDE y cambias seguido de agente, de cuenta o de computadora.', 'Quieres que las decisiones y las pruebas queden en el repositorio y no en un chat.', 'Tienes Node 20 o más y un repositorio de Git con al menos un commit.'],
				en: ['You work with coding agents from an IDE and often switch agent, account or machine.', 'You want decisions and test results to stay in the repository and not in a chat.', 'You have Node 20 or later and a Git repository with at least one commit.'],
			},
			no: {
				es: ['Buscas memoria vectorial, un orquestador de agentes o un sistema de permisos: AHP+ no es ninguna de las tres.', 'Necesitas deshacer cambios por ti: los puntos de control sirven para retomar, no para revertir.', 'Trabajas fuera de Git.'],
				en: ['You look for vector memory, an agent orchestrator or a permissions system: AHP+ is none of those.', 'You need it to undo changes for you: checkpoints are for resuming, not for reverting.', 'You work outside Git.'],
			},
		},
		faq: {
			es: [
				['¿Hace commit o push por mí?', 'No. Tampoco pull, merge, deploy ni publicación. Eso lo autorizas tú.'],
				['¿Mi proyecto tiene que usar Node?', 'No. Necesitas Node 20 o más y Git en la máquina, y un repositorio con al menos un commit. Si falta un package.json, setup crea uno mínimo y privado.'],
				['¿Con qué agentes funciona?', 'Codex, Claude Code, Cursor y OpenCode tienen adaptador, y ChatGPT uno limitado de solo lectura. Cualquier otro agente con acceso al repositorio puede seguir las instrucciones de AGENTS.md.'],
				['¿Qué pasa si el relevo no coincide con el repositorio?', 'handoff receive compara proyecto, commit, árbol, rama y cambios locales. Si algo no coincide, el resultado es RECONCILIATION_REQUIRED y el agente debe detenerse hasta que lo resuelvas.'],
				['¿Guarda mis secretos o toda la conversación?', 'No copia chats ni razonamiento oculto, y las llaves privadas de dispositivo viven fuera de Git. Pero .ahp/ viaja con tu repositorio: no guardes tokens ni .env ahí.'],
			],
			en: [
				['Does it commit or push for me?', 'No. It does not pull, merge, deploy or publish either. You authorize those.'],
				['Does my project have to use Node?', 'No. You need Node 20 or later and Git on the machine, and a repository with at least one commit. If package.json is missing, setup creates a minimal private one.'],
				['Which agents does it work with?', 'Codex, Claude Code, Cursor and OpenCode have an adapter, and ChatGPT a limited read-only one. Any other agent with access to the repository can follow the instructions in AGENTS.md.'],
				['What if the hand-off does not match the repository?', 'handoff receive compares project, commit, tree, branch and local changes. If something does not match, the result is RECONCILIATION_REQUIRED and the agent must stop until you sort it out.'],
				['Does it store my secrets or the whole conversation?', 'It does not copy chats or hidden reasoning, and device private keys live outside Git. But .ahp/ travels with your repository: do not keep tokens or .env files there.'],
			],
		},
		spec: [
			{ term: { es: 'Versión', en: 'Version' }, detail: { es: '1.4.1 (4 de septiembre de 2026)', en: '1.4.1 (September 4, 2026)' } },
			{ term: { es: 'Licencia', en: 'License' }, detail: { es: 'Apache-2.0, código abierto', en: 'Apache-2.0, open source' } },
			{ term: { es: 'Requisitos', en: 'Requirements' }, detail: { es: 'Node 20 o más, Git y un repositorio con al menos un commit', en: 'Node 20 or later, Git and a repository with at least one commit' } },
			{ term: { es: 'Dependencias', en: 'Dependencies' }, detail: { es: 'Ninguna de terceros', en: 'No third-party ones' } },
			{ term: { es: 'Probado en', en: 'Tested on' }, detail: { es: 'Ubuntu, macOS y Windows, con Node 20 y 22', en: 'Ubuntu, macOS and Windows, with Node 20 and 22' } },
			{ term: { es: 'Instalación', en: 'Install' }, detail: { es: 'npx @jossuealcala/ahp-plus@1.4.1 setup .', en: 'npx @jossuealcala/ahp-plus@1.4.1 setup .' } },
			{ term: { es: 'Precio', en: 'Price' }, detail: { es: 'Gratis', en: 'Free' } },
		],
		close: {
			title: { es: ['¿Trabajas con varios', 'agentes de código?'], en: ['Do you work with several', 'coding agents?'] },
			text: {
				es: 'Instálalo en un repositorio de prueba y corre ahp project check. Si quieres que lo adapte a tu flujo o a tu equipo, escríbeme.',
				en: 'Install it in a test repository and run ahp project check. If you want it adapted to your workflow or your team, write to me.',
			},
			cta: { es: 'Hablar de mi flujo', en: 'Talk about my workflow' },
		},
	},

	'bloqio-builder': {
		loop: 'bloqio',
		loopAlt: {
			es: 'Animación abstracta: bloques que se acomodan en una página, un cursor que los revisa uno por uno y una vista de teléfono que los refleja.',
			en: 'Abstract animation: blocks settling into a page, a cursor reviewing them one by one and a phone view mirroring them.',
		},
		scene: 'bloqio',
		title: {
			es: ['Un constructor de páginas con IA', 'en el que tú apruebas cada cambio.'],
			en: ['An AI page builder', 'where you approve every change.'],
		},
		lede: {
			es: 'Bloqio Builder es un constructor de páginas en español para negocios que necesitan una página clara sin contratar un diseñador. Blob, su asistente con IA, propone la estructura y los textos; tú eliges qué se aplica, puedes deshacerlo y la página solo se publica cuando tú lo decides.',
			en: 'Bloqio Builder is a Spanish-language page builder for businesses that need a clear page without hiring a designer. Blob, its AI assistant, proposes the structure and the copy; you choose what gets applied, you can undo it, and the page is only published when you decide.',
		},
		cta: { es: 'Pedir acceso a Bloqio Builder', en: 'Ask for Bloqio Builder access' },
		secondary: { label: { es: 'Ver el caso completo', en: 'See the full case' }, href: { es: '/es/trabajo/bloqio-builder/', en: '/en/work/bloqio-builder/' } },
		facts: [
			{ value: { es: '30+', en: '30+' }, label: { es: 'tipos de bloque para armar la página', en: 'block types to build the page' } },
			{ value: { es: '9', en: '9' }, label: { es: 'plantillas base para empezar', en: 'base templates to start from' } },
			{ value: { es: '5', en: '5' }, label: { es: 'acciones como máximo en cada propuesta de Blob', en: 'actions at most in each Blob proposal' } },
		],
		overview: {
			label: { es: 'Qué resuelve', en: 'What it solves' },
			title: { es: ['Dónde ayuda la IA', 'y dónde decides tú'], en: ['Where the AI helps', 'and where you decide'] },
			lede: {
				es: 'Blob trabaja dentro de límites que se ven en pantalla: bloques, una lista cerrada de acciones y tu aprobación en cada paso.',
				en: 'Blob works within limits you can see on screen: blocks, a closed list of actions and your approval at every step.',
			},
			beforeLabel: { es: 'Sin Bloqio', en: 'Without Bloqio' },
			afterLabel: { es: 'Con Bloqio', en: 'With Bloqio' },
			rows: [
				{
					icon: 'compass',
					title: { es: 'No saber por dónde empezar', en: 'Not knowing where to start' },
					before: { es: 'Una página en blanco y ninguna idea de qué secciones necesita un negocio como el tuyo.', en: 'A blank page and no idea which sections a business like yours needs.' },
					after: { es: 'Contestas a qué te dedicas, dónde estás, qué quieres que haga la gente (agendar, cotizar, contactarte o conocer tu negocio) y en qué tono. El sitio sale armado a partir de una plantilla.', en: 'You answer what you do, where you are, what you want people to do (book, ask for a quote, get in touch or learn about your business) and in what tone. The site comes out assembled from a template.' },
				},
				{
					icon: 'pen',
					title: { es: 'Escribir los textos', en: 'Writing the copy' },
					before: { es: 'Cada título y cada párrafo salen de cero.', en: 'Every headline and paragraph starts from zero.' },
					after: { es: 'Blob reescribe un campo y ves el Antes y el Después. Tú decides si lo aplicas, lo descartas o lo regresas como estaba.', en: 'Blob rewrites a field and you see Before and After. You decide whether to apply it, discard it or put it back the way it was.' },
				},
				{
					icon: 'shield',
					title: { es: 'Que la IA rompa la página', en: 'The AI breaking the page' },
					before: { es: 'Un asistente sin límites cambia cosas que no pediste.', en: 'An assistant with no limits changes things you did not ask for.' },
					after: { es: 'Blob propone acciones de una lista cerrada. El servidor descarta las inválidas y nada se aplica sin que lo elijas.', en: 'Blob proposes actions from a closed list. The server discards the invalid ones and nothing is applied unless you pick it.' },
				},
				{
					icon: 'check-list',
					title: { es: 'Saber si está lista', en: 'Knowing if it is ready' },
					before: { es: 'Publicas sin saber qué le falta.', en: 'You publish without knowing what is missing.' },
					after: { es: 'Una revisión automática, sin IA, califica tu página de 0 a 100 en 9 áreas (llamado a la acción, contacto, WhatsApp, fotos, que te encuentren en Google) y te dice qué falta.', en: 'An automatic check, without AI, scores your page 0 to 100 across 9 areas (call to action, contact, WhatsApp, photos, being found on Google) and tells you what is missing.' },
				},
			],
		},
		how: {
			label: { es: 'Cómo funciona', en: 'How it works' },
			title: { es: ['Cómo se arma una página', 'con Bloqio Builder'], en: ['How a page gets built', 'with Bloqio Builder'] },
			lede: {
				es: 'Elige un paso para ver qué propone Blob y qué decides tú. El negocio del ejemplo es inventado.',
				en: 'Pick a step to see what Blob proposes and what you decide. The business in the example is made up.',
			},
			caption: { es: 'Ilustración del flujo de Bloqio Builder', en: 'Illustration of the Bloqio Builder flow' },
			steps: [
				{
					title: { es: 'Intención', en: 'Intent' },
					text: {
						es: 'Cuentas qué vendes, dónde y qué quieres que haga la gente. Puedes pedirle a Blob que la arme o armarla tú con un asistente de preguntas que no usa IA, sin crear cuenta.',
						en: 'You say what you sell, where, and what you want people to do. You can ask Blob to build it or build it yourself with a question-based assistant that uses no AI, without creating an account.',
					},
				},
				{
					title: { es: 'Estructura', en: 'Structure' },
					text: {
						es: 'El sitio nace de una plantilla y de bloques ordenados: portada, beneficios, galería, preguntas frecuentes, contacto, WhatsApp. Los reordenas arrastrando, los ocultas o los quitas.',
						en: 'The site starts from a template and ordered blocks: cover, benefits, gallery, FAQ, contact, WhatsApp. You reorder them by dragging, hide them or remove them.',
					},
				},
				{
					title: { es: 'Construcción', en: 'Build' },
					text: {
						es: 'Blob propone un plan de hasta cinco acciones, agrupadas en Estructura, Textos, Diseño y Fotos. Eliges cuáles aplicar. Agregar o quitar un bloque pide tu confirmación.',
						en: 'Blob proposes a plan of up to five actions, grouped into Structure, Copy, Design and Photos. You choose which to apply. Adding or removing a block asks for your confirmation.',
					},
				},
				{
					title: { es: 'Revisión', en: 'Review' },
					text: {
						es: 'Revisas en vista de escritorio y de celular, corres la auditoría y deshaces lo que no te guste. Publicar es un paso aparte, que decides tú.',
						en: 'You review in desktop and phone view, run the audit and undo what you do not like. Publishing is a separate step, and it is yours to take.',
					},
				},
			],
		},
		included: {
			label: { es: 'Qué incluye', en: 'What is included' },
			title: { es: ['Qué trae el editor', 'y qué hace Blob'], en: ['What the editor includes', 'and what Blob does'] },
			items: [
				{ icon: 'layers', title: { es: 'Bloques para cada sección', en: 'Blocks for every section' }, text: { es: 'Más de 30 tipos: portada, servicios, galería, catálogo, testimonios, preguntas frecuentes, ubicación y horarios, paquetes, WhatsApp y contacto.', en: 'More than 30 types: cover, services, gallery, catalog, testimonials, FAQ, location and hours, packages, WhatsApp and contact.' } },
				{ icon: 'sparkles-ai', title: { es: 'Blob, el asistente', en: 'Blob, the assistant' }, text: { es: 'Reescribe textos, propone un plan, arma un borrador desde una conversación y sugiere cómo publicar. Corre en el servidor.', en: 'Rewrites copy, proposes a plan, builds a draft from a conversation and suggests how to publish. It runs on the server.' } },
				{ icon: 'mobile', title: { es: 'Vista de celular', en: 'Phone view' }, text: { es: 'Alternas entre escritorio y móvil mientras editas, y hay un editor pensado para el teléfono.', en: 'You switch between desktop and mobile while editing, and there is an editor designed for the phone.' } },
				{ icon: 'globe', title: { es: 'Lo básico para aparecer en Google (SEO)', en: 'The basics for showing up on Google (SEO)' }, text: { es: 'Título, descripción e imagen para cuando compartan tu página, más los datos que leen Google y las redes (canonical, Open Graph y, si quieres, datos de negocio local).', en: 'Title, description and an image for when your page is shared, plus the data Google and social networks read (canonical, Open Graph and, if you want, local-business data).' } },
				{ icon: 'pen', title: { es: 'Temas y plantillas', en: 'Themes and templates' }, text: { es: '9 plantillas base, más de 30 colores de acento, 17 tipografías, modo claro u oscuro y un color propio.', en: '9 base templates, more than 30 accent colors, 17 typefaces, light or dark mode and a custom color.' } },
				{ icon: 'download', title: { es: 'Publicar o llevártela', en: 'Publish or take it with you' }, text: { es: 'Publicas en un enlace, un subdominio o tu dominio, o descargas la página (PDF o archivos HTML, CSS y JS).', en: 'You publish on a link, a subdomain or your own domain, or download the page (PDF or HTML, CSS and JS files).' } },
			],
		},
		limits: {
			label: { es: 'Control y límites', en: 'Control and limits' },
			title: { es: ['Qué puede hacer Blob', 'y qué no'], en: ['What Blob can do', 'and what it cannot'] },
			doesLabel: { es: 'Lo que hace', en: 'What it does' },
			doesNotLabel: { es: 'Lo que no hace', en: 'What it does not do' },
			does: {
				es: [
					'Propone y espera: nada se aplica solo.',
					'Valida cada acción en el servidor y otra vez en tu navegador antes de aplicarla.',
					'Se limita a una lista cerrada de acciones, a textos de hasta 600 caracteres y a fotos que tú subiste.',
					'Guarda un punto para deshacer y un historial por proyecto.',
				],
				en: [
					'It proposes and waits: nothing applies itself.',
					'Validates each action on the server and again in your browser before applying it.',
					'Sticks to a closed list of actions, copy up to 600 characters and photos you uploaded.',
					'Keeps an undo point and a history per project.',
				],
			},
			doesNot: {
				es: [
					'Publicar por su cuenta.',
					'Inventar imágenes: solo usa las que tú subiste.',
					'Montar una tienda en línea: no tiene carrito ni pagos. Es para páginas de presentación, servicios y contacto.',
					'Prometerte los primeros lugares en Google. Revisa lo básico de SEO y nada más.',
					'Darte un lienzo de diseño libre: arrastrar sirve para ordenar bloques.',
				],
				en: [
					'Publish on its own.',
					'Make up images: it only uses the ones you uploaded.',
					'Run an online store: there is no cart or payments. It is for presentation, services and contact pages.',
					'Promise you top spots on Google. It checks the SEO basics and nothing more.',
					'Give you a free-form design canvas: dragging is for ordering blocks.',
				],
			},
		},
		fit: {
			yes: {
				es: ['Tienes un negocio local o un servicio y necesitas una página clara pronto.', 'Quieres ayuda con la estructura y los textos, pero decidir tú qué se queda.', 'Te basta una página de presentación, servicios y contacto, con WhatsApp.'],
				en: ['You run a local business or a service and need a clear page soon.', 'You want help with structure and copy, but you decide what stays.', 'A presentation, services and contact page with WhatsApp is enough for you.'],
			},
			no: {
				es: ['Necesitas una tienda con carrito y pagos.', 'Quieres diseñar cada detalle con libertad total.', 'Necesitas un sitio en varios idiomas.'],
				en: ['You need a store with a cart and payments.', 'You want to design every detail with total freedom.', 'You need a site in several languages.'],
			},
		},
		faq: {
			es: [
				['¿Necesito saber diseñar o programar?', 'No. El editor es visual y sus campos están en lenguaje normal: título, descripción, botón, foto.'],
				['¿La IA publica o cambia mi página sola?', 'No. Blob propone cambios, tú eliges cuáles aplicar y puedes deshacerlos. Publicar lo decides tú.'],
				['¿Se ve bien en celular y en Google?', 'Tiene vista previa de celular y campos de SEO, y Blob revisa título, descripción e imagen para compartir. No prometo posicionamiento.'],
				['¿Puedo vender en línea o llevarme mi sitio?', 'No es una tienda en línea. Sí puedes descargar tu página en archivos HTML, CSS y JS, o en PDF.'],
				['¿Está disponible?', 'Está en beta privada. Escríbeme y te digo cómo entrar.'],
			],
			en: [
				['Do I need to know design or code?', 'No. The editor is visual and its fields are in plain language: headline, description, button, photo.'],
				['Does the AI publish or change my page on its own?', 'No. Blob proposes changes, you pick which to apply and you can undo them. Publishing is up to you.'],
				['Does it look good on a phone and on Google?', 'It has a phone preview and SEO fields, and Blob checks title, description and share image. I do not promise rankings.'],
				['Can I sell online or take my site with me?', 'It is not an online store. You can download your page as HTML, CSS and JS files, or as a PDF.'],
				['Is it available?', 'It is in private beta. Write to me and I will tell you how to get in.'],
			],
		},
		spec: [
			{ term: { es: 'Tipo', en: 'Type' }, detail: { es: 'Producto propio', en: 'Own product' } },
			{ term: { es: 'Estado', en: 'Status' }, detail: { es: 'En beta privada', en: 'In private beta' } },
			{ term: { es: 'Idioma del editor', en: 'Editor language' }, detail: { es: 'Español', en: 'Spanish' } },
			{ term: { es: 'Páginas', en: 'Pages' }, detail: { es: 'Presentación, servicios y contacto, con WhatsApp. Sin carrito ni pagos', en: 'Presentation, services and contact, with WhatsApp. No cart or payments' } },
			{ term: { es: 'Salidas', en: 'Outputs' }, detail: { es: 'Enlace, subdominio, dominio propio, PDF o archivos HTML, CSS y JS', en: 'Link, subdomain, custom domain, PDF or HTML, CSS and JS files' } },
			{ term: { es: 'Tecnología', en: 'Technology' }, detail: { es: 'React y TypeScript en Cloudflare Pages; Node y PostgreSQL en el servidor', en: 'React and TypeScript on Cloudflare Pages; Node and PostgreSQL on the server' } },
			{ term: { es: 'Precio', en: 'Price' }, detail: { es: 'Te lo digo cuando me escribas, según lo que necesites publicar', en: 'I tell you when you write, depending on what you need to publish' } },
		],
		close: {
			title: { es: ['¿Quieres probar', 'Bloqio Builder?'], en: ['Do you want to try', 'Bloqio Builder?'] },
			text: {
				es: 'Cuéntame qué vendes y qué quieres que haga la gente en tu página. Te respondo en menos de un día hábil.',
				en: 'Tell me what you sell and what you want people to do on your page. I reply within one business day.',
			},
			cta: { es: 'Pedir acceso', en: 'Ask for access' },
		},
	},

	miawseo: {
		loop: 'miawseo',
		loopAlt: {
			es: 'Animación abstracta: líneas de metro de colores con trenes que se mueven y estaciones que abren tarjetas, sobre un cielo oscuro.',
			en: 'Abstract animation: colored metro lines with moving trains and stations that open cards, over a dark sky.',
		},
		scene: 'miawseo',
		title: {
			es: ['Un museo de gatos que se recorre', 'como una red de metro.'],
			en: ['A cat museum you explore', 'like a metro network.'],
		},
		lede: {
			es: 'Miawseo reúne 20 razas de gato, cada una con 6 salas (origen, anatomía, temperamento, cuidados y más), y un muro donde la gente sube la foto de su michi. Lo diseñé y lo programé completo en Next.js. Ninguna foto se publica hasta que alguien la aprueba.',
			en: 'Miawseo gathers 20 cat breeds, each with 6 rooms (origin, anatomy, temperament, care and more), and a wall where people upload photos of their cat. I designed and built it end to end in Next.js. No photo goes public until someone approves it.',
		},
		cta: { es: 'Quiero un sitio así', en: 'I want a site like this' },
		secondary: { label: { es: 'Visitar michimuseum.com', en: 'Visit michimuseum.com' }, href: 'https://michimuseum.com/', external: true },
		facts: [
			{ value: { es: '20', en: '20' }, label: { es: 'razas, y cada una es una estación', en: 'breeds, and each one is a station' } },
			{ value: { es: '120', en: '120' }, label: { es: 'salas para recorrer, 6 por raza', en: 'rooms to explore, 6 per breed' } },
			{ value: { es: '8', en: '8' }, label: { es: 'estaciones en la línea de historia', en: 'stations on the history line' } },
		],
		overview: {
			label: { es: 'Qué resuelve', en: 'What it solves' },
			title: { es: ['Cómo ordené mucho contenido', 'y cómo reviso lo que sube la gente'], en: ['How I organized a lot of content', 'and how I review what people upload'] },
			lede: {
				es: 'Con Miawseo enseño cómo convierto mucho contenido en un recorrido fácil de seguir, y cómo abro un sitio a que la gente participe sin perder el control de lo que se publica.',
				en: 'With Miawseo I show how I turn a lot of content into a path that is easy to follow, and how I open a site to contributions without losing control of what gets published.',
			},
			beforeLabel: { es: 'El reto', en: 'The challenge' },
			afterLabel: { es: 'Cómo lo resolví', en: 'How I solved it' },
			rows: [
				{
					icon: 'compass',
					title: { es: 'Mucho contenido', en: 'A lot of content' },
					before: { es: 'Veinte razas con su historia pueden volverse una lista muy larga.', en: 'Twenty breeds with their history can turn into a very long list.' },
					after: { es: 'Cada raza es una estación de la línea M1 (Razas), y la línea M2 recorre la historia del gato en 8 estaciones.', en: 'Each breed is a station on line M1 (Breeds), and line M2 walks through the cat’s history in 8 stations.' },
				},
				{
					icon: 'layers',
					title: { es: 'Leer sin perderse', en: 'Reading without getting lost' },
					before: { es: 'Cada raza tiene mucha información y un solo texto largo cansa.', en: 'Each breed has a lot of information and one long text is tiring to read.' },
					after: { es: 'Seis salas por raza (presentación, origen, anatomía, temperamento, cuidados y curiosidad) que se pasan con flechas, puntos o botones de estación.', en: 'Six rooms per breed (introduction, origin, anatomy, temperament, care and curiosity) you move through with arrows, dots or station buttons.' },
				},
				{
					icon: 'user',
					title: { es: 'Que la gente participe', en: 'Letting people take part' },
					before: { es: 'Si solo publica el autor, el sitio no refleja a su comunidad.', en: 'If only the author publishes, the site does not reflect its community.' },
					after: { es: 'El botón «Yo tengo uno» abre un formulario para subir la foto de tu gato, con su nombre y tu consentimiento.', en: 'The «I have one» button opens a form to upload your cat’s photo, with its name and your consent.' },
				},
				{
					icon: 'shield',
					title: { es: 'No perder el control', en: 'Not losing control' },
					before: { es: 'Abrir las subidas atrae spam y fotos que no deberían estar.', en: 'Opening uploads invites spam and photos that should not be there.' },
					after: { es: 'Varios candados al subir y una revisión manual: la foto queda pendiente hasta que alguien la aprueba.', en: 'Several locks on upload and a manual review: the photo stays pending until someone approves it.' },
				},
			],
		},
		how: {
			label: { es: 'Cómo funciona', en: 'How it works' },
			title: { es: ['Cómo llega el contenido al museo', 'y una foto al muro'], en: ['How content reaches the museum', 'and a photo reaches the wall'] },
			lede: {
				es: 'Elige un paso para ver cómo se recorre el museo y cómo llega una foto al muro. Los nombres de razas son los reales.',
				en: 'Pick a step to see how the museum is explored and how a photo reaches the wall. The breed names are the real ones.',
			},
			caption: { es: 'Ilustración del recorrido y la moderación en Miawseo', en: 'Illustration of the route and moderation in Miawseo' },
			steps: [
				{
					title: { es: 'Contenido', en: 'Content' },
					text: {
						es: 'Cada raza se escribe una vez, con sus seis salas, y el sitio la convierte en una página fija (estática). Las fotos vienen de Wikimedia Commons, con un retrato dibujado de respaldo si falta una.',
						en: 'Each breed is written once, with its six rooms, and the site turns it into a fixed (static) page. Photos come from Wikimedia Commons, with a drawn portrait as a fallback when one is missing.',
					},
				},
				{
					title: { es: 'Recorrido', en: 'Route' },
					text: {
						es: 'La Michiteca se navega como metro: línea M1 de razas y línea M2 de historia, con buscador por nombre, origen o frase, y tarjetas que cuentan cuántos michis aprobados tiene cada raza.',
						en: 'The Michiteca is navigated like a metro: line M1 for breeds and line M2 for history, with search by name, origin or phrase, and cards that count how many approved cats each breed has.',
					},
				},
				{
					title: { es: 'Comunidad', en: 'Community' },
					text: {
						es: 'En la sala de una raza, «Yo tengo uno» pide el nombre del michi (hasta 40 caracteres), una nota (hasta 140), la foto y el consentimiento. Los candados corren en orden antes de guardar nada.',
						en: 'In a breed’s room, «I have one» asks for the cat’s name (up to 40 characters), a note (up to 140), the photo and consent. The locks run in order before anything is saved.',
					},
				},
				{
					title: { es: 'Moderación', en: 'Moderation' },
					text: {
						es: 'La foto queda pendiente. En el panel de moderación se ve la vista previa y se aprueba o se rechaza. Solo se muestran las aprobadas. Si alguien pide otra, el sitio responde que no existe (404).',
						en: 'The photo stays pending. In the moderation panel you see the preview and approve or reject it. Only approved ones are shown. If someone asks for another, the site answers that it does not exist (404).',
					},
				},
			],
		},
		included: {
			label: { es: 'Qué incluye', en: 'What is included' },
			title: { es: ['Las partes del sitio', 'y el panel de moderación'], en: ['The parts of the site', 'and the moderation panel'] },
			items: [
				{ icon: 'compass', title: { es: 'Navegación tipo metro', en: 'Metro-style navigation' }, text: { es: 'Línea M1 de razas y línea M2 de historia, con buscador. Una tercera línea está en construcción.', en: 'Line M1 for breeds and line M2 for history, with search. A third line is under construction.' } },
				{ icon: 'layers', title: { es: '120 salas', en: '120 rooms' }, text: { es: 'Seis por raza: presentación, origen, anatomía, temperamento, cuidados y curiosidad. Se navegan con el teclado.', en: 'Six per breed: introduction, origin, anatomy, temperament, care and curiosity. You can move through them with the keyboard.' } },
				{ icon: 'user', title: { es: 'Michi Plaza', en: 'Michi Plaza' }, text: { es: 'Un muro por raza con las fotos aprobadas. La ficha de cada raza muestra las primeras 6.', en: 'A wall per breed with the approved photos. Each breed’s page shows the first 6.' } },
				{ icon: 'shield', title: { es: 'Candados al subir', en: 'Locks on upload' }, text: { es: 'Límite por IP, un campo oculto que solo llenan los bots, un tiempo mínimo para llenar el formulario, revisión del formato real de la imagen y tamaño máximo de 5 MB.', en: 'Per-IP limit, a hidden field only bots fill in, a minimum time to fill in the form, a check of the image’s real format and a 5 MB maximum.' } },
				{ icon: 'check-list', title: { es: 'Panel de moderación', en: 'Moderation panel' }, text: { es: 'Lista de fotos pendientes con vista previa y botones para aprobar o rechazar, protegido con un token.', en: 'List of pending photos with a preview and buttons to approve or reject, protected by a token.' } },
				{ icon: 'code', title: { es: 'Tecnología', en: 'Technology' }, text: { es: 'Next.js 15, React 19 y TypeScript estricto, sin librerías extra al ejecutarse.', en: 'Next.js 15, React 19 and strict TypeScript, with no extra runtime libraries.' } },
			],
		},
		limits: {
			label: { es: 'Control y límites', en: 'Control and limits' },
			title: { es: ['Qué controla el sitio', 'y qué todavía no hace'], en: ['What the site controls', 'and what it does not do yet'] },
			doesLabel: { es: 'Lo que hace', en: 'What it does' },
			doesNotLabel: { es: 'Lo que todavía no hace', en: 'What it does not do yet' },
			does: {
				es: [
					'Revisa el contenido real del archivo (JPG, PNG o WebP), de 200 a 8000 px y hasta 5 MB.',
					'Acepta 5 subidas cada 10 minutos por IP y descarta bots con un campo oculto y un tiempo mínimo.',
					'Guarda las fotos fuera de la carpeta pública y bloquea rutas tramposas.',
					'Sirve una foto solo si está aprobada.',
				],
				en: [
					'Checks the file’s real content (JPG, PNG or WebP), from 200 to 8000 px and up to 5 MB.',
					'Accepts 5 uploads every 10 minutes per IP and drops bots with a hidden field and a minimum time.',
					'Keeps photos outside the public folder and blocks tricky paths.',
					'Serves a photo only once it is approved.',
				],
			},
			doesNot: {
				es: [
					'Quitar los datos EXIF de las fotos: si la tuya trae ubicación, quítala antes de subirla.',
					'Aprobar fotos automáticamente: siempre las revisa una persona.',
					'Repartir la carga entre varios servidores: el límite por IP y el almacenamiento son por proceso.',
					'Pedir una cuenta: se sube una foto sin registrarse.',
				],
				en: [
					'Strip EXIF data from photos: if yours has a location, remove it before uploading.',
					'Approve photos automatically: a person always reviews them.',
					'Spread the load across several servers: the per-IP limit and the storage are per process.',
					'Ask for an account: you upload a photo without signing up.',
				],
			},
		},
		fit: {
			yes: {
				es: ['Tienes mucho contenido (un catálogo, un archivo, un museo, un directorio) y la gente se pierde en él.', 'Quieres abrir tu sitio a que la gente participe sin perder el control de lo que se publica.', 'Quieres un sitio editorial hecho a la medida y no una plantilla.'],
				en: ['You have a lot of content (a catalog, an archive, a museum, a directory) and people get lost in it.', 'You want to open your site to contributions without losing control of what is published.', 'You want a tailor-made editorial site, not a template.'],
			},
			no: {
				es: ['Necesitas una tienda con pagos: esto es un sitio editorial.', 'Quieres usuarios con cuenta, comentarios en vivo o una red social dentro del sitio.', 'Necesitas moderación automática sin una persona que revise.'],
				en: ['You need a store with payments: this is an editorial site.', 'You want accounts, live comments or a social network inside the site.', 'You need automatic moderation with nobody reviewing.'],
			},
		},
		faq: {
			es: [
				['¿Cómo y cuándo aparece mi foto?', 'La subes desde «Yo tengo uno» y queda pendiente. Aparece cuando un moderador la aprueba; no hay un tiempo fijo de revisión.'],
				['¿Qué fotos aceptan y qué pasa con el spam?', 'JPG, PNG o WebP de hasta 5 MB, solo de gatos y sin personas identificables. Los filtros automáticos frenan lo obvio y la revisión manual el resto. Hoy no se limpia el EXIF, así que sube fotos sin ubicación.'],
				['¿Por qué solo 6 fotos en la ficha de la raza?', 'Es el límite del carrusel de la ficha, para los primeros michis que se subieron. El muro de Michi Plaza muestra todas las aprobadas.'],
				['¿De dónde salen las fotos de las razas?', 'De Wikimedia Commons, con licencias libres. Llevo un archivo de créditos en el repositorio.'],
				['¿Puedo pedir algo parecido para mi proyecto?', 'Sí. Es el tipo de trabajo que hago para catálogos grandes o comunidades moderadas. Escríbeme y vemos qué necesitas.'],
			],
			en: [
				['How and when does my photo appear?', 'You upload it from «I have one» and it stays pending. It appears when a moderator approves it; there is no fixed review time.'],
				['Which photos are accepted and what about spam?', 'JPG, PNG or WebP up to 5 MB, only cats and no identifiable people. Automatic filters stop the obvious and manual review the rest. EXIF is not stripped today, so upload photos without a location.'],
				['Why only 6 photos on a breed’s page?', 'That is the page carousel’s limit, for the first cats uploaded. The Michi Plaza wall shows every approved one.'],
				['Where do the breed photos come from?', 'From Wikimedia Commons, under free licenses. I keep a credits file in the repository.'],
				['Can I ask for something similar for my project?', 'Yes. It is the kind of work I do for large catalogs or moderated communities. Write to me and we will see what you need.'],
			],
		},
		spec: [
			{ term: { es: 'Tipo', en: 'Type' }, detail: { es: 'Proyecto propio, sitio editorial', en: 'Own project, editorial site' } },
			{ term: { es: 'Sitio', en: 'Site' }, detail: { es: 'michimuseum.com', en: 'michimuseum.com' } },
			{ term: { es: 'Contenido', en: 'Content' }, detail: { es: '20 razas, 120 salas y 8 estaciones de historia', en: '20 breeds, 120 rooms and 8 history stations' } },
			{ term: { es: 'Tecnología', en: 'Technology' }, detail: { es: 'Next.js 15, React 19 y TypeScript estricto; datos en JSON y archivos', en: 'Next.js 15, React 19 and strict TypeScript; data in JSON and files' } },
			{ term: { es: 'Fotos de razas', en: 'Breed photos' }, detail: { es: 'Wikimedia Commons, con retrato dibujado de respaldo', en: 'Wikimedia Commons, with a drawn portrait as a fallback' } },
			{ term: { es: 'Moderación', en: 'Moderation' }, detail: { es: 'Panel de administración con token; nada se publica sin aprobar', en: 'Admin panel with a token; nothing is published without approval' } },
			{ term: { es: 'Autor', en: 'Author' }, detail: { es: 'Jossué Alcalá: diseño y programación completos', en: 'Jossué Alcalá: full design and development' } },
		],
		close: {
			title: { es: ['¿Tienes mucho contenido', 'y necesitas ordenarlo?'], en: ['Do you have a lot of content', 'and need to organize it?'] },
			text: {
				es: 'Cuéntame qué tienes y quién lo va a usar. Te respondo en menos de un día hábil con cómo lo ordenaría.',
				en: 'Tell me what you have and who will use it. I reply within one business day with how I would organize it.',
			},
			cta: { es: 'Contarte mi caso', en: 'Tell you my case' },
		},
	},
};

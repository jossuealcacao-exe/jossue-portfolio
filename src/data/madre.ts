import type { Locale } from './i18n';

export const madreFacts = {
	version: '0.5.2',
	site: 'https://madre.run/',
	startCommand: 'npx @jossuealcala/madre start',
	doctorCommand: 'npx @jossuealcala/madre doctor',
	localUrl: '127.0.0.1:4317',
	github: 'https://github.com/jossuealcacao-exe/madre',
	docs: 'https://github.com/jossuealcacao-exe/madre/blob/main/docs/REFERENCE.md',
	security: 'https://github.com/jossuealcacao-exe/madre/blob/main/SECURITY.md',
	npm: 'https://www.npmjs.com/package/@jossuealcala/madre',
	license: 'https://www.apache.org/licenses/LICENSE-2.0',
} as const;

type MadreStep = {
	number: string;
	title: string;
	text: string;
	command?: string;
};

type MadreMode = {
	code: string;
	name: string;
	text: string;
};

type MadreSlot = {
	id: string;
	title: string;
	note: string;
	ratio: '16:9' | '4:3';
};

export type MadreCopy = {
	nav: Array<{ href: string; label: string }>;
	eyebrow: string;
	title: string;
	lede: string;
	aside: string;
	install: {
		title: string;
		intro: string;
		copy: string;
		copied: string;
		failed: string;
		platforms: Array<{ id: 'macos' | 'linux'; label: string; note: string }>;
		requirements: string[];
	};
	quickstart: { eyebrow: string; title: string; steps: MadreStep[] };
	evidence: {
		eyebrow: string;
		title: string;
		text: string;
		alt: string;
		caption: string;
		disclosure: string;
	};
	flow: { eyebrow: string; title: string; text: string; steps: MadreStep[] };
	permissions: { eyebrow: string; title: string; text: string; modes: MadreMode[]; warning: string };
	capabilities: {
		eyebrow: string;
		title: string;
		items: Array<{ label: string; title: string; text: string }>;
	};
	gallery: { eyebrow: string; title: string; text: string; previous: string; next: string; slots: MadreSlot[] };
	compatibility: { eyebrow: string; title: string; text: string; items: Array<{ term: string; detail: string }> };
	resources: { eyebrow: string; title: string; items: Array<{ label: string; text: string; href: string }> };
	closing: { eyebrow: string; title: string; text: string; primary: string; secondary: string; contact: string; ahp: string };
};

const copy: Record<Locale, MadreCopy> = {
	es: {
		nav: [
			{ href: '#instalar', label: 'Instalar' },
			{ href: '#como-funciona', label: 'Cómo funciona' },
			{ href: '#permisos', label: 'Permisos' },
			{ href: '#evidencia', label: 'Producto' },
			{ href: '#recursos', label: 'Recursos' },
		],
		eyebrow: 'MADRE 0.5.2 · Beta pública · Gratis',
		title: 'Tus agentes de código, en la misma sala.',
		lede: 'MADRE abre una sala en tu navegador donde Codex, Claude Code, Gemini CLI y OpenCode leen la misma conversación y recuerdan lo que se decidió. Solo editan tu código si tú subes el permiso.',
		aside: 'Usa los agentes que ya tienes, con tus cuentas. Nada que pagar aparte.',
		install: {
			title: 'Instalar en tu proyecto',
			intro: 'Abre la Terminal en la carpeta de tu proyecto y pega este comando. Es el mismo en macOS y en Linux.',
			copy: 'Copiar',
			copied: 'Copiado',
			failed: 'Selecciona y copia el comando',
			platforms: [
				{ id: 'macos', label: 'macOS', note: 'En la app Terminal, dentro de la carpeta de tu proyecto.' },
				{ id: 'linux', label: 'Linux', note: 'En tu terminal de siempre, dentro de la carpeta de tu proyecto.' },
			],
			requirements: ['Node 22.5 o superior', 'Al menos un agente con tu sesión iniciada'],
		},
		quickstart: {
			eyebrow: 'Tus primeros cinco minutos',
			title: 'Del comando a la sala abierta.',
			steps: [
				{ number: '01', title: 'Abre MADRE', text: 'La sala se abre sola en tu navegador.', command: madreFacts.startCommand },
				{ number: '02', title: 'Revisa tus agentes', text: 'Te dice qué agentes encontró y en cuáles tienes sesión.', command: madreFacts.doctorCommand },
				{ number: '03', title: 'Entra a la sala', text: 'Vive en una dirección que solo existe en tu computadora y se apaga al cerrar la terminal.', command: madreFacts.localUrl },
			],
		},
		evidence: {
			eyebrow: 'Showcase',
			title: 'Mira a MADRE trabajando.',
			text: 'Todo está grabado en una instalación real de MADRE 0.5.2: cuatro agentes construyen un sitio y una app, se pasan el trabajo y el ahorro de tokens queda a la vista.',
			alt: 'La sala de MADRE 0.5.2 con ASH encendido: tras la línea «RELEVO @GEMINI → @OPENCODE · 6 MENSAJES CARGADOS», OpenCode responde con tres mejoras de accesibilidad para el sitio de Café Aurora.',
			caption: 'La sala real · MADRE 0.5.2 · 28 sep 2026 · proyecto de ejemplo Café Aurora.',
			disclosure: 'Las cifras de los videos son las que muestra la propia sala en esa sesión; no son promedios ni promesas.',
		},
		flow: {
			eyebrow: 'CÓMO FUNCIONA',
			title: 'Cómo funciona.',
			text: 'MADRE no reemplaza a tus agentes: los reúne en tu proyecto y te deja ver qué puede hacer cada uno.',
			steps: [
				{ number: '01', title: 'Usas lo que ya tienes', text: 'Codex, Claude Code, Gemini CLI u OpenCode, con tus cuentas, en una sola sala.' },
				{ number: '02', title: 'Nadie empieza de cero', text: 'Cuando responde otro agente, recibe la conversación y lo que la sala recuerda.' },
				{ number: '03', title: 'Tú decides el permiso', text: 'Cada mensaje lleva su nivel: solo leer, crear archivos, editar o ejecutar comandos.' },
				{ number: '04', title: 'Revisas lo que pasó', text: 'Ves quién habló, qué archivos cambió y qué espera tu decisión. Si algo no te gusta, lo deshaces.' },
			],
		},
		permissions: {
			eyebrow: 'Seguridad',
			title: 'Nada cambia sin tu permiso.',
			text: 'Por defecto, los agentes solo leen. Para que creen, editen o ejecuten algo, subes el nivel tú, a propósito. Ningún agente puede subírselo solo.',
			modes: [
				{ code: '#0', name: 'GHOST', text: 'Fuera de registro: no se guarda nada.' },
				{ code: '#1', name: 'EXCHANGE', text: 'Lee y conversa. Es el modo de siempre.' },
				{ code: '#2', name: 'CREATE', text: 'Crea archivos nuevos; lo que ya existe no se toca.' },
				{ code: '#3', name: 'CONTROL', text: 'Edita tu proyecto, con copia previa, lista de cambios y deshacer.' },
				{ code: '#4', name: 'AIRLOCK', text: 'Ejecuta comandos. Lo que se publica ya no se puede deshacer.' },
			],
			warning: 'AIRLOCK es como prestarle tu terminal a ese agente: pide confirmación dos veces. Actívalo solo si le confiarías tu computadora.',
		},
		capabilities: {
			eyebrow: 'Lo que trae',
			title: 'Qué trae MADRE.',
			items: [
				{ label: 'Conversación', title: 'Varios agentes, un solo chat', text: 'Le escribes a uno o le pides una mesa redonda a todos, sin copiar y pegar entre ventanas.' },
				{ label: 'Memoria', title: 'La sala recuerda lo que se decidió', text: 'Pregúntale tres semanas después y te responde, aunque lo haya decidido otro agente.' },
				{ label: 'Ahorro', title: 'Menos tokens con ASH', text: 'Respuestas compactas y un caché que se aprovecha: en una sala de prueba ahorró 496,894 tokens.' },
				{ label: 'Local', title: 'Todo en tu computadora', text: 'Sin nube ni cuentas de MADRE. Cada agente habla con su proveedor, con tu cuenta.' },
			],
		},
		gallery: {
			eyebrow: 'GALERÍA DEL PRODUCTO',
			title: 'La evidencia crece con el producto.',
			text: 'La conversación real ya está documentada. Los siguientes encuadres quedan definidos para capturarse en una sesión verificable, sin inventar pantallas.',
			previous: 'Anterior',
			next: 'Siguiente',
			slots: [
				{
					id: 'madre-connections-040',
					title: 'Conexiones y estado real de la tripulación',
					ratio: '16:9',
					note: 'Captura pendiente · mostrar CONNECTIONS con estados reales y sin cuentas visibles · 1920×1080 · móvil 1080×1350 · alt: panel de conexiones de MADRE con el estado de cada CLI.',
				},
				{
					id: 'madre-permissions-040',
					title: 'Permisos y confirmación de CONTROL',
					ratio: '4:3',
					note: 'Captura pendiente · mostrar el selector de modos y la ceremonia de autorización, sin ejecutar una acción externa · 1600×1200 · móvil 1080×1350 · alt: controles de permisos de MADRE antes de habilitar CONTROL.',
				},
			],
		},
		compatibility: {
			eyebrow: 'Requisitos',
			title: 'Lo que necesitas.',
			text: 'Cada versión se prueba automáticamente en macOS y Linux, con Node 22 y 24.',
			items: [
				{ term: 'Sistemas', detail: 'macOS y Linux. Windows está en camino: puedes anotarte en madre.run.' },
				{ term: 'Node', detail: '22.5 o superior.' },
				{ term: 'Agentes', detail: 'Codex, Claude Code, Gemini CLI u OpenCode. Con uno basta para empezar.' },
				{ term: 'Opcional', detail: 'Ollama, para sumar a @madre: un agente que corre en tu computadora y contesta desde la memoria.' },
				{ term: 'Licencia', detail: 'Gratis y de código abierto (Apache-2.0).' },
			],
		},
		resources: {
			eyebrow: 'Para seguir leyendo',
			title: 'Lo que hace MADRE y lo que no.',
			items: [
				{ label: 'madre.run', text: 'El sitio de MADRE: instalación, novedades y lista de espera de Windows.', href: madreFacts.site },
				{ label: 'Referencia completa', text: 'Cada modo, comando y opción, en detalle.', href: madreFacts.docs },
				{ label: 'Código fuente', text: 'El repositorio en GitHub, con cada versión.', href: madreFacts.github },
				{ label: 'Paquete npm', text: 'Versión publicada e instalación.', href: madreFacts.npm },
				{ label: 'Seguridad', text: 'Qué pueden hacer los agentes, los límites de la beta y cómo avisar de un fallo.', href: madreFacts.security },
			],
		},
		closing: {
			eyebrow: 'Pruébala',
			title: 'Ábrela en un proyecto que ya conoces.',
			text: 'Empieza solo leyendo, revisa tus agentes y sube el permiso cuando el trabajo lo pida.',
			primary: 'Copiar el comando',
			secondary: 'Ver en GitHub',
			contact: 'Hablar sobre MADRE',
			ahp: 'Explorar continuidad con AHP+',
		},
	},
	en: {
		nav: [
			{ href: '#install', label: 'Install' },
			{ href: '#how-it-works', label: 'How it works' },
			{ href: '#permissions', label: 'Permissions' },
			{ href: '#evidence', label: 'Product' },
			{ href: '#resources', label: 'Resources' },
		],
		eyebrow: 'MADRE 0.5.2 · Public beta · Free',
		title: 'Your coding agents, in the same room.',
		lede: 'MADRE opens a room in your browser where Codex, Claude Code, Gemini CLI and OpenCode read the same conversation and remember what was decided. They only edit your code if you raise the permission.',
		aside: 'It uses the agents you already have, with your accounts. Nothing extra to pay.',
		install: {
			title: 'Install in your project',
			intro: 'Open a terminal in the project folder. The command is the same on macOS and Linux.',
			copy: 'Copy',
			copied: 'Copied',
			failed: 'Select and copy the command',
			platforms: [
				{ id: 'macos', label: 'macOS', note: 'Run from Terminal at the project root.' },
				{ id: 'linux', label: 'Linux', note: 'Run from your shell at the project root.' },
			],
			requirements: ['Node 22.5 or newer', 'At least one installed and signed-in CLI'],
		},
		quickstart: {
			eyebrow: 'THE FIRST FIVE MINUTES',
			title: 'From one command to an active room.',
			steps: [
				{ number: '01', title: 'Start MADRE', text: 'The room opens locally from the project folder.', command: madreFacts.startCommand },
				{ number: '02', title: 'Check your agents', text: 'Doctor shows which CLIs are available and which are signed in.', command: madreFacts.doctorCommand },
				{ number: '03', title: 'Open the room', text: 'MADRE uses a local address and closes when the process ends.', command: madreFacts.localUrl },
			],
		},
		evidence: {
			eyebrow: 'Showcase',
			title: 'Watch MADRE at work.',
			text: 'All of it was recorded on a real MADRE 0.5.2 install: four agents build a website and an app, hand work to each other, and the token savings stay in view.',
			alt: 'MADRE 0.5.2’s room with ASH on: after the line “HANDOFF @GEMINI → @OPENCODE · 6 MESSAGES CARRIED”, OpenCode replies with three accessibility fixes for the Café Aurora site.',
			caption: 'The real room · MADRE 0.5.2 · Sep 28, 2026 · Café Aurora sample project.',
			disclosure: 'The figures in the videos are the ones the room itself shows in that session; they are not averages or promises.',
		},
		flow: {
			eyebrow: 'HOW IT WORKS',
			title: 'The thread stays intact when the voice changes.',
			text: 'MADRE does not replace your agents. It gathers them around the project and makes each turn’s authority explicit.',
			steps: [
				{ number: '01', title: 'Connect what you already use', text: 'Work with Codex, Claude Code, Gemini CLI, or OpenCode from one room.' },
				{ number: '02', title: 'Nobody starts from zero', text: 'When another agent answers, it receives the conversation and what the room remembers.' },
				{ number: '03', title: 'Choose the scope', text: 'Every message has a mode: read, create, control, or execute with human authorization.' },
				{ number: '04', title: 'Review what happened', text: 'The room shows who spoke, what files changed, and which action needs your decision.' },
			],
		},
		permissions: {
			eyebrow: 'HUMAN AUTHORITY',
			title: 'Permission is declared before action.',
			text: 'Conversation does not grant authority on its own. The turn mode sets the operational boundary.',
			modes: [
				{ code: '#0', name: 'GHOST', text: 'Off the record. It disappears on reload.' },
				{ code: '#1', name: 'EXCHANGE', text: 'Read and coordinate. The default mode.' },
				{ code: '#2', name: 'CREATE', text: 'Add files while existing work is preserved.' },
				{ code: '#3', name: 'CONTROL', text: 'Edit with a checkpoint, change list, and UNDO.' },
				{ code: '#4', name: 'AIRLOCK', text: 'Run commands. Pushes and deploys do not return with UNDO.' },
			],
			warning: 'AIRLOCK is equivalent to handing that agent your shell. It requires two human keys and a permission ceiling configured in advance.',
		},
		capabilities: {
			eyebrow: 'VERIFIED CAPABILITIES',
			title: 'A room, not another layer of promises.',
			items: [
				{ label: 'CONVERSATION', title: 'Several agents in one thread', text: 'Mention an agent or hand the work from one to another without opening isolated chats.' },
				{ label: 'Memory', title: 'The room remembers what was decided', text: 'Ask three weeks later and it answers, even if another agent made the call.' },
				{ label: 'CONTROL', title: 'Visible permission on every turn', text: 'The mode travels with the message and limits what that work can do.' },
				{ label: 'LOCAL', title: 'No MADRE-owned cloud', text: 'The room runs on 127.0.0.1. Each CLI keeps its own provider, account, and terms.' },
			],
		},
		gallery: {
			eyebrow: 'PRODUCT GALLERY',
			title: 'Evidence grows with the product.',
			text: 'The real conversation is documented. The next frames are specified for a verifiable session instead of inventing screens.',
			previous: 'Previous',
			next: 'Next',
			slots: [
				{
					id: 'madre-connections-040-en',
					title: 'Crew connections and real status',
					ratio: '16:9',
					note: 'Capture pending · show CONNECTIONS with real states and no visible accounts · 1920×1080 · mobile 1080×1350 · alt: MADRE connections panel with each CLI status.',
				},
				{
					id: 'madre-permissions-040-en',
					title: 'Permissions and CONTROL confirmation',
					ratio: '4:3',
					note: 'Capture pending · show the mode picker and authorization ceremony without executing an external action · 1600×1200 · mobile 1080×1350 · alt: MADRE permission controls before enabling CONTROL.',
				},
			],
		},
		compatibility: {
			eyebrow: 'REQUIREMENTS AND COMPATIBILITY',
			title: 'What you need before starting.',
			text: 'The repository CI matrix tests the package on macOS and Ubuntu with Node 22 and 24.',
			items: [
				{ term: 'Systems', detail: 'macOS and Linux, verified in CI. Universal support for every distribution is not claimed.' },
				{ term: 'Node', detail: '22.5 or newer.' },
				{ term: 'Agents', detail: 'Codex, Claude Code, Gemini CLI, or OpenCode. One is enough to begin.' },
				{ term: 'Optional', detail: 'Ollama adds embeddings, an archivist, and local @madre.' },
				{ term: 'License', detail: 'Apache-2.0. Public package on npm.' },
			],
		},
		resources: {
			eyebrow: 'DOCUMENTATION',
			title: 'Read what MADRE does—and what it does not.',
			items: [
				{ label: 'Full reference', text: 'Modes, memory, agents, modules, privacy, and environment variables.', href: madreFacts.docs },
				{ label: 'Source code', text: 'Public repository, history, and releases.', href: madreFacts.github },
				{ label: 'npm package', text: 'Published version and installation.', href: madreFacts.npm },
				{ label: 'Security', text: 'Operating model, accepted beta limits, and responsible reporting.', href: madreFacts.security },
			],
		},
		closing: {
			eyebrow: 'NEXT STEP',
			title: 'Install MADRE in a project you already know.',
			text: 'Begin in EXCHANGE, check your agents, and raise permissions only when the work requires it.',
			primary: 'Copy installation command',
			secondary: 'View on GitHub',
			contact: 'Talk about MADRE',
			ahp: 'Explore continuity with AHP+',
		},
	},
};

export function madreCopy(locale: Locale): MadreCopy {
	return copy[locale];
}

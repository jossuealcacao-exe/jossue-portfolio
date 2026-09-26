import type { Locale } from './i18n';

export const madreFacts = {
	version: '0.4.0',
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
		eyebrow: 'MADRE 0.4.0 · SALA LOCAL DE PROYECTO',
		title: 'Instala una sala para tus agentes.',
		lede: 'Una conversación compartida, memoria local y permisos explícitos para Codex, Claude Code, Gemini CLI y OpenCode.',
		aside: 'Mismas herramientas. Más contexto dentro de tu proyecto.',
		install: {
			title: 'Instalar en tu proyecto',
			intro: 'Abre una terminal en la carpeta del proyecto. El comando es el mismo en macOS y Linux.',
			copy: 'Copiar',
			copied: 'Copiado',
			failed: 'Selecciona y copia el comando',
			platforms: [
				{ id: 'macos', label: 'macOS', note: 'Ejecuta desde Terminal en la raíz del proyecto.' },
				{ id: 'linux', label: 'Linux', note: 'Ejecuta desde tu shell en la raíz del proyecto.' },
			],
			requirements: ['Node 22.5 o superior', 'Al menos una CLI instalada y con sesión iniciada'],
		},
		quickstart: {
			eyebrow: 'PRIMEROS CINCO MINUTOS',
			title: 'Del comando a una sala activa.',
			steps: [
				{ number: '01', title: 'Inicia MADRE', text: 'La sala abre en local desde la carpeta del proyecto.', command: madreFacts.startCommand },
				{ number: '02', title: 'Comprueba tus agentes', text: 'Doctor muestra qué CLIs están disponibles y quién tiene sesión.', command: madreFacts.doctorCommand },
				{ number: '03', title: 'Abre la sala', text: 'MADRE usa una dirección local y se cierra cuando termina el proceso.', command: madreFacts.localUrl },
			],
		},
		evidence: {
			eyebrow: 'EVIDENCIA REAL DEL PRODUCTO',
			title: 'Mira la sala trabajando.',
			text: 'Codex y Claude comparten el mismo hilo. La línea de relevo deja visible qué contexto recibió el siguiente agente.',
			alt: 'Interfaz real de MADRE 0.4.0 con una conversación entre Codex, una persona y Claude, enlazada por una línea de relevo.',
			caption: 'Captura del repositorio · MADRE 0.4.0 · 25 sep 2026 · conversación real sobre un proyecto de demostración.',
			disclosure: 'Esta captura prueba la interfaz y el relevo mostrado. No prueba resultados, adopción ni rendimiento fuera de esa sesión.',
		},
		flow: {
			eyebrow: 'CÓMO FUNCIONA',
			title: 'El hilo no se rompe cuando cambia la voz.',
			text: 'MADRE no reemplaza tus agentes. Los reúne alrededor del proyecto y hace explícito qué puede hacer cada turno.',
			steps: [
				{ number: '01', title: 'Conecta lo que ya usas', text: 'Trabaja con Codex, Claude Code, Gemini CLI u OpenCode desde una sola sala.' },
				{ number: '02', title: 'Comparte el contexto útil', text: 'La conversación, el ledger y la memoria de la sala acompañan el relevo entre agentes.' },
				{ number: '03', title: 'Decide el alcance', text: 'Cada mensaje sale con un modo: leer, crear, controlar o ejecutar con autorización humana.' },
				{ number: '04', title: 'Revisa lo que ocurrió', text: 'La sala muestra quién habló, qué archivos cambió y qué acción necesita tu decisión.' },
			],
		},
		permissions: {
			eyebrow: 'AUTORIDAD HUMANA',
			title: 'El permiso se declara antes de actuar.',
			text: 'La conversación no concede autoridad por sí sola. El modo del turno define el límite operativo.',
			modes: [
				{ code: '#0', name: 'GHOST', text: 'Fuera del registro. Desaparece al recargar.' },
				{ code: '#1', name: 'EXCHANGE', text: 'Lee y coordina. Es el modo predeterminado.' },
				{ code: '#2', name: 'CREATE', text: 'Añade archivos; lo existente se conserva.' },
				{ code: '#3', name: 'CONTROL', text: 'Edita con checkpoint, lista de cambios y UNDO.' },
				{ code: '#4', name: 'AIRLOCK', text: 'Ejecuta comandos. Pushes y deploys no vuelven con UNDO.' },
			],
			warning: 'AIRLOCK equivale a entregar tu shell a ese agente. Exige dos llaves humanas y un techo de permiso configurado previamente.',
		},
		capabilities: {
			eyebrow: 'CAPACIDADES VERIFICADAS',
			title: 'Una sala, no otra capa de promesas.',
			items: [
				{ label: 'CONVERSACIÓN', title: 'Varios agentes en el mismo hilo', text: 'Menciona a un agente o pasa el trabajo de uno a otro sin abrir conversaciones aisladas.' },
				{ label: 'MEMORIA', title: 'Decisiones que se pueden recuperar', text: 'Fuera de GHOST, la sala conserva el ledger e indexa notas y contexto localmente.' },
				{ label: 'CONTROL', title: 'Permisos visibles por turno', text: 'El modo acompaña al mensaje y limita lo que ese trabajo puede hacer.' },
				{ label: 'LOCAL', title: 'Sin nube propia de MADRE', text: 'La sala corre en 127.0.0.1. Cada CLI conserva su proveedor, cuenta y condiciones.' },
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
			eyebrow: 'REQUISITOS Y COMPATIBILIDAD',
			title: 'Lo necesario, antes de empezar.',
			text: 'La matriz de CI del repositorio prueba el paquete en macOS y Ubuntu con Node 22 y 24.',
			items: [
				{ term: 'Sistemas', detail: 'macOS y Linux, comprobados en CI. No se afirma soporte universal para todas las distribuciones.' },
				{ term: 'Node', detail: '22.5 o superior.' },
				{ term: 'Agentes', detail: 'Codex, Claude Code, Gemini CLI u OpenCode. Basta uno para comenzar.' },
				{ term: 'Opcional', detail: 'Ollama añade embeddings, archivista y @madre en local.' },
				{ term: 'Licencia', detail: 'Apache-2.0. Paquete público en npm.' },
			],
		},
		resources: {
			eyebrow: 'DOCUMENTACIÓN',
			title: 'Consulta lo que MADRE hace y lo que no.',
			items: [
				{ label: 'Referencia completa', text: 'Modos, memoria, agentes, módulos, privacidad y variables de entorno.', href: madreFacts.docs },
				{ label: 'Código fuente', text: 'Repositorio público, historial y releases.', href: madreFacts.github },
				{ label: 'Paquete npm', text: 'Versión publicada e instalación.', href: madreFacts.npm },
				{ label: 'Seguridad', text: 'Modelo operativo, límites aceptados de la beta y reporte responsable.', href: madreFacts.security },
			],
		},
		closing: {
			eyebrow: 'SIGUIENTE PASO',
			title: 'Instala MADRE en un proyecto que ya conoces.',
			text: 'Empieza con EXCHANGE, comprueba tus agentes y sube los permisos solo cuando el trabajo lo requiera.',
			primary: 'Copiar comando de instalación',
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
		eyebrow: 'MADRE 0.4.0 · LOCAL PROJECT ROOM',
		title: 'Install a room for your agents.',
		lede: 'One shared conversation, local memory, and explicit permissions for Codex, Claude Code, Gemini CLI, and OpenCode.',
		aside: 'The same tools. More context inside your project.',
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
			eyebrow: 'REAL PRODUCT EVIDENCE',
			title: 'See the room at work.',
			text: 'Codex and Claude share one thread. The handoff line shows exactly what context reached the next agent.',
			alt: 'Real MADRE 0.4.0 interface with a conversation between Codex, a person, and Claude, joined by a handoff line.',
			caption: 'Repository capture · MADRE 0.4.0 · Sep 25, 2026 · real conversation on a demonstration project.',
			disclosure: 'This capture proves the interface and the visible handoff. It does not prove results, adoption, or performance beyond that session.',
		},
		flow: {
			eyebrow: 'HOW IT WORKS',
			title: 'The thread stays intact when the voice changes.',
			text: 'MADRE does not replace your agents. It gathers them around the project and makes each turn’s authority explicit.',
			steps: [
				{ number: '01', title: 'Connect what you already use', text: 'Work with Codex, Claude Code, Gemini CLI, or OpenCode from one room.' },
				{ number: '02', title: 'Share the useful context', text: 'The conversation, ledger, and room memory follow handoffs between agents.' },
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
				{ label: 'MEMORY', title: 'Decisions you can retrieve', text: 'Outside GHOST, the room keeps the ledger and indexes notes and context locally.' },
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

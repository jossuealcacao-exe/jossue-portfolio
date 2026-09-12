import type { Locale } from './i18n';

export type AhpAtlasCategory =
	| 'start'
	| 'project'
	| 'session'
	| 'conversation'
	| 'records'
	| 'handoff'
	| 'security'
	| 'integration';

type Localized = Record<Locale, string>;

export interface AhpAtlasCommand {
	category: AhpAtlasCategory;
	title: Localized;
	description: Localized;
	command: string;
}

export interface AhpAtlasPlatform {
	name: string;
	logo: string;
	adapter: 'cursor' | 'opencode' | 'codex' | 'claude' | 'chatgpt' | 'generic';
	description: Localized;
	prompts: Localized[];
}

export const ahpAtlasCategories: Array<{ id: 'all' | AhpAtlasCategory; label: Localized }> = [
	{ id: 'all', label: { es: 'Todos', en: 'All' } },
	{ id: 'start', label: { es: 'Empezar', en: 'Start' } },
	{ id: 'project', label: { es: 'Proyecto', en: 'Project' } },
	{ id: 'session', label: { es: 'Sesión', en: 'Session' } },
	{ id: 'conversation', label: { es: 'Conversación', en: 'Conversation' } },
	{ id: 'records', label: { es: 'Evidencia', en: 'Evidence' } },
	{ id: 'handoff', label: { es: 'Continuidad', en: 'Continuity' } },
	{ id: 'security', label: { es: 'Seguridad', en: 'Security' } },
	{ id: 'integration', label: { es: 'Integración', en: 'Integration' } },
];

export const ahpAtlasCommands: AhpAtlasCommand[] = [
	{ category: 'start', title: { es: 'Instalar y configurar', en: 'Install and configure' }, description: { es: 'Fija AHP+ 1.4.1, prepara .ahp/, Codex y Claude, crea identidades locales y ejecuta las comprobaciones iniciales.', en: 'Pins AHP+ 1.4.1, prepares .ahp/, Codex and Claude, creates local identities, and runs the initial checks.' }, command: 'npx @jossuealcala/ahp-plus@1.4.1 setup .' },
	{ category: 'start', title: { es: 'Instalar solo para Codex', en: 'Install for Codex only' }, description: { es: 'Evita integraciones que no usarás y deja únicamente la superficie de Codex.', en: 'Avoids integrations you will not use and keeps only the Codex surface.' }, command: 'npx @jossuealcala/ahp-plus@1.4.1 setup . --platforms codex' },
	{ category: 'start', title: { es: 'Ver el catálogo oficial', en: 'View the official catalog' }, description: { es: 'Lista la gramática y los comandos disponibles en la versión instalada.', en: 'Lists the grammar and commands available in the installed version.' }, command: 'npx ahp catalog' },
	{ category: 'project', title: { es: 'Pulso recomendado', en: 'Recommended pulse' }, description: { es: 'Resume de una vez identidad, estructura, verificación, preparación y transporte del proyecto.', en: 'Summarizes project identity, structure, verification, readiness, and transport in one pass.' }, command: 'npx ahp project check . --platform codex' },
	{ category: 'project', title: { es: 'Confirmar la raíz', en: 'Confirm the root' }, description: { es: 'Muestra qué repositorio y qué carpeta .ahp/ está usando antes de escribir.', en: 'Shows which repository and .ahp/ folder it will use before writing.' }, command: 'npx ahp project root .' },
	{ category: 'project', title: { es: 'Diagnosticar la instalación', en: 'Diagnose the installation' }, description: { es: 'Comprueba identidad, estructura y portabilidad sin alterar el proyecto.', en: 'Checks identity, structure, and portability without altering the project.' }, command: 'npx ahp project doctor .' },
	{ category: 'project', title: { es: 'Diagnosticar Git', en: 'Diagnose Git' }, description: { es: 'Añade una lectura del estado Git del host al diagnóstico.', en: 'Adds a reading of the host Git state to the diagnosis.' }, command: 'npx ahp project doctor . --diagnose-git' },
	{ category: 'project', title: { es: 'Verificar a fondo', en: 'Run a strict verification' }, description: { es: 'Valida estructura, referencias, integridad y advertencias.', en: 'Validates structure, references, integrity, and warnings.' }, command: 'npx ahp project verify . --strict' },
	{ category: 'project', title: { es: 'Ver el estado', en: 'See project status' }, description: { es: 'Explica la fase, el estado de Git, los bloqueos y la portabilidad.', en: 'Explains phase, Git state, locks, and portability.' }, command: 'npx ahp project status .' },
	{ category: 'project', title: { es: 'Separar local de remoto', en: 'Separate local from remote' }, description: { es: 'Distingue que el proyecto esté listo aquí de que ya pueda continuar en otra máquina.', en: 'Distinguishes being ready here from being ready to continue on another machine.' }, command: 'npx ahp project ready . --platform codex' },
	{ category: 'project', title: { es: 'Aceptar el commit actual', en: 'Accept the current commit' }, description: { es: 'Confirma deliberadamente la frontera canónica después de revisar el diff; no hace commit ni push.', en: 'Deliberately confirms the canonical boundary after reviewing the diff; it does not commit or push.' }, command: 'npx ahp project state . --accept-head' },
	{ category: 'session', title: { es: 'Leer el contexto', en: 'Read the context' }, description: { es: 'Genera un resumen acotado para una persona o un agente.', en: 'Generates a bounded summary for a person or agent.' }, command: 'npx ahp session context . --format markdown --budget 8000' },
	{ category: 'session', title: { es: 'Actualizar el brief', en: 'Refresh the brief' }, description: { es: 'Regenera el resumen guardado dentro del repositorio.', en: 'Regenerates the summary stored inside the repository.' }, command: 'npx ahp session brief . --budget 8000' },
	{ category: 'session', title: { es: 'Crear un checkpoint', en: 'Create a checkpoint' }, description: { es: 'Guarda dónde terminaste y cuál es la siguiente acción verificable.', en: 'Stores where you stopped and the next verifiable action.' }, command: 'npx ahp session checkpoint . --summary "Límite validado" --next-action "Crear handoff"' },
	{ category: 'session', title: { es: 'Revisar el historial', en: 'Review history' }, description: { es: 'Lista checkpoints y handoffs de la sesión.', en: 'Lists checkpoints and handoffs for the session.' }, command: 'npx ahp session history .' },
	{ category: 'conversation', title: { es: 'Enviar un mensaje causal', en: 'Send a causal message' }, description: { es: 'Guarda un mensaje operativo con huella verificable dentro del proyecto.', en: 'Stores an operational message with a verifiable fingerprint inside the project.' }, command: 'npx ahp message send "Continúa desde el límite verificado" --from codex --to claude' },
	{ category: 'conversation', title: { es: 'Leer el inbox', en: 'Read the inbox' }, description: { es: 'Muestra los mensajes dirigidos a una plataforma.', en: 'Shows messages addressed to a platform.' }, command: 'npx ahp message inbox . --for claude' },
	{ category: 'conversation', title: { es: 'Responder un mensaje', en: 'Reply to a message' }, description: { es: 'Vincula la respuesta con el evento que la originó.', en: 'Links the reply to the event that originated it.' }, command: 'npx ahp message reply EVT-... "Recibido y verificado" --from claude' },
	{ category: 'conversation', title: { es: 'Verificar una huella', en: 'Verify a fingerprint' }, description: { es: 'Comprueba que un evento no cambió después de crearse.', en: 'Checks that an event has not changed since it was created.' }, command: 'npx ahp message verify EVT-... .' },
	{ category: 'conversation', title: { es: 'Pedir una segunda opinión', en: 'Ask for a second opinion' }, description: { es: 'Solicita una sola respuesta de solo lectura a Claude desde Codex.', en: 'Requests one read-only answer from Claude from Codex.' }, command: 'npx ahp agent ask claude "¿Qué riesgo ves en este cambio?" --from codex' },
	{ category: 'conversation', title: { es: 'Abrir una sala', en: 'Open a room' }, description: { es: 'Crea una conversación durable para participantes del mismo proyecto.', en: 'Creates a durable conversation for participants in the same project.' }, command: 'npx ahp conversation open "Revisión de arquitectura" --participants codex,claude --from codex' },
	{ category: 'conversation', title: { es: 'Enviar a la sala', en: 'Send to the room' }, description: { es: 'Añade un evento nuevo a una sala compartida.', en: 'Adds a new event to a shared room.' }, command: 'npx ahp conversation send conv-... "Revisa el siguiente paso" --from codex --to claude' },
	{ category: 'conversation', title: { es: 'Esperar una respuesta', en: 'Wait for a reply' }, description: { es: 'Hace una espera explícita; no despierta ni escribe en el chat nativo de otra app.', en: 'Performs an explicit wait; it does not wake or write into another app’s native chat.' }, command: 'npx ahp conversation wait conv-... --for codex --timeout 60' },
	{ category: 'records', title: { es: 'Guardar evidencia', en: 'Store evidence' }, description: { es: 'Registra el resultado observado de una prueba o artefacto.', en: 'Records the observed result of a test or artifact.' }, command: 'npx ahp record add evidence . --title "Verificación local"' },
	{ category: 'records', title: { es: 'Guardar una decisión', en: 'Store a decision' }, description: { es: 'Deja una decisión explícita y revisable dentro del proyecto.', en: 'Keeps an explicit, reviewable decision inside the project.' }, command: 'npx ahp record add decision . --title "Mantener autoridad humana"' },
	{ category: 'records', title: { es: 'Listar pendientes activos', en: 'List active tasks' }, description: { es: 'Muestra solo lo que todavía requiere atención.', en: 'Shows only what still requires attention.' }, command: 'npx ahp record list task . --active' },
	{ category: 'records', title: { es: 'Cerrar un registro', en: 'Close a record' }, description: { es: 'Cierra un registro con un estado explícito; el historial se conserva.', en: 'Closes a record with an explicit status; history is preserved.' }, command: 'npx ahp record close TASK-... . --status CLOSED' },
	{ category: 'handoff', title: { es: 'Crear la entrega', en: 'Create the handoff' }, description: { es: 'Sella el contexto necesario para continuar en otra plataforma.', en: 'Seals the context needed to continue on another platform.' }, command: 'npx ahp handoff create . --from codex --to claude --summary "Continuar desde el límite validado"' },
	{ category: 'handoff', title: { es: 'Inspeccionar la entrega', en: 'Inspect the handoff' }, description: { es: 'Comprueba contenido e integridad sin aceptarla todavía.', en: 'Checks contents and integrity without accepting it yet.' }, command: 'npx ahp handoff inspect HOF-... .' },
	{ category: 'handoff', title: { es: 'Recibir la entrega', en: 'Receive the handoff' }, description: { es: 'La acepta solo si corresponde con el proyecto y su frontera Git.', en: 'Accepts it only if it matches the project and its Git boundary.' }, command: 'npx ahp handoff receive HOF-... .' },
	{ category: 'handoff', title: { es: 'Comprobar transporte', en: 'Check transport' }, description: { es: 'Verifica si la continuidad ya está disponible en el remoto; no ejecuta Git.', en: 'Checks whether continuity is available remotely; it does not run Git.' }, command: 'npx ahp sync check . --require-remote' },
	{ category: 'handoff', title: { es: 'Reservar un alcance', en: 'Reserve a scope' }, description: { es: 'Publica un lock cooperativo para evitar que dos agentes pisen la misma zona.', en: 'Publishes a cooperative lock so two agents do not overwrite the same area.' }, command: 'npx ahp lock acquire . --scope src/editor --owner codex' },
	{ category: 'handoff', title: { es: 'Liberar el alcance', en: 'Release the scope' }, description: { es: 'Retira el lock cooperativo al terminar.', en: 'Removes the cooperative lock when the work is done.' }, command: 'npx ahp lock release LOCK-... . --owner codex' },
	{ category: 'security', title: { es: 'Listar identidades', en: 'List identities' }, description: { es: 'Muestra las identidades locales de dispositivo disponibles.', en: 'Shows the available local device identities.' }, command: 'npx ahp identity list .' },
	{ category: 'security', title: { es: 'Verificar una identidad', en: 'Verify an identity' }, description: { es: 'Comprueba la identidad de firma y cifrado de un dispositivo.', en: 'Checks a device signing and encryption identity.' }, command: 'npx ahp identity verify DEV-... .' },
	{ category: 'security', title: { es: 'Enviar cifrado por red', en: 'Send encrypted over the network' }, description: { es: 'Cifra y firma un evento para un dispositivo concreto mediante un hub autorizado.', en: 'Encrypts and signs an event for a specific device through an authorized hub.' }, command: 'npx ahp secure network send EVT-... --from-device DEV-... --to-device DEV-... --url HTTPS_URL --token-file FILE' },
	{ category: 'security', title: { es: 'Recibir cifrado', en: 'Receive encrypted' }, description: { es: 'Descarga y abre mensajes destinados a una identidad local.', en: 'Downloads and opens messages addressed to a local identity.' }, command: 'npx ahp secure network receive --as-device DEV-... --url HTTPS_URL --token-file FILE' },
	{ category: 'security', title: { es: 'Confirmar con recibo', en: 'Confirm with a receipt' }, description: { es: 'Devuelve un recibo firmado por el dispositivo receptor.', en: 'Returns a receipt signed by the receiving device.' }, command: 'npx ahp secure network confirm --as-device DEV-... --url HTTPS_URL --token-file FILE' },
	{ category: 'integration', title: { es: 'Ver plataformas', en: 'See platforms' }, description: { es: 'Lista los adaptadores que la versión instalada reconoce.', en: 'Lists the adapters recognized by the installed version.' }, command: 'npx ahp adapter list' },
	{ category: 'integration', title: { es: 'Previsualizar adaptadores', en: 'Preview adapters' }, description: { es: 'Muestra qué archivos se instalarían y detecta conflictos, sin escribir.', en: 'Shows which files would be installed and detects conflicts, without writing.' }, command: 'npx ahp adapter install all .' },
	{ category: 'integration', title: { es: 'Aplicar adaptadores', en: 'Apply adapters' }, description: { es: 'Instala las superficies para los asistentes elegidos.', en: 'Installs surfaces for the selected assistants.' }, command: 'npx ahp adapter install all . --apply' },
];

export const ahpAtlasPlatforms: AhpAtlasPlatform[] = [
	{
		name: 'Cursor', logo: '/tools/cursor.svg', adapter: 'cursor',
		description: { es: 'Instala /ahp en Cursor. El adaptador traduce la intención al CLI local y debe mostrar la salida real.', en: 'Installs /ahp in Cursor. The adapter translates intent to the local CLI and must show real output.' },
		prompts: [
			{ es: '/ahp project check', en: '/ahp project check' },
			{ es: '/ahp session checkpoint resumen="Límite validado" siguiente="Crear handoff"', en: '/ahp session checkpoint summary="Validated boundary" next="Create handoff"' },
			{ es: '/ahp conversation inbox room=conv-... for=cursor', en: '/ahp conversation inbox room=conv-... for=cursor' },
			{ es: '/ahp receive HOF-...', en: '/ahp receive HOF-...' },
		],
	},
	{
		name: 'OpenCode', logo: '/tools/opencode.svg', adapter: 'opencode',
		description: { es: 'Instala el mismo vocabulario /ahp en OpenCode.', en: 'Installs the same /ahp vocabulary in OpenCode.' },
		prompts: [
			{ es: '/ahp status', en: '/ahp status' },
			{ es: '/ahp verify strict', en: '/ahp verify strict' },
			{ es: '/ahp handoff to claude', en: '/ahp handoff to claude' },
		],
	},
	{
		name: 'Codex', logo: '/tools/openai.svg', adapter: 'codex',
		description: { es: 'Instala la skill $ahp y conserva el contrato del proyecto en AGENTS.md.', en: 'Installs the $ahp skill and keeps the project contract in AGENTS.md.' },
		prompts: [
			{ es: 'Usa $ahp para comprobar este proyecto y mostrar project_id, commit, portabilidad, bloqueos y siguiente acción. No edites archivos.', en: 'Use $ahp to check this project and show project_id, commit, portability, locks, and next action. Do not edit files.' },
			{ es: 'Usa $ahp para preguntarle a Claude qué riesgo ve en este cambio, solo lectura.', en: 'Use $ahp to ask Claude what risk it sees in this change, read-only.' },
			{ es: 'Usa $ahp para recibir HOF-... y no edites si el resultado no es READY.', en: 'Use $ahp to receive HOF-... and do not edit unless the outcome is READY.' },
		],
	},
	{
		name: 'Claude Code', logo: '/tools/anthropic.svg', adapter: 'claude',
		description: { es: 'Conecta CLAUDE.md con AHP_INSTRUCTIONS.md. Se usa con lenguaje natural, no con un slash command propio.', en: 'Connects CLAUDE.md with AHP_INSTRUCTIONS.md. It uses natural language, not its own slash command.' },
		prompts: [
			{ es: 'Usa AHP+ para ejecutar el pulso del proyecto y mostrarme la salida real antes de continuar.', en: 'Use AHP+ to run the project pulse and show me the real output before continuing.' },
			{ es: 'Usa AHP+ para pedirle a Codex una revisión de solo lectura y una sola respuesta.', en: 'Use AHP+ to ask Codex for one read-only review and one response.' },
			{ es: 'Recibe HOF-... con AHP+ y detente si requiere reconciliación.', en: 'Receive HOF-... with AHP+ and stop if it requires reconciliation.' },
		],
	},
	{
		name: 'ChatGPT / Mobile', logo: '/tools/openai.svg', adapter: 'chatgpt',
		description: { es: 'Con repositorio y terminal puede ejecutar. Si solo lee archivos, debe declarar esa limitación.', en: 'With repository and terminal access it can run. If it only reads files, it must declare that limitation.' },
		prompts: [
			{ es: 'Lee AHP_INSTRUCTIONS.md. Ejecuta el pulso de inicio y muéstrame la salida real.', en: 'Read AHP_INSTRUCTIONS.md. Run the start-up pulse and show me the real output.' },
			{ es: 'Si no tienes terminal, usa AHP_MOBILE.md y no digas que verificaste, probaste, hiciste commit ni push.', en: 'If you have no terminal, use AHP_MOBILE.md and do not say you verified, tested, committed, or pushed.' },
		],
	},
	{
		name: 'Cualquier otro agente', logo: '/cv/brands/ahp-plus.svg', adapter: 'generic',
		description: { es: 'Instala instrucciones neutrales para cualquier agente con acceso al repositorio.', en: 'Installs provider-neutral instructions for any agent with repository access.' },
		prompts: [
			{ es: 'Sigue las instrucciones AHP+ de este repositorio. Verifica antes de escribir y usa Git confirmado como fuente canónica.', en: 'Follow this repository’s AHP+ instructions. Verify before writing and use confirmed Git state as the canonical source.' },
			{ es: 'Muéstrame la evidencia real y espera mi autorización antes de cualquier acción externa.', en: 'Show me the real evidence and wait for my authorization before any external action.' },
		],
	},
];

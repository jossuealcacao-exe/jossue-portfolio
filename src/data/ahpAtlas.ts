import type { Locale } from './i18n';

export type AhpAtlasCategory =
	| 'repository'
	| 'context'
	| 'records'
	| 'handoff'
	| 'concurrency'
	| 'migration'
	| 'adapters'
	| 'package';

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
	{ id: 'repository', label: { es: 'Repositorio', en: 'Repository' } },
	{ id: 'context', label: { es: 'Contexto', en: 'Context' } },
	{ id: 'records', label: { es: 'Anotaciones', en: 'Records' } },
	{ id: 'handoff', label: { es: 'Entrega', en: 'Handover' } },
	{ id: 'concurrency', label: { es: 'Varios a la vez', en: 'Working in parallel' } },
	{ id: 'migration', label: { es: 'Migración', en: 'Migration' } },
	{ id: 'adapters', label: { es: 'Instaladores', en: 'Installers' } },
	{ id: 'package', label: { es: 'Versiones', en: 'Versions' } },
];

export const ahpAtlasCommands: AhpAtlasCommand[] = [
	{ category: 'repository', title: { es: 'Empezar', en: 'Set up' }, description: { es: 'Crea la carpeta .ahp/ dentro del repositorio en el que estás.', en: 'Creates the .ahp/ folder inside the repository you are in.' }, command: 'npx ahp init . --owner "Tu nombre" --project mi-proyecto' },
	{ category: 'repository', title: { es: 'Confirmar dónde estás', en: 'Confirm where you are' }, description: { es: 'Te dice qué repositorio y qué carpeta .ahp/ está usando, para no anotar en el proyecto equivocado.', en: 'Tells you which repository and which .ahp/ folder it is using, so you do not write into the wrong project.' }, command: 'npx ahp root .' },
	{ category: 'repository', title: { es: 'Revisión general', en: 'Health check' }, description: { es: 'Comprueba de una vez el proyecto, el alcance, la estructura de archivos y si todo es válido.', en: 'Checks the project, the scope, the file structure, and whether everything is valid, all at once.' }, command: 'npx ahp doctor .' },
	{ category: 'repository', title: { es: 'Revisión a fondo', en: 'Strict check' }, description: { es: 'Revisa estructura, referencias e integridad, y avisa si se colaron datos secretos.', en: 'Reviews structure, references, and integrity, and warns if any secrets slipped in.' }, command: 'npx ahp verify . --strict' },
	{ category: 'repository', title: { es: '¿Cómo va el proyecto?', en: 'Where the project stands' }, description: { es: 'Muestra en qué punto va, el estado de Git, los avisos activos y si el trabajo ya salió de tu computadora.', en: 'Shows where it stands, the state of Git, any active notices, and whether the work has left your computer yet.' }, command: 'npx ahp status .' },
	{ category: 'repository', title: { es: '¿Ya está respaldado?', en: 'Is it backed up?' }, description: { es: 'Compara lo que tienes en local con el servidor. Con --require-remote falla si todavía no subiste nada.', en: 'Compares what you have locally with the server. With --require-remote it fails if nothing has been pushed yet.' }, command: 'npx ahp sync check . --require-remote' },
	{ category: 'context', title: { es: 'Resumen para máquinas', en: 'Summary for machines' }, description: { es: 'Entrega el resumen del proyecto en JSON, listo para que otro programa lo lea.', en: 'Returns the project summary as JSON, ready for another program to read.' }, command: 'npx ahp context . --format json --budget 8000' },
	{ category: 'context', title: { es: 'Resumen para personas', en: 'Summary for people' }, description: { es: 'El mismo resumen en texto, para leerlo tú o pegarlo en un chat.', en: 'The same summary in plain text, to read yourself or paste into a chat.' }, command: 'npx ahp context . --format markdown --budget 8000' },
	{ category: 'context', title: { es: 'Actualizar el resumen guardado', en: 'Refresh the saved summary' }, description: { es: 'Reescribe el archivo .ahp/INDEX.md con el estado más reciente.', en: 'Rewrites the .ahp/INDEX.md file with the latest state.' }, command: 'npx ahp brief . --budget 8000' },
	{ category: 'context', title: { es: 'Marcar dónde te quedaste', en: 'Mark where you stopped' }, description: { es: 'Guarda un punto de la sesión al que puedas volver después.', en: 'Saves a point in the session you can come back to later.' }, command: 'npx ahp checkpoint . --session mi-sesion --summary "Límite validado" --next-action "Continuar"' },
	{ category: 'context', title: { es: 'Ver el historial', en: 'See the history' }, description: { es: 'Lista los puntos guardados y las entregas hechas hasta ahora.', en: 'Lists the saved points and the handovers made so far.' }, command: 'npx ahp history .' },
	{ category: 'context', title: { es: 'Historial de una sesión', en: 'History of one session' }, description: { es: 'Filtra ese historial para ver solo una sesión de trabajo.', en: 'Filters that history down to a single work session.' }, command: 'npx ahp history . --session mi-sesion' },
	{ category: 'context', title: { es: 'Anotar el rumbo', en: 'Update the direction' }, description: { es: 'Actualiza en qué fase va el proyecto, cuál es el objetivo y cuál es el siguiente paso.', en: 'Updates the phase the project is in, the objective, and the next step.' }, command: 'npx ahp set-state . --phase IN_PROGRESS --objective "Objetivo" --next-action "Siguiente paso" --confidence USER_CONFIRMED' },
	{ category: 'records', title: { es: 'Decisión', en: 'Decision' }, description: { es: 'Deja por escrito una decisión, para que después nadie tenga que recordarla de memoria.', en: 'Puts a decision in writing, so nobody has to recall it from memory later.' }, command: 'npx ahp record decision . --title "Decisión" --status ACCEPTED --confidence USER_CONFIRMED' },
	{ category: 'records', title: { es: 'Pendiente', en: 'To-do' }, description: { es: 'Anota algo por hacer y en qué estado está.', en: 'Notes something to be done and the state it is in.' }, command: 'npx ahp record task . --title "Implementar mejora" --status PLANNED --confidence USER_CONFIRMED' },
	{ category: 'records', title: { es: 'Error', en: 'Bug' }, description: { es: 'Anota un error que se puede reproducir a voluntad.', en: 'Notes an error that can be reproduced on demand.' }, command: 'npx ahp record bug . --title "Fallo reproducible" --status OPEN --confidence VERIFIED' },
	{ category: 'records', title: { es: 'Riesgo', en: 'Risk' }, description: { es: 'Deja anotado un riesgo abierto para que no se olvide.', en: 'Keeps an open risk written down so it is not forgotten.' }, command: 'npx ahp record risk . --title "Riesgo de migración" --status OPEN --confidence VERIFIED' },
	{ category: 'records', title: { es: 'Revisión aprobada o rechazada', en: 'Review passed or failed' }, description: { es: 'Aprueba o rechaza una revisión de calidad. Para poner PASS hay que citar una prueba concreta (EVD-...).', en: 'Passes or fails a quality review. To mark PASS you must cite a concrete piece of proof (EVD-...).' }, command: 'npx ahp record qa . --title "Gate de aceptación" --status PASS --confidence VERIFIED --source EVD-...' },
	{ category: 'records', title: { es: 'Requisito', en: 'Requirement' }, description: { es: 'Anota algo que el proyecto tiene que cumplir.', en: 'Notes something the project has to satisfy.' }, command: 'npx ahp record requirement . --title "Debe ser portable" --status ACCEPTED --confidence USER_CONFIRMED' },
	{ category: 'records', title: { es: 'Prueba de que algo pasó', en: 'Proof that something happened' }, description: { es: 'Guarda el resultado real de algo que se ejecutó: el comando, lo que devolvió y si terminó bien.', en: 'Stores the real result of something that ran: the command, what it returned, and whether it finished cleanly.' }, command: 'npx ahp record evidence . --title "Validación local" --type test --locator "npm test" --result "PASS: 18 pruebas" --confidence VERIFIED --exit-code 0' },
	{ category: 'records', title: { es: 'Ver anotaciones', en: 'See the records' }, description: { es: 'Lista todas las anotaciones o solo las de un tipo.', en: 'Lists every record, or only those of one kind.' }, command: 'npx ahp list risk .' },
	{ category: 'records', title: { es: 'Ver solo lo abierto', en: 'See only what is open' }, description: { es: 'Deja fuera lo que ya se cerró.', en: 'Leaves out anything already closed.' }, command: 'npx ahp list task . --active' },
	{ category: 'records', title: { es: 'Cerrar una anotación', en: 'Close a record' }, description: { es: 'Cierra una anotación explicando por qué.', en: 'Closes a record with the reason why.' }, command: 'npx ahp close RISK-... . --status CLOSED --reason "Mitigación verificada"' },
	{ category: 'records', title: { es: 'Cambiar de decisión', en: 'Change a decision' }, description: { es: 'Sustituye una decisión ya aceptada creando una nueva: la original nunca se reescribe, queda en el historial.', en: 'Replaces an accepted decision by creating a new one: the original is never rewritten, it stays in the history.' }, command: 'npx ahp supersede DEC-... . --title "Decisión revisada" --accept --confidence USER_CONFIRMED' },
	{ category: 'handoff', title: { es: 'Preparar la entrega', en: 'Prepare the handover' }, description: { es: 'Empaqueta el contexto para pasárselo a otra herramienta.', en: 'Packages the context so it can be passed to another tool.' }, command: 'npx ahp handoff create . --from codex --to cursor --session feature-x --summary "Continuar"' },
	{ category: 'handoff', title: { es: 'Revisarla antes de aceptar', en: 'Review before accepting' }, description: { es: 'Abre la entrega y comprueba que esté completa, sin aceptarla todavía.', en: 'Opens the handover and checks it is complete, without accepting it yet.' }, command: 'npx ahp handoff inspect HOF-... .' },
	{ category: 'handoff', title: { es: 'Aceptar la entrega', en: 'Accept the handover' }, description: { es: 'La acepta solo si el proyecto, el contenido y el commit coinciden con lo que dice.', en: 'Accepts it only if the project, the contents, and the commit match what it claims.' }, command: 'npx ahp handoff receive HOF-... .' },
	{ category: 'concurrency', title: { es: 'Escribir sin pisar a nadie', en: 'Write without overwriting anyone' }, description: { es: 'Cancela la escritura si alguien más movió el repositorio mientras tú trabajabas.', en: 'Cancels the write if someone else moved the repository while you were working.' }, command: 'npx ahp checkpoint . --summary "Límite" --expected-head COMMIT --expected-state DIGEST' },
	{ category: 'concurrency', title: { es: 'Avisar que estás trabajando', en: 'Flag that you are working' }, description: { es: 'Deja un aviso de que estás en una parte del proyecto. Es un aviso de cortesía, no un candado.', en: 'Leaves a notice that you are inside one part of the project. It is a courtesy notice, not a lock.' }, command: 'npx ahp lock acquire . --scope src/editor --owner codex --minutes 60' },
	{ category: 'concurrency', title: { es: 'Retirar el aviso', en: 'Remove the notice' }, description: { es: 'Quita tu aviso al terminar. El historial se conserva.', en: 'Removes your notice when you are done. The history is kept.' }, command: 'npx ahp lock release LOCK-... . --owner codex' },
	{ category: 'migration', title: { es: 'Ver qué se movería', en: 'See what would move' }, description: { es: 'Revisa la carpeta agent/ de la versión 1.0 y te dice qué haría, sin tocar ningún archivo.', en: 'Reviews the version 1.0 agent/ folder and tells you what it would do, without touching any file.' }, command: 'npx ahp migrate . --plan' },
	{ category: 'migration', title: { es: 'Hacer el cambio', en: 'Make the change' }, description: { es: 'Crea la estructura de la versión 1.1 y conserva intacta la carpeta agent/ original.', en: 'Creates the version 1.1 structure and leaves the original agent/ folder untouched.' }, command: 'npx ahp migrate . --apply' },
	{ category: 'adapters', title: { es: 'Ver qué plataformas hay', en: 'See the available platforms' }, description: { es: 'Muestra para qué programas y asistentes existe instalador.', en: 'Shows which programs and assistants have an installer.' }, command: 'npx ahp adapter list' },
	{ category: 'adapters', title: { es: 'Ver qué instalaría', en: 'See what it would install' }, description: { es: 'Muestra qué archivos crearía y con cuáles podría chocar, sin instalar nada.', en: 'Shows which files it would create and which it might clash with, without installing anything.' }, command: 'npx ahp adapter install all .' },
	{ category: 'adapters', title: { es: 'Instalar en todas', en: 'Install on all of them' }, description: { es: 'Instala los seis: agente genérico, Claude, Cursor, OpenCode, Codex y ChatGPT.', en: 'Installs all six: generic agent, Claude, Cursor, OpenCode, Codex, and ChatGPT.' }, command: 'npx ahp adapter install all . --apply' },
	{ category: 'adapters', title: { es: 'Instalar en una sola', en: 'Install on just one' }, description: { es: 'Cambia PLATFORM por generic, claude, cursor, opencode, codex o chatgpt.', en: 'Replace PLATFORM with generic, claude, cursor, opencode, codex, or chatgpt.' }, command: 'npx ahp adapter install PLATFORM . --apply' },
	{ category: 'package', title: { es: 'Instalar la versión estable', en: 'Install the stable version' }, description: { es: 'Instala la última versión probada. Es la opción normal.', en: 'Installs the latest tested version. This is the normal choice.' }, command: 'npm install --save-dev @jossuealcala/ahp-plus@latest' },
	{ category: 'package', title: { es: 'Fijar una versión exacta', en: 'Pin an exact version' }, description: { es: 'Instala exactamente la 1.1.0, la misma que documenta esta guía.', en: 'Installs exactly 1.1.0, the same version this guide documents.' }, command: 'npm install --save-dev @jossuealcala/ahp-plus@1.1.0' },
	{ category: 'package', title: { es: 'Probar lo que viene', en: 'Try what is coming' }, description: { es: 'Instala la versión en preparación. Solo para probar y reportar fallos, no para producción.', en: 'Installs the in-progress version. For testing and reporting issues only, not for production.' }, command: 'npm install --save-dev @jossuealcala/ahp-plus@next' },
	{ category: 'package', title: { es: 'Desinstalar', en: 'Uninstall' }, description: { es: 'Quita el programa. Tus anotaciones en .ahp/ y los instaladores siguen ahí.', en: 'Removes the program. Your records in .ahp/ and the installers stay where they are.' }, command: 'npm uninstall @jossuealcala/ahp-plus' },
];

export const ahpAtlasPlatforms: AhpAtlasPlatform[] = [
	{
		name: 'Cursor', logo: '/tools/cursor.svg', adapter: 'cursor',
		description: { es: 'Añade el comando /ahp al chat de Cursor, para pedirlo sin salir del editor.', en: 'Adds the /ahp command to Cursor chat, so you can ask for it without leaving the editor.' },
		prompts: [
			{ es: '/ahp doctor', en: '/ahp doctor' }, { es: '/ahp verify strict', en: '/ahp verify strict' }, { es: '/ahp context', en: '/ahp context' },
			{ es: '/ahp checkpoint resumen="Límite validado" siguiente="Crear handoff"', en: '/ahp checkpoint summary="Validated boundary" next="Create handoff"' },
			{ es: '/ahp handoff to codex', en: '/ahp handoff to codex' }, { es: '/ahp receive HOF-...', en: '/ahp receive HOF-...' },
		],
	},
	{
		name: 'OpenCode', logo: '/tools/opencode.svg', adapter: 'opencode',
		description: { es: 'Añade el mismo comando /ahp en OpenCode. Se escribe igual que en Cursor.', en: 'Adds the same /ahp command in OpenCode. You type it exactly as in Cursor.' },
		prompts: [
			{ es: '/ahp status', en: '/ahp status' }, { es: '/ahp verify strict', en: '/ahp verify strict' },
			{ es: '/ahp handoff to claude', en: '/ahp handoff to claude' }, { es: '/ahp receive HOF-...', en: '/ahp receive HOF-...' },
		],
	},
	{
		name: 'Codex', logo: '/tools/openai.svg', adapter: 'codex',
		description: { es: 'Instala la habilidad $ahp y deja las reglas del proyecto en AGENTS.md.', en: 'Installs the $ahp skill and keeps the project rules in AGENTS.md.' },
		prompts: [
			{ es: 'Usa $ahp para revisar este repositorio y mostrarme en qué punto va el proyecto.', en: 'Use $ahp to check this repository and show me where the project stands.' },
			{ es: 'Usa $ahp para marcar dónde nos quedamos y preparar la entrega a Cursor.', en: 'Use $ahp to mark where we stopped and prepare the handover to Cursor.' },
			{ es: 'Usa $ahp para aceptar la entrega HOF-... y no edites nada si el resultado no dice READY.', en: 'Use $ahp to accept handover HOF-... and do not edit anything unless the result says READY.' },
		],
	},
	{
		name: 'Claude Code', logo: '/tools/anthropic.svg', adapter: 'claude',
		description: { es: 'Conecta CLAUDE.md con las instrucciones de AHP+. Aquí se pide con lenguaje normal: no hay comando con barra.', en: 'Connects CLAUDE.md to the AHP+ instructions. Here you ask in plain language: there is no slash command.' },
		prompts: [
			{ es: 'Antes de continuar, corre con AHP+ la revisión general, la revisión a fondo y el resumen del proyecto.', en: 'Before continuing, use AHP+ to run the health check, the strict check, and the project summary.' },
			{ es: 'Marca dónde nos quedamos y prepara la entrega de Claude a Codex, sin hacer commit ni push.', en: 'Mark where we stopped and prepare the handover from Claude to Codex, without committing or pushing.' },
			{ es: 'Acepta la entrega HOF-... con AHP+ y detente si algo no coincide.', en: 'Accept handover HOF-... with AHP+ and stop if anything does not match.' },
		],
	},
	{
		name: 'ChatGPT / Mobile', logo: '/tools/openai.svg', adapter: 'chatgpt',
		description: { es: 'Instala AHP_MOBILE.md. Si el chat tiene terminal, puede ejecutar; si solo lee, tiene que decirlo.', en: 'Installs AHP_MOBILE.md. If the chat has a terminal it can run commands; if it can only read, it has to say so.' },
		prompts: [
			{ es: 'Lee AHP_INSTRUCTIONS.md. Corre la revisión de arranque con AHP+ y dime el proyecto, el commit, si el trabajo ya está respaldado, qué está bloqueado y cuál es el siguiente paso.', en: 'Read AHP_INSTRUCTIONS.md. Run the start check with AHP+ and tell me the project, the commit, whether the work is backed up, what is blocked, and the next step.' },
			{ es: 'Si no tienes terminal: lee AHP_MOBILE.md, .ahp/INDEX.md y la entrega más reciente. No digas que revisaste, probaste, hiciste commit ni push, porque no puedes.', en: 'If you have no terminal: read AHP_MOBILE.md, .ahp/INDEX.md, and the latest handover. Do not say you checked, tested, committed, or pushed, because you cannot.' },
		],
	},
	{
		name: 'Cualquier otro agente', logo: '/cv/brands/ahp-plus.svg', adapter: 'generic',
		description: { es: 'Instala AHP_INSTRUCTIONS.md y un bloque en AGENTS.md, para agentes que no tienen instalador propio.', en: 'Installs AHP_INSTRUCTIONS.md and a block in AGENTS.md, for agents without their own installer.' },
		prompts: [
			{ es: 'Sigue las instrucciones de AHP+ de este repositorio. Revisa antes de escribir y toma el repositorio como fuente de verdad, no la conversación.', en: 'Follow this repository’s AHP+ instructions. Check before writing and treat the repository as the source of truth, not the conversation.' },
			{ es: 'Corre la revisión general, la revisión a fondo y el resumen del proyecto. Muéstrame la salida real y espera mi autorización antes de cualquier acción fuera del repositorio.', en: 'Run the health check, the strict check, and the project summary. Show me the real output and wait for my authorization before any action outside the repository.' },
		],
	},
];

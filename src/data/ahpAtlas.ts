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
	{ id: 'records', label: { es: 'Registros', en: 'Records' } },
	{ id: 'handoff', label: { es: 'Handoff', en: 'Handoff' } },
	{ id: 'concurrency', label: { es: 'Concurrencia', en: 'Concurrency' } },
	{ id: 'migration', label: { es: 'Migración', en: 'Migration' } },
	{ id: 'adapters', label: { es: 'Adaptadores', en: 'Adapters' } },
	{ id: 'package', label: { es: 'Paquete', en: 'Package' } },
];

export const ahpAtlasCommands: AhpAtlasCommand[] = [
	{ category: 'repository', title: { es: 'Inicializar', en: 'Initialize' }, description: { es: 'Crea .ahp/ en el repositorio Git actual.', en: 'Creates .ahp/ in the current Git repository.' }, command: 'npx ahp init . --owner "Tu nombre" --project mi-proyecto' },
	{ category: 'repository', title: { es: 'Resolver raíz', en: 'Resolve root' }, description: { es: 'Reporta las raíces Git y AHP+ efectivas.', en: 'Reports the effective Git and AHP+ roots.' }, command: 'npx ahp root .' },
	{ category: 'repository', title: { es: 'Diagnóstico', en: 'Doctor' }, description: { es: 'Comprueba identidad, alcance, layout y validación.', en: 'Checks identity, scope, layout, and validation.' }, command: 'npx ahp doctor .' },
	{ category: 'repository', title: { es: 'Verificación estricta', en: 'Strict verify' }, description: { es: 'Valida estructura, referencias, secretos e integridad.', en: 'Validates structure, references, secrets, and integrity.' }, command: 'npx ahp verify . --strict' },
	{ category: 'repository', title: { es: 'Estado', en: 'Status' }, description: { es: 'Muestra estado, Git, locks y portabilidad.', en: 'Shows state, Git, locks, and portability.' }, command: 'npx ahp status .' },
	{ category: 'repository', title: { es: 'Sincronización', en: 'Sync check' }, description: { es: 'Comprueba upstream; require-remote exige transporte remoto.', en: 'Checks upstream; require-remote requires remote transport.' }, command: 'npx ahp sync check . --require-remote' },
	{ category: 'context', title: { es: 'Contexto JSON', en: 'JSON context' }, description: { es: 'Devuelve contexto acotado y legible por máquinas.', en: 'Returns bounded machine-readable context.' }, command: 'npx ahp context . --format json --budget 8000' },
	{ category: 'context', title: { es: 'Contexto Markdown', en: 'Markdown context' }, description: { es: 'Genera una cápsula humana y portable.', en: 'Generates a human-readable portable capsule.' }, command: 'npx ahp context . --format markdown --budget 8000' },
	{ category: 'context', title: { es: 'Regenerar brief', en: 'Regenerate brief' }, description: { es: 'Actualiza .ahp/INDEX.md.', en: 'Updates .ahp/INDEX.md.' }, command: 'npx ahp brief . --budget 8000' },
	{ category: 'context', title: { es: 'Crear checkpoint', en: 'Create checkpoint' }, description: { es: 'Persiste un límite recuperable de sesión.', en: 'Persists a recoverable session boundary.' }, command: 'npx ahp checkpoint . --session mi-sesion --summary "Límite validado" --next-action "Continuar"' },
	{ category: 'context', title: { es: 'Historial', en: 'History' }, description: { es: 'Lista checkpoints y handoffs.', en: 'Lists checkpoints and handoffs.' }, command: 'npx ahp history .' },
	{ category: 'context', title: { es: 'Historial de sesión', en: 'Session history' }, description: { es: 'Filtra el historial por session_id.', en: 'Filters history by session_id.' }, command: 'npx ahp history . --session mi-sesion' },
	{ category: 'context', title: { es: 'Actualizar estado', en: 'Set state' }, description: { es: 'Actualiza fase, objetivo y siguiente acción tras el preflight.', en: 'Updates phase, objective, and next action after preflight.' }, command: 'npx ahp set-state . --phase IN_PROGRESS --objective "Objetivo" --next-action "Siguiente paso" --confidence USER_CONFIRMED' },
	{ category: 'records', title: { es: 'Decisión', en: 'Decision' }, description: { es: 'Registra una decisión tipada.', en: 'Creates a typed decision record.' }, command: 'npx ahp record decision . --title "Decisión" --status ACCEPTED --confidence USER_CONFIRMED' },
	{ category: 'records', title: { es: 'Tarea', en: 'Task' }, description: { es: 'Registra una tarea y su estado.', en: 'Creates a task and its status.' }, command: 'npx ahp record task . --title "Implementar mejora" --status PLANNED --confidence USER_CONFIRMED' },
	{ category: 'records', title: { es: 'Bug', en: 'Bug' }, description: { es: 'Registra un defecto verificable.', en: 'Creates a verifiable bug record.' }, command: 'npx ahp record bug . --title "Fallo reproducible" --status OPEN --confidence VERIFIED' },
	{ category: 'records', title: { es: 'Riesgo', en: 'Risk' }, description: { es: 'Mantiene visible un riesgo activo.', en: 'Keeps an active risk visible.' }, command: 'npx ahp record risk . --title "Riesgo de migración" --status OPEN --confidence VERIFIED' },
	{ category: 'records', title: { es: 'QA', en: 'QA' }, description: { es: 'Acepta o rechaza un gate; PASS requiere evidencia EVD.', en: 'Accepts or rejects a gate; PASS requires EVD evidence.' }, command: 'npx ahp record qa . --title "Gate de aceptación" --status PASS --confidence VERIFIED --source EVD-...' },
	{ category: 'records', title: { es: 'Requisito', en: 'Requirement' }, description: { es: 'Registra un requisito gobernado.', en: 'Creates a governed requirement.' }, command: 'npx ahp record requirement . --title "Debe ser portable" --status ACCEPTED --confidence USER_CONFIRMED' },
	{ category: 'records', title: { es: 'Evidencia', en: 'Evidence' }, description: { es: 'Conserva un resultado reproducible observado.', en: 'Stores an observed reproducible result.' }, command: 'npx ahp record evidence . --title "Validación local" --type test --locator "npm test" --result "PASS: 18 pruebas" --confidence VERIFIED --exit-code 0' },
	{ category: 'records', title: { es: 'Listar registros', en: 'List records' }, description: { es: 'Lista todos los registros o un tipo específico.', en: 'Lists all records or a specific kind.' }, command: 'npx ahp list risk .' },
	{ category: 'records', title: { es: 'Listar activos', en: 'List active' }, description: { es: 'Excluye estados terminales.', en: 'Excludes terminal statuses.' }, command: 'npx ahp list task . --active' },
	{ category: 'records', title: { es: 'Cerrar registro', en: 'Close record' }, description: { es: 'Cierra un registro con estado terminal y razón.', en: 'Closes a record with a terminal status and reason.' }, command: 'npx ahp close RISK-... . --status CLOSED --reason "Mitigación verificada"' },
	{ category: 'records', title: { es: 'Reemplazar decisión', en: 'Supersede decision' }, description: { es: 'Crea reemplazo sin reescribir una decisión aceptada.', en: 'Creates a replacement without rewriting an accepted decision.' }, command: 'npx ahp supersede DEC-... . --title "Decisión revisada" --accept --confidence USER_CONFIRMED' },
	{ category: 'handoff', title: { es: 'Crear handoff', en: 'Create handoff' }, description: { es: 'Sella continuidad para otra plataforma.', en: 'Seals continuity for another platform.' }, command: 'npx ahp handoff create . --from codex --to cursor --session feature-x --summary "Continuar"' },
	{ category: 'handoff', title: { es: 'Inspeccionar handoff', en: 'Inspect handoff' }, description: { es: 'Valida el manifiesto antes de recibirlo.', en: 'Validates the manifest before receiving it.' }, command: 'npx ahp handoff inspect HOF-... .' },
	{ category: 'handoff', title: { es: 'Recibir handoff', en: 'Receive handoff' }, description: { es: 'Compara identidad, integridad y relación Git.', en: 'Compares identity, integrity, and Git relationship.' }, command: 'npx ahp handoff receive HOF-... .' },
	{ category: 'concurrency', title: { es: 'Escritura protegida', en: 'Guarded write' }, description: { es: 'Detiene la escritura si cambió HEAD o state_revision.', en: 'Stops the write if HEAD or state_revision changed.' }, command: 'npx ahp checkpoint . --summary "Límite" --expected-head COMMIT --expected-state DIGEST' },
	{ category: 'concurrency', title: { es: 'Adquirir lock', en: 'Acquire lock' }, description: { es: 'Anuncia trabajo cooperativo sobre un alcance.', en: 'Announces cooperative work on a scope.' }, command: 'npx ahp lock acquire . --scope src/editor --owner codex --minutes 60' },
	{ category: 'concurrency', title: { es: 'Liberar lock', en: 'Release lock' }, description: { es: 'Archiva el lock; no elimina historial.', en: 'Archives the lock; it does not delete history.' }, command: 'npx ahp lock release LOCK-... . --owner codex' },
	{ category: 'migration', title: { es: 'Plan de migración', en: 'Migration plan' }, description: { es: 'Inspecciona /agent sin modificar archivos.', en: 'Inspects /agent without changing files.' }, command: 'npx ahp migrate . --plan' },
	{ category: 'migration', title: { es: 'Aplicar migración', en: 'Apply migration' }, description: { es: 'Crea el layout 1.1 y preserva /agent.', en: 'Creates the 1.1 layout and preserves /agent.' }, command: 'npx ahp migrate . --apply' },
	{ category: 'adapters', title: { es: 'Listar adaptadores', en: 'List adapters' }, description: { es: 'Muestra las plataformas soportadas.', en: 'Shows supported platforms.' }, command: 'npx ahp adapter list' },
	{ category: 'adapters', title: { es: 'Plan de todos', en: 'Plan all' }, description: { es: 'Previsualiza archivos y colisiones.', en: 'Previews files and collisions.' }, command: 'npx ahp adapter install all .' },
	{ category: 'adapters', title: { es: 'Aplicar todos', en: 'Apply all' }, description: { es: 'Instala generic, Claude, Cursor, OpenCode, Codex y ChatGPT.', en: 'Installs generic, Claude, Cursor, OpenCode, Codex, and ChatGPT.' }, command: 'npx ahp adapter install all . --apply' },
	{ category: 'adapters', title: { es: 'Adaptador individual', en: 'Individual adapter' }, description: { es: 'Sustituye PLATAFORMA por generic, claude, cursor, opencode, codex o chatgpt.', en: 'Replace PLATFORM with generic, claude, cursor, opencode, codex, or chatgpt.' }, command: 'npx ahp adapter install PLATFORM . --apply' },
	{ category: 'package', title: { es: 'Instalar estable', en: 'Install stable' }, description: { es: 'Instala el canal latest de npm.', en: 'Installs the npm latest channel.' }, command: 'npm install --save-dev @jossuealcala/ahp-plus@latest' },
	{ category: 'package', title: { es: 'Fijar versión', en: 'Pin version' }, description: { es: 'Instala exactamente 1.1.0.', en: 'Installs exactly 1.1.0.' }, command: 'npm install --save-dev @jossuealcala/ahp-plus@1.1.0' },
	{ category: 'package', title: { es: 'Canal dev', en: 'Dev channel' }, description: { es: 'Instala next para pruebas controladas.', en: 'Installs next for controlled testing.' }, command: 'npm install --save-dev @jossuealcala/ahp-plus@next' },
	{ category: 'package', title: { es: 'Retirar dependencia', en: 'Remove dependency' }, description: { es: 'Elimina el paquete, no el historial .ahp ni los adaptadores.', en: 'Removes the package, not .ahp history or adapters.' }, command: 'npm uninstall @jossuealcala/ahp-plus' },
];

export const ahpAtlasPlatforms: AhpAtlasPlatform[] = [
	{
		name: 'Cursor', logo: '/tools/cursor.svg', adapter: 'cursor',
		description: { es: 'Instala un comando /ahp local para usarlo directamente en el chat de Cursor.', en: 'Installs a local /ahp command for direct use in Cursor chat.' },
		prompts: [
			{ es: '/ahp doctor', en: '/ahp doctor' }, { es: '/ahp verify strict', en: '/ahp verify strict' }, { es: '/ahp context', en: '/ahp context' },
			{ es: '/ahp checkpoint resumen="Límite validado" siguiente="Crear handoff"', en: '/ahp checkpoint summary="Validated boundary" next="Create handoff"' },
			{ es: '/ahp handoff to codex', en: '/ahp handoff to codex' }, { es: '/ahp receive HOF-...', en: '/ahp receive HOF-...' },
		],
	},
	{
		name: 'OpenCode', logo: '/tools/opencode.svg', adapter: 'opencode',
		description: { es: 'Instala el mismo vocabulario /ahp en .opencode/commands.', en: 'Installs the same /ahp vocabulary in .opencode/commands.' },
		prompts: [
			{ es: '/ahp status', en: '/ahp status' }, { es: '/ahp verify strict', en: '/ahp verify strict' },
			{ es: '/ahp handoff to claude', en: '/ahp handoff to claude' }, { es: '/ahp receive HOF-...', en: '/ahp receive HOF-...' },
		],
	},
	{
		name: 'Codex', logo: '/tools/openai.svg', adapter: 'codex',
		description: { es: 'Instala la skill local $ahp y mantiene AGENTS.md como límite de instrucciones.', en: 'Installs the local $ahp skill and keeps AGENTS.md as the instruction boundary.' },
		prompts: [
			{ es: 'Usa $ahp para verificar este repositorio y mostrar el contexto canónico.', en: 'Use $ahp to verify this repository and show its canonical context.' },
			{ es: 'Usa $ahp para crear un checkpoint y preparar un handoff a Cursor.', en: 'Use $ahp to create a checkpoint and prepare a handoff to Cursor.' },
			{ es: 'Usa $ahp para recibir HOF-... y no edites si el resultado no es READY.', en: 'Use $ahp to receive HOF-... and do not edit unless the outcome is READY.' },
		],
	},
	{
		name: 'Claude Code', logo: '/tools/anthropic.svg', adapter: 'claude',
		description: { es: 'Conecta CLAUDE.md con AHP_INSTRUCTIONS.md. Usa prompts naturales; no instala un slash command propio.', en: 'Connects CLAUDE.md to AHP_INSTRUCTIONS.md. Use natural prompts; it does not install its own slash command.' },
		prompts: [
			{ es: 'Usa AHP+ para ejecutar doctor, verify --strict y context antes de continuar.', en: 'Use AHP+ to run doctor, verify --strict, and context before continuing.' },
			{ es: 'Prepara un checkpoint y un handoff de Claude a Codex, sin hacer commit ni push.', en: 'Prepare a checkpoint and a handoff from Claude to Codex, without committing or pushing.' },
			{ es: 'Recibe HOF-... con AHP+ y detente si requiere reconciliación.', en: 'Receive HOF-... with AHP+ and stop if reconciliation is required.' },
		],
	},
	{
		name: 'ChatGPT / Mobile', logo: '/tools/openai.svg', adapter: 'chatgpt',
		description: { es: 'Instala AHP_MOBILE.md. Con terminal puede ejecutar; con solo lectura debe declarar sus límites.', en: 'Installs AHP_MOBILE.md. With a shell it can execute; read-only hosts must disclose their limits.' },
		prompts: [
			{ es: 'Lee AHP_INSTRUCTIONS.md. Usa el AHP+ instalado para ejecutar el pulso de inicio y muestra project_id, commit, portabilidad, bloqueos y siguiente acción.', en: 'Read AHP_INSTRUCTIONS.md. Use the installed AHP+ to run the start heartbeat and show project_id, commit, portability, blockers, and next action.' },
			{ es: 'Sin terminal: lee AHP_MOBILE.md, .ahp/INDEX.md y el handoff más reciente. No afirmes que ejecutaste verify, tests, commits ni pushes.', en: 'Without a shell: read AHP_MOBILE.md, .ahp/INDEX.md, and the latest handoff. Do not claim you ran verification, tests, commits, or pushes.' },
		],
	},
	{
		name: 'Agente genérico', logo: '/cv/brands/ahp-plus.svg', adapter: 'generic',
		description: { es: 'Instala AHP_INSTRUCTIONS.md y un bloque administrado en AGENTS.md para cualquier agente compatible.', en: 'Installs AHP_INSTRUCTIONS.md and a managed AGENTS.md block for any compatible agent.' },
		prompts: [
			{ es: 'Sigue las instrucciones AHP+ de este repositorio. Verifica antes de escribir y usa el estado Git confirmado como fuente canónica.', en: 'Follow this repository’s AHP+ instructions. Verify before writing and use confirmed Git state as the canonical source.' },
			{ es: 'Ejecuta doctor, verify strict y context; reporta salida real y espera autorización antes de acciones externas.', en: 'Run doctor, strict verification, and context; report actual output and wait for authorization before external actions.' },
		],
	},
];

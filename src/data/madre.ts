import type { Locale } from './i18n';

export type MadreStep = {
	number: string;
	title: string;
	text: string;
};

export type MadreCopy = {
	eyebrow: string;
	title: string;
	lede: string;
	primaryCta: string;
	secondaryCta: string;
	problem: { index: string; title: string; text: string; points: string[] };
	definition: { index: string; title: string; text: string };
	flow: { index: string; title: string; text: string; steps: MadreStep[] };
	crew: { index: string; title: string; text: string; roles: Array<{ label: string; title: string; text: string }> };
	memory: { index: string; title: string; text: string; note: string };
	control: { index: string; title: string; text: string; boundaries: string[] };
	demo: { index: string; title: string; text: string; label: string; transcript: Array<{ speaker: string; text: string }> };
	closing: { title: string; text: string; primaryCta: string; secondaryCta: string };
};

const copy: Record<Locale, MadreCopy> = {
	es: {
		eyebrow: 'MADRE · SALA DE PROYECTO',
		title: 'Un lugar común para trabajar con varios agentes sin perder el hilo.',
		lede: 'MADRE reúne a una persona y a distintos agentes de IA en una sala compartida. Conserva la conversación, delimita permisos y hace visible quién propone, quién ejecuta y qué sigue pendiente.',
		primaryCta: 'Hablar sobre el sistema',
		secondaryCta: 'Ver la capa de continuidad AHP+',
		problem: {
			index: '01 / El problema',
			title: 'Más agentes no significan más coordinación.',
			text: 'Cuando el trabajo salta entre asistentes, el contexto se fragmenta. Las decisiones se repiten, las responsabilidades se vuelven ambiguas y una respuesta convincente puede confundirse con una acción ejecutada.',
			points: ['Conversaciones aisladas', 'Permisos implícitos', 'Decisiones difíciles de recuperar', 'Ejecución sin una frontera común'],
		},
		definition: {
			index: '02 / Qué es',
			title: 'Una sala compartida con memoria y reglas de operación.',
			text: 'MADRE organiza la colaboración entre la persona y el crew. No sustituye el criterio humano ni convierte el texto de un agente en evidencia: ofrece un espacio común para asignar trabajo, consultar lo ya conversado y mantener explícita la autoridad de cada turno.',
		},
		flow: {
			index: '03 / Funcionamiento',
			title: 'De la intención a una entrega revisable.',
			text: 'El recorrido separa coordinación, ejecución y verificación para que cada etapa tenga un responsable visible.',
			steps: [
				{ number: '01', title: 'La persona fija el objetivo', text: 'Define la petición y el nivel de permiso disponible para el turno.' },
				{ number: '02', title: 'MADRE aporta contexto', text: 'La sala distribuye el encargo junto con el historial relevante y las restricciones activas.' },
				{ number: '03', title: 'El crew se reparte el trabajo', text: 'Cada agente investiga, propone o construye dentro de su capacidad y permiso.' },
				{ number: '04', title: 'La entrega vuelve a la sala', text: 'Resultados, límites y archivos quedan a la vista para revisión humana.' },
			],
		},
		crew: {
			index: '04 / Coordinación',
			title: 'Especialización sin esconder la autoría.',
			text: 'MADRE permite dirigir tareas a distintos agentes y conservar su identidad en la conversación. La coordinación no borra quién dijo o hizo cada cosa.',
			roles: [
				{ label: 'HUMANO', title: 'Dirección y autoridad', text: 'Define prioridades y aprueba las acciones sensibles o externas.' },
				{ label: 'MADRE', title: 'Contexto y orquestación', text: 'Recupera memoria de la sala y encadena encargos entre participantes.' },
				{ label: 'AGENTE', title: 'Investigación o ejecución', text: 'Responde dentro de su capacidad y del permiso concedido en ese turno.' },
			],
		},
		memory: {
			index: '05 / Memoria y evidencia',
			title: 'Recordar no es lo mismo que demostrar.',
			text: 'La sala conserva un ledger consultable de lo dicho fuera de los espacios privados. Ese registro ayuda a recuperar decisiones y contexto; la evidencia de una edición, prueba o despliegue debe seguir viniendo de la herramienta o artefacto correspondiente.',
			note: 'Principio operativo: una afirmación del agente describe; una salida observada o un archivo verificable demuestra.',
		},
		control: {
			index: '06 / Límites',
			title: 'El permiso se declara en cada turno.',
			text: 'La sala distingue entre leer, crear y controlar cambios. Un agente no obtiene autoridad adicional por coordinar a otro y debe detenerse cuando la tarea supera el permiso disponible.',
			boundaries: ['Leer y proponer', 'Crear archivos nuevos', 'Modificar archivos existentes', 'Acciones externas o irreversibles'],
		},
		demo: {
			index: '07 / Demostración conceptual',
			title: 'Así se ve una coordinación breve.',
			text: 'Este intercambio ilustra el modelo de trabajo. No se presenta como una captura ni como evidencia de una ejecución concreta.',
			label: 'ESQUEMA EXPLICATIVO · NO ES EVIDENCIA DE EJECUCIÓN',
			transcript: [
				{ speaker: 'HUMANO', text: 'Define la página y conserva el control de publicación.' },
				{ speaker: 'MADRE', text: 'Recupero las decisiones previas y reparto investigación, contenido y QA.' },
				{ speaker: 'AGENTE', text: 'Entrego mi parte, indico los supuestos y separo lo comprobado de lo inferido.' },
				{ speaker: 'HUMANO', text: 'Reviso la entrega antes de autorizar el siguiente paso.' },
			],
		},
		closing: {
			title: 'Coordinar mejor antes de automatizar más.',
			text: 'Si tu trabajo ya cruza varios asistentes, MADRE propone una frontera compartida para contexto, permisos y responsabilidad.',
			primaryCta: 'Conversar sobre MADRE',
			secondaryCta: 'Explorar AHP+',
		},
	},
	en: {
		eyebrow: 'MADRE · PROJECT ROOM',
		title: 'One shared place to work with several agents without losing the thread.',
		lede: 'MADRE brings a person and different AI agents into a shared room. It preserves the conversation, scopes permissions, and makes it visible who proposes, who executes, and what remains open.',
		primaryCta: 'Discuss the system',
		secondaryCta: 'See the AHP+ continuity layer',
		problem: {
			index: '01 / The problem',
			title: 'More agents do not automatically mean more coordination.',
			text: 'When work moves across assistants, context fragments. Decisions get repeated, responsibilities become ambiguous, and a convincing answer can be mistaken for an executed action.',
			points: ['Isolated conversations', 'Implicit permissions', 'Decisions that are hard to retrieve', 'Execution without a shared boundary'],
		},
		definition: {
			index: '02 / What it is',
			title: 'A shared room with memory and operating rules.',
			text: 'MADRE organizes collaboration between the person and the crew. It does not replace human judgment or turn an agent’s words into evidence: it provides a common space to assign work, consult earlier discussion, and keep authority explicit on every turn.',
		},
		flow: {
			index: '03 / How it works',
			title: 'From intent to a reviewable delivery.',
			text: 'The flow separates coordination, execution, and verification so every stage has a visible owner.',
			steps: [
				{ number: '01', title: 'The person sets the objective', text: 'They define the request and the permission level available for the turn.' },
				{ number: '02', title: 'MADRE supplies context', text: 'The room distributes the assignment with relevant history and active constraints.' },
				{ number: '03', title: 'The crew divides the work', text: 'Each agent researches, proposes, or builds within its capability and permission.' },
				{ number: '04', title: 'The delivery returns to the room', text: 'Results, limits, and files remain visible for human review.' },
			],
		},
		crew: {
			index: '04 / Coordination',
			title: 'Specialization without hiding authorship.',
			text: 'MADRE can direct tasks to different agents while retaining their identity in the conversation. Coordination does not erase who said or did each thing.',
			roles: [
				{ label: 'HUMAN', title: 'Direction and authority', text: 'Sets priorities and approves sensitive or external actions.' },
				{ label: 'MADRE', title: 'Context and orchestration', text: 'Retrieves room memory and sequences assignments across participants.' },
				{ label: 'AGENT', title: 'Research or execution', text: 'Responds within its capability and the permission granted for that turn.' },
			],
		},
		memory: {
			index: '05 / Memory and evidence',
			title: 'Remembering is not the same as proving.',
			text: 'The room keeps a searchable ledger of what was said outside private spaces. That record helps retrieve decisions and context; evidence of an edit, test, or deployment must still come from the corresponding tool or artifact.',
			note: 'Operating principle: an agent statement describes; observed output or a verifiable artifact proves.',
		},
		control: {
			index: '06 / Boundaries',
			title: 'Permission is declared on every turn.',
			text: 'The room distinguishes between reading, creating, and controlling changes. An agent gains no extra authority by coordinating another agent and must stop when a task exceeds the available permission.',
			boundaries: ['Read and propose', 'Create new files', 'Modify existing files', 'External or irreversible actions'],
		},
		demo: {
			index: '07 / Conceptual demonstration',
			title: 'What a short coordination looks like.',
			text: 'This exchange illustrates the operating model. It is not presented as a capture or as evidence of a specific execution.',
			label: 'EXPLANATORY DIAGRAM · NOT EXECUTION EVIDENCE',
			transcript: [
				{ speaker: 'HUMAN', text: 'Define the page and keep publication under human control.' },
				{ speaker: 'MADRE', text: 'I retrieve earlier decisions and divide research, content, and QA.' },
				{ speaker: 'AGENT', text: 'I deliver my part, state assumptions, and separate verified facts from inference.' },
				{ speaker: 'HUMAN', text: 'I review the delivery before authorizing the next step.' },
			],
		},
		closing: {
			title: 'Coordinate better before automating more.',
			text: 'If your work already crosses several assistants, MADRE offers a shared boundary for context, permissions, and responsibility.',
			primaryCta: 'Talk about MADRE',
			secondaryCta: 'Explore AHP+',
		},
	},
};

export function madreCopy(locale: Locale): MadreCopy {
	return copy[locale];
}

// llms-full.txt: todo lo que el sitio publica sobre Jossué en texto plano (experiencia completa,
// productos, casos, habilidades y contacto), en español y en inglés. Es el mismo conocimiento
// que usa Jossue AI, así que el asistente y los buscadores con IA leen exactamente lo mismo.
import type { APIRoute } from 'astro';
import { GET as knowledgeJson } from './ai/knowledge.json';

export const GET: APIRoute = async (context) => {
	const knowledge = await (await knowledgeJson(context)).json();
	const body = [
		'# Jossue Alcalá — versión completa (llms-full.txt)',
		'',
		'Fuente: jossuealcala.com. Español primero, English below.',
		'',
		knowledge.es,
		'',
		'---',
		'',
		knowledge.en,
		'',
	].join('\n');
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

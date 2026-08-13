import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { casePresentation } from '../data/casePresentation';
import { contact } from '../data/contact';
import { publishedBlogPosts } from '../data/blog';

export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? new URL('https://portfolio.invalid');
	const projects = (await getCollection('cases', ({ data }) => data.lang === 'es' && data.publication.publish)).sort((a, b) =>
		a.data.title.localeCompare(b.data.title),
	);
	const projectLines = projects.map((entry) => {
		const summary = casePresentation(entry.data.slug, 'es')?.summary ?? entry.data.summary;
		const url = new URL(`/es/trabajo/${entry.data.slug}/`, origin).href;
		return `- [${entry.data.title}](${url}): ${summary}`;
	});
	const blogPosts = publishedBlogPosts(await getCollection('blog'), 'es');
	const blogOrigin = new URL('https://blog.jossuealcala.com');
	const blogLines = blogPosts.map((entry) => `- [${entry.data.title}](${new URL(`/${entry.data.lang}/${entry.data.slug}/`, blogOrigin).href}): ${entry.data.description}`);

	const content = [
		'# Jossue Alcala',
		'',
		'> Ecommerce Product Builder especializado en Shopify, UX/CRO, desarrollo web, analitica e inteligencia artificial aplicada.',
		'',
		'Este sitio es el portafolio profesional bilingue de Jossue Alcala. Presenta experiencia, servicios, autoria y casos de estudio con alcances y limitaciones explicitos.',
		'',
		'## Paginas principales',
		'',
		`- [Inicio en espanol](${new URL('/es/', origin).href})`,
		`- [Trabajo seleccionado](${new URL('/es/trabajo/', origin).href})`,
		`- [Servicios](${new URL('/es/servicios/', origin).href})`,
		`- [IA y sistemas](${new URL('/es/ia-y-sistemas/', origin).href})`,
		`- [AHP+ Command Atlas](${new URL('/es/recursos/ahp-plus/', origin).href}): Referencia oficial de instalacion, gestion, CLI, adaptadores y handoffs de AHP+ 1.1.0.`,
		`- [Perfil y experiencia](${new URL('/es/acerca/', origin).href})`,
		`- [Blog](${new URL('/es/', blogOrigin).href})`,
		`- [English version](${new URL('/en/', origin).href})`,
		'',
		'## Areas de especialidad',
		'',
		'- Direccion y operacion ecommerce.',
		'- Shopify storefronts, themes y aplicaciones.',
		'- UX, CRO, growth y analitica.',
		'- Desarrollo web y arquitectura de producto.',
		'- IA aplicada, automatizacion y sistemas operativos empresariales.',
		'',
		'## Proyectos publicados',
		'',
		...projectLines,
		'',
		'## Articulos del blog',
		'',
		...blogLines,
		'',
		'## Autoria y contacto',
		'',
		'Jossue Alcala es el autor del portafolio y de las contribuciones descritas en cada ficha. Las afirmaciones cuantitativas se publican solo cuando cuentan con contexto o evidencia identificable.',
		`Contacto: ${contact.email}`,
		`LinkedIn: ${contact.linkedin}`,
		'',
	].join('\n');

	return new Response(content, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};

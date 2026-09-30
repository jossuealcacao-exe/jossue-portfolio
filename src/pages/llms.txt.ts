// llms.txt: el resumen del sitio para modelos de lenguaje y buscadores con IA (GEO). Dice en
// pocas líneas quién es Jossué, qué construyó, con qué resultados y dónde está cada cosa.
// La versión completa, con toda la experiencia y los casos, vive en /llms-full.txt.
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { publishedBlogPosts } from '../data/blog';
import { casePresentation } from '../data/casePresentation';
import { contact } from '../data/contact';
import { routes } from '../data/i18n';
import { commercialProducts, productHref } from '../data/products';
import { profile, profileCopy } from '../data/profile';

export const GET: APIRoute = async ({ site }) => {
	const origin = site ?? new URL('https://portfolio.invalid');
	const url = (path: string) => new URL(path, origin).href;
	const about = profileCopy('es');
	const projects = (await getCollection('cases', ({ data }) => data.lang === 'es' && data.publication.publish)).sort((a, b) => a.data.title.localeCompare(b.data.title));
	const blogPosts = publishedBlogPosts(await getCollection('blog'), 'es');
	const blogOrigin = new URL('https://blog.jossuealcala.com');

	const content = [
		`# ${profile.name}`,
		'',
		`> ${profile.headline.es}. Ecommerce, Shopify, CRO, SEO, paid media, IA aplicada y AI Dev (desarrollo con agentes). Guadalajara, México.`,
		'',
		about.summary,
		'',
		'## Datos clave',
		'',
		`- Puesto actual: ${profile.headline.es}.`,
		'- Más de 8 años entre growth, paid media, SEO y CRO.',
		...about.kpis.map((kpi) => `- ${kpi.value}: ${kpi.label} (${kpi.source}).`),
		'- Productos propios en uso: MADRE, AHP+, Daniela, Bloqio Builder y Miawseo.',
		'- Idiomas: español nativo, inglés B1.',
		'',
		'## Productos propios',
		'',
		...commercialProducts
			.filter((product) => product.kind === 'owned-product')
			.map((product) => `- [${product.title.es}](${url(productHref(product, 'es'))}): ${product.promise.es}${product.status ? ` Estado: ${product.status.es}.` : ''}`),
		'',
		'## Servicios',
		'',
		...commercialProducts.filter((product) => product.kind === 'service-product').map((product) => `- [${product.title.es}](${url(productHref(product, 'es'))}): ${product.promise.es}`),
		`- [Todos los servicios](${url(routes.es.services)}): tiendas Shopify, diagnóstico de conversión, velocidad, medición, IA aplicada y apps a la medida.`,
		'',
		'## Casos publicados',
		'',
		...projects.map((entry) => `- [${entry.data.title}](${url(`/es/trabajo/${entry.data.slug}/`)}): ${casePresentation(entry.data.slug, 'es')?.summary ?? entry.data.summary}`),
		'',
		'## Páginas principales',
		'',
		`- [Inicio](${url(routes.es.home)})`,
		`- [Sobre mí y experiencia](${url(routes.es.about)})`,
		`- [IA aplicada y AI Dev](${url(routes.es.ai)})`,
		`- [MADRE](${url(routes.es.madre)}) y [madre.run](https://madre.run/)`,
		`- [AHP+ Command Atlas](${url(routes.es.ahpAtlas)})`,
		`- [Contacto](${url(routes.es.contact)})`,
		`- [English version](${url(routes.en.home)})`,
		`- [CV en PDF (español)](${url(contact.cvEs)})${contact.cvEn ? ` · [CV in English](${url(contact.cvEn)})` : ''}`,
		`- [Versión completa para modelos de lenguaje](${url('/llms-full.txt')})`,
		'',
		'## Blog',
		'',
		...blogPosts.map((entry) => `- [${entry.data.title}](${new URL(`/${entry.data.lang}/${entry.data.slug}/`, blogOrigin).href}): ${entry.data.description}`),
		'',
		'## Contacto',
		'',
		`- Correo: ${contact.email}`,
		`- WhatsApp: ${contact.phone}`,
		`- LinkedIn: ${contact.linkedin}`,
		`- GitHub: ${contact.github}`,
		'- En el sitio también está Jossue AI, un asistente con IA que responde sobre su trabajo y toma mensajes para él.',
		'',
		'Las cifras publicadas vienen de su CV y de los casos, con su fecha y su fuente; no se extrapolan a otras empresas.',
		'',
	].join('\n');

	return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

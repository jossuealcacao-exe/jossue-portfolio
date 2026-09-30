// Lo que sabe Jossue AI, generado en el build con los mismos datos que ya publica el sitio:
// perfil, productos y casos. El Worker lo lee de los assets, así el asistente nunca cuenta
// algo distinto a lo que dicen las páginas. Solo entra información pública.
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { casePresentation } from '../../data/casePresentation';
import { contact } from '../../data/contact';
import { routes, locales, type Locale } from '../../data/i18n';
import { commercialProducts, productHref } from '../../data/products';
import { profile, profileCopy } from '../../data/profile';

const SITE = 'https://jossuealcala.com';
const caseBase: Record<Locale, string> = { es: '/es/trabajo/', en: '/en/work/' };

async function knowledge(locale: Locale) {
	const es = locale === 'es';
	const about = profileCopy(locale);
	const cases = (await getCollection('cases', ({ data }) => data.lang === locale && data.publication.publish)).sort((a, b) =>
		a.data.title.localeCompare(b.data.title),
	);
	const lines: string[] = [];
	const h = (title: string) => lines.push('', `## ${title}`);

	lines.push(`# ${profile.name}`, about.headline, about.subheadline, '', about.summary);
	lines.push(es ? 'Vive y trabaja en Guadalajara, México. Trabaja a distancia con clientes de México y otros países.' : 'Lives and works in Guadalajara, Mexico. Works remotely with clients in Mexico and abroad.');

	h(es ? 'Resultados publicados (con su fuente)' : 'Published results (with source)');
	for (const kpi of about.kpis) lines.push(`- ${kpi.value} · ${kpi.label}: ${kpi.detail} (${kpi.source})`);

	h(es ? 'Experiencia' : 'Experience');
	for (const job of about.experience) {
		lines.push(`### ${job.role} — ${job.org} (${job.period})`);
		for (const item of job.highlights) lines.push(`- ${item}`);
	}

	h(es ? 'Productos y servicios' : 'Products and services');
	for (const product of commercialProducts) {
		lines.push(`### ${product.title[locale]} (${product.category[locale]}${product.status ? ` · ${product.status[locale]}` : ''})`);
		lines.push(product.promise[locale], product.summary[locale]);
		lines.push(`${es ? 'Para quién' : 'For whom'}: ${product.idealFor[locale]}`);
		lines.push(`${es ? 'Incluye' : 'Includes'}: ${product.included[locale].join('; ')}`);
		lines.push(`${es ? 'Página' : 'Page'}: ${SITE}${productHref(product, locale)}`);
	}

	h(es ? 'Casos publicados' : 'Published cases');
	for (const entry of cases) {
		const data = entry.data;
		const presentation = casePresentation(data.slug, locale);
		lines.push(`### ${data.title} — ${data.client}`);
		lines.push(presentation?.summary ?? data.summary);
		lines.push(`${es ? 'Problema' : 'Problem'}: ${data.problem}`);
		lines.push(`${es ? 'Qué hizo' : 'What he did'}: ${data.intervention.slice(0, 4).join('; ')}`);
		lines.push(`${es ? 'Resultados' : 'Results'}: ${data.results.slice(0, 3).join('; ')}`);
		lines.push(`${es ? 'Página' : 'Page'}: ${SITE}${caseBase[locale]}${data.slug}/`);
	}

	h(es ? 'Habilidades' : 'Skills');
	for (const item of about.skills) lines.push(`- ${item}`);
	for (const item of about.aiCapabilities) lines.push(`- ${item}`);

	h(es ? 'Formación e idiomas' : 'Education and languages');
	for (const item of [...about.education, ...about.languages]) lines.push(`- ${item}`);

	h(es ? 'Contacto y forma de trabajar' : 'Contact and way of working');
	lines.push(
		`- ${es ? 'Correo' : 'Email'}: ${contact.email}`,
		`- WhatsApp: ${contact.phone}`,
		`- LinkedIn: ${contact.linkedin}`,
		`- ${es ? 'Formulario' : 'Form'}: ${SITE}${routes[locale].contact}`,
		`- CV: ${SITE}${es ? contact.cvEs : contact.cvEn ?? contact.cvEs}`,
		es
			? '- No publica precios: cada proyecto cambia. Los da después de una llamada corta, sin compromiso.'
			: '- He does not publish prices: every project is different. He shares them after a short call, no commitment.',
		es ? '- Contesta en menos de un día hábil.' : '- He replies within one business day.',
		es
			? '- Recibe proyectos (tiendas Shopify, CRO, desarrollo web, IA aplicada) y cualquier otra propuesta profesional; para lo que no sea un proyecto, lo mejor es escribirle directo.'
			: '- He takes projects (Shopify stores, CRO, web development, applied AI) and any other professional proposal; for anything that is not a project, writing to him directly is best.',
	);
	return lines.join('\n');
}

export const GET: APIRoute = async () => {
	const body = Object.fromEntries(await Promise.all(locales.map(async (locale) => [locale, await knowledge(locale)])));
	return new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};

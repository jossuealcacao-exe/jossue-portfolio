// Apoyos de la ficha de caso: qué bucle abstracto lleva cada uno, con qué producto o servicio
// se relaciona y qué ícono acompaña a cada entregable. Solo presentación; los textos del caso
// siguen en casePresentation.ts y content.config.ts.
import type { IconName } from '../components/Icon.astro';
import type { Locale } from './i18n';

/** Bucle de /videos/hero/ que va detrás del título de cada caso. */
export const caseLoop: Record<string, string> = {
	'wu-nutrition': 'daniela',
	'bloqio-cro-apps': 'web',
	'bloqio-builder': 'bloqio',
	'la-carniceria-virtual': 'consultoria',
	'come-verde': 'web',
	miawseo: 'miawseo',
	vineria: 'work',
	'ahp-plus': 'ahp',
	tiendaonline: 'web',
};

/** Ficha de producto o servicio a la que lleva el botón secundario cuando el caso no tiene enlace propio. */
export const caseProduct: Record<string, { slug: string; kind: 'product' | 'service' }> = {
	'wu-nutrition': { slug: 'daniela', kind: 'product' },
	'bloqio-builder': { slug: 'bloqio-builder', kind: 'product' },
	miawseo: { slug: 'miawseo', kind: 'product' },
	'ahp-plus': { slug: 'ahp-plus', kind: 'product' },
	'la-carniceria-virtual': { slug: 'consultoria', kind: 'service' },
	'come-verde': { slug: 'desarrollo-web', kind: 'service' },
	tiendaonline: { slug: 'desarrollo-web', kind: 'service' },
};

export const positioningLabel: Record<'client-work' | 'owned-product' | 'concept', Record<Locale, string>> = {
	'client-work': { es: 'Trabajo para una marca', en: 'Work for a brand' },
	'owned-product': { es: 'Producto propio', en: 'Own product' },
	concept: { es: 'Proyecto de muestra', en: 'Sample project' },
};

const keywordIcons: Array<[RegExp, IconName]> = [
	[/identidad|identities|cifrad|encrypt|firmad|signed|seguridad|security/i, 'lock'],
	[/adaptador|adapters|integraci/i, 'nodes'],
	[/instalaci|install/i, 'download'],
	[/\bcli\b|especificaci|specification/i, 'terminal'],
	[/asistente|assistant|chat|\bbot\b/i, 'chat'],
	[/carrito|cart|checkout|flujo de compra|purchase flow|bot[oó]n de comprar|buy button/i, 'basket'],
	[/correo|email/i, 'envelope'],
	[/tablero|dashboard/i, 'trend-up'],
	[/plan a|plan\b|mapa de todo|map of everything|puntuada|scored|manual|gu[ií]as|guides|formulario|form\b/i, 'check-list'],
	[/cat[aá]logo|catalog|variedades|varieties|explorador|explorer|buscador|search|mapa de d[oó]nde|map of where/i, 'compass'],
	[/bloques|blocks|editor|theme|pantallas|screens|exhibiciones|exhibits/i, 'layers'],
	[/barra|top bar|panel de configuraci|settings panel|aplicaci[oó]n|application|app\b/i, 'cube'],
];
const fallbackIcons: IconName[] = ['cube', 'layers', 'display', 'code'];

/** Ícono de un entregable según de qué habla; si nada coincide, uno de la serie por posición. */
export function iconFor(text: string, index: number): IconName {
	for (const [pattern, icon] of keywordIcons) if (pattern.test(text)) return icon;
	return fallbackIcons[index % fallbackIcons.length];
}

/** Título del caso en dos partes cuando trae «Nombre — descriptor»; si no, una sola. */
export function splitCaseTitle(title: string): { parts: [string, string?]; joiner?: string } {
	const [first, ...rest] = title.split(' — ');
	return rest.length ? { parts: [first, rest.join(' — ')], joiner: ' — ' } : { parts: [title] };
}

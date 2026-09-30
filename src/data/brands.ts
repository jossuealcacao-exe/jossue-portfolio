export type BrandId =
	| 'ahp-plus'
	| 'bloqio'
	| 'wu-nutrition'
	| 'come-verde'
	| 'la-carniceria-virtual'
	| 'hp'
	| 'farmalisto';

export interface BrandMark {
	id: BrandId;
	name: { es: string; en: string };
	src: string;
	/** Intrinsic aspect hint for layout; decorative marks stay aria-hidden when paired with text. */
	width: number;
	height: number;
	tone: 'ink' | 'color';
	/** Versión de una sola tinta para fondo oscuro, cuando el logo original trae placa. */
	mono?: string;
	/** Alto visual en la tira de logos (rem), para que todos pesen parecido. */
	stripHeight: number;
	caseSlugs?: string[];
	showInStrip: boolean;
}

/**
 * Curated client / employer marks for portfolio use.
 * Sources: public storefronts, owned Bloqio assets, and the prior CV brands pack.
 */
export const brands: BrandMark[] = [
	{
		id: 'ahp-plus',
		name: { es: 'AHP+', en: 'AHP+' },
		src: '/cv/brands/ahp-plus.svg',
		width: 90,
		height: 90,
		tone: 'ink',
		stripHeight: 2.3,
		caseSlugs: ['ahp-plus'],
		showInStrip: true,
	},
	{
		id: 'bloqio',
		name: { es: 'Bloqio', en: 'Bloqio' },
		src: '/cv/brands/bloqio.svg',
		width: 150,
		height: 75,
		tone: 'ink',
		stripHeight: 1.7,
		caseSlugs: ['bloqio-builder', 'bloqio-cro-apps'],
		showInStrip: true,
	},
	{
		id: 'wu-nutrition',
		name: { es: 'WU Nutrition', en: 'WU Nutrition' },
		src: '/cv/brands/wu-nutrition.png',
		width: 149,
		height: 92,
		tone: 'color',
		stripHeight: 2.1,
		caseSlugs: ['wu-nutrition'],
		showInStrip: true,
	},
	{
		id: 'come-verde',
		name: { es: 'Come Verde', en: 'Come Verde' },
		src: '/cv/brands/come-verde.png',
		width: 140,
		height: 80,
		tone: 'color',
		stripHeight: 2.1,
		caseSlugs: ['come-verde'],
		showInStrip: true,
	},
	{
		id: 'la-carniceria-virtual',
		name: { es: 'La Carnicería Virtual', en: 'La Carnicería Virtual' },
		src: '/cv/brands/la-carniceria-virtual.png',
		width: 160,
		height: 120,
		tone: 'color',
		stripHeight: 2.5,
		mono: '/cv/brands/la-carniceria-virtual-mono.png',
		caseSlugs: ['la-carniceria-virtual'],
		showInStrip: true,
	},
	{
		id: 'hp',
		name: { es: 'HP Inc.', en: 'HP Inc.' },
		src: '/cv/brands/hp.svg',
		width: 72,
		height: 72,
		tone: 'color',
		stripHeight: 2.3,
		showInStrip: true,
	},
	{
		id: 'farmalisto',
		name: { es: 'Farmalisto', en: 'Farmalisto' },
		src: '/cv/brands/farmalisto.png',
		width: 148,
		height: 31,
		tone: 'color',
		stripHeight: 1.35,
		showInStrip: true,
	},
];

export function brandForCaseSlug(slug: string): BrandMark | undefined {
	return brands.find((brand) => brand.caseSlugs?.includes(slug));
}

export function brandStrip(): BrandMark[] {
	return brands.filter((brand) => brand.showInStrip);
}

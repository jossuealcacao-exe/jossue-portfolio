import type { Locale } from './i18n';

export interface HomeOutcome {
	label: { es: string; en: string };
	value: { es: string; en: string };
	/** Rendered smaller, on the same line as the value (e.g. CR, ROAS, MXN). */
	suffix?: { es: string; en: string };
	detail: { es: string; en: string };
	source: string;
	caseSlug?: string;
}

const outcomes: HomeOutcome[] = [
	{
		label: { es: 'Conversión (CRO)', en: 'Conversion (CRO)' },
		value: { es: 'Δ3×', en: 'Δ3×' },
		suffix: { es: 'CR', en: 'CR' },
		detail: {
			es: 'Aumento en la tasa de conversión (cuántas visitas terminan en compra) al ordenar la experiencia de compra.',
			en: 'Lift in conversion rate (how many visits end in a purchase) from reworking the shopping experience.',
		},
		source: 'CV 2026-04-13',
	},
	{
		label: { es: 'HP Inc.', en: 'HP Inc.' },
		value: { es: '≈11×', en: '≈11×' },
		suffix: { es: 'ROAS', en: 'ROAS' },
		detail: {
			es: 'Retorno sobre lo invertido en anuncios (ROAS), con una estrategia comercial para todos los canales de venta.',
			en: 'Return on ad spend (ROAS), from a sales strategy across every channel.',
		},
		source: 'CV 2026-04-13',
	},
	{
		label: { es: 'Publicidad digital', en: 'Digital ads' },
		value: { es: '>$1M', en: '>$1M' },
		suffix: { es: 'MXN', en: 'MXN' },
		detail: {
			es: 'Presupuesto mensual de anuncios que he administrado.',
			en: 'Monthly ad budget I have managed.',
		},
		source: 'CV 2026-04-13',
	},
	{
		label: { es: 'Experiencia profesional', en: 'Professional experience' },
		value: { es: '+8 años', en: '+8 years' },
		detail: {
			es: 'Desarrollo web y Shopify, diseño de la experiencia de compra y publicidad digital, en una misma persona.',
			en: 'Web and Shopify development, shopping-experience design and digital ads, all in one person.',
		},
		source: 'CV 2026-04-13',
	},
];

export function homeOutcomes(locale: Locale) {
	return outcomes.map((item) => ({
		label: item.label[locale],
		value: item.value[locale],
		suffix: item.suffix?.[locale],
		detail: item.detail[locale],
		source: item.source,
		caseSlug: item.caseSlug,
	}));
}

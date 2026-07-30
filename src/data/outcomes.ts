import type { Locale } from './i18n';

export interface HomeOutcome {
	label: { es: string; en: string };
	value: { es: string; en: string };
	detail: { es: string; en: string };
	source: string;
	caseSlug?: string;
}

const outcomes: HomeOutcome[] = [
	{
		label: { es: 'Farmalisto · conversión paid', en: 'Farmalisto · paid conversion' },
		value: { es: '+22%', en: '+22%' },
		detail: {
			es: 'Awareness y posicionamiento en plataformas CPC.',
			en: 'Awareness and positioning across CPC platforms.',
		},
		source: 'CV 2026-04-13',
	},
	{
		label: { es: 'HP Inc. · ventas / trimestre', en: 'HP Inc. · sales / quarter' },
		value: { es: '+21% MX', en: '+21% MX' },
		detail: {
			es: 'Estrategias comerciales y de demanda para retailers clave.',
			en: 'Commercial and demand strategies for key retailers.',
		},
		source: 'CV 2026-04-13',
	},
	{
		label: { es: 'Experiencia profesional', en: 'Professional experience' },
		value: { es: '+8 años', en: '+8 years' },
		detail: {
			es: 'Growth, paid media, SEO, Shopify y optimización digital.',
			en: 'Growth, paid media, SEO, Shopify, and digital optimization.',
		},
		source: 'CV 2026-04-13',
	},
];

export function homeOutcomes(locale: Locale) {
	return outcomes.map((item) => ({
		label: item.label[locale],
		value: item.value[locale],
		detail: item.detail[locale],
		source: item.source,
		caseSlug: item.caseSlug,
	}));
}

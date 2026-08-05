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
		label: { es: 'CRO · UX', en: 'CRO · UX' },
		value: { es: 'Δ3×', en: 'Δ3×' },
		suffix: { es: 'CR', en: 'CR' },
		detail: {
			es: 'Incremento en ROAS con una estrategia UX consolidada y enfocada en CRO.',
			en: 'ROAS lift from a consolidated, CRO-focused UX strategy.',
		},
		source: 'CV 2026-04-13',
	},
	{
		label: { es: 'HP Inc.', en: 'HP Inc.' },
		value: { es: '≈11×', en: '≈11×' },
		suffix: { es: 'ROAS', en: 'ROAS' },
		detail: {
			es: 'Estrategia comercial integral y omnicanal.',
			en: 'Integrated, omnichannel commercial strategy.',
		},
		source: 'CV 2026-04-13',
	},
	{
		label: { es: 'Paid media', en: 'Paid media' },
		value: { es: '>$1M', en: '>$1M' },
		suffix: { es: 'MXN', en: 'MXN' },
		detail: {
			es: 'Presupuesto mensual administrado.',
			en: 'Monthly budget managed.',
		},
		source: 'CV 2026-04-13',
	},
	{
		label: { es: 'Experiencia profesional', en: 'Professional experience' },
		value: { es: '+8 años', en: '+8 years' },
		detail: {
			es: 'Un solo stack: desarrollo web y Shopify, UX/CX para CRO y paid media.',
			en: 'One stack: web and Shopify development, UX/CX for CRO, and paid media.',
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

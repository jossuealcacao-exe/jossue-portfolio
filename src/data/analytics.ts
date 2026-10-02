// Identificadores públicos de medición. Viven en build:production (no son secretos) y cada uno se
// valida aquí: un valor con otro formato se ignora en lugar de inyectarse en la página.
const pick = (value: string | undefined, pattern: RegExp) => {
	const clean = value?.trim();
	return clean && pattern.test(clean) ? clean : null;
};

export const analyticsConfig = {
	gtmId: pick(import.meta.env.PUBLIC_GTM_ID, /^GTM-[A-Z0-9]+$/),
	ga4Id: pick(import.meta.env.PUBLIC_GA4_ID, /^G-[A-Z0-9]+$/),
	/** Pixel de Meta (Facebook e Instagram): solo dígitos. */
	metaPixelId: pick(import.meta.env.PUBLIC_META_PIXEL_ID, /^\d{8,20}$/),
	/** Etiqueta de Google Ads: AW-1234567890. */
	googleAdsId: pick(import.meta.env.PUBLIC_GOOGLE_ADS_ID, /^AW-\d+$/),
	/** Etiqueta de la conversión «lead» en Google Ads (lo que va después de la diagonal en send_to). */
	googleAdsLeadLabel: pick(import.meta.env.PUBLIC_GOOGLE_ADS_LEAD_LABEL, /^[\w-]{4,40}$/),
} as const;

export type AnalyticsEvent = {
	event: string;
	label?: string;
	path?: string;
};

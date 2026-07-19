export const analyticsConfig = {
	gtmId: import.meta.env.PUBLIC_GTM_ID?.trim() || null,
	ga4Id: import.meta.env.PUBLIC_GA4_ID?.trim() || null,
} as const;

export type AnalyticsEvent = {
	event: string;
	label?: string;
	path?: string;
};

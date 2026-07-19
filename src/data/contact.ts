export const contact = {
	email: null,
	phone: null,
	whatsapp: null,
	location: null,
	linkedin: null,
	github: null,
	cvEs: null,
	cvEn: null,
	availability: 'pending',
} as const;

export const contactEndpoint = import.meta.env.PUBLIC_CONTACT_ENDPOINT?.trim() || null;

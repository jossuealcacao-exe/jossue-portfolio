export const contact = {
	email: 'hola@jossuealcala.com',
	phone: '+52 33 1632 6710',
	whatsapp: 'https://wa.me/523316326710',
	location: null,
	linkedin: 'https://www.linkedin.com/in/jossue-alcala',
	github: 'https://github.com/jossuealcacao-exe',
	cvEs: '/cv/Jossue-Alcala-CV.pdf',
	cvEn: null,
	availability: 'pending',
} as const;

export const contactEndpoint = import.meta.env.PUBLIC_CONTACT_ENDPOINT?.trim() || null;

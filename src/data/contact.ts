export const contact = {
	email: 'jossue.alcala.o@gmail.com',
	phone: '+52 33 2991 5487',
	whatsapp: 'https://wa.me/523329915487',
	location: null,
	linkedin: 'https://www.linkedin.com/in/jossue-alcala',
	github: 'https://github.com/jossuealcacao-exe',
	cvEs: '/cv/Jossue-Alcala-CV.pdf',
	cvEn: null,
	availability: 'pending',
} as const;

export const contactEndpoint = import.meta.env.PUBLIC_CONTACT_ENDPOINT?.trim() || null;

import type { AnalyticsEvent } from '../data/analytics';

declare global {
	type FbqStub = ((...args: unknown[]) => void) & {
		callMethod?: (...args: unknown[]) => void;
		queue: unknown[];
		push: unknown;
		loaded: boolean;
		version: string;
	};
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
		fbq?: (...args: unknown[]) => void;
		_fbq?: unknown;
		__jxGoogle?: Set<string>;
	}
}

export function track(event: AnalyticsEvent): void {
	if (typeof window === 'undefined' || !window.gtag) return;
	window.gtag('event', event.event, {
		...(event.label ? { event_label: event.label } : {}),
		...(event.path ? { page_path: event.path } : {}),
	});
}

export function bindAnalyticsEvents(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-analytics-event]').forEach((element) => {
		element.addEventListener('click', () => {
			const eventName = element.dataset.analyticsEvent;
			if (eventName) track({ event: eventName, path: window.location.pathname });
		});
	});
}

/**
 * Un contacto real: pidió una auditoría, agendó una llamada o envió el formulario. Va a GA4 como generate_lead, a Google
 * Ads como la conversión configurada y a Meta como Lead. Solo sale si la persona aceptó esas cookies
 * (sin permiso no hay gtag ni fbq cargados, o el modo de consentimiento lo descarta) y nunca lleva
 * nombre, correo ni lo que escribió: solo de dónde vino el contacto.
 */
export function trackLead(source: 'audit' | 'contact_form' | 'booking'): void {
	if (typeof window === 'undefined') return;
	track({ event: 'generate_lead', label: source, path: window.location.pathname });
	const adsLead = document.querySelector<HTMLElement>('[data-analytics-consent]')?.dataset.adsLead;
	if (window.gtag && adsLead) window.gtag('event', 'conversion', { send_to: adsLead });
	window.fbq?.('track', 'Lead', { content_name: source });
}

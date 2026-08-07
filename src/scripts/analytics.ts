import type { AnalyticsEvent } from '../data/analytics';

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

export function track(event: AnalyticsEvent): void {
	if (typeof window === 'undefined') return;
	window.dataLayer ??= [];
	window.dataLayer.push(event);
}

export function bindAnalyticsEvents(root: ParentNode = document): void {
	root.querySelectorAll<HTMLElement>('[data-analytics-event]').forEach((element) => {
		element.addEventListener('click', () => {
			const eventName = element.dataset.analyticsEvent;
			if (eventName) track({ event: eventName, path: window.location.pathname });
		});
	});
}

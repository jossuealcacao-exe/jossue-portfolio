const MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const COUNT_DELAY_MS = 220;
const COUNT_DURATION_MS = 980;

type ParsedKpi =
	| { kind: 'count'; target: number; prefix: string; suffix: string; decimals: number }
	| { kind: 'trend-up' }
	| { kind: 'static' };

function parseKpiValue(raw: string): ParsedKpi {
	const text = raw.trim();
	if (!text) return { kind: 'static' };

	if (text.includes('↑')) return { kind: 'trend-up' };

	const match = text.match(/^([+-]?)(\d+(?:\.\d+)?)(.*)$/u);
	if (!match) return { kind: 'static' };

	const prefix = match[1] ?? '';
	const numeric = match[2] ?? '';
	const suffix = match[3] ?? '';
	const target = Number.parseFloat(numeric);
	if (!Number.isFinite(target)) return { kind: 'static' };

	const decimals = numeric.includes('.') ? numeric.split('.')[1]?.length ?? 0 : 0;
	return { kind: 'count', target, prefix, suffix, decimals };
}

function formatCount(value: number, prefix: string, suffix: string, decimals: number): string {
	const formatted = decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
	return `${prefix}${formatted}${suffix}`;
}

function animateCount(
	element: HTMLElement,
	target: number,
	prefix: string,
	suffix: string,
	decimals: number,
): void {
	const start = performance.now();

	const tick = (now: number) => {
		const progress = Math.min(1, (now - start) / COUNT_DURATION_MS);
		const eased = 1 - (1 - progress) ** 3;
		element.textContent = formatCount(target * eased, prefix, suffix, decimals);

		if (progress < 1) requestAnimationFrame(tick);
		else element.textContent = formatCount(target, prefix, suffix, decimals);
	};

	element.textContent = formatCount(0, prefix, suffix, decimals);
	requestAnimationFrame(tick);
}

function activateItem(item: HTMLElement): void {
	if (item.dataset.kpiVisible === 'true') return;
	item.dataset.kpiVisible = 'true';

	const value = item.querySelector<HTMLElement>('.outcomes-grid__value, .kpi-grid__value');
	if (!value) {
		item.classList.add('is-kpi-visible');
		return;
	}

	// Values with child markup (e.g. a <small> suffix) must not be rewritten via textContent.
	if (value.childElementCount > 0) {
		item.classList.add('is-kpi-visible');
		window.setTimeout(() => value.classList.add('is-kpi-value-live'), COUNT_DELAY_MS);
		return;
	}

	const raw = value.dataset.kpiValue ?? value.textContent ?? '';
	value.dataset.kpiValue = raw.trim();
	const parsed = parseKpiValue(raw);

	item.classList.add('is-kpi-visible');

	if (parsed.kind === 'count') {
		window.setTimeout(() => {
			value.classList.add('is-kpi-value-live');
			animateCount(value, parsed.target, parsed.prefix, parsed.suffix, parsed.decimals);
		}, COUNT_DELAY_MS);
		return;
	}

	if (parsed.kind === 'trend-up') {
		window.setTimeout(() => {
			value.classList.add('is-kpi-value-live');
		}, COUNT_DELAY_MS);
		return;
	}

	window.setTimeout(() => {
		value.classList.add('is-kpi-value-live');
		value.textContent = raw.trim();
	}, COUNT_DELAY_MS);
}

function revealAllItems(items: HTMLElement[]): void {
	for (const item of items) activateItem(item);
}

export function initKpiMotion(): void {
	const items = [
		...document.querySelectorAll<HTMLElement>('.outcomes-grid [data-kpi-item], .kpi-grid [data-kpi-item]'),
	];
	if (!items.length) return;

	if (window.matchMedia(MOTION_QUERY).matches) {
		revealAllItems(items);
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			const visible = entries
				.filter((entry) => entry.isIntersecting)
				.map((entry) => entry.target as HTMLElement)
				.sort((a, b) => items.indexOf(a) - items.indexOf(b));

			for (const item of visible) {
				activateItem(item);
				observer.unobserve(item);
			}
		},
		{
			threshold: 0.42,
			rootMargin: '0px 0px -10% 0px',
		},
	);

	for (const item of items) observer.observe(item);
}

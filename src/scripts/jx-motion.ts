// Movimiento del sistema jx: los bloques entran al llegar a ellos, en cascada dentro de su
// grupo, y los titulares del héroe suben línea por línea al cargar. Sin JavaScript o con
// «reducir movimiento» todo se ve quieto desde el principio.
const MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const GROUPS = [
	'.jx-facts > div',
	'.jx-featured__grid > *',
	'.jx-built__grid > *',
	'.jx-catalog__grid > *',
	'.jx-kpis > li',
	'.jx-points > li',
	'.jx-rows > li',
	'.jx-steps > li',
	'.jx-timeline > li',
	'.jx-ai-invite__questions > li',
	'.jx-spot__list > li',
	'.jx-consult__formats > li',
	'.jx-bots__prices tbody tr',
	'.jx-bots__table:not(.jx-bots__prices) tbody tr',
	'.jx-bots__stack > li',
	'.jx-bots__example li',
	'.jx-bots__abuse dl > div',
	'.jx-iap__tasks > li',
	'.jx-iap__fit > div',
	'.jx-svc__areas > div',
	'.jx-svc__case li',
	'.jx-proofs > li',
	'.pdp-spec > div',
	'.pdp-how__steps > li',
	'.case-duo > article',
	'.case-flow > li',
	'.case-deliver > li',
	'.cdg__card',
	'.cdg-compare > li',
	'.evidence-shot',
	'.case-outcomes > li',
	'.case-principles li',
	'.case-links > li',
	'.case-toc li',
	'[data-home-case]',
	'.jx-clip',
];
const SINGLES = [
	'.jx-home > section .jx-label',
	'.jx-home > section .jx-h2',
	'.jx-star',
	'.jx-catalog__star',
	'.jx-ai-invite__card',
	'.jx-close__card',
	'.jx-caps__lists',
	'.jx-logos',
	'.pdp__demo',
	'.jm section > .jx-wrap > *',
	'.jx-calc',
	'.pdp-how__stage',
	'.case-callout',
];

export function initJxMotion(): void {
	const root = document.documentElement;
	if (window.matchMedia(MOTION_QUERY).matches || !('IntersectionObserver' in window)) return;
	root.classList.add('jx-motion');

	const targets = new Set<HTMLElement>();
	for (const selector of GROUPS) {
		const parents = new Map<Element, HTMLElement[]>();
		document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
			const list = parents.get(element.parentElement!) ?? [];
			list.push(element);
			parents.set(element.parentElement!, list);
		});
		parents.forEach((list) =>
			list.forEach((element, index) => {
				element.style.setProperty('--jx-delay', `${Math.min(index, 6) * 70}ms`);
				targets.add(element);
			}),
		);
	}
	for (const selector of SINGLES) document.querySelectorAll<HTMLElement>(selector).forEach((element) => targets.add(element));

	const inView = (element: HTMLElement) => {
		const rect = element.getBoundingClientRect();
		// Todo lo que asoma en pantalla al cargar se queda visible, aunque sea el borde inferior.
		return rect.top < window.innerHeight && rect.bottom > 0;
	};
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('jx-in');
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
	);
	targets.forEach((element) => {
		// Lo que ya se ve al cargar no se esconde: así no hay parpadeo arriba de la página.
		if (inView(element)) return;
		element.dataset.jxReveal = '';
		observer.observe(element);
	});

	// Titulares del héroe: cada línea sube desde abajo de su máscara.
	document.querySelectorAll<HTMLElement>('.jx-hero__title, .jm-hero__title, .jx-about__name, .editorial-hero h1').forEach((title) => {
		title.classList.add('jx-rise');
	});

	// Cifras: el número principal cuenta desde cero la primera vez que se ve.
	// - Las que ya se ven al cargar arrancan en 0 (el CSS las tiene ocultas hasta aquí) y cuentan.
	// - Las de más abajo conservan su valor real en la página (lectores de pantalla, copiar texto)
	//   y empiezan a contar un poco ANTES de entrar en pantalla, para que el salto a 0 no se vea.
	const counters = [...document.querySelectorAll<HTMLElement>('.jx-facts dt, .jx-kpis__value, .jx-bots__prices td strong, .cdg [data-count]')];
	const countObserver = new IntersectionObserver(
		(entries) =>
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				countObserver.unobserve(entry.target);
				countUp(entry.target as HTMLElement);
			}),
		{ rootMargin: '0px 0px 20% 0px', threshold: 0 },
	);
	counters.forEach((element) => {
		// Las cifras que no son un número a contar (una versión, por ejemplo) se muestran tal cual.
		if (element.hasAttribute('data-nocount')) {
			element.classList.add('jx-count-ready');
			return;
		}
		if (inView(element)) countUp(element);
		else countObserver.observe(element);
		element.classList.add('jx-count-ready');
	});
}

function countUp(element: HTMLElement): void {
	const original = element.textContent ?? '';
	const match = original.match(/\d+(?:[.,]\d+)?/);
	if (!match) return;
	const target = Number(match[0].replace(',', '.'));
	const decimals = (match[0].split(/[.,]/)[1] ?? '').length;
	element.textContent = original.replace(match[0], (0).toFixed(decimals));
	const start = performance.now();
	const duration = 900;
	const step = (now: number) => {
		// El primer cuadro puede traer una marca de tiempo anterior a `start`: sin el tope en 0
		// salía «-0».
		const progress = Math.min(1, Math.max(0, (now - start) / duration));
		const eased = 1 - Math.pow(1 - progress, 3);
		element.textContent = original.replace(match[0], (target * eased).toFixed(decimals));
		if (progress < 1) requestAnimationFrame(step);
		else element.textContent = original;
	};
	requestAnimationFrame(step);
}

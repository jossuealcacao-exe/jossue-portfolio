const MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const MOBILE_QUERY = '(max-width: 47.99rem)';

/**
 * Mobile-only premium fade for horizontal project carousels.
 * Each `.case-card` fades in as it enters the grid viewport and fades back
 * out as it leaves, driven by an IntersectionObserver rooted on the grid.
 * On desktop or with reduced motion the cards stay fully visible.
 */
export function initProjectSlides(): void {
	const grids = [...document.querySelectorAll<HTMLElement>('.project-grid')];
	if (!grids.length) return;

	const mobile = window.matchMedia(MOBILE_QUERY);
	const reduced = window.matchMedia(MOTION_QUERY);
	const observers = new Map<HTMLElement, IntersectionObserver>();

	const teardown = (grid: HTMLElement) => {
		observers.get(grid)?.disconnect();
		observers.delete(grid);
		grid.classList.remove('project-grid--slides');
		grid.querySelectorAll<HTMLElement>('.case-card').forEach((card) => card.classList.remove('is-slide-in', 'is-slide-out'));
	};

	const activate = (grid: HTMLElement) => {
		const cards = [...grid.querySelectorAll<HTMLElement>('.case-card')];
		if (!cards.length) return;
		grid.classList.add('project-grid--slides');
		cards.forEach((card) => card.classList.add('is-slide-out'));
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const inView = entry.isIntersecting && entry.intersectionRatio >= 0.6;
					entry.target.classList.toggle('is-slide-in', inView);
					entry.target.classList.toggle('is-slide-out', !inView);
				});
			},
			{ root: grid, threshold: [0, 0.6, 1] },
		);
		cards.forEach((card) => observer.observe(card));
		observers.set(grid, observer);
	};

	const sync = () => {
		const enabled = mobile.matches && !reduced.matches && 'IntersectionObserver' in window;
		grids.forEach((grid) => {
			teardown(grid);
			if (enabled) activate(grid);
		});
	};

	sync();
	mobile.addEventListener('change', sync);
	reduced.addEventListener('change', sync);
}

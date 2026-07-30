const MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function headerHeight(): number {
	const header = document.querySelector<HTMLElement>('.site-header');
	return header?.offsetHeight ?? 72;
}

function syncHeaderOffset(): void {
	document.documentElement.style.setProperty('--header-h', `${headerHeight()}px`);
}

function bindStickyHeader(): void {
	const header = document.querySelector<HTMLElement>('.site-header');
	if (!header) return;

	let ticking = false;
	const update = () => {
		header.classList.toggle('is-scrolled', window.scrollY > 10);
		ticking = false;
	};

	update();
	window.addEventListener(
		'scroll',
		() => {
			if (ticking) return;
			ticking = true;
			window.requestAnimationFrame(update);
		},
		{ passive: true },
	);
}

function reveal(element: Element): void {
	element.classList.add('is-revealed');
}

function bindReveals(): void {
	const root = document.querySelector('main');
	if (!root) return;
	const targets = [...root.querySelectorAll<HTMLElement>('.section, .case-card, [data-reveal]')];
	if (!('IntersectionObserver' in window)) {
		targets.forEach(reveal);
		return;
	}

	targets.forEach((element) => element.classList.add('reveal'));
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				reveal(entry.target);
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
	);
	targets.forEach((element) => observer.observe(element));
}

function bindCaseNavigation(): void {
	const nav = document.querySelector<HTMLElement>('.case-jump');
	if (!nav || !('IntersectionObserver' in window)) return;
	const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
	const sections = links.flatMap((link) => {
		const section = document.querySelector<HTMLElement>(link.hash);
		return section ? [{ link, section }] : [];
	});
	const setCurrent = (activeLink: HTMLAnchorElement) => {
		links.forEach((link) => {
			if (link === activeLink) link.setAttribute('aria-current', 'location');
			else link.removeAttribute('aria-current');
		});
		nav.scrollTo({
			left: activeLink.offsetLeft - nav.clientWidth * 0.5 + activeLink.offsetWidth * 0.5,
			behavior: window.matchMedia(MOTION_QUERY).matches ? 'auto' : 'smooth',
		});
	};

	const observer = new IntersectionObserver(
		(entries) => {
			const visible = entries
				.filter((entry) => entry.isIntersecting)
				.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (!visible) return;
			const match = sections.find(({ section }) => section === visible.target);
			if (match) setCurrent(match.link);
		},
		{ rootMargin: `-${headerHeight() + 48}px 0px -62% 0px`, threshold: [0.05, 0.25, 0.5] },
	);
	sections.forEach(({ section }) => observer.observe(section));
}

function bindMobileMenu(): void {
	const menu = document.querySelector<HTMLDetailsElement>('.menu');
	if (!menu) return;
	menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menu.removeAttribute('open')));
	document.addEventListener('keydown', (event) => {
		if (event.key !== 'Escape' || !menu.open) return;
		menu.open = false;
		menu.querySelector<HTMLElement>('summary')?.focus();
	});
}

export function initMotion(): void {
	syncHeaderOffset();
	bindStickyHeader();
	window.addEventListener('resize', syncHeaderOffset, { passive: true });

	if (window.matchMedia(MOTION_QUERY).matches) {
		document.documentElement.classList.add('motion-reduced');
		document.querySelectorAll('.section, .case-card, [data-reveal]').forEach(reveal);
		bindCaseNavigation();
		bindMobileMenu();
		return;
	}

	document.documentElement.classList.add('motion');
	bindReveals();
	bindCaseNavigation();
	bindMobileMenu();
}

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

	const menu = header.querySelector<HTMLDetailsElement>('details.menu');
	let lastY = window.scrollY;
	let ticking = false;
	const update = () => {
		const y = window.scrollY;
		header.classList.toggle('is-scrolled', y > 10);
		// Scroll down → condense the top bar into the hamburger; scroll up → expand.
		if (!menu?.open) {
			if (y > lastY + 4 && y > 200) document.documentElement.classList.add('header-condensed');
			else if (y < lastY - 4 || y <= 200) document.documentElement.classList.remove('header-condensed');
		}
		lastY = y;
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
	// Cards inside a horizontal `.project-grid` are animated by initProjectSlides
	// (mobile) / hover (desktop); excluding them here avoids the vertical reveal
	// translate that created an inner scroll in the carousel.
	const targets = [...root.querySelectorAll<HTMLElement>('.section, .case-card, [data-reveal]')].filter(
		(element) => !(element.classList.contains('case-card') && element.closest('.project-grid')),
	);
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

function bindSectionSpy(): void {
	const bar = document.querySelector<HTMLElement>('[data-section-spy]');
	const label = bar?.querySelector<HTMLElement>('[data-section-spy-label]');
	const kickers = [...document.querySelectorAll<HTMLElement>('main .index')].filter((el) =>
		/^\s*\d{2}\s*\//.test(el.textContent ?? ''),
	);
	if (!bar || !label || !kickers.length) return;

	const entries = kickers.flatMap((kicker) => {
		const section = kicker.closest<HTMLElement>('section');
		return section ? [{ kicker, section }] : [];
	});
	if (!entries.length) return;

	let ticking = false;
	const update = () => {
		ticking = false;
		const offset = headerHeight() + 12;
		let active = -1;
		// Pin when the kicker itself touches the viewport top; release when its section ends.
		entries.forEach((entry, index) => {
			const kickerTop = entry.kicker.getBoundingClientRect().top;
			const sectionBottom = entry.section.getBoundingClientRect().bottom;
			if (kickerTop <= offset && sectionBottom > offset + 40) active = index;
		});
		entries.forEach((entry, index) => entry.kicker.classList.toggle('is-spy-active', index === active));
		if (active >= 0) {
			const text = (entries[active].kicker.textContent ?? '').replace(/\s+/g, ' ').trim();
			const numEl = label.querySelector<HTMLElement>('[data-section-spy-num]');
			const restEl = label.querySelector<HTMLElement>('[data-section-spy-rest]');
			const match = text.match(/^(\d+)\s*(.*)$/);
			const num = match ? match[1] : text;
			const rest = match ? match[2] : '';
			if (numEl && numEl.textContent !== num) numEl.textContent = num;
			if (restEl && restEl.textContent !== rest) restEl.textContent = rest;
			bar.classList.add('is-visible');
		} else {
			bar.classList.remove('is-visible');
		}
	};

	window.addEventListener(
		'scroll',
		() => {
			if (ticking) return;
			ticking = true;
			window.requestAnimationFrame(update);
		},
		{ passive: true },
	);
	window.addEventListener('resize', update, { passive: true });
	update();
}

function bindItemReveals(): void {
	const items = [...document.querySelectorAll<HTMLElement>('[data-reveal-item]')];
	if (!items.length) return;
	if (!('IntersectionObserver' in window)) {
		items.forEach((item) => item.classList.add('is-item-in'));
		return;
	}
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('is-item-in');
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: '0px 0px -12% 0px', threshold: 0.2 },
	);
	items.forEach((item) => observer.observe(item));
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
		bindSectionSpy();
		bindCaseNavigation();
		bindMobileMenu();
		return;
	}

	document.documentElement.classList.add('motion');
	bindReveals();
	bindItemReveals();
	bindSectionSpy();
	bindCaseNavigation();
	bindMobileMenu();
}

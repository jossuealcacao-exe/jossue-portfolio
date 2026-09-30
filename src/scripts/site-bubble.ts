// Regla de apple.com para la navegación:
// 1. El menú global no es fijo: se va con el scroll.
// 2. Al pasar el hero (o una pantalla, lo que llegue antes), baja una burbuja flotante con la
//    navegación. En las fichas de producto la burbuja es el submenú de la ficha (.chapter-nav):
//    mientras está pegado arriba antes de pasar el hero, se esconde hacia arriba.
// 3. La burbuja sigue visible al subir y se esconde al regresar al inicio.
export function initSiteBubble(): void {
	const bubble = document.querySelector<HTMLElement>('[data-site-bubble]');
	const chapter = document.querySelector<HTMLElement>('.chapter-nav');
	const drawer = document.querySelector<HTMLDetailsElement>('.global-nav__drawer');
	const root = document.documentElement;
	// El hero es el primer bloque real de la página (se saltan breadcrumbs y submenús).
	const skip = '.breadcrumbs, .chapter-nav, script, style, link';
	const hero = () => {
		let el = [...(document.querySelector('main')?.children ?? [])].find((child) => !child.matches(skip)) as HTMLElement | undefined;
		while (el && el.tagName === 'ARTICLE') el = [...el.children].find((child) => !child.matches(skip)) as HTMLElement | undefined;
		return el?.getBoundingClientRect();
	};

	const threshold = () => {
		const first = hero();
		const heroBottom = first ? first.bottom + window.scrollY : window.innerHeight;
		return Math.max(160, Math.min(heroBottom, window.innerHeight) - 80);
	};
	let limit = threshold();
	const chapterStart = chapter ? chapter.getBoundingClientRect().top + window.scrollY : 0;

	const setBubble = (visible: boolean) => {
		if (!bubble || chapter) return;
		bubble.classList.toggle('is-revealed', visible);
		bubble.toggleAttribute('inert', !visible);
		bubble.setAttribute('aria-hidden', String(!visible));
	};

	let ticking = false;
	const update = () => {
		ticking = false;
		const y = window.scrollY;
		const past = y > limit;
		root.classList.toggle('bubble-on', past);
		setBubble(past);
		if (chapter) {
			const stuck = y > chapterStart - 12;
			chapter.classList.toggle('is-stuck', stuck);
			chapter.classList.toggle('is-revealed', stuck && past);
		}
	};

	window.addEventListener('scroll', () => {
		if (ticking) return;
		ticking = true;
		window.requestAnimationFrame(update);
	}, { passive: true });
	window.addEventListener('resize', () => {
		limit = threshold();
		update();
	});
	update();

	// En el teléfono, el botón de menú de la burbuja abre el mismo panel del menú global,
	// colocado justo debajo de la burbuja.
	bubble?.querySelector<HTMLButtonElement>('[data-bubble-menu]')?.addEventListener('click', () => {
		if (!drawer) return;
		const rect = bubble.querySelector('.site-bubble__wrap')?.getBoundingClientRect();
		root.style.setProperty('--sheet-top', `${Math.round((rect?.bottom ?? 60) + 8)}px`);
		root.classList.add('sheet-from-bubble');
		drawer.open = !drawer.open;
	});
	drawer?.addEventListener('toggle', () => {
		if (!drawer.open) root.classList.remove('sheet-from-bubble');
	});
}

const DESKTOP_QUERY = '(min-width: 48rem)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function isDesktopCarousel(): boolean {
	return window.matchMedia(DESKTOP_QUERY).matches;
}

function interactionBehavior(): ScrollBehavior {
	return window.matchMedia(REDUCED_MOTION_QUERY).matches ? 'auto' : 'smooth';
}

export function initStackCarousels(): void {
	document.querySelectorAll<HTMLElement>('[data-stack-carousel]').forEach((root) => {
		const viewport = root.querySelector<HTMLElement>('[data-stack-viewport]');
		const track = root.querySelector<HTMLElement>('.stack-carousel__track');
		const slides = [...root.querySelectorAll<HTMLElement>('[data-stack-slide]')];
		const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-stack-dot]')];
		const prevBtn = root.querySelector<HTMLButtonElement>('[data-stack-prev]');
		const nextBtn = root.querySelector<HTMLButtonElement>('[data-stack-next]');

		if (!viewport || !track || slides.length === 0) return;

		let activeIndex = 0;

		const syncUI = () => {
			slides.forEach((slide, index) => {
				slide.classList.toggle('is-active', index === activeIndex);
			});
			dots.forEach((dot, index) => {
				dot.setAttribute('aria-pressed', index === activeIndex ? 'true' : 'false');
			});
		};

		const scrollOffsetForSlide = (index: number): number => {
			const slide = slides[index];
			if (!slide) return 0;
			if (isDesktopCarousel()) return 0;
			return Math.max(0, slide.offsetLeft - track.offsetLeft);
		};

		const scrollToSlide = (index: number, behavior: ScrollBehavior = 'auto') => {
			const bounded = (index + slides.length) % slides.length;
			activeIndex = bounded;

			if (!isDesktopCarousel()) {
				viewport.scrollTo({
					left: scrollOffsetForSlide(bounded),
					behavior,
				});
			}

			syncUI();
		};

		dots.forEach((dot) => {
			dot.addEventListener('click', () => {
				const index = Number(dot.dataset.index);
				if (Number.isNaN(index)) return;
				scrollToSlide(index, interactionBehavior());
			});
		});

		prevBtn?.addEventListener('click', () => scrollToSlide(activeIndex - 1, interactionBehavior()));
		nextBtn?.addEventListener('click', () => scrollToSlide(activeIndex + 1, interactionBehavior()));

		const syncFromScroll = () => {
			if (isDesktopCarousel()) {
				syncUI();
				return;
			}

			const center = viewport.scrollLeft + viewport.clientWidth * 0.5;
			let nearest = activeIndex;
			let nearestDistance = Number.POSITIVE_INFINITY;

			slides.forEach((slide, index) => {
				const slideCenter = slide.offsetLeft - track.offsetLeft + slide.offsetWidth * 0.5;
				const distance = Math.abs(center - slideCenter);
				if (distance < nearestDistance) {
					nearestDistance = distance;
					nearest = index;
				}
			});

			if (nearest !== activeIndex) {
				activeIndex = nearest;
				syncUI();
			}
		};

		const syncAfterResize = () => {
			if (isDesktopCarousel()) {
				viewport.scrollLeft = 0;
				activeIndex = 0;
			} else {
				scrollToSlide(activeIndex, 'auto');
			}
			syncUI();
		};

		viewport.addEventListener('scroll', syncFromScroll, { passive: true });
		window.addEventListener('resize', syncAfterResize, { passive: true });

		scrollToSlide(0, 'auto');
	});
}

interface AnnotationPayload {
	id: string;
	x: number;
	y: number;
	label: string;
	finding: string;
	risk: string;
	recommendation: string;
	priority: string;
	priorityLabel: string;
	confidence: string;
}

interface MediaPayload {
	src: string;
	alt: string;
	caption: string;
	viewport: string;
	capturedAt: string;
	sourceUrl: string;
	isPhone?: boolean;
	annotations: AnnotationPayload[];
}

interface GalleryCopy {
	open: string;
	close: string;
	prev: string;
	next: string;
	source: string;
	findings: string;
	evidence: string;
	risk: string;
	recommendation: string;
	confidence: string;
	of: string;
	gallery: string;
	closeHotspot: string;
}

interface GalleryPayload {
	copy: GalleryCopy;
	items: MediaPayload[];
}

const DESKTOP_QUERY = '(min-width: 64rem)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function interactionBehavior(): ScrollBehavior {
	return window.matchMedia(REDUCED_MOTION_QUERY).matches ? 'auto' : 'smooth';
}

function parsePayload(gallery: HTMLElement): GalleryPayload | null {
	const node = gallery.querySelector<HTMLScriptElement>('[data-evidence-payload]');
	if (!node?.textContent) return null;
	try {
		return JSON.parse(node.textContent) as GalleryPayload;
	} catch {
		return null;
	}
}

function pad(value: number): string {
	return String(value).padStart(2, '0');
}

function isDesktopViewport(): boolean {
	return window.matchMedia(DESKTOP_QUERY).matches;
}

function el<K extends keyof HTMLElementTagNameMap>(
	tag: K,
	className?: string,
	text?: string,
): HTMLElementTagNameMap[K] {
	const node = document.createElement(tag);
	if (className) node.className = className;
	if (text !== undefined) node.textContent = text;
	return node;
}

function definitionList(copy: GalleryCopy, annotation: AnnotationPayload): HTMLDListElement {
	const list = el('dl');
	const rows: Array<[string, string]> = [
		[copy.evidence, annotation.finding],
		[copy.risk, annotation.risk],
		[copy.recommendation, annotation.recommendation],
		[copy.confidence, annotation.confidence],
	];

	for (const [term, detail] of rows) {
		const row = el('div');
		row.append(el('dt', undefined, term), el('dd', undefined, detail));
		list.append(row);
	}

	return list;
}

function cardPlacement(x: number, y: number): { placement: 'above' | 'below'; align: 'start' | 'center' | 'end' } {
	return {
		placement: y > 52 ? 'above' : 'below',
		align: x > 62 ? 'end' : x < 38 ? 'start' : 'center',
	};
}

function buildHotspotCard(
	copy: GalleryCopy,
	annotation: AnnotationPayload,
	annotationIndex: number,
	onClose: () => void,
): HTMLElement {
	const card = el('article', 'hotspot-card');
	const { placement, align } = cardPlacement(annotation.x, annotation.y);

	card.style.setProperty('--card-x', `${annotation.x}%`);
	card.style.setProperty('--card-y', `${annotation.y}%`);
	card.dataset.placement = placement;
	card.dataset.align = align;
	card.setAttribute('role', 'dialog');
	card.setAttribute('aria-label', annotation.label);

	const closeBtn = el('button', 'hotspot-card__close');
	closeBtn.type = 'button';
	closeBtn.setAttribute('aria-label', copy.closeHotspot);
	closeBtn.textContent = '×';
	closeBtn.addEventListener('click', (event) => {
		event.preventDefault();
		event.stopPropagation();
		onClose();
	});

	const metaRow = el('p', 'audit-callout__meta');
	metaRow.append(
		el('span', undefined, pad(annotationIndex + 1)),
		el('span', undefined, annotation.id),
		el('span', undefined, annotation.priorityLabel),
	);

	card.append(closeBtn, metaRow, el('h3', undefined, annotation.label), definitionList(copy, annotation));
	return card;
}

function hideHotspotCard(container: HTMLElement | null | undefined): void {
	if (!container) return;
	container.hidden = true;
	container.replaceChildren();
}

function buildFindingArticle(
	copy: GalleryCopy,
	annotation: AnnotationPayload,
	annotationIndex: number,
): HTMLElement {
	const article = el('article', 'evidence-lightbox__finding is-active');
	article.dataset.annotation = String(annotationIndex);

	const metaRow = el('p', 'audit-callout__meta');
	metaRow.append(
		el('span', undefined, pad(annotationIndex + 1)),
		el('span', undefined, annotation.id),
		el('span', undefined, annotation.priorityLabel),
	);

	article.append(metaRow, el('h3', undefined, annotation.label), definitionList(copy, annotation));
	return article;
}

function bindCarousel(gallery: HTMLElement): () => number {
	const viewport = gallery.querySelector<HTMLElement>('[data-carousel-viewport]');
	const slides = [...gallery.querySelectorAll<HTMLElement>('[data-evidence-item]')];
	const dots = [...gallery.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]')];
	const prevBtn = gallery.querySelector<HTMLButtonElement>('[data-carousel-prev]');
	const nextBtn = gallery.querySelector<HTMLButtonElement>('[data-carousel-next]');
	if (!viewport || !slides.length) return () => 0;

	let activeIndex = 0;

	const syncUI = () => {
		slides.forEach((slide, index) => {
			const active = index === activeIndex;
			slide.classList.toggle('is-active', active);
			slide.toggleAttribute('inert', !active);
			slide.setAttribute('aria-hidden', active ? 'false' : 'true');
		});
		dots.forEach((dot, index) => {
			dot.setAttribute('aria-pressed', index === activeIndex ? 'true' : 'false');
		});
	};

	const scrollToSlide = (index: number, behavior: ScrollBehavior = 'auto') => {
		const bounded = (index + slides.length) % slides.length;
		const slide = slides[bounded];
		if (!slide) return;
		activeIndex = bounded;
		viewport.scrollTo({
			left: slide.offsetLeft - viewport.offsetLeft,
			behavior,
		});
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
		const center = viewport.scrollLeft + viewport.clientWidth * 0.5;
		let nearest = activeIndex;
		let nearestDistance = Number.POSITIVE_INFINITY;

		slides.forEach((slide, index) => {
			const slideCenter = slide.offsetLeft + slide.offsetWidth * 0.5;
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

	viewport.addEventListener('scroll', syncFromScroll, { passive: true });
	syncUI();

	return () => activeIndex;
}

function bindFramePan(frame: HTMLElement): { consumeDragClick: () => boolean } {
	let pointerId: number | null = null;
	let startX = 0;
	let startY = 0;
	let originLeft = 0;
	let originTop = 0;
	let dragged = false;

	const isInteractive = (target: Element) =>
		Boolean(target.closest('.audit-marker, .hotspot-card, button'));

	frame.addEventListener('pointerdown', (event) => {
		if (event.button !== 0) return;
		if (!(event.target instanceof Element)) return;
		if (isInteractive(event.target)) return;
		if (frame.scrollWidth <= frame.clientWidth && frame.scrollHeight <= frame.clientHeight) return;

		pointerId = event.pointerId;
		startX = event.clientX;
		startY = event.clientY;
		originLeft = frame.scrollLeft;
		originTop = frame.scrollTop;
		dragged = false;
		frame.setPointerCapture(event.pointerId);
	});

	frame.addEventListener('pointermove', (event) => {
		if (pointerId !== event.pointerId) return;

		const dx = event.clientX - startX;
		const dy = event.clientY - startY;
		if (!dragged && Math.hypot(dx, dy) < 6) return;

		dragged = true;
		frame.classList.add('is-panning');
		frame.scrollLeft = originLeft - dx;
		frame.scrollTop = originTop - dy;
	});

	const end = (event: PointerEvent) => {
		if (pointerId !== event.pointerId) return;
		pointerId = null;
		frame.classList.remove('is-panning');
		frame.releasePointerCapture(event.pointerId);
	};

	frame.addEventListener('pointerup', end);
	frame.addEventListener('pointercancel', end);

	return {
		consumeDragClick: () => {
			if (!dragged) return false;
			dragged = false;
			return true;
		},
	};
}

function createLightboxController(
	gallery: HTMLElement,
	payload: GalleryPayload,
	getCarouselIndex: () => number,
): void {
	const dialog =
		gallery.nextElementSibling instanceof HTMLDialogElement &&
		gallery.nextElementSibling.matches('[data-evidence-lightbox]')
			? gallery.nextElementSibling
			: null;

	if (!dialog || payload.items.length === 0) return;

	const image = dialog.querySelector<HTMLImageElement>('[data-lightbox-image]');
	const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]');
	const counter = dialog.querySelector<HTMLElement>('[data-lightbox-counter]');
	const markers = dialog.querySelector<HTMLElement>('[data-lightbox-markers]');
	const aside = dialog.querySelector<HTMLElement>('[data-lightbox-aside]');
	const findings = dialog.querySelector<HTMLElement>('[data-lightbox-findings]');
	const dots = dialog.querySelector<HTMLElement>('[data-lightbox-dots]');
	const closeBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]');
	const prevBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
	const nextBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]');
	const cardHost = dialog.querySelector<HTMLElement>('[data-lightbox-hotspot-card]');
	const frame = dialog.querySelector<HTMLElement>('[data-lightbox-frame]');

	if (
		!image ||
		!caption ||
		!counter ||
		!markers ||
		!aside ||
		!findings ||
		!dots ||
		!closeBtn ||
		!prevBtn ||
		!nextBtn ||
		!cardHost ||
		!frame
	) {
		return;
	}

	let index = 0;
	let activeAnnotation: number | null = null;
	let hotspotsVisible = false;

	const resetFrameScroll = () => {
		frame.scrollLeft = 0;
		frame.scrollTop = 0;
	};

	const syncFrameScrollState = () => {
		const canScrollX = frame.scrollWidth > frame.clientWidth + 1;
		const canScrollY = frame.scrollHeight > frame.clientHeight + 1;
		frame.classList.toggle('is-scrollable', canScrollX || canScrollY);
		frame.dataset.scrollableX = canScrollX ? 'true' : 'false';
		frame.dataset.scrollableY = canScrollY ? 'true' : 'false';
	};

	const pan = bindFramePan(frame);

	const syncImageLayout = () => {
		resetFrameScroll();
		window.requestAnimationFrame(syncFrameScrollState);
	};

	const syncViewportMode = () => {
		dialog.dataset.viewport = isDesktopViewport() ? 'desktop' : 'mobile';
	};

	const clearHotspot = () => {
		hideHotspotCard(cardHost);
		activeAnnotation = null;
		markers.querySelectorAll('.audit-marker.is-active').forEach((node) => {
			node.classList.remove('is-active');
			node.setAttribute('aria-expanded', 'false');
		});
	};

	const renderFindings = (item: MediaPayload) => {
		if (!item.annotations.length) {
			aside.hidden = true;
			findings.replaceChildren();
			dialog.classList.remove('evidence-lightbox--annotated');
			return;
		}

		dialog.classList.add('evidence-lightbox--annotated');

		if (isDesktopViewport()) {
			aside.hidden = activeAnnotation === null;
			if (activeAnnotation === null) {
				findings.replaceChildren();
				return;
			}
			const annotation = item.annotations[activeAnnotation];
			if (!annotation) {
				findings.replaceChildren();
				return;
			}
			findings.replaceChildren(buildFindingArticle(payload.copy, annotation, activeAnnotation));
			return;
		}

		aside.hidden = true;
		findings.replaceChildren();
	};

	const showHotspotCard = (
		annotation: AnnotationPayload,
		annotationIndex: number,
		onClose: () => void,
	): void => {
		cardHost.hidden = false;
		cardHost.replaceChildren(buildHotspotCard(payload.copy, annotation, annotationIndex, onClose));
	};

	const activateHotspot = (annotationIndex: number) => {
		const item = payload.items[index];
		const annotation = item?.annotations[annotationIndex];
		if (!annotation) return;

		if (activeAnnotation === annotationIndex) {
			clearHotspot();
			renderFindings(item);
			return;
		}

		activeAnnotation = annotationIndex;
		renderMarkers(item);
		renderFindings(item);

		if (isDesktopViewport()) {
			hideHotspotCard(cardHost);
			return;
		}

		showHotspotCard(annotation, annotationIndex, () => {
			clearHotspot();
			renderFindings(item);
		});
	};

	const renderMarkers = (item: MediaPayload) => {
		if (!item.annotations.length || !hotspotsVisible) {
			markers.hidden = true;
			markers.replaceChildren();
			frame.classList.remove('is-hotspots-visible');
			return;
		}

		frame.classList.add('is-hotspots-visible');
		markers.hidden = false;
		markers.replaceChildren(
			...item.annotations.map((annotation, annotationIndex) => {
				const button = el('button', 'audit-marker');
				button.type = 'button';
				button.style.setProperty('--marker-x', `${annotation.x}%`);
				button.style.setProperty('--marker-y', `${annotation.y}%`);
				button.setAttribute('aria-label', `${annotationIndex + 1}. ${annotation.label}`);
				button.setAttribute('aria-expanded', activeAnnotation === annotationIndex ? 'true' : 'false');
				if (activeAnnotation === annotationIndex) button.classList.add('is-active');
				button.append(el('span', undefined, String(annotationIndex + 1)));
				button.addEventListener('click', (event) => {
					event.stopPropagation();
					activateHotspot(annotationIndex);
				});
				return button;
			}),
		);
	};

	const renderDots = () => {
		dots.replaceChildren(
			...payload.items.map((item, itemIndex) => {
				const button = el('button', 'evidence-lightbox__dot');
				button.type = 'button';
				button.setAttribute('aria-label', `${pad(itemIndex + 1)}. ${item.alt}`);
				button.setAttribute('aria-pressed', itemIndex === index ? 'true' : 'false');
				button.dataset.index = String(itemIndex);
				button.addEventListener('click', () => show(itemIndex));
				return button;
			}),
		);
	};

	const show = (nextIndex: number) => {
		index = (nextIndex + payload.items.length) % payload.items.length;
		clearHotspot();
		hotspotsVisible = false;
		const item = payload.items[index];
		image.src = item.src;
		image.alt = item.alt;
		caption.textContent = item.caption;
		// Non-phone captures render flat: the device chrome collapses via CSS.
		dialog.querySelector('[data-lightbox-device]')?.classList.toggle('is-flat', !item.isPhone);
		counter.textContent = `${pad(index + 1)} / ${pad(payload.items.length)}`;
		prevBtn.hidden = payload.items.length < 2;
		nextBtn.hidden = payload.items.length < 2;
		dots.hidden = payload.items.length < 2;
		renderMarkers(item);
		renderFindings(item);
		renderDots();

		const applyImageLayout = () => {
			syncImageLayout();
		};

		if (image.complete && image.naturalWidth > 0) {
			applyImageLayout();
		} else {
			image.addEventListener('load', applyImageLayout, { once: true });
		}
	};

	window.addEventListener('resize', syncFrameScrollState, { passive: true });

	const revealHotspots = () => {
		const item = payload.items[index];
		if (!item?.annotations.length) return;
		hotspotsVisible = true;
		renderMarkers(item);
	};

	const open = (nextIndex: number) => {
		syncViewportMode();
		show(nextIndex);
		revealHotspots();
		if (!dialog.open) dialog.showModal();
		document.documentElement.classList.add('lightbox-open');
		closeBtn.focus();
	};

	const close = () => {
		clearHotspot();
		hotspotsVisible = false;
		frame.classList.remove('is-hotspots-visible');
		if (dialog.open) dialog.close();
		document.documentElement.classList.remove('lightbox-open');
	};

	gallery.querySelectorAll<HTMLButtonElement>('[data-evidence-open]').forEach((trigger) => {
		trigger.addEventListener('click', () => {
			const slideIndex = Number(trigger.dataset.index);
			const nextIndex = Number.isNaN(slideIndex) ? getCarouselIndex() : slideIndex;
			open(nextIndex);
		});
	});

	frame.addEventListener('wheel', (event) => {
		const canScrollX = frame.dataset.scrollableX === 'true';
		const canScrollY = frame.dataset.scrollableY === 'true';
		if (!canScrollX || event.deltaX !== 0) return;

		if (event.shiftKey || !canScrollY) {
			frame.scrollLeft += event.deltaY;
			event.preventDefault();
		}
	}, { passive: false });

	frame.addEventListener('click', (event) => {
		if (pan.consumeDragClick()) {
			event.preventDefault();
			return;
		}
		if (!(event.target instanceof Element)) return;
		if (event.target.closest('.audit-marker, .hotspot-card')) return;
		if (!hotspotsVisible) revealHotspots();
	});

	closeBtn.addEventListener('click', close);
	prevBtn.addEventListener('click', () => show(index - 1));
	nextBtn.addEventListener('click', () => show(index + 1));

	dialog.addEventListener('cancel', (event) => {
		event.preventDefault();
		close();
	});

	dialog.addEventListener('keydown', (event) => {
		if (!dialog.open) return;
		if (event.key === 'Escape') {
			if (!cardHost.hidden) {
				event.preventDefault();
				clearHotspot();
				renderFindings(payload.items[index]);
				return;
			}
		}
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			show(index - 1);
		}
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			show(index + 1);
		}
	});

	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) {
			close();
			return;
		}

		const target = event.target;
		if (!(target instanceof Element)) return;
		if (target.closest('[data-lightbox-markers], [data-lightbox-hotspot-card]')) return;
		if (!cardHost.hidden && !isDesktopViewport()) {
			clearHotspot();
			renderFindings(payload.items[index]);
		}
	});

	window.matchMedia(DESKTOP_QUERY).addEventListener('change', () => {
		if (!dialog.open) return;
		syncViewportMode();
		const item = payload.items[index];
		if (activeAnnotation === null) {
			renderFindings(item);
			hideHotspotCard(cardHost);
			return;
		}

		const idx = activeAnnotation;
		const annotation = item.annotations[idx];
		renderMarkers(item);
		renderFindings(item);

		if (isDesktopViewport()) {
			hideHotspotCard(cardHost);
			return;
		}

		if (annotation) {
			showHotspotCard(annotation, idx, () => {
				clearHotspot();
				renderFindings(item);
			});
		}
	});
}

export function initEvidenceGalleries(): void {
	document.querySelectorAll<HTMLElement>('[data-evidence-gallery]').forEach((gallery) => {
		const payload = parsePayload(gallery);
		if (!payload) return;
		const getCarouselIndex = bindCarousel(gallery);
		createLightboxController(gallery, payload, getCarouselIndex);
	});
}

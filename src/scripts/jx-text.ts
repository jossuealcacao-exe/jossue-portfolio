// Texto animado del sistema jx:
// - [data-letters]: las letras del titular aparecen una a una cuando entra en pantalla.
// - [data-typer]: escribe una frase, la sostiene, la borra y pasa a la siguiente (máquina de escribir).
// - Titulares .jx-h2 que entran con scroll: palabra por palabra.
// Con «reducir movimiento» todo queda quieto y legible desde el inicio.
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function splitLetters(el: HTMLElement): void {
	const text = el.textContent ?? '';
	el.setAttribute('aria-label', text);
	el.textContent = '';
	[...text].forEach((char, index) => {
		const span = document.createElement('span');
		span.className = 'jx-l';
		span.setAttribute('aria-hidden', 'true');
		span.style.setProperty('--i', String(index));
		span.textContent = char === ' ' ? ' ' : char;
		el.append(span);
	});
}

function splitWords(el: HTMLElement): void {
	let index = 0;
	const walk = (node: Node) => {
		for (const child of [...node.childNodes]) {
			if (child.nodeType === Node.TEXT_NODE) {
				const parts = (child.textContent ?? '').split(/(\s+)/);
				const frag = document.createDocumentFragment();
				for (const part of parts) {
					if (!part) continue;
					if (/^\s+$/.test(part)) frag.append(part);
					else {
						const span = document.createElement('span');
						span.className = 'jx-w';
						span.style.setProperty('--w', String(index++));
						span.textContent = part;
						frag.append(span);
					}
				}
				child.replaceWith(frag);
			} else if (child.nodeType === Node.ELEMENT_NODE) walk(child);
		}
	};
	walk(el);
}

function runTyper(el: HTMLElement): void {
	const phrases: string[] = JSON.parse(el.dataset.typer || '[]');
	if (phrases.length < 2) return;
	let phrase = 0;
	let chars = phrases[0].length;
	let deleting = false;
	const tick = () => {
		const current = phrases[phrase];
		if (!deleting && chars < current.length) chars += 1;
		else if (!deleting) {
			deleting = true;
			return window.setTimeout(tick, 2400);
		} else if (chars > 0) chars -= 1;
		else {
			deleting = false;
			phrase = (phrase + 1) % phrases.length;
		}
		el.textContent = phrases[phrase].slice(0, chars);
		window.setTimeout(tick, deleting ? 28 : 55);
	};
	window.setTimeout(() => {
		deleting = true;
		tick();
	}, 2600);
}

export function initJxText(): void {
	if (reduce() || !('IntersectionObserver' in window)) return;
	const once = (elements: Element[], run: (el: HTMLElement) => void, threshold = 0.4) => {
		const io = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				io.unobserve(entry.target);
				run(entry.target as HTMLElement);
			}
		}, { threshold });
		elements.forEach((el) => io.observe(el));
	};
	document.querySelectorAll<HTMLElement>('[data-letters]').forEach(splitLetters);
	once([...document.querySelectorAll('[data-letters]')], (el) => el.classList.add('is-lettering'));
	once([...document.querySelectorAll('[data-typer]')], runTyper, 0.6);
	// Titulares de sección: palabra por palabra al revelarse (solo los que no se ven al cargar).
	document.querySelectorAll<HTMLElement>('.jx-h2[data-jx-reveal], [data-jx-reveal] .jx-h2').forEach(splitWords);
}

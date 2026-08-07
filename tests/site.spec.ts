import { expect, test } from '@playwright/test';

const routes = ['/es/', '/es/trabajo/', '/es/servicios/', '/es/ia-y-sistemas/', '/es/acerca/', '/es/contacto/'];
const legacyPublicCopy = [
	'Resultados documentados en el CV',
	'Implementación revisada',
	'Revisión parcial',
	'Verificación pendiente',
	'Plan de evidencia visual',
	'Capturas pendientes de producción',
	'Fuente de captura',
];

for (const route of routes) {
	test(`${route} is responsive and console-clean`, async ({ page }) => {
		const consoleErrors: string[] = [];
		page.on('console', (message) => {
			if (message.type() === 'error') consoleErrors.push(message.text());
		});
		page.on('pageerror', (error) => consoleErrors.push(error.message));

		await page.goto(route);
		await expect(page.locator('main')).toBeVisible();
		const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
		expect(overflow).toBe(false);
		expect(consoleErrors).toEqual([]);
	});
}

test('root redirects and language preserves the equivalent route', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL(/\/es\/$/);
	await page.goto('/es/servicios/');
	await page.locator('a.language').click();
	await expect(page).toHaveURL(/\/en\/services\/$/);
});

test('header keeps navigation focused and mobile menu supports Escape', async ({ page }) => {
	await page.goto('/es/');
	await expect(page.locator('.nav__links a')).toHaveCount(4);
	await expect(page.locator('.nav__links .nav__cta')).toHaveText('Contacto');
	const headerMaterial = await page.locator('.site-header').evaluate((element) => getComputedStyle(element).backgroundImage);
	expect(headerMaterial).toContain('linear-gradient');

	const viewport = page.viewportSize();
	if (viewport && viewport.width < 928) {
		await page.locator('.menu__toggle').click();
		await expect(page.locator('.menu')).toHaveAttribute('open', '');
		await page.keyboard.press('Escape');
		await expect(page.locator('.menu')).not.toHaveAttribute('open', '');
	}

	await page.goto('/es/servicios/');
	await expect(page.locator('main a[href="/es/ia-y-sistemas/"]')).toBeVisible();
});

test('contact page prioritizes direct working channels', async ({ page }) => {
	await page.goto('/es/contacto/');
	await expect(page.locator('[data-contact-form]')).toHaveCount(1);
	await expect(page.locator('main a[data-analytics-event="click_email"]')).toHaveAttribute('href', /^mailto:/);
	await expect(page.locator('main a[data-analytics-event="click_whatsapp"]')).toHaveAttribute('href', /^https:\/\/wa\.me\//);
	await expect(page.locator('main a[data-analytics-event="click_linkedin"]')).toHaveAttribute('href', /^https:\/\/www\.linkedin\.com\//);
});

test('Home leads with a commercial proposition and selected products', async ({ page }) => {
	await page.goto('/es/');
	await expect(page.locator('main h1 .hero-title__type')).toHaveText('Ecommerce que de verdad vende.');
	await expect(page.locator('.selected-work .case-card')).toHaveCount(5);
	await expect(page.locator('.selected-work .project-visual')).toHaveCount(5);
	await expect(page.locator('.selected-work .stack-list')).toHaveCount(5);
	await expect(page.locator('.selected-work .project-grid')).toHaveCSS('overflow-x', 'auto');
	const selectedWorkScrolls = await page.locator('.selected-work .project-grid').evaluate((element) => element.scrollWidth > element.clientWidth);
	expect(selectedWorkScrolls).toBe(true);
	const selectedWorkCardFit = await page.locator('.selected-work .case-card').first().evaluate((card) => {
		const link = card.querySelector('.case-card__link');
		const visual = card.querySelector('.project-visual');
		if (!link || !visual) return false;
		const cardRect = card.getBoundingClientRect();
		const linkRect = link.getBoundingClientRect();
		const visualRect = visual.getBoundingClientRect();
		const viewportWidth = document.documentElement.clientWidth;
		const carouselWidth = card.parentElement?.clientWidth ?? viewportWidth;
		const isWideEnoughOnMobile = viewportWidth >= 480 || cardRect.width >= carouselWidth * 0.79;
		return isWideEnoughOnMobile && visualRect.left >= linkRect.left && visualRect.right <= linkRect.right;
	});
	expect(selectedWorkCardFit).toBe(true);
	await expect(page.locator('.selected-work .section-heading > .index')).toBeVisible();
	const selectedWorkHeading = await page.locator('.selected-work .section-heading').evaluate((element) => {
		const index = element.querySelector('.index')?.getBoundingClientRect();
		const heading = element.querySelector('h2')?.getBoundingClientRect();
		return Boolean(index && heading && index.bottom < heading.top && Math.abs(index.left - heading.left) < 2);
	});
	expect(selectedWorkHeading).toBe(true);
	await expect(page.locator('.selected-work')).toContainText('AHP+');
	await expect(page.locator('.opportunity-grid > article')).toHaveCount(2);
	await expect(page.locator('.pain-list li')).toHaveCount(4);
	await expect(page.locator('.solve-list li')).toHaveCount(3);
	await expect(page.locator('.outcomes-grid')).toBeVisible();
	await expect(page.locator('.profile-intro__photo img')).toBeVisible();
	await expect(page.locator('.brand-strip').first()).toHaveCSS('justify-content', 'center');
	for (const phrase of legacyPublicCopy) await expect(page.locator('main')).not.toContainText(phrase);
	await expect(page.locator('main')).not.toContainText('57+');
	await expect(page.locator('main')).not.toContainText('45 páginas');
	await expect(page.locator('main')).not.toContainText('↑ CR');
});

test('Work page presents product cards as horizontal sliders', async ({ page }) => {
	await page.goto('/es/trabajo/');
	await expect(page.locator('.work-group .project-grid')).not.toHaveCount(0);
	for (const grid of await page.locator('.work-group .project-grid').all()) {
		await expect(grid).toHaveCSS('overflow-x', 'auto');
		const gridState = await grid.evaluate((element) => ({
			cardCount: element.querySelectorAll('.case-card').length,
			scrolls: element.scrollWidth > element.clientWidth,
		}));
		if (gridState.cardCount > 1) expect(gridState.scrolls).toBe(true);
	}
});

test('section motion starts on intersection and reduced motion remains static', async ({ page }) => {
	await page.goto('/es/');
	const profile = page.locator('.profile-section');
	await profile.scrollIntoViewIfNeeded();
	await expect(profile).toHaveClass(/is-revealed/);

	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.reload();
	await expect(page.locator('html')).toHaveClass(/motion-reduced/);
	await expect(page.locator('.selected-work')).toHaveCSS('opacity', '1');
});

test('About presents experience, impact, brands, and CV without internal notes', async ({ page }) => {
	await page.goto('/es/acerca/');
	await expect(page.locator('main h1')).toHaveText('Jossue Alcalá');
	await expect(page.locator('main')).toContainText('Chief Ecommerce Manager');
	await expect(page.locator('main')).toContainText('WU Nutrition / Come Verde');
	await expect(page.locator('main')).toContainText('+21% MX');
	await expect(page.locator('main')).toContainText('>$1 MDP/mes');
	await expect(page.locator('main')).toContainText('3.6 s CrUX');
	await expect(page.locator('main a[href="/cv/Jossue-Alcala-CV.pdf"]')).toHaveCount(1);
	await expect(page.locator('.brand-strip img')).toHaveCount(6);
	await expect(page.locator('main')).not.toContainText('DUMO');
	await expect(page.locator('main')).not.toContainText('57 usuarios');
	await expect(page.locator('main')).not.toContainText('45 páginas');
	await expect(page.locator('main')).not.toContainText('Fuentes:');
	await expect(page.locator('main a[href*="linkedin.com/in/jossue-alcala"]')).toBeVisible();
});

test('project gallery is visual, accessible, and free of audit annotations', async ({ page }) => {
	await page.goto('/es/trabajo/bloqio-cro-apps/');
	await expect(page.locator('main h1')).toHaveText('Bloqio CRO Apps — Prometeo / Hermes');
	await expect(page.locator('main')).toContainText('Prometeo');
	await expect(page.locator('main')).toContainText('Hermes');
	await expect(page.locator('.evidence-figure img')).toHaveCount(11);
	await expect(page.locator('.evidence-carousel__dot')).toHaveCount(11);
	await expect(page.locator('.evidence-carousel__nav')).toHaveCount(2);
	await expect(page.locator('.evidence-figure:not(.is-active)').first()).toHaveAttribute('inert', '');
	await expect(page.locator('.evidence-figure:not(.is-active)').first()).toHaveAttribute('aria-hidden', 'true');
	await expect(page.locator('.audit-marker')).toHaveCount(0);
	await expect(page.locator('.evidence-gallery')).toHaveAttribute('aria-label', 'Galería del proyecto');
	await expect(page.locator('.evidence-carousel__viewport')).toHaveCSS('overflow-x', 'auto');
	await expect(page.locator('.iphone').first()).toHaveCSS('box-shadow', 'none');

	const galleryViewport = page.locator('.evidence-carousel__viewport');
	await galleryViewport.scrollIntoViewIfNeeded();
	const galleryBox = await galleryViewport.boundingBox();
	expect(galleryBox).not.toBeNull();
	if (galleryBox) {
		await page.mouse.move(galleryBox.x + galleryBox.width * 0.75, galleryBox.y + galleryBox.height * 0.5);
		await page.mouse.down();
		await page.mouse.move(galleryBox.x + galleryBox.width * 0.2, galleryBox.y + galleryBox.height * 0.5, { steps: 8 });
		await page.mouse.up();
		await expect.poll(() => galleryViewport.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
	}

	await page.locator('.evidence-figure.is-active [data-evidence-open]').click();
	await expect(page.locator('[data-evidence-lightbox]')).toBeVisible();
	await expect(page.locator('[data-lightbox-image]')).toBeVisible();
	await expect(page.locator('[data-lightbox-markers] .audit-marker')).toHaveCount(0);
	await page.locator('[data-lightbox-close]').click();
	await expect(page.locator('[data-evidence-lightbox]')).toBeHidden();
});

for (const project of [
	{ slug: 'wu-nutrition', title: 'WU Nutrition', categoryEs: 'Ecommerce DTC · Shopify', categoryEn: 'DTC ecommerce · Shopify', media: 5 },
	{ slug: 'bloqio-cro-apps', title: 'Bloqio CRO Apps — Prometeo / Hermes', categoryEs: 'Producto Shopify · Apps', categoryEn: 'Shopify product · Apps', media: 11 },
	{ slug: 'bloqio-builder', title: 'Bloqio Builder', categoryEs: 'Producto con IA · SaaS', categoryEn: 'AI product · SaaS', media: 7 },
	{ slug: 'la-carniceria-virtual', title: 'La Carnicería Virtual', categoryEs: 'Estrategia Shopify · UX/CRO', categoryEn: 'Shopify strategy · UX/CRO', media: 3 },
	{ slug: 'come-verde', title: 'Come Verde', categoryEs: 'Estrategia CPG · Growth', categoryEn: 'CPG strategy · Growth', media: 0 },
	{ slug: 'miawseo', title: 'MIAWSEO — Michiteca', categoryEs: 'Producto editorial · Full-stack', categoryEn: 'Editorial product · Full-stack', media: 6 },
	{ slug: 'vineria', title: 'Vinería', categoryEs: 'Producto editorial · Front-end', categoryEn: 'Editorial product · Front-end', media: 5 },
	{ slug: 'ahp-plus', title: 'AHP+ — Agent Handoff Protocol Plus', categoryEs: 'Sistema IA · Protocolo operativo', categoryEn: 'AI systems · Operating protocol', media: 0 },
	{ slug: 'tiendaonline', title: 'Casa Tecalli — Shopify OS 2.0', categoryEs: 'Concepto Shopify · Storefront', categoryEn: 'Shopify concept · Storefront', media: 4 },
]) {
	test(`${project.slug} presents a commercial bilingual project narrative`, async ({ page }) => {
		await page.goto(`/es/trabajo/${project.slug}/`);
		await expect(page.locator('main h1')).toHaveText(project.title);
		await expect(page.locator('.case-hero .eyebrow')).toContainText(project.categoryEs);
		if (project.media > 0) {
			await expect(page.locator('main')).toContainText('Explora el proyecto');
			await expect(page.locator('main')).not.toContainText('La experiencia en contexto.');
		}
		await expect(page.locator('.case-cover .project-visual')).toBeVisible();
		if (project.slug === 'ahp-plus') {
			await expect(page.locator('.case-brand img[src*="ahp-plus.svg"]')).toBeVisible();
			await expect(page.locator('.case-cover img[src*="ahp-plus.svg"]')).toBeVisible();
		}
		await expect(page.locator('#technology .stack-list li').first()).toBeVisible();
		await expect(page.locator('#technology .stack-list img').first()).toBeVisible();
		await expect(page.locator('.evidence-figure img')).toHaveCount(project.media);
		await expect(page.locator('.media-placeholder')).toHaveCount(0);
		await expect(page.locator('.status, [data-verification-status]')).toHaveCount(0);
		await expect(page.locator('main a[href^="http://127.0.0.1"], main a[href^="http://localhost"]')).toHaveCount(0);
		for (const phrase of legacyPublicCopy) await expect(page.locator('main')).not.toContainText(phrase);
		if (!['la-carniceria-virtual', 'miawseo', 'ahp-plus'].includes(project.slug)) {
			await expect(page.locator('main')).not.toContainText(/\b(auditoría|evidencia|verificación)\b/i);
		}
		if (project.slug !== 'ahp-plus') {
			await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', /\b(auditoría|evidencia|verificación)\b/i);
		}

		await page.locator('a.language').click();
		await expect(page).toHaveURL(new RegExp(`/en/work/${project.slug}/$`));
		await expect(page.locator('main h1')).toHaveText(project.title);
		await expect(page.locator('.case-hero .eyebrow')).toContainText(project.categoryEn);
		if (project.media > 0) await expect(page.locator('main')).toContainText('Explore the project');
		await expect(page.locator('.media-placeholder')).toHaveCount(0);
		if (!['la-carniceria-virtual', 'miawseo', 'ahp-plus'].includes(project.slug)) {
			await expect(page.locator('main')).not.toContainText(/\b(audit|evidence|verification)\b/i);
		}
		if (project.slug !== 'ahp-plus') {
			await expect(page.locator('meta[name="description"]')).not.toHaveAttribute('content', /\b(audit|evidence|verification)\b/i);
		}
	});
}

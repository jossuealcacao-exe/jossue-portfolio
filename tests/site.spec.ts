import { expect, test } from '@playwright/test';

const routes = [
	'/es/',
	'/es/productos/',
	'/es/productos/auditoria-ecommerce/',
	'/es/trabajo/',
	'/es/servicios/',
	'/es/ia-y-sistemas/',
	'/es/madre/',
	'/es/acerca/',
	'/es/contacto/',
	'/es/recursos/ahp-plus/',
	'/en/resources/ahp-plus/',
	'/en/products/',
	'/en/madre/',
];
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

test('AHP+ Command Atlas is bilingual, searchable, filterable, and copy-ready', async ({ page }) => {
	await page.goto('/es/recursos/ahp-plus/');
	const commandCount = await page.locator('[data-ahp-command]').count();
	expect(commandCount).toBeGreaterThanOrEqual(35);
	await expect(page.locator('[data-ahp-count]')).toContainText(`${commandCount} comandos visibles`);
	await expect(page.locator('#evidencia')).toContainText('HOF-20260912-6BF37A9D');
	await expect(page.locator('#evidencia')).toContainText('LOCAL_CAPTURED');
	await page.locator('[data-ahp-search]').fill('handoff');
	await expect(page.locator('[data-ahp-count]')).not.toContainText(`${commandCount} comandos visibles`);
	await page.locator('[data-ahp-filter="start"]').click();
	await expect(page.locator('[data-ahp-count]')).toContainText('0 comandos visibles');
	await page.locator('[data-ahp-search]').fill('');
	await expect(page.locator('[data-ahp-count]')).toContainText('3 comandos visibles');
	await expect(page.locator('.ahp-atlas__platform')).toHaveCount(6);
	await expect(page.locator('[data-os-tab] img')).toHaveCount(4);
	await page.locator('[data-os-tab]').first().focus();
	await page.keyboard.press('ArrowRight');
	await expect(page.locator('[data-os-tab]').nth(1)).toHaveAttribute('aria-selected', 'true');
	await expect(page.locator('[data-os-panel="linux"]')).toBeVisible();
	await expect(page.locator('.ahp-atlas__platform-mark img')).toHaveCount(6);
	const copyButtons = page.locator('[data-copy-value]');
	await expect(copyButtons.first()).toBeVisible();
	await expect(page.locator('.ahp-copy-icon')).toHaveCount(await copyButtons.count());
	await expect(page.getByText('Copiar', { exact: true })).toHaveCount(0);
	await expect(page.getByRole('button', { name: 'Copiar comando' }).first()).toBeVisible();
	const promptRows = page.locator('.ahp-atlas__platform li');
	await expect(page.locator('.ahp-atlas__prompt-head')).toHaveCount(await promptRows.count());
	await expect(page.locator('.ahp-atlas__prompt-head').first()).toContainText('CHAT');
	await expect(page.locator('.ahp-atlas__prompt-head').first()).toHaveCSS('justify-content', 'space-between');
	const handoffLayout = await page.locator('#handoff .ahp-atlas__steps > li').first().evaluate((element) => ({
		columns: getComputedStyle(element).gridTemplateColumns.split(' ').length,
		rowWidth: element.getBoundingClientRect().width,
		listWidth: element.parentElement?.getBoundingClientRect().width ?? 0,
	}));
	expect(Math.abs(handoffLayout.rowWidth - handoffLayout.listWidth)).toBeLessThan(1);
	const handoffColumns = handoffLayout.columns;
	expect(handoffColumns).toBe((page.viewportSize()?.width ?? 0) > 760 ? 2 : 1);
	await expect(page.locator('main')).toContainText('Directamente en el chat');
	await expect(page.locator('main')).toContainText('AHP+ 1.4.1');
	await page.locator('a.language').click();
	await expect(page).toHaveURL(/\/en\/resources\/ahp-plus\/$/);
	await expect(page.locator('.ahp-atlas__hero .eyebrow')).toContainText('Command Atlas');
	await expect(page.locator('main h1')).toContainText('Let context travel');
});

test('MADRE is bilingual, explicit about evidence, and connected to contact and AHP+', async ({ page }) => {
	await page.goto('/es/madre/');
	await expect(page.locator('[data-madre-page]')).toBeVisible();
	await expect(page.locator('main h1')).toContainText('Un lugar común');
	await expect(page.locator('[data-madre-explanatory]')).toContainText('NO ES EVIDENCIA DE EJECUCIÓN');
	await expect(page.locator('main a[data-analytics-event="click_madre_contact"]').first()).toHaveAttribute('href', '/es/contacto/');
	await expect(page.locator('main a[data-analytics-event="click_madre_ahp"]').first()).toHaveAttribute('href', '/es/recursos/ahp-plus/');
	await expect(page.locator('.nav__links a')).toHaveCount(4);
	await page.locator('a.language').click();
	await expect(page).toHaveURL(/\/en\/madre\/$/);
	await expect(page.locator('main h1')).toContainText('One shared place');
	await expect(page.locator('[data-madre-explanatory]')).toContainText('NOT EXECUTION EVIDENCE');
});

test('commercial catalog presents MADRE as a product and keeps Apex access bounded', async ({ page }) => {
	await page.goto('/es/productos/');
	await expect(page.locator('[data-product-catalog]')).toBeVisible();
	await expect(page.getByRole('link', { name: /MADRE/ })).toHaveAttribute('href', '/es/madre/');
	await expect(page.locator('.commerce-product-card')).toHaveCount(5);
	await page.locator('.jossue-assistant__launcher').click();
	await expect(page.locator('.jossue-assistant__panel')).toBeVisible();
	await expect(page.locator('.jossue-assistant__panel')).toContainText('Todavía no consulta auditorías ni datos de Apex');
	await page.locator('[data-assistant-choice]').first().click();
	await expect(page.locator('[data-assistant-response]')).toBeVisible();
});

test('product detail is bilingual and routes to a contact conversation', async ({ page }) => {
	await page.goto('/es/productos/auditoria-ecommerce/');
	await expect(page.locator('[data-product-detail="auditoria-ecommerce"]')).toBeVisible();
	await expect(page.locator('main h1')).toHaveText('Auditoría ecommerce');
	await expect(page.locator('main a[data-analytics-event="contact_product"]')).toHaveAttribute('href', '/es/contacto/?producto=auditoria-ecommerce');
	await page.locator('a.language').click();
	await expect(page).toHaveURL(/\/en\/products\/auditoria-ecommerce\/$/);
	await expect(page.locator('main h1')).toHaveText('Ecommerce audit');
});

test('header keeps navigation focused and mobile menu supports Escape', async ({ page }) => {
	await page.goto('/es/');
	await expect(page.locator('.nav__links a')).toHaveCount(4);
	await expect(page.locator('.nav__links .nav__cta')).toHaveText('Contacto');
	await expect(page.locator('body')).toHaveAttribute('data-site-theme', 'storefront');
	const headerColor = await page.locator('.site-header').evaluate((element) => getComputedStyle(element).backgroundColor);
	expect(headerColor).not.toBe('rgba(0, 0, 0, 0)');

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

test('Portfolio connects to the independent blog only from the footer', async ({ page }) => {
	await page.goto('/es/');
	await expect(page.locator('header .nav__links')).not.toContainText('Blog');
	await expect(page.locator('footer a[data-analytics-event="click_blog"]')).toHaveAttribute('href', 'https://blog.jossuealcala.com/es/');
	await expect(page.locator('meta[name="google-adsense-account"]')).toHaveAttribute('content', 'ca-pub-5612202849073748');
	await expect(page.locator('[data-ad-scope="blog"]')).toHaveCount(0);
	await expect(page.locator('script[data-blog-adsense]')).toHaveCount(0);
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
	await expect(page.locator('[data-storefront-home]')).toBeVisible();
	await expect(page.locator('main h1')).toHaveText('Convierte una auditoría en una mejora que sí llega a producción.');
	await expect(page.locator('.storefront-hero__visual img')).toHaveCount(3);
	await expect(page.locator('.storefront-hero__visual figcaption')).toContainText('Sin resultados inventados');
	await expect(page.locator('.commerce-product-card')).toHaveCount(5);
	await expect(page.getByRole('link', { name: /MADRE/ })).toHaveAttribute('href', '/es/madre/');
	await expect(page.locator('.commerce-proof .case-card')).toHaveCount(3);
	await expect(page.locator('.commerce-method li')).toHaveCount(4);
	await expect(page.locator('.commerce-profile__photo img')).toBeVisible();
	for (const phrase of legacyPublicCopy) await expect(page.locator('main')).not.toContainText(phrase);
	await expect(page.locator('main')).not.toContainText('57+');
	await expect(page.locator('main')).not.toContainText('45 páginas');
	await expect(page.locator('main')).not.toContainText('↑ CR');
});

test('Work page rails the cards on mobile and shows every project on desktop', async ({ page }) => {
	await page.goto('/es/trabajo/');
	await expect(page.locator('.work-group .project-grid')).not.toHaveCount(0);
	const isDesktop = (page.viewportSize()?.width ?? 0) >= 1024;
	for (const grid of await page.locator('.work-group .project-grid').all()) {
		const gridState = await grid.evaluate((element) => ({
			cardCount: element.querySelectorAll('.case-card').length,
			scrolls: element.scrollWidth > element.clientWidth,
			overflowX: getComputedStyle(element).overflowX,
			columns: getComputedStyle(element).gridTemplateColumns.split(' ').length,
		}));
		if (isDesktop) {
			// A portfolio must not hide work behind a horizontal scroll on a desktop screen.
			expect(gridState.overflowX).toBe('visible');
			expect(gridState.scrolls).toBe(false);
			expect(gridState.columns).toBe(2);
		} else {
			// Below 1024px the rail is the only workable pattern.
			expect(gridState.overflowX).toBe('auto');
			if (gridState.cardCount > 1) expect(gridState.scrolls).toBe(true);
		}
	}
});

test('section motion starts on intersection and reduced motion remains static', async ({ page }) => {
	await page.goto('/es/trabajo/');
	const workGroup = page.locator('.work-group').last();
	await workGroup.scrollIntoViewIfNeeded();
	await expect(workGroup).toHaveClass(/is-revealed/);

	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.reload();
	await expect(page.locator('html')).toHaveClass(/motion-reduced/);
	await expect(page.locator('.work-group').first()).toHaveCSS('opacity', '1');
});

test('About presents experience, impact, brands, and CV without internal notes', async ({ page }) => {
	await page.goto('/es/acerca/');
	await expect(page.locator('main h1')).toHaveText('Jossue Alcalá');
	await expect(page.locator('main')).toContainText('Head of E-commerce & Digital Growth');
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
	{ slug: 'wu-nutrition', title: 'WU Nutrition', categoryEs: 'Tienda de suplementos · Shopify', categoryEn: 'Supplement store · Shopify', media: 5 },
	{ slug: 'bloqio-cro-apps', title: 'Bloqio CRO Apps — Prometeo / Hermes', categoryEs: 'Dos apps para vender más', categoryEn: 'Two apps for selling more', media: 11 },
	{ slug: 'bloqio-builder', title: 'Bloqio Builder', categoryEs: 'Creador de páginas con IA', categoryEn: 'AI page builder', media: 7 },
	{ slug: 'la-carniceria-virtual', title: 'La Carnicería Virtual', categoryEs: 'Diagnóstico de una tienda', categoryEn: 'Store diagnosis', media: 3 },
	{ slug: 'come-verde', title: 'Come Verde', categoryEs: 'Marca de alimentos · Crecimiento', categoryEn: 'Food brand · Growth', media: 5 },
	{ slug: 'miawseo', title: 'MIAWSEO — Michiteca', categoryEs: 'Sitio de contenido · Lo hice completo', categoryEn: 'Content site · Built end to end', media: 6 },
	{ slug: 'vineria', title: 'Vinería', categoryEs: 'Guía de vinos', categoryEn: 'Wine guide', media: 5 },
	{ slug: 'ahp-plus', title: 'AHP+ — Agent Handoff Protocol Plus', categoryEs: 'Producto propio · Código abierto', categoryEn: 'Owned product · Open source', media: 0 },
	{ slug: 'tiendaonline', title: 'Casa Tecalli — Shopify OS 2.0', categoryEs: 'Tienda de ejemplo · Concepto', categoryEn: 'Sample store · Concept', media: 4 },
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
		await expect(page.locator('[data-case-ambience]')).toHaveCount(1);
		await expect(page.locator('[data-case-ambience] img')).toBeVisible();
		await expect(page.locator('[data-case-ambience]')).toContainText('Imagen generada · ambientación, no captura.');
		await expect(page.locator('[data-case-ambience]')).toContainText('GPT Image · Codex');
		expect(await page.locator('[data-case-ambience] img').getAttribute('src')).toContain('ambience-');
		if (project.slug === 'ahp-plus') {
			await expect(page.locator('.case-brand img[src*="ahp-plus.svg"]')).toBeVisible();
			await expect(page.locator('.case-cover img[src*="ahp-plus.svg"]')).toBeVisible();
			await expect(page.locator('main')).toContainText('AHP+ 1.4.1');
			await expect(page.locator('main')).toContainText('.ahp/');
			await expect(page.locator('main')).not.toContainText('AHP+ 1.0');
			await expect(page.locator('#links a[href="https://github.com/jossuealcacao-exe/ahp_plus"]')).toBeVisible();
			await expect(page.locator('#links a[href="https://www.npmjs.com/package/@jossuealcala/ahp-plus"]')).toBeVisible();

			const deliveryColumns = await page.locator('#delivery .deliverable-grid').evaluate((element) =>
				getComputedStyle(element).gridTemplateColumns.split(' ').length,
			);
			expect(deliveryColumns).toBe(1);
			await expect(page.locator('#command-atlas .button')).toHaveCSS('color', 'rgb(246, 246, 242)');
			await expect(page.locator('.case-cta h2')).toHaveCSS('color', 'rgb(246, 246, 242)');
			await expect(page.locator('.case-cta .button')).toHaveCSS('color', 'rgb(17, 17, 15)');
			await expect(page.locator('.site-footer__brand h2')).toHaveCSS('color', 'rgb(247, 247, 242)');
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
		await expect(page.locator('[data-case-ambience]')).toContainText('Generated image · ambience, not a screenshot.');
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

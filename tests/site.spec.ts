import { expect, test, type Page } from '@playwright/test';

async function switchLanguage(page: Page) {
	const desktopLink = page.locator('.global-nav__language');
	if (await desktopLink.isVisible()) {
		await desktopLink.click();
		return;
	}
	await page.locator('.global-nav__trigger').click();
	await page.locator('.global-nav__sheet a[hreflang]').click();
}

const routes = [
	'/es/',
	'/es/productos/',
	'/es/productos/bloqio-builder/',
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
	await switchLanguage(page);
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
	await switchLanguage(page);
	await expect(page).toHaveURL(/\/en\/resources\/ahp-plus\/$/);
	await expect(page.locator('.ahp-atlas__hero .eyebrow')).toContainText('Command Atlas');
	await expect(page.locator('main h1')).toContainText('Let context travel');
});

test('MADRE is bilingual, explicit about evidence, and connected to contact and AHP+', async ({ page }) => {
	await page.goto('/es/madre/');
	await expect(page.locator('[data-madre-page]')).toBeVisible();
	await expect(page.locator('main h1')).toContainText('Instala una sala');
	await expect(page.locator('[data-madre-explanatory]')).toContainText('ALCANCE DE LA EVIDENCIA');
	await expect(page.locator('.madre-install__command')).toContainText('npx @jossuealcala/madre start');
	await expect(page.locator('[data-madre-os-tab]')).toHaveCount(2);
	await expect(page.locator('[data-madre-os-panel="macos"]')).toBeVisible();
	await page.locator('[data-madre-os-tab="linux"]').click();
	await expect(page.locator('[data-madre-os-tab="linux"]')).toHaveAttribute('aria-selected', 'true');
	await expect(page.locator('[data-madre-os-panel="linux"]')).toBeVisible();
	await expect(page.locator('.madre-evidence__figure img')).toHaveAttribute('src', '/images/madre/room-0.4.0.webp');
	await expect(page.locator('main a[data-analytics-event="click_madre_contact"]').first()).toHaveAttribute('href', '/es/contacto/');
	await expect(page.locator('main a[data-analytics-event="click_madre_ahp"]').first()).toHaveAttribute('href', '/es/recursos/ahp-plus/');
	await expect(page.locator('.global-nav__links a')).toHaveCount(4);
	await switchLanguage(page);
	await expect(page).toHaveURL(/\/en\/madre\/$/);
	await expect(page.locator('main h1')).toContainText('Install a room');
	await expect(page.locator('[data-madre-explanatory]')).toContainText('EVIDENCE BOUNDARY');
});

test('commercial catalog presents MADRE as a product and keeps Apex access bounded', async ({ page }) => {
	await page.goto('/es/productos/');
	await expect(page.locator('[data-product-catalog]')).toBeVisible();
	await expect(page.getByRole('link', { name: 'MADRE', exact: true })).toHaveAttribute('href', '/es/madre/');
	await expect(page.locator('.catalog__item')).toHaveCount(5);
	// Cada producto reserva su campo de imagen para la ronda 2.
	await expect(page.locator('.catalog__item [data-media-slot]')).toHaveCount(5);
	await page.locator('.jossue-assistant__launcher').click();
	await expect(page.locator('.jossue-assistant__panel')).toBeVisible();
	await expect(page.locator('.jossue-assistant__panel')).toContainText('Todavía no consulta auditorías ni datos de Apex');
	await page.locator('[data-assistant-choice]').first().click();
	await expect(page.locator('[data-assistant-response]')).toBeVisible();
});

test('product detail is bilingual and routes to a contact conversation', async ({ page }) => {
	await page.goto('/es/productos/bloqio-builder/');
	await expect(page.locator('[data-product-detail="bloqio-builder"]')).toBeVisible();
	await expect(page.locator('main h1')).toHaveText('Bloqio Builder');
	await expect(page.locator('main a[data-analytics-event="contact_product"]')).toHaveAttribute('href', '/es/contacto/?producto=bloqio-builder');
	await switchLanguage(page);
	await expect(page).toHaveURL(/\/en\/products\/bloqio-builder\/$/);
	await expect(page.locator('main h1')).toHaveText('Bloqio Builder');
});

test('header keeps navigation focused and mobile menu supports Escape', async ({ page }) => {
	await page.goto('/es/');
	await expect(page.locator('.global-nav__links a')).toHaveCount(4);
	await expect(page.locator('.global-nav__links a[href="/es/contacto/"]')).toContainText('Contacto');
	// El rediseño movio la home al tono papel; el cierre oscuro vive en su
	// propia seccion, no en el tema del documento.
	await expect(page.locator('body')).toHaveAttribute('data-site-theme', 'default');
	await expect(page.locator('[data-flagship-carousel]')).toBeVisible();
	await expect(page.locator('main .stage[data-tone="ink"]')).toHaveCount(3);
	const headerColor = await page.locator('.global-nav').evaluate((element) => getComputedStyle(element).backgroundColor);
	expect(headerColor).not.toBe('rgba(0, 0, 0, 0)');
	await page.evaluate(() => window.scrollTo(0, 640));
	await expect(page.locator('.global-nav')).toHaveCSS('background-color', headerColor);
	const scrolledHeader = await page.locator('.global-nav').boundingBox();
	expect(Math.abs(scrolledHeader?.y ?? 999)).toBeLessThan(1);

	const viewport = page.viewportSize();
	if (viewport && viewport.width < 928) {
		await expect(page.locator('.global-nav__trigger')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
		await page.locator('.global-nav__trigger').click();
		await expect(page.locator('.global-nav__drawer')).toHaveAttribute('open', '');
		await expect(page.locator('.global-nav__sheet')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Productos', exact: true }).last()).toBeVisible();
		await expect(page.getByRole('link', { name: 'Contacto', exact: true }).last()).toBeVisible();
		const menuBox = await page.locator('.global-nav__sheet').boundingBox();
		expect(menuBox?.width ?? 0).toBeGreaterThanOrEqual((viewport.width ?? 0) - 1);
		await page.keyboard.press('Escape');
		await expect(page.locator('.global-nav__drawer')).not.toHaveAttribute('open', '');
	}

	await page.goto('/es/servicios/');
	await expect(page.locator('main a[href="/es/ia-y-sistemas/"]')).toBeVisible();
});

test('commercial pages share one hierarchy and CTAs keep usable spacing', async ({ page }) => {
	for (const route of ['/es/productos/', '/es/productos/desarrollo-web/']) {
		await page.goto(route);
		const hero = page.locator('main .stage--hero').first();
		const heroTitle = hero.locator('.stage__title').first();
		const heroLede = hero.locator('.stage__lede').first();
		const titleBox = await heroTitle.boundingBox();
		const ledeBox = await heroLede.boundingBox();
		expect(titleBox, `${route}: hero title must render`).not.toBeNull();
		expect(ledeBox, `${route}: hero lede must render`).not.toBeNull();
		expect(Math.abs((titleBox?.x ?? 0) - (ledeBox?.x ?? 0)), `${route}: hero title and lede share the same reading edge`).toBeLessThan(1);
		await expect(heroTitle).toHaveCSS('text-align', 'left');

		const firstCta = hero.locator('.stage__actions .pill').first();
		if (await firstCta.count()) {
			const spacing = await firstCta.evaluate((element) => {
				const style = getComputedStyle(element);
				return {
					paddingLeft: Number.parseFloat(style.paddingLeft),
					paddingRight: Number.parseFloat(style.paddingRight),
					height: element.getBoundingClientRect().height,
				};
			});
			expect(spacing.paddingLeft, `${route}: CTA left padding`).toBeGreaterThanOrEqual(18);
			expect(spacing.paddingRight, `${route}: CTA right padding`).toBeGreaterThanOrEqual(18);
			expect(spacing.height, `${route}: CTA touch target`).toBeGreaterThanOrEqual(48);
		}

		const close = page.locator('.conversion-chapter').first();
		if (await close.count()) await expect(close.locator('.stage__title')).toHaveCSS('text-align', 'left');
	}

	await page.goto('/es/productos/desarrollo-web/');
	const chapterCta = page.locator('.chapter-nav__cta');
	const chapterSpacing = await chapterCta.evaluate((element) => {
		const style = getComputedStyle(element);
		return {
			paddingLeft: Number.parseFloat(style.paddingLeft),
			paddingRight: Number.parseFloat(style.paddingRight),
			height: element.getBoundingClientRect().height,
		};
	});
	expect(chapterSpacing.paddingLeft).toBeGreaterThanOrEqual(13);
	expect(chapterSpacing.paddingRight).toBeGreaterThanOrEqual(13);
	expect(chapterSpacing.height).toBeGreaterThanOrEqual(42);
});

test('Portfolio connects to the independent blog only from the footer', async ({ page }) => {
	await page.goto('/es/');
	await expect(page.locator('header .global-nav__links')).not.toContainText('Blog');
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
	await expect(page.locator('main h1')).toHaveText('Ideas ambiciosas. Sistemas que funcionan.');
	await expect(page.locator('[data-flagship-carousel]')).toBeVisible();
	await expect(page.locator('[data-flagship-slide]')).toHaveCount(3);
	await expect(page.locator('[data-flagship-slide] img')).toHaveCount(3);
	await expect(page.locator('[data-flagship-control]')).toHaveCount(3);
	await page.locator('[data-flagship-control]').nth(1).click();
	await expect(page.locator('[data-flagship-slide].is-active')).toContainText('Encuentro dónde se te cae la venta.');
	await expect(page.locator('[data-flagship-status]')).toHaveText('02 / 03');
	await expect(page.locator('.madre-feature__wordmark')).toHaveText('MADRE');
	await expect(page.getByRole('link', { name: /Explorar MADRE/ })).toHaveAttribute('href', '/es/madre/');
	await expect(page.locator('.product-index__list > li')).toHaveCount(4);
	await expect(page.locator('.product-index__list [data-media-slot]')).toHaveCount(4);
	const mesh = await page.locator('.product-index__list').evaluate((element) => ({
		display: getComputedStyle(element).display,
		columns: getComputedStyle(element).gridTemplateColumns.split(' ').length,
	}));
	expect(mesh.display).toBe('grid');
	expect(mesh.columns).toBe((page.viewportSize()?.width ?? 0) > 992 ? 12 : (page.viewportSize()?.width ?? 0) > 736 ? 2 : 1);
	await expect(page.locator('.case-filmstrip__item')).toHaveCount(4);
	await expect(page.locator('.method-chapter__list > li')).toHaveCount(4);
	await expect(page.locator('[data-media-slot="home-portrait"]')).toBeVisible();
	const closingTitle = page.locator('.closing-chapter .stage__title');
	const closingCta = page.locator('.closing-chapter .pill');
	await closingTitle.scrollIntoViewIfNeeded();
	const closingGeometry = await closingTitle.evaluate((element) => {
		const rect = element.getBoundingClientRect();
		return {
			left: rect.left,
			right: rect.right,
			bottom: rect.bottom,
			clientWidth: element.clientWidth,
			scrollWidth: element.scrollWidth,
		};
	});
	const closingCtaBox = await closingCta.boundingBox();
	expect(closingGeometry.left).toBeGreaterThanOrEqual(0);
	expect(closingGeometry.right).toBeLessThanOrEqual(page.viewportSize()?.width ?? 0);
	expect(closingGeometry.scrollWidth).toBeLessThanOrEqual(closingGeometry.clientWidth + 1);
	expect((closingCtaBox?.y ?? 0) - closingGeometry.bottom).toBeGreaterThanOrEqual(24);
	for (const phrase of legacyPublicCopy) await expect(page.locator('main')).not.toContainText(phrase);
	await expect(page.locator('main')).not.toContainText('57+');
	await expect(page.locator('main')).not.toContainText('45 páginas');
	await expect(page.locator('main')).not.toContainText('↑ CR');
});

test('Work page uses full-width editorial rows without legacy cards', async ({ page }) => {
	await page.goto('/es/trabajo/');
	await expect(page.locator('.work-gallery')).not.toHaveCount(0);
	await expect(page.locator('.portfolio-entry')).toHaveCount(9);
	await expect(page.locator('.case-card')).toHaveCount(0);
	await expect(page.getByText('Ver proyecto', { exact: true })).toHaveCount(0);
	const viewport = page.viewportSize();
	const heroBox = await page.locator('.editorial-hero').boundingBox();
	expect(heroBox?.x ?? -1).toBe(0);
	expect(Math.abs((heroBox?.width ?? 0) - (viewport?.width ?? 0))).toBeLessThan(1);
	await expect(page.locator('.editorial-hero h1')).toHaveCSS('color', 'rgb(247, 247, 243)');
});

test('section motion starts on intersection and reduced motion remains static', async ({ page }) => {
	await page.goto('/es/trabajo/');
	const workGroup = page.locator('.work-chapter').last();
	await workGroup.scrollIntoViewIfNeeded();
	await expect(workGroup).toHaveClass(/is-revealed/);

	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.reload();
	await expect(page.locator('html')).toHaveClass(/motion-reduced/);
	await expect(page.locator('.work-chapter').first()).toHaveCSS('opacity', '1');
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
	await expect(page.locator('.brand-strip .brand-label')).toHaveCount(6);
	await expect(page.locator('.brand-strip img')).toHaveCount(0);
	await expect(page.locator('main')).not.toContainText('DUMO');
	await expect(page.locator('main')).not.toContainText('57 usuarios');
	await expect(page.locator('main')).not.toContainText('45 páginas');
	await expect(page.locator('main')).not.toContainText('Fuentes:');
	await expect(page.locator('main a[href*="linkedin.com/in/jossue-alcala"]')).toBeVisible();
});

test('project gallery preserves every frame as an accessible image placeholder', async ({ page }) => {
	await page.goto('/es/trabajo/bloqio-cro-apps/');
	await expect(page.locator('main h1')).toHaveText('Bloqio CRO Apps — Prometeo / Hermes');
	await expect(page.locator('main')).toContainText('Prometeo');
	await expect(page.locator('main')).toContainText('Hermes');
	await expect(page.locator('.evidence-placeholder')).toHaveCount(11);
	await expect(page.locator('.evidence-placeholder [data-media-slot]')).toHaveCount(11);
	await expect(page.locator('.evidence-gallery img')).toHaveCount(0);
	await expect(page.locator('.audit-marker')).toHaveCount(0);
	await expect(page.locator('.evidence-gallery')).toHaveAttribute('aria-label', 'Galería del proyecto');
	await expect(page.locator('[data-evidence-lightbox], .evidence-carousel__nav')).toHaveCount(0);
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
		await expect(page.locator('.case-intro .eyebrow')).toContainText(project.categoryEs);
		if (project.media > 0) {
			await expect(page.locator('main')).toContainText('Explora el proyecto');
			await expect(page.locator('main')).not.toContainText('La experiencia en contexto.');
		}
		await expect(page.locator('.case-cover .portfolio-visual')).toBeVisible();
		await expect(page.locator('.case-cover img')).toHaveCount(0);
		await expect(page.locator('[data-case-ambience]')).toHaveCount(1);
		await expect(page.locator('[data-case-ambience] img')).toHaveCount(0);
		await expect(page.locator('[data-case-ambience]')).toContainText('Placeholder editorial');
		await expect(page.locator('[data-case-ambience] [data-media-slot]')).toBeVisible();
		if (project.slug === 'ahp-plus') {
			await expect(page.locator('.case-brand')).toContainText('AHP+');
			await expect(page.locator('main')).toContainText('AHP+ 1.4.1');
			await expect(page.locator('main')).toContainText('.ahp/');
			await expect(page.locator('main')).not.toContainText('AHP+ 1.0');
			await expect(page.locator('#links a[href="https://github.com/jossuealcacao-exe/ahp_plus"]')).toBeVisible();
			await expect(page.locator('#links a[href="https://www.npmjs.com/package/@jossuealcala/ahp-plus"]')).toBeVisible();

			const deliveryColumns = await page.locator('#delivery .deliverable-grid').evaluate((element) =>
				getComputedStyle(element).gridTemplateColumns.split(' ').length,
			);
			expect(deliveryColumns).toBe(1);
			await expect(page.locator('#command-atlas .button')).toHaveCSS('color', 'rgb(243, 243, 239)');
			await expect(page.locator('.case-cta h2')).toHaveCSS('color', 'rgb(243, 243, 239)');
			await expect(page.locator('.case-cta .button')).toHaveCSS('color', 'rgb(9, 10, 9)');
			// El pie dejo de ser una losa oscura con titular: ahora es un
			// directorio callado sobre fondo claro. El requisito sobrevive
			// — su encabezado debe leerse contra su fondo.
			await expect(page.locator('.site-footer__wordmark')).toHaveCSS('color', 'rgb(9, 10, 9)');
			await expect(page.locator('.site-footer__group h2').first()).toHaveCSS('color', 'rgb(98, 100, 95)');
		}
		await expect(page.locator('#technology .stack-list li').first()).toBeVisible();
		await expect(page.locator('#technology .stack-list img').first()).toBeVisible();
		await expect(page.locator('.evidence-placeholder')).toHaveCount(project.media);
		await expect(page.locator('.evidence-gallery img')).toHaveCount(0);
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

		await switchLanguage(page);
		await expect(page).toHaveURL(new RegExp(`/en/work/${project.slug}/$`));
		await expect(page.locator('main h1')).toHaveText(project.title);
		await expect(page.locator('.case-intro .eyebrow')).toContainText(project.categoryEn);
		await expect(page.locator('[data-case-ambience]')).toContainText('Editorial placeholder');
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

test('MADRE keeps a disciplined reading edge and never overflows the viewport', async ({ page }) => {
	await page.goto('/es/madre/');
	const titleBox = await page.locator('.madre-product__hero h1').boundingBox();
	const ledeBox = await page.locator('.madre-product__lede').boundingBox();
	expect(titleBox).not.toBeNull();
	expect(ledeBox).not.toBeNull();
	expect(Math.abs((titleBox?.x ?? 0) - (ledeBox?.x ?? 0))).toBeLessThan(1);
	await expect(page.locator('.madre-product__hero h1')).toHaveCSS('text-align', 'start');
	const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
	expect(hasHorizontalOverflow).toBe(false);
});

test('every image slot declares the contract round 2 depends on', async ({ page }) => {
	// Un slot sin id, sin proporcion o sin etiqueta es un hueco que nadie
	// sabra rellenar despues. Este guard existe para que la ronda 2 no
	// tenga que adivinar nada.
	const RATIOS = ['21:9', '16:9', '3:2', '4:3', '1:1', '4:5', '9:16'];
	const seen = new Set<string>();

	for (const route of ['/es/', '/es/productos/', '/es/productos/bloqio-builder/', '/es/madre/']) {
		await page.goto(route);
		const slots = page.locator('[data-media-slot]');
		const count = await slots.count();
		expect(count, `${route} debe reservar al menos un campo de imagen`).toBeGreaterThan(0);

		const ids: string[] = [];
		for (let index = 0; index < count; index += 1) {
			const slot = slots.nth(index);
			const id = await slot.getAttribute('data-media-slot');
			const ratio = await slot.getAttribute('data-slot-ratio');
			expect(id, `${route}: un slot quedo sin id`).toBeTruthy();
			expect(RATIOS, `${route}#${id}: proporcion fuera del catalogo`).toContain(ratio);
			await expect(slot.locator('.slot__label'), `${route}#${id}: sin etiqueta legible`).not.toBeEmpty();
			ids.push(id as string);
		}

		// Dentro de una misma pagina los ids no pueden repetirse: en la
		// ronda 2 cada uno recibe un archivo distinto.
		expect(new Set(ids).size, `${route}: ids de slot duplicados`).toBe(ids.length);
		ids.forEach((id) => seen.add(id));
	}

	expect(seen.size).toBeGreaterThan(10);
});

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
	'/es/productos/daniela/',
	'/es/productos/ahp-plus/',
	'/es/productos/miawseo/',
	'/es/productos/consultoria/',
	'/es/productos/desarrollo-web/',
	'/en/products/daniela/',
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
	await expect(page.locator('main h1')).toContainText('Programa con MADRE');
	await expect(page.locator('[data-madre-explanatory]')).toContainText('la propia sala');
	await expect(page.locator('.madre-install__command')).toContainText('npx @jossuealcala/madre start');
	await expect(page.locator('[data-madre-os-tab]')).toHaveCount(2);
	await expect(page.locator('[data-madre-os-panel="macos"]')).toBeVisible();
	await page.locator('[data-madre-os-tab="linux"]').click();
	await expect(page.locator('[data-madre-os-tab="linux"]')).toHaveAttribute('aria-selected', 'true');
	await expect(page.locator('[data-madre-os-panel="linux"]')).toBeVisible();
	await expect(page.locator('.madre-evidence__figure img')).toHaveAttribute('src', '/images/madre/room-0.5.2.webp');
	// El showcase: tres videos reales, cada uno con su póster, y un enlace a madre.run.
	await expect(page.locator('#evidencia .jx-clip video')).toHaveCount(3);
	for (const poster of await page.locator('#evidencia .jx-clip video').evaluateAll((videos) => videos.map((video) => video.getAttribute('poster')))) expect(poster).toMatch(/^\/videos\/madre\/.+\.webp$/);
	await expect(page.locator('main a[href="https://madre.run/"]').first()).toBeVisible();
	await expect(page.locator('main a[data-analytics-event="click_madre_contact"]').first()).toHaveAttribute('href', '/es/contacto/');
	await expect(page.locator('main a[data-analytics-event="click_madre_ahp"]').first()).toHaveAttribute('href', '/es/recursos/ahp-plus/');
	await expect(page.locator('.global-nav__links a')).toHaveCount(4);
	await switchLanguage(page);
	await expect(page).toHaveURL(/\/en\/madre\/$/);
	await expect(page.locator('main h1')).toContainText('Code with MADRE');
	await expect(page.locator('[data-madre-explanatory]')).toContainText('the room itself');
});

test('commercial catalog presents MADRE as a product and keeps Apex access bounded', async ({ page }) => {
	await page.goto('/es/productos/');
	await expect(page.locator('[data-product-catalog]')).toBeVisible();
	await expect(page.getByRole('link', { name: 'MADRE', exact: true })).toHaveAttribute('href', '/es/madre/');
	await expect(page.locator('.catalog__item')).toHaveCount(9);
	// MADRE va primero con una imagen real; el resto lleva su ícono, no un hueco pendiente.
	await expect(page.locator('.catalog__item').first()).toContainText('MADRE');
	// Siete productos llevan su video de demostración, con póster; los otros dos, su ícono.
	await expect(page.locator('.catalog__item [data-jx-demo] video')).toHaveCount(7);
	await expect(page.locator('.jx-catalog__card > .icon')).toHaveCount(2);
	await expect(page.locator('.catalog__item [data-media-slot]')).toHaveCount(0);
});

test('Jossue AI answers through the Worker, offers a next step and falls back when unavailable', async ({ page }) => {
	const requests: Array<Record<string, unknown>> = [];
	await page.route('**/api/ai', async (route) => {
		requests.push(route.request().postDataJSON());
		await route.fulfill({ json: { ok: true, reply: 'Jossué dirige el ecommerce de WU Nutrition y construyó MADRE.', suggestions: ['¿Qué es MADRE?'], action: 'contact', page: null, leadSaved: false } });
	});
	await page.goto('/es/productos/');
	await page.locator('.jai__launcher').click();
	const panel = page.locator('.jai__panel');
	await expect(panel).toBeVisible();
	await expect(panel).toContainText('Soy una IA');
	await expect(panel.locator('[data-jai-chip]')).toHaveCount(3);
	await page.locator('[data-jai-input]').fill('¿Qué hace Jossué?');
	await page.locator('[data-jai-input]').press('Enter');
	await expect(panel.locator('.jai__msg--me')).toHaveText('¿Qué hace Jossué?');
	await expect(panel.locator('.jai__msg--ai').last()).toContainText('construyó MADRE');
	await expect(panel.locator('.jai__action')).toHaveAttribute('href', '/es/contacto/');
	await expect(panel.locator('[data-jai-chip]')).toHaveText(['¿Qué es MADRE?']);
	expect(requests[0]).toMatchObject({ locale: 'es', page: '/es/productos/', messages: [{ role: 'user', content: '¿Qué hace Jossué?' }] });
	// La conversación sigue al cambiar de página.
	await page.goto('/es/acerca/');
	await page.locator('.jai__launcher').click();
	await expect(page.locator('.jai__msg--me')).toHaveCount(1);
	await page.keyboard.press('Escape');
	await expect(page.locator('.jai__panel')).toBeHidden();

	await page.unroute('**/api/ai');
	await page.route('**/api/ai', (route) => route.fulfill({ status: 503, json: { ok: false, error: 'ai_unavailable' } }));
	await page.locator('.jai__launcher').click();
	await page.locator('[data-jai-chip]').first().click();
	await expect(page.locator('.jai__msg--ai').last()).toContainText('WhatsApp');
	await expect(page.locator('.jai__msg--ai').last().locator('.jai__action')).toHaveAttribute('href', /wa\.me/);
});

test('product detail is bilingual and routes to a contact conversation', async ({ page }) => {
	await page.goto('/es/productos/bloqio-builder/');
	await expect(page.locator('[data-product-detail="bloqio-builder"]')).toBeVisible();
	await expect(page.locator('main h1')).toContainText('Un constructor de páginas con IA');
	await expect(page.locator('main a[data-analytics-event="contact_product"]')).toHaveAttribute('href', '/es/contacto/?producto=bloqio-builder');
	await switchLanguage(page);
	await expect(page).toHaveURL(/\/en\/products\/bloqio-builder\/$/);
	await expect(page.locator('main h1')).toContainText('An AI page builder');
});

for (const slug of ['daniela', 'ahp-plus', 'bloqio-builder', 'miawseo']) {
	test(`${slug} product page explains the product with a loop, an animated scene, limits and an FAQ`, async ({ page }) => {
		await page.goto(`/es/productos/${slug}/`);
		const article = page.locator(`[data-product-detail="${slug}"]`);
		// Héroe del sistema jx: bucle abstracto detrás y titular centrado en un solo h1.
		await expect(page.locator('main h1')).toHaveCount(1);
		await expect(article.locator('.jx-page-hero .jx-loop video')).toHaveAttribute('poster', /\/videos\/hero\/[a-z-]+(-tall)?\.webp$/);
		await expect(article.locator('.jx-hero__title')).toHaveCSS('text-align', 'center');
		await expect(article.locator('[data-jx-demo] video')).toHaveCount(1);
		// Nada de la plantilla vieja: ni barra de capítulos ni escenarios en blanco.
		await expect(page.locator('.chapter-nav, [data-media-slot]')).toHaveCount(0);
		// Información: qué hace, cómo funciona, qué incluye, límites, para quién, preguntas y ficha.
		for (const id of ['pdp-overview', 'pdp-how', 'pdp-included', 'pdp-limits', 'pdp-fit', 'pdp-faq', 'pdp-spec']) await expect(page.locator(`#${id}`)).toHaveCount(1);
		await expect(article.locator('.pdp-tasks > li').first()).toBeAttached();
		expect(await article.locator('.pdp-points > li').count()).toBeGreaterThanOrEqual(6);
		expect(await article.locator('.pdp-limits li').count()).toBeGreaterThanOrEqual(8);
		expect(await article.locator('.jx-bots__faq-list details').count()).toBeGreaterThanOrEqual(5);
		expect(await article.locator('.pdp-spec > div').count()).toBeGreaterThanOrEqual(6);
		const faqSchema = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) => nodes.map((node) => node.textContent ?? '').find((text) => text.includes('FAQPage')));
		expect(faqSchema, 'FAQPage en datos estructurados').toBeTruthy();
		// Los botones del héroe tienen área táctil y espacio propio.
		for (const button of await article.locator('.jx-page-hero .jx-btn').all()) {
			const box = await button.boundingBox();
			if (box && box.width > 0) expect(box.height, 'botón con área táctil').toBeGreaterThanOrEqual(44);
		}
	});

	test(`${slug} animated scene follows the steps and can be controlled`, async ({ page }) => {
		await page.goto(`/es/productos/${slug}/`);
		const how = page.locator('[data-pdp-how]');
		await how.scrollIntoViewIfNeeded();
		await expect(how.locator('[data-pdp-step]')).toHaveCount(4);
		await expect(how.locator('[data-pdp-step="1"]')).toHaveAttribute('aria-pressed', 'true');
		// Elegir un paso detiene el avance solo y muestra ese paso.
		await how.locator('[data-pdp-step="3"]').click();
		await expect(how.locator('[data-pdp-step="3"]')).toHaveAttribute('aria-pressed', 'true');
		await expect(how.locator('[data-pdp-step="1"]')).toHaveAttribute('aria-pressed', 'false');
		await expect(how).toHaveCSS('--step', '3');
		await expect(how.locator('[data-pdp-toggle]')).toHaveAttribute('aria-pressed', 'true');
		await page.waitForTimeout(5400);
		await expect(how.locator('[data-pdp-step="3"]')).toHaveAttribute('aria-pressed', 'true');
		// El texto de todos los pasos está en la página (lectores de pantalla y buscadores).
		for (const text of await how.locator('.pdp-how__text').allTextContents()) expect(text.length).toBeGreaterThan(60);
	});
}

test('scene steps stay still with reduced motion', async ({ browser }) => {
	const context = await browser.newContext({ reducedMotion: 'reduce' });
	const page = await context.newPage();
	await page.goto('/es/productos/daniela/');
	const how = page.locator('[data-pdp-how]');
	await how.scrollIntoViewIfNeeded();
	await page.waitForTimeout(5600);
	await expect(how.locator('[data-pdp-step="1"]')).toHaveAttribute('aria-pressed', 'true');
	await expect(how.locator('[data-pdp-toggle]')).toBeHidden();
	await context.close();
});

test('header keeps navigation focused and mobile menu supports Escape', async ({ page }) => {
	await page.goto('/es/');
	await expect(page.locator('.global-nav__links a')).toHaveCount(4);
	await expect(page.locator('.global-nav__links a[href="/es/contacto/"]')).toContainText('Contacto');
	// El sitio usa el sistema de madre.run: fondo #050605 y MADRE como producto estrella.
	await expect(page.locator('body')).toHaveAttribute('data-site-theme', 'default');
	await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(5, 6, 5)');
	await expect(page.locator('[data-home="madre"]')).toBeVisible();
	// Cristal: el fondo translúcido y el desenfoque viven en ::before, no en la cabecera, para
	// que el panel fijo del menú no quede atrapado dentro de ella.
	const glass = () => page.locator('.global-nav').evaluate((element) => {
		const layer = getComputedStyle(element, '::before');
		return { header: getComputedStyle(element).backdropFilter, blur: layer.backdropFilter, color: layer.backgroundColor };
	});
	const topGlass = await glass();
	expect(topGlass.header).toBe('none');
	expect(topGlass.blur).toContain('blur');
	expect(topGlass.color).toMatch(/^rgba\(5, 6, 5, 0\.\d+\)$/);
	// Regla de apple.com: el menú global se va con el scroll y, al pasar el hero, baja la burbuja.
	await expect(page.locator('[data-site-bubble]')).not.toHaveClass(/is-revealed/);
	await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
	await expect(page.locator('[data-site-bubble]')).toHaveClass(/is-revealed/);
	await expect.poll(async () => (await page.locator('.site-bubble__wrap').boundingBox())?.y ?? -1).toBeGreaterThanOrEqual(0);
	expect((await page.locator('.site-bubble__wrap').boundingBox())?.y ?? 99).toBeLessThan(20);
	expect((await page.locator('.global-nav').boundingBox())?.y ?? 0).toBeLessThan(0);
	await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
	await expect(page.locator('[data-site-bubble]')).not.toHaveClass(/is-revealed/);

	const viewport = page.viewportSize();
	if (viewport && viewport.width < 928) {
		await expect(page.locator('.global-nav__trigger')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
		await page.locator('.global-nav__trigger').click();
		await expect(page.locator('.global-nav__drawer')).toHaveAttribute('open', '');
		await expect(page.locator('.global-nav__sheet')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Productos', exact: true }).last()).toBeVisible();
		await expect(page.getByRole('link', { name: 'Contacto', exact: true }).last()).toBeVisible();
		const menuBox = await page.locator('.global-nav__sheet').boundingBox();
		expect(menuBox?.height ?? 0, 'el panel del menú ocupa la pantalla').toBeGreaterThan((viewport.height ?? 0) * 0.6);
		expect(menuBox?.width ?? 0).toBeGreaterThanOrEqual((viewport.width ?? 0) - 1);
		await page.keyboard.press('Escape');
		await expect(page.locator('.global-nav__drawer')).not.toHaveAttribute('open', '');
	}

	// Servicios lleva a la página de chatbots desde la tarjeta de IA.
	await page.goto('/es/servicios/');
	await expect(page.locator('main a[href="/es/productos/chatbots/"]').first()).toBeVisible();
});

test('commercial pages share one hierarchy and CTAs keep usable spacing', async ({ page }) => {
	await page.goto('/es/productos/');
	const catalogTitle = page.locator('.jx-hero__title');
	await expect(catalogTitle).toHaveCSS('text-align', 'center');
	const catalogCenters = await page.evaluate(() => [...document.querySelectorAll('.jx-hero__title, .jx-hero__lede')].map((element) => { const rect = element.getBoundingClientRect(); return rect.left + rect.width / 2; }));
	expect(Math.abs(catalogCenters[0] - catalogCenters[1]), 'título y entradilla comparten el eje').toBeLessThan(2);
	for (const button of await page.locator('.jx-catalog .jx-btn').all()) {
		const box = await button.boundingBox();
		if (box && box.width > 0) expect(box.height, 'botón con área táctil').toBeGreaterThanOrEqual(44);
	}

	for (const route of ['/es/productos/bloqio-builder/', '/es/productos/daniela/']) {
		await page.goto(route);
		const hero = page.locator('main .jx-page-hero').first();
		const centers = await hero.evaluate((element) => [...element.querySelectorAll('.jx-hero__title, .jx-hero__lede')].map((node) => { const rect = node.getBoundingClientRect(); return rect.left + rect.width / 2; }));
		expect(Math.abs(centers[0] - centers[1]), `${route}: título y entradilla comparten el eje`).toBeLessThan(2);
		await expect(hero.locator('.jx-hero__title')).toHaveCSS('text-align', 'center');

		const firstCta = hero.locator('.jx-actions .jx-btn').first();
		const spacing = await firstCta.evaluate((element) => {
			const style = getComputedStyle(element);
			return { paddingLeft: Number.parseFloat(style.paddingLeft), paddingRight: Number.parseFloat(style.paddingRight), height: element.getBoundingClientRect().height };
		});
		expect(spacing.paddingLeft, `${route}: CTA left padding`).toBeGreaterThanOrEqual(18);
		expect(spacing.paddingRight, `${route}: CTA right padding`).toBeGreaterThanOrEqual(18);
		expect(spacing.height, `${route}: CTA touch target`).toBeGreaterThanOrEqual(44);

		await expect(page.locator('.jx-close__title')).toHaveCSS('text-align', 'center');
	}

	// Breadcrumbs y burbuja: las fichas ya no llevan submenú propio; sus secciones se leen en orden
	// y, al pasar el héroe, baja la burbuja de navegación de todo el sitio.
	await page.goto('/es/productos/daniela/');
	await expect(page.locator('.breadcrumbs li')).toHaveText(['Inicio', 'Productos', 'Daniela']);
	await expect(page.locator('.breadcrumbs a').nth(1)).toHaveAttribute('href', '/es/productos/');
	await expect(page.locator('.chapter-nav')).toHaveCount(0);
	await expect(page.locator('.action-bar')).toHaveCount(0);
	const sectionOrder = await page.evaluate(() => ['pdp-overview', 'pdp-how', 'pdp-included', 'pdp-limits', 'pdp-fit', 'pdp-faq', 'pdp-spec', 'pdp-close'].map((id) => document.getElementById(id)?.getBoundingClientRect().top ?? -1));
	expect(sectionOrder.every((top, index) => index === 0 || top > sectionOrder[index - 1]), 'las secciones siguen el orden de la ficha').toBe(true);
	await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
	await expect(page.locator('[data-site-bubble]')).toHaveClass(/is-revealed/);
	expect((await page.locator('.site-bubble__wrap').boundingBox())?.y ?? 99).toBeLessThan(20);
	await page.goto('/es/trabajo/wu-nutrition/');
	await expect(page.locator('.breadcrumbs li')).toHaveText(['Inicio', 'Casos', 'WU Nutrition']);
});

test('Chatbots page sells with real demos, security, costs and a working calculator', async ({ page }) => {
	await page.goto('/es/productos/chatbots/');
	await expect(page.locator('main h1')).toContainText('Chatbots con IA que atienden');
	await expect(page.locator('.breadcrumbs li')).toHaveText(['Inicio', 'Productos', 'Chatbots inteligentes']);
	await expect(page.locator('[data-bot="daniela"] a[href="https://wunutrition.com/"]')).toBeVisible();
	await expect(page.locator('[data-bot="jossue-ai"] [data-ai-open]')).toBeVisible();
	await expect(page.locator('.jx-bots__table').first().locator('tbody tr')).toHaveCount(7);
	await expect(page.locator('.jx-bots__prices tbody tr')).toHaveCount(7);
	await expect(page.locator('main')).toContainText('30 de septiembre de 2026');
	// La calculadora responde a los números del visitante.
	const api = page.locator('[data-out="api"]');
	const before = await api.textContent();
	await page.locator('[data-bot-calc] input[name="conversations"]').fill('5000');
	await expect(api).not.toHaveText(before ?? '');
	await expect(page.locator('[data-out="savings"]')).toContainText('$');
	// Preguntas frecuentes para buscadores y asistentes de IA.
	const faq = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) => nodes.map((node) => node.textContent ?? '').find((text) => text.includes('FAQPage')));
	expect(faq).toBeTruthy();
	await page.goto('/es/contacto/?producto=chatbots');
	await expect(page.locator('#cf-project')).toHaveValue('Un asistente con IA que conteste a mis clientes');
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
	await expect(page.locator('main h1')).toHaveText('Tiendas en línea y chatbotsque venden y que tu equipo puede manejar.');
	// MADRE, producto estrella: marca, video que se puede pausar, instalación y showcase.
	await expect(page.locator('[data-home="madre-wordmark"]')).toHaveAccessibleName('MADRE');
	await expect(page.locator('[data-home="madre"] [data-jx-demo] video')).toHaveJSProperty('muted', true);
	await expect(page.locator('[data-home="madre"] [data-jx-demo-toggle]')).toBeVisible();
	// AHP+ y Daniela, destacados, cada uno con su demo y su enlace a la ficha.
	await expect(page.locator('[data-home-featured]')).toHaveCount(4);
	await expect(page.locator('[data-home-featured] [data-jx-demo] video')).toHaveCount(4);
	await expect(page.locator('[data-home-featured="bloqio-builder"] a[href="/es/productos/bloqio-builder/"]')).toBeVisible();
	await expect(page.locator('[data-home-featured="ahp-plus"] a[href="/es/productos/ahp-plus/"]')).toBeVisible();
	await expect(page.locator('[data-home-featured="daniela"] a[href="/es/productos/daniela/"]')).toBeVisible();
	await expect(page.locator('#madre a[href="https://madre.run/"]')).toBeVisible();
	await expect(page.locator('#madre a[href="/es/madre/"]')).toBeVisible();
	await expect(page.locator('[data-home="showcase"] video')).toHaveCount(3);
	await expect(page.locator('[data-home="products"] > li')).toHaveCount(4);
	// Consultoría: tres formatos y la llamada a agendar un diagnóstico.
	await expect(page.locator('[data-home="consulting"] .jx-consult__formats > li')).toHaveCount(3);
	await expect(page.locator('[data-home="consulting"] a[href="/es/contacto/?producto=consultoria"]')).toBeVisible();
	await page.goto('/es/contacto/?producto=consultoria');
	await expect(page.locator('#cf-project')).toHaveValue('Consultoría o diagnóstico');
	await page.goto('/es/');
	await expect(page.locator('[data-home="products"] [data-media-slot]')).toHaveCount(0);
	await expect(page.locator('[data-home-case]')).toHaveCount(4);
	await expect(page.locator('[data-home="method"] > li')).toHaveCount(4);
	await expect(page.locator('main [data-media-slot]')).toHaveCount(0);
	const closingTitle = page.locator('[data-home="close"] h2');
	const closingCta = page.locator('[data-home="close"] .jx-btn').first();
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
	const heroBox = await page.locator('.jx-page-hero').boundingBox();
	expect(heroBox?.x ?? -1).toBe(0);
	expect(Math.abs((heroBox?.width ?? 0) - (viewport?.width ?? 0))).toBeLessThan(1);
	await expect(page.locator('.jx-page-hero h1')).toHaveCSS('color', 'rgb(238, 241, 234)');
	await expect(page.locator('.jx-page-hero h1')).toHaveCSS('text-align', 'center');
	// Loop abstracto detrás del titular, decorativo y con póster propio.
	await expect(page.locator('[data-hero="work"] .jx-loop')).toHaveAttribute('aria-hidden', 'true');
	await expect(page.locator('[data-hero="work"] .jx-loop video')).toHaveAttribute('poster', /\/videos\/hero\/work(-tall)?\.webp$/);
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
	// Logos reales en una sola tinta, cada uno con el nombre de la marca como texto alternativo.
	await expect(page.locator('.brand-strip .brand-logo img')).toHaveCount(7);
	for (const name of ['HP Inc.', 'WU Nutrition', 'Come Verde', 'Farmalisto', 'La Carnicería Virtual', 'Bloqio', 'AHP+']) await expect(page.locator(`.brand-strip img[alt="${name}"]`)).toBeVisible();
	await expect(page.locator('[data-ai-invite="about"] [data-ai-ask]')).toHaveCount(3);
	// Retrato real y los cuatro demos de lo que construí.
	await expect(page.locator('.jx-about__portrait img')).toBeVisible();
	await expect(page.locator('[data-about-product] [data-jx-demo] video')).toHaveCount(5);
	await expect(page.locator('main [data-media-slot]')).toHaveCount(0);
	await expect(page.locator('main')).not.toContainText('DUMO');
	await expect(page.locator('main')).not.toContainText('57 usuarios');
	await expect(page.locator('main')).not.toContainText('45 páginas');
	await expect(page.locator('main')).not.toContainText('Fuentes:');
	await expect(page.locator('main a[href*="linkedin.com/in/jossue-alcala"]')).toBeVisible();
});

test('project gallery shows every frame as a real, described screenshot', async ({ page }) => {
	await page.goto('/es/trabajo/bloqio-cro-apps/');
	await expect(page.locator('main h1')).toHaveText('Bloqio CRO Apps — Prometeo / Hermes');
	await expect(page.locator('main')).toContainText('Prometeo');
	await expect(page.locator('main')).toContainText('Hermes');
	await expect(page.locator('.evidence-shot')).toHaveCount(11);
	await expect(page.locator('.evidence-shot img')).toHaveCount(11);
	await expect(page.locator('main [data-media-slot]')).toHaveCount(0);
	for (const alt of await page.locator('.evidence-shot img').evaluateAll((images) => images.map((image) => image.getAttribute('alt') ?? ''))) expect(alt.length).toBeGreaterThan(10);
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
		await expect(page.locator('.jx-page-hero .jx-label')).toContainText(project.categoryEs);
		if (project.media > 0) {
			await expect(page.locator('main')).toContainText('Explora el proyecto');
			await expect(page.locator('main')).not.toContainText('La experiencia en contexto.');
		}
		// La portada del caso es la captura real del proyecto, no un recuadro generado.
		await expect(page.locator('.case-cover [data-case-cover] img')).toBeVisible();
		await expect(page.locator('.case-cover .portfolio-visual')).toHaveCount(0);
		await expect(page.locator('main')).not.toContainText('Placeholder');
		await expect(page.locator('main [data-media-slot]')).toHaveCount(0);
		if (project.slug === 'ahp-plus') {
			await expect(page.locator('main')).toContainText('AHP+ 1.4.1');
			await expect(page.locator('main')).toContainText('.ahp/');
			await expect(page.locator('main')).not.toContainText('AHP+ 1.0');
			await expect(page.locator('#links a[href="https://github.com/jossuealcacao-exe/ahp_plus"]')).toBeVisible();
			await expect(page.locator('#links a[href="https://www.npmjs.com/package/@jossuealcala/ahp-plus"]')).toBeVisible();
			expect(await page.locator('#delivery .case-deliver li').count()).toBeGreaterThanOrEqual(4);
			// Sistema de madre.run: botones marfil con tinta oscura, cierre sobre grafito, pie en la banda.
			await expect(page.locator('#command-atlas .jx-btn--primary')).toHaveCSS('background-color', 'rgb(236, 230, 216)');
			await expect(page.locator('#command-atlas .jx-btn--primary')).toHaveCSS('color', 'rgb(18, 17, 14)');
			await expect(page.locator('.jx-close__title')).toHaveCSS('color', 'rgb(238, 241, 234)');
			await expect(page.locator('.jx-close .jx-btn--primary')).toHaveCSS('color', 'rgb(18, 17, 14)');
			await expect(page.locator('.site-footer__wordmark')).toHaveCSS('color', 'rgb(238, 241, 234)');
			await expect(page.locator('.site-footer__group h2').first()).toHaveCSS('color', 'rgb(143, 151, 140)');
		}
		// Mismo sistema que las fichas de producto: bucle abstracto, índice del caso, entregables con
		// ícono, otros tres casos y cierre; nada de la plantilla editorial anterior.
		await expect(page.locator('main h1')).toHaveCount(1);
		await expect(page.locator('.jx-page-hero .jx-loop video')).toHaveAttribute('poster', /\/videos\/hero\/[a-z-]+(-tall)?\.webp$/);
		await expect(page.locator('.jx-page-hero .jx-hero__title')).toHaveCSS('text-align', 'center');
		expect(await page.locator('.case-toc a').count()).toBeGreaterThanOrEqual(6);
		expect(await page.locator('#delivery .case-deliver li svg').count()).toBeGreaterThanOrEqual(3);
		await expect(page.locator('.jx-proofs > li')).toHaveCount(3);
		await expect(page.locator('.case-intro, .case-grid, .approach-list, .deliverable-grid, .case-cta')).toHaveCount(0);
		await expect(page.locator('#technology .stack-list li').first()).toBeVisible();
		await expect(page.locator('#technology .stack-list img').first()).toBeVisible();
		// Los íconos de las marcas se pintan en marfil (filtro #jx-ivory) para leerse sobre el fondo oscuro.
		await expect(page.locator('#technology .stack-list img').first()).toHaveCSS('filter', /jx-ivory/);
		await expect(page.locator('.evidence-shot')).toHaveCount(project.media);
		await expect(page.locator('.evidence-gallery img')).toHaveCount(project.media);
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
		await expect(page.locator('.jx-page-hero .jx-label')).toContainText(project.categoryEn);
		await expect(page.locator('.case-cover [data-case-cover] img')).toBeVisible();
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

test('case page shows reading progress and its index jumps to the sections', async ({ page }) => {
	await page.goto('/es/trabajo/wu-nutrition/');
	const bar = page.locator('.case-progress i');
	await expect(bar).toHaveCSS('transform', /matrix\(0, 0, 0, 1|none/);
	await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
	await expect.poll(async () => bar.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).a)).toBeGreaterThan(0.95);
	await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
	// Cada enlace del índice lleva a una sección que existe, en el mismo orden de la página.
	const targets = await page.locator('.case-toc a').evaluateAll((links) => links.map((link) => (link as HTMLAnchorElement).hash));
	const tops = await page.evaluate((ids) => ids.map((id) => document.querySelector(id)?.getBoundingClientRect().top ?? -1), targets);
	expect(tops.every((top) => top !== -1), 'todas las secciones del índice existen').toBe(true);
	expect(tops.every((top, index) => index === 0 || top > tops[index - 1]), 'el índice sigue el orden de la página').toBe(true);
});

test('MADRE keeps a disciplined reading edge and never overflows the viewport', async ({ page }) => {
	await page.goto('/es/madre/');
	const titleBox = await page.locator('.jm-hero__title').boundingBox();
	const ledeBox = await page.locator('.jm-hero__lede').boundingBox();
	expect(titleBox).not.toBeNull();
	expect(ledeBox).not.toBeNull();
	const center = (box: typeof titleBox) => (box?.x ?? 0) + (box?.width ?? 0) / 2;
	expect(Math.abs(center(titleBox) - center(ledeBox))).toBeLessThan(2);
	await expect(page.locator('.jm-hero__title')).toHaveCSS('text-align', 'center');
	const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
	expect(hasHorizontalOverflow).toBe(false);
});

test('every former image slot now shows a real, described image', async ({ page }) => {
	// Un slot sin id, sin proporcion o sin etiqueta es un hueco que nadie
	// sabra rellenar despues. Este guard existe para que la ronda 2 no
	// tenga que adivinar nada.
	// Ya no quedan campos vacíos: cada lugar reservado muestra su imagen real, con texto
	// alternativo y un archivo que sí carga.
	for (const route of ['/es/', '/es/productos/', '/es/productos/bloqio-builder/', '/es/productos/desarrollo-web/', '/es/madre/', '/es/trabajo/wu-nutrition/']) {
		await page.goto(route);
		await expect(page.locator('main [data-media-slot]'), `${route} no debe tener placeholders`).toHaveCount(0);
		const images = page.locator('main [data-media-image] img');
		for (let index = 0; index < (await images.count()); index += 1) {
			const image = images.nth(index);
			await image.scrollIntoViewIfNeeded();
			await expect(image).toHaveAttribute('alt', /\S{3,}/);
			await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
		}
	}
});

test('the call scheduler shows free times, books a call and lets the visitor cancel it', async ({ page }) => {
	const tuesday = Date.parse('2026-10-06T16:00:00Z'); // martes 10:00 en Guadalajara
	const slots = { ok: true, timezone: 'America/Mexico_City', callMinutes: 10, days: [{ date: '2026-10-06', slots: [tuesday, tuesday + 15 * 60_000] }, { date: '2026-10-10', slots: [Date.parse('2026-10-10T15:00:00Z')] }] };
	let booked: Record<string, unknown> | null = null;
	await page.route('**/api/booking/slots', (route) => route.fulfill({ json: slots }));
	await page.route('**/api/booking', async (route) => {
		booked = route.request().postDataJSON();
		await route.fulfill({ status: 201, json: { ok: true, booking: { id: 'CALL-0123456789abcdef', token: 'tok', slot: tuesday + 15 * 60_000, end: tuesday + 25 * 60_000, when: 'martes 6 de octubre a las 10:15', phone: '+52 33 1234 5678' } } });
	});
	await page.route('**/api/booking/cancel', (route) => route.fulfill({ json: { ok: true, status: 'cancelled' } }));
	await page.goto('/es/agenda/?origen=auditoria');
	await page.evaluate(() => localStorage.removeItem('jossue-booking'));
	await expect(page.locator('main h1')).toContainText('Agenda una llamada conmigo.');
	await expect(page.locator('.jx-booking__day')).toHaveCount(2);
	await expect(page.locator('.jx-booking__time')).toHaveCount(2);
	await page.locator('.jx-booking__time').nth(1).click();
	await expect(page.locator('[data-booking-chosen]')).toHaveText('martes 6 de octubre a las 10:15');
	await page.fill('#bk-name', 'Ana López');
	await page.fill('#bk-email', 'ana@tienda.mx');
	await page.fill('#bk-phone', '33 1234 5678');
	await page.locator('[data-booking-form] input[name=consent]').check();
	await page.locator('[data-booking-submit]').click();
	await expect(page.locator('[data-booking-done]')).toBeVisible();
	await expect(page.locator('[data-booking-done-text]')).toContainText('martes 6 de octubre a las 10:15');
	await expect(page.locator('[data-booking-ics]')).toHaveAttribute('href', '/api/booking/CALL-0123456789abcdef.ics?t=tok');
	expect(booked).toMatchObject({ slot: tuesday + 15 * 60_000, name: 'Ana López', phone: '33 1234 5678', consent: true, source: 'auditoria', locale: 'es' });
	// La cita se queda en el navegador y se puede cancelar.
	await page.reload();
	await expect(page.locator('[data-booking-done]')).toBeVisible();
	page.once('dialog', (dialog) => dialog.accept());
	await page.locator('[data-booking-cancel]').click();
	await expect(page.locator('[data-booking-flow]')).toBeVisible();
	await expect(page.locator('[data-booking-status]')).toContainText('Cancelé tu llamada');
	const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
	expect(overflow).toBe(false);
});

test('the home hero is a three-slide carousel: ecommerce and AI, the express audit and MADRE', async ({ page }) => {
	await page.goto('/es/');
	const hero = page.locator('[data-hero-slides]');
	await expect(hero.locator('[data-slide]')).toHaveCount(3);
	await expect(page.locator('main h1')).toHaveCount(1);
	await expect(hero.locator('[data-slide="0"]')).toHaveClass(/is-active/);
	await expect(hero.locator('[data-slide="1"]')).toHaveAttribute('aria-hidden', 'true');
	await expect(hero.locator('[data-slide-bg] video')).toHaveCount(3);
	await hero.locator('[data-slide-dot="1"]').click();
	await expect(hero.locator('[data-slide="1"]')).toHaveClass(/is-active/);
	await expect(hero.locator('[data-slide="0"]')).toHaveJSProperty('inert', true);
	await expect(hero.locator('[data-slide="1"] h2')).toContainText('¿Tu sitio pierde ventas?');
	await expect(hero.locator('[data-slide="1"] [data-ai-audit]')).toBeVisible();
	await expect(hero.locator('[data-slide="1"] a[href="/es/agenda/?origen=inicio"]')).toBeVisible();
	await expect(hero.locator('[data-slide-bg="1"]')).toHaveClass(/is-active/);
	await hero.locator('[data-slide-dot="2"]').click();
	await expect(hero.locator('[data-slide="2"] h2')).toContainText('Programa con MADRE.');
	await expect(hero.locator('[data-slide="2"] a[href="https://madre.run/#instalar"]')).toBeVisible();
	await hero.locator('[data-campaign-open]').click();
	await expect(page.locator('[data-campaign-dialog]')).toBeVisible();
	await expect(page.locator('[data-campaign-video] source').first()).toHaveAttribute('src', '/videos/madre/madre-campaign-es-mobile.webm');
	await page.locator('[data-campaign-close]').click();
	await expect(page.locator('[data-campaign-dialog]')).toBeHidden();
	const pause = hero.locator('[data-slide-pause]');
	await pause.click();
	await expect(pause).toHaveAttribute('aria-pressed', 'true');
	await expect(hero).toHaveClass(/is-paused/);
	// Las cifras y las marcas quedan fuera de las diapositivas.
	await expect(hero.locator('.jx-hero--foot .jx-facts')).toBeVisible();
	const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
	expect(overflow).toBe(false);
});

test('the express audit is delivered in the chat: personal, three pains, no full report, and the call as next step', async ({ page }) => {
	const done = {
		ok: true, id: 'AE-0123456789abcdef0123', status: 'done', domain: 'tienda.mx', url: 'https://tienda.mx/', score: 62, error: null,
		findings: [
			{ title: 'La portada tarda 4,1 s en celular', severity: 'high', business_effect: 'Quien llega desde un anuncio se va antes de ver un precio.', recommendation: 'Optimizar la imagen principal', category: 'Velocidad' },
			{ title: '28 de 62 botones miden menos de 44 px', severity: 'medium', business_effect: 'Con el pulgar se toca el botón equivocado.', recommendation: '', category: 'Zonas táctiles' },
			{ title: 'A Google le faltan datos de tus productos', severity: 'low', business_effect: 'Tus productos salen sin precio en Google.', recommendation: 'Agregar datos estructurados', category: 'Búsqueda' },
		],
	};
	await page.route('**/api/audit', (route) => route.fulfill({ status: 202, json: { ...done, status: 'running', score: null, findings: [] } }));
	await page.route(/\/api\/audit\/AE-[\w]+/, (route) => route.fulfill({ json: done }));
	await page.goto('/es/');
	await page.evaluate(() => sessionStorage.clear());
	await page.reload();
	await page.locator('[data-ai-audit]').first().click();
	const panel = page.locator('.jai__panel');
	await expect(panel.locator('[data-jai-greeting]')).toBeHidden();
	await panel.locator('input[name="name"]').fill('Ana López');
	await panel.locator('input[name="email"]').fill('ana@tienda.mx');
	await panel.locator('input[name="consent"]').check();
	await panel.locator('.jai__audit-form [type=submit]').click();
	await panel.locator('input[name="url"]').fill('tienda.mx');
	await panel.locator('input[name="url"]').press('Enter');
	const card = panel.locator('.jai__audit--done');
	await expect(card).toBeVisible({ timeout: 15000 });
	await expect(card.locator('.jai__audit-hello')).toHaveText('Ana, revisé tienda.mx como lo ve un cliente desde su celular.');
	await expect(card.locator('.jai__audit-verdict')).toHaveText('Se te están yendo ventas por aquí.');
	await expect(card.locator('.jai__pain')).toHaveCount(3);
	await expect(card).not.toContainText('Optimizar la imagen principal');
	await expect(card.locator('a[href*="apex"], a[href$=".pdf"]')).toHaveCount(0);
	await expect(card.locator('a[href="/es/agenda/?origen=auditoria"]')).toBeVisible();
	await expect(panel.locator('[data-jai-greeting]')).toBeHidden();
});

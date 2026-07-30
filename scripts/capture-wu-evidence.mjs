/* global document, window */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium, devices } from '@playwright/test';

const origin = 'https://wunutrition.com';
const outputDirectory = path.resolve('src/assets/cases/wu-nutrition');
const device = devices['iPhone 14 Pro Max'];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
	...device,
	locale: 'es-MX',
	timezoneId: 'America/Mexico_City',
	colorScheme: 'light',
	reducedMotion: 'reduce',
});
const page = await context.newPage();

page.on('pageerror', (error) => console.warn(`[pageerror] ${error.message}`));

async function visit(pathname) {
	const response = await page.goto(new URL(pathname, origin).href, {
		waitUntil: 'domcontentloaded',
		timeout: 45_000,
	});
	if (!response?.ok()) {
		throw new Error(`Could not load ${pathname}: ${response?.status() ?? 'no response'}`);
	}
	await page.addStyleTag({
		content: `*, *::before, *::after {
			animation-duration: 0.001ms !important;
			animation-delay: 0ms !important;
			transition-duration: 0.001ms !important;
			scroll-behavior: auto !important;
		}`,
	});
	await page.waitForTimeout(2_500);
}

async function dismissOverlays() {
	await page.keyboard.press('Escape');
	const closeNames = /cerrar|close|ocultar|no gracias|continuar sin|ahora no|×|✕/i;
	for (const button of await page.getByRole('button').all()) {
		const name = (await button.getAttribute('aria-label')) ?? (await button.textContent()) ?? '';
		if (closeNames.test(name) && (await button.isVisible())) {
			await button.click({ timeout: 2_000 }).catch(() => undefined);
		}
	}
}

async function capture(name) {
	const target = path.join(outputDirectory, `${name}.png`);
	await page.screenshot({ path: target, fullPage: false, animations: 'disabled' });
	console.log(`${name}: ${page.url()} (${device.viewport.width}×${device.viewport.height} CSS px)`);
}

try {
	await visit('/');
	const danielaButton = page.getByRole('button', { name: /hablar con daniela, asesora wu/i });
	if (await danielaButton.isVisible().catch(() => false)) {
		await danielaButton.click({ force: true });
		await page.waitForTimeout(700);
	}
	await capture('daniela-assistant-mobile');
	await dismissOverlays();
	await page.evaluate(() => window.scrollTo(0, 0));
	await capture('home-mobile');

	await visit('/collections/all');
	await dismissOverlays();
	await page.evaluate(() => window.scrollTo(0, 0));
	await capture('collection-mobile');

	await visit('/products/querida');
	await dismissOverlays();
	await page.evaluate(() => window.scrollTo(0, 0));
	await capture('product-mobile');
	await page.evaluate(() => window.scrollTo(0, Math.min(1100, document.body.scrollHeight - window.innerHeight)));
	await page.waitForTimeout(800);
	await capture('product-sticky-mobile');
} finally {
	await context.close();
	await browser.close();
}

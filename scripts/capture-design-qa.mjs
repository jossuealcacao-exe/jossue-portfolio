import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const baseUrl = process.env.QA_BASE_URL ?? 'http://localhost:4322';
const outputDirectory = path.resolve('audit/design-system-2026-09-24');

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
	for (const viewport of [
		{ name: 'mobile', width: 390, height: 844 },
		{ name: 'desktop', width: 1440, height: 900 },
	]) {
		const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });

		await page.goto(`${baseUrl}/es/`, { waitUntil: 'networkidle' });
		await page.screenshot({
			path: path.join(outputDirectory, `home-${viewport.name}.png`),
			fullPage: true,
			animations: 'disabled',
		});

		await page.goto(`${baseUrl}/es/productos/`, { waitUntil: 'networkidle' });
		await page.screenshot({
			path: path.join(outputDirectory, `catalog-${viewport.name}.png`),
			fullPage: false,
			animations: 'disabled',
		});

		await page.goto(`${baseUrl}/es/productos/desarrollo-web/`, { waitUntil: 'networkidle' });
		await page.screenshot({
			path: path.join(outputDirectory, `product-${viewport.name}.png`),
			fullPage: false,
			animations: 'disabled',
		});

		if (viewport.name === 'mobile') {
			await page.locator('.global-nav__trigger').click();
			await page.screenshot({
				path: path.join(outputDirectory, 'menu-mobile.png'),
				fullPage: false,
				animations: 'disabled',
			});
		}

		await page.close();
	}
} finally {
	await browser.close();
}

console.log(`Design QA captures written to ${outputDirectory}`);

/* eslint-disable no-undef -- page callbacks execute inside Playwright */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const baseUrl = process.env.QA_BASE_URL ?? 'http://localhost:4322';
const outputDirectory = path.resolve('audit/home-carousel-mesh-2026-09-25');
const results = [];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
	for (const viewport of [
		{ name: 'mobile', width: 390, height: 844 },
		{ name: 'desktop', width: 1440, height: 900 },
	]) {
		const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
		const consoleErrors = [];
		page.on('console', (message) => {
			if (message.type() === 'error') consoleErrors.push(message.text());
		});
		page.on('pageerror', (error) => consoleErrors.push(error.message));

		await page.goto(`${baseUrl}/es/`, { waitUntil: 'networkidle' });
		await page.screenshot({ path: path.join(outputDirectory, `hero-${viewport.name}.png`), animations: 'disabled' });

		await page.locator('[data-flagship-control]').nth(1).click();
		await page.screenshot({ path: path.join(outputDirectory, `hero-slide-02-${viewport.name}.png`), animations: 'disabled' });

		const mesh = page.locator('#productos');
		await mesh.scrollIntoViewIfNeeded();
		await mesh.screenshot({ path: path.join(outputDirectory, `mesh-${viewport.name}.png`), animations: 'disabled' });

		const computed = await page.evaluate(({ name, width }) => {
			const carousel = document.querySelector('[data-flagship-carousel]');
			const list = document.querySelector('.product-index__list');
			return {
				viewport: name,
				width,
				overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
				activeSlides: document.querySelectorAll('[data-flagship-slide].is-active').length,
				loadedImages: [...document.querySelectorAll('[data-flagship-slide] img')].filter((image) => image.complete && image.naturalWidth > 0).length,
				carouselWidth: Math.round(carousel?.getBoundingClientRect().width ?? 0),
				meshColumns: list ? getComputedStyle(list).gridTemplateColumns.split(' ').length : 0,
				meshItems: [...document.querySelectorAll('.product-index__item')].map((item) => {
					const box = item.getBoundingClientRect();
					return { width: Math.round(box.width), column: getComputedStyle(item).gridColumn };
				}),
			};
		}, { name: viewport.name, width: viewport.width });
		results.push({ ...computed, consoleErrors });

		await page.close();
	}
} finally {
	await browser.close();
}

await writeFile(path.join(outputDirectory, 'computed.json'), `${JSON.stringify(results, null, 2)}\n`);
console.log(`Home carousel and mesh QA written to ${outputDirectory}`);

// Captura de evidencia de las fichas de producto: héroe en escritorio y teléfono y la escena de
// «Cómo funciona» en sus cuatro pasos. Necesita el sitio corriendo (QA_BASE_URL, por defecto
// http://localhost:4321). Escribe en audit/product-pages-2026-09-30/.
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const baseUrl = process.env.QA_BASE_URL ?? 'http://localhost:4321';
const outputDirectory = path.resolve('audit/product-pages-2026-09-30');
const products = ['daniela', 'ahp-plus', 'bloqio-builder', 'miawseo'];
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
	for (const view of [
		{ name: 'desktop', width: 1440, height: 900 },
		{ name: 'mobile', width: 390, height: 844 },
	]) {
		const context = await browser.newContext({ viewport: { width: view.width, height: view.height } });
		const page = await context.newPage();
		for (const slug of products) {
			await page.goto(`${baseUrl}/es/productos/${slug}/`, { waitUntil: 'networkidle' });
			await page.waitForTimeout(1500);
			await page.screenshot({ path: path.join(outputDirectory, `${slug}-${view.name}-hero.png`) });
			if (view.name !== 'desktop') continue;
			const how = page.locator('[data-pdp-how]');
			await how.scrollIntoViewIfNeeded();
			for (let step = 1; step <= 4; step += 1) {
				await how.locator(`[data-pdp-step="${step}"]`).click();
				await page.waitForTimeout(1100);
				await page.locator('.pdp-how__stage').screenshot({ path: path.join(outputDirectory, `${slug}-scene-step${step}.png`) });
			}
		}
		await context.close();
	}
} finally {
	await browser.close();
}
console.log(`Product QA captures written to ${outputDirectory}`);

/* eslint-disable no-undef -- callbacks run inside Playwright's browser context */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const baseUrl = process.env.QA_BASE_URL ?? 'http://localhost:4322';
const label = process.env.QA_LABEL ?? 'before';
const outputDirectory = path.resolve(`audit/corrective-2026-09-25/${label}`);

await mkdir(outputDirectory, { recursive: true });

const routes = [
	{ name: 'home', path: '/es/' },
	{ name: 'products', path: '/es/productos/' },
	{ name: 'web-product', path: '/es/productos/desarrollo-web/' },
	{ name: 'work', path: '/es/trabajo/' },
	{ name: 'work-detail', path: '/es/trabajo/come-verde/' },
	{ name: 'about', path: '/es/acerca/' },
	{ name: 'services', path: '/es/servicios/' },
	{ name: 'contact', path: '/es/contacto/' },
	{ name: 'madre', path: '/es/madre/' },
];

const browser = await chromium.launch({ headless: true });
const findings = [];

try {
	for (const viewport of [
		{ name: 'mobile', width: 390, height: 844 },
		{ name: 'desktop', width: 1440, height: 900 },
	]) {
		const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });

		for (const route of routes) {
			await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'networkidle' });
			await page.screenshot({
				path: path.join(outputDirectory, `${route.name}-${viewport.name}-top.png`),
				fullPage: false,
				animations: 'disabled',
			});

			const snapshot = await page.evaluate(() => {
				const rect = (selector) => {
					const element = document.querySelector(selector);
					if (!element) return null;
					const box = element.getBoundingClientRect();
					const style = getComputedStyle(element);
					return {
						selector,
						x: Math.round(box.x * 100) / 100,
						y: Math.round(box.y * 100) / 100,
						width: Math.round(box.width * 100) / 100,
						height: Math.round(box.height * 100) / 100,
						color: style.color,
						backgroundColor: style.backgroundColor,
						borderRadius: style.borderRadius,
						overflowX: style.overflowX,
					};
				};

				return {
					url: location.pathname,
					viewport: { width: innerWidth, height: innerHeight },
					header: rect('header'),
					hero: rect('main .editorial-hero, main .case-intro, main .stage--hero, main .hero, main .case-hero'),
					heroTitle: rect('main .editorial-hero h1, main .case-intro h1, main .stage--hero h1, main .hero h1, main .case-hero h1'),
					firstCard: rect('main .portfolio-entry, main .case-card, main .catalog-card, main .commercial-product-card'),
					body: rect('body'),
					legacyClassCounts: {
						siteHeader: document.querySelectorAll('.site-header').length,
						genericHero: document.querySelectorAll('.hero').length,
						caseCard: document.querySelectorAll('.case-card').length,
						stage: document.querySelectorAll('.stage').length,
						pill: document.querySelectorAll('.pill').length,
					},
					newClassCounts: {
						globalNav: document.querySelectorAll('.global-nav').length,
						editorialHero: document.querySelectorAll('.editorial-hero, .case-intro').length,
						portfolioEntry: document.querySelectorAll('.portfolio-entry').length,
					},
				};
			});
			findings.push({ label, route: route.name, viewport: viewport.name, ...snapshot });

			if (route.name === 'work') {
				const firstGrid = page.locator('.work-gallery').first();
				if (await firstGrid.count()) {
					await firstGrid.scrollIntoViewIfNeeded();
					await page.screenshot({
						path: path.join(outputDirectory, `work-${viewport.name}-cases.png`),
						fullPage: false,
						animations: 'disabled',
					});
				}
			}

			await page.evaluate(() => window.scrollTo(0, 560));
			await page.waitForTimeout(80);
			const scrolledHeader = await page.locator('.global-nav').evaluate((element) => {
				const box = element.getBoundingClientRect();
				const style = getComputedStyle(element);
				return {
					x: box.x,
					y: box.y,
					width: box.width,
					height: box.height,
					position: style.position,
					color: style.color,
					backgroundColor: style.backgroundColor,
				};
			});
			findings.at(-1).scrolledHeader = scrolledHeader;
			await page.screenshot({
				path: path.join(outputDirectory, `${route.name}-${viewport.name}-scrolled.png`),
				fullPage: false,
				animations: 'disabled',
			});
		}

		await page.close();
	}
} finally {
	await browser.close();
}

await writeFile(path.join(outputDirectory, 'computed.json'), `${JSON.stringify(findings, null, 2)}\n`);
console.log(`Corrective audit captures written to ${outputDirectory}`);

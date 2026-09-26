/* eslint-disable no-undef -- page callbacks execute inside Playwright */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const baseUrl = process.env.QA_BASE_URL ?? 'http://localhost:4322';
const outputDirectory = path.resolve('audit/madre-landing-2026-09-26');
const results = [];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
	for (const viewport of [
		{ name: 'mobile', width: 390, height: 844 },
		{ name: 'tablet', width: 768, height: 1024 },
		{ name: 'desktop', width: 1586, height: 992 },
	]) {
		const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
		const consoleErrors = [];
		const failedRequests = [];
		page.on('console', (message) => {
			if (message.type() === 'error') consoleErrors.push(message.text());
		});
		page.on('pageerror', (error) => consoleErrors.push(error.message));
		page.on('requestfailed', (request) => failedRequests.push(`${request.method()} ${request.url()}`));

		await page.addInitScript(() => {
			window.__madreMetrics = { cls: 0, lcp: 0, maxEventDuration: 0, eventTimingSupported: true, shifts: [] };
			new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (!entry.hadRecentInput) {
						window.__madreMetrics.cls += entry.value;
						window.__madreMetrics.shifts.push({
							value: entry.value,
							startTime: entry.startTime,
							sources: entry.sources?.map((source) => ({
								node: source.node?.className || source.node?.tagName || null,
								previousRect: source.previousRect,
								currentRect: source.currentRect,
							})),
						});
					}
				}
			}).observe({ type: 'layout-shift', buffered: true });
			new PerformanceObserver((list) => {
				const entries = list.getEntries();
				window.__madreMetrics.lcp = entries.at(-1)?.startTime ?? window.__madreMetrics.lcp;
			}).observe({ type: 'largest-contentful-paint', buffered: true });
			try {
				new PerformanceObserver((list) => {
					for (const entry of list.getEntries()) {
						window.__madreMetrics.maxEventDuration = Math.max(window.__madreMetrics.maxEventDuration, entry.duration);
					}
				}).observe({ type: 'event', buffered: true, durationThreshold: 16 });
			} catch {
				window.__madreMetrics.eventTimingSupported = false;
			}
		});

		await page.goto(`${baseUrl}/es/madre/`, { waitUntil: 'networkidle' });
		await page.screenshot({
			path: path.join(outputDirectory, `landing-${viewport.name}.png`),
			animations: 'disabled',
		});

		await page.locator('[data-madre-os-tab="linux"]').focus();
		await page.keyboard.press('Enter');
		await page.locator('[data-madre-os-tab="linux"][aria-selected="true"]').waitFor();
		await page.locator('#evidencia').scrollIntoViewIfNeeded();
		await page.locator('.madre-evidence__figure').screenshot({
			path: path.join(outputDirectory, `evidence-${viewport.name}.png`),
			animations: 'disabled',
		});

		const audit = await page.evaluate(({ name, width, height }) => {
			const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
			const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
			const interactive = [...document.querySelectorAll('a, button, summary')];
			const smallTargets = interactive
				.map((element) => {
					const box = element.getBoundingClientRect();
					return { text: element.textContent?.trim().slice(0, 60), width: box.width, height: box.height };
				})
				.filter((target) => target.width > 0 && target.height > 0 && (target.width < 24 || target.height < 24));
			return {
				viewport: { name, width, height },
				title: document.title,
				language: document.documentElement.lang,
				canonical: document.querySelector('link[rel="canonical"]')?.href,
				h1Count: document.querySelectorAll('h1').length,
				headings: [...document.querySelectorAll('h1, h2, h3')].map((heading) => ({ level: heading.tagName, text: heading.textContent?.trim() })),
				horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
				duplicateIds: [...new Set(duplicateIds)],
				imagesMissingAlt: [...document.images].filter((image) => !image.hasAttribute('alt')).length,
				imagesFailed: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
				softwareStructuredData: [...document.querySelectorAll('script[type="application/ld+json"]')].some((script) => script.textContent?.includes('SoftwareApplication')),
				linuxTabSelected: document.querySelector('[data-madre-os-tab="linux"]')?.getAttribute('aria-selected'),
				smallTargets,
				metrics: window.__madreMetrics,
			};
		}, viewport);
		results.push({ ...audit, consoleErrors, failedRequests });
		await page.close();
	}
} finally {
	await browser.close();
}

await writeFile(path.join(outputDirectory, 'computed.json'), `${JSON.stringify(results, null, 2)}\n`);
console.log(`MADRE design QA written to ${outputDirectory}`);

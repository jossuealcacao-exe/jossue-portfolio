import { expect, test } from '@playwright/test';

const routes = ['/es/', '/es/trabajo/', '/es/servicios/', '/es/ia-y-sistemas/', '/es/acerca/', '/es/contacto/'];

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

test('root redirects deterministically and language preserves equivalent route', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL(/\/es\/$/);
	await page.goto('/es/servicios/');
	await page.locator('a.language').click();
	await expect(page).toHaveURL(/\/en\/services\/$/);
});

test('contact form does not submit without configuration', async ({ page }) => {
	await page.goto('/es/contacto/');
	await expect(page.locator('[data-contact-form] button[type="submit"]')).toBeDisabled();
	await expect(page.locator('[data-form-status]')).toContainText('no tiene un endpoint');
});

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: '.',
	testMatch: 'site.spec.ts',
	fullyParallel: true,
	retries: 0,
	reporter: 'line',
	use: {
		baseURL: 'http://127.0.0.1:4321',
		trace: 'retain-on-failure',
	},
	projects: [
		{ name: '320px', use: { ...devices['Desktop Chrome'], viewport: { width: 320, height: 720 } } },
		{ name: '375px', use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 } } },
		{ name: '430px', use: { ...devices['Desktop Chrome'], viewport: { width: 430, height: 932 } } },
		{ name: '768px', use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } } },
		{ name: '1024px', use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 768 } } },
		{ name: '1280px', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
		{ name: '1440px', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
	],
	webServer: {
		command: 'npm run preview -- --host 127.0.0.1',
		url: 'http://127.0.0.1:4321/es/',
		reuseExistingServer: false,
		timeout: 30_000,
	},
});

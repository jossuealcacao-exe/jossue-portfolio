import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['dist/**', '.astro/**', 'blog/dist/**', 'blog/.astro/**', 'blog/.wrangler/**', '.wrangler-dry-run/**', 'node_modules/**', 'test-results/**', 'docs/**', '_inputs/**'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs['flat/recommended'],
	{
		files: ['astro.config.mjs', 'blog/astro.config.mjs', 'api/**/*.mjs', 'worker/**/*.mjs', 'blog/worker/**/*.mjs', 'scripts/**/*.mjs', 'tests/**/*.ts'],
		languageOptions: {
			globals: {
				Buffer: 'readonly',
				console: 'readonly',
				crypto: 'readonly',
				fetch: 'readonly',
				FormData: 'readonly',
				Headers: 'readonly',
				process: 'readonly',
				Request: 'readonly',
				Response: 'readonly',
				TextEncoder: 'readonly',
				URL: 'readonly',
				URLSearchParams: 'readonly',
			},
		},
	},
];

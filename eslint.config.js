import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['dist/**', '.astro/**', 'node_modules/**', 'test-results/**', 'docs/**', '_inputs/**'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs['flat/recommended'],
	{
		files: ['astro.config.mjs', 'scripts/**/*.mjs', 'tests/**/*.ts'],
		languageOptions: {
			globals: {
				Buffer: 'readonly',
				console: 'readonly',
				fetch: 'readonly',
				process: 'readonly',
				URL: 'readonly',
			},
		},
	},
];

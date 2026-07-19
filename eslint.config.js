import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['dist/**', '.astro/**', 'node_modules/**', 'docs/**', '_inputs/**'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs['flat/recommended'],
	{
		files: ['astro.config.mjs', 'scripts/**/*.mjs', 'tests/**/*.ts'],
		languageOptions: {
			globals: {
				console: 'readonly',
				process: 'readonly',
				URL: 'readonly',
			},
		},
	},
];

# Jossue Alcalá — portfolio foundation

Static, bilingual editorial portfolio built with Astro 7.1.1 and strict TypeScript. It uses Astro components and native CSS only—no client framework or utility CSS.

## Setup

```sh
npm install
cp .env.example .env
npm run dev
```

Set `PUBLIC_SITE_URL` to the production origin before deployment. If absent, builds intentionally use `https://portfolio.invalid` so an unconfigured canonical URL is easy to detect. Analytics identifiers and the contact endpoint are optional; analytics scripts are not loaded by this foundation.

## Commands

- `npm run dev` — local development server.
- `npm run build` — static production build.
- `npm run check` — Astro and TypeScript diagnostics.
- `npm run lint` — ESLint for Astro, TypeScript, and scripts.
- `npm run test:routes` — required output route checks.
- `npm run test:links` — internal link checks against `dist`.
- `npm run test:e2e` — responsive, redirect, contact, and console checks.
- `npm run validate` — complete validation sequence.

Install the Playwright browser once with `npx playwright install chromium`.

## Content and evidence

Case data lives in `src/content.config.ts` as an Astro Content Collection with a consistent bilingual schema. Public pages intentionally describe the current evidence state. Unverified Bloqio Builder figures are retained only as non-publishable internal claims and are never rendered.

Navigation, route equivalents, and metadata live in `src/data/i18n.ts`. Contact data has one source in `src/data/contact.ts`; null values are not presented as real contact details.

## Deployment

Publish `dist/` from `npm run build`. Confirm the generated canonical URLs, `robots.txt`, and sitemap use the real `PUBLIC_SITE_URL`.

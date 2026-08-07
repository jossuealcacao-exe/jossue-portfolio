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
- `npm run test:worker` — Cloudflare Worker API checks.
- `npm run submissions` — authenticated production message query.

## Contact API

The static site can send the contact form to the local Node API instead of opening a mail client:

```sh
cp .env.example .env
cp .env.example .env.api
npm run api
```

Set `PUBLIC_CONTACT_ENDPOINT` in `.env` to the API URL and set a private `CONTACT_ADMIN_TOKEN` in `.env.api`. The API stores records in the ignored `api/data/submissions.json` file for local use.

Endpoints:

- `POST /api/contact` — validates and stores a form submission.
- `GET /api/submissions` — returns submissions with `Authorization: Bearer <CONTACT_ADMIN_TOKEN>`.
- `GET /healthz` — health check without sensitive data.

The JSON store is appropriate for local development only. Production uses the same HTTP contract in a Cloudflare Worker with the `jossue-portfolio-contact` D1 database. `ADMIN_TOKEN` and `RATE_LIMIT_SALT` are Worker secrets; neither belongs in Git.
- `npm run validate` — complete validation sequence.

Install the Playwright browser once with `npx playwright install chromium`.

## Content and evidence

Case data lives in `src/content.config.ts` as an Astro Content Collection with a consistent bilingual schema. Public pages intentionally describe the current evidence state. Unverified Bloqio Builder figures are retained only as non-publishable internal claims and are never rendered.

Navigation, route equivalents, and metadata live in `src/data/i18n.ts`. Contact data has one source in `src/data/contact.ts`; null values are not presented as real contact details.

## Deployment

`npm run deploy` builds the canonical `https://jossuealcala.com` site, uploads static assets and the contact Worker, and updates the configured custom domains. Apply pending D1 migrations before deploying:

```sh
npx --yes wrangler@4.119.0 d1 migrations apply jossue-portfolio-contact --remote
npm run deploy
```

Production endpoints:

- `POST https://jossuealcala.com/api/contact`
- `GET https://jossuealcala.com/api/submissions` with the admin bearer token
- `GET https://jossuealcala.com/healthz`

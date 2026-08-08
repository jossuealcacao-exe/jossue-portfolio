# Blog operations

## Purpose

The blog is an independent editorial application served from `blog.jossuealcala.com`. It attracts readers through useful technology, ecommerce, development, and AI content, then offers natural paths back to Jossue's profile and contact channels on `jossuealcala.com`.

## Publishing model

Posts live in `src/content/blog/<locale>/` and are rendered by the independent app in `blog/`. A post becomes public only when all three conditions are true:

1. `draft: false`
2. `publication.publish: true`
3. `publishedAt` is not in the future (use an ISO timestamp with the Mexico City offset)

The daily GitHub workflow rebuilds the blog application, so a reviewed future-dated post can go live automatically on its publication date. Configure repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to activate deployment. The Cloudflare DNS zone must already delegate `blog.jossuealcala.com` to the Worker route declared in `blog/wrangler.jsonc`.

Run `npm run blog:validate` before review. The validator requires sources, a valid hero image, unique locale/slug pairs, and a realistic reading-time budget.

## Editorial automation guardrail

Automation may collect primary sources, prepare briefs, and schedule reviewed articles. It must not directly publish mass-generated news. Every article needs:

- a concrete reader question;
- primary sources and a visible author;
- original analysis or first-hand application;
- factual and link review;
- a deliberate publication date.

This keeps the content people-first and avoids using automation merely to manipulate search traffic.

## Monetization

Advertising components render only inside the independent blog. No ad script is included anywhere else in the portfolio.

Publisher `pub-5612202849073748` is registered in the root `ads.txt`. Both the portfolio and the independent blog expose the AdSense account meta tag for ownership verification. This verifies the root domain without loading Auto Ads across the portfolio.

To activate display units inside the blog, provide these production variables:

- `PUBLIC_ADSENSE_CLIENT`
- `PUBLIC_ADSENSE_SLOT_BLOG_INDEX`
- `PUBLIC_ADSENSE_SLOT_BLOG_ARTICLE`

Before setting the slot variables or loading the AdSense script, activate a Google-certified consent management platform from AdSense Privacy & messaging for every region where it is required. Ad units use reserved, clearly labeled blocks after editorial sections. Do not enable vignette, anchor, or ad-intent formats without a separate UX and consent review.

In AdSense site verification, select the **meta tag** method. The supplied script is intentionally not loaded on `jossuealcala.com`: Google documents that the same snippet enables Auto Ads features, which could place advertising outside the blog if Auto Ads is enabled in the account.

## Images

Article artwork must be original or licensed for publication. Store source assets in `src/assets/blog/<article-slug>/`, write literal alt text, and let the blog build generate responsive derivatives.

## Social interactions and moderation

Likes, shares, and comments are real counters backed by the blog's own Cloudflare D1 database. They start at zero. Do not seed fabricated engagement or anonymous conversations that could be mistaken for real users.

Production infrastructure was activated on August 8, 2026:

1. D1 database `jossue-blog-social` uses ID `a031570d-ff9b-44a8-9b26-8c4788bb7883`.
2. Migration `blog/migrations/0001_social.sql` is applied remotely.
3. Worker `jossue-blog` has the `ADMIN_TOKEN` secret configured.
4. The local moderation credential is stored in macOS Keychain under service
   `jossue-blog-admin-token` and account `jossue-blog-admin`; never commit its value.

Anonymous comments enter with the `pending` state and are invisible on articles until approved. Open `/admin/moderacion/`, enter the administration token, then approve or reject each item. The moderation API requires the same bearer token and returns no comment data without it.

For local QA, run `npm run social:local` once and `npm run worker:dev`. The local database under `blog/.wrangler/` is disposable and is excluded from Git.

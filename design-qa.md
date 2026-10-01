# Design QA — flagship system review

## Target

- Selected direction: option 3, with more impactful heroes.
- Current review: global navigation, CTA spacing, hierarchy, alignment and CSS cascade consistency.
- Local implementation: `http://localhost:4322/es/`.

## Evidence

- `audit/design-system-2026-09-24/home-desktop.png`
- `audit/design-system-2026-09-24/home-mobile.png`
- `audit/design-system-2026-09-24/catalog-desktop.png`
- `audit/design-system-2026-09-24/catalog-mobile.png`
- `audit/design-system-2026-09-24/product-desktop.png`
- `audit/design-system-2026-09-24/product-mobile.png`
- `audit/design-system-2026-09-24/menu-mobile.png`
- Viewports: 390 × 844 and 1440 × 900 CSS px.
- State: Spanish locale, reduced motion, no assistant panel open; the menu capture includes the expanded navigation state.

## Source findings

1. Five stylesheets were assigning geometry to the same generic `.site-header`, `.nav`, `.menu`, `.stage` and `.pill` classes. The resulting cascade preserved the old dropdown even after the flagship layer was added.
2. `surface.css` centered every direct `Stage` heading, while individual product components also declared `align="center"`. Home, catalog, product detail and closing CTAs therefore changed axis without a shared rule.
3. The mobile menu existed in the accessibility tree but its legacy dropdown panel was visually lost beneath the product chapter navigation.
4. Hero tracking reached `-0.085em`; multiword titles such as “Desarrollo Web” and “Sobre mí” visually collapsed their spaces.
5. CTA sizing came from multiple button systems. The smallest variants had no guaranteed horizontal padding or 48 px touch height.

## Implemented corrections

- Rebuilt the global header as a scoped flagship navigation: numbered desktop rail and full-screen editorial mobile index.
- Kept language switching, current-page state, Escape closing and semantic links intact.
- Replaced mixed center/start declarations with one left reading edge for commercial heroes, section introductions and conversion chapters.
- Standardized CTA padding, height, wrapping and mobile stacking; the product chapter action has its own compact rectangular treatment.
- Restored visible word spacing while preserving the tight editorial character of the display type.
- Added regression checks for menu visibility, accessible link names, hero alignment, CTA padding and 48 px touch targets.
- Added `scripts/capture-design-qa.mjs` so the same visual evidence can be regenerated.

## Visual review

- PASS — Desktop navigation is a distinct system rather than the old header with new colors.
- PASS — Mobile navigation occupies the viewport, presents all four routes clearly and does not disappear behind the chapter rail.
- PASS — Home, catalog, product detail, MADRE and conversion chapters use a consistent left edge.
- PASS — Multiword hero titles retain visible separation at 390 px and 1440 px.
- PASS — Primary and secondary CTAs have intentional spacing and stack without overlap on narrow screens.
- PASS — No document-level horizontal overflow in the full responsive matrix.

## Verification

- `npm run check`: 100 files, 0 errors, 0 warnings, 0 hints.
- `npm run lint`: passed.
- Production build: 45 pages generated.
- Static routes: 45 verified.
- Local links: 1,379 verified.
- Playwright: 296/296 passed at 320, 375, 390, 430, 768, 1024, 1280 and 1440 px.

## Final result

passed

---

# Design QA — MADRE commercial landing

## Design goal

- Selected direction: option 3, refined for stronger order and hierarchy.
- Primary comprehension order: what MADRE is → install it → confirm first use → inspect real evidence → understand authority and capabilities.
- What the user should notice first: “Instala una sala para tus agentes”; immediately after, the macOS/Linux installation command.
- Typography: Inter Tight for decisive product hierarchy, Source Sans 3 for readable explanation, monospace only for commands, labels and system language.
- Spacing: one left reading edge, wide quiet fields around the proposition, then progressively denser operational sections.
- Colors: warm paper, black and one functional phosphor green; no decorative gradients, glow or generic SaaS shadows.
- Imagery: one real MADRE 0.4.0 capture with a bounded evidence disclosure; two explicit production slots remain for CONNECTIONS and CONTROL.
- Behavior: keyboard-operable OS tabs, copy controls with live status, visible gallery controls, reduced-motion-safe scrolling and a static reading fallback.

## Comparison evidence

- Source direction: `/Users/eljochuaxd/.codex/generated_images/019ffcb9-82af-7a01-a209-351a15f60adf/exec-260a7705-e2ac-4212-843b-4fa7c68ad875.png` at 1586 × 992.
- Desktop implementation: `audit/madre-landing-2026-09-26/landing-desktop.png` at 1586 × 992.
- Tablet implementation: `audit/madre-landing-2026-09-26/landing-tablet.png` at 768 × 1024.
- Mobile implementation: `audit/madre-landing-2026-09-26/landing-mobile.png` at 390 × 844.
- Real product evidence crops: `audit/madre-landing-2026-09-26/evidence-{mobile,tablet,desktop}.png`.
- Computed browser audit: `audit/madre-landing-2026-09-26/computed.json`.

## Mandatory comparison passes

- PASS — Layout and hierarchy preserve the selected direction while giving the hero, installation and evidence distinct reading levels.
- PASS — The desktop title now resolves in two lines and the complete installation control is visible inside the first viewport.
- PASS — Mobile, tablet and desktop have no document-level horizontal overflow, duplicate IDs, failed images or console errors.
- PASS — Font files are preloaded; measured local production-preview CLS is 0 at all three validation viewports.
- PASS — Every visible interactive target in the local audit is at least 24 × 24 CSS px; the product-index links use a 44 px minimum height.
- PASS — One H1, ordered H2/H3 sections, language, canonical metadata, useful alt text and SoftwareApplication structured data are present.
- PASS — OS tabs work with pointer and keyboard; Linux selection was verified in every viewport.
- PASS — Icons remain within the existing repository system; no custom SVG illustration or CSS art replaces product evidence.
- PASS — The real screenshot retains its subject, aspect ratio and disclosure; missing imagery remains explicitly labeled instead of fabricated.
- PASS — No generic rounded-card grid, decorative neon, gradient or accumulated effects were introduced.

## Verification

- `npm run check`: 104 files, 0 errors, 0 warnings, 0 hints.
- `npm run lint`: passed.
- Production build: 45 portfolio pages and 25 blog pages generated.
- Static routes: 45 verified.
- Local links: 1,465 verified.
- Unit/integration checks: API 2/2, worker 4/4 and social 4/4 passed.
- Playwright: 304/304 passed at 320, 375, 390, 430, 768, 1024, 1280 and 1440 px.
- Local production-preview metrics at 390, 768 and 1586 px: CLS 0; observed LCP 40 ms or less; longest observed interaction event 16 ms or less. These are local lab observations, not field Core Web Vitals.
- Lighthouse/PageSpeed scores were not produced because no runner is installed and this phase does not authorize dependency installation.

## Remaining non-blocking work

- Capture the CONNECTIONS panel with real CLI states and no account data.
- Capture the CONTROL authorization ceremony without executing an external action.
- Replace `portfolio.invalid` only through the production build environment; the local fallback is intentionally traceable.
- Validate real-world Core Web Vitals and PageSpeed after deployment, with explicit authorization.

final result: passed

---

# Design QA — product detail pages

## Target

- Daniela, AHP+, Bloqio Builder and Miawseo (`ProductDetail.astro`), reviewed against Chatbots, IA aplicada, Consultoría and Desarrollo web, which were already on the jx system.
- Viewports: 390 × 844 and 1440 × 900 for review, plus 320, 375, 768 and 1024 in the overflow sweep. Spanish and English.

## Source findings

1. Two systems coexisted: four product pages still used the old `.stage` / `.gallery-card` template (flat band hero, no media, four one-line cards, “Cómo avanzamos” as a still image) while the other four used the jx system with a looping hero, demo, comparison tables and FAQ.
2. The floating chapter bar overlapped content on scroll, was cut off at 390 px (“Qué incluye / Para quién / Hablar”) and suppressed the site-wide navigation bubble on those pages only.
3. Information was thin: no problem statement, no explanation of how the product works, no limits, no FAQ, no spec table.
4. The services pages had near-black hero loops (`services`, `products`), so the abstract video was effectively invisible.
5. Mobile menu: the current page was dimmed to the muted colour, which read as disabled, and the panel ended with empty space.
6. Token drift: `.jx-points .icon` used the MADRE phosphor green site-wide (overridden page by page), `storefront.css` kept a parallel palette with `#626a5f` text (fails AA), and the hero stage carried a purple glow shadow the system rules exclude.
7. Hero overflow: a long install command made the centred hero grid wider than the viewport at 390 px.
8. Copy that the sources did not support: AHP+ “checkpoints para volver a un punto” (they resume a session, they do not restore) and Miawseo “20 salas de razas” (20 breeds with 6 rooms each, 120 rooms).

## Implemented corrections

- `ProductDetail.astro` rebuilt on the jx system; all copy lives in `src/data/productDetails.ts` (ES/EN), drawn from the products’ own code and docs.
- New “Cómo funciona” scene (`src/components/pdp/`): four steps the visitor can pick, autoplay only while in view, pause button, static with reduced motion. Scenes change one CSS variable (`--step`); text stays in the DOM.
- Abstract 10 s hero loops for the four products plus Consultoría and Desarrollo web, rendered by `scripts/video/render-hero-loops.mjs` from `scripts/video/hero-loops.html` (WebM, MP4, WebP poster, wide and tall).
- Chapter bar removed from product pages; the site bubble now appears after the hero like on the other product pages.
- Mobile menu: current page marked with a dot, full brightness; closing action added.
- Tokens: phosphor icons scoped to MADRE, storefront palette aliased to the base tokens, purple glow removed, scene radii on the radius scale, hero grid `minmax(0, 1fr)`.
- Copy fixes in `products.ts` for the two claims above.
- Copy pass on all product pages and the catalog: headings and ledes rewritten as plain statements of what the section contains (no slogans, no “X, no Y” contrasts, no addressing the reader with “te reconoces / te suena / te toca”), Mexican Spanish, first person. Examples: “Te sirve si te reconoces aquí. Y te digo cuándo no.” became “Cuándo conviene y cuándo todavía no”; “Un chatbot que vende, no uno que repite el FAQ.” became “Chatbots con IA que atienden y venden con tus datos reales.”
- Tests updated for the new structure and extended with per-product checks (loop, sections, FAQ schema, step control, reduced motion).

## Visual review

- PASS — Hero, section order, alignment and button sizes are the same on all eight product pages.
- PASS — Each scene shows something different at each of its four steps; panel heights stay stable while steps change.
- PASS — No document-level horizontal overflow at 320, 375, 390, 768, 1024 and 1440 px, Spanish and English.
- PASS — Text contrast scan of the eight pages (outside the illustrative scenes): 0 failures against 4.5:1 (3:1 for large text).
- PASS — One H1 per page; FAQPage structured data on the four rebuilt pages.

## Verification

- `npm run check`: 139 files, 0 errors, 0 warnings, 3 hints (pre-existing).
- `npm run lint`: passed.
- Production build: 53 pages. Static routes: 53 verified. Local links: 2,261 verified.
- Playwright: 440/440 passed at 320, 375, 390, 430, 768, 1024, 1280 and 1440 px.
- Not run: `blog:check`, API, worker and social suites (outside this change; the worker has unrelated uncommitted edits).
- Evidence: `audit/product-pages-2026-09-30/` (before and after), regenerated with `scripts/capture-product-qa.mjs`.

## Open items for the owner

- Bloqio Builder is labelled “En beta privada” on the site, but the product code has open sign-up and the commercial site says “Acceso anticipado”. Pick one label.
- Miawseo’s demo credit says each photo’s licence is in the repository; `CREDITS.md` lists files and some authors, not licences per file.
- `ahp project check` reports FAIL on this checkout (pre-existing; not repaired here).

final result: passed

---

# Design QA — case detail pages

## Target

- The nine case pages (`/es/trabajo/<caso>/`, `/en/work/<caso>/`), rendered by `CaseDetail.astro`, brought onto the same system as the product pages.

## Source findings

1. The case template was the old editorial one: flat left-aligned hero with an outlined brand tag, a left index column beside every section, plain bordered lists for approach and outcome, a bare list of deliverables and diagrams drawn with 9 px bars. It shared no component, icon, loop or motion with the product pages.
2. Its look came from rules spread over five stylesheets (`global`, `redesign`, `surface`, `flagship`, `editorial`), several of them defining the same selector (`.diagram` and `.case-cover` three times).
3. No orientation on a 9–11k px page, no related cases, and a closing line (“¿Te suena parecido?”) in the generic register the copy pass removed elsewhere.

## Implemented corrections

- `CaseDetail.astro` rebuilt on the jx system: centred hero with an abstract loop (`caseLoop` in `src/data/caseExtras.ts` reuses the existing loops), framed real screenshot, three facts, secondary button to the live project or to the matching product or service page.
- New elements: “En este caso” index of anchors, reading-progress bar, challenge as three icon cards (context, problem, my part), approach as a journey whose connector line draws as it enters, deliverables as icon cards (icon chosen from the text, no repeats), numbered outcome cards whose check pops in, principles as bordered chips, tech stack chips, link cards with a kind icon, three related cases and a closing card with a contact button and a Jossue AI prompt.
- `CaseDiagrams.astro` rewritten with its own `cdg-*` classes: bars fill and numbers count up when they enter the viewport; comparison and flow charts restyled.
- `PageHero` accepts a label slot and a screen-reader-only joiner, so “Nombre — descriptor” titles keep their exact text.
- Styles in `src/styles/case.css`, tokens only. The `.sr-only` joiner, reduced motion and phone widths are covered.
- Dead legacy CSS removed with a brace-aware script: 151 rules and blocks (old `case-intro`, `case-grid`, `approach-list`, `deliverable-grid`, `outcome-list`, `principles-block`, `case-prose`, `case-cta`, `diagram*`, `project-link*`, old `.case-cover` and `.case-brand` copies) from `global`, `redesign`, `surface`, `flagship`, `editorial` and `jossue-system`, about 550 lines. A 32-screenshot comparison (16 routes, desktop and phone) before and after showed no change beyond render noise that also appears between two runs of the unpruned CSS.
- Tests updated to the new structure and extended: loop, index, icons, related cases, no legacy classes, reading progress and index order.

## Verification

- `npm run check`: 0 errors, 0 warnings, 3 hints (pre-existing). `npm run lint`: passed.
- Production build: 53 pages. Static routes: 53. Local links: 2,339.
- Playwright: 448/448 passed at 320, 375, 390, 430, 768, 1024, 1280 and 1440 px.
- Sweep of the nine cases at 320, 375, 390, 768, 1024 and 1440 px in Spanish and English: no horizontal overflow, no console errors, one H1. Text contrast scan: 0 failures.
- Evidence: `audit/product-pages-2026-09-30/` (`case-*` after, `before-case-*` before).

## Not changed

- `ChapterNav.astro` and its CSS are no longer used by any page; `site-bubble.ts` and `motion.ts` still reference `.chapter-nav` / `.case-jump`. Removing them is a separate, small cleanup.

final result: passed

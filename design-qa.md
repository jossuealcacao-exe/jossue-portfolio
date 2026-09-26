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

# Brand marks (`/cv/brands`)

Curated logos for clients and employers shown in the portfolio. Prefer SVG; PNGs must ship with transparent backgrounds (no baked-in plates).

| File | Brand | Source |
| --- | --- | --- |
| `bloqio.svg` | Bloqio | Owned asset (`bloqio-site/assets/logos/logobloqio.svg`) |
| `wu-nutrition.png` | WU Nutrition | Prior CV pack; black plate removed → transparent PNG |
| `come-verde.png` | Come Verde | Public storefront `comeverde.mx`; white plate removed → transparent PNG |
| `la-carniceria-virtual.png` | La Carnicería Virtual | Public storefront logo CDN; letterbox removed → transparent PNG |
| `hp.svg` | HP Inc. | Deposited `HP_logo_2025.svg` |
| `farmalisto.png` | Farmalisto | Prior CV brands pack; black plate removed → transparent PNG |

Provenance copies live under `_inputs/cv/brands/`. Regenerate transparent PNGs with `npm exec --yes --package=sharp node scripts/process-brand-logos.mjs`.

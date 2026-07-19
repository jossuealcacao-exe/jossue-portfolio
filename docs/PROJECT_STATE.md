# Estado del proyecto

## Fase actual

**Base técnica bilingüe validada; integración editorial del primer caso pendiente.**

El repositorio estaba inicialmente vacío. Ahora contiene una implementación Astro 7.1.1
estática con TypeScript strict, 23 páginas, cinco casos por dos idiomas, sistema visual,
SEO técnico, `dataLayer` local, pruebas y documentación. El portafolio final aún no cuenta con
activos, contacto ni evidencia real completos.

## Completado

- Astro SSG (`output: static`, `trailingSlash: always`) y TypeScript strict.
- Rutas ES/EN exactas y `/` → `/es/` mediante redirección 308 determinista.
- Selector ES/EN hacia página o caso equivalente.
- 23 páginas HTML: raíz + 11 ES + 11 EN.
- Colección `cases` estructurada: 5 casos × 2 idiomas.
- Header, footer, breadcrumbs, tokens responsive y fuentes variables locales.
- Formulario accesible presente, con botón deshabilitado sin endpoint.
- Canonical, `hreflang`, sitemap, robots, OG/Twitter y JSON-LD.
- Fallback rastreable `https://portfolio.invalid`; robots bloquea rastreo mientras se use.
- JSON-LD `Person`, `WebSite`, `ProfilePage`/`WebPage` y `BreadcrumbList`.
- `window.dataLayer` local e instrumentación parcial, sin proveedor ni scripts externos.
- Catálogo de insumos `file://`, persistente y con mínimos explícitos.
- Planes editoriales, SEO/IA, analítica, accesibilidad y rendimiento.

## En progreso

- Sustitución de placeholders bilingües por contenido respaldado.
- Preparación de WU Nutrition / DUMO como primer caso real.
- Recepción de rol, artefactos, métricas, permisos e información a anonimizar.

## Pendiente

- Integración editorial completa de WU Nutrition / DUMO.
- Dominio real y `PUBLIC_SITE_URL`.
- Correo, WhatsApp, LinkedIn, GitHub, CV y endpoint de contacto autorizados.
- Activos de marca: logotipo SVG, variantes, isotipo, favicon, guía, tipografía/licencias y
  Zappicon original.
- Auditoría manual WCAG 2.2 AA, lector de pantalla y contraste.
- Medición Lighthouse/CWV; no existen resultados registrados.
- Decisión legal y técnica sobre GTM/GA4, Search Console, consentimiento y privacidad.
- Evidencia y permisos para los demás casos.

## Bloqueos

- **Publicación:** `.invalid` debe reemplazarse por dominio HTTPS real.
- **Contacto:** no hay canal ni endpoint proporcionados.
- **Primer caso:** faltan evidencia, rol exacto y permisos de WU Nutrition / DUMO.
- **Marca:** no hay activos oficiales; Zappicon sigue faltante y no se sustituye.
- **Analítica externa:** no hay IDs, proveedor, consentimiento ni política aprobados.
- **Métricas Bloqio:** 57 usuarios y 45 páginas son solo datos proporcionados; no tienen fecha
  de corte, definición, fuente validada, contexto ni autorización y no son publicables.

## Decisiones vigentes

- Astro 7.1.1 + TypeScript strict + SSG.
- Español como destino determinista de `/`; selector explícito para inglés.
- Rutas bilingües equivalentes y cinco slugs compartidos.
- `.invalid` como fallback técnico y release gate.
- Inter Tight + Source Sans 3 desde paquetes locales; identidad aún provisional.
- WCAG 2.2 AA como objetivo, sin declarar conformidad manual todavía.
- `dataLayer` local permitido; proveedor externo desactivado.
- “Recibido” no equivale a “Aprobado para publicar”.

## Archivos modificados por grupos/rutas

- **Configuración:** `package.json`, `package-lock.json`, `astro.config.mjs`,
  `tsconfig.json`, `eslint.config.js`.
- **Rutas:** `src/pages/index.astro`, `src/pages/[lang]/index.astro`,
  `src/pages/[lang]/[...path].astro`, `src/pages/robots.txt.ts`.
- **Contenido/datos:** `src/content.config.ts`, `src/data/i18n.ts`,
  `src/data/contact.ts`, `src/data/analytics.ts`.
- **UI/layout:** `src/layouts/BaseLayout.astro`, `src/components/**`,
  `src/styles/global.css`, `src/scripts/analytics.ts`.
- **Validación:** `scripts/test-routes.mjs`, `scripts/test-links.mjs`, `tests/**`.
- **Insumos/documentación:** `_inputs/**`, `docs/**`.

## Validaciones ejecutadas

- `npm install`: completado.
- `npm run check`: 0 errores, 0 warnings, 0 hints.
- `npm run lint`: pasa.
- `npm run build`: 23 páginas construidas.
- Rutas: 23 verificadas + `robots.txt` y sitemap.
- Enlaces: 393 enlaces locales verificados.
- Playwright: 56/56 en 320, 375, 430, 768, 1024, 1280 y 1440 px.
- Consola: limpia en pruebas responsive.
- Secretos: no hay secretos versionados.

## Fuente de verdad

1. `_inputs/catalogue_inputs/`: disponibilidad, revisión y aprobación.
2. `_inputs/**`: fuentes, evidencia y permisos.
3. `src/content.config.ts`: contenido estructurado que la implementación genera.
4. `docs/**`: alcance, decisiones y estado.

## Próxima acción exacta

Integrar WU Nutrition / DUMO como primer caso, empezando por depositar evidencia/rol/permisos
en `_inputs/case-studies/` y actualizar su entrada estructurada.

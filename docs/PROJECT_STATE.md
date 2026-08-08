# Estado del proyecto

## Fase actual

**Portafolio bilingüe con narrativa comercial y un blog editorial independiente para adquisición orgánica.**

El repositorio estaba inicialmente vacío. Ahora contiene una implementación Astro 7.1.1
estática con TypeScript strict, 45 páginas HTML, nueve casos por dos idiomas, sistema visual,
SEO técnico, `dataLayer` local, pruebas y documentación. El contenido público presenta valor,
contribución, proceso, resultados y tecnología; fuentes, permisos y QA permanecen en la capa interna.

## Completado

- Astro SSG (`output: static`, `trailingSlash: always`) y TypeScript strict.
- Rutas ES/EN exactas y `/` → `/es/` mediante redirección HTML estática; el HTTP 308 depende del hosting.
- Selector ES/EN hacia página o caso equivalente.
- 31 páginas HTML en el portafolio; la aplicación independiente `blog/` compila sus propias
  portadas, categorías, entradas y feeds RSS ES/EN para `blog.jossuealcala.com`.
- Colección `cases` estructurada: 9 casos × 2 idiomas.
- Header, footer, breadcrumbs, tokens responsive y fuentes variables locales.
- Canales directos accesibles; el formulario no se renderiza mientras no exista un endpoint.
- Canonical, `hreflang`, sitemap, robots, OG/Twitter y JSON-LD.
- Fallback rastreable `https://portfolio.invalid`; robots bloquea rastreo mientras se use.
- JSON-LD `Person`, `WebSite`, `ProfilePage`/`WebPage` y `BreadcrumbList`.
- `window.dataLayer` local e instrumentación parcial, sin proveedor ni scripts externos.
- Catálogo de insumos `file://`, persistente y con mínimos explícitos.
- Planes editoriales, SEO/IA, analítica, accesibilidad y rendimiento.
- Bloqio Builder integrado en ES/EN desde documentación y evidencia de repositorio, sin
  publicar cifras comerciales.
- Bloqio CRO Apps (Prometeo/Hermes) verificado desde GitHub + galería bloqio.app, con ocho
  capturas anotadas y sin métricas de App Store/MRR.
- WU Nutrition integrado en ES/EN como caso Shopify/UX-CRO sin métricas comerciales.
- Cinco capturas públicas de WU Nutrition con diez anotaciones editoriales (estilo LCV).
- Diagramas metodológicos de apoyo en WU, Come Verde y La Carnicería Virtual.
- Script reproducible `scripts/capture-wu-evidence.mjs` para renovar la evidencia pública.
- Come Verde actualizado desde `ARTIFACTS_JOSSUE.md` como sistema CPG (brand/activaciones/IA).
- La Carnicería Virtual integrada en ES/EN con cuatro capturas y siete anotaciones auditables.
- Datos comerciales, theme export, tracking IDs y propuesta LCV permanecen fuera del sitio.
- DUMO omitido de rutas, títulos y documentación pública por decisión del propietario.
- MIAWSEO integrado como producto propio destacado dentro de “trabajo deseado”, con build
  revisado y sin claims de adopción o negocio.
- Vinería integrada como producto editorial en revisión parcial; build verde y suite de
  interacción pendiente de actualización.
- Casa Tecalli (`tiendaonline`) integrada como concepto Shopify OS 2.0; Theme Check sin
  offenses y validación en development store pendiente.
- Rediseño editorial responsive aplicado a portada, índice de trabajo, servicios, casos, navegación y footer.
- Copy público ES/EN reescrito con enfoque profesional, comercial y persuasivo; estados de revisión,
  fuentes, limitaciones y planes de captura retirados de la experiencia pública y del metadata.
- Ocho proyectos con visual de portada y stack tecnológico etiquetado; logos locales cuando existen
  y fallback tipográfico accesible para tecnologías sin activo de marca.
- Motion funcional por `IntersectionObserver`, microinteracciones, transición de navegación y soporte
  completo para `prefers-reduced-motion`.
- Capturas desktop y móvil de Vinería publicadas; las capturas de MIAWSEO permanecen fuera del
  build público hasta verificar atribución y derechos de las imágenes visibles.
- Los tres proyectos nuevos incluyen briefs de captura ES/EN con ruta, proporción, resolución
  y formato; no se presentan placeholders como evidencia terminada.
- Correo, LinkedIn y WhatsApp centralizados y publicados con autorización explícita.
- CV integrado con descarga pública `/cv/Jossue-Alcala-CV.pdf`, KPIs del CV, rol
  Head of E-commerce & Digital Growth (WU/Come Verde), capacidades AI/automatización desde
  `master_portfolio_ai`; métricas Bloqio 57/45 siguen fuera.
- Blog ES/EN independiente en `blog.jossuealcala.com`, con portada en forma de feed, cinco
  categorías dentro del menú, buscador expandible, carrusel con tres portadas originales,
  seis artículos ES (uno bilingüe), firma enlazada al perfil, `BlogPosting`, RSS, sitemap y
  enlaces recíprocos.
- Interacción social real preparada con likes, shares y comentarios anónimos en D1; los
  comentarios quedan pendientes hasta aprobarse en `/admin/moderacion/`. No se sembró
  actividad ficticia.
- Publicación programada preparada con contenido fechado, validación editorial y workflow
  diario de Cloudflare; despliegue automático inactivo hasta configurar secretos del repositorio.
- Cuenta AdSense `ca-pub-5612202849073748` declarada mediante meta de verificación en el
  dominio principal y el blog; `ads.txt` raíz contiene el publisher autorizado. Los scripts y
  slots siguen aislados y desactivados hasta contar con revisión aprobada y CMP certificada.
- Portafolio y blog desplegados en Cloudflare el 8 de agosto de 2026. El dominio principal usa
  la versión `b688cb70-c79a-4f95-8709-32eae1f5f8c2`; el blog y su secreto de moderación quedaron
  activos en la versión `ec7f6a55-610d-46e1-bbed-3528309b4874`.
- D1 `jossue-blog-social` creada, migración social aplicada y moderación protegida mediante
  `ADMIN_TOKEN`; las métricas reales comienzan en cero.
- 238 archivos de proyecto y un CV en español recibidos e inventariados.
- CV con PII y archivo confidencial de La Carnicería Virtual excluidos de Git.

## En progreso

- Sustitución de visuales abstractos por capturas autorizadas cuando estén disponibles.
- Preparación de activos visuales aprobados para Bloqio Builder.
- Capturas creativas / anaquel de Come Verde si se autorizan.
- Capturas de MIAWSEO cuando se resuelva la atribución; capturas de Casa Tecalli cuando exista
  una development store autorizada y no publicada.

## Pendiente

- Configurar secretos de Cloudflare en GitHub para activar publicación programada.
- Completar la revisión de AdSense, crear slots de blog y activar una CMP certificada antes de
  cargar publicidad real.
- Activos de marca: logotipo SVG, variantes, isotipo, favicon, guía y tipografía/licencias
  oficiales (Zappicon ya integrado en subconjunto curado; ver D-018).
- Auditoría manual WCAG 2.2 AA, lector de pantalla y contraste.
- Medición Lighthouse/CWV del portafolio; no existen resultados registrados.
- Cerrar configuración operativa de Search Console y consentimiento publicitario.
- Evidencia y permisos para los demás casos.
- Capturas aprobadas de onboarding, editor, auditoría y experiencia móvil de Bloqio Builder.
- Capturas y artefactos específicos de Come Verde.

## Bloqueos

- **Monetización del blog:** publisher, meta de verificación y `ads.txt` ya están configurados;
  faltan aprobación de AdSense, slots y CMP. Ningún script publicitario se carga todavía.
- **Bloqio Builder:** faltan activos visuales aprobados; el repositorio fuente es privado.
- **Bloqio CRO Apps:** capturas son demos de producto; falta permiso para métricas de installs.
- **Come Verde:** hay playbooks verificados; faltan capturas visuales y permiso para cifras comerciales.
- **WU técnico:** la captura pública detectó errores JavaScript en la PDP; requieren diagnóstico separado.
- **Marca propia:** aún no hay logotipo/isotipo oficiales de Jossue; Zappicon Free curado
  (D-018) y logos de clientes/empleadores en `/cv/brands` (D-019) sí están.
- **MIAWSEO:** las capturas permanecen retenidas hasta verificar atribución y derechos de publicación.
- **Casa Tecalli:** faltan capturas desde una Shopify development store autorizada.
- **Métricas Bloqio:** 57 usuarios y 45 páginas son solo datos proporcionados; no tienen fecha
  de corte, definición, fuente validada, contexto ni autorización y no son publicables.

## Decisiones vigentes

- Astro 7.1.1 + TypeScript strict + SSG.
- Español como destino determinista de `/`; selector explícito para inglés.
- Rutas bilingües equivalentes para portafolio y casos; el blog mantiene sus propias rutas
  bilingües equivalentes en el subdominio.
- `.invalid` como fallback técnico y release gate.
- Inter Tight local como display principal; Source Sans 3 local para lectura, con fallbacks de sistema.
- WCAG 2.2 AA como objetivo, sin declarar conformidad manual todavía.
- `dataLayer` local permitido; proveedor externo desactivado.
- “Recibido” no equivale a “Aprobado para publicar”.
- Bloqio Builder es el primer caso integrado; sus métricas no verificadas siguen excluidas.
- WU Nutrition y Come Verde se publican como narrativas separadas; DUMO queda omitido.
- Correo, LinkedIn y teléfono/WhatsApp del CV están autorizados para publicación.

## Archivos modificados por grupos/rutas

- **Configuración:** `package.json`, `package-lock.json`, `astro.config.mjs`,
  `tsconfig.json`, `eslint.config.js`.
- **Rutas:** `src/pages/index.astro`, `src/pages/[lang]/index.astro`,
	`src/pages/[lang]/[...path].astro`, `src/pages/robots.txt.ts`; blog en `blog/src/pages/**`.
- **Contenido/datos:** `src/content.config.ts`, `src/data/i18n.ts`,
  `src/data/contact.ts`, `src/data/analytics.ts`.
- **UI/layout:** `src/layouts/BaseLayout.astro`, `src/components/**`,
  `src/styles/global.css`, `src/scripts/analytics.ts`.
- **Validación:** `scripts/test-routes.mjs`, `scripts/test-links.mjs`, `tests/**`.
- **Insumos/documentación:** `_inputs/**`, `docs/**`.

## Validaciones ejecutadas

- `npm install`: completado.
- `npm run check`: 68 archivos, 0 errores, 0 warnings, 0 hints.
- `npm run lint`: pasa.
- `npm run build`: 45 páginas HTML y dos feeds RSS construidos.
- Rutas: 35 verificadas + `robots.txt`, sitemap, `llms.txt` y RSS; gate de claims restringidos pasa.
- Enlaces: 1,083 enlaces locales verificados.
- Playwright: 216/216 pasan en Chromium contra el build local, en viewports de 320, 375,
  390, 430, 768, 1024, 1280 y 1440 px; las rutas representativas no presentan overflow ni errores de consola.
- Revisión visual actual: Inicio, Trabajo, Servicios y Bloqio CRO Apps aprobados en 390 y 1440 px.
- HTTP local: MIAWSEO, Vinería y Casa Tecalli responden 200 después de reiniciar Astro background.
- Proyectos relacionados: MIAWSEO build pasa; Vinería build pasa; Casa Tecalli Theme Check
  inspecciona 33 archivos sin offenses.
- Secretos: no hay secretos versionados.

## Fuente de verdad

1. `_inputs/catalogue_inputs/`: disponibilidad, revisión y aprobación.
2. `_inputs/**`: fuentes, evidencia y permisos.
3. `src/content.config.ts`: contenido estructurado que la implementación genera.
4. `docs/**`: alcance, decisiones y estado.

## Próxima acción exacta

Esperar la revisión de AdSense. Cuando la cuenta y el sitio aparezcan como `Listo`, crear los
slots responsivos, activar una CMP certificada e integrar la carga publicitaria exclusivamente
en `blog.jossuealcala.com` antes de una nueva validación y publicación.

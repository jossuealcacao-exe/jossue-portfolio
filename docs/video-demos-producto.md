# Demos de producto en video

2026-10-02 · pedido de Jossué: convertir las grabaciones de Daniela, los chatbots
(Jossue AI), Bloqio Builder y Miawseo en demos que expliquen el producto, al estilo
de los últimos videos de MADRE y AHP+.

## Qué son

Un video por producto, en 16:9 (1920×1080) y 9:16 (1080×1920), de 42 a 46 s:

1. Intro: marca, nombre y la frase que dice qué es.
2. El problema que resuelve, en una frase.
3. Tres o cuatro escenas con la grabación real enmarcada y su texto en una franja propia
   (a la derecha en 16:9, arriba en 9:16), con acercamiento suave donde hace falta leer.
4. Una o dos pantallas de tarjetas: qué hace, qué no puede hacer, cómo se protege.
5. Cierre con la pregunta y la URL de su página en jossuealcala.com.

Las grabaciones son las demos reales que ya publicaba el sitio
(`public/videos/{daniela,jossue-ai,bloqio,miawseo}/`); no se volvió a grabar nada ni se
le escribió a Daniela en la tienda. Cada frase sale de `src/data/products.ts`,
`src/data/productDetails.ts` o `src/components/ChatbotsPage.astro`.

## Archivos

| Qué | Dónde |
|---|---|
| Guion y diseño (uno para los cuatro) | `scripts/video/demos/product-demo.html` |
| Grabación cuadro por cuadro | `scripts/video/demos/render-demo.mjs` |
| Sonido sintetizado (sin muestras de terceros) | `scripts/video/demos/demo-audio.mjs` |
| Lo que usa el sitio (sin audio) | `public/videos/demos/<id>(-tall).mp4\|webm\|webp` |
| Copias con sonido para redes (−14 LUFS) | `~/Documents/videos-productos/<id>-16x9.mp4`, `-9x16.mp4` |

`<id>`: `daniela`, `chatbots`, `bloqio-builder`, `miawseo`.

    node scripts/video/demos/render-demo.mjs all --social ~/Documents/videos-productos
    node scripts/video/demos/render-demo.mjs miawseo --fmt tall --stills 9,20   # revisar

Los videos nuevos viven en `/videos/demos/` a propósito: las reglas de proporción de
`jossue-system.css` para `/daniela/` y `/bloqio/` (16:10, 720×1558, 720×868) eran para
las grabaciones crudas; los nuevos usan la proporción por defecto (16:9 y 9:16).

## Detalle técnico

Chromium sin códecs propietarios: se busca cada cuadro en la versión `.webm`. Para que
la captura no salga en negro, cada video se reproduce un instante al cargar y cada
búsqueda espera `requestVideoFrameCallback`, no solo `seeked`.

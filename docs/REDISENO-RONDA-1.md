# Rediseño — Ronda 1: UX

Estado al 2026-09-20. `npm run validate`: exit 0, 288/288.

## La tesis

De **Apple** se toma la coreografía, no la piel: una idea por pantalla, el
medio que queda fijo mientras el texto corre, el bento asimétrico, la tabla
de especificaciones que existe pero no se cobra por adelantado, y la barra
de capítulo pegajosa con su acción siempre a la mano.

Del **neumorfismo** se toma la materia: superficies extruidas del mismo tono
del papel, una sola fuente de luz arriba a la izquierda, par de sombras en
vez de una.

Lo que **no** se toma del neumorfismo es su fallo clásico, el bajo contraste.
La profundidad vive en superficies y afordancias; el texto conserva el
contraste AA que este proyecto ya ganó en auditoría. Ninguna regla del
sistema baja el contraste de un texto.

Lo que **no** se toma de Apple es su tipografía, su fotografía y su
composición de producto. La voz editorial del sitio se queda: Inter Tight y
Source Sans, no SF Pro.

## Qué cambió

| Pieza | Antes | Ahora |
|---|---|---|
| Radio | `0` en todo el sistema | escala de 6 pasos, esquina continua |
| Elevación | una sombra plana | par luz/sombra, 5 niveles más dos hundidos |
| Home | tema oscuro, hero de tres capturas | tono papel, héroe a pantalla, cierre en tinta |
| PDP | encabezado y listas | barra de capítulo, showcase anclado, bento, specs |
| Catálogo | rejilla de tarjetas | lista alterna izquierda/derecha |
| MADRE | secciones apiladas | capítulos, showcase, transcripción en pozo |
| Casos y páginas internas | — | heredan el lenguaje por CSS, sin tocar su estructura |

Los casos y las páginas internas **no** se reescribieron a propósito: sus
carruseles y galerías ya están probados y romperlos costaría más de lo que
este rediseño gana. Reciben el lenguaje nuevo por la capa de propagación al
final de `src/styles/surface.css`.

## Archivos

```
src/styles/surface.css              el sistema completo
src/components/surface/             siete primitivos
  MediaSlot.astro                   el campo de imagen de la ronda 2
  Stage.astro                       una idea por pantalla
  Showcase.astro                    medio fijo, texto que corre
  Bento.astro + BentoCell.astro     rejilla asimétrica
  Specs.astro                       tabla de detalle
  ChapterNav.astro                  barra de capítulo
```

## Ronda 2 — los 31 campos

Cada campo declara id, proporción y una etiqueta con su dirección de arte,
visible en la página. Sustituir `<MediaSlot>` por `<Image>` conservando el
mismo id y la misma proporción no recompone nada.

Hay un test que lo guarda: *every image slot declares the contract round 2
depends on*. Falla si un campo pierde su id, usa una proporción fuera del
catálogo, se queda sin etiqueta o duplica un id dentro de una página.

En móvil los campos se reencuadran solos: `21:9` pasa a `16:9` y `16:9` a
`3:2` por debajo de 48rem. La imagen real necesitará el mismo tratamiento.

```
  catalog-auditoria-ecommerce  ·  4:3
  catalog-cro-crecimiento  ·  4:3
  catalog-ia-aplicada  ·  4:3
  catalog-madre  ·  4:3
  catalog-shopify-desarrollo-web  ·  4:3
  home-case-bloqio-builder  ·  4:3
  home-case-come-verde  ·  4:3
  home-case-la-carniceria-virtual  ·  4:3
  home-hero  ·  21:9
  home-method  ·  4:3
  home-portrait  ·  4:5
  madre-flow  ·  4:3
  madre-hero  ·  16:9
  madre-memory  ·  1:1
  product-auditoria-ecommerce-hero  ·  16:9
  product-auditoria-ecommerce-proof-la-carniceria-virtual  ·  4:3
  product-auditoria-ecommerce-scope  ·  4:3
  product-cro-crecimiento-hero  ·  16:9
  product-cro-crecimiento-proof-bloqio-cro-apps  ·  4:3
  product-cro-crecimiento-proof-come-verde  ·  4:3
  product-cro-crecimiento-proof-wu-nutrition  ·  4:3
  product-cro-crecimiento-scope  ·  4:3
  product-ia-aplicada-hero  ·  16:9
  product-ia-aplicada-proof-ahp-plus  ·  4:3
  product-ia-aplicada-proof-bloqio-builder  ·  4:3
  product-ia-aplicada-scope  ·  4:3
  product-shopify-desarrollo-web-hero  ·  16:9
  product-shopify-desarrollo-web-proof-come-verde  ·  4:3
  product-shopify-desarrollo-web-proof-tiendaonline  ·  4:3
  product-shopify-desarrollo-web-proof-wu-nutrition  ·  4:3
  product-shopify-desarrollo-web-scope  ·  4:3
```

## Lo que falta

- **Ronda 2:** imágenes en los 31 campos y desarrollo de copy. Esta ronda
  conservó el texto que ya existía; no se escribió copy nuevo salvo los
  cuatro pasos del método de la home.
- **Ronda 3:** cableado y ajustes menores.
- **Abierto, decisión de Jossue:** `/es/servicios/` sigue huérfana —
  responde 200 y está en el sitemap, pero ninguna página en español la
  enlaza. `/es/productos/` parece querer sustituirla.

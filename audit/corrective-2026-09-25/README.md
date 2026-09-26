# Auditoría correctiva de interfaz · 2026-09-25

## Alcance

Esta ronda corrige la navegación global y las superficies editoriales de Casos, detalle de caso, Servicios, IA y sistemas, Sobre mí y Contacto. La portada, el catálogo y MADRE conservan su sistema de superficies propio; no se mezclaron sus clases con las páginas editoriales corregidas.

## Evidencia comparativa

Las capturas y mediciones se generaron navegando el sitio local con Playwright en 390 px y 1440 px, en el inicio de cada página y después de hacer scroll.

| Comprobación | Antes | Después |
| --- | --- | --- |
| Hero editorial | Contenedor con margen lateral; 358 px en viewport de 390 px y 1324.81 px en viewport de 1440 px | `x = 0` y ancho igual al viewport en ambos tamaños |
| Contraste del hero | Fondo y título `rgb(9, 10, 9)` | Fondo `rgb(9, 10, 9)` y título `rgb(247, 247, 243)` |
| Menú al hacer scroll | Variaba de apariencia y reutilizaba estados del header anterior | Permanece sticky en `y = 0`, con el mismo fondo y sin caja condensada |
| Índice de casos | 9 elementos `.case-card` heredados | 9 entradas `.portfolio-entry`; 0 `.case-card` |
| Clases antiguas en las rutas corregidas | `.site-header`, `.hero`, `.page`, `.shell` y tarjetas heredadas | 0 instancias medidas de esas familias en la navegación, hero y listado corregidos |

Datos calculados: [`before/computed.json`](./before/computed.json) y [`after/computed.json`](./after/computed.json).

Capturas de referencia:

- Casos: [`antes`](./before/work-desktop-top.png), [`después`](./after/work-desktop-top.png) y [`listado después`](./after/work-desktop-cases.png).
- Servicios: [`antes`](./before/services-desktop-top.png) y [`después`](./after/services-desktop-top.png).
- Sobre mí: [`antes`](./before/about-desktop-top.png) y [`después`](./after/about-desktop-top.png).
- Detalle de caso: [`antes`](./before/work-detail-desktop-top.png) y [`después`](./after/work-detail-desktop-top.png).

## Inventario de clases

Familias canónicas introducidas para evitar herencia accidental:

- `global-nav*`: navegación, estado sticky y menú móvil.
- `editorial-hero*` y `editorial-page*`: hero full width y cuerpo editorial.
- `work-chapter*` y `work-gallery`: capítulo y listado de proyectos.
- `portfolio-entry*` y `portfolio-visual*`: cada caso y su placeholder de imagen.
- `case-intro*` y `case-study`: portada y contenido del detalle de caso.

Las clases `Stage`, `Pill` y sus variantes continúan de forma intencional en Home, Productos y MADRE. No son dependencias de las páginas corregidas ni una reutilización accidental del tema anterior.

## Lugares donde una imagen aporta evidencia

1. **Portadas del catálogo de casos**: nueve slots ya declarados, uno por caso, en proporción editorial 16:9.
2. **Detalle de cada caso**: una portada principal y las galerías ya declaradas; aquí convienen capturas reales, resultados o artefactos del proceso, no decoración genérica.
3. **Sobre mí**: un retrato editorial 4:5 ya identificado como pendiente.
4. **Servicios**: una sola visual de proceso puede explicar diagnóstico → diseño → construcción sin competir con la lectura.
5. **IA y sistemas**: un diagrama operativo puede mostrar datos, permisos, intervención humana y evidencia.
6. **Contacto**: solo añadir una prueba concreta —por ejemplo, una auditoría o entregable representativo— si ayuda a decidir; no necesita una imagen ornamental.

## Validación ejecutada

- `npm run check`: aprobado, 0 errores, 0 advertencias y 0 sugerencias.
- `npm run lint`: aprobado.
- `npm run build`: aprobado, 45 páginas generadas.
- `npx playwright test --project=320px`: 37/37 aprobado.
- `npm run test:e2e`: 296/296 aprobado en 320, 390, 430, 768, 1024, 1280 y 1440 px.

## Estado de decisión

La implementación está validada localmente, pero no se declara lista para fase 2 hasta que Jossue apruebe la dirección visual. No se hizo commit, push ni deploy en esta ronda.

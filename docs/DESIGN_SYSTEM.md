# Sistema de diseño

## Dirección

Sistema editorial, sobrio y principalmente monocromático. La personalidad debe provenir de
tipografía, escala, ritmo, composición y evidencia real, no de ornamento o animación. La
paleta final y activos de marca siguen pendientes.

## Principios

1. **Contenido primero:** la jerarquía responde a lectura y tareas.
2. **Contraste verificable:** no confiar solo en color para significado.
3. **Progresión clara:** resumen, evidencia y detalle en ese orden.
4. **Respuesta directa:** componentes fluidos, sin deformar texto ni reducirlo para “caber”.
5. **Movimiento opcional:** toda animación respeta `prefers-reduced-motion`.
6. **Estados explícitos:** foco, error, éxito, carga y vacío deben entenderse sin ambigüedad.

## Movimiento (implementado)

Principio: presencia y jerarquía, no ornamento. `src/scripts/motion.ts` + tokens en CSS.

- **Scroll por sección:** `scroll-snap-type: y proximity` en `html` (nunca `mandatory`);
  `.hero` y `.section` con `scroll-snap-align: start` y `scroll-margin-top` del header.
- **Viewport:** el hero usa `min-height: calc(100svh - var(--header-h))`; las secciones
  mantienen altura de contenido (sin forzar 100vh en casos largos).
- **Reveals:** entrada suave (`opacity` + `translateY` ~1.15rem, ~560ms, easing out);
  hero al cargar; secciones offscreen al entrar en vista; stagger breve en cards/KPIs/marcas.
- **Header:** sticky con blur ligero y estado `is-scrolled`.
- **Accesibilidad:** sin motion si `prefers-reduced-motion: reduce`; el contenido no depende
  de la animación; sin scroll-jacking.

### Galerías de evidencia

- Grid editorial con hover sutil y affordance “Ampliar”.
- Visor `<dialog>` inmersivo: contador, prev/next, filmstrip, Escape/flechas, foco.
- Marcadores de auditoría interactivos (resaltan hallazgos); en el visor, panel lateral.
- Diagramas: barras con crecimiento suave al revelar la sección.

## Tokens implementados

`src/styles/global.css` define actualmente:

- color: `--ink: #111111`, `--paper: #f5f4ef`, `--muted: #5c5b57`,
  `--line: #c9c7bf`;
- lectura/layout: `--measure: 68ch`, `--gutter: clamp(1rem, 3vw, 3rem)`;
- espacio: `--space-1` (0.5rem), `--space-2` (1rem), `--space-3` (1.5rem),
  `--space-4` y `--space-5` fluidos;
- tipografía: `--heading`, `--body`, `--mono`.

La hoja usa layers `reset`, `tokens`, `base`, `layout`, `components` y `utilities`; incluye
retícula responsive, header, navegación móvil, breadcrumbs, tarjetas, formularios, footer,
foco visible y reducción de movimiento.

Los valores están implementados y probados como base técnica, pero siguen **provisionales
como identidad de marca** hasta recibir paleta, guía, activos y contraste manual aprobado.

## Tipografía provisional

- Display y encabezados: Inter Tight.
- Cuerpo e interfaz: Source Sans 3.
- Alojamiento: paquetes locales `@fontsource-variable/inter-tight` y
  `@fontsource-variable/source-sans-3`, sin solicitud a CDN.
- Nombres CSS actuales: `"Inter Tight Variable"` y `"Source Sans 3 Variable"`.
- Fallbacks actuales: `"Arial Narrow", sans-serif` para encabezados y `Arial, sans-serif`
  para cuerpo; la ampliación de fallbacks sigue siendo una mejora provisional documentada.
- No usar `transform: scaleX`, `font-stretch` sobre una fuente sin eje de anchura ni otras
  técnicas que deformen glifos.

La justificación completa y alternativas están en `TYPOGRAPHY_STUDY.md`.

## Escala y composición

- Texto de cuerpo con tamaño mínimo cómodo y altura de línea generosa.
- Longitud objetivo de lectura: aproximadamente 45–75 caracteres, validada por idioma.
- Escala fluida con `clamp()` solo cuando conserve zoom y reflujo.
- Ritmo vertical consistente entre encabezados, párrafos, medios y pies.
- Retícula flexible que colapsa a una columna sin alterar el orden del documento.

## Componentes implementados

### Navegación

Orden de foco igual al visual, indicador de ubicación y área táctil suficiente. El estado
activo no depende solo de color.

### Encabezado editorial

Etiqueta contextual, título único, resumen y metadatos verificables. Evitar titulares que
afirmen impacto no validado.

### Tarjeta de proyecto

Usa título, resumen, rol y medio aprobado. Toda la tarjeta no debe convertirse en una zona
interactiva ambigua; el enlace mantiene nombre accesible claro.

### Caso de estudio

Bloques para contexto, rol, decisiones, evidencia, resultados y límites. Figuras con
`figure`/`figcaption` cuando la leyenda aporte contexto.

### Métrica

Valor, unidad, definición, periodo y fuente deben permanecer juntos. Si falta cualquiera de
los elementos necesarios, no se presenta como resultado público.

### Cita

Texto exacto, atribución autorizada y contexto. No usar comillas decorativas como contenido
duplicado para lectores de pantalla.

### Botón y enlace

Botón para acciones; enlace para navegación. Estados hover, focus-visible, active, disabled
y visited cuando ayude a orientación.

### Formularios

Solo si se aprueba un mecanismo de contacto. Etiquetas persistentes, instrucciones antes del
campo, errores vinculados programáticamente y confirmación no dependiente de color.

## Iconografía y Zappicon

Los iconos nunca sustituyen etiquetas necesarias. Se usa un **subconjunto curado** de
Zappicon v1.2 Free (estilo Light) vía `Icon.astro` y SVGs en `src/assets/icons/zappicon/`.

Criterio “menos es más”:

- affordance funcional (menú, descarga, continuar, externo, canales de contacto);
- sin iconos en la navegación principal, sin filas decorativas y sin adornos en el hero;
- color por `currentColor`; tamaño ~1rem; decorativos con `aria-hidden` salvo el menú móvil;
- no redistribuir el pack completo ni inventar iconos “estilo Zappicon”.

## Medios

- No incrustar texto esencial en imágenes.
- Mantener relación de aspecto para evitar CLS.
- Proveer tamaño y formato adecuados al viewport.
- Redactar información sensible antes de optimizar.
- Documentar texto alternativo según función, no apariencia aislada.

## Criterio de terminado

Un componente requiere contenido real aprobado, teclado, zoom, contraste, reflujo, estados,
lector de pantalla, reducción de movimiento y presupuesto de rendimiento. Una captura visual
por sí sola no constituye aceptación.

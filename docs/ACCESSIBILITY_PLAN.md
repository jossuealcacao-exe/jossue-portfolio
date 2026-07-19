# Plan de accesibilidad

## Compromiso

Objetivo: conformidad **WCAG 2.2 nivel AA** y una experiencia útil más allá de una lista de
comprobación. La aceptación combina revisión automática, manual y pruebas con contenido real.
No se declarará conformidad antes de probar la implementación desplegable.

## Estado implementado y validado

- HTML estático con `lang`, regiones semánticas, `h1`, skip link, header/footer y breadcrumbs.
- Navegación operable mediante enlaces y menú móvil `details`.
- Selector ES/EN preserva equivalencia.
- Foco visible, objetivos táctiles base y `prefers-reduced-motion`.
- Layout probado sin overflow horizontal y con consola limpia en 320, 375, 430, 768, 1024,
  1280 y 1440 px.
- Playwright: 56/56 pruebas en las siete configuraciones.
- Formulario con labels, tipos/autocomplete, límites, consentimiento, honeypot y región
  `aria-live`; permanece deshabilitado y no envía datos sin endpoint.

Pendiente: auditoría manual criterio por criterio WCAG 2.2 AA, lector de pantalla, contraste
de todos los estados, zoom/reflow manual, forced colors, contenido/alternativas reales y
pruebas de formulario con un endpoint aprobado.

## Responsabilidad

La accesibilidad se integra en contenido, diseño, desarrollo y control de calidad. Cada
hallazgo debe registrar severidad, criterio relacionado, evidencia, responsable, corrección
y verificación. Una excepción requiere justificación y fecha de revisión.

## Estructura y semántica

- Un `h1` que describa cada documento y niveles de encabezado coherentes.
- Regiones (`header`, `nav`, `main`, `aside`, `footer`) con nombres cuando haya varias.
- Listas, tablas, citas y figuras según su significado.
- Botones para acciones y enlaces para navegación.
- Título de página único, idioma del documento y cambios de idioma marcados.
- Orden del DOM equivalente al orden de lectura y foco.
- Enlace para saltar al contenido y mecanismo para volver cuando la página sea extensa.

## Teclado y foco

- Toda función operable sin puntero.
- Foco visible con contraste suficiente y sin quedar oculto por contenido fijo.
- Sin trampas de teclado; Escape y retorno de foco definidos en diálogos.
- Orden predecible, sin valores positivos de `tabindex`.
- Objetivos con tamaño mínimo WCAG 2.2 o separación equivalente.
- Interacciones por arrastre con alternativa de una sola acción.

## Percepción visual

- Contraste AA para texto y componentes; probar estados, no solo valores base.
- No comunicar estado únicamente mediante color, forma o posición.
- Zoom al 200% sin pérdida y reflujo a 320 CSS px sin desplazamiento bidimensional salvo
  contenido que lo requiera, como una tabla de datos.
- Espaciado de texto modificable sin recortes.
- Orientación no bloqueada.
- Texto esencial en HTML, no incrustado en imágenes.

## Tipografía

- Inter Tight se reserva para display/encabezados y Source Sans 3 para cuerpo/UI.
- No deformar texto ni usar pesos/cursivas sintéticos.
- Tamaño, altura de línea y ancho de columna se prueban con español e inglés.
- Los fallbacks deben permanecer legibles durante fallo o carga de fuente.
- Respeto a zoom del navegador y preferencias del sistema.

## Imágenes, vídeo y movimiento

- Texto alternativo según propósito; imágenes decorativas con alternativa vacía.
- Capturas complejas acompañadas por explicación en el cuerpo.
- Subtítulos, transcripción y audiodescripción según el medio incorporado.
- No autoplay con sonido.
- Respetar `prefers-reduced-motion`; ninguna tarea depende de animación.
- Evitar destellos y desplazamientos que interfieran con lectura.

## Casos y métricas

- Leyendas explican qué demuestra un artefacto.
- Diagramas incluyen equivalente textual.
- Métricas mantienen valor, unidad, periodo, definición y fuente juntos.
- No usar gráficos si una frase o lista comunica mejor.
- Material confidencial se redacta antes de crear alternativas textuales.

## Formularios y contacto

El formulario está implementado como interfaz, pero su botón está deshabilitado sin
`PUBLIC_CONTACT_ENDPOINT`. Antes de activarlo:

- etiqueta persistente asociada a cada campo;
- instrucciones y formato antes de la entrada;
- propósito de campos personales identificado cuando aplique;
- errores específicos, vinculados al campo y resumidos al inicio;
- no borrar valores tras un error;
- confirmación de envío y prevención de envíos accidentales;
- tiempo suficiente, sin CAPTCHA inaccesible;
- política de privacidad disponible antes de enviar.

## Navegación consistente y ayuda

- Mismos mecanismos en el mismo orden entre páginas.
- Enlaces con propósito comprensible en contexto.
- Múltiples formas de encontrar contenido cuando el volumen lo justifique.
- Contacto o ayuda consistente una vez exista un canal publicable.
- No repetir entrada de información innecesariamente en un flujo.

## Autenticación

No se prevé autenticación pública. Si aparece una zona privada, deberá evitar pruebas
cognitivas como única vía, permitir gestores de contraseñas y ofrecer alternativas accesibles.

## Pruebas

### Automáticas

Ejecutar análisis de HTML, nombres accesibles, contraste y reglas comunes en CI cuando exista
implementación. Ninguna herramienta automática certifica WCAG por sí sola.

### Manuales

- solo teclado y teclado móvil;
- lector de pantalla en al menos una combinación macOS/iOS y otra plataforma disponible;
- zoom 200% y 400%, reflujo 320 CSS px;
- alto contraste/forced colors cuando esté disponible;
- reducción de movimiento;
- fuentes bloqueadas, imágenes desactivadas y conexión lenta;
- errores de formulario y navegación dinámica;
- español e inglés si ambos se publican.

### Contenido

Revisar encabezados, nombres de enlace, lenguaje claro, texto alternativo, transcripciones,
atribución y vigencia. Un activo aprobado legalmente aún puede ser inaccesible.

## Criterio de salida

- cero bloqueadores de teclado o lector de pantalla;
- criterios A y AA aplicables revisados;
- hallazgos graves corregidos y regresiones cubiertas;
- declaración pública limitada a lo verificado;
- mecanismo de comentarios accesible, cuando haya contacto aprobado.

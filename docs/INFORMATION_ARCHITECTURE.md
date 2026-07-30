# Arquitectura de información

## Estado

Arquitectura bilingüe implementada como SSG. Existen 29 páginas estáticas: raíz, 14 en español
y 14 en inglés. Los slugs y equivalencias están aceptados; el dominio/canonical real sigue
bloqueado y la salida usa el fallback rastreable `https://portfolio.invalid`.

## Principios

1. La evidencia debe encontrarse antes que una lista extensa de habilidades.
2. Cada nivel debe explicar dónde está la persona, qué encontrará y cómo volver.
3. Proyectos y casos son entidades relacionadas, no necesariamente equivalentes.
4. La estructura debe funcionar con teclado, lectores de pantalla y pantallas pequeñas.
5. El contenido debe conservar sentido sin animación, JavaScript ni imágenes.
6. No crear secciones vacías para activos que aún no existen.

## Rutas implementadas

La raíz `/` genera una redirección HTML determinista a `/es/`; no detecta navegador, ubicación
ni preferencia almacenada. Una respuesta HTTP 308 requiere configuración en la plataforma de despliegue.

Rutas de página:

- ES: `/es/`, `/es/trabajo/`, `/es/servicios/`, `/es/ia-y-sistemas/`, `/es/acerca/`,
  `/es/contacto/`.
- EN: `/en/`, `/en/work/`, `/en/services/`, `/en/ai-and-systems/`, `/en/about/`,
  `/en/contact/`.

Casos, en ambos idiomas bajo `/es/trabajo/{slug}/` y `/en/work/{slug}/`:

- `wu-nutrition`;
- `bloqio-cro-apps`;
- `bloqio-builder`;
- `la-carniceria-virtual`;
- `come-verde`.
- `miawseo`;
- `vineria`;
- `tiendaonline`.

El selector de idioma conserva la página equivalente y, en casos, `counterpartSlug`; si no
puede resolver equivalencia, vuelve al inicio del idioma destino.

## Mapa conceptual implementado

- **Inicio**
  - propuesta de valor validada;
  - trabajo destacado;
  - prueba de enfoque;
  - siguiente paso.
- **Acerca / About**
  - biografía;
  - capacidades priorizadas;
  - trayectoria o CV;
  - principios de trabajo.
- **Trabajo**
	- trabajo de cliente;
	- productos propios y trabajo deseado;
	- conceptos técnicos;
	- filtros solo si el volumen real los justifica;
  - acceso a casos de estudio.
- **Caso de estudio**
  - resumen;
  - contexto y problema;
  - rol, equipo y restricciones;
  - proceso y decisiones;
  - resultado y aprendizajes;
  - créditos, permisos y trabajo relacionado.
- **Servicios / Services**
  - Shopify/desarrollo web, UX/CRO, optimización, analítica/adquisición e IA.
- **IA y sistemas / AI and systems**
  - principios de automatización responsable y límites.
- **Contacto**
  - disponibilidad y canal validado;
  - expectativas sobre respuesta y privacidad cuando correspondan.

La prueba social, certificaciones y activos reales no tienen rutas independientes hasta que
exista contenido aprobado.

## Navegación

### Global

El header implementa Inicio mediante la marca, Trabajo, Servicios, IA y sistemas, Acerca,
Contacto y selector ES/EN. En viewport estrecho usa un menú nativo `details`; el selector de
idioma permanece accesible (toggle con icono Zappicon Light + etiqueta accesible).
Zappicon no sustituye identidad de marca.

### Local en casos

Una tabla de contenidos puede ayudar en casos largos. Debe:

- reflejar encabezados reales;
- mantener foco y destino visibles;
- respetar el historial del navegador;
- no ocultar contenido detrás de estados interactivos;
- ofrecer navegación anterior/siguiente solo con orden editorial explícito.

### Pie

Puede reunir copyright, estado de privacidad, enlaces profesionales autorizados y método de
contacto. No se llenará con enlaces legales ficticios.

## Descubrimiento y búsqueda interna

No se implementará búsqueda o filtrado público sin volumen que lo justifique. Si hay filtros:

- el estado debe representarse en una URL estable si se añaden filtros públicos;
- los resultados deben anunciarse a tecnologías de asistencia;
- todos los proyectos deben seguir accesibles sin puntero;
- una categoría debe describir contenido real y no palabras clave aspiracionales.

## Arquitectura bilingüe

Español e inglés están implementados con:

- `lang` por documento;
- navegación equivalente definida en `src/data/i18n.ts`;
- ocho entradas de caso por idioma en la colección `cases`;
- `hreflang` ES/EN y `x-default` hacia el equivalente español;
- selector rastreable mediante enlaces, no control dependiente de JavaScript;
- títulos y descripciones localizados.

La equivalencia estructural está resuelta; la revisión humana del contenido real y la
capacidad de mantener traducciones siguen siendo requisitos editoriales.

## Taxonomía de trabajo

Campos editoriales que complementan el esquema técnico actual:

- tipo: caso de estudio o proyecto;
- rol;
- disciplina/capacidad;
- estado de publicación;
- año o periodo verificable;
- tecnologías, si ayudan a evaluar la contribución;
- industria, solo si está autorizada;
- idioma disponible.

Evitar taxonomías con un único ítem o categorías que revelen clientes confidenciales.

## Estados vacíos y fallos

- No mostrar secciones de testimonios, certificaciones o métricas sin contenido aprobado.
- Si un activo falta, preservar lectura y contexto en vez de usar contenido de relleno.
- La página no encontrada debe explicar el error y ofrecer navegación segura; su URL se
  definirá con la implementación.
- Enlaces externos deben indicar destino cuando no sea evidente.

## Validación

Probar el mapa con tareas: comprender el enfoque, localizar un caso, determinar el rol,
verificar un resultado y encontrar contacto. Registrar lenguaje confuso antes de congelar
navegación o rutas.

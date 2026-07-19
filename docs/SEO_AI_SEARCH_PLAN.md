# Plan de SEO y búsqueda con IA

## Estado y bloqueos

Las rutas ES/EN están implementadas, pero no se conoce el dominio público real ni un canal de
contacto. La configuración usa intencionalmente `https://portfolio.invalid` como fallback
rastreable para construir canonical, alternates, sitemap y JSON-LD completos durante
validación. `.invalid` es un **bloqueo de publicación**: producción exige `PUBLIC_SITE_URL`.

Mientras se usa el fallback, `robots.txt` responde `Disallow: /`; con un sitio real configurado
cambia a `Allow: /` e incluye el sitemap.

## Objetivo

Hacer que el contenido autorizado sea:

- rastreable sin depender de JavaScript;
- comprensible por su estructura y contexto;
- atribuible a la persona y al trabajo correctos;
- consistente entre página, metadatos y datos estructurados;
- citable sin exponer material confidencial;
- medible sin optimizar para volumen vacío.

## Base técnica

1. HTML estático semántico con título y descripción por página.
2. `lang`, selector equivalente, `hreflang` ES/EN y `x-default` implementados.
3. Canonical absoluto generado desde `Astro.site`, hoy con fallback `.invalid`.
4. Sitemap generado por `@astrojs/sitemap`.
5. `robots.txt` dinámico según exista o no sitio real configurado.
6. Redirección 308 de `/` a `/es/`.
7. Open Graph (`og:type`, sitio, título, descripción, URL y locales) implementado.
8. Twitter card, título y descripción implementados.
9. Enlaces internos validados sobre las 23 páginas generadas.

Pendientes: dominio real, imagen social aprobada, activos de marca, contacto publicable y
revisión editorial final de títulos/descripciones.

## Intención y contenido

- La portada responde quién es, qué problemas aborda y qué evidencia existe.
- Cada caso explicita contexto, rol, decisiones, resultados y límites.
- Cada proyecto diferencia demostración, código, demo y caso narrativo.
- Perfil y certificaciones solo contienen hechos verificables.
- La página de contacto puede explicar el estado actual; correo, WhatsApp u otros canales solo
  aparecen cuando están autorizados. El formulario permanece deshabilitado sin endpoint.

No crear páginas delgadas para palabras clave, industrias o ubicaciones no respaldadas por
trabajo real.

## Datos estructurados implementados

- `Person` y `WebSite` en todas las páginas;
- `ProfilePage` en inicios y páginas Acerca/About;
- `WebPage` en el resto;
- `BreadcrumbList` en páginas interiores y casos.

`CreativeWork` u otro tipo específico de caso no está implementado: se evaluará cuando el
primer caso tenga evidencia real. No se emiten `sameAs`, correo, teléfono ni datos inventados.

Reglas:

- usar JSON-LD generado desde la misma fuente de contenido;
- no declarar ocupación, empleador, premios, contacto o `sameAs` no verificados;
- no marcar testimonios o métricas como reseñas para buscar resultados enriquecidos;
- validar sintaxis y elegibilidad, pero no prometer resultados enriquecidos;
- reemplazar IDs basados en `.invalid` al configurar la URL pública real.

## Búsqueda asistida por IA

Los sistemas de IA se benefician de contenido claro y accesible, no de texto escrito para
“engañar” respuestas. Preparar:

- resúmenes autosuficientes al inicio de casos;
- atribución explícita de rol, equipo, periodo y fuentes;
- definiciones junto a cifras;
- fechas de revisión donde aporten vigencia;
- encabezados descriptivos y enlaces a evidencia autorizada;
- contenido equivalente disponible en HTML, no solo en imágenes o PDFs;
- límites y confidencialidad visibles para editores.

`llms.txt` u otros archivos emergentes no se adoptan por defecto. Antes de añadirlos se
verificará soporte actual, beneficio, mantenimiento y riesgo de duplicación. Tampoco se
añadirán bloques ocultos o contenido distinto para bots.

## Política de rastreadores

Definir una decisión explícita para:

- motores de búsqueda;
- rastreadores de entrenamiento;
- rastreadores de recuperación/citación;
- herramientas de archivo.

La política debe reflejar objetivos y derechos sobre el contenido. Bloquear rastreo no
revoca copias existentes ni protege un secreto; ningún dato confidencial debe desplegarse.

## Contenido bilingüe

Español e inglés ya tienen rutas, títulos, descripciones, canonical, `hreflang`, selector
rastreable y 5 casos equivalentes por idioma. Los esqueletos son bilingües, pero su contenido
real requiere revisión humana y evidencia equivalente antes del lanzamiento.

## Casos, métricas y privacidad

Las cifras de Bloqio Builder —57 usuarios y 45 páginas— no deben incluirse en HTML,
metadatos, JSON-LD, sitemap, fragmentos para IA ni imágenes. Son datos proporcionados pero no
publicables, sin fecha de corte y pendientes de definición, fuente, contexto y autorización.

## Control de calidad previo al lanzamiento

- rastreo local/de preview sin URLs huérfanas;
- títulos, descripciones y encabezados únicos;
- sustitución completa del fallback `.invalid` por dominio confirmado;
- canonical, alternates, sitemap, OG y JSON-LD válidos sobre ese dominio;
- sitemap limitado a páginas aprobadas;
- comprobación de indexabilidad y códigos HTTP;
- validación de datos estructurados;
- previsualizaciones sociales sin activos inventados;
- revisión de contenido sensible en HTML, mapas fuente, medios y metadatos;
- pruebas Lighthouse como señal, más datos de campo cuando exista tráfico suficiente.

## Seguimiento

Tras lanzamiento, registrar consultas y páginas de entrada solo mediante herramientas
aprobadas. Evaluar comprensión y oportunidades de contenido, no perseguir ranking con
afirmaciones no respaldadas. Cualquier cambio de ruta debe añadir redirección y actualizar
enlaces, sitemap, canonical y documentación.

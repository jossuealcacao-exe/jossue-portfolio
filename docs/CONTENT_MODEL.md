# Modelo de contenido

## Objetivo

Separar hechos, narrativa, evidencia y permisos para que el sitio pueda cambiar de diseño sin
perder trazabilidad. Astro ya implementa un modelo técnico inicial; el modelo editorial futuro
de este documento lo amplía sin convertir contenido provisional en evidencia.

## Colección técnica actual

`src/content.config.ts` exporta la colección `cases`, cargada desde un arreglo tipado y
validada con Zod. Contiene cinco casos por dos idiomas: 10 entradas publicables y 5 slugs
equivalentes.

Campos reales:

- `id`: identificador de entrada del loader, externo al objeto de datos validado por Zod;
- `lang`: `es` o `en`;
- `slug` y `counterpartSlug`;
- `title`, `client`, `summary`, `context`, `problem`, `role`;
- `diagnosis`, `intervention`, `decisions`, `stack`, `evidence`, `results`,
  `limitations`, `learnings`: listas de texto;
- `cta`;
- `verification`: `status` (`pending`, `requires-review` o `verified`), `asOf` nullable y
  `source`;
- `publication`: `publish` y `featured`;
- `internalClaims`, opcional: objetos con `label`, `value`, `publish: false`,
  `status: requires-review`, `asOf: null` y `source: prompt`.

`internalClaims` no se renderiza como contenido público. En Bloqio Builder conserva 57
usuarios y 45 páginas únicamente como datos proporcionados, no como datos “reales”,
verificados o publicables.

## Placeholders bilingües actuales

Las 10 entradas son esqueletos editoriales ES/EN. Sus textos identifican rol, contexto,
evidencia y resultados pendientes; son placeholders deliberados para validar estructura,
rutas y componentes. `publication.publish: true` significa que el esqueleto se genera, no que
la evidencia del caso esté aprobada. WU Nutrition / DUMO es el caso destacado y próximo a
integrarse con evidencia validada.

## Reglas comunes

Toda entidad publicable debe poder registrar:

- identificador interno estable;
- título o nombre aprobado;
- idioma;
- resumen;
- estado editorial;
- fecha de revisión, si existe;
- propietario del contenido;
- fuentes o evidencia;
- sensibilidad;
- permiso de publicación;
- texto alternativo o equivalente textual para medios;
- relaciones con otras entidades.

Estados editoriales recomendados: borrador, revisión, verificado y aprobado. El catálogo de
insumos conserva sus estados operativos exactos y es la fuente para disponibilidad.

## Entidad: perfil

- nombre publicable y pronunciación, si se proporciona;
- titular o propuesta validada;
- biografía corta y larga;
- retrato y crédito;
- capacidades priorizadas;
- idiomas confirmados;
- disponibilidad;
- CV público;
- canales de contacto relacionados.

No inferir cargo, pronombres, ubicación, idiomas ni disponibilidad.

## Entidad: proyecto

- nombre interno y título publicable;
- resumen;
- estado y periodo verificable;
- rol y contribución;
- equipo o colaboradores;
- capacidades y tecnologías;
- imagen de portada;
- enlaces autorizados;
- restricciones y permiso;
- relación opcional con un caso.

El slug y la URL quedan fuera del contenido fuente hasta decidir arquitectura pública.

## Entidad: caso de estudio

- proyecto relacionado;
- resumen ejecutivo;
- contexto, audiencia y problema;
- objetivos y restricciones;
- rol, responsabilidades y equipo;
- proceso, alternativas y decisiones;
- artefactos;
- resultados;
- aprendizajes y límites;
- créditos;
- permiso por elemento;
- fecha de revisión.

El resultado no debe reducirse a una cifra sin definición, fuente, periodo y atribución.

## Entidad: métrica

- nombre;
- definición;
- valor y unidad;
- población o denominador;
- fuente;
- periodo o fecha de corte;
- método;
- responsable de validación;
- límites de atribución;
- sensibilidad;
- permiso de publicación.

Registro conocido: Bloqio Builder, 57 usuarios y 45 páginas. Ambos valores están
proporcionados, pero sin fecha de corte, definiciones, fuente validada ni autorización; su
estado es confidencial y no publicable.

## Entidad: testimonio

- cita exacta;
- autor y cargo autorizados;
- organización autorizada;
- relación con el trabajo;
- fecha o contexto;
- idioma y traducción aprobada;
- evidencia de consentimiento;
- alcance del permiso;
- sensibilidad.

No construir una cita a partir de una conversación ni corregir su sentido.

## Entidad: certificación

- nombre oficial;
- entidad emisora;
- fecha de emisión y vencimiento;
- estado;
- URL pública de verificación, si existe;
- evidencia privada;
- permiso de publicación.

## Entidad: activo

- archivo fuente;
- tipo MIME y dimensiones;
- descripción;
- texto alternativo o indicación decorativa;
- autor/crédito;
- licencia y restricciones;
- entidades relacionadas;
- versión redactada;
- sensibilidad;
- permiso de publicación.

## Entidad: contacto

- tipo de canal;
- etiqueta pública;
- valor o URL;
- propósito;
- vigencia;
- responsable;
- nivel de privacidad;
- permiso.

No existe aún un contacto publicable. El modelo no debe poblarse con un dato provisional.

## Entidad: enlace

- destino;
- etiqueta;
- propietario;
- relación con el portafolio;
- última verificación;
- comportamiento externo;
- permiso.

## Validaciones editoriales

Antes de publicar:

1. Campos obligatorios completos.
2. Evidencia accesible para el revisor.
3. Permisos diferenciados por texto, imagen, logo y cifra.
4. Texto alternativo contextual, no derivado del nombre del archivo.
5. Enlaces y fechas vigentes.
6. Datos personales minimizados.
7. Traducciones equivalentes cuando existan.

## Evolución de la implementación

La colección y rutas ya existen. El siguiente paso es actualizar la entrada estructurada de
WU Nutrition / DUMO desde fuentes depositadas en `_inputs/case-studies/`, sin romper el
esquema actual. El modelo editorial futuro puede añadir autoría, permisos por activo, medios,
fechas, taxonomía y traducción, después de validarlo con ese primer caso.

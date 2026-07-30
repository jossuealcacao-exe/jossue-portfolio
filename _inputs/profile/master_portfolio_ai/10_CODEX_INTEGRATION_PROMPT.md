# Prompt para integrar este paquete en `jossue-portfolio`

Trabaja únicamente dentro del repositorio `jossue-portfolio` actualmente abierto.

## Objetivo

Integrar el paquete de contexto ubicado en:

```text
_inputs/portfolio_context_2026-07-18/
```

y sustituir los placeholders editoriales actuales por contenido estructurado, bilingüe y trazable.

## Antes de editar

1. Ejecuta `git status`.
2. Inspecciona:
   - `src/content.config.ts`
   - rutas de casos;
   - páginas de capacidades;
   - componentes de evidencia;
   - navegación ES/EN;
   - metadata;
   - documentación del proyecto.
3. Lee todos los archivos del paquete.
4. No asumas que cada archivo corresponde a un caso.
5. Conserva el sistema actual de verificación y publicación.

## Clasificación obligatoria

### Casos

- Bloqio Builder.
- Bloqio CRO Apps.

### Capacidades o líneas de servicio

- Shopify.
- IA aplicada.
- Sistemas Operativos de IA.
- IA aplicada en empresas.

No conviertas automáticamente las cuatro capacidades en case studies con cliente, resultados o métricas ficticias.

## Reglas de evidencia

Respeta las etiquetas:

- `VERIFIED_GITHUB`
- `VERIFIED_CV`
- `VERIFIED_OS_FILES`
- `CONTEXT_SUPPORTED`
- `REQUIRES_CONFIRMATION`
- `DO_NOT_PUBLISH`

### Prohibiciones

- No publicar 57 usuarios ni 45 páginas.
- No publicar satisfacción, tráfico, precio, plantillas o métricas sin evidencia.
- No inventar conversión, ingresos, instalaciones, MRR o ahorro.
- No afirmar que Hermes tiene repositorio si no se localiza.
- No asumir que Bloqio CRO Toolkit es Hermes.
- No presentar el Toolkit como producción validada.
- No copiar secretos, IDs de cliente, URLs internas sensibles ni riesgos de seguridad.
- No presentar agentes de código como autores o propietarios del producto.

## Redacción de rol

Para proyectos desarrollados con agentes, usa formulaciones como:

> Jossue dirigió el producto, UX, sistemas, arquitectura de flujos y ejecución técnica asistida por agentes de código.

Evita:

> Jossue escribió individualmente cada parte del código.

## Bloqio Builder

Actualiza el caso para reflejar el estado real verificado:

- producto para personas no técnicas;
- Blob;
- bloques;
- editor;
- frontend/backend;
- AI actions controladas;
- audit;
- recompensas;
- mobile-first;
- AHP;
- Cloudflare Pages;
- Railway.

Mantén resultados comerciales como pendientes.

## Bloqio CRO Apps

Construye el caso alrededor de la familia de herramientas Shopify.

Distingue:

- TopBar CRO: fuerte evidencia.
- Toolkit: evidencia complementaria con estado de laboratorio/release candidate.
- Prometeo: relación probable con TopBar, pendiente de confirmación nominal.
- Hermes: respaldado por CV, pero sin evidencia de repo accesible.

## Páginas de capacidad

Crea o actualiza páginas para:

1. Shopify.
2. IA aplicada.
3. Sistemas Operativos de IA.
4. IA en empresas.

Cada página debe contener:

- propuesta de valor;
- problemas que resuelve;
- capacidades;
- proceso;
- evidencia;
- proyectos relacionados;
- límites;
- CTA.

## Bilingüe

Produce versiones ES/EN equivalentes, no traducciones literales deficientes.

## Arquitectura de información

Jerarquía comercial:

1. Shopify.
2. Development.
3. UX/CRO.
4. Bloqio Builder.
5. Applied AI.
6. AI Operating Systems.
7. Enterprise AI.
8. Paid media, analytics y SEO como capacidades complementarias.

## Definition of Done

- contenido ES/EN integrado;
- cero métricas sin validar;
- casos y capacidades correctamente separados;
- enlaces internos correctos;
- metadata actualizada;
- no hay contenido interno renderizado;
- `npm run check` pasa;
- `npm run lint` pasa;
- `npm run build` pasa;
- `npm run test:routes` pasa;
- `npm run test:links` pasa;
- E2E ejecutado si el entorno lo permite;
- documentación actualizada;
- reporte final con archivos cambiados, decisiones, validaciones y pendientes.

## Reporte final

Entrega:

1. Resumen.
2. Archivos modificados.
3. Contenido integrado.
4. Claims retenidos como privados.
5. Validaciones ejecutadas.
6. Errores o warnings.
7. Activos todavía requeridos.
8. Commit sugerido.

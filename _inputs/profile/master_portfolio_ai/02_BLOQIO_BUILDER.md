# Bloqio Builder

## Clasificación

- Tipo: producto propio y caso principal.
- Papel en el portafolio: flagship product.
- Evidencia principal: `jossuealcacao-exe/bloqio-builder`.
- Rama de producción registrada: `iris-beta`.
- Visibilidad del repositorio: privada.
- Estado editorial: apto para desarrollar un caso completo, sin métricas comerciales públicas todavía.

## Resumen público — Español

Bloqio Builder es un creador de páginas web con IA diseñado para personas no técnicas y negocios locales. El usuario construye y mejora su sitio conversando con Blob, un asistente que transforma objetivos de negocio en cambios controlados sobre estructura, contenido, diseño, SEO y preparación para publicar.

El proyecto combina producto, UX, desarrollo frontend, backend, sistemas de bloques, inteligencia artificial, auditoría guiada y una experiencia mobile-first.

## Public summary — English

Bloqio Builder is an AI-powered website builder designed for non-technical users and local businesses. Users create and improve their websites by working with Blob, an assistant that turns business goals into controlled changes across structure, content, visual design, SEO, and publishing readiness.

The product combines product strategy, UX, frontend and backend development, modular blocks, applied AI, guided auditing, and a mobile-first experience.

## Contexto

La mayoría de los creadores web exigen que el usuario comprenda plantillas, jerarquías, componentes, diseño y configuración técnica. Bloqio Builder replantea ese flujo: el usuario expresa lo que necesita y el producto traduce esa intención en una página estructurada que todavía puede revisar y editar.

## Problema

- Personas no técnicas no saben por dónde empezar.
- Un editor completamente libre aumenta la complejidad y el margen de error.
- La IA generativa puede proponer cambios inseguros o inconsistentes si no tiene límites.
- Publicar una página no significa que esté clara, completa o preparada para convertir.
- La experiencia debe funcionar especialmente bien en móvil.

## Rol de Jossue

Founder, product builder y director del producto.

Responsabilidades documentadas o consistentes con el proyecto:

- Definición del concepto y modelo de producto.
- Dirección de UX/UI.
- Arquitectura de flujos.
- Diseño del sistema de bloques.
- Criterio CRO y preparación para publicación.
- Definición del comportamiento de Blob.
- Ingeniería de prompts y acciones de IA.
- Dirección de implementación mediante Claude Code, Codex y otros agentes.
- QA visual y funcional.
- Documentación de decisiones, riesgos y handoffs.
- Priorización de producto, planes, cuenta, administración y publicación.

No presentar a Jossue como autor manual de cada línea de código. La formulación más precisa es: dirigió producto, experiencia, sistemas y ejecución técnica con agentes de código.

## Qué existe y está respaldado

### Fundación técnica

El repositorio documenta:

- React 19.
- TypeScript.
- Vite.
- Zustand.
- Zod.
- Motion.
- CSS custom properties.
- Build con `tsc -b` y Vite.
- Playwright configurado para pruebas E2E, incluyendo proyectos móviles.
- Arquitectura basada en un esquema JSON como fuente de verdad.
- Secciones modulares.
- Vista previa desktop/mobile.
- Inspector de edición.
- Edición de listas.
- Ajustes de sitio y SEO.
- Guardado, carga, reinicio y exportación JSON.

### Producto actual más allá del README inicial

Los PRs y handoffs más recientes verifican que el producto evolucionó mucho más allá de “Foundation MVP”:

- Frontend desplegado en Cloudflare Pages.
- Backend desplegado en Railway.
- Autenticación y cuenta.
- Panel administrativo.
- Sistema de páginas y salidas.
- Notificaciones.
- Flujos relacionados con billing y cancelación.
- Feedback por estrellas y consulta de reseñas en administración.
- Onboarding conversacional.
- Blob con LLM real.
- Reescritura de copy.
- Planes de acciones.
- Acciones tipadas y validadas.
- Rate limits.
- Fallback cuando la IA no está disponible.
- Vocabulario controlado para temas, color y tipografía.
- Auditoría dentro del chat.
- Asistencia en SEO y datos de negocio.
- Aplicación agrupada de cambios.
- Sistema de recompensas basado en ocho áreas del audit.
- Progreso hacia “Lista para publicar”.
- Experiencias Liquid Glass.
- Uso documentado de AHP para continuidad entre agentes.

## Decisiones de producto relevantes

1. **IA controlada, no edición arbitraria.**  
   Blob trabaja mediante acciones tipadas, validadores, revisión y posibilidad de revertir.

2. **Conversación más edición visible.**  
   El usuario puede pedir ayuda, pero conserva contexto, revisión y control.

3. **Auditoría dentro del flujo.**  
   La salud de la página se integra en el chat en vez de vivir como una herramienta aislada.

4. **Preparación para publicar como meta.**  
   El sistema convierte la completitud y calidad del sitio en una progresión comprensible.

5. **Blob como coach.**  
   Las recompensas no celebran clics menores; celebran hitos reales ligados al audit.

6. **Mobile-first.**  
   El proyecto contiene ajustes específicos de viewport, teclado, scroll, docks, sheets y pruebas móviles.

7. **Continuidad operativa.**  
   El repositorio utiliza AHP, handoff points, logs, registros de riesgo y decisiones.

## Stack verificable

### Frontend

- React 19.
- TypeScript.
- Vite.
- Zustand.
- Zod.
- Motion.
- CSS custom properties.
- Playwright.

### Backend e infraestructura

- Backend Node/TypeScript documentado en el proyecto.
- Railway.
- Cloudflare Pages.
- Prisma en flujos documentados del repositorio.
- Integración con Anthropic mediante proveedor encapsulado.
- JWT/auth, rate limiting y validación de acciones.

### Desarrollo asistido

- Claude Code.
- Codex.
- GitHub.
- AHP.

## Evidencia técnica destacada

| Evidencia | Qué demuestra |
|---|---|
| README de `bloqio-builder` | Fundación de editor, esquema JSON y stack |
| `package.json` | Dependencias, build y E2E |
| PR #2 | Sistema de bloques, Blob AI y etapas G3–G5 |
| PR #3 | Onboarding, observabilidad y despliegue Cloudflare/Railway |
| PR #4 | Feedback por estrellas y reviews en admin |
| `docs/HANDOFF_POINTS.md` | Decisiones, validaciones, riesgos y continuidad |
| Commits de julio de 2026 | Recompensas, auditoría, UI, cuenta y correcciones de build |

## Resultados que sí pueden describirse

- El producto pasó de una fundación estática a una aplicación con frontend, backend y flujos de IA integrados.
- Los cambios principales recientes pasaron el build de producción.
- Se documentaron verificaciones manuales con LLM real para reescritura, planes, acciones, auditoría y recompensas.
- Se estableció una arquitectura de continuidad entre agentes mediante AHP.
- Se construyó un sistema de producto capaz de guiar al usuario desde onboarding hasta preparación para publicar.

## Resultados que no deben publicarse todavía

- Número de usuarios.
- Número de páginas.
- Tasa de publicación.
- Conversión.
- Retención.
- Ingresos.
- Satisfacción.
- Tráfico.
- Valoración de usuarios.

## Limitaciones que conviene declarar

- El README principal está desactualizado respecto al producto real.
- Algunas validaciones recientes son build + revisión visual, no una suite automatizada completa para cada flujo.
- Hay advertencia de bundle grande.
- La cuota diaria de LLM fue documentada como un backstop en memoria, no como contabilidad persistente.
- Cualquier dato comercial requiere una fuente separada del código.
- Los riesgos o secretos antiguos documentados no deben reproducirse públicamente.

## Activos necesarios

- Captura del onboarding con Blob.
- Captura del editor.
- Captura del plan de acciones.
- Captura de la auditoría.
- Captura del sistema de recompensas.
- Vista móvil real.
- Vista de una página publicada.
- Diagrama sencillo frontend → backend → LLM.
- Video corto del flujo.
- Logotipo autorizado.
- Métricas con fecha, fuente y permiso.

## CTA sugerido

### Español

¿Necesitas convertir una idea compleja en un producto que una persona real pueda usar? Hablemos de producto, UX, Shopify e IA aplicada.

### English

Need to turn a complex idea into a product real people can use? Let’s talk about product, UX, Shopify, and applied AI.

# Registro de decisiones

## Cómo usar este registro

Cada decisión debe incluir estado, contexto, elección, consecuencias, evidencia y condición
de revisión. Estados: propuesta, aceptada, reemplazada o rechazada. No borrar decisiones
anteriores; añadir una nueva entrada que las reemplace.

## D-001 · Fuente de verdad de contenido

- **Estado:** aceptada para esta fase.
- **Decisión:** `_inputs/catalogue_inputs/` controla disponibilidad y aprobación;
  `_inputs/**` conserva fuentes/evidencia; `docs/**` conserva planes y decisiones. La
  implementación es una salida derivada.
- **Motivo:** separar recepción, autorización y presentación evita publicar por accidente.
- **Consecuencia:** “Recibido” no implica “Aprobado para publicar”.
- **Revisar cuando:** exista un flujo editorial o CMS aprobado.

## D-002 · Dirección visual inicial

- **Estado:** aceptada provisionalmente.
- **Decisión:** enfoque editorial monocromático basado en tipografía, ritmo y composición.
- **Motivo:** permite avanzar sin inventar una paleta o activos de marca.
- **Consecuencia:** el monocromo no se declara identidad final.
- **Revisar cuando:** lleguen logotipo, paleta y manual autorizados.

## D-003 · Tipografía

- **Estado:** aceptada provisionalmente.
- **Decisión:** Inter Tight para display/encabezados y Source Sans 3 para cuerpo/UI,
  self-hosted con fallbacks documentados.
- **Motivo:** contraste jerárquico, lectura bilingüe y coste controlable.
- **Consecuencia:** limitar pesos, conservar licencia OFL y no deformar glifos.
- **Revisar cuando:** exista contenido real y medición móvil/fuentes.

## D-004 · Zappicon

- **Estado:** aceptada.
- **Decisión:** registrar Zappicon como faltante y no disponible; no sustituir ni recrear.
- **Motivo:** no existe un activo fuente autorizado.
- **Consecuencia:** ningún icono genérico debe presentarse como Zappicon.
- **Revisar cuando:** se reciba el original y permiso de uso.

## D-005 · URL pública y canonical

- **Estado:** aceptada con release gate.
- **Decisión:** usar `https://portfolio.invalid` como fallback intencional y rastreable para
  generar canonical, sitemap, alternates, OG y JSON-LD durante validación.
- **Motivo:** la arquitectura requiere URLs absolutas aunque no exista dominio real.
- **Consecuencia:** `robots.txt` bloquea rastreo con `.invalid`; producción no puede salir
  hasta configurar `PUBLIC_SITE_URL` con HTTPS y revisar toda URL emitida.
- **Revisar cuando:** se proporcione y valide el dominio público.

## D-006 · Contacto

- **Estado:** propuesta bloqueada.
- **Decisión:** no inventar correo, teléfono ni perfil; mantener el formulario implementado
  pero deshabilitado sin endpoint.
- **Motivo:** no existe canal publicable proporcionado.
- **Consecuencia:** la página/CTA existen, pero no se envían datos ni se publica canal directo.
- **Revisar cuando:** se confirme destino, responsable, privacidad y vigencia.

## D-007 · Métricas Bloqio Builder

- **Estado:** aceptada.
- **Decisión:** conservar 57 usuarios y 45 páginas como datos proporcionados, confidenciales
  y no publicables.
- **Motivo:** faltan fecha de corte, definición, fuente validada, contexto y autorización.
- **Consecuencia:** no usar en contenido, SEO, datos estructurados, imágenes ni analítica.
- **Revisar cuando:** se documenten todos los campos y una aprobación explícita.

## D-008 · Analítica

- **Estado:** aceptada parcialmente.
- **Decisión:** mantener un `dataLayer` local y eventos mínimos; no elegir ni activar proveedor.
- **Motivo:** faltan objetivo final, criterio legal, consentimiento, retención y propiedad.
- **Consecuencia:** existe instrumentación local parcial, sin IDs, requests ni scripts externos.
- **Revisar cuando:** privacidad y objetivos estén aprobados.

## D-009 · Accesibilidad

- **Estado:** aceptada.
- **Decisión:** objetivo WCAG 2.2 AA con pruebas manuales y automáticas.
- **Motivo:** accesibilidad es requisito de contenido, diseño e implementación.
- **Consecuencia:** no declarar conformidad solo por puntuaciones automáticas.
- **Revisar cuando:** cambie el estándar objetivo o aparezcan excepciones justificadas.

## D-010 · Rendimiento

- **Estado:** aceptada provisionalmente.
- **Decisión:** adoptar presupuesto de bytes, terceros cero al inicio y umbrales CWV
  documentados.
- **Motivo:** prevenir regresiones antes de integrar medios y componentes.
- **Consecuencia:** cada dependencia, fuente, imagen y script debe justificar su coste.
- **Revisar cuando:** mediciones del primer caso y datos de campo estén disponibles.

## D-011 · Primer caso

- **Estado:** aceptada, contenido pendiente.
- **Decisión:** integrar WU Nutrition / DUMO como primer caso real.
- **Motivo:** probar el patrón con evidencia real antes de escalar.
- **Consecuencia:** el esqueleto técnico bilingüe existe; evidencia, rol, permisos y narrativa
  real deben depositarse y validarse antes de reemplazarlo.
- **Revisar cuando:** WU Nutrition / DUMO tenga fuentes y permisos suficientes.

## D-012 · Rutas y bilingüismo

- **Estado:** aceptada.
- **Decisión:** rutas paralelas ES/EN, trailing slash y equivalencia explícita; casos conservan
  el mismo slug por idioma.
- **Motivo:** navegación predecible, SEO bilingüe y mantenimiento estructurado.
- **Consecuencia:** selector enlaza equivalentes y `/` conduce a español sin detección.
- **Revisar cuando:** cambie la estrategia de idioma o un caso requiera slugs distintos.

## D-013 · Stack Astro/TypeScript/SSG

- **Estado:** aceptada.
- **Decisión:** Astro 7.1.1, TypeScript strict y salida estática.
- **Motivo:** contenido editorial rápido, HTML rastreable y JavaScript limitado.
- **Consecuencia:** 23 páginas se generan en build; comportamiento dinámico requiere mejora
  progresiva o servicio externo explícito.
- **Revisar cuando:** una necesidad validada no pueda resolverse de forma estática.

## D-014 · Redirección raíz

- **Estado:** aceptada.
- **Decisión:** `/` redirige con 308 a `/es/` de forma determinista.
- **Motivo:** evitar detección opaca por navegador, ubicación o cookie.
- **Consecuencia:** español es el destino predeterminado y el usuario cambia idioma con enlace.
- **Revisar cuando:** cambie el idioma predeterminado.

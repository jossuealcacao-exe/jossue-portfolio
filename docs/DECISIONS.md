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

- **Estado:** supersedida por D-018 (19 jul 2026).
- **Decisión original:** registrar Zappicon como faltante y no disponible; no sustituir ni recrear.
- **Motivo original:** no existía un activo fuente autorizado.
- **Consecuencia histórica:** ningún icono genérico debía presentarse como Zappicon.

## D-005 · URL pública y canonical

- **Estado:** aceptada con release gate.
- **Decisión:** usar `https://portfolio.invalid` como fallback intencional y rastreable para
  generar canonical, sitemap, alternates, OG y JSON-LD durante validación.
- **Motivo:** la arquitectura requiere URLs absolutas aunque no exista dominio real.
- **Consecuencia:** `robots.txt` bloquea rastreo con `.invalid`; producción no puede salir
  hasta configurar `PUBLIC_SITE_URL` con HTTPS y revisar toda URL emitida.
- **Revisar cuando:** se proporcione y valide el dominio público.

## D-006 · Contacto

- **Estado:** aceptada parcialmente.
- **Decisión:** publicar correo, LinkedIn y teléfono/WhatsApp obtenidos del CV y autorizados
  explícitamente el 18 de julio de 2026; mantener el formulario deshabilitado sin endpoint.
- **Motivo:** existen canales directos aprobados, pero no una infraestructura de formulario.
- **Consecuencia:** la página y el footer enlazan canales centralizados; no se envían datos por formulario.
- **Revisar cuando:** cambie un canal o se aprueben endpoint, privacidad y retención.

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

- **Estado:** aceptada e implementada.
- **Decisión:** integrar Bloqio Builder como primer caso completo, sin métricas comerciales.
- **Motivo:** es un producto propio con documentación y evidencia técnica más sólidas.
- **Consecuencia:** el caso ES/EN publica contexto, rol, decisiones, stack, evidencia,
  resultados cualitativos y límites; faltan activos visuales aprobados.
- **Revisar cuando:** existan capturas, métricas verificadas o una demo pública autorizada.

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

## D-015 · WU Nutrition, Come Verde y DUMO

- **Estado:** aceptada.
- **Decisión:** publicar narrativas separadas para WU Nutrition y Come Verde; omitir DUMO de
  rutas, títulos y contenido público.
- **Motivo:** instrucción explícita del propietario del portafolio el 18 de julio de 2026.
- **Consecuencia:** WU se presenta como caso Shopify/UX-CRO; Come Verde como Growth OS con
  límites visibles porque la fuente disponible documenta un alcance compuesto.
- **Revisar cuando:** lleguen artefactos exclusivos, permisos o evidencia visual de cada marca.

## D-016 · Evidencia pública de La Carnicería Virtual

- **Estado:** aceptada.
- **Decisión:** integrar cuatro capturas de la auditoría con anotaciones HTML accesibles que
  conectan ID, hallazgo, riesgo, recomendación, prioridad y confianza.
- **Motivo:** mostrar el método y la calidad de análisis sin publicar el archivo confidencial completo.
- **Consecuencia:** se publican señales técnicas y visuales verificables; quedan excluidos
  ventas, inversión, ROAS, honorarios, theme export, PII e identificadores de tracking.
- **Revisar cuando:** cambie el permiso de publicación o se incorporen capturas posteriores.

## D-017 · Integración del CV

- **Estado:** aceptada (ampliada 19 jul 2026).
- **Decisión:** publicar perfil estructurado + descarga del PDF en `/cv/Jossue-Alcala-CV.pdf`;
  publicar KPIs del CV (HP/Farmalisto/+8 años) y LCP LCV con fuente; actualizar rol vigente a
  Chief Ecommerce Manager (WU/Come Verde); integrar capacidades de programación con IA y
  automatizaciones de negocio desde `master_portfolio_ai`; omitir DUMO y métricas Bloqio
  sin permiso.
- **Motivo:** instrucción explícita del propietario el 19 de julio de 2026.
- **Consecuencia:** Acerca, footer, casos WU/Come Verde e IA reflejan el rol y las capacidades;
  el PDF descargable puede ir rezagado respecto al titular del sitio.
- **Revisar cuando:** exista CV EN actualizado con el nuevo cargo o cambien permisos de métricas.

## D-018 · Zappicon curado (menos es más)

- **Estado:** aceptada (19 jul 2026).
- **Decisión:** integrar un subconjunto mínimo de Zappicon v1.2 Free (estilo **1-Light**)
  vía SVGs locales en `src/assets/icons/zappicon/` y el componente `Icon.astro`; no usar el
  pack completo ni `@zappicon/react`.
- **Motivo:** el pack libre autorizado está depositado en `_inputs/brand/`; la UX editorial
  pide affordance silenciosa, no saturación.
- **Consecuencia / curaduría:** solo menú móvil, descarga de CV, flecha interna, salida
  externa, correo y chat (contacto). Sin iconos en nav, cards decorativas, estados ni hero.
  Las etiquetas siguen siendo primarias; los iconos son decorativos salvo el toggle de menú.
- **Revisar cuando:** se autorice un set de marca propio o cambie el criterio de densidad.

## D-019 · Logos de marcas en `/cv/brands`

- **Estado:** aceptada (19 jul 2026).
- **Decisión:** publicar un set curado de logos de clientes/empleadores en
  `public/cv/brands/` y mostrarlos con `BrandMark.astro` en Acerca (franja), cards de caso
  y hero de caso; no inventar marcas faltantes.
- **Motivo:** instrucción explícita; Bloqio y La Carnicería Virtual se localizaron desde
  activos propios y el logo público del storefront.
- **Consecuencia:** set inicial Bloqio, WU Nutrition, Come Verde, LCV, HP, Farmalisto.
  Densidad baja; el nombre de cliente permanece en texto.
- **Revisar cuando:** llegue un logo oficial distinto o permiso para omitir alguna marca.

## D-020 · Motion editorial por sección

- **Estado:** aceptada (19 jul 2026).
- **Decisión:** scroll-snap `proximity` + reveals por IntersectionObserver + header sticky;
  duraciones cortas (~220–560ms); sin full-page mandatory ni librerías de scroll-jacking.
- **Motivo:** pedir animación inmersiva/premium sin saturar ni degradar UX/a11y.
- **Consecuencia:** hero a viewport; secciones como puntos de anclaje; reduced-motion apaga
  snap y animaciones.
- **Revisar cuando:** medición real en móvil muestre fricción o se autorice motion más denso.

## D-021 · Estandarización internacional del rol vigente

- **Estado:** aceptada (6 ago 2026).
- **Decisión:** sustituir el título público `Chief Ecommerce Manager` por
  `Head of E-commerce & Digital Growth` para WU Nutrition y Come Verde, en sitio, casos,
  metadata, fuentes vigentes y CV descargable.
- **Motivo:** el alcance confirmado incluye ownership de estrategia comercial digital,
  presupuesto/P&L, liderazgo de equipo o proveedores y coordinación transversal de ecommerce,
  growth, medios, datos y tecnología. `Chief Ecommerce Manager` no comunica ese nivel de forma
  estándar internacional.
- **Consecuencia:** el título se conserva en inglés también en la interfaz ES para mantener una
  señal profesional consistente; la narrativa continúa explicando el alcance real y no añade
  resultados sin evidencia.
- **Revisar cuando:** cambie la responsabilidad sobre P&L, equipo, canales o la estructura de
  las organizaciones.

## D-022 · Blog en subdominio y monetización aislada

- **Estado:** aceptada (8 ago 2026).
- **Decisión:** publicar el blog como aplicación editorial autónoma en
	`blog.jossuealcala.com`, con portada, categorías, entradas, navegación principal, buscador,
	RSS y `BlogPosting`; reservar la carga de AdSense exclusivamente a esa aplicación y
	mantenerla desactivada hasta que la cuenta esté aprobada y existan slots y CMP certificada.
- **Motivo:** atraer tráfico orgánico con contenido útil sin convertir el portafolio principal
  en un inventario publicitario ni degradar su UX, manteniendo una conexión clara entre ambos
  sitios mediante enlaces recíprocos.
- **Consecuencia:** las entradas revisadas pueden programarse con `publishedAt` y desplegarse
  mediante el workflow diario del blog; el portafolio conserva solo un enlace a Blog en su
  footer y redirige las rutas editoriales históricas. La generación masiva y publicación directa
	por IA queda fuera por calidad editorial, trazabilidad y políticas de contenido útil. El
	dominio principal ya publica la meta de verificación de AdSense y `ads.txt`.
- **Revisar cuando:** exista cuenta AdSense aprobada, una CMP activa, datos de tráfico o una
  fuente editorial automatizada con revisión humana verificable.

## D-023 · Feed social con interacción verificable

- **Estado:** aceptada (8 ago 2026).
- **Decisión:** presentar la portada como feed editorial, conservar tres destacados con arte
  original generado para sus categorías y ofrecer likes, shares y comentarios anónimos con
  contadores reales en D1. Todo comentario nace pendiente y sólo aparece tras moderación.
- **Motivo:** aumentar recurrencia y conversación sin simular audiencia ni atribuir actividad
  ficticia a personas inexistentes.
- **Consecuencia:** el menú concentra categorías, el buscador se expande desde la cabecera y
  `/admin/moderacion/` permite aprobar o rechazar comentarios mediante un token secreto. Los
  contadores comienzan en cero y no se rellenan con datos decorativos.
- **Revisar cuando:** haya datos reales de participación, spam recurrente o necesidad de
  autenticación, rate limiting adicional o notificaciones de moderación.

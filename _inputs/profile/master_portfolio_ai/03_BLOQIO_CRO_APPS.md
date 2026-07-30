# Bloqio CRO Apps

## Clasificación

- Tipo: familia de productos Shopify.
- Papel en el portafolio: segundo caso técnico.
- Repositorios accesibles:
  - `jossuealcacao-exe/bloqio-cro`
  - `jossuealcacao-exe/bloqio-cro-toolkit`
- Evidencia adicional: CV.
- Estado editorial: Bloqio CRO TopBar puede convertirse en caso; Hermes requiere evidencia adicional.

## Resumen público — Español

Bloqio CRO Apps es una línea de herramientas para Shopify enfocada en reducir fricción y mejorar la claridad comercial del storefront. Los productos convierten patrones frecuentes de CRO —urgencia, confianza, acceso rápido a la compra y mensajes promocionales— en extensiones configurables para comerciantes.

## Public summary — English

Bloqio CRO Apps is a family of Shopify tools focused on reducing friction and improving commercial clarity across storefronts. The products turn common CRO patterns—urgency, trust, faster purchase access, and promotional messaging—into configurable tools for merchants.

## Mapa de productos

### Prometeo

El CV describe Prometeo como una aplicación de optimización comercial / TopBar CRO.

La correspondencia más probable es:

```text
Prometeo
└── repositorio bloqio-cro
    └── TopBar CRO
```

Esta relación debe confirmarse antes de publicar el nombre Prometeo como título oficial del repositorio.

### Hermes

El CV describe Hermes como una herramienta mobile-first de sticky add-to-cart.

No se encontró evidencia directa de Hermes dentro de los repositorios accesibles en esta revisión. Se puede mencionar en inventario privado, pero no debe publicarse como caso completo hasta localizar:

- repositorio;
- extensión;
- capturas;
- configuración;
- commits;
- demo;
- estado de lanzamiento.

### Bloqio CRO Toolkit

Es una suite distinta o un laboratorio complementario. No debe asumirse que equivale a Hermes.

El commit “Release-ready: Bloqio CRO Toolkit” muestra:

- TopBar PRO.
- Badges.
- Trust Bar.
- FAQ.
- Featured Product.
- Interfaz embedded en Shopify Admin.
- Polaris.
- Presets.
- Accesos rápidos al Theme Editor y App Embeds.
- Guía de instalación y QA.

Sin embargo, el `shopify.app.toml` actual conserva `example.com` y el commit más reciente está marcado como WIP por un bug de sticky toggle. Debe tratarse como laboratorio o release candidate, no como producto de producción validado.

# Caso: Bloqio CRO TopBar

## Problema

Las tiendas Shopify necesitan comunicar promociones, urgencia, beneficios y CTAs sin depender de modificaciones manuales repetidas al tema. Muchas barras promocionales:

- ocupan demasiado espacio;
- funcionan mal en móvil;
- no recuerdan el cierre del usuario;
- carecen de jerarquía;
- interfieren con el header;
- no permiten configurar comportamiento sin código.

## Solución

Una Theme App Extension / App Embed configurable que permite:

- mensaje principal;
- submensaje;
- CTA primario;
- CTA secundario;
- cuenta regresiva;
- cierre persistente;
- comportamiento sticky;
- reaparición inteligente;
- alineación;
- modo compacto móvil;
- opción de mostrarse solo en home;
- colores configurables;
- experiencia responsive.

## Decisiones relevantes

1. **Theme App Extension en lugar de modificar el tema directamente.**
2. **Persistencia segura mediante localStorage con manejo de errores.**
3. **Responsive real, no simple reducción de tipografía.**
4. **Configuración desde Shopify en lugar de parámetros hardcoded.**
5. **Compatibilidad con App Embed.**
6. **Configuración de producción y compliance webhooks.**
7. **Uso de una app embedded con React Router y Shopify App Bridge.**

## Stack verificable

- Shopify CLI.
- Theme App Extensions.
- App Embeds.
- Liquid.
- JavaScript.
- CSS.
- React Router.
- React.
- Shopify App Bridge.
- Prisma.
- PostgreSQL.
- Railway.
- GitHub.
- TypeScript.
- Vite.

## Estado verificable del repositorio `bloqio-cro`

- Configurado como app embedded.
- URL de producción en Railway.
- Webhooks de uninstall y scopes.
- Compliance webhooks:
  - customers/data_request;
  - customers/redact;
  - shop/redact.
- Migración de Prisma a PostgreSQL documentada en commits.
- Admin home con branding.
- MVP de TopBar liberado.
- QA de topbar registrado.
- Ajustes de caché de assets y configuración de producción.
- README genérico pendiente de personalización.

## Rol de Jossue

- Concepto de producto.
- Dirección de UX/CRO.
- Diseño de configuraciones.
- Definición del comportamiento mobile.
- Desarrollo Shopify asistido por IA.
- QA.
- Configuración de despliegue.
- Documentación y Git.
- Diseño de una familia de herramientas reutilizables.

## Resultados publicables

- Construcción de una app Shopify embedded con Theme App Extension.
- Desarrollo de un TopBar CRO responsive y configurable.
- Configuración de despliegue en Railway.
- Implementación de webhooks de cumplimiento.
- Migración de persistencia a PostgreSQL.
- Evolución desde scaffold hasta MVP revisado.

## Resultados no publicables todavía

- Incremento de conversión.
- CTR.
- Revenue uplift.
- Instalaciones activas.
- Retención.
- MRR.
- Resultados de campañas de App Store.
- Número de tiendas.

## Activos necesarios

- Capturas del TopBar en desktop y móvil.
- Captura del panel de configuración.
- Video de countdown, cierre y persistencia.
- Captura de App Embed.
- Demostración en una tienda real o development store.
- Logo de Prometeo.
- Confirmación Prometeo ↔ TopBar.
- Repositorio o demo de Hermes.
- Métricas de uso con fecha y fuente.

## CTA sugerido

### Español

Construyo herramientas Shopify enfocadas en reducir fricción, acelerar decisiones y convertir patrones de CRO en componentes operables por el comerciante.

### English

I build Shopify tools that reduce friction, accelerate decisions, and turn CRO patterns into components merchants can operate without editing code.

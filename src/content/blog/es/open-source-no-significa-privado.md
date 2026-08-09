---
lang: es
slug: open-source-no-significa-privado
counterpartSlug: open-source-does-not-mean-private
title: "Un agente open source también puede enviar tu código a terceros"
description: "La licencia de una herramienta no determina por sí sola dónde se procesan el código, los prompts y el contexto del proyecto."
excerpt: "Para saber si una herramienta es privada hay que revisar el modelo, el proveedor, las extensiones y la configuración completa."
category: Tecnología
categorySlug: tecnologia
counterpartCategorySlug: technology
publishedAt: 2026-08-06T18:00:00-06:00
readMinutes: 4
featured: false
draft: false
heroImage: ../../../assets/blog/social-feed/agent-security.png
heroAlt: "Un agente digital protegido por capas, con credenciales y datos fuera de su perímetro"
keywords: [open source, privacidad, agentes locales, OpenCode, modelos locales]
author:
  name: Jossue Alcalá
sources:
  - label: "OpenCode — agente de programación de código abierto"
    url: "https://opencode.ai/"
  - label: "OpenCode Docs — Providers"
    url: "https://opencode.ai/docs/providers/"
publication:
  publish: true
---

Una herramienta open source permite revisar su código, modificarlo y alojarlo por cuenta propia. Todo eso ayuda a proteger información sensible. Sin embargo, la licencia no garantiza que el contenido de tu repositorio permanezca dentro de tu computadora.

Un agente también depende del modelo que responde, del proveedor que lo ejecuta y de los servicios conectados. Cada parte puede manejar datos de una manera distinta.

## Revisa el recorrido de los datos

OpenCode indica que no almacena tu código ni el contexto y permite usar modelos locales. Si eliges un modelo instalado en tu equipo, buena parte del procesamiento puede ocurrir ahí.

Si conectas la misma herramienta con un proveedor externo, tendrá que enviarle la información necesaria para responder. En ese caso hay que revisar las condiciones de ese proveedor: qué conserva, durante cuánto tiempo y para qué puede utilizarlo.

La interfaz sigue siendo open source. El procesamiento ya no es completamente local.

## Un modelo local también necesita límites

Ejecutar el modelo en tu equipo reduce la cantidad de información que sale, pero el agente puede conservar acceso a internet, repositorios remotos, herramientas del sistema y variables con secretos.

También puede instalar extensiones o llamar servicios externos. Por eso conviene limitar carpetas, comandos y conexiones aunque el modelo sea local.

## Preguntas para revisar una herramienta

Antes de usarla con un repositorio real, comprobaría lo siguiente:

- Qué archivos puede leer.
- Qué información envía al proveedor del modelo.
- Si los datos se usan para entrenamiento.
- Cuánto tiempo se conservan los registros.
- Qué extensiones y servicios tienen acceso.
- Si las credenciales están separadas por proyecto.

Si estas respuestas no están documentadas, todavía no sabemos si la configuración es adecuada para información sensible.

## Por qué conviene que sea open source

Tener acceso al código facilita auditorías y permite reemplazar partes del sistema. También reduce la dependencia de una sola interfaz.

Es una ventaja importante, pero la privacidad depende de la configuración completa. La licencia abre la posibilidad de revisar y controlar la herramienta; el equipo todavía debe decidir cómo ejecutarla y a qué servicios conectarla.

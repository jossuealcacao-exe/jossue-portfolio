---
lang: es
slug: mas-codigo-menos-producto
counterpartSlug: mas-codigo-menos-producto
title: "La IA puede escribir mucho código y aun así no resolver el problema"
description: "Generar funciones y archivos más rápido ayuda, pero la calidad del producto depende de las decisiones, las pruebas y el mantenimiento."
excerpt: "Si el equipo todavía no sabe qué necesita el usuario, producir código más rápido no mejora el resultado."
category: Desarrollo web
categorySlug: desarrollo-web
counterpartCategorySlug: web-development
publishedAt: 2026-08-06T12:00:00-06:00
readMinutes: 4
featured: false
draft: false
heroImage: ../../../assets/blog/social-feed/vibe-coding.png
heroAlt: "Código generado rápidamente avanza hacia una estructura digital que todavía no está completa"
keywords: [IA generativa, productividad de desarrollo, calidad de software, producto, agentes de código]
author:
  name: Jossue Alcalá
sources:
  - label: "Google — What is vibe coding?"
    url: "https://blog.google/innovation-and-ai/products/techspert-what-is-vibe-coding/"
  - label: "Claude — Claude Code"
    url: "https://claude.com/product/claude-code"
publication:
  publish: true
---

Los agentes de programación pueden recorrer un repositorio, editar varios archivos y ejecutar pruebas en pocos minutos. Son especialmente útiles para tareas repetitivas y cambios que antes consumían buena parte del día.

El ahorro de tiempo es real. El problema aparece cuando medimos ese trabajo por la cantidad de código generado y dejamos de revisar si la función era necesaria.

## El trabajo empieza antes de programar

En muchos proyectos, lo más difícil es entender qué necesita el usuario, reducir el alcance y acordar cómo se medirá el resultado. Después vienen la programación, las pruebas, el despliegue y el mantenimiento.

Un agente acelera la implementación. Si la decisión inicial es confusa, entregará una solución rápida para un problema que quizá no estaba bien definido.

Por eso conviene escribir primero el comportamiento esperado. ¿Qué debe poder hacer la persona? ¿Qué debería ocurrir si algo falla? ¿Cómo sabremos que el cambio funcionó?

## Generar código barato también genera trabajo

Una idea puede convertirse en veinte archivos durante una tarde. Después alguien tendrá que leerlos, corregirlos y mantenerlos.

Cuando el agente propone una solución grande, revisaría si existe una opción más pequeña. A veces una configuración o un cambio de contenido resuelve lo mismo sin añadir otra capa al producto.

También borraría las pruebas que ya no sirven. Conservar cada versión generada vuelve más difícil entender el proyecto.

## Cómo medir el resultado

El número de líneas y commits muestra actividad, pero no explica si el producto mejoró. Prefiero comprobar cosas más cercanas al usuario:

- Si puede completar la tarea.
- Si disminuyeron los errores.
- Si otra persona entiende el cambio.
- Si podemos revertirlo sin afectar datos.
- Si el costo de operación sigue siendo razonable.

La IA también puede ayudar aquí. Puede escribir pruebas, comparar resultados y preparar documentación para que otra persona revise el trabajo.

## Cómo la uso

Uso agentes para investigar un repositorio, preparar una primera implementación y ejecutar comprobaciones. Antes de publicar, reviso el cambio y confirmo que responde al objetivo original.

La velocidad es útil cuando reduce trabajo repetitivo. Si sólo aumenta la cantidad de código que debemos mantener, el ahorro desaparece.

# Presupuesto de rendimiento

## Objetivo

Proteger una experiencia rápida en móvil y conexiones limitadas desde el primer caso. Los
valores son presupuestos de diseño/implementación, no métricas observadas del sitio.

## Base técnica actual

- Salida Astro estática y contenido visible sin proveedor externo.
- Cero scripts de terceros, GTM, GA4, widgets o fuentes remotas.
- Fuentes variables servidas desde paquetes locales.
- JavaScript propio limitado a navegación/comportamiento de formulario y `dataLayer` local.
- 23 páginas construidas y pruebas responsive sin overflow ni errores de consola.

No se han registrado resultados Lighthouse ni datos CWV de campo; no deben inferirse a partir
del build o de Playwright. Los presupuestos siguientes continúan como release gates futuros.

## Core Web Vitals

Evaluar en el percentil 75 de datos de campo, segmentando móvil y escritorio cuando haya una
muestra suficiente:

- **LCP:** bueno en 2.5 s o menos.
- **INP:** bueno en 200 ms o menos.
- **CLS:** bueno en 0.1 o menos.

Durante desarrollo, usar pruebas de laboratorio repetibles como señal temprana. No presentar
un puntaje Lighthouse aislado como experiencia real.

## Presupuesto de transferencia inicial

Objetivos comprimidos para la primera vista de una página editorial:

- HTML: hasta 50 KiB.
- CSS crítico y de página: hasta 50 KiB.
- JavaScript propio inicial: hasta 70 KiB.
- Fuentes iniciales: hasta 100 KiB.
- Imagen LCP: hasta 180 KiB en móvil, con variante responsive.
- Total inicial objetivo: hasta 400 KiB, excluyendo medios cargados bajo demanda.

Son límites máximos, no cuotas que deban llenarse. Un caso con medios puede superar el total
al avanzar, pero no debe descargar todo antes de que sea necesario.

## Presupuestos de experiencia

- Cero desplazamientos por imágenes, fuentes, banners o componentes tardíos.
- HTML útil y navegación disponibles sin hidratación.
- Máximo una isla interactiva por función real; evitar hidratar contenido estático.
- Sin scripts de terceros antes de consentimiento y justificación.
- Respuesta visual inmediata a interacciones; trabajo largo dividido fuera del hilo principal.
- Animación limitada a `transform`/`opacity` cuando sea apropiada y desactivable.

## Imágenes

- Definir `width` y `height` o `aspect-ratio`.
- Generar `srcset` y `sizes` desde el uso real; no entregar desktop a móvil.
- AVIF/WebP cuando mejoren tamaño sin degradar artefactos; conservar fallback adecuado.
- Priorizar solo la imagen LCP demostrada; cargar diferido el contenido fuera de vista.
- No usar capturas como texto ni publicar originales con datos sensibles.
- Limitar resolución por densidad útil; comprimir después de redactar información privada.

## Fuentes

- Self-hosted Inter Tight para display y Source Sans 3 para cuerpo/UI.
- WOFF2 y subconjunto latino/latino extendido según caracteres reales.
- Preload solo de la variante crítica confirmada por medición.
- Reducir pesos y cursivas a los usados.
- Ajustar fallbacks con métricas reales para evitar CLS.
- No deformar ni sintetizar texto para reducir archivos.

## JavaScript y Astro

- Preferir HTML/CSS y componentes Astro estáticos para contenido.
- Añadir cliente solo para comportamiento que no pueda resolverse progresivamente.
- Diferir módulos no críticos y dividir por interacción/página.
- Evitar librerías completas para una utilidad pequeña.
- Revisar el grafo y bytes transferidos en cada dependencia propuesta.
- Mantener búsqueda, filtros o galerías utilizables con una alternativa razonable.

## CSS

- Tokens y componentes compartidos, sin duplicar sistemas.
- Evitar CSS bloqueante no utilizado y selectores costosos.
- No ocultar contenido esencial hasta que ejecute JavaScript.
- Contener componentes complejos solo tras probar efectos en accesibilidad.

## Terceros

Presupuesto inicial: cero scripts de terceros. Cada incorporación debe documentar:

- necesidad y alternativa local;
- bytes, solicitudes y trabajo de CPU;
- datos enviados y base de consentimiento;
- disponibilidad, seguridad y política de fallo;
- propietario y procedimiento de retiro.

Analítica no tiene proveedor ni IDs aprobados y no está exceptuada.

## Estrategia de medición

1. Definir páginas representativas: portada, listado, proyecto y caso largo.
2. Probar viewport móvil, CPU/red limitados y caché fría/caliente.
3. Registrar mediana de varias ejecuciones y conservar configuración.
4. Medir cada cambio que afecte LCP, hidratación, fuentes o imágenes.
5. Instrumentar CWV de campo solo con privacidad aprobada.
6. Comparar p75 cuando haya volumen suficiente; marcar muestras pequeñas.

## Puertas de calidad

- El build debe fallar o alertar al superar presupuestos de bytes acordados.
- Ningún cambio introduce una regresión de CWV sin decisión registrada.
- Medios nuevos incluyen dimensiones, variantes y texto alternativo.
- Dependencias y terceros requieren justificación.
- El primer caso se perfila antes de asumir que el patrón escala.

## Respuesta a regresiones

Priorizar en este orden: eliminar trabajo, reducir bytes críticos, diferir contenido,
optimizar medios y solo después añadir complejidad de caché. Registrar causa y resultado; no
compensar una regresión ocultando contenido o reduciendo legibilidad.

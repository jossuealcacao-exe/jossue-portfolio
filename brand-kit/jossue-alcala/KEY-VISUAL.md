# Key Visual · Jossue Alcalá

Versión 1.0 · octubre 2026 · Uso: anuncios y piezas de marca personal de Jossue Alcalá.

Este documento es la fuente de verdad para cualquier persona o IA que cree anuncios de Jossue Alcalá. Si una regla de aquí choca con una preferencia de la herramienta, gana este documento. La versión visual del mismo manual está en `key-visual.html`.

---

## 0. Instrucciones para IAs (leer primero)

1. Lee este archivo completo antes de diseñar o escribir.
2. Usa solo los activos de las rutas de la sección 12. No redibujes, no vectorices de nuevo ni "mejores" el logotipo.
3. Para producir piezas, edita `plantilla/anuncios.json` y ejecuta `plantilla/render.mjs`. Solo si la herramienta no puede ejecutar código, replica la composición a mano con las medidas de las secciones 5 a 7.
4. Todo texto debe cumplir la sección 9 (voz). No inventes cifras, resultados, clientes ni testimonios.
5. Antes de entregar, pasa la lista de control de la sección 11.
6. No publiques, no subas a plataformas de anuncios y no gastes presupuesto. Entrega archivos para que Jossue los apruebe.

---

## 1. Idea central

**Concepto: la constelación.** Cinco estrellas sueltas no dicen nada; unidas por líneas forman una figura que se reconoce. Así trabaja Jossue: toma piezas que en un negocio suelen estar sueltas (la tienda, la publicidad, la medición, los datos, la IA) y las une en un sistema que vende.

- **Imagen:** cielo nocturno profundo, una sola constelación nítida, mucha calma alrededor.
- **Sensación:** claridad, oficio, confianza tranquila. Nada de ruido, neón ni efectos de "tecnología".
- **Lema de marca (interno, no se usa como eslogan en anuncios):** Crear · Construir.

### Atributos

| Atributo | Qué significa | Cómo se ve | Cómo se escribe |
|---|---|---|---|
| Claro | Se entiende a la primera | Una idea por pieza, mucho aire | Palabras simples, frases cortas |
| Hecho | Lo construye él, no entrega un documento y se va | Piezas terminadas, nada de bocetos | Verbos de acción en primera persona: armo, reviso, programo |
| Con evidencia | Decide con datos, no con opiniones | Sin adornos ni exageraciones | Sin superlativos ni promesas que no se puedan comprobar |
| Cercano | Habla de tú a tú | Retrato real, sin pose corporativa | Tutea y nombra el problema del cliente |

---

## 2. Logotipo

### Piezas

| Pieza | Qué es | Archivo |
|---|---|---|
| Isotipo | Constelación de 5 estrellas dentro de un cuadrado redondeado (squircle) con fondo de nebulosa | `logos/jossue-alcala-isotipo.svg` · `logos/jossue-alcala-isotipo-1024.png` |
| Isologo claro | Isotipo + "Jossue Alcalá" en texto claro. Para fondos oscuros (uso principal) | `logos/jossue-alcala-isologo-claro.svg` / `.png` |
| Isologo oscuro | Isotipo + "Jossue Alcalá" en texto casi negro. Para fondos claros | `logos/jossue-alcala-isologo-oscuro.svg` / `.png` |
| Logo 1:1 Google Ads | Isotipo sobre fondo Noche, 1200×1200 | `logos/jossue-alcala-logo-1x1-1200x1200.png` |
| Logo 4:1 Google Ads | Isologo con margen, 1200×300, fondo oscuro o blanco | `logos/jossue-alcala-logo-4x1-oscuro-1200x300.png` · `-blanco-` |

El texto del isologo está en Inter Tight SemiBold (600), convertido a trazos. El isotipo siempre conserva su fondo de nebulosa: no existe versión de una sola tinta.

### Construcción del isologo

- Proporción: isotipo de 64 u de alto; separación de 18 u entre isotipo y texto; texto de 34 u de cuerpo, centrado en vertical con el isotipo.
- Ancho total del isologo: 289 u por 64 u de alto (relación ≈ 4.5:1).

### Zona de protección

Deja libre alrededor del logotipo al menos **la mitad de la altura del isotipo** (0.5 × alto). Nada de texto, bordes ni otros logos dentro de esa zona.

### Tamaño mínimo

| Pieza | Digital | Impreso |
|---|---|---|
| Isotipo | 24 px | 8 mm |
| Isologo | 120 px de ancho | 35 mm de ancho |

Por debajo de 24 px usa `public/favicon.svg` del sitio (la constelación sin estrellas de fondo).

### Usos incorrectos

- No rotar, inclinar, estirar ni deformar.
- No cambiar los colores de las estrellas, de las líneas ni de la nebulosa.
- No quitar el squircle ni usar la constelación suelta como logotipo (la constelación suelta es un recurso gráfico, sección 5).
- No añadir sombras duras, biseles, contornos, brillos ni degradados nuevos.
- No cambiar la tipografía del nombre ni separar el texto del isotipo de otra forma.
- No colocar el isologo claro sobre fondos claros ni el oscuro sobre fondos oscuros.
- No poner el logotipo sobre fotos con mucho detalle sin una capa oscura debajo.

---

## 3. Color

### Paleta

| Nombre | HEX | RGB | Rol |
|---|---|---|---|
| Noche | `#050605` | 5, 6, 5 | Fondo base de todo |
| Banda | `#0c0e0c` | 12, 14, 12 | Superficies un nivel arriba del fondo |
| Tarjeta | `#161a16` | 22, 26, 22 | Tarjetas y paneles |
| Nebulosa índigo | `#1a2142` | 26, 33, 66 | Resplandor principal del cielo |
| Nebulosa violeta | `#2a1b3d` | 42, 27, 61 | Resplandor secundario (siempre al 55–75 %) |
| Polvo estelar | `#dfe6ff` | 223, 230, 255 | Estrellas pequeñas del fondo |
| Luz de estrella | `#fffaf0` | 255, 250, 240 | Núcleo de las estrellas de la constelación |
| Marfil | `#ece6d8` | 236, 230, 216 | Acento: botón principal, líneas de la constelación, íconos |
| Tinta marfil | `#12110e` | 18, 17, 14 | Texto sobre Marfil |
| Texto | `#eef1ea` | 238, 241, 234 | Titulares y texto principal |
| Apoyo | `#b9bfb5` | 185, 191, 181 | Texto de apoyo en anuncios |
| Gris luna | `#9aa197` | 154, 161, 151 | Kickers, URL, textos secundarios |
| Fósforo | `#9bff66` | 155, 255, 102 | Reservado para MADRE (producto). No usar en anuncios de servicios |

### Proporción de uso

Noche y nebulosas ≈ 80 % · Texto y Apoyo ≈ 14 % · Marfil ≈ 5 % · estrellas ≈ 1 %. El Marfil aparece una sola vez como bloque (el botón); si hay dos bloques marfil, sobra uno.

### Contraste (WCAG 2.1, calculado)

| Combinación | Relación | Nivel |
|---|---|---|
| Texto `#eef1ea` sobre Noche | 17.8 : 1 | AAA |
| Apoyo `#b9bfb5` sobre Noche | 10.8 : 1 | AAA |
| Gris luna `#9aa197` sobre Noche | 7.7 : 1 | AAA |
| Tinta marfil sobre Marfil (botón) | 15.2 : 1 | AAA |
| Texto sobre Nebulosa índigo | 13.7 : 1 | AAA |
| Gris luna sobre Nebulosa índigo | 5.9 : 1 | AA |
| Noche sobre blanco (isologo oscuro) | 20.3 : 1 | AAA |

No pongas texto de menos de 24 px en Gris luna sobre las zonas más brillantes de la nebulosa.

### Tokens

```css
:root {
  --jx-noche: #050605;
  --jx-banda: #0c0e0c;
  --jx-tarjeta: #161a16;
  --jx-indigo: #1a2142;
  --jx-violeta: #2a1b3d;
  --jx-polvo: #dfe6ff;
  --jx-luz: #fffaf0;
  --jx-marfil: #ece6d8;
  --jx-tinta-marfil: #12110e;
  --jx-texto: #eef1ea;
  --jx-apoyo: #b9bfb5;
  --jx-gris-luna: #9aa197;
  --jx-fosforo: #9bff66; /* solo MADRE */
}
```

```json
{
  "color": {
    "noche": "#050605", "banda": "#0c0e0c", "tarjeta": "#161a16",
    "indigo": "#1a2142", "violeta": "#2a1b3d", "polvo": "#dfe6ff", "luz": "#fffaf0",
    "marfil": "#ece6d8", "tintaMarfil": "#12110e",
    "texto": "#eef1ea", "apoyo": "#b9bfb5", "grisLuna": "#9aa197",
    "fosforo": "#9bff66"
  },
  "fuente": { "familia": "Inter Tight", "kicker": 500, "titular": 620, "apoyo": 420, "cta": 600 },
  "radio": { "chip": 16, "foto": 28, "boton": 999 },
  "unidad": "u = lado corto del lienzo / 1080 (en horizontales u = alto / 1080)"
}
```

---

## 4. Tipografía

**Familia única: Inter Tight** (licencia SIL Open Font License 1.1, uso comercial libre).

- Para diseño (Canva, Figma, Photoshop): instala los TTF de `fuentes/` (Regular, Medium, SemiBold, Bold). Cubren español completo (á é í ó ú ñ ü ¿ ¡). Si necesitas otros alfabetos, descarga la familia completa en Google Fonts.
- Para HTML: `fuentes/InterTight-Variable.woff2` (pesos 100–900).
- En el sitio web el texto se ve en la fuente del sistema (SF Pro en Apple). En anuncios siempre Inter Tight.

### Escala para anuncios

Todas las medidas en u, donde u = lado corto del lienzo ÷ 1080 (en formatos horizontales, u = alto ÷ 1080). Ejemplo: en 1200×1200, u = 1.11; en 1200×628, u = 0.58.

| Rol | Peso | Tamaño vertical / cuadrado | Tamaño horizontal | Interlineado | Tracking | Estilo |
|---|---|---|---|---|---|---|
| Kicker | 500 | 26 u (28 u en 9:16) | 30 u | 1 | +0.06 em | MAYÚSCULAS, Gris luna |
| Titular | 620 (SemiBold) | 88 u (96 u en 9:16) | 100 u | 1.02 | −0.022 em | Oración con punto final, Texto |
| Apoyo | 420 | 34 u (38 u en 9:16) | 38 u | 1.3 | 0 | Oración, Apoyo |
| Botón (CTA) | 600 | 30 u | 32 u | 1 | 0 | Tinta marfil sobre Marfil |
| URL | 500 | 28 u | 30 u | 1 | 0 | Gris luna |

En la variante con retrato (columna angosta) el titular baja a 72 u en cuadrado y 88 u en horizontal.

### Reglas

- Titular de 3 a 8 palabras, 2 o 3 líneas, en oración (no todo en mayúsculas) y con punto final.
- Apoyo de una oración, 2 líneas como máximo.
- Nunca más de 3 niveles de texto en una pieza (kicker, titular, apoyo) más el botón.
- Equilibra los saltos de línea; no dejes una palabra sola en la última línea.

---

## 5. Elementos gráficos

### 5.1 Cielo (fondo)

Siempre tres capas, de abajo hacia arriba:

1. Fondo plano Noche `#050605`.
2. Resplandor índigo: degradado radial `#1a2142` → transparente al 70 %, elipse de 55 % × 60 % del lienzo. En horizontales centrado en (74 %, 40 %); en verticales y cuadrados en (78 %, 24 %).
3. Resplandor violeta: degradado radial `rgba(42,27,61,.7)` → transparente al 70 %, elipse de 45 % × 55 %. En horizontales en (88 %, 95 %); en verticales en (18 %, 96 %).

```css
background:
  radial-gradient(55% 60% at 74% 40%, #1a2142 0%, rgba(26,33,66,0) 70%),
  radial-gradient(45% 55% at 88% 95%, rgba(42,27,61,.7) 0%, rgba(42,27,61,0) 70%),
  #050605;
```

### 5.2 Campo de estrellas

- Cantidad: ≈ 110 estrellas por cada 1080×1080 px de superficie.
- Radio: 0.6 a 2.2 px (× u), color Polvo estelar `#dfe6ff`, opacidad 0.15 a 0.65 al azar.
- Distribución aleatoria uniforme; nunca formar figuras ni texto con ellas.

### 5.3 Constelación (elemento principal)

Es la misma figura del isotipo, ampliada. Coordenadas en una retícula de 64 × 64:

| Estrella | x | y | Radio del núcleo (× escala) |
|---|---|---|---|
| A (arriba) | 27.30 | 12.00 | 1.30 |
| B | 29.05 | 26.90 | 1.38 |
| C (centro) | 28.33 | 33.67 | 1.46 |
| D (izquierda) | 21.28 | 46.54 | 1.54 |
| E (derecha) | 42.72 | 52.00 | 1.62 |

- Líneas: A–B, B–C, C–D, C–E. Color Marfil al 28 %, grosor 0.45 × escala, puntas redondas.
- Estrellas: núcleo Luz de estrella `#fffaf0` + halo radial de 3.6 × escala (`#fff8e8` al 90 % → `#ece6d8` al 35 % → transparente).
- Una sola constelación por pieza. Nunca se rota, se refleja ni se cambia el orden de las estrellas.
- Posición: en horizontales ocupa la mitad derecha, centrada en vertical; en cuadrados y verticales va arriba a la derecha, entre el isologo y el bloque de texto.

### 5.4 Chip de ícono

Cuadrado de 2 × tamaño del kicker, radio 16 u, fondo `rgba(238,241,234,.06)`, borde 1 px `rgba(238,241,234,.14)`, ícono Marfil al 60 % del chip.

### 5.5 Iconografía

Íconos de línea propios del sitio (`src/components/Icon.astro`): retícula 32 × 32, trazo 1.7, puntas y uniones redondas, sin relleno. Ícono por servicio:

| Servicio | Ícono |
|---|---|
| Marca / IA aplicada | `sparkles-ai` |
| Tiendas Shopify | `code` |
| Conversión (CRO) | `filter` |
| Velocidad | `trend-up` |
| Medición | `badge-percent` |
| Desarrollo a la medida | `basket` |
| Contacto / conversación | `chat` |

No mezclar con íconos de otros sets ni con emojis.

### 5.6 Botón (CTA)

Píldora (radio total), fondo Marfil, texto Tinta marfil 600, relleno 22 u × 34 u, flecha de trazo 2.4 a la derecha. A su lado, la URL `jossuealcala.com` en Gris luna, separada 28 u.

---

## 6. Fotografía

- **Retrato oficial:** `fotos/jossue-alcala-retrato.jpg` (960×1440). Es la única foto aprobada de Jossue.
- **Tratamiento:** dentro de una tarjeta con radio 28 u, borde 1 px Marfil al 16 %, sombra suave `0 30u 80u rgba(0,0,0,.55)`. Pie de foto sobre un degradado Noche al 92 % → transparente: "Jossue Alcalá" (600, 28 u) y "Ecommerce, Shopify e IA aplicada" (Apoyo, 21 u).
- **Encuadre:** en tarjetas verticales, la cara en el tercio superior (`object-position: 50% 22%`); en tarjetas horizontales, de los hombros hacia arriba (`50% 16%`).
- **Prohibido:** generar o alterar la cara o el cuerpo de Jossue con IA, cambiarle la ropa, recortarle el fondo sin aprobación, aplicar filtros de color o usar fotos de bancos de imágenes como si fueran de él.
- **Capturas de proyectos de clientes:** solo con permiso escrito del cliente. Por defecto, los anuncios no muestran nombres, logos ni capturas de clientes.

---

## 7. Composición

### Anatomía (de arriba hacia abajo)

1. Isologo claro (alto 56 u), arriba a la izquierda.
2. Constelación (sección 5.3).
3. Kicker con chip de ícono.
4. Titular.
5. Texto de apoyo.
6. Botón + URL.

El bloque de texto (3 a 6) va pegado al margen inferior y alineado a la izquierda. Nunca centrado.

### Márgenes y columnas

| Formato | Márgenes | Columna de texto | Zonas seguras |
|---|---|---|---|
| Cuadrado y verticales | 84 u en los cuatro lados | Ancho completo | — |
| 9:16 (historias, reels) | 84 u + zona segura | Ancho completo | Deja libre el 14 % superior y el 20 % inferior (ahí la app pone su interfaz) |
| Horizontales (16:9, 1.91:1) | 112 u arriba y abajo, 120 u a los lados | 53 % del ancho | — |

### Variantes

| Variante | Cuándo | Qué lleva |
|---|---|---|
| Estándar | Por defecto, todos los servicios | Composición completa con constelación |
| Retrato | Piezas de marca personal, remarketing, LinkedIn | Foto en tarjeta en vez de constelación. En cuadrado y horizontales la foto va a la derecha (33–38 % del ancho); en verticales, arriba a todo lo ancho |
| Mínima | Performance Max y espacios que penalizan el texto sobre la imagen | Solo cielo, constelación grande y isologo (alto 84 u) abajo a la izquierda. Sin texto |

---

## 8. Formatos y plataformas

Medidas de referencia. **Verifica las especificaciones vigentes en cada plataforma antes de lanzar**, porque cambian.

| Formato | Tamaño del kit | Google Ads (Display, Performance Max, Demand Gen) | Meta (Facebook, Instagram) | LinkedIn | YouTube |
|---|---|---|---|---|---|
| 1:1 | 1200×1200 | Imagen cuadrada | Feed | Imagen cuadrada | — |
| 4:5 | 1080×1350 | Imagen vertical | Feed (recomendado) | — | — |
| 9:16 | 1080×1920 | — | Historias y reels | — | Shorts (portada) |
| 16:9 | 1920×1080 | — | — | — | Miniatura y cortinillas |
| 1.91:1 | 1200×628 | Imagen horizontal | Enlaces | Imagen horizontal | — |
| Logo 1:1 | 1200×1200 | Logotipo cuadrado | Foto de perfil | Foto de perfil | Foto del canal |
| Logo 4:1 | 1200×300 | Logotipo horizontal | — | — | — |

- Peso máximo de imagen en Google Ads: 5120 KB (todas las piezas del kit pesan menos).
- Exporta en PNG (sRGB). Para video: 1080p, 30 fps, H.264, yuv420p.

---

## 9. Voz y mensajes

### Principios

1. **Primera persona del singular.** Habla Jossue, no una empresa: "Armo tu tienda", nunca "Armamos" ni "Nuestro equipo".
2. **Palabras simples primero; el término técnico entre paréntesis:** "Conversión (CRO)", "medición (analytics)".
3. **Frases cortas, de tú a tú.** Nombra el problema del cliente antes que el servicio.
4. **Sin relleno:** nada de eslóganes huecos, "soluciones integrales", "potencia tu negocio", "lleva tu marca al siguiente nivel" ni titulares de póster.
5. **Sin inventos:** ninguna cifra, porcentaje, resultado, testimonio o nombre de cliente que no esté publicado y aprobado.
6. **Sin urgencia falsa** ni mayúsculas para gritar ni signos de exclamación.

### Palabras

| Sí | No |
|---|---|
| armo, reviso, programo, mido, te digo | soluciones, sinergia, disruptivo, revolucionario |
| tu tienda, tu cliente, tus datos | usuarios finales, stakeholders |
| vender más, pierdes la venta, de dónde viene | maximizar el ROI 10x, crecimiento exponencial |
| IA aplicada, asistentes, automatizaciones | IA mágica, IA que lo hace todo |

### Pilares de mensaje (aprobados)

| ID | Kicker | Titular | Apoyo | Ícono |
|---|---|---|---|---|
| 00-marca | Shopify · CRO · IA | Te ayudo a vender más por internet. | Encuentro qué te está costando más, lo diseño y me quedo a construirlo contigo. | sparkles-ai |
| 01-tienda-shopify | Tiendas Shopify | Tu tienda, hecha a la medida de cómo vendes. | La armo completa en Shopify, o la parte que te falte. Sin plantillas. | code |
| 02-conversion-cro | Conversión (CRO) | Te digo en qué punto pierdes la venta. | Reviso el recorrido de tu cliente y te digo qué arreglar primero y qué puede esperar. | filter |
| 03-velocidad | Velocidad y mantenimiento | Una tienda que abre rápido en el celular. | Y que tu equipo pueda mantenerla sin llamar a nadie. | trend-up |
| 04-medicion | Medición | Sabe de dónde viene cada venta. | Dejo la medición conectada con tu publicidad y tus correos. | badge-percent |
| 05-ia-aplicada | IA aplicada | Pon la IA a trabajar en tu negocio. | Asistentes y automatizaciones con tus datos y tus permisos, donde ahorran tiempo. | sparkles-ai |
| 06-desarrollo-a-la-medida | Desarrollo a la medida | Si ninguna app lo hace, la programo. | Apps y funciones hechas para cómo opera tu tienda. | basket |

### Botones aprobados

- **Cuéntame tu caso** (principal, por defecto)
- Pregúntale a Jossue AI (cuando el anuncio lleva al asistente del sitio)
- Define el siguiente paso (remarketing)

### Textos para anuncios de búsqueda adaptables (Google Ads)

Titulares (máx. 30 caracteres, contados):

| Titular | Caracteres |
|---|---|
| Tiendas Shopify a la medida | 27 |
| Te digo dónde pierdes ventas | 28 |
| Tu tienda rápida en el celular | 30 |
| Sabe de dónde viene tu venta | 28 |
| IA aplicada a tu ecommerce | 26 |
| Apps de Shopify a la medida | 27 |
| Shopify, CRO e IA aplicada | 26 |
| Diseño y construyo contigo | 26 |
| Más de 8 años en growth y CRO | 29 |
| Medición conectada a tus ads | 28 |
| Asistentes de IA con tus datos | 30 |
| Te respondo en 1 día hábil | 26 |
| Cuéntame tu caso | 16 |
| Jossue Alcalá: ecommerce e IA | 29 |
| Diagnóstico de conversión | 25 |

Descripciones (máx. 90 caracteres, contados):

| Descripción | Caracteres |
|---|---|
| Armo tu tienda Shopify completa o la parte que te falte, a la medida de cómo vendes. | 84 |
| Reviso el recorrido de tu cliente y te digo qué arreglar primero y qué puede esperar. | 85 |
| Encuentro qué te está costando más, lo diseño y me quedo a construirlo contigo. | 79 |
| Asistentes y automatizaciones con IA que usan tus datos y permisos, donde ahorran tiempo. | 89 |
| Escríbeme dos líneas sobre tu proyecto y te digo por dónde empezaría yo. | 72 |

Validar antes de lanzar: el uso de la marca "Shopify" en el texto de anuncios puede estar sujeto a la política de marcas registradas de Google Ads.

---

## 10. Movimiento (video y animación)

- **Entrada:** la constelación se dibuja línea por línea (A→B→C, luego C→D y C→E), 600 ms cada tramo, curva de aceleración suave (ease-out). Las estrellas aparecen con un destello breve al llegar la línea.
- **Fondo:** las estrellas titilan muy despacio (opacidad ±0.15, ciclos de 3 a 6 s, desfasados). La nebulosa no se mueve.
- **Texto:** aparece de abajo hacia arriba 24 u con fundido, 400 ms, 80 ms de desfase entre kicker, titular, apoyo y botón.
- **Transiciones:** solo fundidos cruzados (crossfade) de 400 ms. Nada de deslizamientos, giros ni zoom agresivo.
- **Cierre:** isotipo centrado sobre el cielo, luego el isologo y la URL. 2 s fijos al final.
- **Pantallas de producto:** dentro de un marco oscuro con los subtítulos en su propia franja debajo, nunca encima de la imagen.
- **Exportación:** 1080p, 30 fps, H.264, yuv420p.

---

## 11. Lista de control antes de entregar

- [ ] Usa el isologo y el isotipo de `logos/` sin modificar, con su zona de protección.
- [ ] Fondo de tres capas (Noche + índigo + violeta) y campo de estrellas.
- [ ] Una sola constelación, con la orientación correcta (o la foto, en la variante retrato).
- [ ] Inter Tight en todos los textos, con los pesos y tamaños de la sección 4.
- [ ] Solo un bloque Marfil (el botón).
- [ ] Bloque de texto alineado a la izquierda y pegado al margen inferior.
- [ ] Márgenes y zonas seguras del formato respetados (sección 7).
- [ ] Texto en primera persona, sin cifras ni clientes inventados, sin relleno.
- [ ] Titular de 2 a 3 líneas, sin palabras sueltas al final.
- [ ] Tamaño exacto del formato y peso menor a 5 MB.
- [ ] No se publicó nada: archivos entregados para aprobación de Jossue.

---

## 12. Archivos del kit

```
brand-kit/jossue-alcala/
├── KEY-VISUAL.md            ← este documento (para IAs)
├── key-visual.html          ← manual visual (autocontenido: se abre solo, en cualquier lugar)
├── logos/                   ← isotipo, isologos, logos 1:1 y 4:1 para Google Ads
├── fotos/                   ← retrato oficial (jpg y webp)
├── fuentes/                 ← Inter Tight (TTF estáticos, woff2 variable, licencia OFL)
├── plantilla/
│   ├── anuncio.html         ← plantilla única, se controla por parámetros en la URL
│   ├── anuncios.json        ← textos y formatos de cada pieza
│   ├── render.mjs           ← exporta todas las piezas a anuncios/
│   ├── manual-fuente.html   ← fuente editable del manual (rutas relativas)
│   └── manual.mjs           ← genera key-visual.html incrustando imágenes y fuente
└── anuncios/
    ├── 1x1/  4x5/  9x16/  16x9/  1.91x1/   ← 45 piezas listas
```

### Producir piezas nuevas

1. Agrega o edita una entrada en `plantilla/anuncios.json`:

```json
{ "id": "07-ejemplo", "k": "Kicker corto", "t": "Titular de tres a ocho palabras.", "p": "Una oración de apoyo.", "i": "chat", "variantes": ["estandar", "retrato", "minimo"], "seed": 91 }
```

2. Desde la carpeta `jossue-portfolio`, ejecuta:

```bash
node brand-kit/jossue-alcala/plantilla/render.mjs 07
```

3. Las piezas salen en `anuncios/<formato>/`. El script avisa con `DESBORDE` si algún texto no cabe; en ese caso, acorta el titular o el apoyo, no reduzcas la letra.

Para ver una sola pieza en el navegador, abre `plantilla/anuncio.html` con parámetros, por ejemplo:
`anuncio.html?w=1200&h=628&v=estandar&k=IA%20aplicada&t=Pon%20la%20IA%20a%20trabajar.&i=sparkles-ai`

### Instrucción de arranque para otra IA (copiar y pegar)

> Eres diseñador de anuncios para Jossue Alcalá. Lee `brand-kit/jossue-alcala/KEY-VISUAL.md` completo y síguelo al pie de la letra. Usa solo los activos de `brand-kit/jossue-alcala/`. Para cada anuncio nuevo, agrega una entrada a `plantilla/anuncios.json` con textos que cumplan la sección 9, ejecuta `plantilla/render.mjs` y revisa cada imagen con la lista de la sección 11. No inventes cifras, clientes ni testimonios. No publiques ni subas nada: entrega los archivos para aprobación.

### Para herramientas sin código (Canva, Figma, generadores de imagen)

- Arma el lienzo con las medidas de la sección 8 y la anatomía de la sección 7.
- Fondo: importa una pieza de la variante mínima del mismo formato y úsala como fondo, o recrea el cielo con la sección 5.1.
- Logotipo, foto y fuentes: importa los archivos de `logos/`, `fotos/` y `fuentes/`. No los generes.
- Si usas un generador de imágenes solo para fondos, pide: "cielo nocturno profundo casi negro (#050605), resplandor índigo suave (#1a2142) arriba a la derecha, resplandor violeta tenue (#2a1b3d) abajo, estrellas pequeñas y escasas, sin planetas, sin nubes brillantes, sin texto, sin personas, estilo sobrio y fotográfico". Encima, coloca siempre la constelación oficial y el logotipo reales.

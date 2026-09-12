# Auditoría visual y elevación editorial

Documento de traspaso. Estado al 2026-09-12, commit base `3b73355`, rama `master`.
Reporte completo con especímenes en vivo: https://claude.ai/code/artifact/4a65caad-ea3a-4d62-9794-b9cd70a88044

Medición hecha con Playwright/Chromium contra producción y contra el dev server,
en 390 / 768 / 1024 / 1280 / 1440 px. Toda cifra de este documento viene de una
medición, no de estimación.

---

## 1. Qué ya está aplicado (working tree, sin commit)

### Correcciones de defecto

| Hallazgo | Antes | Ahora |
|---|---|---|
| Inversión de jerarquía en móvil | h1 46.4px **<** h2 46.8px | h1 54 > slide-h2 40.8 > sección 32.8 |
| Peso del h1 | 620 | 700 (segundo eje de jerarquía) |
| Enlaces del footer | 27px | 44px |
| Nav y selector de idioma | 37.6px | 44px |
| Flechas del carrusel | 40px | 44px |
| Etiqueta sobre fotografía | 3.61:1 (falla AA) | `#24241F`, pasa AA |
| Etiquetas de marca en tarjetas | 1.46:1 y 2.20:1 | opacidad 100% |
| Trabajo a 1440px | 3 de 9 tarjetas visibles | 9 de 9, sin scroll horizontal |
| Títulos de tarjeta | 53px y 106px sin alinear | dos líneas reservadas |
| Chips del hero | caja + borde (afordancia falsa) | texto plano |
| Motion | 180/560ms sin criterio | 140ms respuesta / 420ms entradas |
| Ritmo vertical | 115/128px plano | tres compases: tight / base / loose |
| Espaciado | 12 valores, varios fraccionarios | escala de 7 pasos en tokens |

### Elevación editorial

Referencias: la retícula expuesta de [grids.obys.agency](https://grids.obys.agency/)
y la modularidad bento de Apple, adoptadas **sin** el radio redondeado.

- **Tipografía como objeto.** El salto pasó de 1.3:1 a **12.3:1** (titular 135px
  contra etiquetas de 11px en escritorio; 54px en móvil).
- **Retícula visible.** Filetes verticales al 9% de tinta detrás de
  `.selected-work` y `.capabilities-section`.
- **Etiqueta de sección rotada.** `01 / TRABAJO SELECCIONADO` corre vertical en
  el gutter izquierdo, leyendo de abajo hacia arriba.
- **Bento asimétrico.** Capacidades: celda de 4 columnas + celda de 2, luego
  invertido. Métricas: 2×2. Celdas unidas por costura de 1px, padding interno
  de hasta 44px, cifras a 80px.

### Correcciones de copy (aprobadas explícitamente)

- `AnalyticsConsent.astro`: cuatro tildes — `analítica` ×2, `qué`, `útil`.
- `outcomes.ts`: la descripción de `Δ3× CR` decía "Incremento en ROAS",
  contradiciendo su propia cifra y duplicando la tarjeta contigua. Alineada a
  tasa de conversión.

**Pendiente de confirmar por el propietario:** resolví la contradicción
confiando en la métrica (`Δ3× CR`) sobre la prosa. Si el dato real era un
incremento de ROAS, entonces lo que está mal es el sufijo `CR`, no la
descripción. Solo Jossue puede decidirlo.

---

## 2. Archivos tocados

```
src/styles/redesign.css          escala, táctiles, bento, retícula, motion, ritmo
src/styles/global.css            nivel tarjeta del type scale, selector de idioma
src/components/AnalyticsConsent.astro   tildes
src/data/outcomes.ts             descripción de la métrica
tests/site.spec.ts               fixture + dos aserciones de layout
scripts/test-routes.mjs          un literal de aserción
```

La elevación editorial vive en un bloque `@layer utilities` al final de
`redesign.css`, marcado con el comentario `EVOLUCIÓN EDITORIAL`. Se puede
revertir aislado.

---

## 3. Riesgo abierto que hay que revisar

**Cuatro tests reescritos.** Cada uno codificaba la decisión de diseño anterior,
y en los cuatro casos el guard quedó más estricto, no más laxo. Pero cuatro es
el número en el que alguien debería revisar si los tests o los cambios son lo
correcto:

1. `scripts/test-routes.mjs:101` — literal `'Producto open source'` →
   `'Código abierto'` (la categoría del caso cambió de redacción).
2. `tests/site.spec.ts` — fixture `categoryEs`/`categoryEn` de `ahp-plus`.
3. `tests/site.spec.ts` — *Work page … horizontal sliders*: ahora exige riel con
   `overflow-x: auto` bajo 1024px **y** rejilla de 2 columnas sin scroll a
   partir de ahí.
4. `tests/site.spec.ts` — *Home leads with a commercial proposition*: ahora exige
   etiqueta apilada bajo 1024px **y** rotada en el gutter a partir de ahí.

---

## 4. Lo que sigue

### Prioridad 1 — propagar el tratamiento
`/es/trabajo/`, `/es/servicios/` y `/es/acerca/` siguen con la composición
anterior. La home quedó elevada y las demás no: hoy el sitio es inconsistente
entre páginas.

### Prioridad 2 — decisiones de sistema pendientes
- Reducir las micro-etiquetas en versalitas (47 en la home, 43 en trabajo,
  38 en acerca). Cuando todo lleva rótulo, el rótulo deja de señalar.
  **No ejecutado** porque implica quitar texto.
- Tres pesos de filete en lugar de uno (68 usos del mismo hairline de 1px).
  **No ejecutado**: hacerlo a medias empeora la consistencia.

### Prioridad 3 — bloqueado por material
- Miniaturas de proyecto con capturas reales en vez de ilustraciones genéricas.
- `/servicios/` y `/contacto/` no tienen una sola imagen; son tipografía y
  filetes. Servicios es, después de Trabajo, la página que más pesa en una
  decisión de contratación.

---

## 5. Dos erratas de la auditoría original

Ambas detectadas al implementar, ambas corregidas en el reporte publicado.

**Hallazgo A — el acento.** La primera versión decía que el acento no se usaba
nunca. Error de medición: el sistema define **dos** azules, `#1248FF` (anillo de
foco) y `#315EFB` (acento), y el rastreo solo buscaba el primero. Dato correcto:
el acento aparece 109 veces, todas en trazos de icono SVG a 14–16px, más dos
fondos diminutos, y en **cero** elementos de texto. La conclusión sobrevive pero
cambia: no había que introducir el acento, había que moverlo de decoración a
significado.

**Hallazgo 08 — el hover.** Se afirmó que las tarjetas no respondían al cursor.
Falso: se midió `.case-card`, el contenedor, cuando el hover vive en
`.case-card__link`. Al remedirlo, el borde pasa a tinta y aparece sombra. **El
hover ya funcionaba** y no se tocó.

---

## 6. Cómo verificar

```bash
npm run validate      # gate completo: 216/216 en el último run
npm run dev           # server local en :4321
```

Último recibo verde (`EVD-20260912-B29EE09B`):
blog 12 entradas · astro check 0 errores · eslint limpio · build OK ·
api 2/2 · worker 4/4 · social 4/4 · 31 rutas · 693 enlaces · Playwright 216/216.

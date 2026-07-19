# Estudio tipográfico

## Objetivo y restricciones

Comparar familias abiertas para una voz editorial contemporánea, lectura bilingüe
español/inglés, interfaz móvil y carga controlada. La decisión es provisional porque aún no
hay contenido final ni activos de marca.

Todas las familias evaluadas se distribuyen bajo **SIL Open Font License 1.1 (OFL)** en sus
fuentes oficiales. Antes de producción se conservará una copia del archivo de licencia y se
verificarán versión, archivos descargados y metadatos. OFL permite autoalojamiento y
modificación bajo sus condiciones; no equivale a permiso para renombrar o redistribuir sin
cumplir la licencia.

## Candidatas para display y encabezados

### Zen Kaku Gothic New

- **Voz:** geométrica, serena y con presencia editorial; conecta latín con repertorio japonés.
- **Disponibilidad:** repositorio/fuente abierta y catálogos de fuentes web; puede
  autoalojarse.
- **Peso:** familia con varios pesos, desde ligero hasta negro según archivos disponibles.
- **Anchura:** proporciones propias; no se debe asumir un eje variable de anchura.
- **Latín/bilingüe:** cubre español e inglés y aporta japonés, ventaja solo si ese idioma es
  un requisito real.
- **Rendimiento:** el repertorio CJK puede producir archivos y subconjuntos mucho mayores.
  Cargar el set completo para un sitio solo latino sería un coste injustificado.
- **Móvil:** formas abiertas, pero los titulares largos requieren validar quiebres y tamaño.
- **Riesgo:** usarla únicamente por singularidad visual puede introducir latencia y una
  asociación cultural no sustentada por el contenido.

**Conclusión:** candidata válida si japonés o su voz gráfica forman parte de una decisión de
marca; no es la opción provisional para este alcance.

### Inter Tight

- **Voz:** compacta, directa y contemporánea; permite titulares grandes sin ocupar una
  anchura excesiva.
- **Disponibilidad:** proyecto abierto y catálogos de fuentes web; apta para autoalojamiento.
- **Peso:** amplio rango de pesos en archivos estáticos/variables disponibles.
- **Anchura:** el diseño es estrecho por naturaleza. No debe simularse condensación con
  escalado horizontal y no se asumirá un eje `wdth` sin inspeccionar el archivo elegido.
- **Latín/bilingüe:** buena cobertura para español e inglés, incluidos acentos y signos
  habituales; validar nombres y caracteres reales.
- **Rendimiento:** un subconjunto latino WOFF2 variable puede evitar múltiples archivos, pero
  deberá compararse con dos archivos estáticos según los pesos realmente usados.
- **Móvil:** eficiente en encabezados; exige vigilar tamaños pequeños, tracking y líneas
  demasiado densas.
- **Riesgo:** usarla para párrafos extensos puede reducir comodidad y volver monótono el
  sistema.

**Conclusión:** mejor balance provisional para display y encabezados.

### Manrope

- **Voz:** geométrica y amable, con una presencia tecnológica menos comprimida.
- **Disponibilidad:** proyecto abierto y catálogos de fuentes web; apta para autoalojamiento.
- **Peso:** rango amplio, incluido archivo variable según distribución.
- **Anchura:** proporción relativamente amplia; no se asumirá eje de anchura.
- **Latín/bilingüe:** adecuada para español e inglés; confirmar glifos del contenido final.
- **Rendimiento:** comparable a otras sans latinas si se limita el subconjunto y pesos.
- **Móvil:** buena claridad, aunque titulares grandes pueden ocupar más líneas.
- **Riesgo:** puede acercarse a una estética de producto genérica si no se acompaña de una
  composición editorial distintiva.

**Conclusión:** alternativa sólida si Inter Tight resulta demasiado severa al probar casos.

## Candidatas para cuerpo

### Source Serif 4

- **Voz y lectura:** serif contemporánea diseñada para lectura; aporta contraste editorial y
  diferencia clara entre titulares sans y narrativa.
- **Disponibilidad/licencia:** proyecto abierto, OFL, autoalojable.
- **Peso/óptica:** amplia oferta de pesos y variantes; algunas distribuciones incluyen
  fuentes variables y tamaños ópticos. Se inspeccionará el archivo antes de declarar ejes.
- **Latín:** cobertura robusta para español e inglés.
- **Rendimiento:** añade una familia y, por tanto, solicitudes y bytes. La cursiva real puede
  requerir otro archivo.
- **Móvil:** cómoda en texto largo si se valida contraste fino, tamaño y altura de línea.
- **Uso recomendado:** ensayos o casos extensos cuando la identidad necesite mayor contraste.

### Source Sans 3

- **Voz y lectura:** neutral, abierta y eficiente; mantiene continuidad entre cuerpo,
  controles y metadatos.
- **Disponibilidad/licencia:** proyecto abierto, OFL, autoalojable.
- **Peso:** amplio rango de pesos en distribuciones estáticas y variables.
- **Anchura:** usar proporciones nativas; no asumir eje de anchura en el archivo elegido.
- **Latín:** cobertura sólida de español e inglés y signos de interfaz.
- **Rendimiento:** una sola familia para cuerpo/UI reduce variantes; un subconjunto latino
  WOFF2 puede ser compacto.
- **Móvil:** x-height y formas abiertas favorecen lectura en tamaños moderados.
- **Uso recomendado:** cuerpo, UI, metadatos y navegación.

### Combinación híbrida

**Inter Tight + Source Serif 4 + Source Sans 3** ofrecería encabezados compactos, narrativa
serif y UI sans. Es la opción más rica, pero eleva archivos, decisiones de jerarquía y riesgo
de inconsistencia.

Una variante más contenida es **Inter Tight + Source Sans 3**, reservando ritmo, ancho de
columna y escala para producir carácter editorial. Es más estable en móvil y reduce el coste
de fuentes.

## Selección implementada, identidad provisional

- **Display/encabezados:** Inter Tight.
- **Cuerpo/UI:** Source Sans 3.
- **Entrega actual:** paquetes locales `@fontsource-variable/inter-tight` y
  `@fontsource-variable/source-sans-3`; el build sirve los archivos, sin CDN de fuentes.
- **Integración:** imports desde `src/styles/global.css`, tokens `--heading` y `--body`.
- **Estado:** decisión técnica aplicada; identidad, pesos finales, subconjuntos y fallbacks
  siguen provisionales hasta probar contenido y marca reales.
- **Carga futura:** precargar solo si la medición demuestra que mejora la ruta crítica.

## Pesos iniciales a probar

- Inter Tight: regular/medio y negrita para encabezados.
- Source Sans 3: regular y semibold; cursiva solo si el contenido la necesita.

No se fija un número de peso hasta inspeccionar los archivos y probar síntesis. Se declarará
`font-synthesis: none` cuando estén disponibles todas las variantes usadas.

## Fallbacks

```css
--font-display: "Inter Tight", "Arial Narrow", Arial, "Helvetica Neue", sans-serif;
--font-body: "Source Sans 3", system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
```

Los fallbacks deben compararse por métricas para reducir cambios de línea y CLS. Si se usan
ajustes como `size-adjust`, `ascent-override` o `descent-override`, se calcularán desde los
archivos reales y se documentarán; no se copiarán valores genéricos.

## Reglas de uso

- Nunca deformar texto con `scaleX`, `scaleY` o anchura simulada.
- No usar pesos falsos ni cursiva sintética.
- Mantener mayúsculas espaciadas para etiquetas breves, no párrafos.
- Evitar texto justificado y tracking negativo en cuerpo.
- Permitir zoom al 200% y reflujo a 320 CSS px sin pérdida.
- Probar tildes, eñes, signos de apertura, números, URLs y nombres reales.
- Definir `lang` por documento y por fragmento cuando cambie el idioma.

## Prueba antes de aprobar

1. Titulares cortos y largos en español e inglés.
2. Caso de 800–1,500 palabras con listas, citas y pies.
3. Navegación y controles a 320 CSS px.
4. Fallback durante carga lenta y con fuentes bloqueadas.
5. Peso total WOFF2 y efecto en LCP/CLS.
6. Contraste, legibilidad, zoom y preferencias del usuario.
7. Licencia y procedencia incluidas en el repositorio de implementación.

# Content Growth OS

Micro-SO editorial para convertir una entrada de `blog.jossuealcala.com` en una
campaña multired trazable. Lee directamente el Markdown publicado; no necesita
copiar el artículo a otra herramienta.

## Qué produce

- copys diferenciados para X, Reddit, grupos de Facebook, LinkedIn, Instagram y Threads;
- dos variantes por red cuando el uso del enlace cambia la conversación;
- URL con UTM por plataforma;
- un hilo para X y una versión extensa, útil antes del enlace, para Reddit;
- briefs visuales para infografía, diagrama/carrusel y UGC escenificado;
- tres artes SVG editables y sus PNG: horizontal, cuadrado y vertical;
- texto alternativo y una lista de control antes de publicar;
- un prompt contextual listo para una segunda pasada con un modelo de lenguaje.

No publica, programa ni entra en cuentas sociales. La revisión humana y las reglas
de cada grupo o comunidad son parte obligatoria del flujo.

## Uso

Desde la raíz de `jossue-portfolio`:

```bash
npm run social:campaign -- --slug mas-codigo-menos-producto
```

Opciones:

```bash
npm run social:campaign -- --slug gpt-5-6-sol-terra-luna --lang es --goal visitas
npm run social:campaign -- --file src/content/blog/es/black-hat-agentes-sandbox.md --no-render
npm run social:campaign -- --slug mas-codigo-menos-producto --out /ruta/de/salida
```

La salida predeterminada queda en `.social-campaigns/<fecha>-<slug>/`, directorio
local ignorado por Git. Abre primero `campaign.md`; los PNG están en `assets/`.

## Principios editoriales

1. La campaña hereda la tesis, las palabras y los límites de la entrada.
2. El valor debe entenderse sin abrir el enlace.
3. Cada red tiene una función distinta; no se pega el mismo copy en todas.
4. Una pregunta debe abrir conversación real, no pedir interacción vacía.
5. Nunca se inventan resultados, cifras, citas, experiencia ni urgencia.
6. UGC describe una estética escenificada, no un testimonio falso.
7. Reddit y grupos de Facebook exigen revisión de reglas antes de añadir el enlace.
8. “Viral” se trata como hipótesis de distribución, no como garantía.

## Flujo recomendado

1. Genera la campaña.
2. Revisa `campaign.md` y elimina cualquier variante que no represente tu postura.
3. Consulta las reglas del subreddit o grupo específico.
4. Si quieres más elaboración, pega `model-prompt.md` en el agente de Pangea y
   pide una segunda pasada; el contrato de salida y los límites ya vienen incluidos.
5. Publica manualmente y registra en `metrics-template.csv` las impresiones,
   interacción, clics y sesiones atribuidas.
6. Después de 48–72 horas, conserva el ángulo que produjo conversación y visitas,
   no sólo impresiones.

## Fuentes operativas

Los límites y salvaguardas se documentan en `references/platform-rules.md`. Revísalos
periódicamente: las plataformas cambian y las normas particulares de una comunidad
siempre tienen prioridad.

#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOG_ROOT = path.join(PROJECT_ROOT, 'src/content/blog');
const OS_ROOT = path.join(PROJECT_ROOT, 'content-growth-os');

const cleanScalar = (value = '') => value.trim().replace(/^['"]|['"]$/g, '');
const stripMarkdown = (value = '') => value
  .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[*_`>#]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

export function parsePost(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) throw new Error('La entrada no contiene frontmatter válido.');

  const data = {};
  let activeKey = '';
  for (const rawLine of match[1].split('\n')) {
    const property = rawLine.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (property) {
      activeKey = property[1];
      const rawValue = property[2];
      if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
        data[activeKey] = rawValue.slice(1, -1).split(',').map(cleanScalar).filter(Boolean);
      } else if (rawValue) {
        data[activeKey] = cleanScalar(rawValue);
      }
      continue;
    }
    const listItem = rawLine.match(/^\s+-\s+(.+)$/);
    if (listItem && activeKey === 'keywords') {
      if (!Array.isArray(data.keywords)) data.keywords = [];
      data.keywords.push(cleanScalar(listItem[1]));
    }
  }

  const body = match[2].trim();
  const paragraphs = body.split(/\n\s*\n/).map(stripMarkdown).filter((item) => item && !item.startsWith('## '));
  const sections = [...body.matchAll(/^##\s+(.+)\n+([\s\S]*?)(?=\n##\s+|$)/gm)].map((section) => {
    const sectionParagraph = section[2].split(/\n\s*\n/).map(stripMarkdown).find((item) => item && !item.startsWith('- '));
    return { heading: stripMarkdown(section[1]), insight: sectionParagraph || stripMarkdown(section[2]) };
  });

  const required = ['lang', 'slug', 'title', 'description', 'excerpt', 'category'];
  for (const key of required) if (!data[key]) throw new Error(`Falta ${key} en el frontmatter.`);

  return {
    ...data,
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    body,
    opening: paragraphs[0] || data.excerpt,
    sections,
  };
}

export function campaignUrl(post, platform, platforms, campaignId) {
  const localePath = post.lang === 'en' ? 'en' : 'es';
  const url = new URL(`https://blog.jossuealcala.com/${localePath}/${post.slug}/`);
  const config = platforms[platform];
  url.searchParams.set('utm_source', config.utm_source);
  url.searchParams.set('utm_medium', config.utm_medium);
  url.searchParams.set('utm_campaign', campaignId.slice(0, 8));
  return url.toString();
}

const sentence = (text, fallback) => {
  const candidate = stripMarkdown(text || '').match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() || stripMarkdown(text || fallback);
  return candidate.replace(/\s+/g, ' ').trim();
};
const truncate = (text, limit) => text.length <= limit ? text : `${text.slice(0, Math.max(0, limit - 1)).replace(/\s+\S*$/, '')}…`;
const compactQuestion = (post) => post.lang === 'en' ? 'How do you decide where the limit is?' : '¿Cómo decides dónde está el límite?';
const cta = (post) => post.lang === 'en' ? 'I developed the argument here:' : 'Desarrollé el argumento aquí:';

export function buildCopies(post, platforms, campaignId) {
  const points = post.sections.slice(0, 3);
  const pointLines = points.map((point) => sentence(point.insight, point.heading));
  const url = (platform) => campaignUrl(post, platform, platforms, campaignId);
  const thesis = sentence(post.excerpt, post.description);
  const question = compactQuestion(post);

  const xSuffix = `\n\n${url('x')}`;
  const xLead = truncate(thesis, platforms.x.copy_limit - xSuffix.length);
  const xThread = [
    truncate(`${post.title}\n\n${thesis}`, 280),
    ...points.map((point, index) => truncate(`${index + 2}/${points.length + 2} ${point.heading}\n\n${sentence(point.insight, point.heading)}`, 280)),
    truncate(`${points.length + 2}/${points.length + 2} ${question}\n\n${cta(post)} ${url('x')}`, 280),
  ];

  const redditBody = [
    post.opening,
    points.length ? (post.lang === 'en' ? 'Three ideas I would keep:' : 'Tres ideas que conservaría:') : '',
    ...points.map((point) => `- **${point.heading}:** ${sentence(point.insight, point.heading)}`),
    question,
    post.lang === 'en'
      ? `Disclosure: I wrote the original article. If links are allowed in this community, it is here: ${url('reddit')}`
      : `Transparencia: escribí el artículo original. Si las reglas de esta comunidad permiten enlaces, está aquí: ${url('reddit')}`,
  ].filter(Boolean).join('\n\n');

  const facebookBase = [
    thesis,
    ...pointLines.map((point) => `• ${point}`),
    question,
  ].join('\n\n');

  const linkedin = [
    post.title,
    thesis,
    post.lang === 'en' ? 'The practical distinction is this:' : 'La distinción práctica es ésta:',
    ...points.map((point) => `— ${point.heading}: ${sentence(point.insight, point.heading)}`),
    question,
    `${cta(post)} ${url('linkedin')}`,
  ].join('\n\n');

  const instagram = [
    post.title,
    thesis,
    ...points.map((point, index) => `${index + 1}. ${point.heading}`),
    question,
    post.lang === 'en' ? 'Full article at the link in my profile.' : 'Artículo completo en el enlace de mi perfil.',
    post.keywords.slice(0, 3).map((keyword) => `#${String(keyword).replace(/[^\p{L}\p{N}]+/gu, '')}`).join(' '),
  ].filter(Boolean).join('\n\n');

  const threads = truncate(`${thesis}\n\n${question}`, platforms.threads.copy_limit);

  return {
    x: {
      single_post: `${xLead}${xSuffix}`,
      thread: xThread,
      note: 'La variante corta respeta 280 caracteres; el hilo reserva el enlace para el cierre.',
    },
    reddit: {
      title: post.title,
      body: redditBody,
      note: 'Revisar reglas, historial propio en la comunidad y permiso para enlaces antes de publicar.',
    },
    facebook_groups: {
      value_first_no_link: facebookBase,
      link_allowed: `${facebookBase}\n\n${cta(post)} ${url('facebook_groups')}`,
      note: 'Usar la versión con enlace sólo cuando las reglas del grupo lo permitan.',
    },
    linkedin: { post: linkedin, note: 'Mantener saltos cortos; evitar convertirlo en una lista genérica de consejos.' },
    instagram: { caption: instagram, profile_url: url('instagram'), note: 'El enlace se prepara para el perfil o una story; no depende de un enlace en el caption.' },
    threads: { post: threads, follow_up: `${cta(post)} ${url('threads')}`, note: 'Publicar el enlace como respuesta sólo si la conversación lo justifica.' },
  };
}

const escapeXml = (text) => String(text).replace(/[<>&'"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]);
const wrap = (text, maxChars, maxLines) => {
  const words = stripMarkdown(text).split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) { lines.push(line); line = word; } else line = next;
  }
  if (line) lines.push(line);
  const result = lines.slice(0, maxLines);
  if (lines.length > maxLines) result[maxLines - 1] = `${result[maxLines - 1].replace(/[.,;:]$/, '')}…`;
  return result;
};

export function makeSvg(post, format) {
  const formats = {
    landscape: { width: 1200, height: 675, titleSize: 62, titleChars: 29, titleLines: 4 },
    square: { width: 1080, height: 1080, titleSize: 66, titleChars: 25, titleLines: 5 },
    portrait: { width: 1080, height: 1350, titleSize: 70, titleChars: 23, titleLines: 5 },
  };
  const spec = formats[format];
  if (!spec) throw new Error(`Formato visual desconocido: ${format}`);
  const titleLines = wrap(post.title, spec.titleChars, spec.titleLines);
  const points = post.sections.slice(0, 3).map((item) => item.heading);
  const titleStart = 150;
  const titleHeight = titleLines.length * spec.titleSize * 1.02;
  const pointsStart = Math.max(titleStart + titleHeight + 54, spec.height * 0.62);
  const pointGap = format === 'landscape' ? 56 : 74;
  const footerY = spec.height - 62;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${spec.width}" height="${spec.height}" viewBox="0 0 ${spec.width} ${spec.height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(post.title)}</title>
  <desc id="desc">Infografía editorial con tres ideas principales de la entrada.</desc>
  <rect width="100%" height="100%" fill="#f4f3ee"/>
  <rect x="0" y="0" width="24" height="100%" fill="#ef5b3e"/>
  <rect x="${spec.width - 158}" y="52" width="106" height="18" fill="#54d8df"/>
  <text x="76" y="78" fill="#151515" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3">JOSSUE ALCALÁ · ${escapeXml(String(post.category).toUpperCase())}</text>
  <g fill="#151515" font-family="Arial, sans-serif" font-size="${spec.titleSize}" font-weight="700">
    ${titleLines.map((line, index) => `<text x="76" y="${titleStart + index * spec.titleSize * 1.02}">${escapeXml(line)}</text>`).join('\n    ')}
  </g>
  <g font-family="Arial, sans-serif">
    ${points.map((point, index) => `<g transform="translate(76 ${pointsStart + index * pointGap})"><rect width="30" height="30" fill="${index === 0 ? '#ef5b3e' : index === 1 ? '#54d8df' : '#151515'}"/><text x="48" y="24" fill="#151515" font-size="25" font-weight="600">${escapeXml(point)}</text></g>`).join('\n    ')}
  </g>
  <line x1="76" y1="${footerY - 34}" x2="${spec.width - 76}" y2="${footerY - 34}" stroke="#d8d6ce" stroke-width="2"/>
  <text x="76" y="${footerY}" fill="#6b6962" font-family="Arial, sans-serif" font-size="23">blog.jossuealcala.com</text>
  <text x="${spec.width - 76}" y="${footerY}" text-anchor="end" fill="#6b6962" font-family="Arial, sans-serif" font-size="19">Lee · cuestiona · decide</text>
</svg>`;
}

function visualBriefs(post) {
  const points = post.sections.slice(0, 3).map((item) => item.heading);
  return [
    {
      id: 'infographic',
      format: 'portrait + square + landscape',
      objective: 'Hacer que la tesis se entienda antes del clic.',
      visible_text: [post.title, ...points],
      production_prompt: `Infografía editorial minimalista para ${post.title}. Fondo marfil, tinta negra, acento coral y cian, geometría rectilínea, tipografía sans serif de alto contraste, tres puntos: ${points.join('; ')}. Sin logotipos inventados, sin métricas, sin interfaz falsa.`,
      alt_text: `Infografía titulada “${post.title}” con tres ideas: ${points.join(', ')}.`,
    },
    {
      id: 'carousel_diagram',
      format: '4:5, 4 láminas',
      objective: 'Convertir el argumento en una secuencia guardable.',
      visible_text: [post.title, ...points],
      production_prompt: `Carrusel editorial de cuatro láminas. Primera: ${post.title}. Láminas siguientes: ${points.join(' / ')}. Una idea por lámina, máximo 12 palabras visibles, diagramas simples, flechas sólo cuando indiquen causalidad. Paleta marfil, coral, cian y negro.`,
      alt_text: `Carrusel de cuatro láminas que desarrolla la idea “${post.title}”.`,
    },
    {
      id: 'staged_ugc',
      format: '9:16 y 4:5',
      objective: 'Introducir el tema desde una escena cotidiana sin fingir testimonio.',
      disclosure: 'Visual sintético/escenificado; no presentarlo como experiencia documental de un tercero.',
      production_prompt: `Fotografía UGC escenificada, cámara de teléfono a la altura de los ojos, luz natural imperfecta, escritorio real de una persona que analiza “${post.title}”. Pantalla sin marcas ni texto legible, manos en acción, libreta con tres recuadros vacíos, textura cotidiana, sin piel plástica, sin logos, sin testimonio, sin cifras.`,
      alt_text: `Escena escenificada de una persona revisando información en una computadora y tomando notas antes de decidir.`,
    },
  ];
}

function modelPrompt(post, campaign, schema) {
  return `${campaign.system_prompt}\n\n## Contexto de campaña\n\nObjetivo: ${campaign.goal}\nCampaña: ${campaign.id}\nURL canónica: ${campaign.source.canonical_url}\n\n## Metadatos de la entrada\n\n${JSON.stringify({ title: post.title, description: post.description, excerpt: post.excerpt, category: post.category, keywords: post.keywords }, null, 2)}\n\n## Entrada completa\n\n${post.body}\n\n## Primer borrador automático\n\n${JSON.stringify(campaign.platforms, null, 2)}\n\n## Contrato JSON de salida\n\n${JSON.stringify(schema, null, 2)}\n`;
}

function markdownCampaign(campaign) {
  const blocks = [];
  blocks.push(`# ${campaign.source.title}`, `Campaña: \`${campaign.id}\` · Objetivo: ${campaign.goal}`, '> Borradores para revisión humana. No garantizan viralidad ni autorización de una comunidad.');
  for (const [platform, payload] of Object.entries(campaign.platforms)) {
    blocks.push(`## ${campaign.platform_config[platform].label}`);
    for (const [key, value] of Object.entries(payload)) {
      if (key === 'note') continue;
      if (Array.isArray(value)) {
        blocks.push(`### ${key.replaceAll('_', ' ')}`, ...value.map((item, index) => `**${index + 1}.** ${item}`));
      } else blocks.push(`### ${key.replaceAll('_', ' ')}`, value);
    }
    blocks.push(`_Revisión: ${payload.note}_`);
  }
  blocks.push('## Visuales', ...campaign.visuals.map((visual) => `### ${visual.id}\n\n- Objetivo: ${visual.objective}\n- Formato: ${visual.format}\n- Prompt: ${visual.production_prompt}\n- Alt text: ${visual.alt_text}${visual.disclosure ? `\n- Declaración: ${visual.disclosure}` : ''}`));
  blocks.push('## Antes de publicar', ...campaign.community_checks.map((item) => `- [ ] ${item}`));
  blocks.push('## Experimento', `Comparar “tensión” vs. “regla práctica” sin cambiar plataforma, horario y visual al mismo tiempo. Evaluar comentarios útiles y sesiones atribuidas después de 48–72 horas; no elegir sólo por impresiones.`);
  return `${blocks.join('\n\n')}\n`;
}

async function renderPngs(assetDirectory, formats) {
  let chromium;
  try { ({ chromium } = await import('@playwright/test')); }
  catch { return { rendered: false, reason: 'Playwright no está disponible; los SVG sí fueron generados.' }; }
  const browser = await chromium.launch({ headless: true });
  try {
    for (const format of formats) {
      const page = await browser.newPage();
      await page.goto(pathToFileURL(path.join(assetDirectory, `${format}.svg`)).href);
      const svg = page.locator('svg');
      await svg.screenshot({ path: path.join(assetDirectory, `${format}.png`) });
      await page.close();
    }
  } finally { await browser.close(); }
  return { rendered: true };
}

function parseArgs(argv) {
  const args = { lang: 'es', goal: 'visitas', render: true };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--no-render') args.render = false;
    else if (token.startsWith('--')) {
      args[token.slice(2)] = argv[index + 1];
      index += 1;
    }
  }
  if (!args.slug && !args.file) throw new Error('Usa --slug <slug> o --file <ruta>.');
  return args;
}

export async function generate(options) {
  const sourcePath = options.file
    ? path.resolve(PROJECT_ROOT, options.file)
    : path.join(BLOG_ROOT, options.lang, `${options.slug}.md`);
  const post = parsePost(await readFile(sourcePath, 'utf8'));
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date()).replaceAll('-', '');
  const campaignId = `${date}-${post.slug}`;
  const output = options.out ? path.resolve(options.out) : path.join(PROJECT_ROOT, '.social-campaigns', campaignId);
  const assets = path.join(output, 'assets');
  const platforms = JSON.parse(await readFile(path.join(OS_ROOT, 'config/platforms.json'), 'utf8'));
  const systemPrompt = await readFile(path.join(OS_ROOT, 'SYSTEM_PROMPT.md'), 'utf8');
  const campaign = {
    schema_version: '1.0.0',
    id: campaignId,
    generated_at: new Date().toISOString(),
    goal: options.goal,
    source: {
      file: path.relative(PROJECT_ROOT, sourcePath),
      title: post.title,
      canonical_url: `https://blog.jossuealcala.com/${post.lang}/${post.slug}/`,
      language: post.lang,
      category: post.category,
    },
    platform_config: platforms,
    platforms: buildCopies(post, platforms, campaignId),
    visuals: visualBriefs(post),
    community_checks: [
      'Confirmar que la entrada sigue publicada y que la URL responde.',
      'Revisar afirmaciones, fechas, nombres y enlaces contra la entrada.',
      'Leer las reglas del subreddit o grupo específico antes de usar un enlace.',
      'No publicar el mismo copy de forma masiva ni pedir reacciones artificiales.',
      'Añadir alt text y marcar como sintético cualquier UGC fotorrealista generado.',
      'Verificar que los parámetros UTM correspondan a la plataforma.',
    ],
    claims_check: { invented_metrics: false, invented_quotes: false, invented_testimonials: false, source_locked: true },
    system_prompt: systemPrompt,
  };
  const schema = { claims_check: {}, community_checks: [], platforms: {}, visuals: [], experiment: {}, measurement: {} };

  await mkdir(assets, { recursive: true });
  for (const format of ['landscape', 'square', 'portrait']) await writeFile(path.join(assets, `${format}.svg`), makeSvg(post, format));
  const renderResult = options.render === false ? { rendered: false, reason: 'Desactivado por --no-render.' } : await renderPngs(assets, ['landscape', 'square', 'portrait']);
  campaign.render = renderResult;
  await Promise.all([
    writeFile(path.join(output, 'campaign.json'), `${JSON.stringify(campaign, null, 2)}\n`),
    writeFile(path.join(output, 'campaign.md'), markdownCampaign(campaign)),
    writeFile(path.join(output, 'model-prompt.md'), modelPrompt(post, campaign, schema)),
    writeFile(path.join(output, 'metrics.csv'), await readFile(path.join(OS_ROOT, 'metrics-template.csv'))),
  ]);
  return { output, campaign, renderResult };
}

async function main() {
  const result = await generate(parseArgs(process.argv.slice(2)));
  console.log(JSON.stringify({ ok: true, campaign_id: result.campaign.id, output: result.output, pngs_rendered: result.renderResult.rendered }, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(`Content Growth OS: ${error.message}`); process.exitCode = 1; });
}

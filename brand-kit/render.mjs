import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const dir = new URL('./jossue-alcala/', import.meta.url);
const jobs = [
  ['jossue-alcala-isotipo.svg', 1024, 1024, 'transparent', 'jossue-alcala-isotipo-1024.png'],
  ['jossue-alcala-isologo-claro.svg', 2314, 512, 'transparent', 'jossue-alcala-isologo-claro.png'],
  ['jossue-alcala-isologo-oscuro.svg', 2314, 512, 'transparent', 'jossue-alcala-isologo-oscuro.png'],
  ['jossue-alcala-isologo-claro.svg', 2314, 512, '#050605', '_preview-claro.png'],
  ['jossue-alcala-isologo-oscuro.svg', 2314, 512, '#ffffff', '_preview-oscuro.png'],
];
const browser = await chromium.launch();
for (const [src, w, h, bg, out] of jobs) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const svg = readFileSync(new URL(src, dir), 'utf8');
  await page.setContent(`<html><body style="margin:0;background:${bg}"><div style="width:${w}px;height:${h}px">${svg.replace(/width="[^"]*" height="[^"]*"/, `width="${w}" height="${h}"`)}</div></body></html>`);
  await page.screenshot({ path: fileURLToPath(new URL(out, dir)), omitBackground: bg === 'transparent' });
  await page.close();
}
await browser.close();

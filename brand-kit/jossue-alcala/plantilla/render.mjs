// Exporta todas las piezas de anuncios.json con la plantilla anuncio.html.
// Uso (desde jossue-portfolio): node brand-kit/jossue-alcala/plantilla/render.mjs [prefijo-de-id]
/* global process, URLSearchParams, document, console */
import { chromium } from 'playwright';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const salida = join(aqui, '..', 'anuncios');
const { formatos, anuncios } = JSON.parse(readFileSync(join(aqui, 'anuncios.json'), 'utf8'));
const plantilla = pathToFileURL(join(aqui, 'anuncio.html')).href;
const filtro = process.argv[2];

const browser = await chromium.launch();
let total = 0;
for (const anuncio of anuncios) {
	if (filtro && !anuncio.id.startsWith(filtro)) continue;
	for (const [nombre, { w, h }] of Object.entries(formatos)) {
		for (const v of anuncio.variantes ?? ['estandar']) {
			const params = new URLSearchParams({ w, h, v, k: anuncio.k ?? '', t: anuncio.t ?? '', p: anuncio.p ?? '', i: anuncio.i ?? '', seed: anuncio.seed ?? 11 });
			if (anuncio.cta) params.set('cta', anuncio.cta);
			const page = await browser.newPage({ viewport: { width: w, height: h } });
			await page.goto(`${plantilla}?${params}`);
			await page.waitForFunction(() => document.body.dataset.listo === '1');
			const desborde = await page.evaluate(() => {
				const marco = document.querySelector('.marco').getBoundingClientRect();
				return [...document.querySelectorAll('.marco > *, .bloque > *')].some((el) => {
					const b = el.getBoundingClientRect();
					return b.height > 0 && (b.bottom > marco.bottom + 1 || b.top < marco.top - 1 || b.right > marco.right + 1);
				});
			});
			if (desborde) console.warn(`DESBORDE ${anuncio.id} ${v} ${nombre}`);
			mkdirSync(join(salida, nombre), { recursive: true });
			const archivo = `${anuncio.id}${v === 'estandar' ? '' : '-' + v}-${nombre}-${w}x${h}.png`;
			await page.screenshot({ path: join(salida, nombre, archivo) });
			await page.close();
			total++;
		}
	}
}
await browser.close();
console.log(`${total} piezas en ${salida}`);

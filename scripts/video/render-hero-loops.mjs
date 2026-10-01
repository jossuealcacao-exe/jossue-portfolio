/* global window, document */
// Graba los bucles abstractos del héroe de las fichas de producto (10 s, sin audio) cuadro por
// cuadro desde scripts/video/hero-loops.html y los comprime para la web. Herramienta de
// desarrollo: necesita el Chromium de Playwright y ffmpeg; el sitio publicado no depende de ninguno.
//
//   node scripts/video/render-hero-loops.mjs                  todas las escenas, ancho y vertical
//   node scripts/video/render-hero-loops.mjs --only daniela   una sola escena
//   node scripts/video/render-hero-loops.mjs --stills 1,3,5   fotogramas sueltos (PNG) para revisar
//   node scripts/video/render-hero-loops.mjs --fmt tall       solo una proporción
//
// Salida en public/videos/hero/: <escena>.mp4|webm|webp y <escena>-tall.mp4|webm|webp.

import { spawn } from 'node:child_process';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '../../public/videos/hero');
const TMP = process.env.LOOP_TMP ?? join(HERE, '../../tmp/hero-loops');
const FPS = 24;
const SCENES = ['daniela', 'ahp', 'bloqio', 'miawseo', 'consultoria', 'web'];

const arg = (name) => { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : null; };
const only = arg('--only');
const fmtOnly = arg('--fmt');
const stills = arg('--stills')?.split(',').map(Number);

const run = (cmd, args, feed) => new Promise((ok, fail) => {
	const child = spawn(cmd, args, { stdio: [feed ? 'pipe' : 'ignore', 'ignore', 'pipe'] });
	let err = '';
	child.stderr.on('data', (d) => { err += d; });
	child.on('close', (code) => (code === 0 ? ok() : fail(new Error(`${cmd} salió con ${code}\n${err.slice(-1200)}`))));
	if (feed) feed(child.stdin);
});
const COLOR = ['-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv'];
const TV = 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p';
const kb = (file) => `${Math.round(statSync(file).size / 1024)} KB`;

mkdirSync(TMP, { recursive: true });
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const jobs = SCENES.filter((scene) => !only || only === scene).flatMap((scene) => ['wide', 'tall'].filter((fmt) => !fmtOnly || fmtOnly === fmt).map((fmt) => ({ scene, fmt })));

for (const { scene, fmt } of jobs) {
	const size = fmt === 'tall' ? [720, 1280] : [1600, 900];
	const page = await browser.newPage({ viewport: { width: size[0], height: size[1] }, deviceScaleFactor: 1 });
	await page.goto(`${pathToFileURL(join(HERE, 'hero-loops.html')).href}?scene=${scene}&fmt=${fmt}`);
	const duration = await page.evaluate(() => window.DURATION);
	const shot = async (seconds, opts = {}) => { await page.evaluate((x) => window.renderAt(x), seconds); return page.screenshot({ type: 'png', ...opts }); };

	if (stills) {
		for (const second of stills) await shot(second, { path: join(TMP, `still-${scene}-${fmt}-${second}.png`) });
		console.log(`${scene}/${fmt}: ${stills.length} fotogramas en ${TMP}`);
		await page.close();
		continue;
	}

	const master = join(TMP, `${scene}-${fmt}.master.mp4`);
	const total = Math.round(duration * FPS);
	await run('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-', '-vf', TV, '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', ...COLOR, master], async (stdin) => {
		for (let i = 0; i < total; i += 1) {
			const buffer = await shot(i / FPS);
			if (!stdin.write(buffer)) await new Promise((resolve) => stdin.once('drain', resolve));
		}
		stdin.end();
	});
	// El póster sale directo del lienzo: este ffmpeg no trae el codificador WebP.
	await page.evaluate((x) => window.renderAt(x), 4.2);
	const poster = await page.evaluate(() => document.getElementById('c').toDataURL('image/webp', 0.72).split(',')[1]);
	await page.close();

	const base = join(OUT, fmt === 'tall' ? `${scene}-tall` : scene);
	await run('ffmpeg', ['-y', '-i', master, '-an', '-c:v', 'libx264', '-profile:v', 'high', '-crf', '27', '-preset', 'slow', '-tune', 'grain', '-pix_fmt', 'yuv420p', ...COLOR, '-movflags', '+faststart', `${base}.mp4`]);
	await run('ffmpeg', ['-y', '-i', master, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '40', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p', ...COLOR, `${base}.webm`]);
	writeFileSync(`${base}.webp`, Buffer.from(poster, 'base64'));
	console.log(`${scene}/${fmt}: mp4 ${kb(`${base}.mp4`)} · webm ${kb(`${base}.webm`)} · webp ${kb(`${base}.webp`)}`);
}
await browser.close();

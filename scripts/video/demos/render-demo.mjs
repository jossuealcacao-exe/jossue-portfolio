/* global document, window */
// Graba las demos de producto (product-demo.html) cuadro por cuadro.
//   node scripts/video/demos/render-demo.mjs <id|all> [--fmt wide|tall] [--stills 2,8] [--social <carpeta>]
// Sitio: public/videos/demos/<id>(-tall).mp4|webm|webp, sin audio (en el sitio se ven en
// silencio). Con --social, además una copia con sonido (−14 LUFS) para redes.

import { spawn } from 'node:child_process';
import { mkdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { renderAudio } from './demo-audio.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '../../..');
const OUT = join(ROOT, 'public/videos/demos');
const TMP = join(ROOT, 'tmp/demos');
const FPS = 30;
const IDS = ['daniela', 'chatbots', 'bloqio-builder', 'miawseo', 'ia-aplicada', 'chatbots-ia'];
const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : null; };
const which = process.argv[2] === 'all' ? IDS : [process.argv[2]];
const fmts = arg('--fmt') ? [arg('--fmt')] : ['wide', 'tall'];
const stills = arg('--stills')?.split(',').map(Number);
const social = arg('--social');
const COLOR = ['-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv'];
const run = (cmd, args, input) => new Promise((ok, fail) => {
  const p = spawn(cmd, args, { stdio: [input ? 'pipe' : 'ignore', 'ignore', 'pipe'] });
  let err = ''; p.stderr.on('data', (d) => { err += d; });
  p.on('close', (c) => (c === 0 ? ok() : fail(new Error(`${cmd} ${c}\n${err.slice(-1200)}`))));
  if (input) input(p.stdin);
});

mkdirSync(OUT, { recursive: true }); mkdirSync(TMP, { recursive: true }); if (social) mkdirSync(social, { recursive: true });
const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required', '--allow-file-access-from-files'] });
for (const id of which) for (const fmt of fmts) {
  const [w, h] = fmt === 'wide' ? [1920, 1080] : [1080, 1920];
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`${pathToFileURL(join(HERE, 'product-demo.html')).href}?p=${id}&fmt=${fmt}`);
  await page.evaluate(() => document.fonts.ready);
  const reel = await page.evaluate(() => window.REEL);
  const shot = async (t) => { await page.evaluate((x) => window.renderAt(x), t); return page.screenshot({ type: 'png' }); };
  const name = `${id}${fmt === 'tall' ? '-tall' : ''}`;
  if (stills) { for (const t of stills) await sharp(await shot(t)).toFile(join(TMP, `${name}-${t}.png`)); console.log(`${name}: fotogramas en tmp/demos`); await page.close(); continue; }

  const master = join(TMP, `${name}.master.mp4`), wav = join(TMP, `${name}.wav`);
  const total = Math.round(reel.DURATION * FPS), t0 = Date.now();
  await run('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-', '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', ...COLOR, master], async (stdin) => {
    for (let i = 0; i < total; i++) { const b = await shot(i / FPS); if (!stdin.write(b)) await new Promise((r) => stdin.once('drain', r)); }
    stdin.end();
  });
  await sharp(await shot(reel.POSTER)).webp({ quality: 80 }).toFile(join(OUT, `${name}.webp`));
  await page.close();
  await run('ffmpeg', ['-y', '-i', master, '-an', '-c:v', 'libx264', '-profile:v', 'high', '-crf', '24', '-preset', 'slow', '-tune', 'animation', '-pix_fmt', 'yuv420p', ...COLOR, '-movflags', '+faststart', join(OUT, `${name}.mp4`)]);
  await run('ffmpeg', ['-y', '-i', master, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '37', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p', ...COLOR, join(OUT, `${name}.webm`)]);
  if (social) {
    renderAudio(wav, reel, id.length + (fmt === 'tall' ? 3 : 0));
    await run('ffmpeg', ['-y', '-i', master, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-crf', '17', '-preset', 'slow', '-pix_fmt', 'yuv420p', ...COLOR, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=9', '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', join(social, `${id}-${fmt === 'tall' ? '9x16' : '16x9'}.mp4`)]);
    rmSync(wav);
  }
  rmSync(master);
  const kb = (f) => `${Math.round(statSync(join(OUT, f)).size / 1024)} KB`;
  console.log(`${name}: ${reel.DURATION.toFixed(1)} s en ${Math.round((Date.now() - t0) / 1000)} s · mp4 ${kb(`${name}.mp4`)} · webm ${kb(`${name}.webm`)}`);
}
await browser.close();

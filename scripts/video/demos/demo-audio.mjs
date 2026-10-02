// Sonido de las demos de producto, sintetizado aquí: sin muestras ni música de terceros.
// Un fondo cálido con pulso suave y efectos amarrados a las pistas (CUES) de
// product-demo.html: barrido al cambiar de escena, toque al entrar el texto, pops en
// las tarjetas y una campana en el cierre. Mezcla en WAV; render-demo.mjs lo normaliza.

import { writeFileSync } from 'node:fs';

const SR = 48000;

export function renderAudio(path, { DURATION, CUES }, seedStart = 5) {
  let seed = seedStart;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32 * 2 - 1; };
  const n = Math.ceil(DURATION * SR);
  const L = new Float32Array(n), R = new Float32Array(n);
  const put = (t, buf, gain = 1, pan = 0) => {
    const at = Math.round(t * SR), gl = gain * Math.min(1, 1 - pan), gr = gain * Math.min(1, 1 + pan);
    for (let i = 0; i < buf.length && at + i < n; i++) if (at + i >= 0) { L[at + i] += buf[i] * gl; R[at + i] += buf[i] * gr; }
  };
  const make = (dur, fn) => { const b = new Float32Array(Math.round(dur * SR)); for (let i = 0; i < b.length; i++) b[i] = fn(i / SR); return b; };
  const lp = (b, k0, k1 = k0) => { let y = 0; for (let i = 0; i < b.length; i++) { const k = k0 + (k1 - k0) * i / b.length; y += (b[i] - y) * k; b[i] = y; } return b; };

  const pop = (f = 900) => make(.16, (t) => Math.sin(2 * Math.PI * f * (1 - .35 * Math.min(1, t / .07)) * t) * Math.exp(-t * 30) * (1 - Math.exp(-t * 900)));
  const thump = (f0 = 62) => make(.45, (t) => Math.sin(2 * Math.PI * f0 * (1 - .45 * Math.min(1, t / .18)) * t) * Math.exp(-t * 9) * (1 - Math.exp(-t * 600)));
  const whoosh = (dur = .5) => lp(make(dur, (t) => rnd() * Math.sin(Math.PI * t / dur) ** 2), .03, .3);
  const chime = (notes, gap = .07) => { const b = new Float32Array(Math.round((notes.length * gap + 1.6) * SR)); notes.forEach((f, k) => { const at = Math.round(k * gap * SR); for (let i = 0; at + i < b.length; i++) { const t = i / SR; b[at + i] += (Math.sin(2 * Math.PI * f * t) + .25 * Math.sin(4 * Math.PI * f * t)) * Math.exp(-t * 3) * (1 - Math.exp(-t * 400)) / notes.length; } }); return b; };
  const tick = () => make(.03, (t) => (Math.sin(2 * Math.PI * 2200 * t) * .5 + rnd() * .5) * Math.exp(-t * 220));

  // fondo: acorde mayor que respira y pulso a 92 bpm
  const chord = [130.81, 164.81, 196, 246.94, 293.66];
  for (let i = 0; i < n; i++) {
    const t = i / SR, env = Math.min(1, t / 1.5) * Math.min(1, (DURATION - t) / 1.2);
    let v = 0; chord.forEach((f, k) => { v += Math.sin(2 * Math.PI * f * t + k) + .5 * Math.sin(2 * Math.PI * f * 1.003 * t); });
    const s = v / chord.length * .07 * env * (.8 + .2 * Math.sin(2 * Math.PI * t / 5.5));
    L[i] += s; R[i] += s * .96;
  }
  const BEAT = 60 / 92;
  for (let t = .4; t < DURATION - 1.2; t += BEAT) { put(t, thump(56), .18); put(t + BEAT / 2, tick(), .05, .3); }

  for (const { t, k } of CUES) {
    if (k === 'intro') { put(t, whoosh(.7), .45); put(t + .1, thump(66), .7); put(t + .15, chime([523.25, 783.99, 1046.5], .06), .5); }
    if (k === 'scene') put(t - .18, whoosh(.45), .35, (rnd()) * .4);
    if (k === 'text') put(t, pop(820), .22);
    if (k === 'item') put(t, pop(700 + Math.abs(rnd()) * 500), .28, (rnd()) * .4);
    if (k === 'outro') { put(t, thump(58), .7); put(t + .02, chime([392, 523.25, 659.25, 783.99], .07), .6); }
  }

  let peak = 0; for (let i = 0; i < n; i++) { L[i] = Math.tanh(L[i] * 1.15); R[i] = Math.tanh(R[i] * 1.15); peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); }
  const g = .89 / peak, buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) { buf.writeInt16LE(Math.round(L[i] * g * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R[i] * g * 32767), 46 + i * 4); }
  writeFileSync(path, buf);
}

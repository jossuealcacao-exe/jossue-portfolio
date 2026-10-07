// Genera key-visual.html autocontenido: incrusta fuente, logos, foto y anuncios como data URI.
// Uso (desde jossue-portfolio, en macOS): node brand-kit/jossue-alcala/plantilla/manual.mjs
/* global console, Buffer */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const kit = join(aqui, '..');
const temporal = mkdtempSync(join(tmpdir(), 'kv-'));
const cache = new Map();

// Las piezas se reducen a JPEG de 1000 px para que el manual pese poco; logos y fuente van tal cual.
function dataUri(ruta) {
	if (cache.has(ruta)) return cache.get(ruta);
	const archivo = join(kit, ruta);
	if (!existsSync(archivo)) throw new Error(`No existe ${ruta}`);
	const ext = extname(ruta).toLowerCase();
	let uri;
	if (ext === '.svg') uri = `data:image/svg+xml;base64,${readFileSync(archivo).toString('base64')}`;
	else if (ext === '.woff2') uri = `data:font/woff2;base64,${readFileSync(archivo).toString('base64')}`;
	else {
		const salida = join(temporal, `${cache.size}.jpg`);
		execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', '-Z', '1000', archivo, '--out', salida], { stdio: 'ignore' });
		uri = `data:image/jpeg;base64,${readFileSync(salida).toString('base64')}`;
	}
	cache.set(ruta, uri);
	return uri;
}

const local = (r) => !/^(data:|#|https?:|\$\{)/.test(r);
let html = readFileSync(join(aqui, 'manual-fuente.html'), 'utf8').replace(/<!-- Fuente editable[\s\S]*?-->\n/, '');
html = html.replace(/src="([^"]+)"/g, (m, r) => (local(r) ? `src="${dataUri(r)}"` : m));
html = html.replace(/url\(([^)'"]+)\)/g, (m, r) => (local(r) ? `url(${dataUri(r)})` : m));
writeFileSync(join(kit, 'key-visual.html'), html);
console.log(`key-visual.html: ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB, ${cache.size} recursos incrustados`);

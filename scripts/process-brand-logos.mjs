/**
 * One-off brand logo cleanup: remove baked-in backgrounds and trim transparency.
 * Run: npm exec --yes --package=sharp node scripts/process-brand-logos.mjs
 */
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public/cv/brands');
const inputsDir = join(root, '_inputs/cv/brands');

/** @param {Uint8Array} data */
function removeNearBlack(data, threshold = 28) {
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		if (r <= threshold && g <= threshold && b <= threshold) {
			data[i + 3] = 0;
		}
	}
}

/** @param {Uint8Array} data */
function removeNearWhite(data, threshold = 245) {
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		if (r >= threshold && g >= threshold && b >= threshold) {
			data[i + 3] = 0;
		}
	}
}

async function processRaster({ input, output, mode, threshold }) {
	const source = sharp(input).ensureAlpha();
	const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });
	const pixels = new Uint8Array(data);

	if (mode === 'black') removeNearBlack(pixels, threshold);
	if (mode === 'white') removeNearWhite(pixels, threshold);

	await sharp(pixels, {
		raw: { width: info.width, height: info.height, channels: 4 },
	})
		.trim({ threshold: 1 })
		.png({ compressionLevel: 9, adaptiveFiltering: true })
		.toFile(output);

	const meta = await sharp(output).metadata();
	return { width: meta.width ?? 0, height: meta.height ?? 0 };
}

async function mirrorToInputs(filename) {
	await mkdir(inputsDir, { recursive: true });
	await copyFile(join(publicDir, filename), join(inputsDir, filename));
}

const results = {};

results['wu-nutrition.png'] = await processRaster({
	input: join(inputsDir, 'wu-nutrition-cv.png'),
	output: join(publicDir, 'wu-nutrition.png'),
	mode: 'black',
	threshold: 28,
});

results['farmalisto.png'] = await processRaster({
	input: join(inputsDir, 'farmalisto.png'),
	output: join(publicDir, 'farmalisto.png'),
	mode: 'black',
	threshold: 28,
});

results['come-verde.png'] = await processRaster({
	input: join(inputsDir, 'come-verde.jpg'),
	output: join(publicDir, 'come-verde.png'),
	mode: 'white',
	threshold: 242,
});

results['la-carniceria-virtual.png'] = await processRaster({
	input: join(inputsDir, 'la-carniceria-virtual-cropped.png'),
	output: join(publicDir, 'la-carniceria-virtual.png'),
	mode: 'black',
	threshold: 24,
});

for (const name of Object.keys(results)) {
	await mirrorToInputs(name);
}

console.log(JSON.stringify(results, null, 2));

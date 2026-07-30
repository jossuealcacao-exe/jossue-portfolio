import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const sourceDirectory = path.resolve('_inputs/projects/la carniceria virtual/screenshots');
const outputDirectory = path.resolve('src/assets/cases/la-carniceria-virtual');
const files = ['home-desktop.jpg', 'category-desktop.jpg', 'pdp-mobile.jpg', 'lighthouse-home-mobile.jpg'];

await mkdir(outputDirectory, { recursive: true });

for (const file of files) {
	await copyFile(path.join(sourceDirectory, file), path.join(outputDirectory, file));
	console.log(`Prepared ${file}`);
}

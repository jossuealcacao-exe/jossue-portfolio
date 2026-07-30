import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('src/assets/cases/bloqio-cro-apps');
const files = [
	['galeria/assets/prometeo/Top-bar-con-oferta.png', 'prometeo-topbar-offer.png'],
	['galeria/assets/prometeo/Top-bar-con-contador.png', 'prometeo-topbar-countdown.png'],
	['galeria/assets/prometeo/Top-bar-con-CTA.png', 'prometeo-topbar-cta.png'],
	['galeria/assets/prometeo/Top-bar-en-pagina-de-producto.png', 'prometeo-topbar-pdp.png'],
	['galeria/assets/hermes/Sticky-bar-mobile.png', 'hermes-sticky-mobile.png'],
	['galeria/assets/hermes/Sticky-bar-escritorio.png', 'hermes-sticky-desktop.png'],
	['galeria/assets/hermes/Variante-sincronizada.png', 'hermes-variant-sync.png'],
	['galeria/assets/hermes/Cantidad-editable.png', 'hermes-qty-editable.png'],
];

await mkdir(outputDirectory, { recursive: true });

for (const [remotePath, fileName] of files) {
	const response = await fetch(`https://bloqio.app/${remotePath}`);
	if (!response.ok) {
		throw new Error(`Failed to download ${remotePath}: ${response.status}`);
	}
	const buffer = Buffer.from(await response.arrayBuffer());
	await writeFile(path.join(outputDirectory, fileName), buffer);
	console.log(`Prepared ${fileName}`);
}

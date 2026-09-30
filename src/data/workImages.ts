// Capturas reales de los proyectos en /public/images/work. Si un archivo todavía no existe, la
// página conserva su campo reservado (MediaSlot) en vez de romperse.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const PUBLIC = join(process.cwd(), 'public');

export function workImage(name: string): string | null {
	const rel = `/images/work/${name}.webp`;
	return existsSync(join(PUBLIC, rel)) ? rel : null;
}

export const caseCover = (slug: string) => workImage(`cover-${slug}`);

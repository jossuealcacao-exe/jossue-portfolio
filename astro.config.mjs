// @ts-check
import sitemap from '@astrojs/sitemap';
import { request as httpRequest } from 'node:http';
import { defineConfig } from 'astro/config';

// En `astro dev` no hay Worker: /api y /healthz se reenvían a `npm run dev:api` (wrangler dev con la
// base D1 local, nunca la de producción). Sin él, la agenda, el chat y el formulario dicen que no están
// disponibles. El Worker solo acepta orígenes de producción, así que la petición local va sin Origin.
/** @type {import('vite').Plugin} */
const devApi = {
	name: 'dev-api-proxy',
	apply: 'serve',
	enforce: 'post',
	configureServer(server) {
		const target = new URL(process.env.PORTFOLIO_API ?? 'http://127.0.0.1:8799');
		/** @type {(req: import('node:http').IncomingMessage, res: import('node:http').ServerResponse, next: () => void) => void} */
		const forward = (req, res, next) => {
			if (!/^\/(api\/|healthz)/.test(req.url ?? '')) return next();
			const headers = { ...req.headers };
			delete headers.origin;
			delete headers.host;
			const upstream = httpRequest({ hostname: target.hostname, port: target.port, path: req.url, method: req.method, headers }, (reply) => {
				res.writeHead(reply.statusCode ?? 502, reply.headers);
				reply.pipe(res);
			});
			upstream.on('error', () => {
				res.writeHead(502, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ ok: false, error: 'dev_api_offline', hint: 'Corre npm run dev:api en otra terminal.' }));
			});
			req.pipe(upstream);
		};
		// Se instala después de los filtros de Astro (barra final, rutas) y se pone delante de ellos.
		return () => server.middlewares.stack.unshift({ route: '', handle: forward });
	},
};

const fallbackSite = 'https://portfolio.invalid';
const configuredSite = process.env.PUBLIC_SITE_URL?.trim();

if (!configuredSite) {
	console.warn(`[site] PUBLIC_SITE_URL is not set; using traceable fallback ${fallbackSite}`);
}

export default defineConfig({
	site: configuredSite || fallbackSite,
	output: 'static',
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => new URL(page).pathname !== '/',
		}),
	],
	build: {
		format: 'directory',
	},
	vite: {
		plugins: [devApi],
	},
});

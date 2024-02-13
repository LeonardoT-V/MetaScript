import { renderers } from './renderers.mjs';
import { manifest } from './manifest_xrIPd_AJ.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_9FHh_0bG.mjs');
const _page1 = () => import('./chunks/index_XLge2RhN.mjs');
const _page2 = () => import('./chunks/_url__y669fEyR.mjs');
const _page3 = () => import('./chunks/url_kLvyJzU8.mjs');
const _page4 = () => import('./chunks/index_k7govp1H.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.3.3_typescript@5.3.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/search/index.ts", _page1],
    ["src/pages/api/search/[url].ts", _page2],
    ["src/pages/api/url.ts", _page3],
    ["src/pages/index.astro", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "05c96df0-65ed-4acf-8ae2-7f9f1585b42f"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

import { renderers } from './renderers.mjs';
import { manifest } from './manifest_Kmr8rhlI.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_9FHh_0bG.mjs');
const _page1 = () => import('./chunks/index__Vf24u4R.mjs');
const _page2 = () => import('./chunks/index_H1KDK263.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.3.3_typescript@5.3.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/search/index.ts", _page1],
    ["src/pages/index.astro", _page2]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "82ded7c9-0311-4d4f-861e-bb2ab9ec4c49"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

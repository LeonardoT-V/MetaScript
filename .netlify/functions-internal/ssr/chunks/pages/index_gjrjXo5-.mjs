/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, j as renderHead, k as renderSlot, l as renderComponent, m as maybeRenderHead, n as commonjsGlobal, g as getDefaultExportFromCjs, i as addAttribute, u as unescapeHTML, s as spreadAttributes } from '../astro_h2Q8mNzc.mjs';
import * as htmlparser2 from 'htmlparser2';

const excludeTypeHead = ["script", "style"];
const getInfoPages = async (url) => {
  try {
    const resFetch = await fetch(url);
    const rawHtml = await resFetch.text();
    const headHtml = extractHead(rawHtml);
    const metaData = headHtml.children.map((child) => {
      if (!excludeTypeHead.includes(child.type)) {
        if (child.name === "link" && child?.attribs?.rel?.includes("icon")) {
          return child;
        }
        if (child.name !== "link" || child.name !== "noscript") {
          return child;
        }
      }
    }).filter((child) => child?.type !== void 0);
    const metaJson = formatToJson(metaData, { url });
    return metaJson;
  } catch (error) {
    console.log(error);
    return;
  }
};
const extractHead = (html) => {
  const HEAD_TAG = {
    open: "<head>",
    close: "</head>"
  };
  const initHead = html.indexOf(HEAD_TAG.open);
  const latHead = html.indexOf(HEAD_TAG.close);
  const rawHead = html.slice(initHead, latHead + HEAD_TAG.close.length);
  const parsed = htmlparser2.parseDocument(rawHead);
  const head = parsed.firstChild;
  return head;
};
const formatToJson = (childrens, { url = "" }) => {
  const baseURL = new URL(url).origin.toString();
  let json = {};
  childrens.forEach((i) => {
    if (i?.name === "title") {
      const objValues = {
        type: i.type,
        tag: i.name,
        content: i.children[0].data
      };
      json["title"] = objValues;
      return;
    }
    if (i?.attribs?.property?.includes(":")) {
      const keyObject = i?.attribs?.property?.split(":")[0];
      const objValues = {
        type: i.type,
        tag: i.name,
        ...i.attribs
      };
      !json[keyObject] ? json[keyObject] = [objValues] : json[keyObject] = [objValues, ...json[keyObject]];
      return;
    }
    if (i?.attribs?.name?.includes(":")) {
      const keyObject = i?.attribs?.name?.split(":")[0];
      const objValues = {
        type: i.type,
        tag: i.name,
        ...i.attribs
      };
      !json[keyObject] ? json[keyObject] = [objValues] : json[keyObject] = [objValues, ...json[keyObject]];
      return;
    }
    if (i?.attribs?.rel?.includes("icon")) {
      const objValues = {
        type: i.type,
        tag: i.name,
        ...i.attribs,
        url: i?.attribs?.href?.includes("//") ? i?.attribs?.href : `${baseURL}${i?.attribs?.href}`
      };
      !json["icons"] ? json["icons"] = [objValues] : json["icons"] = [objValues, ...json["icons"]];
      return;
    }
    if (i?.attribs?.name) {
      json = {
        ...json,
        [i?.attribs?.name]: {
          type: i.type,
          tag: i.name,
          ...i.attribs
        }
      };
      return;
    }
  });
  const jsonSend = Object.keys(json).filter((key) => key !== "undefined" || typeof key !== void 0 || json[key].name !== void 0).reduce((cur, key) => {
    return Object.assign(cur, { [key.toLowerCase()]: json[key] });
  }, {});
  return jsonSend;
};

const $$Astro$c = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Scrape and preview specific snippets of text and image content that provide a summary for any webpage"><meta name="viewport" content="width=device-width,initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta property="og:type" content="website"><meta property="og:url" content="https://metatags.io/"><meta property="og:title" content="MetaScrape"><meta property="og:description" content="Scrape and preview specific snippets of text and image content that provide a summary for any webpage"><meta property="og:image" content="https://metatags.io/images/meta-tags.png"><link href="/prism.css" rel="stylesheet"><title>${title}</title>${renderHead()}</head> <body> <div class="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/leo/projects/MetaScript/src/layouts/Layout.astro", void 0);

const $$Astro$b = createAstro();
const $$MainPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$MainPage;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "MetaScrape" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="absolute left-0 right-0 top-10 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-300 opacity-20 blur-[100px]"></div> <main class="h-screen flex flex-col gap-8 items-center justify-center align-middle px-4"> <section class="md:max-w-2xl flex flex-col gap-8 items-center justify-center align-middle"> <a href="/" class="text-3xl gap-1 opacity-80 hover:scale-105 transition-transform">[ L | T ]</a> <h1 class="text-6xl md:text-7xl opacity-80 text-center font-medium tracking-widest text-balance">
Website <span class="text-cyan-400 underline"> Meta Tags</span> Extractor
</h1> <p class="text-base md:text-xl opacity-50 text-center">
Scrape and preview specific snippets of text and image content that
        provide a summary for any webpage
</p> <form class="flex flex-col gap-2.5 items-center"> <input name="url" type="url" placeholder="https://metascript.com" class="border py-1.5 px-4 w-full md:w-96 rounded text-black/80"> <button type="submit" class="w-48 bg-black/80 text-white font-bold shadow-md hover:scale-105 active:scale-95 transition-transform rounded py-1.5 px-4">Extract</button> </form> </section> <section class="bg-cyan-400/10 p-1 px-8 rounded border"> <h5 class="text-lg opacity-80 text-center">API Usage</h5> <p class="text-center text-black/60">
/api/search/?url=<span class="text-cyan-600 opacity-80">${"{URL}"}</span> </p> </section> </main> ` })} <p class="hidden md:block absolute bottom-4 right-4 opacity-80 text-sm">
Development by <a href="https://github.com/LeonardoT-V" target="_blank" class="text-cyan-500">Leonardo Toro</a> </p>`;
}, "/home/leo/projects/MetaScript/src/components/MainPage.astro", void 0);

var prism = {exports: {}};

(function (module) {
	/* **********************************************
	     Begin prism-core.js
	********************************************** */

	/// <reference lib="WebWorker"/>

	var _self = (typeof window !== 'undefined')
		? window   // if in browser
		: (
			(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
				? self // if in worker
				: {}   // if in node js
		);

	/**
	 * Prism: Lightweight, robust, elegant syntax highlighting
	 *
	 * @license MIT <https://opensource.org/licenses/MIT>
	 * @author Lea Verou <https://lea.verou.me>
	 * @namespace
	 * @public
	 */
	var Prism = (function (_self) {

		// Private helper vars
		var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
		var uniqueId = 0;

		// The grammar object for plaintext
		var plainTextGrammar = {};


		var _ = {
			/**
			 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
			 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
			 * additional languages or plugins yourself.
			 *
			 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
			 *
			 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
			 * empty Prism object into the global scope before loading the Prism script like this:
			 *
			 * ```js
			 * window.Prism = window.Prism || {};
			 * Prism.manual = true;
			 * // add a new <script> to load Prism's script
			 * ```
			 *
			 * @default false
			 * @type {boolean}
			 * @memberof Prism
			 * @public
			 */
			manual: _self.Prism && _self.Prism.manual,
			/**
			 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
			 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
			 * own worker, you don't want it to do this.
			 *
			 * By setting this value to `true`, Prism will not add its own listeners to the worker.
			 *
			 * You obviously have to change this value before Prism executes. To do this, you can add an
			 * empty Prism object into the global scope before loading the Prism script like this:
			 *
			 * ```js
			 * window.Prism = window.Prism || {};
			 * Prism.disableWorkerMessageHandler = true;
			 * // Load Prism's script
			 * ```
			 *
			 * @default false
			 * @type {boolean}
			 * @memberof Prism
			 * @public
			 */
			disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

			/**
			 * A namespace for utility methods.
			 *
			 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
			 * change or disappear at any time.
			 *
			 * @namespace
			 * @memberof Prism
			 */
			util: {
				encode: function encode(tokens) {
					if (tokens instanceof Token) {
						return new Token(tokens.type, encode(tokens.content), tokens.alias);
					} else if (Array.isArray(tokens)) {
						return tokens.map(encode);
					} else {
						return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
					}
				},

				/**
				 * Returns the name of the type of the given value.
				 *
				 * @param {any} o
				 * @returns {string}
				 * @example
				 * type(null)      === 'Null'
				 * type(undefined) === 'Undefined'
				 * type(123)       === 'Number'
				 * type('foo')     === 'String'
				 * type(true)      === 'Boolean'
				 * type([1, 2])    === 'Array'
				 * type({})        === 'Object'
				 * type(String)    === 'Function'
				 * type(/abc+/)    === 'RegExp'
				 */
				type: function (o) {
					return Object.prototype.toString.call(o).slice(8, -1);
				},

				/**
				 * Returns a unique number for the given object. Later calls will still return the same number.
				 *
				 * @param {Object} obj
				 * @returns {number}
				 */
				objId: function (obj) {
					if (!obj['__id']) {
						Object.defineProperty(obj, '__id', { value: ++uniqueId });
					}
					return obj['__id'];
				},

				/**
				 * Creates a deep clone of the given object.
				 *
				 * The main intended use of this function is to clone language definitions.
				 *
				 * @param {T} o
				 * @param {Record<number, any>} [visited]
				 * @returns {T}
				 * @template T
				 */
				clone: function deepClone(o, visited) {
					visited = visited || {};

					var clone; var id;
					switch (_.util.type(o)) {
						case 'Object':
							id = _.util.objId(o);
							if (visited[id]) {
								return visited[id];
							}
							clone = /** @type {Record<string, any>} */ ({});
							visited[id] = clone;

							for (var key in o) {
								if (o.hasOwnProperty(key)) {
									clone[key] = deepClone(o[key], visited);
								}
							}

							return /** @type {any} */ (clone);

						case 'Array':
							id = _.util.objId(o);
							if (visited[id]) {
								return visited[id];
							}
							clone = [];
							visited[id] = clone;

							(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
								clone[i] = deepClone(v, visited);
							});

							return /** @type {any} */ (clone);

						default:
							return o;
					}
				},

				/**
				 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
				 *
				 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
				 *
				 * @param {Element} element
				 * @returns {string}
				 */
				getLanguage: function (element) {
					while (element) {
						var m = lang.exec(element.className);
						if (m) {
							return m[1].toLowerCase();
						}
						element = element.parentElement;
					}
					return 'none';
				},

				/**
				 * Sets the Prism `language-xxxx` class of the given element.
				 *
				 * @param {Element} element
				 * @param {string} language
				 * @returns {void}
				 */
				setLanguage: function (element, language) {
					// remove all `language-xxxx` classes
					// (this might leave behind a leading space)
					element.className = element.className.replace(RegExp(lang, 'gi'), '');

					// add the new `language-xxxx` class
					// (using `classList` will automatically clean up spaces for us)
					element.classList.add('language-' + language);
				},

				/**
				 * Returns the script element that is currently executing.
				 *
				 * This does __not__ work for line script element.
				 *
				 * @returns {HTMLScriptElement | null}
				 */
				currentScript: function () {
					if (typeof document === 'undefined') {
						return null;
					}
					if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
						return /** @type {any} */ (document.currentScript);
					}

					// IE11 workaround
					// we'll get the src of the current script by parsing IE11's error stack trace
					// this will not work for inline scripts

					try {
						throw new Error();
					} catch (err) {
						// Get file src url from stack. Specifically works with the format of stack traces in IE.
						// A stack will look like this:
						//
						// Error
						//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
						//    at Global code (http://localhost/components/prism-core.js:606:1)

						var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
						if (src) {
							var scripts = document.getElementsByTagName('script');
							for (var i in scripts) {
								if (scripts[i].src == src) {
									return scripts[i];
								}
							}
						}
						return null;
					}
				},

				/**
				 * Returns whether a given class is active for `element`.
				 *
				 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
				 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
				 * given class is just the given class with a `no-` prefix.
				 *
				 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
				 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
				 * ancestors have the given class or the negated version of it, then the default activation will be returned.
				 *
				 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
				 * version of it, the class is considered active.
				 *
				 * @param {Element} element
				 * @param {string} className
				 * @param {boolean} [defaultActivation=false]
				 * @returns {boolean}
				 */
				isActive: function (element, className, defaultActivation) {
					var no = 'no-' + className;

					while (element) {
						var classList = element.classList;
						if (classList.contains(className)) {
							return true;
						}
						if (classList.contains(no)) {
							return false;
						}
						element = element.parentElement;
					}
					return !!defaultActivation;
				}
			},

			/**
			 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
			 *
			 * @namespace
			 * @memberof Prism
			 * @public
			 */
			languages: {
				/**
				 * The grammar for plain, unformatted text.
				 */
				plain: plainTextGrammar,
				plaintext: plainTextGrammar,
				text: plainTextGrammar,
				txt: plainTextGrammar,

				/**
				 * Creates a deep copy of the language with the given id and appends the given tokens.
				 *
				 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
				 * will be overwritten at its original position.
				 *
				 * ## Best practices
				 *
				 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
				 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
				 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
				 *
				 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
				 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
				 *
				 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
				 * @param {Grammar} redef The new tokens to append.
				 * @returns {Grammar} The new language created.
				 * @public
				 * @example
				 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
				 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
				 *     // at its original position
				 *     'comment': { ... },
				 *     // CSS doesn't have a 'color' token, so this token will be appended
				 *     'color': /\b(?:red|green|blue)\b/
				 * });
				 */
				extend: function (id, redef) {
					var lang = _.util.clone(_.languages[id]);

					for (var key in redef) {
						lang[key] = redef[key];
					}

					return lang;
				},

				/**
				 * Inserts tokens _before_ another token in a language definition or any other grammar.
				 *
				 * ## Usage
				 *
				 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
				 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
				 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
				 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
				 * this:
				 *
				 * ```js
				 * Prism.languages.markup.style = {
				 *     // token
				 * };
				 * ```
				 *
				 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
				 * before existing tokens. For the CSS example above, you would use it like this:
				 *
				 * ```js
				 * Prism.languages.insertBefore('markup', 'cdata', {
				 *     'style': {
				 *         // token
				 *     }
				 * });
				 * ```
				 *
				 * ## Special cases
				 *
				 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
				 * will be ignored.
				 *
				 * This behavior can be used to insert tokens after `before`:
				 *
				 * ```js
				 * Prism.languages.insertBefore('markup', 'comment', {
				 *     'comment': Prism.languages.markup.comment,
				 *     // tokens after 'comment'
				 * });
				 * ```
				 *
				 * ## Limitations
				 *
				 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
				 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
				 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
				 * deleting properties which is necessary to insert at arbitrary positions.
				 *
				 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
				 * Instead, it will create a new object and replace all references to the target object with the new one. This
				 * can be done without temporarily deleting properties, so the iteration order is well-defined.
				 *
				 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
				 * you hold the target object in a variable, then the value of the variable will not change.
				 *
				 * ```js
				 * var oldMarkup = Prism.languages.markup;
				 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
				 *
				 * assert(oldMarkup !== Prism.languages.markup);
				 * assert(newMarkup === Prism.languages.markup);
				 * ```
				 *
				 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
				 * object to be modified.
				 * @param {string} before The key to insert before.
				 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
				 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
				 * object to be modified.
				 *
				 * Defaults to `Prism.languages`.
				 * @returns {Grammar} The new grammar object.
				 * @public
				 */
				insertBefore: function (inside, before, insert, root) {
					root = root || /** @type {any} */ (_.languages);
					var grammar = root[inside];
					/** @type {Grammar} */
					var ret = {};

					for (var token in grammar) {
						if (grammar.hasOwnProperty(token)) {

							if (token == before) {
								for (var newToken in insert) {
									if (insert.hasOwnProperty(newToken)) {
										ret[newToken] = insert[newToken];
									}
								}
							}

							// Do not insert token which also occur in insert. See #1525
							if (!insert.hasOwnProperty(token)) {
								ret[token] = grammar[token];
							}
						}
					}

					var old = root[inside];
					root[inside] = ret;

					// Update references in other language definitions
					_.languages.DFS(_.languages, function (key, value) {
						if (value === old && key != inside) {
							this[key] = ret;
						}
					});

					return ret;
				},

				// Traverse a language definition with Depth First Search
				DFS: function DFS(o, callback, type, visited) {
					visited = visited || {};

					var objId = _.util.objId;

					for (var i in o) {
						if (o.hasOwnProperty(i)) {
							callback.call(o, i, o[i], type || i);

							var property = o[i];
							var propertyType = _.util.type(property);

							if (propertyType === 'Object' && !visited[objId(property)]) {
								visited[objId(property)] = true;
								DFS(property, callback, null, visited);
							} else if (propertyType === 'Array' && !visited[objId(property)]) {
								visited[objId(property)] = true;
								DFS(property, callback, i, visited);
							}
						}
					}
				}
			},

			plugins: {},

			/**
			 * This is the most high-level function in Prism’s API.
			 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
			 * each one of them.
			 *
			 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
			 *
			 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
			 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
			 * @memberof Prism
			 * @public
			 */
			highlightAll: function (async, callback) {
				_.highlightAllUnder(document, async, callback);
			},

			/**
			 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
			 * {@link Prism.highlightElement} on each one of them.
			 *
			 * The following hooks will be run:
			 * 1. `before-highlightall`
			 * 2. `before-all-elements-highlight`
			 * 3. All hooks of {@link Prism.highlightElement} for each element.
			 *
			 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
			 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
			 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
			 * @memberof Prism
			 * @public
			 */
			highlightAllUnder: function (container, async, callback) {
				var env = {
					callback: callback,
					container: container,
					selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
				};

				_.hooks.run('before-highlightall', env);

				env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

				_.hooks.run('before-all-elements-highlight', env);

				for (var i = 0, element; (element = env.elements[i++]);) {
					_.highlightElement(element, async === true, env.callback);
				}
			},

			/**
			 * Highlights the code inside a single element.
			 *
			 * The following hooks will be run:
			 * 1. `before-sanity-check`
			 * 2. `before-highlight`
			 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
			 * 4. `before-insert`
			 * 5. `after-highlight`
			 * 6. `complete`
			 *
			 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
			 * the element's language.
			 *
			 * @param {Element} element The element containing the code.
			 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
			 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
			 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
			 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
			 *
			 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
			 * asynchronous highlighting to work. You can build your own bundle on the
			 * [Download page](https://prismjs.com/download.html).
			 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
			 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
			 * @memberof Prism
			 * @public
			 */
			highlightElement: function (element, async, callback) {
				// Find language
				var language = _.util.getLanguage(element);
				var grammar = _.languages[language];

				// Set language on the element, if not present
				_.util.setLanguage(element, language);

				// Set language on the parent, for styling
				var parent = element.parentElement;
				if (parent && parent.nodeName.toLowerCase() === 'pre') {
					_.util.setLanguage(parent, language);
				}

				var code = element.textContent;

				var env = {
					element: element,
					language: language,
					grammar: grammar,
					code: code
				};

				function insertHighlightedCode(highlightedCode) {
					env.highlightedCode = highlightedCode;

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
					callback && callback.call(env.element);
				}

				_.hooks.run('before-sanity-check', env);

				// plugins may change/add the parent/element
				parent = env.element.parentElement;
				if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
					parent.setAttribute('tabindex', '0');
				}

				if (!env.code) {
					_.hooks.run('complete', env);
					callback && callback.call(env.element);
					return;
				}

				_.hooks.run('before-highlight', env);

				if (!env.grammar) {
					insertHighlightedCode(_.util.encode(env.code));
					return;
				}

				if (async && _self.Worker) {
					var worker = new Worker(_.filename);

					worker.onmessage = function (evt) {
						insertHighlightedCode(evt.data);
					};

					worker.postMessage(JSON.stringify({
						language: env.language,
						code: env.code,
						immediateClose: true
					}));
				} else {
					insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
				}
			},

			/**
			 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
			 * and the language definitions to use, and returns a string with the HTML produced.
			 *
			 * The following hooks will be run:
			 * 1. `before-tokenize`
			 * 2. `after-tokenize`
			 * 3. `wrap`: On each {@link Token}.
			 *
			 * @param {string} text A string with the code to be highlighted.
			 * @param {Grammar} grammar An object containing the tokens to use.
			 *
			 * Usually a language definition like `Prism.languages.markup`.
			 * @param {string} language The name of the language definition passed to `grammar`.
			 * @returns {string} The highlighted HTML.
			 * @memberof Prism
			 * @public
			 * @example
			 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
			 */
			highlight: function (text, grammar, language) {
				var env = {
					code: text,
					grammar: grammar,
					language: language
				};
				_.hooks.run('before-tokenize', env);
				if (!env.grammar) {
					throw new Error('The language "' + env.language + '" has no grammar.');
				}
				env.tokens = _.tokenize(env.code, env.grammar);
				_.hooks.run('after-tokenize', env);
				return Token.stringify(_.util.encode(env.tokens), env.language);
			},

			/**
			 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
			 * and the language definitions to use, and returns an array with the tokenized code.
			 *
			 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
			 *
			 * This method could be useful in other contexts as well, as a very crude parser.
			 *
			 * @param {string} text A string with the code to be highlighted.
			 * @param {Grammar} grammar An object containing the tokens to use.
			 *
			 * Usually a language definition like `Prism.languages.markup`.
			 * @returns {TokenStream} An array of strings and tokens, a token stream.
			 * @memberof Prism
			 * @public
			 * @example
			 * let code = `var foo = 0;`;
			 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
			 * tokens.forEach(token => {
			 *     if (token instanceof Prism.Token && token.type === 'number') {
			 *         console.log(`Found numeric literal: ${token.content}`);
			 *     }
			 * });
			 */
			tokenize: function (text, grammar) {
				var rest = grammar.rest;
				if (rest) {
					for (var token in rest) {
						grammar[token] = rest[token];
					}

					delete grammar.rest;
				}

				var tokenList = new LinkedList();
				addAfter(tokenList, tokenList.head, text);

				matchGrammar(text, tokenList, grammar, tokenList.head, 0);

				return toArray(tokenList);
			},

			/**
			 * @namespace
			 * @memberof Prism
			 * @public
			 */
			hooks: {
				all: {},

				/**
				 * Adds the given callback to the list of callbacks for the given hook.
				 *
				 * The callback will be invoked when the hook it is registered for is run.
				 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
				 *
				 * One callback function can be registered to multiple hooks and the same hook multiple times.
				 *
				 * @param {string} name The name of the hook.
				 * @param {HookCallback} callback The callback function which is given environment variables.
				 * @public
				 */
				add: function (name, callback) {
					var hooks = _.hooks.all;

					hooks[name] = hooks[name] || [];

					hooks[name].push(callback);
				},

				/**
				 * Runs a hook invoking all registered callbacks with the given environment variables.
				 *
				 * Callbacks will be invoked synchronously and in the order in which they were registered.
				 *
				 * @param {string} name The name of the hook.
				 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
				 * @public
				 */
				run: function (name, env) {
					var callbacks = _.hooks.all[name];

					if (!callbacks || !callbacks.length) {
						return;
					}

					for (var i = 0, callback; (callback = callbacks[i++]);) {
						callback(env);
					}
				}
			},

			Token: Token
		};
		_self.Prism = _;


		// Typescript note:
		// The following can be used to import the Token type in JSDoc:
		//
		//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

		/**
		 * Creates a new token.
		 *
		 * @param {string} type See {@link Token#type type}
		 * @param {string | TokenStream} content See {@link Token#content content}
		 * @param {string|string[]} [alias] The alias(es) of the token.
		 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
		 * @class
		 * @global
		 * @public
		 */
		function Token(type, content, alias, matchedStr) {
			/**
			 * The type of the token.
			 *
			 * This is usually the key of a pattern in a {@link Grammar}.
			 *
			 * @type {string}
			 * @see GrammarToken
			 * @public
			 */
			this.type = type;
			/**
			 * The strings or tokens contained by this token.
			 *
			 * This will be a token stream if the pattern matched also defined an `inside` grammar.
			 *
			 * @type {string | TokenStream}
			 * @public
			 */
			this.content = content;
			/**
			 * The alias(es) of the token.
			 *
			 * @type {string|string[]}
			 * @see GrammarToken
			 * @public
			 */
			this.alias = alias;
			// Copy of the full string this token was created from
			this.length = (matchedStr || '').length | 0;
		}

		/**
		 * A token stream is an array of strings and {@link Token Token} objects.
		 *
		 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
		 * them.
		 *
		 * 1. No adjacent strings.
		 * 2. No empty strings.
		 *
		 *    The only exception here is the token stream that only contains the empty string and nothing else.
		 *
		 * @typedef {Array<string | Token>} TokenStream
		 * @global
		 * @public
		 */

		/**
		 * Converts the given token or token stream to an HTML representation.
		 *
		 * The following hooks will be run:
		 * 1. `wrap`: On each {@link Token}.
		 *
		 * @param {string | Token | TokenStream} o The token or token stream to be converted.
		 * @param {string} language The name of current language.
		 * @returns {string} The HTML representation of the token or token stream.
		 * @memberof Token
		 * @static
		 */
		Token.stringify = function stringify(o, language) {
			if (typeof o == 'string') {
				return o;
			}
			if (Array.isArray(o)) {
				var s = '';
				o.forEach(function (e) {
					s += stringify(e, language);
				});
				return s;
			}

			var env = {
				type: o.type,
				content: stringify(o.content, language),
				tag: 'span',
				classes: ['token', o.type],
				attributes: {},
				language: language
			};

			var aliases = o.alias;
			if (aliases) {
				if (Array.isArray(aliases)) {
					Array.prototype.push.apply(env.classes, aliases);
				} else {
					env.classes.push(aliases);
				}
			}

			_.hooks.run('wrap', env);

			var attributes = '';
			for (var name in env.attributes) {
				attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
			}

			return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
		};

		/**
		 * @param {RegExp} pattern
		 * @param {number} pos
		 * @param {string} text
		 * @param {boolean} lookbehind
		 * @returns {RegExpExecArray | null}
		 */
		function matchPattern(pattern, pos, text, lookbehind) {
			pattern.lastIndex = pos;
			var match = pattern.exec(text);
			if (match && lookbehind && match[1]) {
				// change the match to remove the text matched by the Prism lookbehind group
				var lookbehindLength = match[1].length;
				match.index += lookbehindLength;
				match[0] = match[0].slice(lookbehindLength);
			}
			return match;
		}

		/**
		 * @param {string} text
		 * @param {LinkedList<string | Token>} tokenList
		 * @param {any} grammar
		 * @param {LinkedListNode<string | Token>} startNode
		 * @param {number} startPos
		 * @param {RematchOptions} [rematch]
		 * @returns {void}
		 * @private
		 *
		 * @typedef RematchOptions
		 * @property {string} cause
		 * @property {number} reach
		 */
		function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
			for (var token in grammar) {
				if (!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}

				var patterns = grammar[token];
				patterns = Array.isArray(patterns) ? patterns : [patterns];

				for (var j = 0; j < patterns.length; ++j) {
					if (rematch && rematch.cause == token + ',' + j) {
						return;
					}

					var patternObj = patterns[j];
					var inside = patternObj.inside;
					var lookbehind = !!patternObj.lookbehind;
					var greedy = !!patternObj.greedy;
					var alias = patternObj.alias;

					if (greedy && !patternObj.pattern.global) {
						// Without the global flag, lastIndex won't work
						var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
						patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
					}

					/** @type {RegExp} */
					var pattern = patternObj.pattern || patternObj;

					for ( // iterate the token list and keep track of the current token/string position
						var currentNode = startNode.next, pos = startPos;
						currentNode !== tokenList.tail;
						pos += currentNode.value.length, currentNode = currentNode.next
					) {

						if (rematch && pos >= rematch.reach) {
							break;
						}

						var str = currentNode.value;

						if (tokenList.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							return;
						}

						if (str instanceof Token) {
							continue;
						}

						var removeCount = 1; // this is the to parameter of removeBetween
						var match;

						if (greedy) {
							match = matchPattern(pattern, pos, text, lookbehind);
							if (!match || match.index >= text.length) {
								break;
							}

							var from = match.index;
							var to = match.index + match[0].length;
							var p = pos;

							// find the node that contains the match
							p += currentNode.value.length;
							while (from >= p) {
								currentNode = currentNode.next;
								p += currentNode.value.length;
							}
							// adjust pos (and p)
							p -= currentNode.value.length;
							pos = p;

							// the current node is a Token, then the match starts inside another Token, which is invalid
							if (currentNode.value instanceof Token) {
								continue;
							}

							// find the last node which is affected by this match
							for (
								var k = currentNode;
								k !== tokenList.tail && (p < to || typeof k.value === 'string');
								k = k.next
							) {
								removeCount++;
								p += k.value.length;
							}
							removeCount--;

							// replace with the new match
							str = text.slice(pos, p);
							match.index -= pos;
						} else {
							match = matchPattern(pattern, 0, str, lookbehind);
							if (!match) {
								continue;
							}
						}

						// eslint-disable-next-line no-redeclare
						var from = match.index;
						var matchStr = match[0];
						var before = str.slice(0, from);
						var after = str.slice(from + matchStr.length);

						var reach = pos + str.length;
						if (rematch && reach > rematch.reach) {
							rematch.reach = reach;
						}

						var removeFrom = currentNode.prev;

						if (before) {
							removeFrom = addAfter(tokenList, removeFrom, before);
							pos += before.length;
						}

						removeRange(tokenList, removeFrom, removeCount);

						var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
						currentNode = addAfter(tokenList, removeFrom, wrapped);

						if (after) {
							addAfter(tokenList, currentNode, after);
						}

						if (removeCount > 1) {
							// at least one Token object was removed, so we have to do some rematching
							// this can only happen if the current pattern is greedy

							/** @type {RematchOptions} */
							var nestedRematch = {
								cause: token + ',' + j,
								reach: reach
							};
							matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

							// the reach might have been extended because of the rematching
							if (rematch && nestedRematch.reach > rematch.reach) {
								rematch.reach = nestedRematch.reach;
							}
						}
					}
				}
			}
		}

		/**
		 * @typedef LinkedListNode
		 * @property {T} value
		 * @property {LinkedListNode<T> | null} prev The previous node.
		 * @property {LinkedListNode<T> | null} next The next node.
		 * @template T
		 * @private
		 */

		/**
		 * @template T
		 * @private
		 */
		function LinkedList() {
			/** @type {LinkedListNode<T>} */
			var head = { value: null, prev: null, next: null };
			/** @type {LinkedListNode<T>} */
			var tail = { value: null, prev: head, next: null };
			head.next = tail;

			/** @type {LinkedListNode<T>} */
			this.head = head;
			/** @type {LinkedListNode<T>} */
			this.tail = tail;
			this.length = 0;
		}

		/**
		 * Adds a new node with the given value to the list.
		 *
		 * @param {LinkedList<T>} list
		 * @param {LinkedListNode<T>} node
		 * @param {T} value
		 * @returns {LinkedListNode<T>} The added node.
		 * @template T
		 */
		function addAfter(list, node, value) {
			// assumes that node != list.tail && values.length >= 0
			var next = node.next;

			var newNode = { value: value, prev: node, next: next };
			node.next = newNode;
			next.prev = newNode;
			list.length++;

			return newNode;
		}
		/**
		 * Removes `count` nodes after the given node. The given node will not be removed.
		 *
		 * @param {LinkedList<T>} list
		 * @param {LinkedListNode<T>} node
		 * @param {number} count
		 * @template T
		 */
		function removeRange(list, node, count) {
			var next = node.next;
			for (var i = 0; i < count && next !== list.tail; i++) {
				next = next.next;
			}
			node.next = next;
			next.prev = node;
			list.length -= i;
		}
		/**
		 * @param {LinkedList<T>} list
		 * @returns {T[]}
		 * @template T
		 */
		function toArray(list) {
			var array = [];
			var node = list.head.next;
			while (node !== list.tail) {
				array.push(node.value);
				node = node.next;
			}
			return array;
		}


		if (!_self.document) {
			if (!_self.addEventListener) {
				// in Node.js
				return _;
			}

			if (!_.disableWorkerMessageHandler) {
				// In worker
				_self.addEventListener('message', function (evt) {
					var message = JSON.parse(evt.data);
					var lang = message.language;
					var code = message.code;
					var immediateClose = message.immediateClose;

					_self.postMessage(_.highlight(code, _.languages[lang], lang));
					if (immediateClose) {
						_self.close();
					}
				}, false);
			}

			return _;
		}

		// Get current script and highlight
		var script = _.util.currentScript();

		if (script) {
			_.filename = script.src;

			if (script.hasAttribute('data-manual')) {
				_.manual = true;
			}
		}

		function highlightAutomaticallyCallback() {
			if (!_.manual) {
				_.highlightAll();
			}
		}

		if (!_.manual) {
			// If the document state is "loading", then we'll use DOMContentLoaded.
			// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
			// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
			// might take longer one animation frame to execute which can create a race condition where only some plugins have
			// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
			// See https://github.com/PrismJS/prism/issues/2102
			var readyState = document.readyState;
			if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
				document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
			} else {
				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(highlightAutomaticallyCallback);
				} else {
					window.setTimeout(highlightAutomaticallyCallback, 16);
				}
			}
		}

		return _;

	}(_self));

	if (module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof commonjsGlobal !== 'undefined') {
		commonjsGlobal.Prism = Prism;
	}

	// some additional documentation/types

	/**
	 * The expansion of a simple `RegExp` literal to support additional properties.
	 *
	 * @typedef GrammarToken
	 * @property {RegExp} pattern The regular expression of the token.
	 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
	 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
	 * @property {boolean} [greedy=false] Whether the token is greedy.
	 * @property {string|string[]} [alias] An optional alias or list of aliases.
	 * @property {Grammar} [inside] The nested grammar of this token.
	 *
	 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
	 *
	 * This can be used to make nested and even recursive language definitions.
	 *
	 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
	 * each another.
	 * @global
	 * @public
	 */

	/**
	 * @typedef Grammar
	 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
	 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
	 * @global
	 * @public
	 */

	/**
	 * A function which will invoked after an element was successfully highlighted.
	 *
	 * @callback HighlightCallback
	 * @param {Element} element The element successfully highlighted.
	 * @returns {void}
	 * @global
	 * @public
	 */

	/**
	 * @callback HookCallback
	 * @param {Object<string, any>} env The environment variables of the hook.
	 * @returns {void}
	 * @global
	 * @public
	 */


	/* **********************************************
	     Begin prism-markup.js
	********************************************** */

	Prism.languages.markup = {
		'comment': {
			pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
			greedy: true
		},
		'prolog': {
			pattern: /<\?[\s\S]+?\?>/,
			greedy: true
		},
		'doctype': {
			// https://www.w3.org/TR/xml/#NT-doctypedecl
			pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
			greedy: true,
			inside: {
				'internal-subset': {
					pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
					lookbehind: true,
					greedy: true,
					inside: null // see below
				},
				'string': {
					pattern: /"[^"]*"|'[^']*'/,
					greedy: true
				},
				'punctuation': /^<!|>$|[[\]]/,
				'doctype-tag': /^DOCTYPE/i,
				'name': /[^\s<>'"]+/
			}
		},
		'cdata': {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			greedy: true
		},
		'tag': {
			pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
			greedy: true,
			inside: {
				'tag': {
					pattern: /^<\/?[^\s>\/]+/,
					inside: {
						'punctuation': /^<\/?/,
						'namespace': /^[^\s>\/:]+:/
					}
				},
				'special-attr': [],
				'attr-value': {
					pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
					inside: {
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							{
								pattern: /^(\s*)["']|["']$/,
								lookbehind: true
							}
						]
					}
				},
				'punctuation': /\/?>/,
				'attr-name': {
					pattern: /[^\s>\/]+/,
					inside: {
						'namespace': /^[^\s>\/:]+:/
					}
				}

			}
		},
		'entity': [
			{
				pattern: /&[\da-z]{1,8};/i,
				alias: 'named-entity'
			},
			/&#x?[\da-f]{1,8};/i
		]
	};

	Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
		Prism.languages.markup['entity'];
	Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

	// Plugin to make entity title show the real entity, idea by Roman Komarov
	Prism.hooks.add('wrap', function (env) {

		if (env.type === 'entity') {
			env.attributes['title'] = env.content.replace(/&amp;/, '&');
		}
	});

	Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
		/**
		 * Adds an inlined language to markup.
		 *
		 * An example of an inlined language is CSS with `<style>` tags.
		 *
		 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
		 * case insensitive.
		 * @param {string} lang The language key.
		 * @example
		 * addInlined('style', 'css');
		 */
		value: function addInlined(tagName, lang) {
			var includedCdataInside = {};
			includedCdataInside['language-' + lang] = {
				pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
				lookbehind: true,
				inside: Prism.languages[lang]
			};
			includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

			var inside = {
				'included-cdata': {
					pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
					inside: includedCdataInside
				}
			};
			inside['language-' + lang] = {
				pattern: /[\s\S]+/,
				inside: Prism.languages[lang]
			};

			var def = {};
			def[tagName] = {
				pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
				lookbehind: true,
				greedy: true,
				inside: inside
			};

			Prism.languages.insertBefore('markup', 'cdata', def);
		}
	});
	Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
		/**
		 * Adds an pattern to highlight languages embedded in HTML attributes.
		 *
		 * An example of an inlined language is CSS with `style` attributes.
		 *
		 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
		 * case insensitive.
		 * @param {string} lang The language key.
		 * @example
		 * addAttribute('style', 'css');
		 */
		value: function (attrName, lang) {
			Prism.languages.markup.tag.inside['special-attr'].push({
				pattern: RegExp(
					/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
					'i'
				),
				lookbehind: true,
				inside: {
					'attr-name': /^[^\s=]+/,
					'attr-value': {
						pattern: /=[\s\S]+/,
						inside: {
							'value': {
								pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
								lookbehind: true,
								alias: [lang, 'language-' + lang],
								inside: Prism.languages[lang]
							},
							'punctuation': [
								{
									pattern: /^=/,
									alias: 'attr-equals'
								},
								/"|'/
							]
						}
					}
				}
			});
		}
	});

	Prism.languages.html = Prism.languages.markup;
	Prism.languages.mathml = Prism.languages.markup;
	Prism.languages.svg = Prism.languages.markup;

	Prism.languages.xml = Prism.languages.extend('markup', {});
	Prism.languages.ssml = Prism.languages.xml;
	Prism.languages.atom = Prism.languages.xml;
	Prism.languages.rss = Prism.languages.xml;


	/* **********************************************
	     Begin prism-css.js
	********************************************** */

	(function (Prism) {

		var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

		Prism.languages.css = {
			'comment': /\/\*[\s\S]*?\*\//,
			'atrule': {
				pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
				inside: {
					'rule': /^@[\w-]+/,
					'selector-function-argument': {
						pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
						lookbehind: true,
						alias: 'selector'
					},
					'keyword': {
						pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
						lookbehind: true
					}
					// See rest below
				}
			},
			'url': {
				// https://drafts.csswg.org/css-values-3/#urls
				pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
				greedy: true,
				inside: {
					'function': /^url/i,
					'punctuation': /^\(|\)$/,
					'string': {
						pattern: RegExp('^' + string.source + '$'),
						alias: 'url'
					}
				}
			},
			'selector': {
				pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
				lookbehind: true
			},
			'string': {
				pattern: string,
				greedy: true
			},
			'property': {
				pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
				lookbehind: true
			},
			'important': /!important\b/i,
			'function': {
				pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
				lookbehind: true
			},
			'punctuation': /[(){};:,]/
		};

		Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

		var markup = Prism.languages.markup;
		if (markup) {
			markup.tag.addInlined('style', 'css');
			markup.tag.addAttribute('style', 'css');
		}

	}(Prism));


	/* **********************************************
	     Begin prism-clike.js
	********************************************** */

	Prism.languages.clike = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
				lookbehind: true,
				greedy: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true,
				greedy: true
			}
		],
		'string': {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'class-name': {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
			lookbehind: true,
			inside: {
				'punctuation': /[.\\]/
			}
		},
		'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
		'boolean': /\b(?:false|true)\b/,
		'function': /\b\w+(?=\()/,
		'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
		'punctuation': /[{}[\];(),.:]/
	};


	/* **********************************************
	     Begin prism-javascript.js
	********************************************** */

	Prism.languages.javascript = Prism.languages.extend('clike', {
		'class-name': [
			Prism.languages.clike['class-name'],
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
				lookbehind: true
			}
		],
		'keyword': [
			{
				pattern: /((?:^|\})\s*)catch\b/,
				lookbehind: true
			},
			{
				pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
				lookbehind: true
			},
		],
		// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
		'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
		'number': {
			pattern: RegExp(
				/(^|[^\w$])/.source +
				'(?:' +
				(
					// constant
					/NaN|Infinity/.source +
					'|' +
					// binary integer
					/0[bB][01]+(?:_[01]+)*n?/.source +
					'|' +
					// octal integer
					/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
					'|' +
					// hexadecimal integer
					/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
					'|' +
					// decimal bigint
					/\d+(?:_\d+)*n/.source +
					'|' +
					// decimal number (integer or float) but no bigint
					/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
				) +
				')' +
				/(?![\w$])/.source
			),
			lookbehind: true
		},
		'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
	});

	Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

	Prism.languages.insertBefore('javascript', 'keyword', {
		'regex': {
			pattern: RegExp(
				// lookbehind
				// eslint-disable-next-line regexp/no-dupe-characters-character-class
				/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
				// Regex pattern:
				// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
				// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
				// with the only syntax, so we have to define 2 different regex patterns.
				/\//.source +
				'(?:' +
				/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
				'|' +
				// `v` flag syntax. This supports 3 levels of nested character classes.
				/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
				')' +
				// lookahead
				/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
			),
			lookbehind: true,
			greedy: true,
			inside: {
				'regex-source': {
					pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
					lookbehind: true,
					alias: 'language-regex',
					inside: Prism.languages.regex
				},
				'regex-delimiter': /^\/|\/$/,
				'regex-flags': /^[a-z]+$/,
			}
		},
		// This must be declared before keyword because we use "function" inside the look-forward
		'function-variable': {
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
			alias: 'function'
		},
		'parameter': [
			{
				pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
				lookbehind: true,
				inside: Prism.languages.javascript
			}
		],
		'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
	});

	Prism.languages.insertBefore('javascript', 'string', {
		'hashbang': {
			pattern: /^#!.*/,
			greedy: true,
			alias: 'comment'
		},
		'template-string': {
			pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
			greedy: true,
			inside: {
				'template-punctuation': {
					pattern: /^`|`$/,
					alias: 'string'
				},
				'interpolation': {
					pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
					lookbehind: true,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation'
						},
						rest: Prism.languages.javascript
					}
				},
				'string': /[\s\S]+/
			}
		},
		'string-property': {
			pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
			lookbehind: true,
			greedy: true,
			alias: 'property'
		}
	});

	Prism.languages.insertBefore('javascript', 'operator', {
		'literal-property': {
			pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
			lookbehind: true,
			alias: 'property'
		},
	});

	if (Prism.languages.markup) {
		Prism.languages.markup.tag.addInlined('script', 'javascript');

		// add attribute support for all DOM events.
		// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
		Prism.languages.markup.tag.addAttribute(
			/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
			'javascript'
		);
	}

	Prism.languages.js = Prism.languages.javascript;


	/* **********************************************
	     Begin prism-file-highlight.js
	********************************************** */

	(function () {

		if (typeof Prism === 'undefined' || typeof document === 'undefined') {
			return;
		}

		// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
		}

		var LOADING_MESSAGE = 'Loading…';
		var FAILURE_MESSAGE = function (status, message) {
			return '✖ Error ' + status + ' while fetching file: ' + message;
		};
		var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

		var EXTENSIONS = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		var STATUS_ATTR = 'data-src-status';
		var STATUS_LOADING = 'loading';
		var STATUS_LOADED = 'loaded';
		var STATUS_FAILED = 'failed';

		var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
			+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

		/**
		 * Loads the given file.
		 *
		 * @param {string} src The URL or path of the source file to load.
		 * @param {(result: string) => void} success
		 * @param {(reason: string) => void} error
		 */
		function loadFile(src, success, error) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', src, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status < 400 && xhr.responseText) {
						success(xhr.responseText);
					} else {
						if (xhr.status >= 400) {
							error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
						} else {
							error(FAILURE_EMPTY_MESSAGE);
						}
					}
				}
			};
			xhr.send(null);
		}

		/**
		 * Parses the given range.
		 *
		 * This returns a range with inclusive ends.
		 *
		 * @param {string | null | undefined} range
		 * @returns {[number, number | undefined] | undefined}
		 */
		function parseRange(range) {
			var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
			if (m) {
				var start = Number(m[1]);
				var comma = m[2];
				var end = m[3];

				if (!comma) {
					return [start, start];
				}
				if (!end) {
					return [start, undefined];
				}
				return [start, Number(end)];
			}
			return undefined;
		}

		Prism.hooks.add('before-highlightall', function (env) {
			env.selector += ', ' + SELECTOR;
		});

		Prism.hooks.add('before-sanity-check', function (env) {
			var pre = /** @type {HTMLPreElement} */ (env.element);
			if (pre.matches(SELECTOR)) {
				env.code = ''; // fast-path the whole thing and go to complete

				pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

				// add code element with loading message
				var code = pre.appendChild(document.createElement('CODE'));
				code.textContent = LOADING_MESSAGE;

				var src = pre.getAttribute('data-src');

				var language = env.language;
				if (language === 'none') {
					// the language might be 'none' because there is no language set;
					// in this case, we want to use the extension as the language
					var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
					language = EXTENSIONS[extension] || extension;
				}

				// set language classes
				Prism.util.setLanguage(code, language);
				Prism.util.setLanguage(pre, language);

				// preload the language
				var autoloader = Prism.plugins.autoloader;
				if (autoloader) {
					autoloader.loadLanguages(language);
				}

				// load file
				loadFile(
					src,
					function (text) {
						// mark as loaded
						pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

						// handle data-range
						var range = parseRange(pre.getAttribute('data-range'));
						if (range) {
							var lines = text.split(/\r\n?|\n/g);

							// the range is one-based and inclusive on both ends
							var start = range[0];
							var end = range[1] == null ? lines.length : range[1];

							if (start < 0) { start += lines.length; }
							start = Math.max(0, Math.min(start - 1, lines.length));
							if (end < 0) { end += lines.length; }
							end = Math.max(0, Math.min(end, lines.length));

							text = lines.slice(start, end).join('\n');

							// add data-start for line numbers
							if (!pre.hasAttribute('data-start')) {
								pre.setAttribute('data-start', String(start + 1));
							}
						}

						// highlight code
						code.textContent = text;
						Prism.highlightElement(code);
					},
					function (error) {
						// mark as failed
						pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

						code.textContent = error;
					}
				);
			}
		});

		Prism.plugins.fileHighlight = {
			/**
			 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
			 *
			 * Note: Elements which are already loaded or currently loading will not be touched by this method.
			 *
			 * @param {ParentNode} [container=document]
			 */
			highlight: function highlight(container) {
				var elements = (container || document).querySelectorAll(SELECTOR);

				for (var i = 0, element; (element = elements[i++]);) {
					Prism.highlightElement(element);
				}
			}
		};

		var logged = false;
		/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
		Prism.fileHighlight = function () {
			if (!logged) {
				console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
				logged = true;
			}
			Prism.plugins.fileHighlight.highlight.apply(this, arguments);
		};

	}()); 
} (prism));

var prismExports = prism.exports;
const Prism$1 = /*@__PURE__*/getDefaultExportFromCjs(prismExports);

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var components$1 = {exports: {}};

(function (module) {
	var components = {"core":{"meta":{"path":"components/prism-core.js","option":"mandatory"},"core":"Core"},"themes":{"meta":{"path":"themes/{id}.css","link":"index.html?theme={id}","exclusive":true},"prism":{"title":"Default","option":"default"},"prism-dark":"Dark","prism-funky":"Funky","prism-okaidia":{"title":"Okaidia","owner":"ocodia"},"prism-twilight":{"title":"Twilight","owner":"remybach"},"prism-coy":{"title":"Coy","owner":"tshedor"},"prism-solarizedlight":{"title":"Solarized Light","owner":"hectormatos2011 "},"prism-tomorrow":{"title":"Tomorrow Night","owner":"Rosey"}},"languages":{"meta":{"path":"components/prism-{id}","noCSS":true,"examplesPath":"examples/prism-{id}","addCheckAll":true},"markup":{"title":"Markup","alias":["html","xml","svg","mathml","ssml","atom","rss"],"aliasTitles":{"html":"HTML","xml":"XML","svg":"SVG","mathml":"MathML","ssml":"SSML","atom":"Atom","rss":"RSS"},"option":"default"},"css":{"title":"CSS","option":"default","modify":"markup"},"clike":{"title":"C-like","option":"default"},"javascript":{"title":"JavaScript","require":"clike","modify":"markup","optional":"regex","alias":"js","option":"default"},"abap":{"title":"ABAP","owner":"dellagustin"},"abnf":{"title":"ABNF","owner":"RunDevelopment"},"actionscript":{"title":"ActionScript","require":"javascript","modify":"markup","owner":"Golmote"},"ada":{"title":"Ada","owner":"Lucretia"},"agda":{"title":"Agda","owner":"xy-ren"},"al":{"title":"AL","owner":"RunDevelopment"},"antlr4":{"title":"ANTLR4","alias":"g4","owner":"RunDevelopment"},"apacheconf":{"title":"Apache Configuration","owner":"GuiTeK"},"apex":{"title":"Apex","require":["clike","sql"],"owner":"RunDevelopment"},"apl":{"title":"APL","owner":"ngn"},"applescript":{"title":"AppleScript","owner":"Golmote"},"aql":{"title":"AQL","owner":"RunDevelopment"},"arduino":{"title":"Arduino","require":"cpp","alias":"ino","owner":"dkern"},"arff":{"title":"ARFF","owner":"Golmote"},"armasm":{"title":"ARM Assembly","alias":"arm-asm","owner":"RunDevelopment"},"arturo":{"title":"Arturo","alias":"art","optional":["bash","css","javascript","markup","markdown","sql"],"owner":"drkameleon"},"asciidoc":{"alias":"adoc","title":"AsciiDoc","owner":"Golmote"},"aspnet":{"title":"ASP.NET (C#)","require":["markup","csharp"],"owner":"nauzilus"},"asm6502":{"title":"6502 Assembly","owner":"kzurawel"},"asmatmel":{"title":"Atmel AVR Assembly","owner":"cerkit"},"autohotkey":{"title":"AutoHotkey","owner":"aviaryan"},"autoit":{"title":"AutoIt","owner":"Golmote"},"avisynth":{"title":"AviSynth","alias":"avs","owner":"Zinfidel"},"avro-idl":{"title":"Avro IDL","alias":"avdl","owner":"RunDevelopment"},"awk":{"title":"AWK","alias":"gawk","aliasTitles":{"gawk":"GAWK"},"owner":"RunDevelopment"},"bash":{"title":"Bash","alias":["sh","shell"],"aliasTitles":{"sh":"Shell","shell":"Shell"},"owner":"zeitgeist87"},"basic":{"title":"BASIC","owner":"Golmote"},"batch":{"title":"Batch","owner":"Golmote"},"bbcode":{"title":"BBcode","alias":"shortcode","aliasTitles":{"shortcode":"Shortcode"},"owner":"RunDevelopment"},"bbj":{"title":"BBj","owner":"hyyan"},"bicep":{"title":"Bicep","owner":"johnnyreilly"},"birb":{"title":"Birb","require":"clike","owner":"Calamity210"},"bison":{"title":"Bison","require":"c","owner":"Golmote"},"bnf":{"title":"BNF","alias":"rbnf","aliasTitles":{"rbnf":"RBNF"},"owner":"RunDevelopment"},"bqn":{"title":"BQN","owner":"yewscion"},"brainfuck":{"title":"Brainfuck","owner":"Golmote"},"brightscript":{"title":"BrightScript","owner":"RunDevelopment"},"bro":{"title":"Bro","owner":"wayward710"},"bsl":{"title":"BSL (1C:Enterprise)","alias":"oscript","aliasTitles":{"oscript":"OneScript"},"owner":"Diversus23"},"c":{"title":"C","require":"clike","owner":"zeitgeist87"},"csharp":{"title":"C#","require":"clike","alias":["cs","dotnet"],"owner":"mvalipour"},"cpp":{"title":"C++","require":"c","owner":"zeitgeist87"},"cfscript":{"title":"CFScript","require":"clike","alias":"cfc","owner":"mjclemente"},"chaiscript":{"title":"ChaiScript","require":["clike","cpp"],"owner":"RunDevelopment"},"cil":{"title":"CIL","owner":"sbrl"},"cilkc":{"title":"Cilk/C","require":"c","alias":"cilk-c","owner":"OpenCilk"},"cilkcpp":{"title":"Cilk/C++","require":"cpp","alias":["cilk-cpp","cilk"],"owner":"OpenCilk"},"clojure":{"title":"Clojure","owner":"troglotit"},"cmake":{"title":"CMake","owner":"mjrogozinski"},"cobol":{"title":"COBOL","owner":"RunDevelopment"},"coffeescript":{"title":"CoffeeScript","require":"javascript","alias":"coffee","owner":"R-osey"},"concurnas":{"title":"Concurnas","alias":"conc","owner":"jasontatton"},"csp":{"title":"Content-Security-Policy","owner":"ScottHelme"},"cooklang":{"title":"Cooklang","owner":"ahue"},"coq":{"title":"Coq","owner":"RunDevelopment"},"crystal":{"title":"Crystal","require":"ruby","owner":"MakeNowJust"},"css-extras":{"title":"CSS Extras","require":"css","modify":"css","owner":"milesj"},"csv":{"title":"CSV","owner":"RunDevelopment"},"cue":{"title":"CUE","owner":"RunDevelopment"},"cypher":{"title":"Cypher","owner":"RunDevelopment"},"d":{"title":"D","require":"clike","owner":"Golmote"},"dart":{"title":"Dart","require":"clike","owner":"Golmote"},"dataweave":{"title":"DataWeave","owner":"machaval"},"dax":{"title":"DAX","owner":"peterbud"},"dhall":{"title":"Dhall","owner":"RunDevelopment"},"diff":{"title":"Diff","owner":"uranusjr"},"django":{"title":"Django/Jinja2","require":"markup-templating","alias":"jinja2","owner":"romanvm"},"dns-zone-file":{"title":"DNS zone file","owner":"RunDevelopment","alias":"dns-zone"},"docker":{"title":"Docker","alias":"dockerfile","owner":"JustinBeckwith"},"dot":{"title":"DOT (Graphviz)","alias":"gv","optional":"markup","owner":"RunDevelopment"},"ebnf":{"title":"EBNF","owner":"RunDevelopment"},"editorconfig":{"title":"EditorConfig","owner":"osipxd"},"eiffel":{"title":"Eiffel","owner":"Conaclos"},"ejs":{"title":"EJS","require":["javascript","markup-templating"],"owner":"RunDevelopment","alias":"eta","aliasTitles":{"eta":"Eta"}},"elixir":{"title":"Elixir","owner":"Golmote"},"elm":{"title":"Elm","owner":"zwilias"},"etlua":{"title":"Embedded Lua templating","require":["lua","markup-templating"],"owner":"RunDevelopment"},"erb":{"title":"ERB","require":["ruby","markup-templating"],"owner":"Golmote"},"erlang":{"title":"Erlang","owner":"Golmote"},"excel-formula":{"title":"Excel Formula","alias":["xlsx","xls"],"owner":"RunDevelopment"},"fsharp":{"title":"F#","require":"clike","owner":"simonreynolds7"},"factor":{"title":"Factor","owner":"catb0t"},"false":{"title":"False","owner":"edukisto"},"firestore-security-rules":{"title":"Firestore security rules","require":"clike","owner":"RunDevelopment"},"flow":{"title":"Flow","require":"javascript","owner":"Golmote"},"fortran":{"title":"Fortran","owner":"Golmote"},"ftl":{"title":"FreeMarker Template Language","require":"markup-templating","owner":"RunDevelopment"},"gml":{"title":"GameMaker Language","alias":"gamemakerlanguage","require":"clike","owner":"LiarOnce"},"gap":{"title":"GAP (CAS)","owner":"RunDevelopment"},"gcode":{"title":"G-code","owner":"RunDevelopment"},"gdscript":{"title":"GDScript","owner":"RunDevelopment"},"gedcom":{"title":"GEDCOM","owner":"Golmote"},"gettext":{"title":"gettext","alias":"po","owner":"RunDevelopment"},"gherkin":{"title":"Gherkin","owner":"hason"},"git":{"title":"Git","owner":"lgiraudel"},"glsl":{"title":"GLSL","require":"c","owner":"Golmote"},"gn":{"title":"GN","alias":"gni","owner":"RunDevelopment"},"linker-script":{"title":"GNU Linker Script","alias":"ld","owner":"RunDevelopment"},"go":{"title":"Go","require":"clike","owner":"arnehormann"},"go-module":{"title":"Go module","alias":"go-mod","owner":"RunDevelopment"},"gradle":{"title":"Gradle","require":"clike","owner":"zeabdelkhalek-badido18"},"graphql":{"title":"GraphQL","optional":"markdown","owner":"Golmote"},"groovy":{"title":"Groovy","require":"clike","owner":"robfletcher"},"haml":{"title":"Haml","require":"ruby","optional":["css","css-extras","coffeescript","erb","javascript","less","markdown","scss","textile"],"owner":"Golmote"},"handlebars":{"title":"Handlebars","require":"markup-templating","alias":["hbs","mustache"],"aliasTitles":{"mustache":"Mustache"},"owner":"Golmote"},"haskell":{"title":"Haskell","alias":"hs","owner":"bholst"},"haxe":{"title":"Haxe","require":"clike","optional":"regex","owner":"Golmote"},"hcl":{"title":"HCL","owner":"outsideris"},"hlsl":{"title":"HLSL","require":"c","owner":"RunDevelopment"},"hoon":{"title":"Hoon","owner":"matildepark"},"http":{"title":"HTTP","optional":["csp","css","hpkp","hsts","javascript","json","markup","uri"],"owner":"danielgtaylor"},"hpkp":{"title":"HTTP Public-Key-Pins","owner":"ScottHelme"},"hsts":{"title":"HTTP Strict-Transport-Security","owner":"ScottHelme"},"ichigojam":{"title":"IchigoJam","owner":"BlueCocoa"},"icon":{"title":"Icon","owner":"Golmote"},"icu-message-format":{"title":"ICU Message Format","owner":"RunDevelopment"},"idris":{"title":"Idris","alias":"idr","owner":"KeenS","require":"haskell"},"ignore":{"title":".ignore","owner":"osipxd","alias":["gitignore","hgignore","npmignore"],"aliasTitles":{"gitignore":".gitignore","hgignore":".hgignore","npmignore":".npmignore"}},"inform7":{"title":"Inform 7","owner":"Golmote"},"ini":{"title":"Ini","owner":"aviaryan"},"io":{"title":"Io","owner":"AlesTsurko"},"j":{"title":"J","owner":"Golmote"},"java":{"title":"Java","require":"clike","owner":"sherblot"},"javadoc":{"title":"JavaDoc","require":["markup","java","javadoclike"],"modify":"java","optional":"scala","owner":"RunDevelopment"},"javadoclike":{"title":"JavaDoc-like","modify":["java","javascript","php"],"owner":"RunDevelopment"},"javastacktrace":{"title":"Java stack trace","owner":"RunDevelopment"},"jexl":{"title":"Jexl","owner":"czosel"},"jolie":{"title":"Jolie","require":"clike","owner":"thesave"},"jq":{"title":"JQ","owner":"RunDevelopment"},"jsdoc":{"title":"JSDoc","require":["javascript","javadoclike","typescript"],"modify":"javascript","optional":["actionscript","coffeescript"],"owner":"RunDevelopment"},"js-extras":{"title":"JS Extras","require":"javascript","modify":"javascript","optional":["actionscript","coffeescript","flow","n4js","typescript"],"owner":"RunDevelopment"},"json":{"title":"JSON","alias":"webmanifest","aliasTitles":{"webmanifest":"Web App Manifest"},"owner":"CupOfTea696"},"json5":{"title":"JSON5","require":"json","owner":"RunDevelopment"},"jsonp":{"title":"JSONP","require":"json","owner":"RunDevelopment"},"jsstacktrace":{"title":"JS stack trace","owner":"sbrl"},"js-templates":{"title":"JS Templates","require":"javascript","modify":"javascript","optional":["css","css-extras","graphql","markdown","markup","sql"],"owner":"RunDevelopment"},"julia":{"title":"Julia","owner":"cdagnino"},"keepalived":{"title":"Keepalived Configure","owner":"dev-itsheng"},"keyman":{"title":"Keyman","owner":"mcdurdin"},"kotlin":{"title":"Kotlin","alias":["kt","kts"],"aliasTitles":{"kts":"Kotlin Script"},"require":"clike","owner":"Golmote"},"kumir":{"title":"KuMir (КуМир)","alias":"kum","owner":"edukisto"},"kusto":{"title":"Kusto","owner":"RunDevelopment"},"latex":{"title":"LaTeX","alias":["tex","context"],"aliasTitles":{"tex":"TeX","context":"ConTeXt"},"owner":"japborst"},"latte":{"title":"Latte","require":["clike","markup-templating","php"],"owner":"nette"},"less":{"title":"Less","require":"css","optional":"css-extras","owner":"Golmote"},"lilypond":{"title":"LilyPond","require":"scheme","alias":"ly","owner":"RunDevelopment"},"liquid":{"title":"Liquid","require":"markup-templating","owner":"cinhtau"},"lisp":{"title":"Lisp","alias":["emacs","elisp","emacs-lisp"],"owner":"JuanCaicedo"},"livescript":{"title":"LiveScript","owner":"Golmote"},"llvm":{"title":"LLVM IR","owner":"porglezomp"},"log":{"title":"Log file","optional":"javastacktrace","owner":"RunDevelopment"},"lolcode":{"title":"LOLCODE","owner":"Golmote"},"lua":{"title":"Lua","owner":"Golmote"},"magma":{"title":"Magma (CAS)","owner":"RunDevelopment"},"makefile":{"title":"Makefile","owner":"Golmote"},"markdown":{"title":"Markdown","require":"markup","optional":"yaml","alias":"md","owner":"Golmote"},"markup-templating":{"title":"Markup templating","require":"markup","owner":"Golmote"},"mata":{"title":"Mata","owner":"RunDevelopment"},"matlab":{"title":"MATLAB","owner":"Golmote"},"maxscript":{"title":"MAXScript","owner":"RunDevelopment"},"mel":{"title":"MEL","owner":"Golmote"},"mermaid":{"title":"Mermaid","owner":"RunDevelopment"},"metafont":{"title":"METAFONT","owner":"LaeriExNihilo"},"mizar":{"title":"Mizar","owner":"Golmote"},"mongodb":{"title":"MongoDB","owner":"airs0urce","require":"javascript"},"monkey":{"title":"Monkey","owner":"Golmote"},"moonscript":{"title":"MoonScript","alias":"moon","owner":"RunDevelopment"},"n1ql":{"title":"N1QL","owner":"TMWilds"},"n4js":{"title":"N4JS","require":"javascript","optional":"jsdoc","alias":"n4jsd","owner":"bsmith-n4"},"nand2tetris-hdl":{"title":"Nand To Tetris HDL","owner":"stephanmax"},"naniscript":{"title":"Naninovel Script","owner":"Elringus","alias":"nani"},"nasm":{"title":"NASM","owner":"rbmj"},"neon":{"title":"NEON","owner":"nette"},"nevod":{"title":"Nevod","owner":"nezaboodka"},"nginx":{"title":"nginx","owner":"volado"},"nim":{"title":"Nim","owner":"Golmote"},"nix":{"title":"Nix","owner":"Golmote"},"nsis":{"title":"NSIS","owner":"idleberg"},"objectivec":{"title":"Objective-C","require":"c","alias":"objc","owner":"uranusjr"},"ocaml":{"title":"OCaml","owner":"Golmote"},"odin":{"title":"Odin","owner":"edukisto"},"opencl":{"title":"OpenCL","require":"c","modify":["c","cpp"],"owner":"Milania1"},"openqasm":{"title":"OpenQasm","alias":"qasm","owner":"RunDevelopment"},"oz":{"title":"Oz","owner":"Golmote"},"parigp":{"title":"PARI/GP","owner":"Golmote"},"parser":{"title":"Parser","require":"markup","owner":"Golmote"},"pascal":{"title":"Pascal","alias":"objectpascal","aliasTitles":{"objectpascal":"Object Pascal"},"owner":"Golmote"},"pascaligo":{"title":"Pascaligo","owner":"DefinitelyNotAGoat"},"psl":{"title":"PATROL Scripting Language","owner":"bertysentry"},"pcaxis":{"title":"PC-Axis","alias":"px","owner":"RunDevelopment"},"peoplecode":{"title":"PeopleCode","alias":"pcode","owner":"RunDevelopment"},"perl":{"title":"Perl","owner":"Golmote"},"php":{"title":"PHP","require":"markup-templating","owner":"milesj"},"phpdoc":{"title":"PHPDoc","require":["php","javadoclike"],"modify":"php","owner":"RunDevelopment"},"php-extras":{"title":"PHP Extras","require":"php","modify":"php","owner":"milesj"},"plant-uml":{"title":"PlantUML","alias":"plantuml","owner":"RunDevelopment"},"plsql":{"title":"PL/SQL","require":"sql","owner":"Golmote"},"powerquery":{"title":"PowerQuery","alias":["pq","mscript"],"owner":"peterbud"},"powershell":{"title":"PowerShell","owner":"nauzilus"},"processing":{"title":"Processing","require":"clike","owner":"Golmote"},"prolog":{"title":"Prolog","owner":"Golmote"},"promql":{"title":"PromQL","owner":"arendjr"},"properties":{"title":".properties","owner":"Golmote"},"protobuf":{"title":"Protocol Buffers","require":"clike","owner":"just-boris"},"pug":{"title":"Pug","require":["markup","javascript"],"optional":["coffeescript","ejs","handlebars","less","livescript","markdown","scss","stylus","twig"],"owner":"Golmote"},"puppet":{"title":"Puppet","owner":"Golmote"},"pure":{"title":"Pure","optional":["c","cpp","fortran"],"owner":"Golmote"},"purebasic":{"title":"PureBasic","require":"clike","alias":"pbfasm","owner":"HeX0R101"},"purescript":{"title":"PureScript","require":"haskell","alias":"purs","owner":"sriharshachilakapati"},"python":{"title":"Python","alias":"py","owner":"multipetros"},"qsharp":{"title":"Q#","require":"clike","alias":"qs","owner":"fedonman"},"q":{"title":"Q (kdb+ database)","owner":"Golmote"},"qml":{"title":"QML","require":"javascript","owner":"RunDevelopment"},"qore":{"title":"Qore","require":"clike","owner":"temnroegg"},"r":{"title":"R","owner":"Golmote"},"racket":{"title":"Racket","require":"scheme","alias":"rkt","owner":"RunDevelopment"},"cshtml":{"title":"Razor C#","alias":"razor","require":["markup","csharp"],"optional":["css","css-extras","javascript","js-extras"],"owner":"RunDevelopment"},"jsx":{"title":"React JSX","require":["markup","javascript"],"optional":["jsdoc","js-extras","js-templates"],"owner":"vkbansal"},"tsx":{"title":"React TSX","require":["jsx","typescript"]},"reason":{"title":"Reason","require":"clike","owner":"Golmote"},"regex":{"title":"Regex","owner":"RunDevelopment"},"rego":{"title":"Rego","owner":"JordanSh"},"renpy":{"title":"Ren'py","alias":"rpy","owner":"HyuchiaDiego"},"rescript":{"title":"ReScript","alias":"res","owner":"vmarcosp"},"rest":{"title":"reST (reStructuredText)","owner":"Golmote"},"rip":{"title":"Rip","owner":"ravinggenius"},"roboconf":{"title":"Roboconf","owner":"Golmote"},"robotframework":{"title":"Robot Framework","alias":"robot","owner":"RunDevelopment"},"ruby":{"title":"Ruby","require":"clike","alias":"rb","owner":"samflores"},"rust":{"title":"Rust","owner":"Golmote"},"sas":{"title":"SAS","optional":["groovy","lua","sql"],"owner":"Golmote"},"sass":{"title":"Sass (Sass)","require":"css","optional":"css-extras","owner":"Golmote"},"scss":{"title":"Sass (SCSS)","require":"css","optional":"css-extras","owner":"MoOx"},"scala":{"title":"Scala","require":"java","owner":"jozic"},"scheme":{"title":"Scheme","owner":"bacchus123"},"shell-session":{"title":"Shell session","require":"bash","alias":["sh-session","shellsession"],"owner":"RunDevelopment"},"smali":{"title":"Smali","owner":"RunDevelopment"},"smalltalk":{"title":"Smalltalk","owner":"Golmote"},"smarty":{"title":"Smarty","require":"markup-templating","optional":"php","owner":"Golmote"},"sml":{"title":"SML","alias":"smlnj","aliasTitles":{"smlnj":"SML/NJ"},"owner":"RunDevelopment"},"solidity":{"title":"Solidity (Ethereum)","alias":"sol","require":"clike","owner":"glachaud"},"solution-file":{"title":"Solution file","alias":"sln","owner":"RunDevelopment"},"soy":{"title":"Soy (Closure Template)","require":"markup-templating","owner":"Golmote"},"sparql":{"title":"SPARQL","require":"turtle","owner":"Triply-Dev","alias":"rq"},"splunk-spl":{"title":"Splunk SPL","owner":"RunDevelopment"},"sqf":{"title":"SQF: Status Quo Function (Arma 3)","require":"clike","owner":"RunDevelopment"},"sql":{"title":"SQL","owner":"multipetros"},"squirrel":{"title":"Squirrel","require":"clike","owner":"RunDevelopment"},"stan":{"title":"Stan","owner":"RunDevelopment"},"stata":{"title":"Stata Ado","require":["mata","java","python"],"owner":"RunDevelopment"},"iecst":{"title":"Structured Text (IEC 61131-3)","owner":"serhioromano"},"stylus":{"title":"Stylus","owner":"vkbansal"},"supercollider":{"title":"SuperCollider","alias":"sclang","owner":"RunDevelopment"},"swift":{"title":"Swift","owner":"chrischares"},"systemd":{"title":"Systemd configuration file","owner":"RunDevelopment"},"t4-templating":{"title":"T4 templating","owner":"RunDevelopment"},"t4-cs":{"title":"T4 Text Templates (C#)","require":["t4-templating","csharp"],"alias":"t4","owner":"RunDevelopment"},"t4-vb":{"title":"T4 Text Templates (VB)","require":["t4-templating","vbnet"],"owner":"RunDevelopment"},"tap":{"title":"TAP","owner":"isaacs","require":"yaml"},"tcl":{"title":"Tcl","owner":"PeterChaplin"},"tt2":{"title":"Template Toolkit 2","require":["clike","markup-templating"],"owner":"gflohr"},"textile":{"title":"Textile","require":"markup","optional":"css","owner":"Golmote"},"toml":{"title":"TOML","owner":"RunDevelopment"},"tremor":{"title":"Tremor","alias":["trickle","troy"],"owner":"darach","aliasTitles":{"trickle":"trickle","troy":"troy"}},"turtle":{"title":"Turtle","alias":"trig","aliasTitles":{"trig":"TriG"},"owner":"jakubklimek"},"twig":{"title":"Twig","require":"markup-templating","owner":"brandonkelly"},"typescript":{"title":"TypeScript","require":"javascript","optional":"js-templates","alias":"ts","owner":"vkbansal"},"typoscript":{"title":"TypoScript","alias":"tsconfig","aliasTitles":{"tsconfig":"TSConfig"},"owner":"dkern"},"unrealscript":{"title":"UnrealScript","alias":["uscript","uc"],"owner":"RunDevelopment"},"uorazor":{"title":"UO Razor Script","owner":"jaseowns"},"uri":{"title":"URI","alias":"url","aliasTitles":{"url":"URL"},"owner":"RunDevelopment"},"v":{"title":"V","require":"clike","owner":"taggon"},"vala":{"title":"Vala","require":"clike","optional":"regex","owner":"TemplarVolk"},"vbnet":{"title":"VB.Net","require":"basic","owner":"Bigsby"},"velocity":{"title":"Velocity","require":"markup","owner":"Golmote"},"verilog":{"title":"Verilog","owner":"a-rey"},"vhdl":{"title":"VHDL","owner":"a-rey"},"vim":{"title":"vim","owner":"westonganger"},"visual-basic":{"title":"Visual Basic","alias":["vb","vba"],"aliasTitles":{"vba":"VBA"},"owner":"Golmote"},"warpscript":{"title":"WarpScript","owner":"RunDevelopment"},"wasm":{"title":"WebAssembly","owner":"Golmote"},"web-idl":{"title":"Web IDL","alias":"webidl","owner":"RunDevelopment"},"wgsl":{"title":"WGSL","owner":"Dr4gonthree"},"wiki":{"title":"Wiki markup","require":"markup","owner":"Golmote"},"wolfram":{"title":"Wolfram language","alias":["mathematica","nb","wl"],"aliasTitles":{"mathematica":"Mathematica","nb":"Mathematica Notebook"},"owner":"msollami"},"wren":{"title":"Wren","owner":"clsource"},"xeora":{"title":"Xeora","require":"markup","alias":"xeoracube","aliasTitles":{"xeoracube":"XeoraCube"},"owner":"freakmaxi"},"xml-doc":{"title":"XML doc (.net)","require":"markup","modify":["csharp","fsharp","vbnet"],"owner":"RunDevelopment"},"xojo":{"title":"Xojo (REALbasic)","owner":"Golmote"},"xquery":{"title":"XQuery","require":"markup","owner":"Golmote"},"yaml":{"title":"YAML","alias":"yml","owner":"hason"},"yang":{"title":"YANG","owner":"RunDevelopment"},"zig":{"title":"Zig","owner":"RunDevelopment"}},"plugins":{"meta":{"path":"plugins/{id}/prism-{id}","link":"plugins/{id}/"},"line-highlight":{"title":"Line Highlight","description":"Highlights specific lines and/or line ranges."},"line-numbers":{"title":"Line Numbers","description":"Line number at the beginning of code lines.","owner":"kuba-kubula"},"show-invisibles":{"title":"Show Invisibles","description":"Show hidden characters such as tabs and line breaks.","optional":["autolinker","data-uri-highlight"]},"autolinker":{"title":"Autolinker","description":"Converts URLs and emails in code to clickable links. Parses Markdown links in comments."},"wpd":{"title":"WebPlatform Docs","description":"Makes tokens link to <a href=\"https://webplatform.github.io/docs/\">WebPlatform.org documentation</a>. The links open in a new tab."},"custom-class":{"title":"Custom Class","description":"This plugin allows you to prefix Prism's default classes (<code>.comment</code> can become <code>.namespace--comment</code>) or replace them with your defined ones (like <code>.editor__comment</code>). You can even add new classes.","owner":"dvkndn","noCSS":true},"file-highlight":{"title":"File Highlight","description":"Fetch external files and highlight them with Prism. Used on the Prism website itself.","noCSS":true},"show-language":{"title":"Show Language","description":"Display the highlighted language in code blocks (inline code does not show the label).","owner":"nauzilus","noCSS":true,"require":"toolbar"},"jsonp-highlight":{"title":"JSONP Highlight","description":"Fetch content with JSONP and highlight some interesting content (e.g. GitHub/Gists or Bitbucket API).","noCSS":true,"owner":"nauzilus"},"highlight-keywords":{"title":"Highlight Keywords","description":"Adds special CSS classes for each keyword for fine-grained highlighting.","owner":"vkbansal","noCSS":true},"remove-initial-line-feed":{"title":"Remove initial line feed","description":"Removes the initial line feed in code blocks.","owner":"Golmote","noCSS":true},"inline-color":{"title":"Inline color","description":"Adds a small inline preview for colors in style sheets.","require":"css-extras","owner":"RunDevelopment"},"previewers":{"title":"Previewers","description":"Previewers for angles, colors, gradients, easing and time.","require":"css-extras","owner":"Golmote"},"autoloader":{"title":"Autoloader","description":"Automatically loads the needed languages to highlight the code blocks.","owner":"Golmote","noCSS":true},"keep-markup":{"title":"Keep Markup","description":"Prevents custom markup from being dropped out during highlighting.","owner":"Golmote","optional":"normalize-whitespace","noCSS":true},"command-line":{"title":"Command Line","description":"Display a command line with a prompt and, optionally, the output/response from the commands.","owner":"chriswells0"},"unescaped-markup":{"title":"Unescaped Markup","description":"Write markup without having to escape anything."},"normalize-whitespace":{"title":"Normalize Whitespace","description":"Supports multiple operations to normalize whitespace in code blocks.","owner":"zeitgeist87","optional":"unescaped-markup","noCSS":true},"data-uri-highlight":{"title":"Data-URI Highlight","description":"Highlights data-URI contents.","owner":"Golmote","noCSS":true},"toolbar":{"title":"Toolbar","description":"Attach a toolbar for plugins to easily register buttons on the top of a code block.","owner":"mAAdhaTTah"},"copy-to-clipboard":{"title":"Copy to Clipboard Button","description":"Add a button that copies the code block to the clipboard when clicked.","owner":"mAAdhaTTah","require":"toolbar","noCSS":true},"download-button":{"title":"Download Button","description":"A button in the toolbar of a code block adding a convenient way to download a code file.","owner":"Golmote","require":"toolbar","noCSS":true},"match-braces":{"title":"Match braces","description":"Highlights matching braces.","owner":"RunDevelopment"},"diff-highlight":{"title":"Diff Highlight","description":"Highlights the code inside diff blocks.","owner":"RunDevelopment","require":"diff"},"filter-highlight-all":{"title":"Filter highlightAll","description":"Filters the elements the <code>highlightAll</code> and <code>highlightAllUnder</code> methods actually highlight.","owner":"RunDevelopment","noCSS":true},"treeview":{"title":"Treeview","description":"A language with special styles to highlight file system tree structures.","owner":"Golmote"}}};
	if (module.exports) { module.exports = components; } 
} (components$1));

var componentsExports = components$1.exports;

var dependencies = {exports: {}};

(function (module) {

	/**
	 * @typedef {Object<string, ComponentCategory>} Components
	 * @typedef {Object<string, ComponentEntry | string>} ComponentCategory
	 *
	 * @typedef ComponentEntry
	 * @property {string} [title] The title of the component.
	 * @property {string} [owner] The GitHub user name of the owner.
	 * @property {boolean} [noCSS=false] Whether the component doesn't have style sheets which should also be loaded.
	 * @property {string | string[]} [alias] An optional list of aliases for the id of the component.
	 * @property {Object<string, string>} [aliasTitles] An optional map from an alias to its title.
	 *
	 * Aliases which are not in this map will the get title of the component.
	 * @property {string | string[]} [optional]
	 * @property {string | string[]} [require]
	 * @property {string | string[]} [modify]
	 */

	var getLoader = (function () {

		/**
		 * A function which does absolutely nothing.
		 *
		 * @type {any}
		 */
		var noop = function () { };

		/**
		 * Invokes the given callback for all elements of the given value.
		 *
		 * If the given value is an array, the callback will be invokes for all elements. If the given value is `null` or
		 * `undefined`, the callback will not be invoked. In all other cases, the callback will be invoked with the given
		 * value as parameter.
		 *
		 * @param {null | undefined | T | T[]} value
		 * @param {(value: T, index: number) => void} callbackFn
		 * @returns {void}
		 * @template T
		 */
		function forEach(value, callbackFn) {
			if (Array.isArray(value)) {
				value.forEach(callbackFn);
			} else if (value != null) {
				callbackFn(value, 0);
			}
		}

		/**
		 * Returns a new set for the given string array.
		 *
		 * @param {string[]} array
		 * @returns {StringSet}
		 *
		 * @typedef {Object<string, true>} StringSet
		 */
		function toSet(array) {
			/** @type {StringSet} */
			var set = {};
			for (var i = 0, l = array.length; i < l; i++) {
				set[array[i]] = true;
			}
			return set;
		}

		/**
		 * Creates a map of every components id to its entry.
		 *
		 * @param {Components} components
		 * @returns {EntryMap}
		 *
		 * @typedef {{ readonly [id: string]: Readonly<ComponentEntry> | undefined }} EntryMap
		 */
		function createEntryMap(components) {
			/** @type {Object<string, Readonly<ComponentEntry>>} */
			var map = {};

			for (var categoryName in components) {
				var category = components[categoryName];
				for (var id in category) {
					if (id != 'meta') {
						/** @type {ComponentEntry | string} */
						var entry = category[id];
						map[id] = typeof entry == 'string' ? { title: entry } : entry;
					}
				}
			}

			return map;
		}

		/**
		 * Creates a full dependencies map which includes all types of dependencies and their transitive dependencies.
		 *
		 * @param {EntryMap} entryMap
		 * @returns {DependencyResolver}
		 *
		 * @typedef {(id: string) => StringSet} DependencyResolver
		 */
		function createDependencyResolver(entryMap) {
			/** @type {Object<string, StringSet>} */
			var map = {};
			var _stackArray = [];

			/**
			 * Adds the dependencies of the given component to the dependency map.
			 *
			 * @param {string} id
			 * @param {string[]} stack
			 */
			function addToMap(id, stack) {
				if (id in map) {
					return;
				}

				stack.push(id);

				// check for circular dependencies
				var firstIndex = stack.indexOf(id);
				if (firstIndex < stack.length - 1) {
					throw new Error('Circular dependency: ' + stack.slice(firstIndex).join(' -> '));
				}

				/** @type {StringSet} */
				var dependencies = {};

				var entry = entryMap[id];
				if (entry) {
					/**
					 * This will add the direct dependency and all of its transitive dependencies to the set of
					 * dependencies of `entry`.
					 *
					 * @param {string} depId
					 * @returns {void}
					 */
					function handleDirectDependency(depId) {
						if (!(depId in entryMap)) {
							throw new Error(id + ' depends on an unknown component ' + depId);
						}
						if (depId in dependencies) {
							// if the given dependency is already in the set of deps, then so are its transitive deps
							return;
						}

						addToMap(depId, stack);
						dependencies[depId] = true;
						for (var transitiveDepId in map[depId]) {
							dependencies[transitiveDepId] = true;
						}
					}

					forEach(entry.require, handleDirectDependency);
					forEach(entry.optional, handleDirectDependency);
					forEach(entry.modify, handleDirectDependency);
				}

				map[id] = dependencies;

				stack.pop();
			}

			return function (id) {
				var deps = map[id];
				if (!deps) {
					addToMap(id, _stackArray);
					deps = map[id];
				}
				return deps;
			};
		}

		/**
		 * Returns a function which resolves the aliases of its given id of alias.
		 *
		 * @param {EntryMap} entryMap
		 * @returns {(idOrAlias: string) => string}
		 */
		function createAliasResolver(entryMap) {
			/** @type {Object<string, string> | undefined} */
			var map;

			return function (idOrAlias) {
				if (idOrAlias in entryMap) {
					return idOrAlias;
				} else {
					// only create the alias map if necessary
					if (!map) {
						map = {};

						for (var id in entryMap) {
							var entry = entryMap[id];
							forEach(entry && entry.alias, function (alias) {
								if (alias in map) {
									throw new Error(alias + ' cannot be alias for both ' + id + ' and ' + map[alias]);
								}
								if (alias in entryMap) {
									throw new Error(alias + ' cannot be alias of ' + id + ' because it is a component.');
								}
								map[alias] = id;
							});
						}
					}
					return map[idOrAlias] || idOrAlias;
				}
			};
		}

		/**
		 * @typedef LoadChainer
		 * @property {(before: T, after: () => T) => T} series
		 * @property {(values: T[]) => T} parallel
		 * @template T
		 */

		/**
		 * Creates an implicit DAG from the given components and dependencies and call the given `loadComponent` for each
		 * component in topological order.
		 *
		 * @param {DependencyResolver} dependencyResolver
		 * @param {StringSet} ids
		 * @param {(id: string) => T} loadComponent
		 * @param {LoadChainer<T>} [chainer]
		 * @returns {T}
		 * @template T
		 */
		function loadComponentsInOrder(dependencyResolver, ids, loadComponent, chainer) {
			var series = chainer ? chainer.series : undefined;
			var parallel = chainer ? chainer.parallel : noop;

			/** @type {Object<string, T>} */
			var cache = {};

			/**
			 * A set of ids of nodes which are not depended upon by any other node in the graph.
			 *
			 * @type {StringSet}
			 */
			var ends = {};

			/**
			 * Loads the given component and its dependencies or returns the cached value.
			 *
			 * @param {string} id
			 * @returns {T}
			 */
			function handleId(id) {
				if (id in cache) {
					return cache[id];
				}

				// assume that it's an end
				// if it isn't, it will be removed later
				ends[id] = true;

				// all dependencies of the component in the given ids
				var dependsOn = [];
				for (var depId in dependencyResolver(id)) {
					if (depId in ids) {
						dependsOn.push(depId);
					}
				}

				/**
				 * The value to be returned.
				 *
				 * @type {T}
				 */
				var value;

				if (dependsOn.length === 0) {
					value = loadComponent(id);
				} else {
					var depsValue = parallel(dependsOn.map(function (depId) {
						var value = handleId(depId);
						// none of the dependencies can be ends
						delete ends[depId];
						return value;
					}));
					if (series) {
						// the chainer will be responsibly for calling the function calling loadComponent
						value = series(depsValue, function () { return loadComponent(id); });
					} else {
						// we don't have a chainer, so we call loadComponent ourselves
						loadComponent(id);
					}
				}

				// cache and return
				return cache[id] = value;
			}

			for (var id in ids) {
				handleId(id);
			}

			/** @type {T[]} */
			var endValues = [];
			for (var endId in ends) {
				endValues.push(cache[endId]);
			}
			return parallel(endValues);
		}

		/**
		 * Returns whether the given object has any keys.
		 *
		 * @param {object} obj
		 */
		function hasKeys(obj) {
			for (var key in obj) {
				return true;
			}
			return false;
		}

		/**
		 * Returns an object which provides methods to get the ids of the components which have to be loaded (`getIds`) and
		 * a way to efficiently load them in synchronously and asynchronous contexts (`load`).
		 *
		 * The set of ids to be loaded is a superset of `load`. If some of these ids are in `loaded`, the corresponding
		 * components will have to reloaded.
		 *
		 * The ids in `load` and `loaded` may be in any order and can contain duplicates.
		 *
		 * @param {Components} components
		 * @param {string[]} load
		 * @param {string[]} [loaded=[]] A list of already loaded components.
		 *
		 * If a component is in this list, then all of its requirements will also be assumed to be in the list.
		 * @returns {Loader}
		 *
		 * @typedef Loader
		 * @property {() => string[]} getIds A function to get all ids of the components to load.
		 *
		 * The returned ids will be duplicate-free, alias-free and in load order.
		 * @property {LoadFunction} load A functional interface to load components.
		 *
		 * @typedef {<T> (loadComponent: (id: string) => T, chainer?: LoadChainer<T>) => T} LoadFunction
		 * A functional interface to load components.
		 *
		 * The `loadComponent` function will be called for every component in the order in which they have to be loaded.
		 *
		 * The `chainer` is useful for asynchronous loading and its `series` and `parallel` functions can be thought of as
		 * `Promise#then` and `Promise.all`.
		 *
		 * @example
		 * load(id => { loadComponent(id); }); // returns undefined
		 *
		 * await load(
		 *     id => loadComponentAsync(id), // returns a Promise for each id
		 *     {
		 *         series: async (before, after) => {
		 *             await before;
		 *             await after();
		 *         },
		 *         parallel: async (values) => {
		 *             await Promise.all(values);
		 *         }
		 *     }
		 * );
		 */
		function getLoader(components, load, loaded) {
			var entryMap = createEntryMap(components);
			var resolveAlias = createAliasResolver(entryMap);

			load = load.map(resolveAlias);
			loaded = (loaded || []).map(resolveAlias);

			var loadSet = toSet(load);
			var loadedSet = toSet(loaded);

			// add requirements

			load.forEach(addRequirements);
			function addRequirements(id) {
				var entry = entryMap[id];
				forEach(entry && entry.require, function (reqId) {
					if (!(reqId in loadedSet)) {
						loadSet[reqId] = true;
						addRequirements(reqId);
					}
				});
			}

			// add components to reload

			// A component x in `loaded` has to be reloaded if
			//  1) a component in `load` modifies x.
			//  2) x depends on a component in `load`.
			// The above two condition have to be applied until nothing changes anymore.

			var dependencyResolver = createDependencyResolver(entryMap);

			/** @type {StringSet} */
			var loadAdditions = loadSet;
			/** @type {StringSet} */
			var newIds;
			while (hasKeys(loadAdditions)) {
				newIds = {};

				// condition 1)
				for (var loadId in loadAdditions) {
					var entry = entryMap[loadId];
					forEach(entry && entry.modify, function (modId) {
						if (modId in loadedSet) {
							newIds[modId] = true;
						}
					});
				}

				// condition 2)
				for (var loadedId in loadedSet) {
					if (!(loadedId in loadSet)) {
						for (var depId in dependencyResolver(loadedId)) {
							if (depId in loadSet) {
								newIds[loadedId] = true;
								break;
							}
						}
					}
				}

				loadAdditions = newIds;
				for (var newId in loadAdditions) {
					loadSet[newId] = true;
				}
			}

			/** @type {Loader} */
			var loader = {
				getIds: function () {
					var ids = [];
					loader.load(function (id) {
						ids.push(id);
					});
					return ids;
				},
				load: function (loadComponent, chainer) {
					return loadComponentsInOrder(dependencyResolver, loadSet, loadComponent, chainer);
				}
			};

			return loader;
		}

		return getLoader;

	}());

	{
		module.exports = getLoader;
	} 
} (dependencies));

var dependenciesExports = dependencies.exports;

const components = componentsExports;
const getLoader = dependenciesExports;


/**
 * The set of all languages which have been loaded using the below function.
 *
 * @type {Set<string>}
 */
const loadedLanguages = new Set();

/**
 * Loads the given languages and adds them to the current Prism instance.
 *
 * If no languages are provided, __all__ Prism languages will be loaded.
 *
 * @param {string|string[]} [languages]
 * @returns {void}
 */
function loadLanguages(languages) {
	if (languages === undefined) {
		languages = Object.keys(components.languages).filter(l => l != 'meta');
	} else if (!Array.isArray(languages)) {
		languages = [languages];
	}

	// the user might have loaded languages via some other way or used `prism.js` which already includes some
	// we don't need to validate the ids because `getLoader` will ignore invalid ones
	const loaded = [...loadedLanguages, ...Object.keys(Prism.languages)];

	getLoader(components, languages, loaded).load(lang => {
		if (!(lang in components.languages)) {
			if (!loadLanguages.silent) {
				console.warn('Language does not exist: ' + lang);
			}
			return;
		}

		const pathToLanguage = './prism-' + lang;

		// remove from require cache and from Prism
		delete require.cache[require.resolve(pathToLanguage)];
		delete Prism.languages[lang];

		commonjsRequire(pathToLanguage);

		loadedLanguages.add(lang);
	});
}

/**
 * Set this to `true` to prevent all warning messages `loadLanguages` logs.
 */
loadLanguages.silent = false;

var components_1 = loadLanguages;

const loadLanguages$1 = /*@__PURE__*/getDefaultExportFromCjs(components_1);

function addAstro(Prism) {
  if (Prism.languages.astro) {
    return;
  }
  let scriptLang;
  if (Prism.languages.typescript) {
    scriptLang = "typescript";
  } else {
    scriptLang = "javascript";
    console.warn(
      "Prism TypeScript language not loaded, Astro scripts will be treated as JavaScript."
    );
  }
  let script = Prism.util.clone(Prism.languages[scriptLang]);
  let space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
  let braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
  let spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
  function re(source, flags) {
    source = source.replace(/<S>/g, function() {
      return space;
    }).replace(/<BRACES>/g, function() {
      return braces;
    }).replace(/<SPREAD>/g, function() {
      return spread;
    });
    return RegExp(source, flags);
  }
  spread = re(spread).source;
  Prism.languages.astro = Prism.languages.extend("markup", script);
  Prism.languages.astro.tag.pattern = re(
    /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source
  );
  Prism.languages.astro.tag.inside["tag"].pattern = /^<\/?[^\s>\/]*/i;
  Prism.languages.astro.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[^]|[^\\"])*"|'(?:\\[^]|[^\\'])*'|[^\s'">]+)/i;
  Prism.languages.astro.tag.inside["tag"].inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
  Prism.languages.astro.tag.inside["comment"] = script["comment"];
  Prism.languages.insertBefore(
    "inside",
    "attr-name",
    {
      spread: {
        pattern: re(/<SPREAD>/.source),
        inside: Prism.languages.astro
      }
    },
    Prism.languages.astro.tag
  );
  Prism.languages.insertBefore(
    "inside",
    "special-attr",
    {
      script: {
        // Allow for two levels of nesting
        pattern: re(/=<BRACES>/.source),
        inside: {
          "script-punctuation": {
            pattern: /^=(?={)/,
            alias: "punctuation"
          },
          rest: Prism.languages.astro
        },
        alias: `language-${scriptLang}`
      }
    },
    Prism.languages.astro.tag
  );
  let stringifyToken = function(token) {
    if (!token) {
      return "";
    }
    if (typeof token === "string") {
      return token;
    }
    if (typeof token.content === "string") {
      return token.content;
    }
    return token.content.map(stringifyToken).join("");
  };
  let walkTokens = function(tokens) {
    let openedTags = [];
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      if (token.type === "style") {
        return;
      }
      let notTagNorBrace = false;
      if (typeof token !== "string") {
        if (token.type === "tag" && token.content[0] && token.content[0].type === "tag") {
          if (token.content[0].content[0].content === "</") {
            if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
              openedTags.pop();
            }
          } else {
            if (token.content[token.content.length - 1].content === "/>") ; else {
              openedTags.push({
                tagName: stringifyToken(token.content[0].content[1]),
                openedBraces: 0
              });
            }
          }
        } else if (openedTags.length > 0 && token.type === "punctuation" && token.content === "{") {
          openedTags[openedTags.length - 1].openedBraces++;
        } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === "punctuation" && token.content === "}") {
          openedTags[openedTags.length - 1].openedBraces--;
        } else {
          notTagNorBrace = true;
        }
      }
      if (notTagNorBrace || typeof token === "string") {
        if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
          let plainText = stringifyToken(token);
          if (i < tokens.length - 1 && (typeof tokens[i + 1] === "string" || tokens[i + 1].type === "plain-text")) {
            plainText += stringifyToken(tokens[i + 1]);
            tokens.splice(i + 1, 1);
          }
          if (i > 0 && (typeof tokens[i - 1] === "string" || tokens[i - 1].type === "plain-text")) {
            plainText = stringifyToken(tokens[i - 1]) + plainText;
            tokens.splice(i - 1, 1);
            i--;
          }
          tokens[i] = new Prism.Token("plain-text", plainText, void 0, plainText);
        }
      }
      if (token.content && typeof token.content !== "string") {
        walkTokens(token.content);
      }
    }
  };
  Prism.hooks.add("after-tokenize", function(env) {
    if (env.language !== "astro") {
      return;
    }
    walkTokens(env.tokens);
  });
}

const languageMap = /* @__PURE__ */ new Map([["ts", "typescript"]]);
function runHighlighterWithAstro(lang, code) {
  if (!lang) {
    lang = "plaintext";
  }
  let classLanguage = `language-${lang}`;
  const ensureLoaded = (language) => {
    if (language && !Prism$1.languages[language]) {
      loadLanguages$1([language]);
    }
  };
  if (languageMap.has(lang)) {
    ensureLoaded(languageMap.get(lang));
  } else if (lang === "astro") {
    ensureLoaded("typescript");
    addAstro(Prism$1);
  } else {
    ensureLoaded("markup-templating");
    ensureLoaded(lang);
  }
  if (lang && !Prism$1.languages[lang]) {
    console.warn(`Unable to load the language: ${lang}`);
  }
  const grammar = Prism$1.languages[lang];
  let html = code;
  if (grammar) {
    html = Prism$1.highlight(code, grammar, lang);
  }
  return { classLanguage, html };
}

const $$Astro$a = createAstro();
const $$Prism = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Prism;
  const { class: className, lang, code } = Astro2.props;
  const { classLanguage, html } = runHighlighterWithAstro(lang, code);
  return renderTemplate`${maybeRenderHead()}<pre${addAttribute([className, classLanguage].filter(Boolean).join(" "), "class")}><code${addAttribute(classLanguage, "class")}>${unescapeHTML(html)}</code></pre>`;
}, "/home/leo/projects/MetaScript/node_modules/.pnpm/@astrojs+prism@3.0.0/node_modules/@astrojs/prism/Prism.astro", void 0);

const $$Astro$9 = createAstro();
const $$CodeBlock = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$CodeBlock;
  const {
    meta: { tag, type, ...el }
  } = Astro2.props;
  let code = "";
  Object.entries(el).forEach((i) => code = code + ` ${i[0]}="${i[1]}"`);
  return renderTemplate`${maybeRenderHead()}<div class="!px-0"> ${renderComponent($$result, "Prism", $$Prism, { "lang": "html", "code": `<${tag}${code} >`, "class": "rounded !m-0 code_block" })} </div>`;
}, "/home/leo/projects/MetaScript/src/components/CodeBlock.astro", void 0);

const $$Astro$8 = createAstro();
const $$Article = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Article;
  const { title, tag, id, img, ...props } = Astro2.props;
  return renderTemplate`${title && renderTemplate`${maybeRenderHead()}<article class="w-full space-y-2"${addAttribute(`${id}`, "id")}><header class="relative group"><a${addAttribute(`#${id}`, "href")} class="opacity-80 font-medium text-xl">${title}<span class="opacity-60 text-xs ">${` <${tag} >`}</span></a><p class=" absolute top-0 -left-3 md:-left-4  group-hover:text-cyan-600 group-hover:opacity-60 text-xl md:opacity-20 transition-all opacity-0">
#
</p></header><div${spreadAttributes(props)} class="space-y-1.5">${img && renderTemplate`<div class="aspect-video"><img${addAttribute(img, "src")} class="rounded aspect-video object-cover"${addAttribute(`${title} image`, "alt")}></div>`}${renderSlot($$result, $$slots["default"])}</div></article>`}`;
}, "/home/leo/projects/MetaScript/src/components/Article.astro", void 0);

const $$Astro$7 = createAstro();
const $$IconsGalery = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$IconsGalery;
  const { icons } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Article", $$Article, { "id": "icons", "title": "Galery icons", "tag": "link" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="flex flex-col md:flex-row gap-8 flex-wrap"> ${icons.map((icon) => renderTemplate`<div class="flex flex-col gap-1 items-center"> <img class="rounded max-h-32"${addAttribute(icon.url, "src")}${addAttribute(`${icon?.rel} ${icon?.sizes ?? ""}`, "alt")}> <p class="opacity-50 font-light text-xs"> ${icon?.rel} ${icon.sizes} </p> </div>`)} </section> ` })}`;
}, "/home/leo/projects/MetaScript/src/components/IconsGalery.astro", void 0);

const $$Astro$6 = createAstro();
const $$ArrowLeft = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ArrowLeft;
  const { ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${spreadAttributes(props)}> <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"></path> </svg>`;
}, "/home/leo/projects/MetaScript/src/icons/ArrowLeft.astro", void 0);

const $$Astro$5 = createAstro();
const $$LinkNav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$LinkNav;
  const { name, label } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li> <a class="opacity-50 hover:opacity-60 w-fit group text-xs capitalize inline-flex"${addAttribute(`#${name}`, "href")}> ${label ?? name} <span class="group-hover:opacity-100 opacity-0 ml-2">${renderComponent($$result, "ArrowLeft", $$ArrowLeft, { "class": "h-4 w-4" })}</span> </a> </li>`;
}, "/home/leo/projects/MetaScript/src/components/LinkNav.astro", void 0);

const $$Astro$4 = createAstro();
const $$OpenGraph = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$OpenGraph;
  const { og } = Astro2.props;
  let ogData = {};
  og.forEach((meta) => {
    ogData[meta.property] = meta.content;
  });
  return renderTemplate`${renderComponent($$result, "Article", $$Article, { "title": "Open Graph", "id": "og", "tag": "meta", "img": ogData["og:image"] }, { "default": ($$result2) => renderTemplate`${Object.values(og).map((i) => renderTemplate`${renderComponent($$result2, "CodeBlock", $$CodeBlock, { "meta": i })}`)}` })}`;
}, "/home/leo/projects/MetaScript/src/components/OpenGraph.astro", void 0);

const $$Astro$3 = createAstro();
const $$SideHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SideHeader;
  const { data, icons } = Astro2.props;
  return renderTemplate`${icons && renderTemplate`${maybeRenderHead()}<img class="h-12 w-12 rounded" width="48" height="48"${addAttribute(icons[0]?.url, "src")}${addAttribute(icons[0]?.rel, "alt")}>`}${data["theme-color"] && renderTemplate`<div class="h-6 w-6 rounded group relative border border-opacity-80"${addAttribute({ backgroundColor: data["theme-color"]?.content }, "style")}><p class="absolute -left-10 -bottom-7 w-24 bg-white px-2 py-1.5 z-10 text-center text-xs rounded shadow-xl opacity-0 group-hover:opacity-100 text-black/80 transition-opacity">
theme color
</p></div>`}`;
}, "/home/leo/projects/MetaScript/src/components/SideHeader.astro", void 0);

const $$Astro$2 = createAstro();
const $$TwitterSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TwitterSection;
  const { twitter } = Astro2.props;
  const data = {};
  for (const key in twitter) {
    if (Object.prototype.hasOwnProperty.call(twitter, key)) {
      if (twitter[key].name !== void 0) {
        data[twitter[key].name] = twitter[key].content;
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Article", $$Article, { "title": "Twitter", "tag": "meta", "id": "twitter", "img": data["twitter:image"] || data["twitter:image:src"] }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="space-y-1"> ${Object.entries(data).map(
    (data2) => data2[0] !== "image" && renderTemplate`<div class="text-sm  gap-x-0.5"> <p class="inline-flex opacity-80 font-medium capitalize"> ${data2[0]}:
</p> ${data2[0] === "creator" || data2[0] === "site" ? renderTemplate`<a${addAttribute(`https://twitter.com/${data2[1]}`, "href")} target="_blank" class="opacity-80 text-cyan-600"> ${data2[1]} </a>` : renderTemplate`<span class="opacity-60 "> ${!data2[1].includes("https") ? data2[1] : renderTemplate`<a class="text-cyan-600"${addAttribute(data2[1], "href")} target="_blank">
Open link
</a>`} </span>`} </div>`
  )} </section> ${Object.values(twitter).map((i) => renderTemplate`${renderComponent($$result2, "CodeBlock", $$CodeBlock, { "meta": i })}`)}` })}`;
}, "/home/leo/projects/MetaScript/src/components/TwitterSection.astro", void 0);

const $$Astro$1 = createAstro();
const $$MetaDataPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MetaDataPage;
  const { url } = Astro2;
  const urlQuery = url.searchParams.get("url");
  const urlFetch = new URL(urlQuery);
  let jsonFetch = {};
  try {
    const data2 = await getInfoPages(urlQuery);
    jsonFetch = { ...data2 };
  } catch (error) {
    Astro2.redirect("/");
  }
  const { icons, og, twitter, title, description, ...data } = jsonFetch;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Extract" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<nav class="flex justify-between items-center px-4 md:px-16 lg:px-32 py-2 border-b bg-white"> <a href="/" class="text-3xl gap-1 opacity-80 hover:scale-105 transition-transform">[ L | T ]</a> <a href="https://github.com/LeonardoT-V"> <svg viewBox="0 0 256 250" width="30" height="30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" fill="#545454"></path></svg> </a> </nav> <section class="flex justify-center flex-col items-center gap-2 py-8 px-4 md:px-16 lg:px-32"> <h1 class="text-3xl opacity-80 font-semibold text-center">
Scrape Meta Tags
</h1> <p class="opacity-60 text-center font-medium">
Preview and exam meta tags in you <span class="text-cyan-500">${"</html>"}</span> </p> <form class="flex gap-2 items-center"> <input name="url" type="url" placeholder="https://metascript.com" class="border py-1.5 px-4 w-64 rounded text-black/80"${addAttribute(urlQuery, "value")}> <button type="submit" class="bg-black/80 text-white font-bold shadow-md hover:shadow-lg transition rounded py-1.5 px-4">Extract</button> </form> </section> <main class="flex flex-col lg:flex-row px-4 md:px-16 lg:px-32 py-4 lg:py-8 gap-0 lg:gap-16"> <aside class="lg:w-96 md:min-w-96 lg:border-r pr-8 py-4 lg:py-8 flex gap-4"> <div class="min-w-12 flex flex-col items-center gap-2"> ${renderComponent($$result2, "SideHeader", $$SideHeader, { "data": data, "icons": icons })} </div> <section class="space-y-2.5 w-full"> <header class=""> <h3 class="text-xl font-medium opacity-80 text-balance"> ${urlFetch.host} </h3> <h5 class="text-sm text-cyan-600 opacity-80 text-balance"> ${title?.content} </h5> <p class="text-sm text-balance opacity-50"> ${description?.content} </p> </header> <section class="space-y-1"> <h5 class="opacity-80 font-medium text-sm">Keywords</h5> <div class="flex flex-wrap gap-x-1.5 gap-y-1 items-center"> ${data?.keywords?.content.split(",").map((keyword) => renderTemplate`<p class="border px-3 py-1 text-xs rounded-full text-black/80 bg-white"> ${keyword} </p>`)} </div> </section> <nav class="space-y-1"> <h5 class="opacity-80 font-medium text-sm">Meta</h5> <ul class="space-y-1.5"> ${og && renderTemplate`${renderComponent($$result2, "LinkNav", $$LinkNav, { "name": "og", "label": "Open Graph" })}`} ${twitter && renderTemplate`${renderComponent($$result2, "LinkNav", $$LinkNav, { "name": "twitter" })}`} ${icons && renderTemplate`${renderComponent($$result2, "LinkNav", $$LinkNav, { "name": "icons", "label": "Galery Icons" })}`} ${Object.getOwnPropertyNames(data).map(
    (meta) => data[meta].name && renderTemplate`${renderComponent($$result2, "LinkNav", $$LinkNav, { "name": data[meta].name })}`
  )} </ul> </nav> </section> </aside> <section class="flex-1 md:pr-4 py-4 lg:py-8 space-y-8 lg:max-w-prose"> ${og && renderTemplate`${renderComponent($$result2, "OpenGraph", $$OpenGraph, { "og": og })}`} ${icons && renderTemplate`${renderComponent($$result2, "IconsGalery", $$IconsGalery, { "icons": icons })}`} ${twitter && renderTemplate`${renderComponent($$result2, "TwitterSection", $$TwitterSection, { "twitter": twitter })}`} ${Object.getOwnPropertyNames(data).map((meta) => renderTemplate`${renderComponent($$result2, "Article", $$Article, { "id": data[meta].name, "title": data[meta]?.name?.replaceAll("-", " "), "tag": data[meta].tag }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Code", $$CodeBlock, { "meta": data[meta] })} ` })}`)} </section> </main> ` })}`;
}, "/home/leo/projects/MetaScript/src/components/MetaDataPage.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { url } = Astro2;
  const urlQuery = url.searchParams.get("url") || "";
  return renderTemplate`${urlQuery === "" ? renderTemplate`${renderComponent($$result, "MainPage", $$MainPage, {})}` : renderTemplate`${renderComponent($$result, "MetaDataPage", $$MetaDataPage, {})}`}`;
}, "/home/leo/projects/MetaScript/src/pages/index.astro", void 0);

const $$file = "/home/leo/projects/MetaScript/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { getInfoPages as g, index as i };

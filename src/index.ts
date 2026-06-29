/*
MIT License

Copyright (c) 2026 Bugs5382

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
import path from "path";
import { fileURLToPath } from "url";
import type { LoadContext, Plugin } from "@docusaurus/types";

/**
 * Resolve this module's directory. tsdown emits both ESM and CJS; it rewrites
 * `import.meta.url` to the equivalent in the CJS bundle, so this works in both.
 */
function moduleDir(): string {
  return path.dirname(fileURLToPath(import.meta.url));
}

/**
 * Docusaurus theme plugin for the rabbit hole docs sites.
 *
 * It contributes the swizzleable theme components (the collapsible right-side
 * table of contents) so they resolve through `@theme`. Add it to the `plugins`
 * array in a site's `docusaurus.config.ts`. The brand CSS and the landing
 * component are consumed separately — see the package README.
 *
 * @example
 * ```ts
 * import type { Config } from "@docusaurus/types";
 *
 * const config: Config = {
 *   plugins: ["@the-rabbit-hole-tech/docs-theme"],
 *   presets: [
 *     [
 *       "classic",
 *       {
 *         theme: {
 *           customCss: require.resolve(
 *             "@the-rabbit-hole-tech/docs-theme/styles/custom.css",
 *           ),
 *         },
 *       },
 *     ],
 *   ],
 * };
 * ```
 */
export default function docsTheme(_context: LoadContext, _options: unknown): Plugin<undefined> {
  return {
    name: "@the-rabbit-hole-tech/docs-theme",
    getThemePath() {
      // Compiled theme components (Docusaurus does not run the TS loader over
      // node_modules, so these must be JS). They sit next to the compiled
      // plugin entry in `dist/`.
      return path.join(moduleDir(), "theme");
    },
    getTypeScriptThemePath() {
      // TS source, used by `docusaurus swizzle --typescript`.
      return path.join(moduleDir(), "..", "src", "theme");
    },
  };
}

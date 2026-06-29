/*
MIT License

Copyright (c) 2026 Shane

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
import { themes as prismThemes } from "prism-react-renderer";

/**
 * The brand color mode: dark by default, and the site does not follow the OS
 * preference (the brand is dark-first). Spread into `themeConfig`.
 */
export const colorMode = {
  defaultMode: "dark",
  respectPrefersColorScheme: false,
} as const;

/**
 * The brand prism (code highlighting) config. Dark theme matches the dark-first
 * palette. Extend `additionalLanguages` with whatever a given site needs.
 */
export const prism = {
  theme: prismThemes.github,
  darkTheme: prismThemes.dracula,
  additionalLanguages: ["bash", "json"] as string[],
};

/**
 * Recommended `themeConfig` fragment carrying the brand defaults (dark color
 * mode, a hideable/auto-collapsing docs sidebar, and the brand prism config).
 * Spread it into a site's `themeConfig` and layer site-specific `navbar` /
 * `footer` on top.
 *
 * @example
 * ```ts
 * import { recommendedThemeConfig } from "@the-rabbit-hole-tech/docs-theme/config";
 *
 * const themeConfig = {
 *   ...recommendedThemeConfig,
 *   navbar: { title: "my site", items: [] },
 *   footer: { style: "dark", links: [] },
 * };
 * ```
 */
export const recommendedThemeConfig = {
  colorMode,
  docs: {
    sidebar: { hideable: true, autoCollapseCategories: true },
  },
  prism,
};

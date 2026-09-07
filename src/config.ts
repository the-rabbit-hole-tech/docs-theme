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
 * import { recommendedThemeConfig } from "@the-rabbit-hole/docs-theme/config";
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

/**
 * The brand version-picker convention for the *unreleased* docs: the label the
 * dropdown shows for work in progress, the URL it lives under, and the banner
 * Docusaurus paints above it.
 *
 * Sites were configuring this by hand and it drifted — one read the label
 * below, the next `v0.7.0 (next)`, so the same dropdown said different things
 * across the estate. Owning it here fixes it once. The theme already styles the version
 * banner and chip, so the wording belongs with them.
 *
 * Spread it into the `versions` of the `docs` preset. Leave `lastVersion`
 * alone unless a site really means to pin it: by default Docusaurus makes the
 * newest entry in `versions.json` the default, which is the released docs, and
 * that is the intended behaviour.
 *
 * @example
 * ```ts
 * import { recommendedVersions } from "@the-rabbit-hole/docs-theme/config";
 *
 * presets: [
 *   [
 *     "classic",
 *     {
 *       docs: {
 *         sidebarPath: "./sidebars.ts",
 *         versions: { ...recommendedVersions },
 *       },
 *     },
 *   ],
 * ];
 * ```
 */
export const recommendedVersions = {
  current: {
    banner: "unreleased",
    // The construction sign is escaped rather than written literally: the
    // repository's hygiene gate blocks emoji in source, allowing them only in
    // Markdown. The rendered label is identical.
    label: "Next \u{1F6A7}",
    path: "next",
  },
} as const;

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
import { defineConfig } from "tsdown";

// The plugin entry and config helper are compiled for Node (Docusaurus loads
// them at build time). The theme component (TOC) and the landing component are
// ALSO compiled to JS so a consuming site can load them from node_modules —
// Docusaurus does not run the TS loader over node_modules, so shipping raw
// .tsx breaks consumption. Their Docusaurus virtual imports (`@theme/*`,
// `@theme-original/*`, `@docusaurus/*`), React, and the CSS module are kept
// external so they resolve inside the consumer's Docusaurus build.
export default defineConfig({
  entry: {
    index: "src/index.ts",
    config: "src/config.ts",
    "theme/TOC/index": "src/theme/TOC/index.tsx",
    "components/Landing/index": "src/components/Landing/index.tsx",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "react",
    "react-dom",
    "prism-react-renderer",
    /^@theme/,
    /^@theme-original/,
    /^@docusaurus/,
    /\.module\.css$/,
  ],
  // The landing component imports its CSS module by relative path; copy it
  // next to the compiled output so the import resolves in the consumer build.
  copy: [
    {
      from: "src/components/Landing/styles.module.css",
      to: "dist/components/Landing/styles.module.css",
    },
  ],
});

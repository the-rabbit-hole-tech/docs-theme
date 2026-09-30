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
import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

const root = join(__dirname, "..");
const read = (file: string): string =>
  readFileSync(join(root, "styles", file), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

type Declarations = Record<string, string>;

// Collects the custom properties declared in every rule whose selector list is
// exactly `selector`. Enough for these flat stylesheets; not a CSS parser.
function declarations(css: string, selector: string): Declarations {
  const found: Declarations = {};
  for (const [, head, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if ((head ?? "").split(";").pop()?.trim() !== selector) continue;
    for (const [, name, value] of (body ?? "").matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      found[name as string] = (value as string).replace(/\s+/g, " ").trim();
    }
  }
  return found;
}

const readsVars = (css: string): string[] =>
  [...new Set([...css.matchAll(/var\((--rhl-[\w-]+)\)/g)].map((m) => m[1] as string))].sort();

const greys = read("greys.css");
const soil = read("soil.css");
const base = read("base.css");

// The soil ramp as recorded in ux-ui's packages/tokens.css. Ported, never
// re-derived: if ux-ui moves a value, this table moves with it.
const soilRaw: Declarations = {
  "--rh-soil-surface": "30 40% 21%",
  "--rh-soil-1": "32 40% 18%",
  "--rh-soil-2": "29 39% 15%",
  "--rh-soil-3": "29 40% 12%",
  "--rh-soil-4": "27 42% 9%",
  "--rh-soil-5": "30 53% 7%",
  "--rh-chamber-top": "29 37% 12%",
  "--rh-chamber-body": "28 36% 10%",
  "--rh-chamber-deep": "28 35% 10%",
  "--rh-chamber-floor": "32 46% 7%",
  "--rh-card-top": "29 32% 15%",
  "--rh-card-bottom": "30 38% 10%",
  "--rh-bore-dark": "27 43% 4%",
  "--rh-bore-mid": "28 36% 10%",
  "--rh-void": "30 50% 3%",
  "--rh-page-bg": "28 26% 7%",
  "--rh-text-bright": "35 46% 91%",
  "--rh-text-primary": "37 39% 88%",
  "--rh-text-body": "36 25% 73%",
  "--rh-text-body-dim": "35 21% 67%",
  "--rh-text-muted": "35 19% 62%",
  "--rh-text-meta": "33 17% 56%",
  "--rh-text-label": "36 27% 43%",
  "--rh-amber": "39 47% 54%",
  "--rh-amber-hover": "37 63% 67%",
  "--rh-amber-light": "38 31% 59%",
  "--rh-rim-light": "36 39% 62%",
  "--rh-green": "80 30% 51%",
  "--rh-slate": "203 22% 64%",
  "--rh-rust": "14 40% 54%",
  "--rh-lilac": "274 27% 78%",
  "--rh-border-base": "32 36% 35%",
  "--rh-border": "hsl(var(--rh-border-base) / 0.4)",
  "--rh-border-strong": "hsl(var(--rh-border-base) / 0.55)",
  "--rh-border-faint": "hsl(var(--rh-border-base) / 0.22)",
};

const greyHexes = [
  "#222222",
  "#303030",
  "#121212",
  "#0b1119",
  "#c9c9c9",
  "#a8a8a8",
  "#444444",
  "#565656",
  "#5b5b5b",
  "#84a82a",
  "#d99a2b",
  "#c0392b",
];

describe("palette selection", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
    exports: Record<string, unknown>;
  };

  it("exports a stylesheet per palette, plus the default", () => {
    expect(pkg.exports["./styles/greys.css"]).toBe("./styles/greys.css");
    expect(pkg.exports["./styles/soil.css"]).toBe("./styles/soil.css");
    expect(pkg.exports["./styles/custom.css"]).toBe("./styles/custom.css");
  });

  it("keeps the default stylesheet on the greys, so upgrading changes nothing", () => {
    expect(read("custom.css").trim()).toBe('@import url("./greys.css");');
  });

  it("builds both palettes on the same shared base", () => {
    expect(greys).toContain('@import url("./base.css");');
    expect(soil).toContain('@import url("./base.css");');
  });
});

describe("greys palette", () => {
  it("carries the values that shipped before the soil palette existed", () => {
    expect(declarations(greys, '[data-theme="dark"]')).toMatchObject({
      "--ifm-color-primary": "#a8a8a8",
      "--ifm-background-color": "#222222",
      "--ifm-background-surface-color": "#303030",
      "--ifm-navbar-background-color": "#121212",
      "--ifm-footer-background-color": "#0b1119",
      "--ifm-color-content": "#c9c9c9",
      "--ifm-heading-color": "#ffffff",
      "--ifm-color-success": "#84a82a",
      "--ifm-color-warning": "#d99a2b",
      "--ifm-color-danger": "#c0392b",
    });
    expect(declarations(greys, ":root")["--ifm-font-family-base"]).toMatch(/^"Inter"/);
  });

  it("carries nothing from the soil palette", () => {
    expect(greys).not.toMatch(/--rh-/);
    expect(greys).not.toMatch(/hsl\(/);
  });
});

describe("soil palette", () => {
  const rootVars = declarations(soil, ":root");
  const dark = declarations(soil, '[data-theme="dark"]');

  it("ports the raw ramp from ux-ui unchanged", () => {
    expect(rootVars).toMatchObject(soilRaw);
  });

  it("sets every Infima token the greys set", () => {
    const greyDark = Object.keys(declarations(greys, '[data-theme="dark"]'));
    expect(Object.keys(dark)).toEqual(expect.arrayContaining(greyDark));
  });

  it("maps the Infima tokens onto the ramp the way ux-ui's semantic layer does", () => {
    expect(dark).toMatchObject({
      "--ifm-color-primary": "hsl(var(--rh-amber))",
      "--ifm-link-hover-color": "hsl(var(--rh-amber-hover))",
      "--ifm-background-color": "hsl(var(--rh-soil-2))",
      "--ifm-background-surface-color": "hsl(var(--rh-card-top))",
      "--ifm-color-content": "hsl(var(--rh-text-body))",
      "--ifm-color-content-secondary": "hsl(var(--rh-text-meta))",
      "--ifm-heading-color": "hsl(var(--rh-text-bright))",
      "--ifm-color-success": "hsl(var(--rh-green))",
      "--ifm-color-danger": "hsl(var(--rh-rust))",
    });
  });

  it("derives the primary shades from amber's hue and saturation", () => {
    for (const shade of ["dark", "darker", "darkest", "light", "lighter", "lightest"]) {
      expect(dark[`--ifm-color-primary-${shade}`]).toMatch(/^hsl\(39 47% [\d.]+%\)$/);
    }
  });

  it("uses Oswald as the base and display face", () => {
    expect(rootVars["--ifm-font-family-base"]).toMatch(/^"Oswald"/);
    expect(rootVars["--ifm-heading-font-family"]).toMatch(/^"Oswald"/);
    expect(soil).not.toMatch(/Inter|JetBrains/);
  });

  it("carries nothing from the greys palette", () => {
    for (const hex of greyHexes) expect(soil.toLowerCase()).not.toContain(hex);
    expect(soil).not.toMatch(/144,\s*193,\s*243/);
  });
});

describe("shared base", () => {
  it("defines every theme variable it reads in both palettes", () => {
    const needed = readsVars(base);
    expect(needed.length).toBeGreaterThan(0);
    expect(Object.keys(declarations(greys, ":root"))).toEqual(expect.arrayContaining(needed));
    expect(Object.keys(declarations(soil, ":root"))).toEqual(expect.arrayContaining(needed));
  });

  it("holds no palette colour of its own", () => {
    // The version banner is sky-blue in every palette (the sky-blue rule), and
    // a black drop shadow belongs to no palette; everything else comes in
    // through variables.
    const outsideBanner = base.replace(/\.theme-doc-version-banner[^{]*\{[^}]*\}/g, "");
    const literals = outsideBanner.match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsl\([^)]*\)/gi) ?? [];
    expect(literals.filter((l) => !/^rgba\(0, 0, 0,/.test(l))).toEqual([]);
  });
});

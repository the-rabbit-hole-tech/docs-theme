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
import { describe, expect, it } from "vitest";
import { colorMode, prism, recommendedThemeConfig } from "./config.js";

describe("recommended config", () => {
  it("defaults to the dark, brand-fixed color mode", () => {
    expect(colorMode.defaultMode).toBe("dark");
    expect(colorMode.respectPrefersColorScheme).toBe(false);
  });

  it("ships a dark prism theme with bash and json enabled", () => {
    expect(prism.additionalLanguages).toContain("bash");
    expect(prism.additionalLanguages).toContain("json");
    expect(prism.darkTheme).toBeTruthy();
  });

  it("bundles color mode and prism into the recommended theme config", () => {
    expect(recommendedThemeConfig.colorMode).toBe(colorMode);
    expect(recommendedThemeConfig.prism).toBe(prism);
    expect(recommendedThemeConfig.docs.sidebar.hideable).toBe(true);
  });
});

# @the-rabbit-hole/docs-theme 🐇

> 📚 Shared Docusaurus theme for the rabbit hole docs sites.

A dark-first brand theme for [Docusaurus](https://docusaurus.io) v3: the brand
CSS tokens, a collapsible right-side table of contents, a reusable landing-page
template, and a recommended config fragment. Drop it into any rabbit hole docs
site so they all look and behave the same.

## 📦 Install

```bash
npm install @the-rabbit-hole/docs-theme
```

🌍 Public npm — no registry configuration and no token.

It expects Docusaurus and React as peers, which a Docusaurus site already has:

```bash
npm install @docusaurus/core @docusaurus/preset-classic react react-dom prism-react-renderer
```

## 🚀 Use

### 1. Brand CSS and palette

The theme carries two palettes. Pick one by adding its stylesheet to
`theme.customCss`; it brings the tokens, the fonts, the navbar/footer borders,
the version banner/chip, the TOC toggle and the landing styles as one piece:

| Stylesheet          | Palette                                                             | For                                                                       |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `styles/greys.css`  | Neutral greys, a grey accent, Inter body with Oswald headings       | Tools documented in the house style, such as the Go libraries             |
| `styles/soil.css`   | The warm soil ramp from `ux-ui`, an amber accent, Oswald throughout | The rabbit hole's own sites, so the docs look like the product they cover |
| `styles/custom.css` | The greys (the default)                                             | Sites set up before the soil palette existed; nothing changes on upgrade  |

```ts
// docusaurus.config.ts
presets: [
  [
    "classic",
    {
      theme: {
        customCss: require.resolve("@the-rabbit-hole/docs-theme/styles/soil.css"),
      },
    },
  ],
];
```

Load one palette, not both: each sets the same variables, so the second would
win outright. Both are dark palettes and pair with the dark color mode in the
recommended config fragment below; the soil palette sets no light-mode accent at
all, so a soil site should stay dark.

⚠️ **Don't let your own `custom.css` fight the palette.** A site that still
carries the Docusaurus template's `custom.css` (its green or teal
`--ifm-color-primary` ramp) and loads it after the theme's stylesheet overrides
the brand, and ends up with, say, teal headings on a dark ground. Delete those
template defaults, and keep only rules the site really needs in its own file.

### 2. Theme plugin (collapsible TOC)

Register the plugin so the swizzled components resolve through `@theme`. Today
it contributes the collapsible right-side table of contents:

```ts
// docusaurus.config.ts
plugins: ["@the-rabbit-hole/docs-theme"];
```

### 3. Recommended config fragment

Spread the brand defaults (dark color mode, hideable docs sidebar, prism with a
dark theme) into `themeConfig`, then add your site's own navbar and footer:

```ts
// docusaurus.config.ts
import { recommendedThemeConfig } from "@the-rabbit-hole/docs-theme/config";

const themeConfig = {
  ...recommendedThemeConfig,
  navbar: { title: "my site", items: [] },
  footer: { style: "dark", links: [] },
};
```

The brand favicon ships with the package; reference it directly or copy it into
your site's `static/img`:

```ts
favicon: "img/favicon.svg";
```

### 4. Version picker

If the site has versioned docs, spread `recommendedVersions` into the `docs`
preset's `versions`. It sets the label, path and banner for the *unreleased*
docs so the dropdown reads the same on every site:

```ts
// docusaurus.config.ts
import { recommendedVersions } from "@the-rabbit-hole/docs-theme/config";

presets: [
  [
    "classic",
    {
      docs: {
        sidebarPath: "./sidebars.ts",
        versions: { ...recommendedVersions },
      },
    },
  ],
];
```

That gives `current` the label **Next 🚧**, the path `next`, and the
`unreleased` banner — which the theme already styles. Leave `lastVersion` alone
unless the site really means to pin it: by default Docusaurus makes the newest
entry in `versions.json` the default, which is the released docs.

Sites were configuring this by hand and it drifted — one dropdown read
`Next 🚧`, another `v0.7.0 (next)`. The wording belongs with the banner styling
that the theme already owns.

### 5. Landing page (optional)

Build a branded home page by importing the `Landing` template into your site's
`src/pages/index.tsx` and supplying your own copy. The hero falls back to the
site `title`/`tagline` when you do not pass them:

```tsx
// src/pages/index.tsx
import Landing from "@the-rabbit-hole/docs-theme/landing";

export default function Home(): JSX.Element {
  return (
    <Landing
      buttons={[
        { label: "Get started", to: "/docs", variant: "secondary" },
        { label: "GitHub", href: "https://github.com/the-rabbit-hole-tech" },
      ]}
      features={[
        { title: "Dark-first", body: "The brand palette, out of the box." },
        { title: "Consistent", body: "One theme across every docs site." },
        { title: "Idiomatic", body: "Standard Docusaurus swizzle + plugin." },
      ]}
      quickstart={{
        title: "Quickstart",
        lede: "Install and run:",
        code: "npm install\nnpm run start",
        language: "bash",
        cta: { label: "Read the docs", to: "/docs", variant: "primary" },
      }}
    />
  );
}
```

## 🎨 Brand token contract

Both palettes set the same Infima variables on `[data-theme="dark"]` (the brand
default), so switching palettes is a change of stylesheet, not a list of
overrides. Override a token in your own later-loaded
CSS only if a site really needs to, and stay within the palette it picked:

| Token                            | Greys (dark) | Soil (dark)                  | Meaning         |
| -------------------------------- | ------------ | ---------------------------- | --------------- |
| `--ifm-background-color`         | `#222222`    | `--rh-soil-2` `#372718`      | Page surface    |
| `--ifm-background-surface-color` | `#303030`    | `--rh-card-top` `#33261a`    | Raised surface  |
| `--ifm-navbar-background-color`  | `#121212`    | `--rh-soil-5` `#1a1108`      | Navbar          |
| `--ifm-footer-background-color`  | `#0b1119`    | `--rh-soil-4` `#22170e`      | Footer          |
| `--ifm-color-content`            | `#c9c9c9`    | `--rh-text-body` `#cbbda8`   | Body text       |
| `--ifm-heading-color`            | `#ffffff`    | `--rh-text-bright` `#f2e9dc` | Headings        |
| `--ifm-color-primary`            | `#a8a8a8`    | `--rh-amber` `#c19a52`       | Link and accent |
| `--ifm-color-success`            | `#84a82a`    | `--rh-green` `#8fa85c`       | Success status  |
| `--ifm-color-warning`            | `#d99a2b`    | `--rh-amber-hover` `#e0b878` | Warning status  |
| `--ifm-color-danger`             | `#c0392b`    | `--rh-rust` `#b8705a`        | Error status    |

The soil stylesheet also sets `--ifm-link-hover-color` (`--rh-amber-hover`) and
`--ifm-color-content-secondary` (`--rh-text-meta`), and it exposes the whole raw
ramp from `ux-ui`'s `tokens.css` as `--rh-*` HSL triples on `:root`, so a soil
site can reach the rest of the palette with `hsl(var(--rh-chamber-top))` or
`hsl(var(--rh-amber) / 0.2)` rather than copying hex values.

Fonts, loaded via a Google Fonts import at the top of each stylesheet:

- **Greys:** Oswald (headings), Inter (body), JetBrains Mono (code).
- **Soil:** Oswald (headings and body), the system monospace stack (code).

### The sky-blue rule

Sky-blue `#90c1f3` is reserved for the **header component** and the docs
**unreleased/next version callout** only. It is never a general body accent: the
body accent is monochrome grey in the greys palette and amber in the soil one.
The version banner is sky-blue in both. In the greys palette the landing hero
glow, ghost-button outline and card hover also use it; in the soil palette those
take amber.

## 🛠️ Develop

```bash
npm install
npm run build      # tsdown -> dist (plugin + config, esm + cjs + d.ts)
npm test           # vitest
npm run lint       # eslint + prettier
npm run typecheck  # tsc --noEmit
npm run docs       # typedoc -> docs
```

The plugin entry (`src/index.ts`) and config helper (`src/config.ts`) are
compiled to `dist`. The theme component (`src/theme/TOC`) and the landing
component (`src/components/Landing`) ship as **source** — Docusaurus compiles
them with its own `@theme` and CSS-module pipeline.

Commit discipline, AI-tell/emoji blocking, and the pre-push lint/test gate are
enforced by the governance hooks. Install them once per clone:

```bash
bash .claude/hooks/install.sh
```

## 🚢 Release

Publishing the GitHub Release runs **Release and Publish**
(`.github/workflows/action-deploy-npm.yaml`). It does not put the version on
npm directly. It runs `npm stage publish`, which uploads the tarball with
provenance to npm's stage queue, and nobody can install it until a maintainer
approves it with 2FA. A green run means "staged", not "live".

🔐 **Approve with 2FA.** The run's summary lists the stage id and the commands:

```bash
npm stage view <stage-id>      # what was staged
npm stage download <stage-id>  # fetch the tarball to inspect it
npm stage approve <stage-id>   # make it installable (2FA)
npm stage reject <stage-id>    # throw it away (2FA)
```

The Staged Packages tab on npmjs.com does the same. The job authenticates
through npm trusted publishing (OIDC), so it holds no npm token, and it fails
if nothing was staged: a version already on npm, a missing trusted publisher,
or an npm older than 11.15.0 all turn the run red.

## ⚖️ License

MIT (c) 2026 Bugs5382

# Changelog

## v1.0.0 - 2026-09-07

First release, published to public npm as `@the-rabbit-hole/docs-theme`.

A dark-first brand theme for Docusaurus v3: the brand CSS tokens, a collapsible
right-side table of contents, a reusable landing-page template, mermaid diagram
support, and a recommended config fragment, so every rabbit hole docs site looks
and behaves the same.

### What Changed 👀

#### 🚀 Features

- feat(theme): shared Docusaurus brand theme @Bugs5382
- feat(theme): add @docusaurus/theme-mermaid for mermaid diagram support @Bugs5382

#### 🐛 Bug Fixes

- fix(build): compile theme and landing components to JS for consumers @Bugs5382
- fix(landing): ship styles as global brand CSS, not a node_modules CSS module @Bugs5382
- fix(build): publish to the registry the workflow configures @Bugs5382 (#11)
- fix(ci): force v1.0.0 as the first version in the Release Manager @Bugs5382 (#15)

### Extra

**Full Changelog**: https://github.com/the-rabbit-hole-tech/docs-theme/commits/v1.0.0

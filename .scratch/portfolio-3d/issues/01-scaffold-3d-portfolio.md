# 01 — Scaffold the 3D Portfolio app

**What to build:** A dark, correctly-typefaced blank page that builds cleanly and has a working test runner. Opening it shows the design's ground colour and display typeface with the right browser-tab title — nothing else yet. This establishes the 3D Portfolio as the third sibling app under the App Layout, per ADR-0002.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] The app installs and produces a production build from its own directory, with its own lockfile, matching how the other two apps are installed under App Layout
- [ ] Build dependencies the toolchain requires are pre-approved, so a clean install completes without an interactive prompt
- [ ] The display typeface loads across the full weight range the design uses, and headings render in it
- [ ] The dark ground is applied from the document root through the app wrapper, with no light flash before first paint
- [ ] The gradient heading treatment is available as a reusable style for later sections
- [ ] Horizontal overflow is clipped at the page wrapper in a way that does not break sticky positioning later
- [ ] The browser tab shows the page title given in `design-spec.md`
- [ ] A test runner is configured and one test passes, proving the harness works
- [ ] The Live Portfolio, the Next Portfolio, and the GitHub Pages workflow are all unmodified

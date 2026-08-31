# 01 — Scaffold the 3D Portfolio app

**What to build:** A dark, correctly-typefaced blank page that builds cleanly and has a working test runner. Opening it shows the design's ground colour and display typeface with the right browser-tab title — nothing else yet. This establishes the 3D Portfolio as the third sibling app under the App Layout, per ADR-0002.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] The app installs and produces a production build from its own directory, with its own lockfile, matching how the other two apps are installed under App Layout
- [x] Build dependencies the toolchain requires are pre-approved, so a clean install completes without an interactive prompt
- [x] The display typeface loads across the full weight range the design uses, and headings render in it
- [x] The dark ground is applied from the document root through the app wrapper, with no light flash before first paint
- [x] The gradient heading treatment is available as a reusable style for later sections
- [x] Horizontal overflow is clipped at the page wrapper in a way that does not break sticky positioning later
- [x] The browser tab shows the page title given in `design-spec.md`
- [x] A test runner is configured and one test passes, proving the harness works
- [x] The Live Portfolio, the Next Portfolio, and the GitHub Pages workflow are all unmodified

## Comments

Built as `portfolio-3d/` on Vite 6 + React 18.3.1 + TypeScript + Tailwind 3.4, installed with pnpm
from its own `pnpm-lock.yaml`. `pnpm install --frozen-lockfile` on an empty `node_modules`, with
stdin closed, completes with no prompt and no ignored-build-scripts warning —
`pnpm-workspace.yaml` pre-approves `esbuild`, the one dependency in this toolchain with an install
script (confirmed by scanning `node_modules/.pnpm`). Note the key differs from the Next Portfolio's:
that app uses `ignoredBuiltDependencies` to *skip* `sharp` and `unrs-resolver`, whereas `esbuild`'s
postinstall has to actually run — it fetches the platform binary — so this app needs
`onlyBuiltDependencies`. Same file, same purpose, opposite key.

Two judgement calls worth a look during fidelity review:

- **Page title uses an em dash: `Jack — 3D Creator`.** `design-spec.md` writes it `Jack -- 3D
  Creator`, but the supplied block is ASCII-normalised throughout — it also writes `identities --
  from logos to full brand systems --` and `"Contact" -- evenly spaced`, where `--` is
  unambiguously an em dash, and it annotates typography when it matters ("curly apostrophe via
  `&apos;`"). The only real `—` in the file is in the repo-authored heading. **Signed off by the
  site owner and recorded as the third entry in `design-spec.md`'s "Deviations recorded in the
  spec" block**, so ticket 07 has it in writing. The same reading governs the services copy in
  sections 4 and 5.
- **`.hero-heading` is defined outside `@layer components`.** Inside a Tailwind layer it is purged
  from the build while no section uses it, which would leave this ticket's "available as a reusable
  style" criterion unverifiable until section 2 lands. `design-spec.md` describes it as a plain CSS
  class, so plain CSS it is, and it ships in `dist` today.

Scope notes: `App.tsx` renders the empty page wrapper only — "nothing else yet" — so the wrapper is
where section 2 mounts `<HeroSection />`. `framer-motion` is installed but not yet imported, so it
tree-shakes out and does not ship in this build; unlike `lucide-react` (not installed, per
`spec.md`) it has a consumer in section 2. The only Tailwind colour token defined is `ground` —
`#D7E2EA` waits for the nav in section 2 that first uses it. `src/smoke.test.ts` is a harness proof
and nothing more; the real unit-test seam is the pure scroll-arithmetic module, which arrives with
the sections that consume it.

`README.md` gained the third row of the App Layout table, a Getting Started block, and an explicit
"no Production Role, not a Cutover candidate, the Placeholder Identity is deliberate" note. Not one
of this ticket's criteria, but the change is what made the README contradict `CONTEXT.md`.

Verified: `pnpm build` (`tsc -b && vite build`) and `pnpm test` both pass; the built CSS carries
`html,body,#root{background:#0c0c0c}`, `font-family:Kanit,sans-serif`, and the `.hero-heading`
gradient; `dist/index.html` carries the Kanit 300–900 link, the pre-paint `<style>` that fixes the
dark ground before the stylesheet loads, and the title. `git status` shows `portfolio-3d/` as the
only change — `portfolio-react/`, `portfolio-next/`, and `.github/workflows/master.yml` are
untouched.

Status: ready-for-human

# Layout Land — sibling App Layout on master

## Problem Statement

The Live Portfolio still runs as a Create React App at the repository root on `master`, while a Content Parity Next Portfolio already exists on `convert-to-nextjs` under `portfolio-next/` (with the CRA copy under `portfolio-react/`). On disk, empty `portfolio-next/` / `portfolio-react/` directory shells also exist and do not match that branch. Until the sibling App Layout is on `master`, Cutover to Vercel cannot be prepared cleanly, and the repo layout disagrees with the decided destination.

## Solution

Land the sibling App Layout on `master`: `portfolio-react/` holds the CRA Live Portfolio, `portfolio-next/` holds the Next Portfolio at Content Parity (sourced from `convert-to-nextjs`). Point GitHub Pages CI at `portfolio-react/` so production stays unchanged. Do not perform production Cutover or Vercel setup in this work — that comes later per ADR-0001.

## User Stories

1. As the site owner, I want `master` to contain both `portfolio-next/` and `portfolio-react/` as sibling apps, so that the decided App Layout is real in the default branch.
2. As the site owner, I want the Next Portfolio on `master` to meet Content Parity with today’s Live Portfolio, so that Cutover later is a hosting switch, not a content rewrite.
3. As the site owner, I want GitHub Pages to keep deploying the CRA Live Portfolio from `portfolio-react/` after Layout Land, so that visitors see no change.
4. As the site owner, I want empty on-disk `portfolio-next/` / `portfolio-react/` shells removed or replaced by real app trees, so that the working tree matches git and is not misleading.
5. As the site owner, I want root-level CRA entrypoints removed or relocated into `portfolio-react/` as part of Layout Land, so that there is not a third competing app at the repo root.
6. As a developer, I want `pnpm install` and build to work inside `portfolio-react/`, so that the Live Portfolio remains maintainable.
7. As a developer, I want `pnpm install` and build to work inside `portfolio-next/`, so that the Next Portfolio can be developed toward Cutover.
8. As a developer, I want README / agent docs to describe the sibling App Layout and deferred Vercel Cutover, so that future sessions do not assume a root CRA app.
9. As a developer, I want Layout Land based on `convert-to-nextjs` (rebased or merged as needed onto current `master`), so that we reuse the existing port instead of redoing it.
10. As the site owner, I want no Vercel project creation or DNS changes in this effort, so that Cutover stays explicitly later.
11. As the site owner, I want `portfolio-react/` retained after Layout Land as a fallback archive, so that rollback remains possible until Cutover is stable.
12. As a developer, I want CI (GitHub Actions) updated to install and build from `portfolio-react/` for `gh-pages`, so that Pages keeps working after the move.
13. As a developer, I want Contact Parity for Formspree / env usage preserved in both apps where applicable, so that contact behavior does not regress on the Live Portfolio path.
14. As a future Cutover agent, I want `portfolio-next/` ready enough that a later Vercel deploy is the main remaining Cutover work, so that hosting can be decided/executed separately.
15. As the site owner, I want redesign ideas (e.g. donate/Spotify/Discord scaffold dirs, inspiration HTML) out of this land, so that Layout Land stays Content Parity only.
16. As a developer, I want dual lockfiles / root confusion cleaned up in line with the sibling layout, so that `pnpm` is the clear package manager per app.
17. As a reviewer, I want a clear definition of done matching the sibling-apps seam, so that Layout Land can be accepted without debating Cutover.

## Implementation Decisions

- Source of truth for the Next Portfolio and CRA split is branch `convert-to-nextjs`; bring that layout onto `master` (merge/rebase/cherry-pick as appropriate) rather than inventing a new structure.
- App Layout: sibling directories `portfolio-next/` (Next Portfolio) and `portfolio-react/` (CRA Live Portfolio / fallback archive).
- After Layout Land, GitHub Actions deploy to `gh-pages` builds and publishes from `portfolio-react/` only.
- Root must not remain a runnable CRA app competing with the siblings; CRA lives under `portfolio-react/`.
- Content Parity is the readiness bar for `portfolio-next/`: same sections, copy, projects, skills, links, resume, and contact behavior as the Live Portfolio; existing Next plumbing and Framer Motion upgrades on `convert-to-nextjs` are allowed.
- Empty working-tree directory shells under `portfolio-next/` / `portfolio-react/` are replaced by the real trees from the branch (or deleted then restored from git).
- Vercel project, custom domain cutover, and switching production away from GitHub Pages are explicitly deferred (ADR-0001).
- Domain vocabulary from `CONTEXT.md` is used in tickets and docs (Live Portfolio, Next Portfolio, Cutover, Content Parity, Layout Land, App Layout).
- Prefer `pnpm` for installs/builds in each app directory.

## Testing Decisions

- Good tests for this effort assert external outcomes of Layout Land, not internal component implementation details.
- Primary seam: clean checkout of `master` after the land.
  - `portfolio-react/`: install + production build succeeds; Pages workflow is configured to deploy this app.
  - `portfolio-next/`: install + production build succeeds; Content Parity spot-check (sections and key content present).
  - Repo root is not a third CRA app; misleading empty shells are gone.
  - No Vercel configuration required for acceptance of Layout Land.
- Prior art: this repo has little automated UI test coverage; acceptance is primarily build/CI + manual Content Parity spot-check unless existing tests move with `portfolio-react/` and still pass.
- Do not add broad new component test suites as a gate for Layout Land unless a moved CRA test suite already exists and breaks.

## Out of Scope

- Production Cutover (switching the public site to the Next Portfolio).
- Creating or configuring the Vercel project, env vars on Vercel, or DNS/`adibahsan.github.io` changes.
- Redesign beyond Content Parity (donate, Spotify/Discord integrations, inspiration-doc-driven UI, empty scaffold route trees that are not on `convert-to-nextjs`).
- Deleting `portfolio-react/` permanently.
- Choosing or implementing Next `output: 'export'` for GitHub Pages as the Cutover host.
- Full `/understand` knowledge-graph rebuild (optional follow-up).

## Further Notes

- Glossary: `CONTEXT.md`. Hosting decision: `docs/adr/0001-next-portfolio-on-vercel.md`.
- Agent tracker: local markdown under `.scratch/` (`docs/agents/issue-tracker.md`).
- Working tree before land may show empty `portfolio-next/` / `portfolio-react/` dirs with 0 files — treat as disposable relative to `convert-to-nextjs`.
- After this spec is ticketed, implement via `/to-tickets` then `/implement` per ticket (or equivalent), blockers-first.

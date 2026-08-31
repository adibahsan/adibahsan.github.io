# 01 — Restore sibling apps from convert-to-nextjs

**What to build:** On `master`, the repo uses the sibling App Layout: a real Next Portfolio under `portfolio-next/` and a real CRA Live Portfolio under `portfolio-react/`, sourced from `convert-to-nextjs`. Empty on-disk shells are gone, and the repository root is no longer a competing CRA app.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] `portfolio-next/` and `portfolio-react/` contain the real app trees from `convert-to-nextjs` (not empty directory shells)
- [x] Root-level CRA app entry is relocated/removed so only the sibling apps own the runnable portfolios
- [x] Working tree matches the decided App Layout vocabulary in `CONTEXT.md`

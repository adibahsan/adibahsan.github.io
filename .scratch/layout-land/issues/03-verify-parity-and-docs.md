# 03 — Verify Content Parity + docs

**What to build:** Layout Land is demonstrably done: both sibling apps install and build, the Next Portfolio meets Content Parity against the Live Portfolio, and docs state that GitHub Pages still serves CRA while Vercel Cutover is later (ADR-0001).

**Blocked by:** 01 — Restore sibling apps from convert-to-nextjs; 02 — Point GitHub Pages CI at portfolio-react

**Status:** ready-for-agent

- [ ] `pnpm install` + production build succeed in `portfolio-react/`
- [ ] `pnpm install` + production build succeed in `portfolio-next/`
- [ ] Content Parity spot-check passes for the Next Portfolio (sections, copy, projects, skills, links, resume, contact behavior)
- [ ] README (and agent-facing notes if needed) describe App Layout, Layout Land complete, Cutover-on-Vercel deferred

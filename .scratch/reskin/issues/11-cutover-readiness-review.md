# 11: Cutover Readiness review

**What to build:** Confirmation that the 3D Portfolio meets **Cutover Readiness** — real content with no Placeholder Identity left, every link resolving, a working contact route, and a clean deploy. This is the effort's acceptance gate, mirroring how the Design Fidelity build closed with its own verification ticket.

Judged against `.scratch/reskin/spec.md`, **not** against `design-spec.md`. That file records the supplied design and the completed Design Fidelity phase; Reskin departs from it deliberately, and those departures are not defects.

**Blocked by:** 02 — Hero; 03 — Marquee; 04 — About and Capabilities copy; 05 — Projects; 06 — Diagrams, retrieval service; 07 — Diagrams, multi-agent orchestration; 08 — Diagrams, phased-trust agent; 09 — Contact section and form; 10 — Vercel project and preview deploy

**Status:** ready-for-agent

- [ ] A whole-module sweep asserts no Placeholder Identity survives anywhere in the content
- [ ] Every nav item resolves, and no link on the page leads nowhere
- [ ] The page is reviewed at all three breakpoint tiers and renders correctly at each
- [ ] The page does not scroll horizontally at any tier
- [ ] The page carries a title, description, favicon and preview image
- [ ] The page serves no third-party image, and makes no runtime request to a third-party asset host
- [ ] The diagrams are legible and accurate at every card scale
- [ ] The production build succeeds and every test passes
- [ ] The preview deployment renders correctly
- [ ] The Live Portfolio, the Next Portfolio and the GitHub Pages workflow are unmodified at this point
- [ ] Any criterion judged against `design-spec.md` rather than this effort's spec is called out and re-judged

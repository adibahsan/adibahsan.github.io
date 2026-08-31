Status: ready-for-agent

# 3D Portfolio — Design Fidelity build

## Problem Statement

The site owner has a complete, pixel-level design for a "3D Creator" landing page and wants it built. Today the repo holds only the Live Portfolio and the Next Portfolio, both bound to Content Parity — they present the same content in different stacks, and Redesign is excluded from both. There is nowhere in the repo a new visual direction can be tried, and no vocabulary or acceptance bar for judging one. Building the design inside either existing app would put Redesign work in front of the Cutover acceptance bar and stall the hosting switch.

Separately, the design as supplied describes a fictional person, "Jack" — a Placeholder Identity. The owner intends to replace that with real content later, in a Reskin. Until that happens, an app carrying someone else's name is easy to mistake for a mistake, and a future session could "helpfully" correct it.

## Solution

Build the 3D Portfolio as the third sibling app under `portfolio-3d/`, on Vite + React + TypeScript + Tailwind, per ADR-0002. Its acceptance bar for this effort is Design Fidelity: the build matches the supplied design spec exactly, Placeholder Identity included and deliberately retained.

The app has no Production Role. It is not served, not deployed, and not a Cutover candidate. GitHub Pages continues to deploy the Live Portfolio from `portfolio-react/`, untouched. Reskin — swapping in the owner's real content — is a separate, later effort, and only after it does the 3D Portfolio become eligible for consideration as a Cutover candidate.

## User Stories

1. As the site owner, I want the supplied "3D Creator" design built exactly as specified, so that I can judge the visual direction on its own terms rather than on an approximation.
2. As the site owner, I want the 3D Portfolio to live as a third sibling app, so that trying a Redesign costs nothing if I abandon it.
3. As the site owner, I want the Live Portfolio to keep serving production unchanged throughout, so that visitors see no effect from this work.
4. As the site owner, I want the Next Portfolio untouched, so that its Content Parity standing and Cutover readiness are not disturbed.
5. As the site owner, I want the Placeholder Identity retained through this effort, so that Design Fidelity can be judged against the supplied design rather than a half-swapped hybrid.
6. As the site owner, I want it recorded that "Jack" is deliberate, so that no future session treats the placeholder name as a bug and silently changes it.
7. As the site owner, I want the app structured so a later Reskin is a content swap and not a rebuild, so that adopting the direction stays cheap.
8. As a visitor to the built page, I want the five sections to appear in the specified order — hero, marquee, about, services, projects — so that the page reads as designed.
9. As a visitor, I want the page to render on a dark ground consistently from the first paint, so that no light flash appears before styles apply.
10. As a visitor, I want the display typeface to load across its full weight range, so that the heavy display headings and light body text both render as designed.
11. As a visitor on a phone, I want every section to be legible and correctly laid out at the smallest supported width, so that the page is usable on mobile.
12. As a visitor on a wide display, I want fluid type to scale without overflowing, so that the page holds together on large screens.
13. As a visitor, I want the page never to scroll sideways, so that horizontal drift from oversized headings and marquee rows does not break the layout.
14. As a visitor, I want the hero heading to fill the viewport width as a single unbroken line, so that the intended display-type impact lands.
15. As a visitor, I want the hero heading to render with its vertical gradient fill, so that it matches the other gradient headings on the page.
16. As a visitor, I want the hero portrait to respond to my cursor with a magnetic pull, so that the page feels alive on first contact.
17. As a visitor, I want the magnetic effect to ease out smoothly when my cursor leaves, so that the motion does not snap.
18. As a visitor, I want hero elements to arrive in a staggered sequence rather than all at once, so that the entrance reads as composed.
19. As a visitor, I want the two marquee rows to travel in opposite directions as I scroll, so that the band reads as motion rather than a static grid.
20. As a visitor, I want marquee rows never to reveal their leading or trailing edge, so that the band appears continuous throughout its pass.
21. As a visitor, I want marquee imagery to load lazily, so that the page becomes interactive without waiting on the full set.
22. As a visitor, I want the about section's decorative art to enter from the page edges, so that the composition assembles as I arrive.
23. As a visitor, I want the about paragraph to reveal character by character as I scroll, so that reading it feels paced rather than instant.
24. As a visitor, I want the character reveal to be driven by scroll position rather than a timer, so that it responds to how I actually move through the page.
25. As a visitor, I want the services section to invert to a light ground with a rounded top edge, so that it reads as a distinct panel.
26. As a visitor, I want each service to show its number, name, and description in a consistent row, so that the list scans quickly.
27. As a visitor, I want service rows to appear in sequence rather than simultaneously, so that the list has rhythm.
28. As a visitor, I want the projects section to overlap the panel above it, so that the sections interlock rather than abut.
29. As a visitor, I want project cards to stack and scale as I scroll past them, so that the section has depth.
30. As a visitor, I want each project card to show its imagery in the specified two-column arrangement, so that the layout matches the design.
31. As a visitor, I want a clearly styled primary call to action in both the hero and the about section, so that the page has an obvious next step.
32. As a developer, I want the design's exact values preserved in the repo rather than only in a conversation, so that Design Fidelity remains checkable after this session ends.
33. As a developer, I want the scroll-driven arithmetic isolated from the components that consume it, so that it can be verified without rendering a page.
34. As a developer, I want the card-stacking scale sequence verified numerically, so that an inverted or off-by-one stack cannot pass a visual check.
35. As a developer, I want a production build to succeed as a gate, so that type errors and misconfiguration surface before review.
36. As a developer, I want the app installed and built independently with its own lockfile, so that it matches the App Layout the other two apps follow.
37. As a developer, I want unused dependencies kept out from the start, so that the app does not accumulate cruft on day one.
38. As a developer, I want the shared visual primitives factored as reusable components, so that the five sections do not each reimplement entrance animation and buttons.
39. As a reviewer, I want a definition of done stated in terms of Design Fidelity, so that acceptance is not debated against the Live Portfolio's content.
40. As a reviewer, I want the review to be checkable against a written list of design values, so that fidelity can be confirmed rather than eyeballed.
41. As a future Cutover agent, I want it stated plainly that the 3D Portfolio has no Production Role, so that it is never mistaken for a deployment candidate.
42. As a future Reskin agent, I want the Placeholder Identity gathered rather than scattered through markup, so that replacing it is a bounded change.

## Implementation Decisions

- The 3D Portfolio is a third sibling app per ADR-0002, on Vite + React + TypeScript + Tailwind. It does not reuse the styled-components approach of the Live and Next Portfolios; the supplied design is expressed entirely in Tailwind utilities and translating it would add risk during a fidelity-judged phase.
- The app is installed and built with pnpm and carries its own lockfile, consistent with `App Layout`. It is expected to need its own single-package pnpm workspace declaration to approve build dependencies, mirroring how the Next Portfolio approves `sharp` and `unrs-resolver` — Vite's toolchain has the same approval requirement.
- Framer Motion v12 is the animation library. The dynamic-element factory in the entrance-animation wrapper uses the v12 component-creation API, not the removed v11 call form.
- `lucide-react` is dropped from the supplied dependency list. No section in the design references an icon, so it would ship unused.
- The display typeface is loaded from Google Fonts across the full weight range the design uses. The dark ground is applied at the document root as well as the app wrapper so no light flash precedes hydration.
- Horizontal overflow is clipped at the page wrapper rather than hidden, so that sticky positioning in the projects section continues to work.
- **Scroll arithmetic is extracted into a pure module** — the effort's one new seam. Three formulas move out of their components and become functions of their inputs alone, with no DOM access:
  - marquee offset: `(scrollY − sectionTop + viewportHeight) × 0.3`, applied positively to the first row and negatively to the second
  - card stacking: `targetScale = 1 − (totalCards − 1 − index) × 0.03`
  - character reveal: per-character opacity from `0.2` to `1` as a function of character index, total length, and scroll progress
- The marquee's tripled image rows are **travel buffer, not an infinite loop**. Across the section's entire scroll pass the first row travels roughly −200px to +60px, so tripling guarantees the edges stay off-screen. No modulo wrap is required, and adding one would be a regression.
- Remote imagery is referenced at its supplied URLs rather than vendored into the repo. The design's assets are third-party hosted, and this phase judges fidelity to the supplied design, not asset custody. This is a recorded risk: those hosts can disappear, and the Reskin effort is where owned assets replace them.
- The page is a single route with no client-side routing, no data layer, and no CMS. All content is static and inlined.
- The Placeholder Identity — name, nav labels, about copy, service list, project entries, and imagery — is retained verbatim and kept collected rather than scattered through markup, so Reskin is a bounded change.
- The primary call-to-action is presentational in this phase. It is not wired to a form provider; contact behavior belongs to Reskin.
- No changes are made to `portfolio-react/`, `portfolio-next/`, or the GitHub Pages workflow. The workflow scopes its working directory, cache key, and publish folder to the Live Portfolio, so a new sibling directory cannot affect it.

## Testing Decisions

- **A good test here asserts external behavior, not implementation details.** For a page whose entire specification is visual, most component-level assertions would restate the markup rather than test it — asserting that a nav renders four links tests transcription, not behavior, and breaks on every intentional edit. Those are not written.
- **Prior art: there is none.** The repo contains zero test files. The Live Portfolio carries testing libraries and a test script inherited from its scaffold but has no setup file and no tests; the Next Portfolio has no test tooling at all. This effort introduces the repo's first test runner, chosen to match the app's own build tool.
- **Seam one — production build.** The app must install and build cleanly. This is the same acceptance seam Layout Land used for both siblings and catches type errors, missing imports, and toolchain misconfiguration.
- **Seam two — the pure scroll-arithmetic module.** The three formulas above are unit tested as pure functions. This is the only logic in the build that can be wrong in a way a visual check reliably misses: the stacking scales evaluate to 0.94, 0.97, and 1.00, so cards scale *up* with index, and an inverted sequence still produces a plausible-looking stack. Tests assert the numeric sequence, the opposing signs of the two marquee rows, and the character-reveal boundaries.
- **Design Fidelity is confirmed by review against the written design values**, not by automated assertion. The authoritative values live in the effort directory alongside this spec, so review is a comparison against a checked-in list rather than a memory of a conversation.
- Fidelity review covers the three breakpoint tiers the design specifies, and confirms the page does not scroll horizontally at any of them.
- **No component test suite is added as a gate.** This follows the precedent set by Layout Land, which explicitly declined broad component suites as an acceptance condition.

## Out of Scope

- **Reskin** — replacing the Placeholder Identity with the owner's real name, copy, projects, and imagery. That is a separate effort, and this one deliberately keeps "Jack".
- **Cutover**, and anything that would give the 3D Portfolio a Production Role: deployment, hosting setup, Vercel configuration, DNS.
- Any modification to the GitHub Pages workflow, or to the Live Portfolio or Next Portfolio.
- **Content Parity** in any form. The 3D Portfolio is not measured against the Live Portfolio's content, and adopting this direction later requires a decision that supersedes Content Parity's exclusion of Redesign — it does not follow implicitly from this build.
- WebGL, Three.js, or any real-time 3D. The design's "3D" is rendered imagery and subject matter; the page is 2D.
- Vendoring, self-hosting, or optimizing the supplied remote imagery.
- Wiring the call-to-action to a form provider, and any contact, analytics, or SEO integration.
- Light-mode or theme switching. The design is dark-only, save the deliberately inverted services panel.
- A full accessibility audit. Correct semantic elements and meaningful alternative text are expected as ordinary care; contrast remediation against the supplied palette and a formal audit are not part of this effort.
- Cross-browser certification beyond current evergreen browsers.
- Promoting the app to the repository root, or introducing a repo-level workspace across the three apps.

## Further Notes

- Glossary: `CONTEXT.md` — this spec uses 3D Portfolio, Design Fidelity, Placeholder Identity, Reskin, App Layout, Production Role, Cutover, Content Parity, and Redesign as defined there.
- Decisions: `docs/adr/0002-redesign-in-third-sibling-app.md` for why this is a third app on a different styling stack; `docs/adr/0001-next-portfolio-on-vercel.md` for the Cutover plan this effort must not disturb.
- Agent tracker: local markdown under `.scratch/` (`docs/agents/issue-tracker.md`).
- The authoritative design values are checked in beside this spec as `design-spec.md`. Fidelity review compares against that file.
- Suggested ticket shape once this is split: scaffolding and global styles first; then the shared primitives, which block everything; then the five sections, which block nothing and can be taken in any order or in parallel.
- Two carry-forwards from reading the design: `lucide-react` appears in the supplied dependency list but in no section, and the marquee's tripled rows are travel buffer rather than an infinite loop. Both are recorded above so neither gets "fixed" later.

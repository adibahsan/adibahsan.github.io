# 03 — Marquee band

**What to build:** A band of two image rows that travel horizontally in opposite directions as the visitor scrolls the page. The band reads as continuous motion — its rows never reveal a leading or trailing edge during their pass.

This section adds the first function to the pure scroll-arithmetic module. It needs nothing from the hero: the design specifies no entrance animation here.

**Blocked by:** 01 — Scaffold the 3D Portfolio app

**Status:** ready-for-agent

- [ ] Two rows render, split from the image list in `design-spec.md` as specified
- [ ] The rows travel in opposite directions as the page scrolls
- [ ] Neither row exposes a leading or trailing edge at any point during its pass
- [ ] Images load lazily, so the page becomes interactive without waiting on the full set
- [ ] The scroll listener is registered passively
- [ ] The offset calculation is a pure function of scroll position, section position, and viewport height — no DOM access — and is unit tested, including that the two rows receive opposing signs
- [ ] No modulo wrap is introduced. The tripled rows are travel buffer, not an infinite loop; adding a wrap would be a regression

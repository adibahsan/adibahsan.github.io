# 03: Marquee — technology marks

**What to build:** The band stops showing third-party marketing GIFs and starts showing the technologies the owner actually builds with. Tiles reshape from landscape image cards to squares.

The set leads with the current stack and keeps a small JVM tail, so a JVM-shaped opportunity still recognises him without the band advertising a stack he has largely left. Every mark is vendored into the app.

The band's mechanics are not to be touched: the two rows travel in opposite directions off the existing scroll arithmetic, parked a copy-width left so neither end enters view. `design-spec.md` records why there is no modulo wrap — adding one is a regression.

**Blocked by:** 01 — Content contract and working nav

**Status:** ready-for-agent

- [ ] Tiles are square and carry technology marks
- [ ] The set leads with the current stack and keeps a JVM tail
- [ ] Every mark is vendored into the app; the page makes no runtime request to a third-party host
- [ ] The two rows still travel in opposite directions, and neither row's end enters view at any scroll position or tier
- [ ] No modulo wrap is introduced
- [ ] The scroll-arithmetic module and its tests are unmodified
- [ ] The contract test asserts no supplied-design image host remains
- [ ] No horizontal scroll at any of the three tiers
- [ ] Build and every test pass

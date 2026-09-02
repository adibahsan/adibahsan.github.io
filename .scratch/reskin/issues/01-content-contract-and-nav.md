# 01: Content contract and working nav

**What to build:** The nav stops being decorative — clicking a link scrolls to its section. Section identifiers move out of the markup and into the identity module, alongside the nav items that point at them, so the two cannot drift apart. The effort's one new test seam lands here, carrying every assertion that can be true before any content changes.

This is the prefactor every other ticket depends on. It deliberately leaves a mid-state: the panel takes the identifier `capabilities` now, while its rows still list the Placeholder Identity's services until ticket 04. The nav carries three items at this stage; Contact joins when ticket 09 builds the section it points at.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Nav items and section identifiers both live in the identity module, and each section takes its identifier from there rather than declaring a literal of its own
- [ ] Clicking any nav item scrolls to its section, at all three breakpoint tiers
- [ ] The `Price` nav item is gone
- [ ] A test asserts every nav item's target is a section identifier that exists
- [ ] A test asserts every external link in the identity module is a well-formed absolute URL
- [ ] A test asserts every entry a section iterates carries the fields that section reads
- [ ] The existing scroll-arithmetic and magnet tests still pass, unmodified
- [ ] Production build succeeds

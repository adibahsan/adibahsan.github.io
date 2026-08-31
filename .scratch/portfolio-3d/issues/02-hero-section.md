# 02 — Hero section

**What to build:** The full opening screen. A visitor lands on a full-height hero with a navigation bar, a headline spanning the viewport width in gradient type, a short supporting line and a primary call to action along the bottom, and a portrait that pulls toward their cursor as they move near it. Elements arrive in a staggered sequence rather than all at once.

This is the first section to need the shared entrance-animation wrapper, the magnetic-hover behaviour, and the primary call-to-action button, so it brings all three into existence.

**Blocked by:** 01 — Scaffold the 3D Portfolio app

**Status:** ready-for-agent

- [ ] The navigation shows the four labels from `design-spec.md`, evenly distributed, with the specified hover treatment
- [ ] The headline fills the viewport width as a single unbroken line at every breakpoint tier, rendered in the gradient treatment
- [ ] The supporting line and the primary call to action sit on the bottom bar, aligned as specified
- [ ] The portrait responds to cursor movement within its activation distance, and eases smoothly back to rest when the cursor leaves
- [ ] Hero elements enter in the order, delays, and offsets given in `design-spec.md`
- [ ] The hero occupies the full viewport height and introduces no horizontal scrolling at any tier
- [ ] The portrait is positioned as specified on mobile and repositions at the larger tiers
- [ ] All hero copy is the Placeholder Identity, reproduced verbatim

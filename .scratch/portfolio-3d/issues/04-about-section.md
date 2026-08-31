# 04 — About section

**What to build:** A full-height section where four pieces of decorative art slide in from the page edges to frame a gradient heading, and the body paragraph reveals itself character by character as the visitor scrolls through it — paced by scroll position rather than by a timer. A call to action sits below.

This section brings the character-reveal component into existence and adds its arithmetic to the scroll module.

**Blocked by:** 02 — Hero section

**Status:** ready-for-agent

- [ ] The heading renders in the gradient treatment at the size given in `design-spec.md`
- [ ] Four decorative images appear at the specified corners and sizes, each entering from the nearest page edge with its given delay
- [ ] The paragraph reveals character by character, driven by scroll progress rather than elapsed time
- [ ] Each character transitions across the opacity range and scroll window specified
- [ ] The call to action appears below the text block at the specified spacing
- [ ] The character-reveal calculation is a pure function of character index, total length, and scroll progress, and is unit tested at its boundaries — first and last character, and progress at both ends
- [ ] The section fills at least the viewport height and introduces no horizontal scrolling
- [ ] The paragraph copy is the Placeholder Identity, reproduced verbatim

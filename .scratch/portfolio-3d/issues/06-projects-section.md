# 06 — Projects section

**What to build:** A dark section that overlaps the panel above it, holding three project cards that stack and scale as the visitor scrolls past them, giving the section depth. Each card shows its number, category, and name alongside a ghost call to action, above a two-column arrangement of project imagery.

This section brings the ghost button into existence and adds the card-stacking arithmetic to the scroll module.

**Blocked by:** 02 — Hero section

**Status:** ready-for-agent

- [ ] The section overlaps the panel above it and carries rounded top corners at the specified radii
- [ ] The heading renders in the gradient treatment and reads **"Project"** — singular, as specified. This is deliberate; do not correct it to a plural
- [ ] Three cards stack as the visitor scrolls, each pinned and scaling as the next arrives
- [ ] The stacking scale sequence is verified numerically: cards scale **up** with index, ending at full size. An inverted sequence still looks plausible, so this must be asserted, not eyeballed
- [ ] The scale calculation is a pure function of card index and total card count, and is unit tested against the expected sequence
- [ ] Each card shows its number, category label, name, and ghost call to action as specified
- [ ] Each card's imagery uses the specified two-column split, with the stated heights and corner radii
- [ ] All project names, categories, and imagery are the Placeholder Identity, reproduced verbatim

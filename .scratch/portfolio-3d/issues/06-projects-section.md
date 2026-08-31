# 06 — Projects section

**What to build:** A dark section that overlaps the panel above it, holding three project cards that stack and scale as the visitor scrolls past them, giving the section depth. Each card shows its number, category, and name alongside a ghost call to action, above a two-column arrangement of project imagery.

This section brings the ghost button into existence and adds the card-stacking arithmetic to the scroll module.

**Blocked by:** 02 — Hero section

**Status:** done

- [x] The section overlaps the panel above it and carries rounded top corners at the specified radii
- [x] The heading renders in the gradient treatment and reads **"Project"** — singular, as specified. This is deliberate; do not correct it to a plural
- [x] Three cards stack as the visitor scrolls, each pinned and scaling as the next arrives
- [x] The stacking scale sequence is verified numerically: cards scale **up** with index, ending at full size. An inverted sequence still looks plausible, so this must be asserted, not eyeballed
- [x] The scale calculation is a pure function of card index and total card count, and is unit tested against the expected sequence
- [x] Each card shows its number, category label, name, and ghost call to action as specified
- [x] Each card's imagery uses the specified two-column split, with the stated heights and corner radii
- [x] All project names, categories, and imagery are the Placeholder Identity, reproduced verbatim

## Comments

Landed as `src/sections/ProjectsSection.tsx`, with the three projects joining the Placeholder
Identity in `src/content/identity.ts` and the ghost call to action as
`src/components/LiveProjectButton.tsx`. `App.tsx` mounts `<ProjectsSection />` last, completing the
specified section order. The card-stacking arithmetic joins `src/lib/scroll.ts` as
`stackedCardScale` and `stackedCardShrinkStart`; the suite goes from 22 tests to 31.

Verified in a real browser against `pnpm preview`, driven with Playwright at 375x812 / 640x900 /
768x900 / 1024x900 / 1440x900 / 1920x1200:

- Panel is `rgb(12, 12, 12)` with top radii 40 / 50 / 60px, square bottom corners, `z-index: 10`,
  and margin-top -40 / -48 / -56px — it genuinely overlaps the services panel above it, whose
  measured foot it cuts into. `design-spec.md` section 5 to the pixel at every tier.
- Heading reads `Project`, singular, resolving to 48 / 76.8 / 92.16 / 122.88 / 160 / 160px — both
  ends of `clamp(3rem, 12vw, 160px)` reached — at weight 900, uppercase, centred, with
  `-webkit-text-fill-color: rgba(0, 0, 0, 0)` over
  `linear-gradient(rgb(100, 105, 115), rgb(187, 204, 215))`, which is #646973 → #BBCCD7 exactly.
- Cards: radii 40 / 50 / 60px, `2px solid rgb(215, 226, 234)`, ground `rgb(12, 12, 12)`, padding
  16 / 24 / 32px, `position: relative` with `top` 0 / 28 / 56px — the specified `index * 28`.
- Each card's sticky box measures `position: sticky` at `top: 96px` and `top: 128px` from md up
  (`top-24 md:top-32`), and 690 / 765 / 1020px tall against viewport heights of 812 / 900 / 1200 —
  85vh exactly.
- Numbers resolve to 48 / 64 / 76.8 / 102.4 / 140 / 140px at weight 900, matching the services
  numbers as specified; names to 16 / 16 / 16.896 / 22.528 / 31.68 / 33.6px at weight 500, uppercase.
- Image grid measures `2fr 3fr`, so 40 / 60 of the width the gap leaves — at 1440 that is 504 /
  756px. Column-one heights resolve to 130 / 130 / 130 / 164 / 230 / 230px and 160 / 160 / 169 /
  225 / 317 / 340px, both clamps reaching both ends. All nine images carry the card's own
  40 / 50 / 60px radius and `object-fit: cover`.
- `document.documentElement.scrollWidth === window.innerWidth` at all six tiers, sampled at 41
  scroll positions through the whole document. Zero overflow.
- The three names, three categories and nine image URLs were diffed programmatically against
  `design-spec.md` rather than read by eye: byte-for-byte identical, and in the same order.

**The stacking was measured under real scroll, not just unit tested.** Sampling the transform matrix
at seven points across the pass, at 375 / 768 / 1440:

```
p=0.000  scales=[1,      1,      1]
p=0.333  scales=[0.98,   1,      1]
p=0.667  scales=[0.96,   0.985,  1]
p=1.000  scales=[0.94,   0.97,   1]
```

Every card starts at full size; card 1 holds until its third of the pass opens, card 2 holds
throughout because its target *is* 1, and the pass ends on the design's `[0.94, 0.97, 1]` — rising
with index, as the spec's own warning demands. At the end of the pass all three are pinned and
visible at once, tops at 111 / 131 / 178 (375) and 155 / 169 / 191 (1440).

Judgement calls, in the order they most want a second opinion at ticket 07:

- **The card is taller than its 85vh runway at desktop, and this is the design's own arithmetic.**
  At 1440x900 the card measures 889px against a 765px sticky box, so at the end of the pass the
  three cards run 90 / 131 / 180px below the fold; at 1920x1200 it is 1090 against 1020. This is not
  a layout error — it is `clamp(3rem, 10vw, 140px)` on the number (a ~210px line box at default
  leading), plus 230 + 317px of column-one images, plus 32px gaps and 64px padding, inside
  `h-[85vh]`. Every one of those numbers is specified. At 375x812 there is no tension at all: 494px
  in a 690px box. Two levers, cheapest first: `leading-none` on the number span takes ~70px off at
  1440 (the same lever ticket 05 flagged for the services rows), and raising the runway above 85vh
  takes the rest. Both are departures from written values, so neither was taken here.
- **The stacked edges come out thinner than the specified 28px.** Measured at the end of the pass
  they are 20 / 47px at 375 and 14 / 22px at 1440. The cause is transform-origin: `design-spec.md`
  does not name one, so the default `center` stands, and a card shrinking about its centre moves its
  own top edge down — at 1440 card 1's top drifts 128 → 155 as it scales to 0.94, eating half of its
  28px offset. `transformOrigin: 'top'` would hold the tops at exactly 128 / 156 / 184. It was not
  taken because centre origin is what the pattern this design describes actually does, and the
  design specifies the offsets, not the resulting edges. This is one line if review disagrees.
- **The category label's type is invented.** `design-spec.md` names the card's "category label" and
  gives it no size, weight or colour — the only element in the section with none. It ships as
  `font-light uppercase tracking-widest opacity-60` at `clamp(0.75rem, 1.2vw, 1rem)`: the services
  description's weight and opacity, the button's tracking, and a clamp sitting a step below the
  project name's. Nothing here is derived from the design; it is four choices that had to be made.
- **Every gap in the card is the section's own padding rhythm.** `gap-4 sm:gap-6 md:gap-8` between
  the two rows, inside the image grid, and between the stacked images. The design gives none of
  them. This follows ticket 05's precedent — reuse the section's scale rather than invent a fourth —
  and it is one constant, `GAP`, so review can move all five together.
- **The section's padding is invented too**: `px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32`, which
  is the services panel's, unstated for this section. Without top padding the heading sits against
  the rounded edge.

**A shared `SectionHeading` was extracted, which is the carry-forward ticket 05 left here.** Ticket
05 ended by naming this as ticket 06's decision, since ticket 06 would be looking at the third copy.
It was taken: `design-spec.md` line 111 specifies the projects heading only as "same styling as
other headings", so a component *is* that sentence, whereas a third hand-written
`clamp(3rem, 12vw, 160px)` is a third chance for one of them to drift silently. `SectionHeading`
owns `as="h2" y={40}`, the type treatment and the clamp; the caller passes the gradient class and
its own margin, which is all that differs between the three.

The hero's headline is deliberately **not** folded in, against ticket 05's expectation of four call
sites. Looking at it directly: it is the page's `h1`, it scales in raw viewport widths
(`text-[14vw]` … `lg:text-[17.5vw]`) rather than through this clamp, and it carries its own margin
and entrance delay. It shares the gradient and nothing else, and `.hero-heading` already carries
that. Folding it in would mean a component with more props than body.

This touched `AboutSection.tsx` and `ServicesSection.tsx` — tickets 04 and 05's landed, verified
work — so it was re-measured rather than assumed. At 375 / 768 / 1440 all three `h2`s resolve
identically (48 / 92.16 / 160px, weight 900, `line-height` equal to font size, tracking
-1.2 / -2.304 / -4px, centred); Services keeps its solid `rgb(12, 12, 12)` ink and About and Project
keep the transparent fill over the gradient; margins are unchanged (About 0, from its parent's gap;
Services 64 / 112). All three entrances still fire and settle at opacity 1 with no residual
transform. Nothing moved.

Smaller notes:

- **The runway and the pin are the same element.** Each card's `h-[85vh]` box is itself the
  `sticky top-24 md:top-32`, and the boxes are siblings inside the stack rather than nested. That is
  what lets a pinned card stay pinned while the ones behind it arrive — a sticky element releases at
  its *parent's* bottom edge, so with the stack as the shared parent all three accumulate on screen.
  Nesting the sticky inside a per-card wrapper would release each card as its own wrapper passed,
  and the cards would file past one at a time instead of stacking.
- **`items-start`, so the pinned top edge is the specified one.** With the card taller than its box
  at desktop (above), centring it would put the card's top *above* the `top-24 / top-32` line the
  design names and hide the number and the button first. Aligning to the start makes the measured
  pin the specified pin.
- **`stackedCardShrinkStart` is `index / total`, not `index / (total - 1)`.** Dividing by the count
  leaves a final slice of the pass with no card left to arrive in it, which is exactly what holds
  the topmost card at full size while the two beneath it finish receding.
- **`TOP_RADIUS` is written out rather than derived from `RADIUS`.** The first draft built the
  panel's top-only radii with `RADIUS.replace(/rounded-\[/g, 'rounded-t-[')`. That compiles and is
  silently wrong: Tailwind generates utilities by finding their names in the source text, so classes
  assembled at runtime are never built and the panel would have shipped square-cornered. Caught
  before the first browser pass; the constant carries a comment saying why.
- **The drawn ordinal is derived and `aria-hidden`**, as the services numbers are — Reskin can add
  or reorder a project without renumbering.
- **Alt text**: the tall column-two image carries the project's name; the two supporting images
  carry `alt=""`. Three images per card all naming the same project would read the name four times
  over, counting the heading. The card is an `<article>` with an `<h3>`, so the name is already in
  the accessibility tree.
- **`loading="lazy"` on all nine**, following the marquee's precedent — none of them are near the
  top of the page.

Scope notes: nothing from ticket 07 was done — no fidelity review, no cross-section audit beyond
the heading regression the refactor made necessary. The Placeholder Identity is retained verbatim,
"Project" singular included. `lucide-react` stays dropped.

Verified: `pnpm build` (`tsc -b && vite build`) and `pnpm test` (31 tests) both pass. `git status`
shows changes confined to `portfolio-3d/` and this ticket — `portfolio-react/`, `portfolio-next/`,
and `.github/workflows/master.yml` are untouched.

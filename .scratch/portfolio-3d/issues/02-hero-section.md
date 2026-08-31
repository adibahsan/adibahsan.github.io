# 02 — Hero section

**What to build:** The full opening screen. A visitor lands on a full-height hero with a navigation bar, a headline spanning the viewport width in gradient type, a short supporting line and a primary call to action along the bottom, and a portrait that pulls toward their cursor as they move near it. Elements arrive in a staggered sequence rather than all at once.

This is the first section to need the shared entrance-animation wrapper, the magnetic-hover behaviour, and the primary call-to-action button, so it brings all three into existence.

**Blocked by:** 01 — Scaffold the 3D Portfolio app

**Status:** done

- [x] The navigation shows the four labels from `design-spec.md`, evenly distributed, with the specified hover treatment
- [x] The headline fills the viewport width as a single unbroken line at every breakpoint tier, rendered in the gradient treatment
- [x] The supporting line and the primary call to action sit on the bottom bar, aligned as specified
- [x] The portrait responds to cursor movement within its activation distance, and eases smoothly back to rest when the cursor leaves
- [x] Hero elements enter in the order, delays, and offsets given in `design-spec.md`
- [x] The hero occupies the full viewport height and introduces no horizontal scrolling at any tier
- [x] The portrait is positioned as specified on mobile and repositions at the larger tiers
- [x] All hero copy is the Placeholder Identity, reproduced verbatim

## Comments

Landed as `src/sections/HeroSection.tsx` plus the three shared primitives this ticket brings into
existence — `FadeIn`, `Magnet`, `ContactButton` — and `src/content/identity.ts`, which collects the
Placeholder Identity so Reskin is a value swap rather than a markup edit. `tailwind.config.js`
gained the `foreground` token (`#D7E2EA`) that ticket 01 left for the nav to introduce.

Verified in a real browser at 375 / 640 / 768 / 1024 / 1440 / 1920, driven with Playwright against
`pnpm preview`:

- `document.documentElement.scrollWidth === window.innerWidth` at every width — no horizontal scroll.
- Section height equals `innerHeight` at every width.
- Headline is one line everywhere; Kanit 300–900 resolves (`document.fonts.check('900 100px Kanit')`),
  `-webkit-text-fill-color` is transparent over the specified `linear-gradient(180deg, …)`.
- Nav padding measures 24/24 below md and 32/40 at md+; sizes 14 / 18 / 22.4px across the three tiers;
  hover moves opacity 1 → 0.7 over a 200ms `opacity` transition.
- Portrait measures 280 / 360 / 440 / 520px, sits vertically centred at 375, and is flush to
  `bottom: 0` from 640 up.
- Entrance opacity sampled every 150ms after reload rises in the order nav → heading → supporting
  line → button → portrait, matching the 0 / 0.15 / 0.35 / 0.5 / 0.6 delays.
- Magnet: cursor at centre + (90, 60) drives `translate3d` to (30, 19.8) — the specified strength-3
  division — returns to 0 at centre, and eases out over `transform 0.6s ease-in-out` when the cursor
  leaves the band, or leaves the window entirely.

Four things for ticket 07 to look at:

- **The apostrophe in the headline ships curly (`’`, U+2019).** `design-spec.md` writes it
  `Hi, i'm jack` and annotates "curly apostrophe via `&apos;`", which is self-contradictory: in JSX
  `&apos;` produces U+0027, a straight apostrophe. Read as the em-dash deviation already signed off
  was — the supplied block is ASCII-normalised, and the parenthetical exists precisely to name the
  two characters normalisation flattened ("lowercase i", "curly apostrophe") — the annotation
  describes the glyph and `&apos;` describes a mechanism that does not survive contact with JSX.
  Ticket 01's comment cites this same annotation as evidence the spec annotates typography when it
  matters, so taking it at face value is the consistent reading. Not recorded in `design-spec.md`'s
  deviations block, because unlike the em dash this one has no owner sign-off yet. One character to
  reverse if the owner reads it the other way.
- **The headline does not literally reach the viewport edge.** At the specified sizes it spans 73.7%
  of the width at 375, 79.0% at 640, 84.3% at 768, and 92.2% from 1024 up. The ratio is fixed by
  Kanit's metrics at `tracking-tight`; the 14 → 15 → 16 → 17.5vw ramp is exactly the 25% that takes
  73.7% to 92.2%, so the ramp *is* the design compensating for it. Sizing to fill would mean
  overriding the vw values `design-spec.md` gives, which the file forbids, so the specified values
  ship as written. Visible as slack on the right at the smaller tiers.
- **The portrait overlaps the bottom bar between roughly 768 and 900px wide.** `design-spec.md` puts
  `z-10` on the portrait and gives the bottom bar no stacking context, so the portrait paints over
  the supporting line and the left rim of the call to action at those widths. Reproduced as
  specified rather than corrected with a `z-20` the spec does not mention; a single class on the
  bottom bar reverses it if the owner wants the copy in front.
- **The bottom bar's horizontal padding is invented.** `design-spec.md` gives that row only
  "justify-between items-end with pb-7 sm:pb-8 md:pb-10" — no `px`. Without one the supporting line
  and the call to action would sit flush against the viewport edges while the nav directly above
  them is inset, so the navbar's own `px-6 md:px-10` is carried down to match. It is the only value
  in this section not taken from the file.

One defect found and fixed in review: the pull was driven only by `mousemove`, which stops arriving
when the cursor leaves the browser window — so leaving through the bottom edge, which the portrait
sits flush against from `sm` up, stranded it mid-pull. A `mouseleave` on the document element now
returns it to rest through the same 0.6s ease-out.

The magnetic geometry is extracted to `src/lib/magnet.ts` and unit tested. It is not one of the
three formulas `spec.md` names for the scroll-arithmetic seam, but it is the same kind of logic —
geometry a visual check cannot pin down, where a wrong divisor or an off-by-one activation edge
still looks plausible — so it is tested on the same reasoning. Seven cases: the strength division,
the sign either side of centre, and the activation boundary on each axis independently. No component
test suite was added, per `spec.md`.

Scope notes: nav labels render as `<a>` elements with no `href`. The design supplies labels only,
and two of the four ("Price", "Contact") name no section that exists on the page — inventing
anchors would fabricate destinations. Wiring them belongs with Reskin, alongside the call to action,
which `spec.md` already fixes as presentational for this phase. The positioning wrapper around the
portrait is a plain div, not the `FadeIn`, because Framer Motion writes `transform` inline and would
overwrite Tailwind's centring translate; keeping them on separate elements lets the two compose.

Verified: `pnpm build` (`tsc -b && vite build`) and `pnpm test` (8 tests) both pass. `git status`
shows changes confined to `portfolio-3d/` — `portfolio-react/`, `portfolio-next/`, and
`.github/workflows/master.yml` are untouched.

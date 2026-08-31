# 04 — About section

**What to build:** A full-height section where four pieces of decorative art slide in from the page edges to frame a gradient heading, and the body paragraph reveals itself character by character as the visitor scrolls through it — paced by scroll position rather than by a timer. A call to action sits below.

This section brings the character-reveal component into existence and adds its arithmetic to the scroll module.

**Blocked by:** 02 — Hero section

**Status:** done

- [x] The heading renders in the gradient treatment at the size given in `design-spec.md`
- [x] Four decorative images appear at the specified corners and sizes, each entering from the nearest page edge with its given delay
- [x] The paragraph reveals character by character, driven by scroll progress rather than elapsed time
- [x] Each character transitions across the opacity range and scroll window specified
- [x] The call to action appears below the text block at the specified spacing
- [x] The character-reveal calculation is a pure function of character index, total length, and scroll progress, and is unit tested at its boundaries — first and last character, and progress at both ends
- [x] The section fills at least the viewport height and introduces no horizontal scrolling
- [x] The paragraph copy is the Placeholder Identity, reproduced verbatim

## Comments

Landed as `src/sections/AboutSection.tsx` and `src/components/AnimatedText.tsx`, with
`characterOpacity` joining `marqueeShift` in `src/lib/scroll.ts` — the second of the three formulas
`spec.md` names for that seam. The copy and the four ornament URLs go into
`src/content/identity.ts`; the corners they sit in and the edges they arrive from stay in the
section, since they are placement rather than identity.

Verified in a real browser against `pnpm preview`, driven with Playwright at 375x700 / 640x900 /
768x900 / 1024x900 / 1440x900 / 1920x1200:

- Section height is at least `innerHeight` at every tier; padding measures 20 / 32 / 40 across and
  80 top and bottom. `document.documentElement.scrollWidth === window.innerWidth` at all six,
  sampled at 40 scroll positions through the section — including while the ornaments are still
  80px outside their corners mid-entrance.
- Heading resolves to 48 / 76.8 / 92.16 / 122.88 / 160 / 160 px — `clamp(3rem, 12vw, 160px)` with
  both ends of the clamp actually reached — at weight 900, uppercase, `line-height` equal to
  `font-size`, `letter-spacing` -0.025em, centred, over the specified
  `linear-gradient(180deg, …)` with `-webkit-text-fill-color` transparent.
- Paragraph resolves to 16 / 16 / 16 / 20.48 / 21.6 / 21.6 px — `clamp(1rem, 2vw, 1.35rem)`,
  again reaching both ends — weight 500, `line-height` 1.625, centred, `rgb(215, 226, 234)`,
  capped at 560px.
- The four ornaments measure 120/120/100/130 → 160/160/140/170 → 210/210/180/220 and sit at
  top 4% / bottom 8% with 1-2-4% and 3-6-10% side insets, each matching `design-spec.md` to the
  pixel at every tier. They start at `translateX(∓80)` at opacity 0 and settle at 0 / opacity 1;
  sampled every 100ms from the moment the section enters view they begin in the order
  moon → lego → object → group, which is the 0.1 / 0.15 / 0.25 / 0.3 ordering.
- Gaps measure 40 / 56 / 64 between heading and text and 64 / 80 / 96 between text and button, and
  the button's centre is within 1px of the viewport centre at every tier.
- The reveal is scroll-driven, not timed: held still at the middle of the pass for two seconds, the
  largest change in any of the 237 character opacities is exactly 0. Every character reads 0.2
  before the window opens and 1 after it closes, and at any position in between no character is
  lighter than the one before it, so the sweep runs strictly left to right.
- The window is the specified one. Scrolling to where the paragraph's top edge hits 0.8 of the
  viewport, all 237 characters are still at 0.2; scrolling to where its bottom edge hits 0.2, all
  237 are at 1. Overscrolling either side clamps rather than reversing.

**The pass cannot run to its end on the page as it stands, because the about section is currently
the last thing on it.** The document bottoms out with 106 of 237 characters lit. This is the same
condition ticket 03 recorded for the marquee, and the same stand-in resolves it: with a 4000px
spacer below — the height sections 4 and 5 will occupy — the pass opens fully dim and closes fully
lit, exactly on the two bounds above. Nothing to do here; worth knowing before ticket 07 scrolls
to the bottom of a three-section page and reads a half-lit paragraph as a defect.

Three judgement calls for ticket 07:

- **`Let’s` ships with a curly apostrophe (U+2019).** `design-spec.md` writes it straight, and the
  paragraph is otherwise verbatim — byte for byte, that apostrophe is the only difference. Ticket
  02 shipped the headline's `i’m` curly on the reading that the supplied block is ASCII-normalised
  and that the "curly apostrophe" annotation names a character normalisation flattened. That
  reading does not stop at the headline: shipping this one straight would put two different
  apostrophes in the same typeface on the same page. Like ticket 02's, this is not in
  `design-spec.md`'s deviations block, because unlike the em dash it has no owner sign-off. One
  character to reverse.
- **The contact button gets no entrance animation.** `design-spec.md` gives FadeIn settings for the
  four ornaments and the heading and says only "Contact button below the text block" — where the
  hero section, by contrast, is given a delay for its button explicitly. Read as the file
  enumerating entrances where it wants them; adding one here would be inventing. Reversing it is
  wrapping one element.
- **The paragraph carries a visually hidden copy of itself for screen readers.** The reveal needs
  one element per character, and `design-spec.md` specifies the animated one be absolutely
  positioned — which blockifies it, whatever the markup says. The result is that the sentence
  reaches the accessibility tree as 237 sibling blocks with the spaces collapsed out from between
  them, read out letter by letter. The character spans are marked `aria-hidden` and an `sr-only`
  copy of the sentence sits alongside them, so `ariaSnapshot()` now reports the section as heading,
  one clean paragraph, button. `spec.md` asks for "meaningful alternative text… as ordinary care",
  which is the same clause ticket 03 cited for `alt=""` on the marquee tiles.

Smaller notes:

- **The lit copy is positioned with `left-0` and `top` left auto.** An absolutely positioned box
  with `top: auto` sits at its static position — which is exactly where the in-flow copy beneath it
  sits — so the two align on the baseline without a second value to keep in step with the type.
  Confirmed by eye in the screenshots as well as by measurement.
- **The four ornaments take `alt=""`.** They are decorative — a moon, a lego brick, a smiley and a
  cursor — and carry nothing the heading and paragraph beside them do not.
- **Ornament size and corner go on a wrapper, with the image at `w-full` inside it**, mirroring the
  hero portrait. `design-spec.md` puts the width on the image; the rendered result is identical,
  and it keeps `transform` to the entrance alone.
- **`characterOpacity` is `clamp01(progress × total − index)` scaled into the 0.2–1 range** — the
  per-character window `[index/total, (index+1)/total]` restated so it is one expression rather
  than a subtraction and a division that must agree. Seven cases cover the boundaries the ticket
  asks for: both ends of the pass against both the first and the last character, the opening and
  closing slices, that the sweep never runs backwards across the line, and that progress outside
  the pass clamps rather than overshooting.
- 237 motion values update per scroll frame, one per character. They are written by Framer Motion
  straight to the nodes without a React render, and this is what the design asks for; recorded
  because it is the heaviest thing on the page so far and ticket 07 may want to look at it on a
  slow device.

Scope notes: nothing in tickets 05 or 06 was built, and `characterOpacity` is the only formula
added to `scroll.ts` — the card-stacking one is ticket 06's. `App.tsx` mounts `<AboutSection />`
below the marquee, in the specified section order.

Verified: `pnpm build` (`tsc -b && vite build`) and `pnpm test` (22 tests, up from 15) both pass.
`git status` shows changes confined to `portfolio-3d/` and this ticket — `portfolio-react/`,
`portfolio-next/`, and `.github/workflows/master.yml` are untouched.

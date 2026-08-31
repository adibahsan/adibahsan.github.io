# 03 — Marquee band

**What to build:** A band of two image rows that travel horizontally in opposite directions as the visitor scrolls the page. The band reads as continuous motion — its rows never reveal a leading or trailing edge during their pass.

This section adds the first function to the pure scroll-arithmetic module. It needs nothing from the hero: the design specifies no entrance animation here.

**Blocked by:** 01 — Scaffold the 3D Portfolio app

**Status:** done

- [x] Two rows render, split from the image list in `design-spec.md` as specified
- [x] The rows travel in opposite directions as the page scrolls
- [x] Neither row exposes a leading or trailing edge at any point during its pass
- [x] Images load lazily, so the page becomes interactive without waiting on the full set
- [x] The scroll listener is registered passively
- [x] The offset calculation is a pure function of scroll position, section position, and viewport height — no DOM access — and is unit tested, including that the two rows receive opposing signs
- [x] No modulo wrap is introduced. The tripled rows are travel buffer, not an infinite loop; adding a wrap would be a regression

## Comments

Landed as `src/sections/MarqueeSection.tsx`, the pure `src/lib/scroll.ts` this ticket brings into
existence, and 21 URLs appended to `src/content/identity.ts`. `scroll.ts` is the seam `spec.md`
names; the first of its three formulas lives there now, and the card-stacking and character-reveal
ones join it in tickets 05 and 06.

**The rows are parked one copy to the left, which `design-spec.md` does not say.** This is the one
judgement call worth ticket 07's attention, and it is not in the deviations block because it has no
owner sign-off yet — the same handling ticket 02 gave its unsigned-off calls.

`design-spec.md` gives row 1 `translateX(offset - 200)` and row 2 the negation, and the deviations
block explains the tripling as "travel buffer": "Across the section's scroll pass row 1 travels
roughly −200px to +60px, so tripling keeps the edges off-screen." **That last clause is not true as
written, and measurement is what shows it.** Tripling only buffers the *trailing* direction. Row 1
moves right, so its extra copies pile up to the right while its leading edge sits at exactly
`offset - 200` — off-screen only while `offset < 200`. Stripping the parking shift in a live page
and sampling every 25px of scroll, row 1's leading edge is inside the viewport at 48 sampled
positions, reaching 288px in at 1920x1200. Row 2 is worse: it starts at `+200`, so its leading edge
is exposed from the very first frame of the pass.

So the rows are parked at `translateX(-100/COPIES%)` on a static wrapper, and the specified formula
is applied unchanged on the element inside it. The travel then happens inside the middle copy, which
is the only reading under which "tripled for seamless scrolling" buys anything in both directions.
Two consequences worth naming:

- **The rendered transform is `offset − 200 − W/3`, not `offset − 200`.** Visually it is the same
  band — the three copies are identical, so shifting by one lands the same pixels wherever the
  original was correct — but a reviewer diffing the transform against the file will see the extra
  term, and should.
- **`W/3` is about 4px short of exactly one copy** (4748 vs 4752 for row 1), because the row's width
  includes gaps the division does not know about. It does not matter: nothing wraps, so there is no
  seam to align, and the shift only has to be roughly a copy wide.

The alternative was to ship the exposed edge as specified and let ticket 07 catch it. That was
rejected because this ticket makes the opposite an explicit acceptance criterion — "Neither row
exposes a leading or trailing edge at any point during its pass" — so the two readings of
`design-spec.md` are not equally available here. Reversing it is deleting one wrapper style.

Verified in a real browser against `pnpm preview`, driven with Playwright, at 375 / 640 / 768 /
1024 / 1440 / 1920 wide against 700 / 900 / 1200 tall. The page today is only hero + band, so it
cannot scroll far enough to run the pass to its end; a 4000px spacer stands in for sections 4–6, and
every sweep below samples every 25px from the top of the document to the bottom:

- `document.documentElement.scrollWidth === window.innerWidth` at every sampled position — the band
  is thousands of px wider than the viewport and the page still does not scroll sideways. It relies
  on `overflow-x: clip` on the page wrapper from ticket 01; the section adds no clipping of its own.
- While either row is on screen, its left edge never gets closer than 4460px outside the viewport
  and its right edge never nearer than 6342px past the far side. Both ends stay off-screen by more
  than two full copies at every tier.
- The two rows' transforms are exact negations at every sampled position (`|tx₀ + tx₁| < 0.01`), and
  row 1 ends the sweep right of where it started while row 2 ends left.
- Tiles measure 420x270 with a 16px radius, `object-fit: cover`, `loading="lazy"`; gaps are 12px
  between tiles and between rows; section padding is 96 / 128 / 160 top and 40 bottom; ground is
  `rgb(12, 12, 12)`. Row 1 renders 33 tiles from 11 distinct URLs, row 2 renders 30 from 10.
- The scroll listener registers as `{"passive": true}`, and it is the only scroll listener on
  `window`.
- Lazy loading holds: 10 of the 21 GIFs are ever requested, even after scrolling the band fully
  through the viewport. The rest sit thousands of px off-screen and are never fetched.

One thing the fidelity review should know about the supplied imagery: **each GIF is roughly 14 MB**
(`hero-space-voyage-preview` is 14,452,812 bytes). Ten of them reach the wire on a pass through the
band, so the section pulls well over 100 MB before it is fully painted, and in a cold headless
browser nothing had decoded after 3 seconds. Nothing to do here — `spec.md` fixes remote imagery at
its supplied URLs and puts optimization and asset custody in Reskin, and it already records the
hosts disappearing as a risk — but the weight is a fact about this design, not about this build.

Smaller calls, all of them reversible:

- **`alt=""` on every tile.** `design-spec.md` supplies no captions, and each image renders three
  times, so any alt text would be announced three times over for a band that carries no information.
  Marked decorative instead. `spec.md` asks for "meaningful alternative text… as ordinary care",
  and for a thrice-repeated decorative tile the meaningful choice is the empty one.
- **Transforms are written straight to the nodes, not held in React state.** The two rows are 63
  images between them; routing a transform React never reads back through state would re-render all
  of them on every scroll event, which would be the entire cost of the effect.
- **The section is re-measured on every tick rather than cached.** One `getBoundingClientRect()`
  against clean layout is cheap, and caching would buy staleness the moment anything above the band
  moves — a late webfont, an image settling, sections 4–6 landing.
- **`useLayoutEffect`, where `Magnet` uses `useEffect`.** On a reload that restores a scroll position
  inside the band, a passive effect would let the browser paint the resting transform for a frame
  before correcting it.
- **A `resize` listener, which `design-spec.md` does not mention.** Two of the formula's three inputs
  change on resize with no scroll. Note that on the page as built it is close to a no-op: the hero is
  `h-screen`, so the band's `sectionTop` equals `innerHeight` and the two terms cancel exactly. It
  earns its keep where they stop cancelling — a mobile URL bar sliding, an orientation change, any
  later change to what sits above the band. Confirmed working by pinning the hero to a fixed height,
  where a 900 → 500 resize at a fixed scroll position moves row 1 from 160 to 40 as the formula says
  it should.

No modulo wrap was introduced, and none is needed: the parking shift plus three copies covers the
whole pass with thousands of px to spare, as the sweep above measures.

Worth recording for whoever writes the next scroll-driven section: the first version of the
verification harness read each row's transform in the same `page.evaluate()` that called
`scrollTo`, which reports the new layout but the *previous* transform — scroll handlers run after
the scroll, not during it. It reported a stale value one sample behind and, at one viewport, a row
that appeared never to move at all. Every measurement above waits two animation frames after
scrolling before reading.

Verified: `pnpm build` (`tsc -b && vite build`) and `pnpm test` (15 tests) both pass. `git status`
shows changes confined to `portfolio-3d/` and this ticket — `portfolio-react/`, `portfolio-next/`,
and `.github/workflows/master.yml` are untouched.

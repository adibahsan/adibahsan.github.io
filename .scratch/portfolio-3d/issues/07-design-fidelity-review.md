# 07 — Design Fidelity review

**What to build:** Confirmation that the 3D Portfolio meets Design Fidelity — the built page matches the supplied design values exactly, Placeholder Identity included, and nothing outside the app has moved. This is the effort's acceptance gate, mirroring how Layout Land closed with its own verification ticket.

Judged against `design-spec.md`, never against the Live Portfolio's content. Content Parity does not apply to this app.

**Blocked by:** 02 — Hero section; 03 — Marquee band; 04 — About section; 05 — Services panel; 06 — Projects section

**Status:** done

- [x] The five sections appear in the order given in `design-spec.md`
- [x] Every design value in `design-spec.md` is checked against the built page and matches, or its deviation is one of the two already recorded there
- [x] The page is reviewed at all three breakpoint tiers and renders correctly at each
- [x] The page does not scroll horizontally at any tier
- [x] The production build succeeds and every scroll-arithmetic test passes
- [x] The Placeholder Identity is intact — the placeholder name, nav labels, copy, services, and project entries are unchanged
- [x] The unused icon dependency named in `design-spec.md` is absent from the app's dependencies
- [x] The marquee still has no modulo wrap
- [x] The Live Portfolio, the Next Portfolio, and the GitHub Pages workflow are unmodified, and Pages still deploys the Live Portfolio
- [x] The 3D Portfolio has no Production Role — it is not deployed, hosted, or referenced as a Cutover candidate

## Comments

**The 3D Portfolio meets Design Fidelity.** Reviewed against `design-spec.md` in a real browser
against `pnpm preview`, driven with Playwright. Two open calls the earlier tickets flagged forward
were put to the site owner and settled; one of them changed the build, and both are now recorded in
`design-spec.md`'s deviations block, which goes from three entries to four.

### What the owner settled

- **Apostrophes ship straight, and the em-dash reading does not extend to them.** Tickets 02 and 04
  shipped `Hi, i’m jack` and `Let’s build…` with U+2019, reasoning by analogy with the signed-off
  `--` → em dash: the supplied block is ASCII-normalised, and "curly apostrophe via `&apos;`" names
  a character normalisation flattened. Both tickets recorded it as unsigned-off and reversible. The
  owner reversed it. `identity.ts` now carries U+0027 in both places — confirmed in the rendered DOM
  at all three tiers by code point, not by eye — which is what `design-spec.md` writes *and* what
  `&apos;` actually produces in JSX, so the annotation and its mechanism now agree. The third
  deviation entry gained a paragraph saying the reading stops at `--`, so a future session does not
  restore a curly apostrophe by analogy. The two comments in `identity.ts` that justified the curly
  form were rewritten to say the opposite; they were the only other place the reasoning lived.
- **The marquee parking stays, and is now a recorded deviation.** Ticket 03 parked both rows one
  copy-width left, so the rendered transform is `translateX(offset − 200 − W/3)` where section 2
  writes `translateX(offset − 200)`. Kept: the written formula leaves row 2's leading edge exposed
  from the first frame of the pass and row 1's up to 288px inside the viewport at 1920, which
  contradicts the file's own "tripled for seamless scrolling"; the three copies are identical, so
  the visible band is the same pixels either way. Recorded as the fourth deviation.

  While writing it up, **the second deviation entry turned out to be wrong as written** and was
  corrected. It claimed "tripling keeps the edges off-screen". Tripling only buffers the trailing
  direction — it is the parking shift that keeps both ends out of view, and tripling is what gives
  that shift somewhere to park into. Ticket 03's comment had already measured this; the spec had not
  caught up. The entry's actual point — travel buffer, not an infinite loop, no modulo wrap — is
  unchanged and still holds.

### Criterion 2, and a stale count

The criterion says "one of the **two** already recorded there". The file recorded three before this
review and four after: ticket 01 added the em dash with owner sign-off, and this ticket added the
marquee parking. The criterion is ticked on the substance — every departure from a stated value is
accounted for — not on the count, which was stale when the ticket was written.

Checked mechanically rather than by eye: **26 of 28 strings the page actually renders are
byte-identical to the supplied design**, pulled from the DOM and diffed against the file with the
deviations block sliced off so only supplied values count. The two that differ are exactly the
signed-off em dash — the page title and the Branding description. **All 35 image URLs are identical
as sets**, spec to `identity.ts`, with no additions and no omissions.

Measured to the pixel across mobile / tablet / desktop, and matching `design-spec.md` at each: the
global ground on `html`, `body`, `#root` and the wrapper; `overflow-x: clip` on the wrapper; Kanit;
the five sections in order; nav sizes 14 / 18 / 22.4px and `justify-between`; the headline at
14 / 16 / 17.5vw over the specified gradient with transparent fill; the portrait at 280 / 440px,
horizontally centred, vertically centred on mobile and flush to `bottom: 0` from sm; marquee tiles
420×270 `rounded-2xl` `object-cover` lazy, `gap-3` within and between rows, 63 images across two
rows; the four about ornaments at their specified widths and insets; the services panel white with
top radii 40 / 60px, four `rgba(12, 12, 12, 0.15)` hairlines, numbers at both ends of
`clamp(3rem, 10vw, 140px)`, descriptions at opacity 0.6; the projects panel pulled up -40 / -56px at
`z-index: 10` with matching top radii, cards at `top` 0 / 28 / 56px on `sticky top-24 md:top-32`
inside `h-[85vh]`, the image grid at `2fr 3fr`, both column-one clamps reaching both ends; and both
buttons' gradients, shadows, outline offset, radii and tracking.

### Gate results

- **No horizontal scroll anywhere.** Swept 14 widths — 320 / 375 / 390 / 480 / 639 / 640 / 767 /
  768 / 820 / 1023 / 1024 / 1280 / 1440 / 1920, including both sides of every Tailwind breakpoint —
  sampling `scrollWidth − clientWidth` at 25 scroll positions through the whole document at each.
  **Zero overflow at all 350 samples**, on `documentElement` and `body` both.
- **`pnpm build` (`tsc -b && vite build`) and `pnpm test` (31 tests) pass** after the apostrophe
  change.
- **`lucide-react` is absent** from `package.json` and from the lockfile.
- **No modulo wrap.** The single `%` in `MarqueeSection.tsx` is the CSS percentage unit in the
  parking transform; `scroll.ts` has none at all.
- **Nothing outside the app moved.** `git diff --name-only 7cd65fa^..HEAD` — the whole 3D Portfolio
  effort, from the domain-model commit that opened it — touches nothing under `portfolio-react/` or
  `portfolio-next/`, and not `.github/workflows/master.yml`. The workflow still scopes its
  `working-directory`, cache key and publish folder to `portfolio-react`, so Pages still deploys the
  Live Portfolio.
- **No Production Role.** `README.md`, `CONTEXT.md` and ADR-0002 each say the app is not served and
  not a Cutover candidate until Reskin. The app has no deploy config, no host config, and nothing
  references it as a Cutover candidate.

### Carried forward, deliberately not changed

Five things the earlier tickets flagged for a second opinion. All are faithful renderings of stated
values or fills where the design is silent — none is a departure from a written value, so none is a
deviation and none blocks the gate. Reskin or a follow-up can revisit any of them.

- **The cards overrun their 85vh runway at desktop.** At 1440x900 a card measures 889px in a 765px
  sticky box, so at the end of the pass the three run 90 / 131 / 180px below the fold; at 375 there
  is no tension at all (494 in 690). Every number producing it is specified — the number's
  `clamp(3rem, 10vw, 140px)` at default leading, 230 + 317px of column-one images, the gaps and
  padding, inside `h-[85vh]`. Cheapest lever remains `leading-none` on the number span.
- **The stacked edges measure thinner than 28px** (14 / 22px at 1440), because a card scaling about
  the default `center` origin moves its own top edge down. The design specifies the offsets, not the
  resulting edges, and names no origin. `transformOrigin: 'top'` is the one-line reversal.
- **The portrait paints over the bottom bar between roughly 768 and 900px wide**, because the design
  puts `z-10` on the portrait and gives the bottom bar no stacking context. Reproduced as specified.
- **The services heading gets an entrance section 4 does not ask for**, taken on section 5's "same
  styling as other headings" and now owned by the shared `SectionHeading`. Ticket 05 called this the
  most arguable thing in that section and it still is.
- **Values invented where the design is silent**: the bottom bar's `px`, the services row gap and
  cross-axis alignment, the project card's gaps, the projects section's padding, and the category
  label's type. Each reuses the section's own padding rhythm rather than a scale invented from
  nothing; the category label is four choices with nothing in the file behind them.

### One thing outside the build's control

**`hero-celestia-preview-0yO3jXO8.gif` now 404s at motionsites.ai.** It is the 21st marquee URL,
matches `design-spec.md` character for character, and was the only failing request across the whole
review — the other 34 images all load. This is the recorded remote-imagery risk in `spec.md`
("those hosts can disappear"), arriving early. It is invisible in practice: it is the last tile of
row 2, and with the row parked and tripled it sits thousands of px outside the viewport at every
scroll position, which the screenshots confirm. Nothing to fix here — owned assets are Reskin's job.

Scope note: the only source change this ticket made is the two apostrophes and the comments around
them. No section was rebuilt, no carried-forward item was acted on, and no test was added — the
review's own instrumentation is throwaway and was not checked in, per `spec.md`'s "Design Fidelity
is confirmed by review against the written design values, not by automated assertion."

**The 3D Portfolio effort is complete.** The queue is drained.

# 02: Hero — name, portrait, supporting line

**What to build:** The hero introduces the site owner instead of the supplied design's fictional artist. The headline carries his name, the supporting line is site-authored, and the portrait slot is filled by his own photograph.

The portrait keeps everything the design gives it — its widths across tiers, its bottom-flush placement from `sm` up, its entrance delay and its magnetic hover. It is the existing headshot with the flat background removed and the result vendored into the app. A stylised image is expected to replace it later, and that must stay a single value change.

The call to action gets a `mailto:` destination so it works today; ticket 09 repoints it at the contact section once that exists.

**Blocked by:** 01 — Content contract and working nav

**Status:** done

- [x] The headline carries the owner's name, and no trace of the placeholder name remains in hero content
- [x] The supporting line is site-authored copy, not the supplied design's
- [x] The portrait is the owner's headshot with its background removed, vendored into the app, fetched from no third party
- [x] The portrait keeps its per-tier widths, its bottom-flush placement from `sm`, its entrance delay and its magnetic hover
- [x] Replacing the portrait is a single value change in the identity module
- [x] The call to action has a working destination
- [x] The contract test asserts no Placeholder Identity remains in hero content
- [x] No horizontal scroll at any of the three tiers
- [x] Build and every test pass

## Comments

**Built.** The headline carries the owner's full name, the supporting line is
site-authored, and the portrait is his own headshot cut out of its studio
background and vendored to `src/assets/portrait.png`.

### The headline had to be resized, and the sizes are measured

The supplied design's `14 / 15 / 16 / 17.5vw` ladder was tuned for the
placeholder's twelve-character line. "Adib Ahsan Chowdhury" is twenty
characters and wide-glyph-heavy, so at those sizes it overran the mask and was
silently clipped.

Kanit Black's advance for the name is 12.80em, taken from the Google Fonts TTF
with FreeType and cross-checked against Pillow and ImageMagick to four figures;
`tracking-tight` removes 0.025em per character, giving a rendered line of
12.325em, so 100/12.325 = 8.11vw is exactly full-bleed. The ladder became
`6.32 / 6.77 / 7.22 / 7.9vw`, which holds the design's ratios exactly
(6.32/7.9 = 0.800, 6.77/7.9 = 0.857, 7.22/7.9 = 0.914) and anchors `lg` at
97.4% of the viewport. The derivation and the recipe for re-deriving it sit in
a comment above the heading.

Worth recording: **the placeholder headline never spanned the full viewport**.
"Hi, i'm jack" measures 5.66em, so the original ladder spanned 75% → 94%. The
vw ladder *is* the design's statement about width per tier, so "fill the width"
and "keep the ratios" cannot both hold at every tier. The ladder was kept and
its top anchored at 97%, reproducing the design's ramp one notch wider.

### A clipped entrance deadlocked, and `FadeIn` gained a cue

Found at integration, in a browser at 526px: the headline did not render at all
below roughly 633px. The mask is only as tall as the line, the entrance starts
the line 40px down, and wherever the rendered type is shorter than that travel
the line begins wholly outside the mask. An `IntersectionObserver` watching a
fully-clipped element sees an empty rectangle, so `whileInView` never fired —
and the thing that would have moved the line back inside the clip was that very
animation. It stayed hidden because it had not animated, and did not animate
because it was hidden.

`FadeIn` gained a `cue` prop (`'in-view' | 'mount'`, defaulting to the former)
and the headline takes `mount`. The two are visually identical for anything on
screen at load, which the whole hero is. Verified after the fix at 375px and
768px in real viewports: the headline renders at both.

### Scope decisions

- **The about ornaments were vendored here.** No ticket owned them, and they
  were still linked from the supplied design's host — which ticket 03's
  "no supplied-design image host remains" assertion would have failed on. Same
  host, same download step, so they came with the portrait. They are unchanged
  in what they depict; the About section's visual language is out of scope.
- **The call to action points at `#contact`, not the `mailto:` stopgap.** The
  brief offered `mailto:` because ticket 09 had not landed; it landed in the
  same session, so the button points at the section.
- **Ornaments were downscaled** to roughly twice their largest display width,
  990KB to 482KB. No change to what they show.

### Known limits

- The left shoulder is out of focus in the source, so its matte is a ~10px soft
  ramp — correct, but softer than the right. The hair's finest flyaways are
  lost; the matte turns opaque about 2px in. Both were checked at 280px and
  520px on the dark ground and are invisible there.
- The font stack falls back to bare `sans-serif`, which is wider per cap than
  Kanit Black, so between first paint and the webfont loading the headline
  renders about 9% over and is clipped by the mask. Pre-existing and
  self-correcting; a `size-adjust` fallback `@font-face` would remove it.
- At 320px the four nav labels would overflow by around 10px. That is below the
  spec's narrow tier, and fixing it means leaving the design's type scale. At
  375px they measure 282px against 327px available.

### Corrected at review

- **The comment claiming all five hero entrances cue on mount was wrong** — only
  the masked headline does. Narrowed, and it now says why the other four are
  deliberately left alone: they are not masked, so nothing is broken, and a
  working entrance is not worth changing to make a comment tidier.
- **`SectionHeading`'s doc had been orphaned by the rename**, still describing
  "the three sections below the hero" and "the inverted services panel". It is
  four sections now, and the panel is capabilities.
- **`ContactButton` lost a `children` override no call site used.**

### Recorded for the effort, not for this ticket

The hero type scale is a Design Fidelity reversal — `14/15/16/17.5vw` became
`6.32/6.77/7.22/7.9vw` — and the spec's "What does not change" says the spacing
scale established during Design Fidelity is kept. It could not be: a
twenty-character `whitespace-nowrap` name does not fit a ladder tuned for
twelve. The reversal is forced, measured, and recorded above and in the code,
but it is a reversal, and ticket 11's review should note it alongside the other
Design Fidelity decisions this effort turns over.

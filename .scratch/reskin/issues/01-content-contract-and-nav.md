# 01: Content contract and working nav

**What to build:** The nav stops being decorative — clicking a link scrolls to its section. Section identifiers move out of the markup and into the identity module, alongside the nav items that point at them, so the two cannot drift apart. The effort's one new test seam lands here, carrying every assertion that can be true before any content changes.

This is the prefactor every other ticket depends on. It deliberately leaves a mid-state: the panel takes the identifier `capabilities` now, while its rows still list the Placeholder Identity's services until ticket 04. The nav carries three items at this stage; Contact joins when ticket 09 builds the section it points at.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] Nav items and section identifiers both live in the identity module, and each section takes its identifier from there rather than declaring a literal of its own
- [x] Clicking any nav item scrolls to its section, at all three breakpoint tiers
- [x] The `Price` nav item is gone
- [x] A test asserts every nav item's target is a section identifier that exists
- [x] A test asserts every external link in the identity module is a well-formed absolute URL
- [x] A test asserts every entry a section iterates carries the fields that section reads
- [x] The existing scroll-arithmetic and magnet tests still pass, unmodified
- [x] Production build succeeds

## Comments

**Built.** `sectionIds` and `navItems` now live in `src/content/identity.ts`, and all
five sections take their `id` from there — no section declares an identifier of its
own. The nav renders three anchors (About, Capabilities, Projects) as plain fragment
links, eased by a `scroll-behavior: smooth` rule in `index.css`. `Price` is gone.

The new seam is `src/content/identity.test.ts` — seven assertions over the module as
data, nothing rendered: nav targets resolve against `sectionIds`, external links are
well-formed absolute URLs, and every entry the five iterated collections carry
(nav items, marquee tiles, about ornaments, panel rows, projects) is filled in the
fields its section reads. Each assertion was mutation-checked: pointing a nav item at
a non-existent id, malforming an ornament URL, and blanking a panel row's name each
turn it red.

### Scope decisions

- **`sectionIds` covers all five sections, not just the three the nav reaches.** The
  criterion reads "each section takes its identifier from there"; `hero` and `marquee`
  cost an attribute each and make the module the page's structure rather than a nav
  lookup. Nothing points at them yet.
- **`contact` is deliberately absent from `sectionIds`.** Adding the identifier before
  ticket 09 builds the section would buy an anchor into thin air. The nav is three
  items at this stage, not the design's four.
- **The panel answers to `capabilities` while its rows still list Jack's services** —
  the mid-state this ticket's brief calls for. `ServicesSection` is not renamed;
  ticket 04 owns that section's content and says its component does not change.
- **A `prefers-reduced-motion` block accompanies the smooth-scroll rule.** Five lines,
  not on the checklist. Judged ordinary care welded to the mechanism this ticket
  introduces rather than the accessibility audit the spec puts out of scope.
- **No Placeholder Identity sweep yet.** It cannot pass until tickets 02-05 replace the
  copy, and a test that is red by design is worse than one that is absent. Tickets 02,
  04 and 11 each add their own slice of it. The test file says so in place.

### Known limits of the link sweep

`OUTWARD` catches any `scheme://`, plus `mailto:`, `tel:`, protocol-relative `//` and
`www.` hosts — `mailto:` specifically because ticket 09 adds an email address that
carries no `//`. A link written as a bare host with no scheme (`example.com/art.png`)
is not distinguishable from prose by inspection and goes unswept; relative paths are
excluded on purpose, because ticket 03 vendors its marks into the app. This is
recorded in the test file rather than left to be rediscovered.

### Verification

`tsc -b`, `vitest run` (38 passing — the 23 scroll and 7 magnet tests unmodified) and
`pnpm build` all clean. In a browser at 1502px, each of the three nav items lands its
section exactly at the viewport top (`about` 1569px, `capabilities` 2386px, `projects`
4392px) with no horizontal overflow.

Two caveats on that browser check, for ticket 11's review to close with human eyes:

1. **Smooth scrolling could not be observed animating.** The Chrome instance suppresses
   it browser-wide — a plain unrelated `div` given `behavior: 'smooth'` also refuses to
   move — so landing was measured with `scroll-behavior` forced to `auto`. The anchors
   are verified; the easing is not.
2. **The three-tier claim rests on construction, not measurement.** The extension's
   window resize did not reach the tab's viewport (`outerWidth` reported 0), so all
   measurements are at one width. The nav is never hidden responsively and all five
   sections render unconditionally, and fragment-anchor resolution is layout-independent
   — but the spec makes browser automation explicitly not an acceptance condition and
   puts the three-tier check in review, which is where it should land.

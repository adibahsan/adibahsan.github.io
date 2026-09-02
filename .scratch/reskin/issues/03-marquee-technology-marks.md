# 03: Marquee — technology marks

**What to build:** The band stops showing third-party marketing GIFs and starts showing the technologies the owner actually builds with. Tiles reshape from landscape image cards to squares.

The set leads with the current stack and keeps a small JVM tail, so a JVM-shaped opportunity still recognises him without the band advertising a stack he has largely left. Every mark is vendored into the app.

The band's mechanics are not to be touched: the two rows travel in opposite directions off the existing scroll arithmetic, parked a copy-width left so neither end enters view. `design-spec.md` records why there is no modulo wrap — adding one is a regression.

**Blocked by:** 01 — Content contract and working nav

**Status:** done

- [x] Tiles are square and carry technology marks
- [x] The set leads with the current stack and keeps a JVM tail
- [x] Every mark is vendored into the app; the page makes no runtime request to a third-party host
- [x] The two rows still travel in opposite directions, and neither row's end enters view at any scroll position or tier
- [x] No modulo wrap is introduced
- [x] The scroll-arithmetic module and its tests are unmodified
- [x] The contract test asserts no supplied-design image host remains
- [x] No horizontal scroll at any of the three tiers
- [x] Build and every test pass

## Comments

**Built.** The band carries 21 technology marks on square tiles: the current
stack first, a three-mark JVM tail (Kotlin, Spring Boot, Java) so a JVM-shaped
opportunity still recognises him.

All 21 are vendored from simple-icons to `src/assets/marks/` — 24KB across 21
files, all validating under `xmllint`. Twenty of them fall under Vite's 4KB
inline threshold and ship as `data:` URIs in the built bundle, so the page makes
no request for them at all; only `postgresql.svg` is emitted as a file.

**Recolouring was mandatory, not only aesthetic.** The npm package ships these
with no `fill` at all rather than a brand fill, so the default is black and
every mark would have been invisible on `#0C0C0C`. Each file carries one
`fill="#D7E2EA"` on the root `<svg>`. It has to live in the source because an
external SVG loaded through `<img>` cannot inherit `currentColor`. Twenty-one
brand colours would also have read as a sponsor wall rather than a stack.

Tiles are `size-[160px] sm:size-[200px] md:size-[260px]`, with the project
cards' own `border-2 border-foreground bg-ground` at the band's existing
`rounded-2xl`, and padding holding each mark at about half the tile width so it
sits on a plate rather than bleeding to the edges.

### The mechanics are untouched, and the copy count was re-derived

`COPIES`, `PARKED`, the `useLayoutEffect`, both listeners and the direct-to-node
transform writes are unchanged, as is the 11/10 split. No modulo wrap.

Square tiles make each row substantially shorter, so "neither end enters view"
was re-checked rather than assumed. At the widest tier row one is 8964px over
three copies and row two 8148px; travel across the band's pass is
`0.3 x (732 + vh) - 200`. Row two's trailing edge binds, landing at +5088px at
1920x1080 and +4764px at 3840x2160 — clear of any realistic viewport. Three
copies hold; no fourth and no wrap. The derivation is in the `COPIES` comment.

### Scope decisions

- **The band gained one `sr-only` paragraph** naming the 21 technologies once.
  The images stay `alt=""` because each renders three times, so alt text would
  be read out three times over; without the paragraph the band said nothing at
  all to a screen reader, which it now does have something to say.

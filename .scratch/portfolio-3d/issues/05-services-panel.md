# 05 — Services panel

**What to build:** A panel that inverts to a light ground with a rounded top edge, reading as a distinct surface against the dark sections either side of it. It lists five services, each showing its number, name, and description in a consistent row, with rows arriving in sequence rather than all together.

**Blocked by:** 02 — Hero section

**Status:** done

- [x] The panel renders on the light ground with rounded top corners at the radii given per tier in `design-spec.md`
- [x] The heading renders in the dark ink colour at the specified fluid size
- [x] Five service rows render, each with its number, name, and description laid out as specified
- [x] Rows are separated by hairline rules at the specified colour and weight
- [x] Rows enter in a staggered sequence, each offset from the previous
- [x] Number, name, and description each use their specified fluid type sizes and weights
- [x] The section introduces no horizontal scrolling at any tier
- [x] All five service names and descriptions are the Placeholder Identity, reproduced verbatim

## Comments

Landed as `src/sections/ServicesSection.tsx`, with the five services joining the Placeholder
Identity in `src/content/identity.ts`. `App.tsx` mounts `<ServicesSection />` below the about
section, in the specified section order. No new arithmetic: the stagger is `FadeIn delay={i * 0.1}`,
so nothing was added to `src/lib/scroll.ts` and the test count is unchanged at 22 — the card-stacking
formula remains ticket 06's.

Verified in a real browser against `pnpm preview`, driven with Playwright at 375x812 / 640x900 /
768x900 / 1024x900 / 1440x900 / 1920x1200:

- Panel is `rgb(255, 255, 255)` with top radii 40 / 50 / 60px and square bottom corners, padding
  20 / 32 / 40 across and 80 / 96 / 128 down — `design-spec.md` section 4 to the pixel at every tier.
- Heading resolves to 48 / 76.8 / 92.16 / 122.88 / 160 / 160px — `clamp(3rem, 12vw, 160px)` with
  both ends of the clamp actually reached — at weight 900, uppercase, centred, `rgb(12, 12, 12)`,
  with margin-bottom 64 / 80 / 112.
- The list is `max-w-5xl` (1024px) and centred, reaching its cap at 1440 and above.
- Numbers resolve to 48 / 64 / 76.8 / 102.4 / 140 / 140px at weight 900 in `rgb(12, 12, 12)`; names
  to 16 / 16 / 16.896 / 22.528 / 31.68 / 33.6px at weight 500, uppercase; descriptions to
  13.6 / 13.6 / 13.6 / 16.384 / 20 / 20px at weight 300, line-height 1.625, opacity 0.6, capped at
  672px and reaching that cap from 1024 up. All three clamps reach both ends across the tier set.
- Four hairlines, none above the first row: `1px solid rgba(12, 12, 12, 0.15)` exactly. Row padding
  measures 32 / 40 / 48 top and bottom.
- Rows enter in sequence. Measured in a viewport tall enough to hold the whole list — so every row
  crosses the entrance threshold together and what remains is the delay alone — they arrive at
  56 / 163 / 260 / 358 / 457ms at 375px and 58 / 165 / 262 / 373 / 459ms at 1440px: gaps of ~100ms,
  strictly increasing at both, all settling at opacity 1 with no residual transform.
- `document.documentElement.scrollWidth === window.innerWidth` at all six tiers, sampled at 41
  scroll positions through the whole document.
- The five names and descriptions were diffed programmatically against `design-spec.md` rather than
  read by eye: byte-for-byte identical, the two `--` in Branding excepted.

**A first measurement of the stagger was wrong and is worth recording.** Scrolling the section top
to 100px and sampling caught only rows 1 and 2; rows 3-5 read as never arriving. They were simply
below the fold — at 1440x900 the 160px heading, its 112px margin and the 128px top padding leave
room for about two rows — and `whileInView` had correctly not fired. The fix was a viewport tall
enough to hold the list. A future session sampling entrances near the bottom of a section should
check the rows are actually in view before reading a null as a defect.

Judgement calls, in the order they most want a second opinion at ticket 07:

- **The heading gets an entrance the design does not ask for.** Section 4 names one animation —
  "Staggered FadeIn: each item delays by i * 0.1" — and, unlike sections 1 and 3, gives its heading
  no FadeIn line. Ticket 04 declined exactly this reasoning for the about section's contact button:
  "the file enumerating entrances where it wants them; adding one here would be inventing." It is
  taken the other way here, because a heading that snaps into place above five rows that stagger in
  beneath it reads as a bug rather than as a choice, and section 5 calls the projects heading "same
  styling as other headings". `leading-none tracking-tight` rides on the same reading. Reversing it
  is deleting two props and two classes. This is the single most reversible-and-arguable thing in
  the section.
- **The row's gap and alignment are invented.** `design-spec.md` says "horizontal layout with number
  on the left and name + description stacked vertically on the right" and gives neither a gap nor a
  cross-axis alignment, but a flex row must have both. The gap is `gap-5 sm:gap-8 md:gap-10`, which
  is the section's own `px-5 sm:px-8 md:px-10` rhythm rather than a fourth scale invented from
  nothing; the alignment is `items-center`.
- **The number keeps default leading, and this is what makes the rows tall.** `design-spec.md` gives
  the display headings `leading-none` explicitly and gives the service number only "font-black, font
  size clamp(3rem, 10vw, 140px), color #0C0C0C". Read literally, so at 1440 the number's line box is
  ~210px and each row is ~306px tall — the vertical rhythm is set by the number's half-leading, not
  by `py-12`. If the panel reads as too airy at review, `leading-none` on that one span is the lever.

Smaller notes:

- **The list is an `<ol>`, and the drawn ordinal is `aria-hidden`.** The numbers are positional, so
  they are derived — `String(index + 1).padStart(2, '0')` — rather than stored beside the copy,
  which means Reskin can add, drop or reorder a service without renumbering by hand. An ordered list
  then carries the numbering into the accessibility tree properly, instead of five spans reading out
  as loose text. Tailwind's preflight sets `list-style: none`, so the swap from `<ul>` moved nothing:
  re-measured at 375 / 768 / 1440, the rows keep their exact geometry, there is no `::marker`, and
  `ariaSnapshot()` reports heading, then a list of five items each with its own heading and
  paragraph. Same clause ticket 04 cited — `spec.md` asks for correct semantic elements as ordinary
  care.
- **The row *is* the `FadeIn`, not a wrapper inside it** (`as="li"`). `divide-y` puts the rule on
  each row but the first, so making the row the animated element means a rule fades in with the row
  it belongs to, rather than ruling off a row that has not turned up yet.
- **The hairline is `divide-ground/15`, not a second literal.** The `ground` token is `#0C0C0C`, so
  the opacity modifier resolves to exactly the `rgba(12, 12, 12, 0.15)` the design gives, and the
  colour cannot drift from the panel's ink. `tailwind.config.js` gained a comment on this: the token
  is named for the role it holds over most of the page, but the services panel inverts and there the
  same hex is the ink and its hairlines — one token rather than a second name for the same value.
- **Colours arrive by inheritance.** `text-ground` on the section covers the heading and the numbers,
  which `design-spec.md` names as #0C0C0C, and the names and descriptions it leaves unstated.
- **`shrink-0` on the number** keeps it at its clamped size instead of letting the description
  squeeze it at 375px.

**Carried forward to ticket 06 rather than done here:** the display heading is now written out three
times in near-identical form — hero, about, and this one — and `design-spec.md` line 111 specifies a
fourth for projects as "same styling as other headings". The shape is `as="h2" y={40}`, `font-black
uppercase leading-none tracking-tight`, `clamp(3rem, 12vw, 160px)`, differing only in the
`hero-heading` gradient and in margin. A `SectionHeading` primitive would fold all four and matches
`spec.md`'s "shared visual primitives factored as reusable components". It is not done here because
extracting it means editing `AboutSection.tsx` — ticket 04's landed, verified work — for a need that
is mostly ticket 06's, and this ticket's brief is its own acceptance criteria. Ticket 06 will have
the third copy in front of it and is the right place to decide.

Scope notes: nothing from ticket 06 was built — no card stacking, no `targetScale` in `scroll.ts`,
no project data. The Placeholder Identity is retained verbatim.

Verified: `pnpm build` (`tsc -b && vite build`) and `pnpm test` (22 tests) both pass. `git status`
shows changes confined to `portfolio-3d/` and this ticket — `portfolio-react/`, `portfolio-next/`,
and `.github/workflows/master.yml` are untouched.

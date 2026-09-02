import { useLayoutEffect, useRef, type RefObject } from 'react'

import { marqueeMarks, sectionIds } from '../content/identity'
import { marqueeAtRest, marqueeShift } from '../lib/scroll'

type Mark = (typeof marqueeMarks)[number]

/** The design splits the 21 marks across the two rows: first 11, then the rest. */
const rightwardMarks = marqueeMarks.slice(0, 11)
const leftwardMarks = marqueeMarks.slice(11)

/**
 * Copies of each row laid end to end. This is travel buffer, not an infinite
 * loop: the rows move a few hundred px across the section's entire pass, and
 * three copies put both ends thousands of px outside the viewport. There is no
 * wrap to reset, and adding one would be a regression.
 *
 * Square tiles shortened both rows — the widest tile went from 420px to 260px —
 * so the buffer was re-derived rather than assumed. At the widest tier the rows
 * measure 33 x 260 + 32 x 12 = 8964px and 30 x 260 + 29 x 12 = 8148px, each
 * parked one copy (2988px and 2716px) left of its natural place. Travel over
 * the band's pass is `0.3 x (bandHeight + viewportHeight) - 200`, which at
 * 1920x1080 runs -200px to +344px, so:
 *
 *   row 1 leading edge   -2988 + 344 = -2644px  (2644px left of the viewport)
 *   row 1 trailing edge   5976 - 200 = +5776px  (3856px right of a 1920 one)
 *   row 2 leading edge   -2716 + 200 = -2516px
 *   row 2 trailing edge   5432 - 344 = +5088px
 *
 * Row 2's trailing edge is the binding one, and it clears any viewport narrower
 * than 5088px; at 3840x2160, where the taller viewport buys more travel, it
 * still sits at 4764px with 924px to spare. Three copies hold. Were they ever
 * not to, the fix is a fourth copy here, not a wrap.
 */
const COPIES = 3

/**
 * The parking shift: one copy's width, expressed as a share of the row's own so
 * it stays tied to `COPIES` rather than restating it in a second notation. The
 * gaps make it a few px short of exactly one copy, which is invisible on a row
 * that has no seam to align.
 */
const PARKED = `translateX(-${(100 / COPIES).toFixed(4)}%)`

/**
 * The tile: square, at the row height the band was built around.
 *
 * 260px at the widest tier keeps the band's visual weight where the landscape
 * cards left it — they were 270px tall — and the narrow tiers step down on the
 * same ratio the rest of the page uses for its radii and padding.
 */
const TILE = 'size-[160px] sm:size-[200px] md:size-[260px]'

/**
 * Padding around the mark, holding it at roughly half the tile's width at every
 * tier. A logo sits *on* a surface; the previews this band used to carry were
 * photographs and bled to their edges, and a mark that did the same would read
 * as a sticker rather than as a plate.
 */
const TILE_PADDING = 'p-9 sm:p-12 md:p-16'

/**
 * The plate itself, quoting the project cards' surface — `border-2
 * border-foreground bg-ground` — at the band's own `rounded-2xl` radius. The
 * marquee tiles become small siblings of the cards further down the page rather
 * than a treatment invented for this one section, and nothing here reaches
 * outside the `ground`/`foreground` pair.
 *
 * The marks themselves are vendored from simple-icons and recoloured to
 * `foreground` (#D7E2EA) in the SVG source, because an `<img>` cannot inherit
 * `currentColor` from the page. That is a design decision as much as a
 * technical one: simple-icons ships each mark black, and twenty-one brand
 * palettes would read as a sponsor wall. One material — the same colour as the
 * hairline framing it and the type everywhere else — reads as a stack.
 */
const TILE_SURFACE = 'rounded-2xl border-2 border-foreground bg-ground'

interface MarqueeRowProps {
  marks: readonly Mark[]
  /** Where the row sits until the first scroll reading, in px. */
  restingShift: number
  rowRef: RefObject<HTMLDivElement>
}

/**
 * One row of technology marks, sliding as a unit.
 *
 * The outer element parks the row a copy's width left of where it would
 * naturally sit, so the travel happens inside the middle copy and neither end
 * comes into view. Parking is static and separate from the transform below
 * precisely so it applies on the first paint, before any scroll has been read.
 */
function MarqueeRow({ marks, restingShift, rowRef }: MarqueeRowProps) {
  return (
    <div className="w-max" style={{ transform: PARKED }}>
      <div
        ref={rowRef}
        className="flex w-max gap-3"
        style={{
          transform: `translateX(${restingShift}px)`,
          willChange: 'transform',
        }}
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          marks.map((mark) => (
            <div
              key={`${copy}-${mark.name}`}
              className={`flex shrink-0 items-center justify-center ${TILE_SURFACE} ${TILE} ${TILE_PADDING}`}
            >
              {/*
                Decorative, and each mark appears three times over: alt text here
                would be read out three times and says nothing the sr-only line
                in the section below does not say once.
              */}
              <img
                src={mark.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          )),
        )}
      </div>
    </div>
  )
}

/**
 * A band of technology marks that slides as the page scrolls — the top row
 * right, the bottom row left — so the section reads as motion rather than as a
 * grid.
 */
export function MarqueeSection() {
  const band = useRef<HTMLElement>(null)
  const rightRow = useRef<HTMLDivElement>(null)
  const leftRow = useRef<HTMLDivElement>(null)

  // Layout rather than passive: on a reload that restores a scroll position
  // inside the band, an effect would let the browser paint the resting
  // transform for a frame before correcting it.
  useLayoutEffect(() => {
    const section = band.current
    const right = rightRow.current
    const left = leftRow.current
    if (!section || !right || !left) return

    // Written straight to the nodes rather than held in state: the rows are 63
    // tiles between them, and re-rendering that on every scroll event to move a
    // transform React never reads back would be the whole cost of the effect.
    //
    // The section is measured each time rather than cached, so the rows stay
    // correct through anything that moves the page under them — a late webfont,
    // an image settling, a section added above. One rect read against clean
    // layout is cheaper than the staleness caching it would buy.
    const update = () => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const shift = marqueeShift(window.scrollY, sectionTop, window.innerHeight)

      right.style.transform = `translateX(${shift.rightward}px)`
      left.style.transform = `translateX(${shift.leftward}px)`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    // Both the viewport height and the section's position feed the offset, and
    // a resize changes them without scrolling anything.
    window.addEventListener('resize', update, { passive: true })

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section
      ref={band}
      id={sectionIds.marquee}
      className="flex flex-col gap-3 bg-ground pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      {/*
        The band is 63 decorative images, so it would otherwise be silent. It
        now carries names, and the set is worth reading once — but only once,
        which is why it is said here rather than in 63 alt attributes. Out of
        flow (`sr-only` is absolutely positioned), so the two rows still sit at
        `gap-3` from each other.
      */}
      <p className="sr-only">Built with {marqueeMarks.map((mark) => mark.name).join(', ')}.</p>
      <MarqueeRow
        marks={rightwardMarks}
        restingShift={marqueeAtRest.rightward}
        rowRef={rightRow}
      />
      <MarqueeRow marks={leftwardMarks} restingShift={marqueeAtRest.leftward} rowRef={leftRow} />
    </section>
  )
}

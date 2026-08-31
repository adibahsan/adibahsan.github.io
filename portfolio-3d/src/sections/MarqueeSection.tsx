import { useLayoutEffect, useRef, type RefObject } from 'react'

import { marqueeImages } from '../content/identity'
import { marqueeAtRest, marqueeShift } from '../lib/scroll'

/** The design splits the 21 previews across the two rows: first 11, then the rest. */
const rightwardImages = marqueeImages.slice(0, 11)
const leftwardImages = marqueeImages.slice(11)

/**
 * Copies of each row laid end to end. This is travel buffer, not an infinite
 * loop: the rows move a few hundred px across the section's entire pass, and
 * three copies put both ends thousands of px outside the viewport. There is no
 * wrap to reset, and adding one would be a regression.
 */
const COPIES = 3

/**
 * The parking shift: one copy's width, expressed as a share of the row's own so
 * it stays tied to `COPIES` rather than restating it in a second notation. The
 * gaps make it a few px short of exactly one copy, which is invisible on a row
 * that has no seam to align.
 */
const PARKED = `translateX(-${(100 / COPIES).toFixed(4)}%)`

interface MarqueeRowProps {
  images: readonly string[]
  /** Where the row sits until the first scroll reading, in px. */
  restingShift: number
  rowRef: RefObject<HTMLDivElement>
}

/**
 * One row of previews, sliding as a unit.
 *
 * The outer element parks the row a copy's width left of where it would
 * naturally sit, so the travel happens inside the middle copy and neither end
 * comes into view. Parking is static and separate from the transform below
 * precisely so it applies on the first paint, before any scroll has been read.
 */
function MarqueeRow({ images, restingShift, rowRef }: MarqueeRowProps) {
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
          images.map((src, index) => (
            // Decorative, and each one appears three times over: alt text here
            // would be read out three times and says nothing the page does not.
            <img
              key={`${copy}-${index}`}
              src={src}
              alt=""
              loading="lazy"
              className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
            />
          )),
        )}
      </div>
    </div>
  )
}

/**
 * A band of work previews that slides as the page scrolls — the top row right,
 * the bottom row left — so the section reads as motion rather than as a grid.
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
    // images between them, and re-rendering that on every scroll event to move
    // a transform React never reads back would be the whole cost of the effect.
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
    <section ref={band} className="flex flex-col gap-3 bg-ground pb-10 pt-24 sm:pt-32 md:pt-40">
      <MarqueeRow
        images={rightwardImages}
        restingShift={marqueeAtRest.rightward}
        rowRef={rightRow}
      />
      <MarqueeRow images={leftwardImages} restingShift={marqueeAtRest.leftward} rowRef={leftRow} />
    </section>
  )
}

/**
 * The scroll-driven arithmetic, kept free of the DOM so it can be verified
 * without rendering a page. Components measure the page and hand the numbers
 * in; everything here is a function of those inputs alone.
 */

/** Fraction of the page's scroll distance the marquee band travels. */
const TRAVEL_RATE = 0.3

/** How far left the rightward row sits when the section's pass begins. */
const START_SHIFT = 200

export interface MarqueeShift {
  /** Translation for the row that travels right, in px. */
  readonly rightward: number
  /** Translation for the row that travels left: the exact negation. */
  readonly leftward: number
}

/**
 * How far the two marquee rows have travelled at a given scroll position.
 *
 * The pass is measured from the moment the section's top edge touches the
 * bottom of the viewport, which is where the rows are furthest left and right
 * respectively. From there they separate at three tenths of the scroll speed.
 */
export function marqueeShift(
  scrollY: number,
  sectionTop: number,
  viewportHeight: number,
): MarqueeShift {
  const travelled = (scrollY - sectionTop + viewportHeight) * TRAVEL_RATE - START_SHIFT

  return { rightward: travelled, leftward: -travelled }
}

/**
 * Where the rows sit before any scroll position has been read: the start of the
 * pass, where `scrollY - sectionTop + viewportHeight` is zero. Evaluated from
 * the formula rather than written out, so it cannot drift away from it.
 */
export const marqueeAtRest: MarqueeShift = marqueeShift(0, 0, 0)

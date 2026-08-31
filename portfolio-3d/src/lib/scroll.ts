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

/** Opacity of a character the reveal has not reached yet. */
const DIMMED = 0.2

/** Opacity of a character the reveal has passed. */
const LIT = 1

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/**
 * How lit one character of a scroll-revealed paragraph is.
 *
 * The paragraph's pass is divided into one window per character, so the reveal
 * sweeps from the first character to the last at a steady rate: character
 * `index` brightens from {@link DIMMED} to {@link LIT} between `index / total`
 * and `(index + 1) / total` of the way through, and holds at either end outside
 * its own window.
 */
export function characterOpacity(index: number, total: number, progress: number): number {
  // Progress restated in characters — 0 at the start of the paragraph, `total`
  // at the end. How far it has run past this character's own place in the line
  // is how far through that character's window the sweep has come.
  const through = clamp01(progress * total - index)

  return DIMMED + (LIT - DIMMED) * through
}

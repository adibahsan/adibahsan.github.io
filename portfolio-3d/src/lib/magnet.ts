/**
 * The arithmetic behind the magnetic hover, kept free of the DOM so it can be
 * verified without rendering a page. The component that consumes it supplies a
 * measured rectangle and a cursor position; everything else is a function of
 * those inputs.
 */

/** The measured, untransformed box of the element being pulled. */
export interface MagnetBounds {
  left: number
  top: number
  width: number
  height: number
}

export interface MagnetPull {
  /** True while the cursor is inside the activation band. */
  readonly active: boolean
  /** Horizontal displacement to apply, in px. */
  readonly x: number
  /** Vertical displacement to apply, in px. */
  readonly y: number
}

/** Undisplaced, cursor out of range. Shared, which the readonly fields make safe. */
export const atRest: MagnetPull = { active: false, x: 0, y: 0 }

/**
 * Displacement to apply to an element the cursor is pulling on.
 *
 * The activation band extends `padding` px beyond every edge, measured
 * per-axis: leaving the band on either axis releases the element. Inside it the
 * element follows the cursor's offset from its own centre, divided by
 * `strength` — so a higher strength is a weaker, shorter pull.
 */
export function magnetPull(
  pointerX: number,
  pointerY: number,
  bounds: MagnetBounds,
  padding: number,
  strength: number,
): MagnetPull {
  const offsetX = pointerX - (bounds.left + bounds.width / 2)
  const offsetY = pointerY - (bounds.top + bounds.height / 2)

  const withinX = Math.abs(offsetX) < bounds.width / 2 + padding
  const withinY = Math.abs(offsetY) < bounds.height / 2 + padding

  if (!withinX || !withinY) return atRest

  return { active: true, x: offsetX / strength, y: offsetY / strength }
}

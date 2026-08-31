import { describe, expect, it } from 'vitest'

import { magnetPull, type MagnetBounds } from './magnet'

/**
 * A 200x100 element whose centre sits at (200, 150). Every case below is
 * expressed as an offset from that centre so the arithmetic stays readable.
 */
const bounds: MagnetBounds = { left: 100, top: 100, width: 200, height: 100 }
const centre = { x: 200, y: 150 }

/** The hero's settings, from `design-spec.md`. */
const padding = 150
const strength = 3

describe('magnetPull', () => {
  it('engages with no displacement when the cursor is dead centre', () => {
    expect(magnetPull(centre.x, centre.y, bounds, padding, strength)).toEqual({
      active: true,
      x: 0,
      y: 0,
    })
  })

  it('divides the cursor offset by the strength factor', () => {
    const pull = magnetPull(centre.x + 60, centre.y + 30, bounds, padding, strength)

    expect(pull).toEqual({ active: true, x: 20, y: 10 })
  })

  it('pulls toward a cursor above and left of centre, not away from it', () => {
    const pull = magnetPull(centre.x - 60, centre.y - 30, bounds, padding, strength)

    expect(pull).toEqual({ active: true, x: -20, y: -10 })
  })

  it('engages anywhere inside the padding band around the edge', () => {
    // Half-width 100 plus 150 padding: the band reaches 250px from the centre.
    const pull = magnetPull(centre.x + 249, centre.y, bounds, padding, strength)

    expect(pull.active).toBe(true)
  })

  it('rests once the cursor clears the padding band', () => {
    expect(magnetPull(centre.x + 250, centre.y, bounds, padding, strength)).toEqual({
      active: false,
      x: 0,
      y: 0,
    })
  })

  it('rests when either axis is outside the band, not only both', () => {
    // Horizontally well inside the band, vertically clear of it.
    const pull = magnetPull(centre.x, centre.y + 200, bounds, padding, strength)

    expect(pull).toEqual({ active: false, x: 0, y: 0 })
  })

  it('measures the band from each edge, so a tall element reaches further down', () => {
    // Half-height 50 plus 150 padding: the vertical band reaches 200px.
    expect(magnetPull(centre.x, centre.y + 199, bounds, padding, strength).active).toBe(true)
    expect(magnetPull(centre.x, centre.y + 201, bounds, padding, strength).active).toBe(false)
  })
})

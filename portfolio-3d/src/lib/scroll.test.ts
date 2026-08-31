import { describe, expect, it } from 'vitest'

import { marqueeAtRest, marqueeShift } from './scroll'

/**
 * A section whose top sits 900px down the document, viewed through a 900px
 * viewport — so scroll position 0 is the moment the section's top edge touches
 * the bottom of the viewport, where its pass begins.
 */
const sectionTop = 900
const viewportHeight = 900

const shiftAt = (scrollY: number) => marqueeShift(scrollY, sectionTop, viewportHeight)

describe('marqueeShift', () => {
  it('starts the rightward row 200px to the left as the section touches the viewport', () => {
    expect(shiftAt(0)).toEqual({ rightward: -200, leftward: 200 })
  })

  it('rests where the pass begins, so the first paint matches the first reading', () => {
    expect(marqueeAtRest).toEqual(shiftAt(0))
  })

  it('travels three tenths of the distance the page scrolls', () => {
    // 500px of scroll moves the band 150px, from -200 to -50.
    expect(shiftAt(500).rightward).toBeCloseTo(-50)
  })

  it('gives the two rows opposing signs across the whole pass', () => {
    for (const scrollY of [0, 250, 500, 1000, 1800, 3000]) {
      const { rightward, leftward } = shiftAt(scrollY)

      expect(leftward).toBeCloseTo(-rightward)
    }
  })

  it('carries the rightward row right and the leftward row left as the page scrolls', () => {
    const early = shiftAt(400)
    const late = shiftAt(1200)

    expect(late.rightward).toBeGreaterThan(early.rightward)
    expect(late.leftward).toBeLessThan(early.leftward)
  })

  it('reads the section from its own top, so a later section starts its pass over', () => {
    const later = marqueeShift(4000, 4900, viewportHeight)

    expect(later).toEqual(shiftAt(0))
  })

  it('starts the pass earlier in a taller viewport, which reveals the section sooner', () => {
    const tall = marqueeShift(0, sectionTop, 1200)

    // The extra 300px of viewport is 300px of the section's pass already spent.
    expect(tall.rightward).toBeCloseTo(-110)
  })
})

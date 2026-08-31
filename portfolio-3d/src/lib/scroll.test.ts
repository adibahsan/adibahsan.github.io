import { describe, expect, it } from 'vitest'

import { characterOpacity, marqueeAtRest, marqueeShift } from './scroll'

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

/**
 * A ten-character paragraph, so each character owns exactly a tenth of the
 * pass and the arithmetic can be read off by eye.
 */
const total = 10

const opacityAt = (index: number, progress: number) =>
  characterOpacity(index, total, progress)

describe('characterOpacity', () => {
  it('holds every character dimmed before the pass begins', () => {
    expect(opacityAt(0, 0)).toBe(0.2)
    expect(opacityAt(total - 1, 0)).toBe(0.2)
  })

  it('holds every character lit once the pass has finished', () => {
    expect(opacityAt(0, 1)).toBe(1)
    expect(opacityAt(total - 1, 1)).toBe(1)
  })

  it('gives the first character the opening slice of the pass', () => {
    // Half a tenth in is half way through the first character's own window.
    expect(opacityAt(0, 0.05)).toBeCloseTo(0.6)
    expect(opacityAt(0, 0.1)).toBeCloseTo(1)
  })

  it('gives the last character the closing slice, and not a moment before', () => {
    expect(opacityAt(total - 1, 0.9)).toBeCloseTo(0.2)
    expect(opacityAt(total - 1, 0.95)).toBeCloseTo(0.6)
  })

  it('sweeps forward: at any point no character is lighter than the one before it', () => {
    for (const progress of [0, 0.15, 0.4, 0.55, 0.8, 1]) {
      for (let index = 1; index < total; index += 1) {
        expect(opacityAt(index, progress)).toBeLessThanOrEqual(opacityAt(index - 1, progress))
      }
    }
  })

  it('leaves a character lit once the sweep has passed it', () => {
    expect(opacityAt(3, 0.4)).toBeCloseTo(1)
    expect(opacityAt(3, 0.7)).toBeCloseTo(1)
  })

  it('clamps progress that runs outside the pass at either end', () => {
    expect(opacityAt(0, -0.5)).toBe(0.2)
    expect(opacityAt(total - 1, 1.5)).toBe(1)
  })
})

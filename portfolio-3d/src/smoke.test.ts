import { describe, expect, it } from 'vitest'

/**
 * Harness proof. The scroll-arithmetic module is this app's real unit-test seam
 * and arrives with the sections that use it; until then this asserts only that
 * the runner resolves and executes the app's TypeScript.
 */
describe('test harness', () => {
  it('runs a TypeScript test file', () => {
    const doubled: number[] = [1, 2, 3].map((n) => n * 2)

    expect(doubled).toEqual([2, 4, 6])
  })
})

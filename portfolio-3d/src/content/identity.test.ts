import { describe, expect, it } from 'vitest'

import * as identity from './identity'

/**
 * The content contract: assertions over the identity module as data, with
 * nothing rendered.
 *
 * This is Reskin's one new test seam and the highest available to it. The
 * sweeps below deliberately assert *properties* the page must hold rather than
 * the values it currently carries — that every anchor resolves, that no link is
 * malformed, that no entry a section iterates is half-filled. Transcribing the
 * content into expectations would test the copy rather than the contract, and
 * would go red on every intentional wording change.
 *
 * The Placeholder Identity sweep is not here yet: it cannot be true until the
 * section tickets replace the copy, and a test that is red by design is worse
 * than one that is absent. It arrives with the tickets that make it pass.
 */

const { about, marqueeImages, navItems, projects, sectionIds, services } = identity

/**
 * Every string anywhere in the module. Walks the namespace rather than a named
 * list of exports so the link sweep reaches material later tickets add without
 * being extended for each one — the field sweep below is not generic in the
 * same way, and names the collections it checks.
 */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings)
  return []
}

/**
 * Points off-site: any scheme, a protocol-relative prefix, or a `www.` host.
 *
 * Deliberately not every asset path. Reskin vendors its art into the app, so
 * those paths are relative on purpose and demanding they be absolute would be
 * wrong. `mailto:` is named because the contact section's address is an
 * external link that carries no `//`.
 *
 * The limit worth knowing: a link written as a bare host with no scheme at all
 * — `example.com/art.png` — is not distinguishable from prose by inspection,
 * and goes unswept. `www.` is caught only because nothing else opens that way.
 */
const OUTWARD = /:\/\/|^(?:mailto|tel):|^\/\/|^www\./i

/** The schemes a link on this site legitimately takes. */
const SCHEMES = ['http:', 'https:', 'mailto:', 'tel:']

function isAbsoluteUrl(value: string): boolean {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    return false
  }

  if (!SCHEMES.includes(url.protocol)) return false

  // http(s) address a host; mailto and tel put the recipient in the path.
  return url.protocol === 'http:' || url.protocol === 'https:'
    ? url.host !== ''
    : url.pathname !== ''
}

/**
 * A field is filled when it is a non-blank string, or a non-empty collection of
 * filled things — the project galleries are arrays, and an empty one renders as
 * nothing just as a blank string does. Objects count for the same reason, so a
 * later section grouping a link's label and href together does not read as
 * empty here.
 */
function filled(value: unknown): boolean {
  if (typeof value === 'string') return value.trim() !== ''
  if (Array.isArray(value)) return value.length > 0 && value.every(filled)
  if (value && typeof value === 'object') {
    const fields = Object.values(value)

    return fields.length > 0 && fields.every(filled)
  }

  return false
}

/**
 * The entries missing any of the named fields. Returned rather than asserted
 * inside, so a failure names the offending entry instead of a bare `false`.
 */
function incomplete<T extends object>(entries: readonly T[], fields: readonly (keyof T)[]): T[] {
  return entries.filter((entry) => fields.some((field) => !filled(entry[field])))
}

describe('the nav', () => {
  it('points every item at a section identifier that exists', () => {
    const ids: readonly string[] = Object.values(sectionIds)

    expect(navItems.filter((item) => !ids.includes(item.target))).toEqual([])
  })
})

describe('external links', () => {
  it('are well-formed absolute URLs', () => {
    const outward = strings(identity).filter((value) => OUTWARD.test(value))

    expect(outward.filter((link) => !isAbsoluteUrl(link))).toEqual([])
  })
})

describe('the entries the sections iterate', () => {
  it('give every nav item a label and a target', () => {
    expect(incomplete(navItems, ['label', 'target'])).toEqual([])
  })

  it('give every marquee tile a source', () => {
    expect(marqueeImages.filter((src) => !filled(src))).toEqual([])
  })

  it('give every about ornament a source', () => {
    expect(Object.entries(about.ornaments).filter(([, src]) => !filled(src))).toEqual([])
  })

  it('give every panel row a name and a description', () => {
    expect(incomplete(services.items, ['name', 'description'])).toEqual([])
  })

  it('give every project a name, a category and both gallery columns', () => {
    expect(incomplete(projects.items, ['name', 'category', 'columnOne', 'columnTwo'])).toEqual([])
  })
})

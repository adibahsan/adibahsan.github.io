import { describe, expect, it } from 'vitest'

import { isWellFormedAddress } from '../lib/contactForm'
import { projectDiagrams } from '../sections/ProjectsSection'
import * as identity from './identity'

/**
 * The content contract: assertions over the identity module as data, with
 * nothing rendered.
 *
 * This is Reskin's one new test seam and the highest available to it. The
 * sweeps below deliberately assert *properties* the page must hold rather than
 * the values it currently carries — that no placeholder survives, that every
 * anchor resolves, that no art is fetched from someone else's server, that no
 * entry a section iterates is half-filled. Transcribing the content into
 * expectations would test the copy rather than the contract, and would go red
 * on every intentional wording change.
 *
 * It tests **Cutover Readiness** directly, which is what makes that bar
 * checkable rather than remembered.
 */

const {
  about,
  capabilities,
  contact,
  hero,
  marqueeMarks,
  navItems,
  otherProjects,
  projects,
  sectionIds,
} = identity

/**
 * Every string anywhere in the module. Walks the namespace rather than a named
 * list of exports so the sweeps below reach material a later ticket adds
 * without being extended for each one — the field sweep further down is not
 * generic in the same way, and names the collections it checks.
 */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings)
  return []
}

/**
 * Points off-site: a string that *opens* with a scheme and authority, a
 * protocol-relative prefix, a `mailto:`/`tel:` recipient, or a `www.` host.
 *
 * Anchored at the start, and that anchoring is load-bearing rather than
 * tidiness. Vite inlines any asset under its 4KB threshold as a `data:` URI,
 * which is what becomes of the twenty-one marks — and an SVG data URI carries
 * `http://www.w3.org/2000/svg` inside it as the namespace. An unanchored
 * `://` would read every one of those as an outward link and demand it be a
 * well-formed URL. A whole string is a link or it is not; where a scheme sits
 * mid-string it is prose.
 *
 * Deliberately not every asset path. Reskin vendors its art into the app, so
 * those paths are local on purpose and demanding they be absolute would be
 * exactly backwards — {@link LOCAL} asserts the opposite of them.
 *
 * The limit worth knowing: a link written as a bare host with no scheme at all
 * — `example.com/art.png` — is not distinguishable from prose by inspection,
 * and goes unswept. `www.` is caught only because nothing else opens that way.
 */
const OUTWARD = /^(?:[a-z][a-z0-9+.\-]*:)?\/\/|^(?:mailto|tel):|^www\./i

/**
 * Served by this app and nobody else: inlined into the bundle as a `data:` URI,
 * or a path resolved against this origin.
 *
 * The two arms are the two sides of Vite's inline threshold, which is why both
 * are here rather than one looking like a mistake. Under 4KB an import resolves
 * to a `data:` URI — no request at all, the strongest form of vendored. Over
 * it, to a path: an absolute filesystem path under the test runner, a hashed
 * `/assets/...` in the build. The marks land on one side, the portrait and the
 * ornaments on the other.
 */
const LOCAL = /^(?:data:|\/|\.{1,2}\/)/

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
 * filled things — a project's stack and its diagram captions are arrays, and an
 * empty one renders as nothing just as a blank string does. Objects count for
 * the same reason, so a link's label and href grouped together do not read as
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

describe('the Placeholder Identity', () => {
  /**
   * The supplied design's fictional 3D artist. A whole word, so it cannot be
   * defeated by a substring and cannot fire on one either.
   */
  const PLACEHOLDER_NAME = /\bjack\b/i

  /**
   * The three hosts the supplied design served its art from: the design site
   * itself, the marquee's preview GIFs, and the project galleries. Reskin
   * vendors everything it keeps, so none of the three may appear anywhere.
   */
  const SUPPLIED_HOSTS = ['shrug-person-78902957.figma.site', 'motionsites.ai', 'images.higgs.ai']

  /** The freelance menu the capabilities panel replaced. */
  const SUPPLIED_SERVICES = ['3D Modeling', 'Rendering', 'Motion Design', 'Branding', 'Web Design']

  it('leaves no trace of the fictional name', () => {
    // Inlined art is skipped: a `data:` URI is machine-generated bytes rather
    // than authored copy, and a few hundred characters of SVG path data is a
    // standing chance of a false positive on any short word. The host sweep
    // below still reads them, where `includes` cannot misfire.
    const authored = strings(identity).filter((value) => !value.startsWith('data:'))

    expect(authored.filter((value) => PLACEHOLDER_NAME.test(value))).toEqual([])
  })

  it('leaves no `Price` in the nav', () => {
    const labels: readonly string[] = navItems.map((item) => item.label)

    expect(labels).not.toContain('Price')
  })

  it('leaves none of the five service names in the capabilities panel', () => {
    const named = capabilities.items.map((item) => item.name.toLowerCase())

    expect(SUPPLIED_SERVICES.filter((service) => named.includes(service.toLowerCase()))).toEqual([])
  })

  it('leaves none of the supplied design image hosts', () => {
    const all = strings(identity)

    expect(SUPPLIED_HOSTS.filter((host) => all.some((value) => value.includes(host)))).toEqual([])
  })
})

describe('the art', () => {
  /**
   * Every image the page draws from content. Named rather than swept, because
   * "is this string a picture" is not answerable by inspection — and the point
   * of the assertion is that these particular ones are local.
   */
  const sources: readonly string[] = [
    hero.portrait.src,
    ...Object.values(about.ornaments),
    ...marqueeMarks.map((mark) => mark.src),
  ]

  it('is vendored into the app, so the page fetches none of it from a third party', () => {
    expect(sources.filter((src) => !LOCAL.test(src))).toEqual([])
  })
})

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

describe('the featured projects', () => {
  it('each declare exactly as many diagrams as their card draws', () => {
    // The captions are content and live in the identity module; the drawings
    // are presentation and live in the section. This is the seam between them:
    // a fourth caption cannot appear without a fourth drawing, or the reverse.
    const mismatched = projects.items.filter(
      (project) => project.diagrams.length !== projectDiagrams[project.name]?.length,
    )

    expect(mismatched.map((project) => project.name)).toEqual([])
  })
})

describe('the entries the sections iterate', () => {
  it('give every nav item a label and a target', () => {
    expect(incomplete(navItems, ['label', 'target'])).toEqual([])
  })

  it('give every marquee tile a name and a mark', () => {
    expect(incomplete(marqueeMarks, ['name', 'src'])).toEqual([])
  })

  it('give every about ornament a source', () => {
    expect(Object.entries(about.ornaments).filter(([, src]) => !filled(src))).toEqual([])
  })

  it('give every capability a name and a description', () => {
    expect(incomplete(capabilities.items, ['name', 'description'])).toEqual([])
  })

  it('give every featured project a name, a stack, a status and its diagrams', () => {
    expect(incomplete(projects.items, ['name', 'stack', 'status', 'diagrams'])).toEqual([])
  })

  it('give every other project a name, a note and a stack', () => {
    // `href` is left out on purpose: most of these are private and carry none,
    // which the list renders as nothing rather than as a dead link.
    expect(incomplete(otherProjects, ['name', 'note', 'stack'])).toEqual([])
  })

  it('publish an address the form would accept from a visitor', () => {
    // The same rule, both ways round. A page that turns away a visitor's
    // address while publishing one of its own that would not survive the check
    // is holding two standards, and the weaker one is the published address —
    // it is the fallback for everyone the form fails.
    expect(isWellFormedAddress(contact.email)).toBe(true)
  })

  it('give the contact section everything it renders', () => {
    expect(incomplete([contact], ['heading', 'intro', 'email', 'formEndpoint', 'resume'])).toEqual(
      [],
    )
    expect(incomplete(contact.links, ['label', 'href'])).toEqual([])
  })
})

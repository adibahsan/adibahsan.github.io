/**
 * The Placeholder Identity: the fictional "Jack" the supplied design describes.
 *
 * Deliberately retained for this effort and gathered here rather than scattered
 * through markup, so the later Reskin is a bounded change — swap these values,
 * not the components. Copy is verbatim from `.scratch/portfolio-3d/design-spec.md`.
 */

export const navLinks = ['About', 'Price', 'Projects', 'Contact'] as const

export const hero = {
  /** Lowercase "i" and the curly apostrophe are both as specified. */
  heading: 'Hi, i’m jack',
  tagline: 'a 3d creator driven by crafting striking and unforgettable projects',
  portrait: {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png',
    alt: 'Jack',
  },
} as const

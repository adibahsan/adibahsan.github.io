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

/**
 * The marquee band's 21 previews, in the order the design lists them. Splitting
 * them across the two rows is the section's business, not the identity's.
 */
export const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
] as const

/**
 * The about section's copy and its four pieces of decorative art. The corners
 * they sit in and the edges they arrive from are the section's business; the
 * art itself is identity, and Reskin swaps these four URLs.
 */
export const about = {
  heading: 'About me',
  /**
   * Lowercase "i" twice and the curly apostrophe are as specified, matching the
   * hero headline's treatment of the same two characters.
   */
  paragraph:
    'With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let’s build something incredible together!',
  ornaments: {
    moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    object:
      'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    group:
      'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
  },
} as const

/**
 * The services panel's five offerings, in the order the design lists them.
 *
 * The displayed ordinal is not stored: it is the row's position, so Reskin can
 * add, drop or reorder a service without renumbering the list by hand.
 *
 * The em dashes in "Branding" are the `--` of `design-spec.md` read as em
 * dashes, per the deviation recorded there.
 */
export const services = {
  heading: 'Services',
  items: [
    {
      name: '3D Modeling',
      description:
        'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
    },
    {
      name: 'Rendering',
      description:
        'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
    },
    {
      name: 'Motion Design',
      description:
        'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
    },
    {
      name: 'Branding',
      description:
        'Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence.',
    },
    {
      name: 'Web Design',
      description:
        'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
    },
  ],
} as const

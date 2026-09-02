import { ContactButton } from '../components/ContactButton'
import { FadeIn } from '../components/FadeIn'
import { Magnet } from '../components/Magnet'
import { hero, navItems, sectionIds } from '../content/identity'

/**
 * The opening screen: nav, a headline spanning the full viewport width, a
 * supporting line and call to action along the bottom, and a portrait that
 * leans toward the cursor.
 *
 * The five entrances are staggered by delay alone — every element is on screen
 * from the start, so they all cue together and the delays do the sequencing.
 */
export function HeroSection() {
  return (
    <section id={sectionIds.hero} className="relative flex h-screen flex-col overflow-x-clip">
      <FadeIn
        as="nav"
        y={-20}
        className="flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-foreground md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]"
      >
        {/* Four items fit the narrow tier without wrapping, but not by much:
            at 375px the four labels measure 282px against 327px of available
            width, so `justify-between` has 15px to distribute between them.
            "Capabilities" alone is 95px of that. A fifth item, or a longer
            label, needs this re-measured before it is added. */}
        {navItems.map(({ label, target }) => (
          // A plain fragment anchor, eased by the `scroll-behavior` rule in
          // `index.css`, which says why the scrolling is the browser's to do.
          // The nav scrolls away with the hero rather than pinning, so the
          // sections below need no scroll margin held back for it.
          <a
            key={label}
            href={`#${target}`}
            className="transition-opacity duration-200 hover:opacity-70"
          >
            {label}
          </a>
        ))}
      </FadeIn>

      {/* Masks the headline on both axes, as specified: it catches any overrun
          at the widest tiers, and clips the entrance below so the line rises
          into view rather than simply sliding up in place.

          That clip is why the headline below cues on `mount` rather than on
          coming into view. The entrance starts the line 40px down, and this box
          is only as tall as the line itself — so wherever the rendered type is
          shorter than the travel, the line begins wholly outside the mask, an
          observer watching it sees an empty rectangle, and it never animates in
          at all. That is every viewport under about 633px, where 6.32vw falls
          below 40px.

          Only the headline takes that cue. The hero's other four entrances are
          not masked by anything, so an observer can see them and there is
          nothing to fix; the argument for `mount` — that the whole hero is on
          screen at load anyway — would apply to them equally, but a working
          entrance is not worth changing to prove a point. */}
      <div className="overflow-hidden">
        {/* The type scale below is measured, not eyeballed. Re-derive it rather
            than nudging it if the name ever changes.

            Kanit Black's advance for "ADIB AHSAN CHOWDHURY" is 12.80em, taken
            from the Google Fonts TTF with FreeType; Pillow and ImageMagick agree
            to four figures. `tracking-tight` is -0.025em per character over a
            20-character line, so the rendered line is 12.80 - 20 x 0.025 =
            12.30em, or 12.325em if the browser drops the trailing letter-space.
            The wider figure is the one to size against.

            A line of W em spans the viewport at 100/W vw, so 100/12.325 =
            8.11vw would be exactly full-bleed. `lg` is set to 7.9vw — 97.4% of
            the width — and the remaining 2.6% is the margin for the difference
            between this measurement and the browser's own shaping.

            The other three tiers hold the supplied design's 14 : 15 : 16 : 17.5
            ratio off that anchor: 7.9 x 14/17.5 = 6.32, x 15/17.5 = 6.77,
            x 16/17.5 = 7.22. That ratio is not ornament. `vw` is already
            viewport-relative, so the ladder is the design stating how much of
            the width the headline should take at each tier — 78% on a phone
            rising to 97% on a desktop. The supplied "Hi, i'm jack" measures
            5.66em, which at 14..17.5vw spanned 75%..94%: the same ramp, one
            tier of headroom lower. It never did span the full width.

            To re-derive after a name change: render the uppercased string in
            Kanit Black, divide its advance by the em size, subtract 0.025 per
            character, and set `lg` to 97 divided by the result. */}
        <FadeIn
          as="h1"
          cue="mount"
          delay={0.15}
          y={40}
          className="hero-heading mt-6 w-full whitespace-nowrap text-[6.32vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[6.77vw] md:-mt-5 md:text-[7.22vw] lg:text-[7.9vw]"
        >
          {hero.heading}
        </FadeIn>
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        {/* Positioning stays on the element above: it holds Tailwind's centring
            translate, which the entrance and the magnet would both overwrite. */}
        <FadeIn delay={0.6}>
          <Magnet padding={150} strength={3}>
            <img src={hero.portrait.src} alt={hero.portrait.alt} className="w-full" />
          </Magnet>
        </FadeIn>
      </div>

      <div className="mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-foreground sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          {hero.tagline}
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          {/* The contact section, not a `mailto:`. The address is published in
              that section, and a fragment keeps the visitor on the page — the
              brief's mail link was a stopgap for while the section did not
              exist. `sectionIds` is where the two ends of this anchor meet. */}
          <ContactButton href={`#${sectionIds.contact}`} />
        </FadeIn>
      </div>
    </section>
  )
}

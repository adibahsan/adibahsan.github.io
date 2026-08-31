import { ContactButton } from '../components/ContactButton'
import { FadeIn } from '../components/FadeIn'
import { Magnet } from '../components/Magnet'
import { hero, navLinks } from '../content/identity'

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
    <section className="relative flex h-screen flex-col overflow-x-clip">
      <FadeIn
        as="nav"
        y={-20}
        className="flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-foreground md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]"
      >
        {navLinks.map((label) => (
          // No destinations: the design gives labels only, and the sections
          // these would point at are named by Reskin, not by this build.
          <a key={label} className="transition-opacity duration-200 hover:opacity-70">
            {label}
          </a>
        ))}
      </FadeIn>

      {/* Masks the headline on both axes, as specified: it catches any overrun
          at the widest tiers, and clips the entrance below so the line rises
          into view rather than simply sliding up in place. */}
      <div className="overflow-hidden">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="hero-heading mt-6 w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]"
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
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}

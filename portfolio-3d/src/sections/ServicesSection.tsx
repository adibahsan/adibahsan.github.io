import { FadeIn } from '../components/FadeIn'
import { services } from '../content/identity'

/** Seconds each row waits behind the one above it. */
const STAGGER = 0.1

/**
 * The panel's one inverted surface: white ground, dark ink, and a rounded top
 * edge that lets the dark page show through above it, so the section reads as a
 * card laid over the page rather than as another band of it.
 *
 * Everything here inherits `text-ground` from the section. `design-spec.md`
 * names #0C0C0C for the heading and the numbers and leaves the names and
 * descriptions to follow, which is what inheritance gives.
 */
export function ServicesSection() {
  return (
    <section className="rounded-t-[40px] bg-white px-5 py-20 text-ground sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn
        as="h2"
        y={40}
        className="mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        {services.heading}
      </FadeIn>

      {/*
        `divide-y` rules between the rows rather than around them, which is what
        "separated by" asks for: four hairlines for five services, and none
        against the heading above or the page below.

        The colour is the ground at 15%, which resolves to the rgba() the design
        gives — one token rather than a second literal to keep in step with it.
      */}
      <ol className="mx-auto max-w-5xl divide-y divide-ground/15">
        {services.items.map(({ name, description }, index) => (
          // The row is the FadeIn, so the rule above it arrives with it rather
          // than ruling off a row that has not turned up yet.
          <FadeIn
            key={name}
            as="li"
            delay={index * STAGGER}
            className="flex items-center gap-5 py-8 sm:gap-8 sm:py-10 md:gap-10 md:py-12"
          >
            {/*
              Ordinal, not content: derived from position and zero-padded.

              An ordered list, so the numbering is carried by the markup rather
              than by five spans — which is why the drawn one is `aria-hidden`
              and why it can be derived at all. `shrink-0` keeps the number at
              its clamped size instead of letting the copy squeeze it.
            */}
            <span
              aria-hidden
              className="shrink-0 font-black"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-col">
              <h3
                className="font-medium uppercase"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed opacity-60"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {description}
              </p>
            </div>
          </FadeIn>
        ))}
      </ol>
    </section>
  )
}

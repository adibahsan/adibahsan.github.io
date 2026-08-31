import { AnimatedText } from '../components/AnimatedText'
import { ContactButton } from '../components/ContactButton'
import { FadeIn } from '../components/FadeIn'
import { about } from '../content/identity'

/** How far off to the side a piece of art starts, in px. */
const DRIFT = 80

interface Ornament {
  src: string
  /** Corner, size and inset — everything that places it on the page. */
  className: string
  delay: number
  /** Negative comes in from the left edge, positive from the right. */
  x: number
}

/**
 * The four pieces of decorative art, each entering from whichever page edge it
 * sits nearest and arriving in the order the design lists them.
 */
const ornaments: readonly Ornament[] = [
  {
    src: about.ornaments.moon,
    className: 'left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]',
    delay: 0.1,
    x: -DRIFT,
  },
  {
    src: about.ornaments.lego,
    className:
      'right-[1%] top-[4%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]',
    delay: 0.15,
    x: DRIFT,
  },
  {
    src: about.ornaments.object,
    className:
      'bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]',
    delay: 0.25,
    x: -DRIFT,
  },
  {
    src: about.ornaments.group,
    className:
      'bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]',
    delay: 0.3,
    x: DRIFT,
  },
]

/**
 * The about screen: four pieces of art slide in from the page edges to frame a
 * gradient heading, and the paragraph beneath lights up character by character
 * as the reader scrolls through it.
 */
export function AboutSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10">
      {ornaments.map(({ src, className, delay, x }) => (
        // The corner and the size go on the wrapper, as they do for the hero
        // portrait: it leaves the entrance a plain slide the animation owns
        // outright, with nothing of its own on `transform` to overwrite.
        <FadeIn key={src} delay={delay} duration={0.9} x={x} y={0} className={`absolute ${className}`}>
          {/* Decorative: the art carries nothing the copy beside it does not. */}
          <img src={src} alt="" className="w-full" />
        </FadeIn>
      ))}

      <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            {about.heading}
          </FadeIn>

          <AnimatedText
            text={about.paragraph}
            className="max-w-[560px] text-center font-medium leading-relaxed text-foreground"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <ContactButton />
      </div>
    </section>
  )
}

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

import { FadeIn } from '../components/FadeIn'
import { SectionHeading } from '../components/SectionHeading'
import { StatusChip } from '../components/StatusChip'
import type { Diagram } from '../components/diagrams/Diagram'
import { PlaceholderDiagram } from '../components/diagrams/PlaceholderDiagram'
import { otherProjects, projects, sectionIds } from '../content/identity'
import { stackedCardScale, stackedCardShrinkStart } from '../lib/scroll'

/** How far below the card above each pinned card sits, in px. */
const STACK_OFFSET = 28

/** The section's heavy radius, on the cards and on every drawing inside them. */
const RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'

/**
 * The same three radii on the panel's top edge alone. Written out rather than
 * derived from {@link RADIUS}: Tailwind generates utilities by finding their
 * names in the source, so a class assembled at runtime would never be built.
 */
const TOP_RADIUS = 'rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]'

/**
 * The card's own internal rhythm, reused for every gap the design leaves
 * unstated: it is the section's padding scale, not a fourth one invented here.
 */
const GAP = 'gap-4 sm:gap-6 md:gap-8'

/** What joins a stack into the one small line the design leaves room for. */
const SEPARATOR = ' · '

/** Seconds each row of the list below the stack waits behind the one above it. */
const STAGGER = 0.1

/**
 * The two short slots in the card's narrow column, at the heights the design
 * gives them. The tall drawing beside them takes whatever the pair adds up to,
 * which is all the design says about it.
 */
const SHORT_SLOTS = ['clamp(130px, 16vw, 230px)', 'clamp(160px, 22vw, 340px)'] as const

type FeaturedProject = (typeof projects.items)[number]

/**
 * Which drawing fills each of a card's three slots, in the order the project's
 * captions are written.
 *
 * The mapping lives here rather than in the identity module because a caption is
 * content and a component is presentation — the same split that keeps the about
 * section's ornament placement out of `identity.ts`. It is a record of component
 * references and nothing else, so it can be imported and read without rendering
 * anything: the contract test does exactly that, holding each project's caption
 * count equal to the number of drawings its card renders.
 *
 * Every slot currently draws {@link PlaceholderDiagram}. **Tickets 06, 07 and 08
 * replace them, one project each**, by writing real {@link Diagram} components
 * under `components/diagrams/` and naming them here. `Diagram.ts` carries the
 * contract a replacement satisfies; `PlaceholderDiagram` is a working example of
 * it. Nothing in the card changes when they land.
 */
export const projectDiagrams: Record<FeaturedProject['name'], readonly Diagram[]> = {
  'Restaurant Discovery Agent': [PlaceholderDiagram, PlaceholderDiagram, PlaceholderDiagram],
  'Multi-Agent Orchestration': [PlaceholderDiagram, PlaceholderDiagram, PlaceholderDiagram],
  'zeroClaw Infrastructure Agent': [PlaceholderDiagram, PlaceholderDiagram, PlaceholderDiagram],
}

interface ProjectCardProps {
  project: FeaturedProject
  index: number
  total: number
  /** The stack's scroll pass, 0 to 1, shared by every card in it. */
  progress: MotionValue<number>
}

/**
 * One project, pinned near the top of the viewport while the cards behind it
 * arrive and settling a little smaller for each one that does.
 *
 * The runway and the pin are the same element: each card's box is a screenful
 * of scrolling, and because they are siblings inside the stack rather than
 * nested, a pinned card stays pinned until the whole stack has passed. That is
 * what lets three of them accumulate on screen at once.
 */
function ProjectCard({ project, index, total, progress }: ProjectCardProps) {
  // Full size until this card's own slice of the pass comes up, then receding
  // across everything left of it. The last card's target is 1, so it holds.
  const scale = useTransform(
    progress,
    [stackedCardShrinkStart(index, total), 1],
    [1, stackedCardScale(index, total)],
  )

  const drawings = projectDiagrams[project.name]
  const TallDiagram = drawings[2]

  return (
    <div className="sticky top-24 flex h-[85vh] items-start justify-center md:top-32">
      {/*
        The offset rides here rather than on the sticky box above, where it
        would fight `top-24`: the box pins at one height for every card and this
        nudges each one down from it, so the stacked edges stay visible.
      */}
      <motion.article
        style={{ scale, top: index * STACK_OFFSET }}
        className={`relative flex w-full flex-col ${GAP} border-2 border-foreground bg-ground p-4 text-foreground sm:p-6 md:p-8 ${RADIUS}`}
      >
        <div className={`flex flex-wrap items-center ${GAP}`}>
          {/*
            Positional, so derived and zero-padded, as the capability numbers
            are. Hidden from assistive technology: the card's heading names the
            project, and the stack's order is not information the number adds.
          */}
          <span
            aria-hidden
            className="shrink-0 font-black"
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="flex flex-col">
            {/*
              The line the supplied design labelled "Client" or "Personal" on.
              A freelancer's visitor wants to know who paid; this one wants to
              know what it runs on, so the same small line carries the stack.
            */}
            <p
              className="font-light uppercase tracking-widest opacity-60"
              style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
            >
              {project.stack.join(SEPARATOR)}
            </p>
            <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
              {project.name}
            </h3>
          </div>

          <div className="ml-auto">
            <StatusChip status={project.status} />
          </div>
        </div>

        {/*
          Two columns split 40 / 60, expressed in fractions so the gap comes out
          of neither of them — percentages plus a gap would overflow the card.

          The slots hold drawings rather than photographs, per ADR-0004, so the
          card gives each one its size and nothing else: there is no `object-fit`
          here because there is nothing to crop. Each drawing fills what it is
          handed, frame and radius included.
        */}
        <div className={`grid grid-cols-[2fr_3fr] ${GAP}`}>
          <div className={`flex flex-col ${GAP}`}>
            {SHORT_SLOTS.map((height, slot) => {
              const ShortDiagram = drawings[slot]
              const caption = project.diagrams[slot]

              return (
                <div key={caption} style={{ height }}>
                  <ShortDiagram caption={caption} className="h-full w-full" />
                </div>
              )
            })}
          </div>

          {/* Stretches to the pair beside it: the design gives this one no
              height of its own, only that it is the tall one. */}
          <TallDiagram caption={project.diagrams[2]} className="h-full w-full" />
        </div>
      </motion.article>
    </div>
  )
}

/**
 * The quiet tail after the three loud cards: the rest of the work, named rather
 * than shown.
 *
 * Hairline-ruled rows on the section's own type scale, the way the capabilities
 * panel rules its five — the pale token here, the dark one there, one treatment.
 * The row splits 40 / 60 at the widest tier, echoing the card's two columns, and
 * stacks below it.
 *
 * A live link where a project has one and nothing at all where it does not. Two
 * thirds of these are private, and a row that ends in a dead button or a "coming
 * soon" would be a worse answer than a row that simply stops.
 *
 * The band it sits on is opaque and lifted above the stack, which is load-
 * bearing rather than decorative. A card is taller than its own screenful of
 * runway on any short-and-wide window, so it paints a little below the stack it
 * belongs to — before this list, that spilled into the section's foot and went
 * unnoticed. The list passes in front of it instead, the same way this section
 * is drawn up over the panel above it.
 */
function OtherProjects() {
  return (
    <div className="relative z-20 bg-ground pt-20 sm:pt-24 md:pt-32">
      <ul className="mx-auto max-w-5xl divide-y divide-foreground/15">
        {otherProjects.map(({ name, note, stack, href }, index) => (
          // The row is the FadeIn, so the rule above it arrives with it rather
          // than ruling off a row that has not turned up yet.
          <FadeIn
            key={name}
            as="li"
            delay={index * STAGGER}
            className={`grid py-6 sm:py-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:py-10 ${GAP}`}
          >
            <div className="flex flex-col gap-1">
              <h3
                className="font-medium uppercase"
                style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.35rem)' }}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-baseline gap-2 transition-opacity duration-200 hover:opacity-70"
                  >
                    {name}
                    {/*
                      Drawn rather than typed: the outward arrow is not in the
                      page's typeface and a glyph would arrive from whatever fell
                      back. Decorative — the link's text is its name.
                    */}
                    <svg
                      aria-hidden
                      viewBox="0 0 12 12"
                      className="h-[0.65em] w-[0.65em] shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 9.5 9.5 2.5" />
                      <path d="M4 2.5h5.5V8" />
                    </svg>
                  </a>
                ) : (
                  name
                )}
              </h3>
              <p
                className="font-light uppercase tracking-widest opacity-60"
                style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
              >
                {stack.join(SEPARATOR)}
              </p>
            </div>

            <p
              className="font-light leading-relaxed opacity-60"
              style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
            >
              {note}
            </p>
          </FadeIn>
        ))}
      </ul>
    </div>
  )
}

/**
 * The projects section: a dark panel drawn up over the capabilities panel's
 * foot, so its rounded top edge cuts into the white above it, holding three
 * cards that stack as the reader scrolls through them and a list of the rest
 * once they have passed.
 *
 * Three shown deeply and six named, rather than nine shown thinly — depth is
 * what a reader takes away, and the six are still not hidden.
 */
export function ProjectsSection() {
  const stack = useRef<HTMLDivElement>(null)

  // The pass runs from the stack's top reaching the top of the viewport to its
  // bottom reaching the bottom — the window in which cards are pinned.
  const { scrollYProgress } = useScroll({ target: stack, offset: ['start start', 'end end'] })

  return (
    <section
      id={sectionIds.projects}
      className={`relative z-10 -mt-10 bg-ground px-5 py-20 text-foreground sm:-mt-12 sm:px-8 sm:py-24 md:-mt-14 md:px-10 md:py-32 ${TOP_RADIUS}`}
    >
      <SectionHeading className="hero-heading mb-16 sm:mb-20 md:mb-28">
        {projects.heading}
      </SectionHeading>

      {/*
        The cards pin inside this box and nowhere else: sticky positioning is
        bounded by its own parent, so the list below is reached only once the
        last card has finished its runway and cannot be overlapped by one.
      */}
      <div ref={stack}>
        {projects.items.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            total={projects.items.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <OtherProjects />
    </section>
  )
}

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

import { LiveProjectButton } from '../components/LiveProjectButton'
import { SectionHeading } from '../components/SectionHeading'
import { projects } from '../content/identity'
import { stackedCardScale, stackedCardShrinkStart } from '../lib/scroll'

/** How far below the card above each pinned card sits, in px. */
const STACK_OFFSET = 28

/** The section's heavy radius, on the cards and on every image inside them. */
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

interface ProjectCardProps {
  project: (typeof projects.items)[number]
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
            Positional, so derived and zero-padded, as the services numbers are.
            Hidden from assistive technology: the card's heading names the
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
            <p
              className="font-light uppercase tracking-widest opacity-60"
              style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
            >
              {project.category}
            </p>
            <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
              {project.name}
            </h3>
          </div>

          <div className="ml-auto">
            <LiveProjectButton />
          </div>
        </div>

        {/*
          Two columns split 40 / 60, expressed in fractions so the gap comes out
          of neither of them — percentages plus a gap would overflow the card.
        */}
        <div className={`grid grid-cols-[2fr_3fr] ${GAP}`}>
          <div className={`flex flex-col ${GAP}`}>
            {project.columnOne.map((src, image) => (
              // The tall image beside these carries the project's name, so
              // these two would only repeat it: supporting art, not content.
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className={`w-full object-cover ${RADIUS}`}
                style={{ height: image === 0 ? 'clamp(130px, 16vw, 230px)' : 'clamp(160px, 22vw, 340px)' }}
              />
            ))}
          </div>

          {/* Stretches to the pair beside it: the design gives this one no
              height of its own, only that it is the tall one. */}
          <img
            src={project.columnTwo}
            alt={project.name}
            loading="lazy"
            className={`h-full w-full object-cover ${RADIUS}`}
          />
        </div>
      </motion.article>
    </div>
  )
}

/**
 * The closing section: a dark panel drawn up over the services panel's foot, so
 * its rounded top edge cuts into the white above it, holding three cards that
 * stack as the reader scrolls through them.
 */
export function ProjectsSection() {
  const stack = useRef<HTMLDivElement>(null)

  // The pass runs from the stack's top reaching the top of the viewport to its
  // bottom reaching the bottom — the window in which cards are pinned.
  const { scrollYProgress } = useScroll({ target: stack, offset: ['start start', 'end end'] })

  return (
    <section
      className={`relative z-10 -mt-10 bg-ground px-5 py-20 text-foreground sm:-mt-12 sm:px-8 sm:py-24 md:-mt-14 md:px-10 md:py-32 ${TOP_RADIUS}`}
    >
      <SectionHeading className="hero-heading mb-16 sm:mb-20 md:mb-28">
        {projects.heading}
      </SectionHeading>

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
    </section>
  )
}

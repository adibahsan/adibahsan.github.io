/**
 * The page's content, and the structure the nav navigates.
 *
 * Everything a content change touches lives here. The sections own placement —
 * which corner an ornament sits in, which diagram a card draws, how the marks
 * split across the two marquee rows — and this module owns what is placed.
 *
 * Art is imported rather than linked. Reskin vendors every asset into the app,
 * so the built page makes no runtime request to a third-party host; the imports
 * also mean a missing file fails the build rather than the page.
 */

import group from '../assets/about/group.png'
import lego from '../assets/about/lego.png'
import moon from '../assets/about/moon.png'
import object from '../assets/about/object.png'
import portraitImage from '../assets/portrait.png'
import astro from '../assets/marks/astro.svg'
import docker from '../assets/marks/docker.svg'
import expo from '../assets/marks/expo.svg'
import fastapi from '../assets/marks/fastapi.svg'
import gemini from '../assets/marks/googlegemini.svg'
import java from '../assets/marks/openjdk.svg'
import kotlin from '../assets/marks/kotlin.svg'
import langgraph from '../assets/marks/langgraph.svg'
import nextjs from '../assets/marks/nextdotjs.svg'
import node from '../assets/marks/nodedotjs.svg'
import openai from '../assets/marks/openai.svg'
import playwright from '../assets/marks/playwright.svg'
import postgresql from '../assets/marks/postgresql.svg'
import prisma from '../assets/marks/prisma.svg'
import python from '../assets/marks/python.svg'
import qdrant from '../assets/marks/qdrant.svg'
import react from '../assets/marks/react.svg'
import redis from '../assets/marks/redis.svg'
import springboot from '../assets/marks/springboot.svg'
import typescript from '../assets/marks/typescript.svg'
import vercel from '../assets/marks/vercel.svg'

/**
 * The page's sections, by the identifier each one anchors at.
 *
 * These live here, beside the nav that points at them, rather than as literals
 * in the section components: two strings that must match are one edit away from
 * drifting when they sit in different files, and holding both makes "every nav
 * target resolves" checkable as data, without rendering anything.
 *
 * That check reaches the nav and no further. Whether a section actually renders
 * the identifier it is given is not testable without a DOM, so adding an entry
 * here does not mean a section answers to it.
 */
export const sectionIds = {
  hero: 'hero',
  marquee: 'marquee',
  about: 'about',
  capabilities: 'capabilities',
  projects: 'projects',
  contact: 'contact',
} as const

/**
 * The hero nav, in the order it reads across the page.
 *
 * Four items, as the design distributes across the full width. `Price` is gone:
 * it presupposed the freelance sales the supplied design was built around, and
 * this is not a shopfront. Contact takes the fourth slot now that there is a
 * section for it to reach.
 *
 * Targets are taken from {@link sectionIds} rather than written out. A literal
 * would compile just as happily, which is why the contract test sweeps them.
 */
export const navItems = [
  { label: 'About', target: sectionIds.about },
  { label: 'Capabilities', target: sectionIds.capabilities },
  { label: 'Projects', target: sectionIds.projects },
  { label: 'Contact', target: sectionIds.contact },
] as const

export const hero = {
  /**
   * The owner's full name, and the whole of the headline. The supplied design
   * put a greeting here sized to a twelve-character line; a name is the one
   * thing a hiring manager must not have to look for, so it takes the line
   * outright and the section rescales the type to span the width.
   */
  heading: 'Adib Ahsan Chowdhury',
  tagline: 'Tech lead building production retrieval and multi-agent systems',
  portrait: {
    src: portraitImage,
    alt: 'Adib Ahsan Chowdhury',
  },
} as const

/**
 * The marquee band's 21 tiles: the technologies the work is actually built
 * with, current stack first and a short JVM tail.
 *
 * The tail is deliberate rather than nostalgic — a JVM-shaped opportunity still
 * finds him through it, without the band advertising a stack he has largely
 * left. Splitting the set across the two rows is the section's business.
 */
export const marqueeMarks = [
  { name: 'Python', src: python },
  { name: 'TypeScript', src: typescript },
  { name: 'FastAPI', src: fastapi },
  { name: 'LangGraph', src: langgraph },
  { name: 'Qdrant', src: qdrant },
  { name: 'OpenAI', src: openai },
  { name: 'Gemini', src: gemini },
  { name: 'Next.js', src: nextjs },
  { name: 'React', src: react },
  { name: 'Expo', src: expo },
  { name: 'Node.js', src: node },
  { name: 'PostgreSQL', src: postgresql },
  { name: 'Prisma', src: prisma },
  { name: 'Redis', src: redis },
  { name: 'Docker', src: docker },
  { name: 'Playwright', src: playwright },
  { name: 'Astro', src: astro },
  { name: 'Vercel', src: vercel },
  { name: 'Kotlin', src: kotlin },
  { name: 'Spring Boot', src: springboot },
  { name: 'Java', src: java },
] as const

/**
 * The about section's copy and its four pieces of decorative art. The corners
 * they sit in and the edges they arrive from are the section's business.
 *
 * The art is the supplied design's, vendored: Reskin changes what the forms
 * carry, not what they look like, and these four carry nothing but shape.
 */
export const about = {
  heading: 'About me',
  paragraph:
    "I'm a tech lead building retrieval and agent systems in production. I care about the practice around them — evaluation gates, tracing, decisions written down — as much as the capability itself.",
  ornaments: { moon, object, lego, group },
} as const

/**
 * The inverted panel's five rows: capabilities held, not services sold.
 *
 * The supplied design put a freelancer's price list here. The rows below say
 * what he can be handed rather than what he will invoice for, which is the one
 * question the panel's shape is actually good at answering.
 *
 * The displayed ordinal is not stored: it is the row's position, so a row can
 * be added, dropped or reordered without renumbering the list by hand.
 */
export const capabilities = {
  /**
   * A note for whoever edits this copy next: the source it is drawn from carries
   * accuracy notes, and several of its claims are worded narrowly on purpose.
   * The standards work below is one of them — the ruleset was authored by a
   * colleague, and the contribution here was rolling it out and adding the
   * security-review pass. "Rolled out" and "added" are load-bearing; do not
   * promote them to "wrote" or "designed".
   */
  heading: 'Capabilities',
  items: [
    {
      name: 'Retrieval systems',
      description:
        'Hybrid dense and sparse retrieval over a vector store, a cross-encoder reranking pass, and a query-understanding layer that splits one question into the separate constraints it actually contains.',
    },
    {
      name: 'Agent orchestration',
      description:
        'Multi-agent systems that hold multi-turn state, fan work out to subagents rather than answering everything in one pass, and join a shared workspace as members alongside the people in it.',
    },
    {
      name: 'Evaluation and tracing',
      description:
        'Eval harnesses over a fixed reference set, gated before release, with tracing on every model call — so a change can be shown to have helped rather than assumed to have.',
    },
    {
      name: 'Product engineering',
      description:
        'Full-stack delivery across web, mobile and backend: TypeScript and Python in front, Postgres and the JVM behind, containers and CI underneath, shipped to real users since 2019.',
    },
    {
      name: 'Technical leadership',
      description:
        'Architecture and code review across five products and fifteen engineers, with decisions recorded as ADRs, agentic-coding standards rolled out across the main product, and a security-review pass added over them.',
    },
  ],
} as const

/**
 * The three projects the cards stack through. As with the capabilities, the
 * drawn ordinal is derived from the card's position rather than stored.
 *
 * `stack` takes the slot the supplied design used for a client-or-personal
 * label. A freelancer's visitor wants to know who paid; this one wants to know
 * what it runs on, and that is the same small line doing a more useful job.
 *
 * `diagrams` names what each of the card's three slots draws — content, so it
 * lives here. Which component draws it is presentation and lives in the section,
 * the way ornament placement lives in `AboutSection`. The contract test holds
 * the two counts equal, so a fourth caption cannot appear without a fourth
 * drawing.
 *
 * All three are private, which is why each carries a `status` rather than a
 * link: a button promising a destination it does not have is worse than none.
 */
export const projects = {
  /**
   * Plural. The supplied design's singular "Project" was carried deliberately
   * through Design Fidelity and this module used to say so; that was true of a
   * one-off shopfront and is not true of three.
   */
  heading: 'Projects',
  items: [
    {
      name: 'Restaurant Discovery Agent',
      stack: ['FastAPI', 'LangGraph', 'Qdrant', 'Python'],
      status: 'Private — hSenid Mobile',
      diagrams: ['Retrieval pipeline', 'Query understanding', 'Evaluation gate'],
    },
    {
      name: 'Multi-Agent Orchestration',
      stack: ['Hermes A2A', 'Buzz', 'Agent Client Protocol', 'TypeScript'],
      status: 'Private repositories',
      diagrams: ['Workspace membership', 'Research fan-out', 'Protocol shim'],
    },
    {
      name: 'zeroClaw Infrastructure Agent',
      stack: ['Python', 'Docker', 'Telegram', 'Compose'],
      status: 'Private repository',
      diagrams: ['Phased-trust split', 'Read-only surface', 'Approval path'],
    },
  ],
} as const

/**
 * The rest of the work, as a compact list below the stack.
 *
 * `href` is null where a project has no public destination, which is most of
 * them: a live link is offered when one exists and nothing is drawn when one
 * does not. The contract test's field sweep names the fields the list reads and
 * leaves `href` out on those grounds.
 */
export const otherProjects = [
  {
    name: 'Get It.',
    note: 'A study companion that turns a PDF into a measurable mastery map, built around the document rather than replacing it. GDG AI Hack Milan 2026.',
    stack: ['Next.js', 'React', 'Three.js', 'Electron'],
    href: 'https://getit.noesisai.it',
  },
  {
    name: 'Stacksmith',
    note: 'One sentence in, a provisioned architecture plan for the Stripe Projects CLI out — providers, reasoning, commands and an environment map. Stripe Dhaka 2026.',
    stack: ['Next.js', 'OpenRouter', 'Supabase'],
    href: 'https://stacksmith-seven.vercel.app',
  },
  {
    name: 'Vesta',
    note: 'A bilingual reproductive-health platform for the Bangladesh market, with carrier billing and SMS through the operator SDK, delivered against a formal specification.',
    stack: ['Next.js', 'Prisma', 'Postgres', 'Redis'],
    href: null,
  },
  {
    name: 'Engineering Delivery Analytics',
    note: 'A read-only pipeline over self-hosted GitLab computing five delivery metrics, each sliced before and after AI adoption, labelling its own confidence per metric.',
    stack: ['Python', 'GitLab API'],
    href: null,
  },
  {
    name: "Write JS That Doesn't Hurt",
    note: 'An advanced Next.js session for senior engineers, where every before-and-after pair in the talk exists as a runnable demo rather than a slide.',
    stack: ['Next.js', 'React'],
    href: 'https://github.com/adibahsan/hms-tech-talks',
  },
  {
    name: 'AI Learning Harness',
    note: 'Gives a static teaching methodology the two things it lacks — a clock and somewhere to record a result — through spaced-repetition scheduling over an LLM harness.',
    stack: ['Astro', 'SQLite'],
    href: null,
  },
] as const

/**
 * The closing section: how to reach him, and the form that does it.
 *
 * `formEndpoint` is the Formspree form the Live Portfolio already posts to,
 * reused rather than replaced — a second provider would be a second account to
 * keep alive for no gain.
 *
 * No phone number. A public page aimed at recruiters should not publish one,
 * and the Live Portfolio's habit of doing so is not carried over.
 */
export const contact = {
  heading: 'Contact',
  intro: 'Looking for applied AI work where reliability gets as much attention as capability. If that is the shape of your team, say hello.',
  email: 'adibahsanchowdhury@gmail.com',
  formEndpoint: 'https://formspree.io/f/mzbnekdk',
  resume: {
    label: 'Résumé',
    /** Vendored into `public/`, so the link survives a rebuild and a rename. */
    href: '/adib-ahsan-chowdhury-resume.pdf',
  },
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adib-ahsan/' },
    { label: 'GitHub', href: 'https://github.com/adibahsan' },
  ],
} as const

import type { ReactNode } from 'react'

import { FadeIn } from './FadeIn'

export interface SectionHeadingProps {
  children: ReactNode
  /**
   * What differs between the three: the gradient fill, which the inverted
   * services panel does without, and each section's own margin.
   */
  className?: string
}

/**
 * The display heading the three sections below the hero share.
 *
 * `design-spec.md` gives the about and services headings the same treatment and
 * then says of the projects one only that it is the "same styling as other
 * headings" — so the sentence is the component. Written out per section, the
 * fluid size is three chances for one of them to drift silently.
 *
 * The hero's headline is deliberately not folded in here: it is the page's `h1`,
 * it scales in viewport widths rather than through this clamp, and it carries
 * its own margin and entrance delay. It shares the gradient, and that is all —
 * which is what the `.hero-heading` class is for.
 */
export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <FadeIn
      as="h2"
      y={40}
      className={`text-center font-black uppercase leading-none tracking-tight ${className ?? ''}`}
      style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
    >
      {children}
    </FadeIn>
  )
}

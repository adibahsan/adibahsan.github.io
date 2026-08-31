import { motion, type DOMMotionComponents, type HTMLMotionProps } from 'framer-motion'
import { type ComponentType, type ReactNode, useMemo } from 'react'

/** The design's single easing curve, shared by every entrance on the page. */
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

export interface FadeInProps {
  children?: ReactNode
  /** Element to render as. Defaults to a div. */
  as?: keyof DOMMotionComponents
  /** Seconds to wait before starting. Stagger a group by spacing these. */
  delay?: number
  duration?: number
  /** Offset to travel in from, in px. */
  x?: number
  y?: number
  className?: string
  style?: HTMLMotionProps<'div'>['style']
}

/**
 * The shared entrance animation: fade up (or in from a side) once, the first
 * time the element comes into view.
 *
 * `amount: 0` with a 50px margin means the entrance fires as soon as any sliver
 * of the element is near the viewport rather than waiting for it to be
 * substantially visible — which matters for the full-width headings, whose
 * height alone would otherwise delay them well past their cue.
 */
export function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
}: FadeInProps) {
  // motion.create() mints a fresh component per call, so calling it inline would
  // remount the subtree on every render.
  const Tag = useMemo(
    () => motion.create(as) as ComponentType<HTMLMotionProps<'div'>>,
    [as],
  )

  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Tag>
  )
}

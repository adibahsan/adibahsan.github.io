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
  /**
   * What starts the entrance. `in-view` waits for the element to come near the
   * viewport, which is what almost everything on this page wants.
   *
   * `mount` runs it once on the first render instead, and exists for elements
   * an observer cannot see. An element clipped away by an ancestor's
   * `overflow: hidden` has an empty intersection rectangle, so it never
   * qualifies as in view — and if the thing that would bring it back inside the
   * clip is this very animation, `in-view` deadlocks: it stays hidden because it
   * has not animated, and it does not animate because it is hidden. The hero's
   * masked headline is exactly that shape.
   *
   * The two are visually identical for anything on screen at load, which the
   * whole hero is. `mount` is not a shortcut past the observer; it says the cue
   * is arrival on the page rather than arrival in the viewport.
   */
  cue?: 'in-view' | 'mount'
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
  cue = 'in-view',
}: FadeInProps) {
  // motion.create() mints a fresh component per call, so calling it inline would
  // remount the subtree on every render.
  const Tag = useMemo(
    () => motion.create(as) as ComponentType<HTMLMotionProps<'div'>>,
    [as],
  )

  const arrived = { opacity: 1, x: 0, y: 0 }

  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      {...(cue === 'mount'
        ? { animate: arrived }
        : { whileInView: arrived, viewport: { once: true, margin: '50px', amount: 0 } })}
      transition={{ duration, delay, ease }}
    >
      {children}
    </Tag>
  )
}

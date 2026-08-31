import { type ReactNode, useEffect, useRef, useState } from 'react'

import { atRest, magnetPull, type MagnetPull } from '../lib/magnet'

export interface MagnetProps {
  children: ReactNode
  /** How far beyond the element's edge the pull reaches, in px. */
  padding: number
  /** Cursor offset is divided by this: higher is a weaker pull. */
  strength: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

/**
 * Pulls its children toward the cursor while the cursor is near them, and eases
 * them back to rest — more slowly than it pulled — once it leaves.
 *
 * Two nested elements, not one: the outer wrapper stays untransformed so it can
 * be measured, because measuring the moving element would feed its own
 * displacement back into the next frame's offset.
 */
export function Magnet({
  children,
  padding,
  strength,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const wrapper = useRef<HTMLDivElement>(null)
  const [pull, setPull] = useState<MagnetPull>(atRest)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!wrapper.current) return

      const next = magnetPull(
        event.clientX,
        event.clientY,
        wrapper.current.getBoundingClientRect(),
        padding,
        strength,
      )

      // Cursor movement anywhere on the page reaches this handler, so hold the
      // previous object whenever nothing actually moved.
      setPull((previous) =>
        previous.active === next.active && previous.x === next.x && previous.y === next.y
          ? previous
          : next,
      )
    }

    // Leaving the window stops mousemove arriving, which would strand the
    // element mid-pull at whatever the last position happened to be.
    const handleMouseLeave = () => setPull(atRest)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [padding, strength])

  return (
    <div ref={wrapper} className={className}>
      <div
        style={{
          transform: `translate3d(${pull.x}px, ${pull.y}px, 0)`,
          transition: pull.active ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}

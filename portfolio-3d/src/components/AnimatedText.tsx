import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from 'framer-motion'
import { useRef, type CSSProperties } from 'react'

import { characterOpacity } from '../lib/scroll'

/**
 * The paragraph's own pass, in the scroll-offset notation Framer Motion reads:
 * it begins when the paragraph's top edge reaches four fifths of the way down
 * the viewport, and completes when its bottom edge reaches one fifth. So the
 * reveal runs while the paragraph crosses the middle of the screen.
 */
const REVEAL_PASS: UseScrollOptions['offset'] = ['start 0.8', 'end 0.2']

interface AnimatedTextProps {
  text: string
  className?: string
  style?: CSSProperties
}

/**
 * A paragraph that lights up character by character as the reader scrolls
 * through it, rather than playing out on a timer once it appears.
 *
 * Only the scroll progress is shared: it is read once here and handed to every
 * character, each of which derives its own opacity from it.
 */
export function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const paragraph = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: paragraph, offset: REVEAL_PASS })

  // By code point rather than by UTF-16 unit, so a character is never split in
  // half and lit as two.
  const characters = Array.from(text)

  return (
    <p ref={paragraph} className={className} style={style}>
      {/* The reveal needs one element per character, and an absolutely
          positioned span is a block box whatever its markup says — so a screen
          reader meets the sentence as one block per letter with the spaces
          collapsed out from between them, and reads it out that way. It is
          offered once, whole, here instead; the characters are left to the eye. */}
      <span className="sr-only">{text}</span>

      <span aria-hidden>
        {characters.map((character, index) => (
          <Character
            key={index}
            character={character}
            index={index}
            total={characters.length}
            progress={scrollYProgress}
          />
        ))}
      </span>
    </p>
  )
}

interface CharacterProps {
  character: string
  index: number
  total: number
  progress: MotionValue<number>
}

/**
 * One character, in two copies: a hidden one that holds its place in the line,
 * and an animated one laid over it that carries the opacity.
 *
 * Splitting them keeps the animation off the flow — the lit copy is out of it
 * entirely, so nothing the reveal does can reflow the paragraph mid-sweep,
 * and the line still wraps and spaces itself off the ordinary inline copy.
 */
function Character({ character, index, total, progress }: CharacterProps) {
  const opacity = useTransform(progress, (value) => characterOpacity(index, total, value))

  return (
    <span className="relative">
      <span className="invisible">{character}</span>
      {/* Pulled back to the start of the pair by `left`, but left to find its
          own vertical place: with `top` auto an absolute box sits where it
          would have sat in flow, which is exactly on top of the copy above. */}
      <motion.span className="absolute left-0" style={{ opacity }}>
        {character}
      </motion.span>
    </span>
  )
}

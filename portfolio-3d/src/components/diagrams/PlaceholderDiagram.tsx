import { SLOT_RADIUS, type DiagramProps } from './Diagram'

/**
 * The longest caption line the narrowest slot holds.
 *
 * The two short drawings sit in the card's 40% column, which at the smallest
 * tier is about 115px across — roughly fourteen characters of the small
 * uppercase type the card uses everywhere else. SVG text does not wrap, so the
 * wrapping happens here rather than being left to the browser.
 */
const MAX_LINE = 14

/** The caption broken into lines of at most {@link MAX_LINE} characters. */
function captionLines(caption: string): string[] {
  const lines: string[] = []

  for (const word of caption.split(' ')) {
    const last = lines.length - 1
    const joined = last < 0 ? word : `${lines[last]} ${word}`

    if (last >= 0 && joined.length <= MAX_LINE) lines[last] = joined
    else lines.push(word)
  }

  return lines
}

/**
 * The drawing every diagram slot holds until a real one replaces it: a ghosted
 * schematic under a dashed frame, labelled with what the slot will eventually
 * draw.
 *
 * Deliberately provisional rather than blank. The dashes and the low contrast
 * say "not drawn yet" in the page's own language, and the caption says which
 * drawing is missing — so the card is complete and demoable now, and the nine
 * slots read as nine specific gaps rather than as nine grey boxes.
 *
 * Tickets 06 to 08 replace it per project, one real {@link Diagram} at a time,
 * by swapping entries in `projectDiagrams`. Nothing else has to change: the
 * contract is in `Diagram.ts` and this component satisfies all of it.
 */
export function PlaceholderDiagram({ caption, className }: DiagramProps) {
  const lines = captionLines(caption)

  // No `viewBox`: one user unit is one CSS pixel whatever shape the slot is, so
  // the frame, the hairlines and the type keep the page's own scale instead of
  // being stretched to the slot's aspect ratio. `currentColor` throughout takes
  // the `foreground` the card sets, and `text-foreground` here means the
  // drawing is right on its own as well as in the card.
  return (
    <svg role="img" className={`text-foreground ${className ?? ''}`}>
      <title>{`${caption} — diagram not drawn yet`}</title>

      {/*
        The panel. Drawn at the full viewport with twice the stroke it shows:
        the outer half falls outside the SVG and is clipped, which leaves the
        card's own 2px hairline weight without insetting the rectangle by hand.

        The radius rides in CSS so it can answer to the tiers; the attribute is
        the smallest of the three, for anywhere the geometry property is not
        honoured.
      */}
      <rect
        className={SLOT_RADIUS}
        x={0}
        y={0}
        width="100%"
        height="100%"
        rx={40}
        fill="currentColor"
        fillOpacity={0.04}
        stroke="currentColor"
        strokeOpacity={0.28}
        strokeWidth={4}
        strokeDasharray="14 12"
      />

      {/*
        The schematic: one stage feeding another that fans out to two. Nested so
        it has a viewBox of its own — it keeps its proportions and centres in
        whichever slot shape it lands in, rather than being squashed by it.

        Every stroke is non-scaling, so the sketch grows with the slot while its
        lines stay the hairline weight the design uses at every size. It is not
        an inherited property, which is why each shape carries it.
      */}
      <svg
        x="18%"
        y="13%"
        width="64%"
        height="46%"
        viewBox="0 0 100 56"
        preserveAspectRatio="xMidYMid meet"
        stroke="currentColor"
        strokeOpacity={0.45}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x={1}
          y={19}
          width={26}
          height={18}
          rx={5}
          fill="currentColor"
          fillOpacity={0.07}
          vectorEffect="non-scaling-stroke"
        />
        <path d="M27 28H38.5M35 24.5L39 28L35 31.5" fill="none" vectorEffect="non-scaling-stroke" />
        <rect
          x={40}
          y={19}
          width={26}
          height={18}
          rx={5}
          fill="currentColor"
          fillOpacity={0.07}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M66 28H72V10H76M72.5 6.5L76 10L72.5 13.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M66 28H72V46H76M72.5 42.5L76 46L72.5 49.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x={77}
          y={2}
          width={22}
          height={16}
          rx={5}
          fill="currentColor"
          fillOpacity={0.07}
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x={77}
          y={38}
          width={22}
          height={16}
          rx={5}
          fill="currentColor"
          fillOpacity={0.07}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/*
        The caption, in the same small uppercase tracked type the card gives the
        stack line, and clamped in viewport widths as the rest of the card is.
        Set from a little higher when it takes two lines, so the second one
        clears the foot of the shortest slot.
      */}
      <text
        className="font-light uppercase tracking-widest"
        x="50%"
        y={lines.length > 1 ? '70%' : '76%'}
        textAnchor="middle"
        fill="currentColor"
        fillOpacity={0.6}
        style={{ fontSize: 'clamp(0.65rem, 1.1vw, 1rem)' }}
      >
        {lines.map((line, index) => (
          <tspan key={line} x="50%" dy={index === 0 ? 0 : '1.35em'}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  )
}

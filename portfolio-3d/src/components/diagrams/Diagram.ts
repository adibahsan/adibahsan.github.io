import type { ComponentType } from 'react'

/**
 * What a project card hands each of its three drawings.
 *
 * The card owns where a drawing sits and how big it is; the drawing owns
 * everything inside its own edge. There is no `src`, no `alt` and no
 * `object-fit`, because per ADR-0004 these slots hold drawn vector graphics
 * rather than pictures — nothing is fetched, and nothing is cropped to fill.
 */
export interface DiagramProps {
  /**
   * What this slot draws, taken from the project's `diagrams` in the identity
   * module. Content lives there; which component draws it is the section's
   * business, and the contract test holds the two counts equal.
   *
   * A diagram renders the caption, and names itself with it for assistive
   * technology — nine unlabelled drawings are nine unreadable slots.
   */
  caption: string
  /**
   * The slot's size, from the card. Geometry only: a drawing must fill what it
   * is given at either of the card's two slot shapes — the two short ones in
   * the narrow column and the tall one beside them.
   */
  className?: string
}

/**
 * One drawing in a project card.
 *
 * The contract a real diagram satisfies, over and above rendering something
 * true about the system it depicts:
 *
 * - It is an `<svg>` element, drawn inline. Not an `<img>`, not a `<div>`.
 * - It fills its slot at whatever shape the slot is, and stays legible at both.
 *   Nothing is cropped away to do it.
 * - It draws in `currentColor`, which the card resolves to the `foreground`
 *   token, over the `ground` beneath it — so it cannot drift out of step with
 *   the page around it, and it stays crisp at any card scale, 0.94 included.
 * - It draws its own frame, {@link SLOT_RADIUS} included. Nothing outside it
 *   clips it to shape.
 * - It renders {@link DiagramProps.caption} and carries it in a `<title>` under
 *   `role="img"`.
 *
 * `PlaceholderDiagram` is the working example of all six.
 */
export type Diagram = ComponentType<DiagramProps>

/**
 * The card's heavy radius, as the SVG geometry property rather than as a border
 * radius, so a drawing's own frame carries it.
 *
 * The three values mirror the card's `RADIUS` in `ProjectsSection`, written out
 * for the same reason it is: Tailwind finds utility names in the source, so
 * neither can be assembled from the other at runtime.
 */
export const SLOT_RADIUS = '[rx:40px] sm:[rx:50px] md:[rx:60px]'

export interface StatusChipProps {
  /** Where the project lives and who owns it, e.g. "Private — hSenid Mobile". */
  status: string
}

/**
 * The provenance line on a project card, in the slot the supplied design gave a
 * "Live Project" button.
 *
 * All three featured projects are private, so there is no destination to send
 * anyone to and this states that instead. It keeps the ghost pill's outline,
 * size and position, because the card's composition is built around a shape in
 * that corner — but it is a `<span>` with no href, no handler, no hover state
 * and no pointer cursor, so nothing about it offers a click it cannot honour. A
 * button promising a destination it does not have is worse than no button.
 *
 * The gradient {@link ContactButton} it used to be the ghost counterpart to is
 * still the page's one call to action, and still the only thing on the page
 * shaped like a button.
 */
export function StatusChip({ status }: StatusChipProps) {
  return (
    <span className="inline-block rounded-full border-2 border-foreground px-8 py-3 text-sm font-medium uppercase tracking-widest text-foreground sm:px-10 sm:py-3.5 sm:text-base">
      {status}
    </span>
  )
}

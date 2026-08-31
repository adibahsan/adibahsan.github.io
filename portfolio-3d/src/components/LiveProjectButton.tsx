/**
 * The projects section's call to action: the ghost counterpart to
 * {@link ContactButton}, outlined in the pale type colour so it reads as
 * secondary against the gradient pill the page opens and closes with.
 *
 * Presentational for this effort, as the primary button is — the projects have
 * no destinations until Reskin supplies real ones.
 */
export function LiveProjectButton() {
  return (
    <button
      type="button"
      className="rounded-full border-2 border-foreground px-8 py-3 text-sm font-medium uppercase tracking-widest text-foreground hover:bg-foreground/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      Live Project
    </button>
  )
}

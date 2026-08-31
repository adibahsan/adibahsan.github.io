/**
 * The page's primary call to action. Presentational for this effort — wiring it
 * to a form provider belongs to Reskin.
 *
 * The gradient, the shadow pair and the inset outline are given as literal
 * values in `design-spec.md` and carry no Tailwind equivalent, so they stay
 * inline rather than becoming theme tokens nothing else would use.
 */
export function ContactButton() {
  return (
    <button
      type="button"
      className="rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  )
}

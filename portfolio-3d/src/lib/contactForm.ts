/**
 * The contact form's own rule about what is worth sending, kept free of the DOM
 * so it can be verified without rendering a page — as the scroll and magnet
 * arithmetic beside it is. The section holds the two fields and asks; nothing
 * here reads state, an element or an event.
 *
 * The rule is deliberately the *form's* rule and not the provider's. Formspree
 * decides what it accepts, and the mail server after it decides what it can
 * deliver; neither answer arrives in time to grey out a button. What this
 * answers is the narrower question the page can answer for itself: is there
 * somewhere to reply to, and is there anything to reply about.
 *
 * No validation dependency. The Live Portfolio reaches for `validator` to ask
 * the same question, and it is a reasonable thing to depend on in an app that
 * already has it — this one has three runtime dependencies, and a fourth
 * carrying an RFC's worth of address grammar to serve one regex on one form is
 * a poor trade. The regex below is the whole of what is bought back.
 */

/**
 * What the form holds, as the person typing has it: raw, untrimmed, and not
 * yet known to be worth sending.
 */
export interface ContactDraft {
  readonly email: string
  readonly message: string
}

/**
 * Deliverable-shaped, rather than valid: someone at a host, and a host with a
 * dotted name that could resolve.
 *
 * The address grammar is far wider than this and no client-side check settles
 * it — an address can satisfy every rule in the specification and still bounce.
 * So this refuses only the mistakes that are unambiguous at the keyboard: no
 * `@` at all, nothing either side of it, a bare host with no dotted suffix, and
 * whitespace where an address cannot carry it. Everything else is let through,
 * because a form that argues with a working address is worse than one that
 * accepts a broken one.
 *
 * Character classes are negated rather than enumerated. `[a-z0-9._%+-]` is the
 * regex everyone writes, and it quietly refuses `josé@example.com` and every
 * non-Latin local part behind it — a refusal that reads as a typo to the person
 * being refused and is invisible to everyone else.
 *
 * The last label takes two characters or more: no top-level domain is one
 * character long, so `adib@example.c` is a truncation rather than an address.
 */
const DELIVERABLE = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)*\.[^\s@.]{2,}$/u

/**
 * Whether an address is worth trying to reply to.
 *
 * Surrounding whitespace is trimmed rather than refused: an address pasted out
 * of a mail client carries a space or a newline as often as not, and that is
 * the sender's clipboard talking, not their intent. The section sends the same
 * trimmed values, so what is judged here is exactly what is posted.
 */
export function isWellFormedAddress(address: string): boolean {
  return DELIVERABLE.test(address.trim())
}

/**
 * Whether a draft is worth posting to the provider.
 *
 * Both halves, not either: an address with no message sends an empty
 * notification, and a message with no address arrives with no way to answer it,
 * which is the one thing this form exists to produce.
 */
export function isSubmittable({ email, message }: ContactDraft): boolean {
  return isWellFormedAddress(email) && message.trim() !== ''
}

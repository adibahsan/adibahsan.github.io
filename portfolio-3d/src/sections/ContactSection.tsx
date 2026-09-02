import { useState, type FormEvent } from 'react'

import { FadeIn } from '../components/FadeIn'
import { SectionHeading } from '../components/SectionHeading'
import { contact, sectionIds } from '../content/identity'
import { isSubmittable, isWellFormedAddress } from '../lib/contactForm'

/**
 * No reCAPTCHA, and the Live Portfolio is the evidence rather than the
 * precedent.
 *
 * Its form (`portfolio-react/src/components/Form/Form.tsx`) still imports
 * `react-google-recaptcha`, but the widget itself is commented out and the
 * `isHuman` flag it would set is never read by the submit button beside it. So
 * the integration there is not a working defence being carried over; it is a
 * dead one being revived, and reviving it means a site key to keep alive for a
 * guard that has never guarded anything.
 *
 * Against that: Formspree already filters submissions before they reach the
 * inbox, and can turn on its own captcha or honeypot from its dashboard without
 * a line changing here — so the cheap answer stays available if spam ever
 * actually arrives. And the cost is real: the widget is a third-party script
 * and a light Google box on a page that otherwise vendors every asset and makes
 * no runtime request to anyone, sitting in the one section a recruiter has to
 * get through. A visible obstacle on a form that receives a handful of messages
 * a year buys less than it costs.
 *
 * Revisit if the inbox says otherwise. Until then the guard is the provider's.
 */

/** Where the form is in its round trip. Every one of these renders. */
type Status = 'idle' | 'sending' | 'sent' | 'failed'

/**
 * The page's small-type treatment, shared by the field labels and the closing
 * link row — the same clamp the project card's category line carries, so the
 * form's chrome is the page's voice rather than a form's.
 */
const SMALL = { fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }
const SMALL_TYPE = 'font-light uppercase tracking-widest'

/**
 * The form controls, built from nothing: Tailwind's preflight strips inputs
 * back to unstyled boxes, so every one of these is a decision rather than a
 * default. Dark ground, a foreground hairline that fills in on focus, and
 * padding on the generous side of comfortable, matching the panel around them.
 *
 * The radius is the section's, stepped down — a field inside a 60px card wants
 * to echo the corner it sits in without competing with it.
 */
const FIELD =
  'w-full rounded-2xl border border-foreground/25 bg-ground px-5 py-4 font-light text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground disabled:opacity-40'

/** The closing section, and the end of the page. */
export function ContactSection() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  // Only after the field has been left, so the note appears when the address is
  // finished rather than scolding someone three characters into typing it.
  const [addressVisited, setAddressVisited] = useState(false)

  const sending = status === 'sending'
  const ready = isSubmittable({ email, message }) && !sending
  const addressWrong = addressVisited && email !== '' && !isWellFormedAddress(email)

  /*
   * What the disabled button is still waiting for, or null when it is not
   * waiting for anything.
   *
   * A greyed-out Send with nothing to explain it is the silent failure the
   * ticket rules out just as much as a swallowed error is: the button is the
   * one control on the page that can refuse, so it has to say why. Held back
   * until something has been typed, so an untouched form is not already
   * telling the reader what they have done wrong.
   *
   * The address is named first when both are outstanding — it is the field
   * above, and answering them top to bottom is the order they are read in.
   */
  const started = email.trim() !== '' || message.trim() !== ''
  const outstanding = !isWellFormedAddress(email)
    ? 'an address I can reply to'
    : message.trim() === ''
      ? 'a message'
      : null

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ready) return

    setStatus('sending')

    try {
      // The same Formspree form the Live Portfolio posts to, reached with a
      // plain fetch rather than `@formspree/react`: the hook is a dependency
      // and a component contract wrapped around one POST, and this is the same
      // integration without either. `Accept: application/json` is what makes
      // the provider answer with JSON instead of redirecting to its own thank-
      // you page, which is the whole of what the SDK arranges.
      const response = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        // Trimmed, exactly as `isSubmittable` judged them.
        body: JSON.stringify({ email: email.trim(), message: message.trim() }),
      })

      // A rejected promise is a network that never carried it; a non-OK
      // response is a provider that refused it. Both are failures to the person
      // waiting, and neither may pass silently.
      setStatus(response.ok ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <section
      id={sectionIds.contact}
      className="relative z-10 bg-ground px-5 py-20 text-foreground sm:px-8 sm:py-24 md:px-10 md:py-32"
    >
      <SectionHeading className="hero-heading mb-10 sm:mb-12 md:mb-16">
        {contact.heading}
      </SectionHeading>

      <FadeIn
        as="p"
        delay={0.1}
        className="mx-auto max-w-[560px] text-center font-light leading-relaxed opacity-70"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
      >
        {contact.intro}
      </FadeIn>

      {/*
        The project cards' panel — same border, same radius — so the form reads
        as one more card in the page's own vocabulary rather than a form pasted
        onto the end of it. Padding a step above the cards': fields need more
        room around them than images do.
      */}
      <FadeIn
        delay={0.2}
        className="mx-auto mt-12 max-w-3xl rounded-[40px] border-2 border-foreground p-6 sm:mt-16 sm:rounded-[50px] sm:p-8 md:mt-20 md:rounded-[60px] md:p-10"
      >
        {status === 'sent' ? (
          // Replacing the form rather than sitting above it: the send happened,
          // and leaving the fields there invites a second copy of the same
          // message. `role="status"` announces it to a reader who cannot see
          // the panel change.
          <div role="status" className="flex flex-col gap-4 py-6 text-center sm:py-10">
            <p className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
              Message sent
            </p>
            <p className="font-light leading-relaxed opacity-60" style={SMALL}>
              {`Thanks — I'll reply to ${email.trim()}.`}
            </p>
          </div>
        ) : (
          // `noValidate` hands the gate to the rule in `lib/contactForm.ts`.
          // The browser's own bubble would otherwise fire first, in its own
          // styling and its own words, for a question already answered here.
          <form noValidate onSubmit={send} className="flex flex-col gap-6 sm:gap-8">
            <label className="flex flex-col gap-3">
              <span className={SMALL_TYPE} style={SMALL}>
                Your email
              </span>
              <input
                // `type="email"` for the keyboard it summons on a phone, not
                // for the validation it would otherwise bring with it.
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={() => setAddressVisited(true)}
                disabled={sending}
                aria-invalid={addressWrong || undefined}
                aria-describedby={addressWrong ? 'contact-address-note' : undefined}
                className={FIELD}
              />
              {addressWrong && (
                <span id="contact-address-note" className="font-light opacity-60" style={SMALL}>
                  That does not look like an address I could reply to.
                </span>
              )}
            </label>

            <label className="flex flex-col gap-3">
              <span className={SMALL_TYPE} style={SMALL}>
                Your message
              </span>
              <textarea
                name="message"
                rows={5}
                placeholder="What are you building, and what would you hand me?"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled={sending}
                className={`${FIELD} resize-y`}
              />
            </label>

            <div className="flex flex-col gap-4">
              {/*
                The page's pill, inverted: the gradient one is a literal set
                given in `design-spec.md` and owned by `ContactButton`, and a
                second copy of those four colour stops here is a second place
                for them to drift. The panel's own ground and foreground make
                the same shape read as primary without repeating anything.
              */}
              <button
                type="submit"
                disabled={!ready}
                aria-busy={sending}
                aria-describedby={
                  started && outstanding && !sending ? 'contact-outstanding-note' : undefined
                }
                className="self-start rounded-full bg-foreground px-10 py-4 text-sm font-medium uppercase tracking-widest text-ground transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40 sm:px-12 sm:text-base"
              >
                {sending ? 'Sending' : 'Send'}
              </button>

              {started && outstanding && !sending && (
                <p
                  id="contact-outstanding-note"
                  className="font-light opacity-60"
                  style={SMALL}
                >
                  Still needs {outstanding}.
                </p>
              )}

              {status === 'failed' && (
                // Actionable, and beside a form that still holds every word
                // they typed: nothing was cleared, so retrying costs a click.
                <p
                  role="alert"
                  className="font-light leading-relaxed opacity-70"
                  style={SMALL}
                >
                  {'That did not send. Try again, or write to '}
                  <a
                    href={`mailto:${contact.email}`}
                    className="underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground"
                  >
                    {contact.email}
                  </a>
                  {' directly.'}
                </p>
              )}
            </div>
          </form>
        )}
      </FadeIn>

      {/*
        The page's last line. A hairline, the address in plain sight for anyone
        who would rather use their own mail client than a stranger's form, and
        the two documents a recruiter came for — so the page closes on where to
        go next instead of stopping.
      */}
      <FadeIn
        delay={0.3}
        className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-between gap-x-10 gap-y-6 border-t border-foreground/20 pt-10 sm:mt-16 sm:pt-12"
      >
        <a
          href={`mailto:${contact.email}`}
          className="font-light underline decoration-foreground/30 underline-offset-8 transition-colors hover:decoration-foreground"
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.5rem)' }}
        >
          {contact.email}
        </a>

        <ul className={`flex flex-wrap items-center gap-x-8 gap-y-3 ${SMALL_TYPE}`} style={SMALL}>
          {/* Same origin, so it opens rather than downloads: a résumé is read
              before it is filed, and the browser's viewer saves it either way. */}
          <li>
            <a
              href={contact.resume.href}
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              {contact.resume.label}
            </a>
          </li>

          {contact.links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  )
}

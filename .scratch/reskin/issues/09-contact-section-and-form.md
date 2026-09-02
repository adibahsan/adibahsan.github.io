# 09: Contact section and form

**What to build:** A closing section that actually sends mail. Today the page stops on the last project card and both calls to action are presentational; this ticket gives the page an ending and the owner an inbox.

The section carries a heading, the owner's name-based email address, a working form, his résumé and his social links. No phone number: a public page aimed at recruiters should not publish one.

It reuses the Formspree account the Live Portfolio already uses rather than introducing a second provider. The provider round trip is not unit tested — testing a third-party hook means the rendering-and-mocking component suite this repo has twice declined — so it is verified by hand, once, by sending a message and receiving it. Any submittability rule of the form's own is a pure function beside the existing scroll and magnet modules, and that is tested.

Whether the existing reCAPTCHA carries over is deliberately left open. The visible Google widget sits badly against this design and the provider's own spam handling may be enough. Decide with the rendered page in front of you and record which way you went and why.

This ticket also completes the nav: its fourth item finally has a section to point at, and the hero and about calls to action are repointed here.

**Blocked by:** 01 — Content contract and working nav

**Status:** ready-for-human

- [x] A closing section carries a heading, the owner's name-based email address and a working form
- [x] The form reuses the existing Formspree account rather than a second provider
- [x] Both success and failure states render; the form never silently does nothing
- [x] Any submittability rule of the form's own is a pure function beside the existing modules, and is unit tested
- [x] The résumé and the social links are present, and no phone number is published
- [x] The nav gains its fourth item and it resolves; the hero and about calls to action point at this section
- [ ] A message sent through the form is received — verified by hand, once
- [x] Whether reCAPTCHA carries over is decided with the rendered page in view, and the decision is recorded in the comments
- [x] No horizontal scroll at any of the three tiers
- [x] Build and every test pass

## Comments

**Built.** The page now ends on a contact section instead of stopping dead on
the last project card. It carries a heading, the owner's name-based address as a
`mailto:` link, a working form, the résumé and two social links. No phone
number.

The nav's fourth item resolves, and both the hero and about calls to action
point here — `ContactButton` became an anchor taking an `href` rather than a
presentational `<button>`.

### The rule is pure and tested; the round trip is not

`src/lib/contactForm.ts` holds `isWellFormedAddress` and `isSubmittable` beside
the scroll and magnet modules, free of the DOM. Nine tests, written red first.
The regex uses negated character classes rather than an enumerated
`[a-z0-9._%+-]`, which silently refuses non-ASCII local parts; both predicates
trim, so what is judged is exactly what is posted. No validation dependency: the
Live Portfolio reaches for `validator`, and an RFC's worth of address grammar is
a poor trade for one regex on one form.

Three mutations were checked and each went red: `{2,}` to `+` on the last label,
`message.trim() !== ''` to `message !== ''`, and `&&` to `||`.

The contract test now also asserts the **published** address passes the same
rule the form applies to a visitor — a page holding two standards would be
weakest exactly where it matters, since the published address is the fallback
for everyone the form fails.

Submission is a plain `fetch` POST to the Formspree form the Live Portfolio
already uses. No `@formspree/react`: it is the same integration with none of the
install. Three states render — in flight (disabled, `aria-busy`), success (a
`role="status"` confirmation that echoes the address, replacing the form), and
failure (a `role="alert"` line offering the `mailto:` fallback, with every typed
word intact). A rejected promise and a non-OK response both land in failure;
neither is swallowed.

### reCAPTCHA: not carried over

Recorded with its reasoning in `ContactSection.tsx`. The deciding evidence is
the Live Portfolio's own form: the `<ReCAPTCHA>` element is commented out and
the `isHuman` flag it would set is never read by the submit button's `disabled`
condition. There is no working defence to carry over, so reviving it means
standing up a site key for a guard that has never guarded a submission. Against
that, Formspree already filters before the inbox and can enable its own captcha
or honeypot from the dashboard with no code change, so the cheap answer stays
available if spam actually arrives — while the cost is a third-party script and
a light Google box on a page that otherwise vendors every asset and makes no
runtime request to anyone.

### Status is `ready-for-human`, not `done`

Every acceptance box is ticked except one, and that one cannot be ticked from
here. The ticket stays open on the owner rather than being closed over an
unverified claim.

### Not done, and only the owner can do it

- **"A message sent through the form is received" is unticked above and remains
  unverified.** It is a by-hand check against the live Formspree account.
- The résumé PDF was vendored as it stands. The spec records that it predates
  the Tech Lead promotion and that regenerating it is the owner's prerequisite,
  not this effort's work.

### Corrected at review

- **The disabled Send button now says what it is waiting for.** An empty message
  greyed it out with no explanation, which is the same silent failure the
  ticket rules out for errors — the button is the one control that can refuse,
  so it has to give a reason. A note names the outstanding field, held back
  until something has been typed so an untouched form does not open by telling
  the reader what they have done wrong, and wired to the button with
  `aria-describedby`.

# 09: Contact section and form

**What to build:** A closing section that actually sends mail. Today the page stops on the last project card and both calls to action are presentational; this ticket gives the page an ending and the owner an inbox.

The section carries a heading, the owner's name-based email address, a working form, his résumé and his social links. No phone number: a public page aimed at recruiters should not publish one.

It reuses the Formspree account the Live Portfolio already uses rather than introducing a second provider. The provider round trip is not unit tested — testing a third-party hook means the rendering-and-mocking component suite this repo has twice declined — so it is verified by hand, once, by sending a message and receiving it. Any submittability rule of the form's own is a pure function beside the existing scroll and magnet modules, and that is tested.

Whether the existing reCAPTCHA carries over is deliberately left open. The visible Google widget sits badly against this design and the provider's own spam handling may be enough. Decide with the rendered page in front of you and record which way you went and why.

This ticket also completes the nav: its fourth item finally has a section to point at, and the hero and about calls to action are repointed here.

**Blocked by:** 01 — Content contract and working nav

**Status:** ready-for-agent

- [ ] A closing section carries a heading, the owner's name-based email address and a working form
- [ ] The form reuses the existing Formspree account rather than a second provider
- [ ] Both success and failure states render; the form never silently does nothing
- [ ] Any submittability rule of the form's own is a pure function beside the existing modules, and is unit tested
- [ ] The résumé and the social links are present, and no phone number is published
- [ ] The nav gains its fourth item and it resolves; the hero and about calls to action point at this section
- [ ] A message sent through the form is received — verified by hand, once
- [ ] Whether reCAPTCHA carries over is decided with the rendered page in view, and the decision is recorded in the comments
- [ ] No horizontal scroll at any of the three tiers
- [ ] Build and every test pass

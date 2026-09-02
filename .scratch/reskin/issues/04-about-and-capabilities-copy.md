# 04: About and Capabilities copy

**What to build:** The two sections whose change is content alone. The character reveal carries a short site-authored statement, and the inverted panel lists five capabilities the owner holds rather than five services a freelancer sells.

Neither section's components change. The About keeps its measure, its heading treatment and its per-character reveal at the same cost. The panel keeps its inverted ground, rounded top edge, hairline rules, numerals and staggered entrance.

The supplied copy's lowercase "i" was the Placeholder Identity's affectation and goes with it.

**Blocked by:** 01 — Content contract and working nav

**Status:** done

- [x] The About paragraph is site-authored and roughly two hundred characters
- [x] The character reveal is unchanged — same mechanism, same measure, same cost
- [x] The lowercase "i" affectation is gone
- [x] The panel's five rows carry capabilities, not services
- [x] The panel keeps its inverted ground, rounded top edge, hairlines, numerals and staggered entrance, with no component change
- [x] Ordinals remain derived from position, so a row can be added or reordered without renumbering
- [x] The contract test asserts none of the supplied design's five service names remain
- [x] Build and every test pass

## Comments

**Built.** Content alone, as the ticket says — plus the rename the ticket 01
comment deferred to this ticket.

The About paragraph is site-authored at 193 characters, a hook rather than a
biography, since the technical depth now lives in the project cards. The
character reveal, its measure, its heading treatment and its cost are all
untouched. The lowercase "i" affectation is gone from both places it appeared.

The panel's five rows are capabilities held rather than services sold:
retrieval systems, agent orchestration, evaluation and tracing, product
engineering, technical leadership. The inverted ground, rounded top edge,
hairlines, numerals and staggered entrance are unchanged, and the ordinals stay
derived from position.

### Scope decisions

- **`ServicesSection.tsx` was renamed to `CapabilitiesSection.tsx`.** Ticket 01's
  comment explicitly deferred this rename to whoever owned this ticket's
  content. "Services" is not in the domain vocabulary and the panel had already
  answered to `capabilities` since ticket 01; leaving the filename saying
  otherwise would have left the codebase disagreeing with `CONTEXT.md`. A file
  rename is not the component change the ticket rules out — the component's
  markup is unchanged apart from the export name and the identity binding.
- The stale comment claiming the panel "still lists the Placeholder Identity's
  services" was rewritten rather than deleted, per the spec's instruction that
  comments asserting reversed decisions must be corrected rather than left to
  mislead.

### Corrected at review

- **The technical-leadership row overclaimed and was rewritten.** It read
  "standards written to outlast whoever introduced them", which in a
  first-person capabilities list reads as authorship. The content source's
  accuracy notes are explicit that the agentic-coding ruleset was authored by a
  colleague and that the contribution here was rolling it out and adding the
  security-review pass — one of the six claims the spec says are "worded
  narrowly on purpose" and must not be strengthened. The row now says exactly
  that, and a comment on `capabilities` warns the next editor off promoting
  "rolled out" to "wrote".

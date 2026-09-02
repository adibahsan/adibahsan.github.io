# 05: Projects — cards, status chips, and the other six

**What to build:** The projects section carries the owner's production-AI work: the retrieval service, the multi-agent orchestrations, and the phased-trust infrastructure agent. Below the stack, a compact list names the remaining six projects.

Each card's three-image gallery becomes three diagram slots. This ticket renders a placeholder diagram in each so the card is complete and demoable; tickets 06 to 08 replace them with real ones.

All three featured projects are private, so the ghost pill stops being a link and becomes a status chip stating provenance. A button promising a destination it does not have is worse than no button.

The heading becomes plural. The identity module currently carries a comment insisting the singular is deliberate and must not be corrected — that was true of the Placeholder Identity and is not true now. Rewrite the comment rather than leaving it to mislead.

**Blocked by:** 01 — Content contract and working nav

**Status:** done

- [x] Three cards carry the retrieval service, the multi-agent orchestrations and the phased-trust infrastructure agent
- [x] The heading is plural, and the comment asserting the singular was deliberate is rewritten
- [x] Each card's three image slots are diagram component slots, each rendering a placeholder diagram
- [x] The ghost pill is a status chip stating provenance, not a link
- [x] A compact list of the remaining six projects sits below the stack, carrying stacks and live links where they exist
- [x] The cards still stack and scale, and the scale sequence is unchanged
- [x] The contract test asserts every featured project declares exactly the number of diagrams its card renders
- [x] No horizontal scroll at any of the three tiers
- [x] Build and every test pass

## Comments

**Built.** Three cards carry the retrieval service, the multi-agent
orchestrations and the phased-trust infrastructure agent. The heading is plural
and the identity module's comment insisting the singular was deliberate has been
rewritten to say why it is now wrong.

The stacking machinery is untouched: the sticky runway, `STACK_OFFSET`,
`useScroll`, `stackedCardShrinkStart`/`stackedCardScale`, the radii and the
derived ordinals are all unchanged, and three cards remain three so the scale
sequence is identical.

**The small tracked line now carries the stack** where it used to carry
"Client" or "Personal". A freelancer's visitor wants to know who paid; this
one wants to know what it runs on, and that is the same line doing a more useful
job rather than a new element.

**The ghost pill is a `<span>`.** No `href`, no `type="button"`, no handler, no
hover class and no cursor rule, so it has no affordance of any kind — it states
provenance ("Private — hSenid Mobile") and nothing more. Its predecessor's doc
comment said the projects had no destinations "until Reskin supplies real ones";
that is now false, and the replacement says they are private and deliberately
have none.

**The three image slots are diagram slots.** Each renders a placeholder inline
SVG per ADR-0004 — no `viewBox` on the root, so one user unit is one CSS pixel
at either slot shape and nothing stretches; a nested `viewBox`'d schematic with
`vector-effect="non-scaling-stroke"` so lines stay hairline at any card scale
including 0.94 mid-stack; and the slot's caption drawn in the card's own type.

The seam for tickets 06 to 08 is `projectDiagrams`, exported from
`ProjectsSection` and keyed by project name. Content (the captions) lives in the
identity module and presentation (the drawings) lives in the section, mirroring
how `AboutSection` owns ornament placement. The contract test holds the two
counts equal, so a fourth caption cannot appear without a fourth drawing.

The remaining six sit below the stack as a `divide-y` list on the same 40/60
split the cards use, carrying stacks throughout and live links for the three
that have them. Where `href` is null nothing is drawn — no dead button.

### Scope decisions

- **The tail list sits on its own `relative z-20 bg-ground` band.** The last card
  overruns its 85vh runway on short, wide windows — up to about 350px at
  1440x700. That is pre-existing and unchanged (it is one of the five
  carried-forward items the spec puts out of scope), but it used to spill
  invisibly and became visible once a list sat below it. The band is the same
  idiom the projects section already uses to draw itself over the panel above,
  and it also stops the card spilling toward the new contact section.

### Left open for review

- **The tail list has no visible label.** A heading would be a new content field
  and a second heading inside one section, which the design does not do
  elsewhere. Left unlabelled deliberately; ticket 11's review has human eyes and
  should settle it.

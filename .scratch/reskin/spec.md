Status: ready-for-agent

# Reskin — the 3D Portfolio to Cutover Readiness

## Problem Statement

The site owner's published site is two years out of date, and the gap is now working against him.

Everything served at `adibahsan.github.io` describes work that ended in 2024 — storefront checkout, a payment-gateway aggregator, a delivery integration. Since then he has become a Tech Lead, shipped a production retrieval-augmented generation service behind a gated evaluation suite, built multi-agent orchestrations that join a workspace as members, and run an observe-only infrastructure agent under a phased-trust split. None of that appears anywhere on the web under his name. He is looking for applied AI work, and the site a recruiter reaches argues he is a JVM product engineer who stopped shipping.

Three apps exist and none of them fixes this. The **Live Portfolio** is what is served, and it is the stale one. The **Next Portfolio** was built to **Content Parity**, which means it presents the same content — so porting it changes the stack and preserves the problem. The **3D Portfolio** is current and striking but carries the **Placeholder Identity**: it is a landing page for a fictional 3D artist called Jack.

The 3D Portfolio is also the wrong *shape*, not merely the wrong content. The supplied design is a freelancer's shopfront — a five-item service menu, a `Price` link in the nav, three-image galleries built for renders, a 234-character About, and a call to action that does nothing. Filling those slots with real values would produce a 3D artist's website with an engineer's name on it.

## Solution

**Reskin** takes the 3D Portfolio to **Cutover Readiness** and then **Cutover** serves it at `adibahsan.dev` on Vercel, per ADR-0003.

Reskin replaces the Placeholder Identity *and* reshapes the sections whose form assumes a freelance artist. The visual language is kept in full — the dark ground, Kanit, the gradient display headings, the inverted panel with its rounded interlock, the sliding band, the stacking cards, every entrance animation. What changes is what those forms carry.

Section by section, the page becomes: a hero with the owner's name and a working nav; a band of the technologies he actually builds with; a short About on the same character reveal; the service menu re-cast as **capabilities**; three projects shown deeply with hand-authored architecture diagrams, followed by a compact list of the rest; and a real contact section that sends mail.

`adibahsan.github.io` stops publishing the Live Portfolio and publishes a redirect to the new address, so every link already printed on a CV or sitting in a LinkedIn profile keeps working and nothing stale stays public. The Next Portfolio is archived without ever holding a **Production Role**.

## User Stories

1. As a hiring manager, I want to see the site owner's real name and role within a second of landing, so that I know whose work I am looking at.
2. As a hiring manager, I want the work shown to be what he is doing now, so that I can judge his current level rather than his level two years ago.
3. As a hiring manager evaluating applied AI candidates, I want to see retrieval and agent systems specifically, so that I can tell whether his experience matches the role I am filling.
4. As a hiring manager, I want to see the architecture of a system rather than a screenshot of its UI, so that I can assess how he thinks about structure.
5. As a hiring manager, I want each project to name its stack plainly, so that I can match it against what my team runs.
6. As a hiring manager, I want to know when a project is private, so that I do not click a dead link and assume the work is fabricated.
7. As a hiring manager, I want evidence of reliability practice — evaluation gates, ADRs, tracing — so that I can distinguish a demo builder from someone who ships.
8. As a hiring manager, I want to reach him without leaving the page, so that a moment of interest becomes a message.
9. As a recruiter, I want his résumé downloadable from the site, so that I can pass it on without asking him for it.
10. As a recruiter, I want his LinkedIn and GitHub linked, so that I can verify what the site claims.
11. As a visitor, I want a nav that actually scrolls me to sections, so that I can skip to what I care about.
12. As a visitor, I want no link that leads nowhere, so that the site feels finished rather than abandoned mid-build.
13. As a visitor, I want the page to work on my phone, so that I can read it when a link reaches me on mobile.
14. As a visitor, I want the page never to scroll sideways, so that reading is not fought at any width.
15. As a visitor, I want to see the technologies he builds with at a glance, so that I can place him without reading every project.
16. As a visitor, I want a short statement of what he does, so that I get the point before deciding whether to read on.
17. As a visitor, I do not want to be shown a price list, so that I am not misled into thinking he sells freelance hours.
18. As a visitor arriving from an old link, I want to land on the current site rather than a 404 or a stale page, so that the link on his CV still works.
19. As a visitor, I want a page that ends properly rather than stopping mid-air, so that I know I have reached the bottom.
20. As a visitor who scrolls, I want the entrance animations, the sliding band and the stacking cards preserved, so that the page still has the character it was designed with.
21. As a visitor with a screen reader, I want the page to read as an ordered document, so that the animation techniques do not make the content unusable.
22. As the site owner, I want the Placeholder Identity gone entirely, so that no trace of "Jack" survives anywhere a visitor or a search engine can reach.
23. As the site owner, I want the site served at my own domain, so that I am not tied to a platform's address.
24. As the site owner, I want one current site rather than three stale ones, so that I have a single thing to keep up to date.
25. As the site owner, I want the site to position me for applied AI work, so that it argues for the roles I am actually pursuing.
26. As the site owner, I want my JVM years visible but not leading, so that a JVM opportunity still recognises me without the site advertising a stack I have mostly left.
27. As the site owner, I want to swap the hero portrait for a stylised image later, so that a better likeness is a one-value change rather than a rebuild.
28. As the site owner, I want to add, drop or reorder a project without renumbering anything by hand, so that keeping the site current stays cheap.
29. As the site owner, I want to change copy without touching components, so that a wording fix does not risk the layout.
30. As the site owner, I want my six other projects visible somewhere, so that the site does not hide two-thirds of my work.
31. As the site owner, I want my three strongest projects shown deeply rather than all nine shown thinly, so that depth is what a reader takes away.
32. As the site owner, I want no phone number published, so that a public page aimed at recruiters does not become a spam target.
33. As the site owner, I want the contact form to reach my inbox, so that interest converts rather than evaporating.
34. As the site owner, I want the form to reject an obviously invalid address before it submits, so that I do not receive messages I cannot reply to.
35. As the site owner, I want the site to serve no third-party images, so that someone else's asset host disappearing cannot break my page.
36. As the site owner, I want the page to have a proper title, description and preview image, so that a link to it in a message or a post renders as something worth clicking.
37. As the site owner, I want the Live Portfolio kept in the repository after it stops being served, so that the old site is recoverable without being public.
38. As the site owner, I want the Vercel project and DNS set up by a guided walkthrough, so that the steps only I can perform are not left as vague instructions.
39. As a developer, I want the content contract asserted by tests, so that a half-finished Reskin cannot ship looking complete.
40. As a developer, I want every nav target checked against the sections that exist, so that a typo'd anchor cannot silently lead nowhere.
41. As a developer, I want the check for leftover Placeholder Identity to be automatic, so that Cutover Readiness is a test rather than a memory of a review.
42. As a developer, I want the scroll-arithmetic and magnet tests kept green, so that reshaping the page is caught if it disturbs the mechanics underneath it.
43. As a developer, I want a production build as a gate, so that type errors and misconfiguration surface before review.
44. As a developer, I want the diagrams to use the app's own colour tokens, so that they cannot drift out of step with the page around them.
45. As a developer, I want the diagrams crisp at every card scale, so that a card rendered at 0.94 mid-stack does not show a blurred image.
46. As a reviewer, I want Reskin judged against this spec rather than against the supplied design, so that the deliberate departures are not read as failures.
47. As a future maintenance agent, I want the reversals of Design Fidelity decisions recorded, so that I do not "restore" the singular heading, the service menu or the placeholder copy believing them deliberate.
48. As a future Cutover agent, I want the deployment target and domain stated plainly, so that the hosting question is not reopened.

## Implementation Decisions

### What governs Reskin

- **This spec supersedes `design-spec.md` as the acceptance standard.** `design-spec.md` remains the record of the supplied design and of the completed **Design Fidelity** phase; it is not edited to match the implementation and it is not what Reskin is judged against. Where the two conflict, this spec wins, and the conflict is deliberate.
- Several decisions taken during Design Fidelity were correct *for Jack* and are now reversed. Each is recorded here because the code carries comments asserting the opposite, and those comments must be rewritten rather than left to mislead: the projects heading was singular "Project" and becomes plural; the service menu was a freelance offering and becomes capabilities; the Placeholder Identity was retained deliberately and is now removed.
- The **App Layout** is unchanged. The 3D Portfolio stays a sibling app with its own lockfile, per ADR-0002. No repo-level workspace is introduced.

### Content and its seam

- The identity module remains the single home for content and gains the material Reskin introduces. It is the seam that makes Reskin cheap to repeat, and everything a future content change touches lives there.
- **The identity module additionally owns the page's section identifiers and the nav items that point at them.** Each section takes its identifier from that module rather than declaring its own string. This is what makes "every nav target resolves" checkable without rendering, and it mirrors the existing split where the identity module owns ornament imagery while the about section owns their placement.
- Ordinals stay derived from position, as they already are for services and projects, so entries can be added, dropped or reordered without renumbering.
- Copy is authored for the site rather than pasted from LinkedIn. The About is roughly two hundred characters — a hook, not a biography — because the technical depth now lives in the project cards. The lowercase "i" of the supplied copy was Jack's affectation and goes.

### Section by section

- **Section order becomes** hero, marquee, about, capabilities, projects, contact. Contact is new; the other five keep their positions and their visual treatment.
- **Hero.** The headline carries the owner's name in place of Jack's. The nav becomes four working anchors — about, capabilities, projects, contact — replacing `Price`, which presupposed freelance sales; four items preserves the spacing the design distributes across the full width. The portrait slot keeps its geometry, its entrance and the magnetic hover; it is filled by the owner's existing headshot with its background removed, and is expected to be replaced later by a stylised image, which is a single value change. Both calls to action gain a destination.
- **Marquee.** The band keeps its two rows, its opposing travel and its scroll-driven arithmetic, and the tiles are reshaped from landscape image cards to squares carrying technology marks. The set leads with the current stack and keeps a small JVM tail, so a JVM-shaped opportunity still recognises him without the band advertising a stack he has largely left. Marks are vendored into the app; nothing is fetched from a third party at runtime.
- **About.** Unchanged mechanically — same heading treatment, same measure, same character reveal at the same cost. Only the copy changes.
- **Capabilities.** The inverted panel keeps its white ground, rounded top edge, hairline rules, huge numerals and staggered entrance. The five rows change from services sold to capabilities held. No component changes; this is a content change alone.
- **Projects.** Three cards, stacking as designed. The featured three are the production-AI work: the retrieval service, the multi-agent orchestrations, and the phased-trust infrastructure agent. Each card's three-image gallery is replaced by three architecture diagrams per ADR-0004. The ghost pill stops being a link and becomes a status chip stating provenance, because all three projects are private and a button promising a destination it does not have is worse than no button. Below the stack, a compact typographic list carries the remaining six projects with their stacks and, where one exists, a live link.
- **Contact.** A new closing section: a heading, the owner's name-based email address, and a working form. No phone number. The résumé and the social links live here, which is also where the page finally ends rather than stopping on the last card.

### Diagrams

- Diagrams are hand-authored components rendering inline vector graphics, using the app's existing ground and foreground tokens and its type, per ADR-0004. They are not images, so the gallery's object-fit cropping stops applying and nothing is fetched remotely.
- The mapping from a project to its diagrams lives with the projects section, not in the identity module — content is data, diagram selection is presentation, and the same split already governs the about section's ornaments.
- Nine diagrams is the single largest cost in the effort and it is drawing work rather than coding work. It is expected to want its own session or sessions.

### Contact form

- The form reuses the existing Formspree account and form already used by the Live Portfolio rather than introducing a second provider.
- Any submittability rule of the form's own — a well-formed address, a non-empty message — is a pure function living beside the existing scroll and magnet modules, so it is testable without rendering.
- Whether the existing reCAPTCHA integration is carried over is left to the implementing ticket. The visible Google widget sits badly against this design, and the provider's own spam handling may be sufficient; the decision should be taken with the rendered page in front of the implementer.
- Success and failure states are required. A form that silently does nothing on error is worse than no form.

### Serving it

- **Cutover targets Vercel at `adibahsan.dev`**, per ADR-0003. The 3D Portfolio is a static build with no server requirements; the domain is already owned.
- The GitHub Pages workflow stops publishing the Live Portfolio and publishes a redirect to the new address, carrying a canonical link so search engines resolve to one site. The Live Portfolio survives in the repository as an archive rather than on the web.
- **The Vercel project and the DNS records are steps only the site owner can perform.** The ticket covering them produces a guided walkthrough rather than instructions, and does not claim completion on the owner's behalf.
- The page gains a title, description, favicon and preview image. A served personal site without them is not finished.

### What does not change

- The scroll-arithmetic and magnet modules are untouched. Square marquee tiles do not alter the band's offsets, and three cards remain three, so the stacking sequence is unchanged.
- Every entrance animation, easing curve, breakpoint and spacing scale established during Design Fidelity is kept.
- The Live Portfolio and the Next Portfolio receive no changes beyond the Pages workflow's publish target.

## Testing Decisions

- **A good test here asserts external behaviour, not implementation details.** Asserting that the capabilities panel renders five rows tests transcription, not behaviour, and breaks on every intentional edit. Such tests are not written. The tests that earn their place assert *properties* the page must hold — that no placeholder survives, that every anchor resolves — which stay true across rewording and re-layout.
- **Prior art is the Design Fidelity build's own approach**, and it is followed rather than replaced: a production build as the outer gate, pure modules unit-tested away from the DOM, and no component suite. That effort declined broad component tests explicitly, as Layout Land did before it.

### Seam one — the production build

Unchanged from the previous two efforts. The app must install and build cleanly; this catches type errors, missing imports and toolchain misconfiguration.

### Seam two — the existing pure modules

The scroll-arithmetic and magnet modules keep their thirty tests. Reskin changes no arithmetic in either, so these run as a regression check: if reshaping the page disturbs the mechanics underneath it, they go red.

### Seam three — the content contract

The one new seam, and the highest available: assertions over the identity module as data, with nothing rendered. It tests **Cutover Readiness** directly, which is what makes that bar checkable rather than remembered.

- No Placeholder Identity survives anywhere in the content: not the fictional name, not the `Price` nav label, not the five 3D-artist service names, not the supplied design's image hosts.
- Every nav item's target is a section identifier that exists.
- Every external link is a well-formed absolute URL.
- Every featured project declares exactly the number of diagrams its card renders.
- Every entry a section iterates carries the fields that section reads, so a half-filled entry fails here rather than rendering blank.

### The form's rule

If the contact form carries any submittability rule of its own, that rule is a pure function beside the other two modules and is tested there. The provider round trip is not tested: the integration is a third-party hook, and testing it means the rendering-and-mocking component suite this repo has twice declined. It is verified by hand, once, by sending a message and receiving it.

### What is not a gate

- Component tests for any section.
- Visual regression.
- Browser automation as an acceptance condition. The rendered result is confirmed by review at the three breakpoint tiers, as Design Fidelity was — diagrams especially are a judgement a snapshot cannot make.

## Out of Scope

- **Any change to the supplied design's record.** `design-spec.md` is not edited to match what Reskin builds.
- **Re-opening the hosting decision.** ADR-0003 settles it.
- **Rewriting the LinkedIn profile or the résumé content.** The LinkedIn document is the source Reskin draws copy from, not an artefact Reskin maintains. Regenerating the résumé PDF, which currently predates the Tech Lead promotion, is a prerequisite the owner supplies rather than work this effort does.
- **The Next Portfolio.** It is archived, not deleted, not updated, and not migrated.
- **The Live Portfolio's code.** Only the workflow's publish target changes; the app itself is left alone.
- **A blog, a CMS, client-side routing, or per-project case-study pages.** The site remains a single static route with inlined content.
- **Analytics, cookie consent, or any tracking.**
- **A full accessibility audit.** Correct semantic elements and meaningful alternative text are expected as ordinary care, as they were during Design Fidelity; contrast remediation against the supplied palette and a formal audit are not part of this effort.
- **Light mode or theme switching.** The design is dark, save the deliberately inverted capabilities panel.
- **Redesigning the visual language.** Reskin changes what the forms carry, not what they look like.
- **The five carried-forward items from the Design Fidelity review** — the cards overrunning their runway at desktop, the stacked edges reading thinner than specified, the portrait overlapping the bottom bar at certain widths, the capabilities heading's extra entrance, and the invented category-label type. Real content makes them answerable, and they may be raised in the tickets that touch those sections, but none of them blocks Cutover Readiness.

## Further Notes

- Glossary: `CONTEXT.md` — this spec uses **Reskin**, **Cutover**, **Cutover Readiness**, **Placeholder Identity**, **Production Role**, **Design Fidelity**, **Content Parity**, **Redesign**, **App Layout**, **Live Portfolio**, **Next Portfolio** and **3D Portfolio** as defined there.
- Decisions: ADR-0003 for why Cutover goes to the 3D Portfolio on Vercel at `adibahsan.dev` and what it supersedes in ADR-0001; ADR-0004 for why the project cards carry drawn diagrams rather than photographs; ADR-0002 for why this is a third sibling app at all.
- Agent tracker: local markdown under `.scratch/` (`docs/agents/issue-tracker.md`).
- Content source: the LinkedIn role-update document in the owner's CV repository, compiled from git history across roughly sixty repositories and carrying its own accuracy notes. Six of its claims are worded narrowly on purpose; copy drawn from it should not be strengthened.
- Suggested ticket shape once this is split: the content contract and section identifiers first, since every section ticket depends on them; then the five section tickets, which are independent of one another and fan out; then the contact form; then the diagrams, which are the long pole and can begin as soon as the projects section is shaped; then the deployment walkthrough and the redirect, which join at the end.
- The nine diagrams are the effort's long pole and the one part that is drawing rather than coding. Expect it to want its own sessions, and do not let a ticket that bundles diagrams with layout stall both.
- Two content details to settle while writing copy: the site publishes the owner's name-based email address while his LinkedIn publishes a different one, which is worth aligning at some point; and the résumé PDF in the repository predates his current role.

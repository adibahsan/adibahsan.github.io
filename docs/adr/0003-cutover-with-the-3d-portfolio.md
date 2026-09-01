# Cutover with the 3D Portfolio, on Vercel at adibahsan.dev

ADR-0001 planned to cut over with the Next Portfolio. Cutover instead goes to the 3D Portfolio once Reskin takes it to Cutover Readiness, served from Vercel at the owned domain `adibahsan.dev`; `adibahsan.github.io` is replaced by a redirect to it, and the Next Portfolio is archived without ever holding a Production Role.

The Next Portfolio reached Content Parity, which means it presents the same content the Live Portfolio does — and that content is the problem. Its projects end in 2024 and describe storefront and payment-gateway work, while the current work is production RAG, multi-agent orchestration and the practice around them. Cutting over to it would have shipped a faithful port of a stale site. Content Parity was the right bar for a port and the wrong one for the situation the port arrived in.

## Considered options

- **Next Portfolio to Vercel, as ADR-0001 planned.** Rejected: it solves hosting and leaves the site stale, and updating its content is the same content work as Reskin without the design change the owner actually wants.
- **Refresh the Next Portfolio's content and cut over to it.** Rejected: it keeps a design the owner had already moved on from — the 3D Portfolio exists precisely because of that.
- **Reskin the 3D Portfolio but keep it unserved.** Rejected: it puts the current content on the one app nobody can reach, and leaves the stale site live.
- **GitHub Pages instead of Vercel.** The 3D Portfolio is a static Vite SPA, so ADR-0001's reason for Vercel — giving Next a normal hosting model rather than forcing `output: 'export'` — no longer applies, and Pages would have kept the existing verified workflow at zero cost. Rejected because the owner has `adibahsan.dev` and a user-site domain cannot be pointed at it; the custom domain is worth more than the saved setup.

## Consequences

- ADR-0001 is superseded on which app is served, not on where. Vercel stands; the Next Portfolio does not.
- The GitHub Pages workflow stops publishing `portfolio-react/build` and starts publishing a redirect stub, so the Live Portfolio survives in git rather than on the web. `Production Role` and `Content Parity` are both restated in `CONTEXT.md` to match.
- Reskin is no longer a content swap. The design is a freelance 3D artist's shopfront — a five-item service menu, a `Price` nav link, three-image galleries, a 234-character About — and reshaping that for an engineer is part of the effort, which is why `CONTEXT.md`'s definition of Reskin was widened.
- The 3D Portfolio's remote imagery goes away with it: the project cards take hand-authored inline SVG diagrams rather than photographs, so the site ends up serving no third-party images at all. This retires the remote-host risk `.scratch/portfolio-3d/spec.md` recorded, which had already produced one 404.

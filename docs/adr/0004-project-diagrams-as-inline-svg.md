# Project cards carry hand-authored SVG diagrams, not screenshots

The 3D Portfolio's project cards each hold a three-image gallery, which the supplied design fills with an artist's renders. Reskin fills those slots with architecture diagrams, hand-authored as inline SVG components using the app's own tokens, rather than with screenshots or exported image files.

The three featured projects are a production RAG service, a pair of agent orchestrations, and an observe-only DevOps agent. None of them has a visual surface: there are no screenshots in any of the repositories, and screenshotting a FastAPI docs page would say nothing to the audience the site is aimed at. A diagram is what those systems actually look like.

## Considered options

- **Screenshots.** Rejected: they do not exist, and the two projects with live URLs are not among the three featured.
- **Generated imagery.** Rejected: generated diagrams get technical detail subtly wrong — invented components, arrows pointing the wrong way — and this is the one audience that reads a pipeline diagram closely. A wrong arrow undermines the exact claim the site is making.
- **Mermaid rendered at build time.** Text source in the repo is genuinely more maintainable, but its default aesthetic does not belong to this design and theming it means fighting its layout engine for composition.
- **Excalidraw or Figma exports.** Best-looking for the least drawing, but binary and undiffable, every edit leaves the repo, and it keeps `<img>` and its cropping problem.

## Consequences

- The card's `<img>` elements become components, so `object-cover` and its cropping stop applying. `identity.ts` holds content; the mapping from project to diagram lives in the section, the way ornament placement already lives in `AboutSection` rather than in the identity module.
- Diagrams theme with `ground` and `foreground` and stay crisp at any card scale, including mid-stack where cards render at 0.94.
- Nine diagrams is the single largest cost in Reskin, and it is drawing work, not coding work.
- **Do not "fix" this by adding screenshots.** A portfolio whose project cards contain no photographs looks like an omission and is not one.

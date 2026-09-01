# Portfolio

Personal developer portfolio site for Adib Ahsan Chowdhury, served at adibahsan.github.io until
Cutover moves it to adibahsan.dev.

## Language

### Apps

**Live Portfolio**:
The site currently served in production from GitHub Pages — Create React App under `portfolio-react/`.
_Avoid_: old portfolio, CRA site (as a product name), root CRA

**Next Portfolio**:
The Next.js App Router port of the Live Portfolio under `portfolio-next/`. Archived: it reached Content Parity as a Cutover candidate, then Cutover went to the 3D Portfolio instead (ADR-0003). Kept in the repo, no longer maintained.
_Avoid_: portfolio-next (as a product name when speaking in domain terms), Next rewrite, the Cutover candidate

**3D Portfolio**:
The Redesign candidate under `portfolio-3d/`, built from a supplied "3D Creator" landing-page design on Vite + Tailwind. "3D" describes the rendered imagery and the design's subject, not the technology — the app contains no WebGL.
_Avoid_: Jack site, the 3D one, portfolio-3d (as a product name when speaking in domain terms)

### Repo shape

**App Layout**:
Each app lives in its own subdirectory — `portfolio-react/`, `portfolio-next/`, `portfolio-3d/` — installed and built independently with its own lockfile, and no app sits at the repository root.
_Avoid_: monorepo (unless discussing tooling), Repo Root promotion

**Production Role**:
What an app currently serves. The Live Portfolio holds it until Cutover hands it to the 3D Portfolio; after that `portfolio-react/` is replaced at its old address by a redirect and survives only as a git archive, and the Next Portfolio never holds one.
_Avoid_: deployed (as a role), active app, fallback archive (portfolio-react stops being served, not just demoted)

### Succession

**Cutover**:
Replacing the Live Portfolio in production with a chosen successor as the sole served site. The successor is the 3D Portfolio, on Vercel at adibahsan.dev, once Reskin clears Cutover Readiness (ADR-0003); adibahsan.github.io then serves a redirect to it.
_Avoid_: migration (unless discussing code move mechanics)

**Cutover Readiness**:
The bar any app must clear to be served: it carries real content with no Placeholder Identity left, every link resolves, the contact route works, and it deploys cleanly to the production domain. Each candidate reaches it by its own route — Content Parity was the Next Portfolio's, Reskin is the 3D Portfolio's.
_Avoid_: done, ready (unqualified), launch-ready

**Content Parity**:
Historical. The Next Portfolio's route to Cutover Readiness: presenting the same sections, copy, projects, skills, resume, and contact behavior as the Live Portfolio, with Redesign excluded. The Next Portfolio reached it and was then archived, so nothing is measured against this bar today.
_Avoid_: pixel-perfect, visual freeze, applying it to the 3D Portfolio (Redesign is the point there)

**Redesign**:
Changing what the site looks like and how its content is presented, as distinct from porting existing content to a new stack. Pursued in the 3D Portfolio; excluded from the Next Portfolio.
_Avoid_: refresh, restyle, facelift

### 3D Portfolio readiness

**Design Fidelity**:
The bar for the 3D Portfolio's first phase: the build matches the supplied design spec exactly, Placeholder Identity included. Judged against that spec, never against the Live Portfolio's content.
_Avoid_: pixel-perfect, Content Parity (that bar governs the Next Portfolio only)

**Placeholder Identity**:
The supplied design's stand-in persona — the "Jack" name, nav labels, About copy, service list, project entries, and stock imagery — carried deliberately through the Design Fidelity phase and removed by Reskin.
_Avoid_: dummy content, lorem, fake data

**Reskin**:
Taking the 3D Portfolio to Cutover Readiness: replacing the Placeholder Identity with Adib's real content, and reshaping the sections whose form assumes a freelance 3D artist rather than an engineer. Structural change is part of it, not a departure from it.
_Avoid_: rebrand, content swap, value swap (the shape changes too)

### Efforts

**Layout Land**:
Land the sibling App Layout on `master` (`portfolio-next/` + `portfolio-react/`) with Content Parity, without switching production hosting. Status: complete on this branch (sibling apps + Pages CI from `portfolio-react/`); production Cutover remains deferred.
_Avoid_: Cutover (until hosting is decided and production is switched)

**Design Fidelity build**:
Build the 3D Portfolio from the supplied design, Placeholder Identity retained, with no Production Role. Status: complete on this branch; accepted at the ticket 07 review.
_Avoid_: the 3D effort (there are two)

**Reskin**:
Take the 3D Portfolio to Cutover Readiness and cut over to adibahsan.dev. Status: specced, not started.
_Avoid_: Reskin (as a bar — it is the route, Cutover Readiness is the bar)

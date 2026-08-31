# Portfolio

Personal developer portfolio site for Adib Ahsan Chowdhury, currently served at adibahsan.github.io.

## Language

### Apps

**Live Portfolio**:
The site currently served in production from GitHub Pages — Create React App under `portfolio-react/`.
_Avoid_: old portfolio, CRA site (as a product name), root CRA

**Next Portfolio**:
The Next.js App Router port of the Live Portfolio under `portfolio-next/`, at Content Parity for a later Cutover.
_Avoid_: portfolio-next (as a product name when speaking in domain terms), Next rewrite

**3D Portfolio**:
The Redesign candidate under `portfolio-3d/`, built from a supplied "3D Creator" landing-page design on Vite + Tailwind. "3D" describes the rendered imagery and the design's subject, not the technology — the app contains no WebGL.
_Avoid_: Jack site, the 3D one, portfolio-3d (as a product name when speaking in domain terms)

### Repo shape

**App Layout**:
Each app lives in its own subdirectory — `portfolio-react/`, `portfolio-next/`, `portfolio-3d/` — installed and built independently with its own lockfile, and no app sits at the repository root.
_Avoid_: monorepo (unless discussing tooling), Repo Root promotion

**Production Role**:
What an app currently serves. Only the Live Portfolio has one; the Next Portfolio and 3D Portfolio have none until a Cutover grants it, and `portfolio-react/` keeps a fallback-archive role after Cutover.
_Avoid_: deployed (as a role), active app

### Succession

**Cutover**:
Replacing the Live Portfolio in production with a chosen successor as the sole served site (planned on Vercel per ADR-0001). The Next Portfolio is today's only candidate; the 3D Portfolio becomes one only after Reskin.
_Avoid_: migration (unless discussing code move mechanics)

**Content Parity**:
The bar that makes the Next Portfolio Cutover-ready: it presents the same sections, copy, projects, skills, links, resume, and contact behavior as the Live Portfolio. Next-only plumbing and animation upgrades already landed are allowed; Redesign is not — that work belongs to the 3D Portfolio.
_Avoid_: pixel-perfect, visual freeze

**Redesign**:
Changing what the site looks like and how its content is presented, as distinct from porting existing content to a new stack. Pursued in the 3D Portfolio; excluded from the Next Portfolio.
_Avoid_: refresh, restyle, facelift

### 3D Portfolio readiness

**Design Fidelity**:
The bar for the 3D Portfolio's first phase: the build matches the supplied design spec exactly, Placeholder Identity included. Judged against that spec, never against the Live Portfolio's content.
_Avoid_: pixel-perfect, Content Parity (that bar governs the Next Portfolio only)

**Placeholder Identity**:
The supplied design's stand-in persona — the "Jack" name, nav labels, About copy, service list, project entries, and stock imagery — carried deliberately through the Design Fidelity phase.
_Avoid_: dummy content, lorem, fake data

**Reskin**:
Replacing the 3D Portfolio's Placeholder Identity with Adib's real content. Only after Reskin can the 3D Portfolio be considered as a Cutover candidate.
_Avoid_: rebrand, content swap

### Efforts

**Layout Land**:
Land the sibling App Layout on `master` (`portfolio-next/` + `portfolio-react/`) with Content Parity, without switching production hosting. Status: complete on this branch (sibling apps + Pages CI from `portfolio-react/`); production Cutover remains deferred.
_Avoid_: Cutover (until hosting is decided and production is switched)

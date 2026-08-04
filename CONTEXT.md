# Portfolio

Personal developer portfolio site for Adib Ahsan Chowdhury, currently served at adibahsan.github.io.

## Language

**Live Portfolio**:
The site currently served in production from GitHub Pages — Create React App under `portfolio-react/`.
_Avoid_: old portfolio, CRA site (as a product name), root CRA

**Next Portfolio**:
The Next.js App Router port of the Live Portfolio under `portfolio-next/`, at Content Parity for a later Cutover.
_Avoid_: portfolio-next (as a product name when speaking in domain terms), Next rewrite

**Cutover**:
Replacing the Live Portfolio in production with the Next Portfolio as the sole served site (planned on Vercel per ADR-0001).
_Avoid_: migration (unless discussing code move mechanics), redesign

**Content Parity**:
The Next Portfolio is Cutover-ready when it presents the same sections, copy, projects, skills, links, resume, and contact behavior as the Live Portfolio. Next-only plumbing and animation upgrades already landed are allowed; redesign is not.
_Avoid_: pixel-perfect, visual freeze

**Layout Land**:
Land the sibling App Layout on `master` (`portfolio-next/` + `portfolio-react/`) with Content Parity, without switching production hosting. Status: complete on this branch once CI deploys from `portfolio-react/` and both apps build.
_Avoid_: Cutover (until hosting is decided and production is switched)

**App Layout**:
The repo keeps the Live Portfolio and the Next Portfolio in **separated subdirectories** — `portfolio-react/` (CRA) and `portfolio-next/` (Next.js) — not a single app at the repository root. After Cutover, production serves the Next Portfolio from Vercel; `portfolio-react/` remains as a fallback archive until a later cleanup. GitHub Pages continues serving the CRA Live Portfolio until that Vercel Cutover.
_Avoid_: monorepo (unless discussing tooling), Repo Root promotion

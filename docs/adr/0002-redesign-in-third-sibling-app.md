# Redesign explored in a third sibling app, not inside the Next Portfolio

The 3D Portfolio (`portfolio-3d/`) explores a Redesign as a third sibling app on Vite + Tailwind, rather than as a branch or a route inside `portfolio-next/`. Building it there would put Redesign work inside the app whose Cutover acceptance bar is Content Parity, coupling a speculative visual direction to the hosting switch; a separate app lets the Redesign be abandoned without disturbing parity work, and keeps Cutover a hosting change per ADR-0001.

## Considered Options

- **A route or branch inside the Next Portfolio** — rejected: contaminates Content Parity, which is the acceptance bar for Cutover, and makes the hosting switch wait on a design decision.
- **A separate repository** — rejected: the Redesign is intended to carry Adib's real content after Reskin, so it belongs in the portfolio repo's succession rather than outside it.
- **A third sibling app** — chosen.

The supplied design is specified entirely in Tailwind utilities, so it ships with Tailwind rather than the styled-components used by both existing apps. Translating it would add risk during the Design Fidelity phase for no benefit.

## Consequences

- The repo runs three independent pnpm apps with three lockfiles and no workspace. `App Layout` now describes shape only; `Production Role` carries which app serves what.
- Three styling systems coexist: styled-components in the Live and Next Portfolios, Tailwind in the 3D Portfolio.
- The 3D Portfolio has no Production Role and is not a Cutover candidate until Reskin replaces its Placeholder Identity.
- Adopting the Redesign later requires a decision that supersedes Content Parity's exclusion of it. That does not happen implicitly by building this app.
- GitHub Pages CI is unaffected: `.github/workflows/master.yml` scopes `working-directory`, its cache key, and `folder:` to `portfolio-react/`.

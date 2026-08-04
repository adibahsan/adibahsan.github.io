# Portfolio

Personal developer portfolio for [adibahsan.github.io](https://adibahsan.github.io/). Forked from [João Túlio's portfolio-react](https://github.com/joaotuliojt/portfolio-react).

## App Layout

This repository uses a sibling **App Layout** (see `CONTEXT.md`):

| Directory | App | Role today |
| --- | --- | --- |
| `portfolio-react/` | Create React App **Live Portfolio** | Served by GitHub Pages (`gh-pages`) |
| `portfolio-next/` | Next.js **Next Portfolio** | Content Parity ready; Vercel **Cutover** is deferred (ADR-0001) |

There is no runnable CRA app at the repository root.

**Layout Land** (sibling apps on the default branch, Pages still on CRA) is the current deliverable. Production Cutover to Vercel is intentionally later — do not assume this repo root is the Live Portfolio.

## Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)

### Live Portfolio (CRA)

```sh
cd portfolio-react
pnpm install
pnpm start
```

Production build:

```sh
cd portfolio-react
pnpm run build
```

### Next Portfolio

```sh
cd portfolio-next
pnpm install
pnpm dev
```

Production build:

```sh
cd portfolio-next
pnpm run build
```

## Deployment

GitHub Actions (`.github/workflows/master.yml`) installs and builds **`portfolio-react/`** on pushes to `master`, then publishes `portfolio-react/build` to the `gh-pages` branch for GitHub Pages.

Vercel project setup and DNS Cutover are out of scope until Cutover work begins (see `docs/adr/0001-next-portfolio-on-vercel.md`).

## Built With

- **Live Portfolio:** React, TypeScript, Styled Components
- **Next Portfolio:** Next.js App Router, React, TypeScript, Styled Components, Framer Motion

## Contributing

Fork the project, create a feature branch, commit, push, and open a pull request.

## License

MIT — see LICENSE for details.

## Live URL

https://adibahsan.github.io/

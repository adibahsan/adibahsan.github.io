# Next Portfolio

Next.js App Router port of the Live Portfolio. See the repository root `README.md` and `CONTEXT.md` for App Layout and Cutover notes.

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)

## Getting Started

```sh
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```sh
pnpm run build
pnpm start
```

## Deploy

Production Cutover to Vercel is deferred (ADR-0001). Until then, GitHub Pages continues to serve the CRA Live Portfolio from `portfolio-react/`.

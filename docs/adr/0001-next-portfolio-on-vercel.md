# Next Portfolio on Vercel; CRA stays on GitHub Pages until Cutover

After Layout Land, the repo holds sibling apps. Production Cutover will serve the Next Portfolio (`portfolio-next/`) from Vercel; until then GitHub Pages continues deploying the CRA Live Portfolio (`portfolio-react/`). Vercel was chosen over static-exporting Next to GitHub Pages so the Next app can use a normal Next hosting model without forcing `output: 'export'` constraints at Cutover time.

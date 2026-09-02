# 12: Cutover — DNS and the redirect

**What to build:** **Cutover** itself. `adibahsan.dev` starts serving the 3D Portfolio, and `adibahsan.github.io` stops serving the Live Portfolio and starts redirecting to the new address, so every link already printed on a CV or sitting in a LinkedIn profile keeps working and nothing stale stays public.

Assigning the domain and setting DNS are steps only the site owner can perform, so this ticket produces a **wizard** for them. It must not claim completion on his behalf.

This is the only ticket in the effort that touches anything outside the 3D Portfolio. The Live Portfolio's application code is not modified — only what the workflow publishes. It survives in the repository as an archive rather than on the web, per ADR-0003.

Do this last and deliberately. It is the one step in the effort that changes what the public sees.

**Blocked by:** 11 — Cutover Readiness review

**Status:** ready-for-agent

- [ ] A wizard walks the site owner through assigning `adibahsan.dev` to the Vercel project and setting the DNS records
- [ ] The wizard does not mark itself complete on the owner's behalf
- [ ] `adibahsan.dev` serves the 3D Portfolio
- [ ] The GitHub Pages workflow publishes a redirect to `adibahsan.dev` carrying a canonical link, in place of the Live Portfolio build
- [ ] `adibahsan.github.io` reaches the new site rather than a stale page or a 404
- [ ] The Live Portfolio's application code is unmodified; only the workflow's publish target changes
- [ ] The Next Portfolio is unmodified
- [ ] `CONTEXT.md`'s Reskin effort entry is updated to complete, and the Live Portfolio and Production Role entries reflect what is now true

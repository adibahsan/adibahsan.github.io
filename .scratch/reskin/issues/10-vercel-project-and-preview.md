# 10: Vercel project and preview deploy

**What to build:** A reachable preview deployment of the 3D Portfolio on Vercel, so the review in ticket 11 judges the real artifact rather than a local dev server — and so the deployment path is de-risked well before any DNS is pointed at it.

Creating the project is a step only the site owner can perform, so this ticket produces a **wizard** that walks him through it rather than instructions that sit unread. The wizard must not claim completion on his behalf.

No production domain is assigned here and no DNS changes. `adibahsan.dev` waits for ticket 12, behind the review.

This ticket has no blockers — the app already builds — but it needs the site owner, so it cannot be drained unattended.

**Blocked by:** None (can start immediately, but requires the site owner)

**Status:** ready-for-agent

- [ ] A wizard walks the site owner through creating the Vercel project against the 3D Portfolio
- [ ] The wizard does not mark itself complete on the owner's behalf
- [ ] Build settings produce the app's static output, installed from its own lockfile per the App Layout
- [ ] A preview deployment of the current branch is reachable, and the page renders there
- [ ] No production domain is assigned and no DNS record is changed
- [ ] Nothing outside the 3D Portfolio is modified

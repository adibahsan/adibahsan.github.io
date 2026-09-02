# 02: Hero — name, portrait, supporting line

**What to build:** The hero introduces the site owner instead of the supplied design's fictional artist. The headline carries his name, the supporting line is site-authored, and the portrait slot is filled by his own photograph.

The portrait keeps everything the design gives it — its widths across tiers, its bottom-flush placement from `sm` up, its entrance delay and its magnetic hover. It is the existing headshot with the flat background removed and the result vendored into the app. A stylised image is expected to replace it later, and that must stay a single value change.

The call to action gets a `mailto:` destination so it works today; ticket 09 repoints it at the contact section once that exists.

**Blocked by:** 01 — Content contract and working nav

**Status:** ready-for-agent

- [ ] The headline carries the owner's name, and no trace of the placeholder name remains in hero content
- [ ] The supporting line is site-authored copy, not the supplied design's
- [ ] The portrait is the owner's headshot with its background removed, vendored into the app, fetched from no third party
- [ ] The portrait keeps its per-tier widths, its bottom-flush placement from `sm`, its entrance delay and its magnetic hover
- [ ] Replacing the portrait is a single value change in the identity module
- [ ] The call to action has a working destination
- [ ] The contract test asserts no Placeholder Identity remains in hero content
- [ ] No horizontal scroll at any of the three tiers
- [ ] Build and every test pass

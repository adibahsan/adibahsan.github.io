# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |
| —                          | `done`               | Implemented, reviewed, and committed     |

`done` is a local addition, not one of Matt's five roles. The canonical vocabulary describes
work *waiting* to be picked up, so it has no terminal state — which leaves a finished ticket
sitting at whatever status it was authored with. Anything that computes a **frontier** (the
tickets ready to work now) needs to tell finished from unstarted, so we add the terminal value
here. See `issue-tracker.md` for how a ticket reaches it.

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

For the local-markdown tracker, record triage state as a `Status:` line near the top of each issue file using the right-hand column values.

Edit the right-hand column to match whatever vocabulary you actually use.

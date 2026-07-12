# Goal Setting

**Set business goals that survive contact with reality, then actually operate against them — not a vision board you abandon by February.** A six-stage Setup Arc takes you from *what game am I playing* to goals stress-tested before launch; a five-cadence Ongoing Arc, from a 60-second daily writing ritual to an annual vision check, keeps them alive. A hard cap of three active goals and a critic that red-teams every goal before you commit keep it honest.

Part of the [Kenzie Creative marketplace](https://github.com/kenziecreative/kenzie-creative).

## Install

```
/plugin marketplace add kenziecreative/kenzie-creative
/plugin install goal-setting@kenzie-creative
```

## Setup

Run `/goal-setting:init` in the project where you want to keep your goals. It scaffolds a
`goals/` directory (state, vision, active goals, scorecard, journal) and installs a
`CLAUDE.md` config into the project root. One project = one set of active goals — a business
deployment and your personal goals are two projects, not one.

The only field worth filling before you start is your **Direction** — one rough sentence on
what you actually want. `/goal-setting:orient` sharpens it.

## Use

The methodology has two arcs.

**Setup Arc** — run once, then again each year. Six stages, in order, each its own command:

| Stage | Command | What it produces |
|-------|---------|------------------|
| 1. Orient | `/goal-setting:orient` | A one-sentence Direction that passes the three tests |
| 2. Horizons | `/goal-setting:horizons` | Three named time horizons + a Horizon 3 vision |
| 3. Anchors | `/goal-setting:anchors` | A scored Anchor Areas scorecard + 1–3 active anchors |
| 4. Goals | `/goal-setting:goals` | One Objective per active anchor + 2–4 Key Results each |
| 5. Systems | `/goal-setting:systems` | One weekly system per Objective, each with a trigger |
| 6. Pre-mortem | `/goal-setting:premortem` | Revised KRs + named "if X, then Y" mitigations |

**Ongoing Arc** — run continuously once Setup is done. Five cadences:

| Cadence | Command | Rhythm |
|---------|---------|--------|
| Daily | `/goal-setting:daily` | 60–90 sec — write the goal by hand, vary the location |
| Weekly | `/goal-setting:pulse` | 5 min, Mondays — executed? progressing? what changes? |
| Monthly | `/goal-setting:monthly` | 1 hr — is the goal wrong or the execution wrong? |
| Quarterly | `/goal-setting:quarterly` | half–full day — close out the quarter, re-score, audit systems, replan, recurring pre-mortem |
| Annual | `/goal-setting:annual` | 1 day — still the right game? loops back to Orient |

**Any time:**

- `/goal-setting:progress` — a read-only dashboard of where you stand.
- `/goal-setting:pressure-test` — dispatch the critic to stress-test your current goals.
- `/goal-setting:restart` — the Restart Protocol for when you fall off. You will. It's data, not a verdict.

## What it does

It runs a specific, opinionated method: Objectives and Key Results, the Three Time Horizons,
the Four Laws of Behavior Change, and the pre-mortem — sequenced in a fixed order with a few
non-negotiable constraints, the hardest of which is **never more than three active goals at
once.** The plugin enforces that rule and won't let you quietly add a fourth.

It is a rigorous chief-of-staff, not a motivational coach. It will push on a vague Objective
or a system that's really just a hope. It stays out of decisions that are yours — which anchor
to prioritize, what target to set — and it never invents facts about your business. The
critic red-teams whether your goals are well-*formed*, not whether they're the *right* goals;
that call is always yours — and it remembers its own findings, so an objection you haven't
addressed stays visible instead of expiring with the session. It runs by default at the two
commitment moments — when Setup closes and at every quarterly replan — before your goals go
live; declining the run is your right, and the decline is recorded.

It also keeps the operating record honest over the months: a revised target preserves the
original commitment, a quarter closes with a disposition per goal before the next one plans,
a fired mitigation trigger surfaces at your next session rather than at quarter end, and a
long lapse routes you into the Restart Protocol instead of silence.

For the full method, read [`reference/playbook.md`](reference/playbook.md) once you've
installed; [`reference/three-tyrants.md`](reference/three-tyrants.md) is the *why* underneath
the rules.

# Goal Setting — Project Configuration

This file configures one Goal Setting deployment. The skills read it at the start of a run.
Everything here ships with a working default — you can run the whole methodology having filled
in only the few fields marked FILL.

One project = one set of active goals. Personal goal-setting and a business deployment are two
projects, not one.

> This template is installed by `/goal-setting:init`. You can also copy it by hand and edit
> directly.

---

## The Direction ← what you want, in one sentence

A one-line statement of what you actually want over your strategic horizon. Fine to leave it
rough at the start — `/goal-setting:orient` sharpens it and writes the refined version back.

```yaml
direction: [FILL — e.g. "Build a sustainable business that doesn't depend on me being available 24/7"]
```

---

## Working Directory (defaults shown)

Where the methodology keeps its state.

```yaml
goals_dir: ./goals/
```

The state is split across files:

- `goals/STATE.md` — loop position, mode, cadence calendar
- `goals/vision.md` — Direction + HorizonSet
- `goals/active.md` — current Objectives + KRs + Systems + Mitigations
- `goals/scorecard.md` — Anchor Areas with score history
- `goals/journal.md` — daily/weekly/monthly/quarterly/annual entries

---

## How this plugin works — quick orientation

The methodology has two arcs.

**Setup Arc** (run once, then annually): six stages in order — `orient`, `horizons`, `anchors`,
`goals`, `systems`, `premortem`. Each is its own command.

**Ongoing Arc** (run continuously after Setup): five cadences — `daily`, `pulse` (weekly),
`monthly`, `quarterly`, `annual`. Each is its own command.

**Mode switching:**

- During Setup, work the stages in order. Don't skip ahead. The skill will refuse if you try to
  violate a constraint, and will note if you run a stage out of sequence.
- After Setup completes, the plugin shifts to Ongoing mode. Run the daily writing and weekly
  pulse as habit; monthly, quarterly, and annual at their cadences.
- If you fall off, run `/goal-setting:restart` — it has its own protocol.
- At any point, run `/goal-setting:progress` for a read-only dashboard or
  `/goal-setting:pressure-test` to stress-test your current setup.

**The rule that matters most:** never more than three active goals. The plugin enforces this;
don't fight it.

---

## Output style (optional)

If your house style forbids em dashes, set this and generated content will avoid them.

```yaml
no_em_dashes: false
```

---

## Companion references (read when curious)

- `reference/playbook.md` — the canonical methodology
- `reference/anchor-areas/` — full chapter per anchor area
- `reference/three-tyrants.md` — the philosophical foundation underneath the rules
- `reference/schemas.md` — the object model

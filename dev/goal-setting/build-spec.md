# goal-setting plugin — Claude Code build spec

**Purpose:** complete specification for building the `goal-setting` plugin in Claude Code. This is the executor's handoff document; the Cowork session was the spec-owner/reviewer phase. Everything needed to scaffold, build, validate, commit, and tag should be in this document.

**Source-of-truth artifacts already produced** (live in `dev/goal-setting/`):

- `playbook.md` — the canonical methodology (the actual playbook content)
- `anchor-areas.md` — companion: full chapter per anchor area
- `three-tyrants.md` — companion: philosophical foundation
- This document (`build-spec.md`) — Claude Code's build orders

---

## Locked decisions

These were settled with Kelsey in the spec session. Do not re-litigate; build to them.

1. **Plugin name:** `goal-setting`
2. **Setup stages:** ONE engine driving all six stage commands (mirrors strategist-stage pattern). The engine is parameterized by stage.
3. **Ongoing cadences:** TWO skills — one for high-frequency (daily + weekly pulse), one for periodic reviews (monthly + quarterly + annual). Users need to understand mode-switching; templates/CLAUDE.md must make this explicit.
4. **Critic subagent:** YES. `goal-setting-critic.md` is critical — it's the "keeps you from lying to yourself" wedge. It stress-tests goal formulations, not evidence.
5. **State format:** Markdown, mirroring strategist's STATE.md/brief.md pattern. Human-readable, parseable via consistent headers.
6. **Restart Protocol:** YES, included in v1 as a first-class command.

---

## v1 scope

**In:**
- Setup Arc: six stages (`orient`, `horizons`, `anchors`, `goals`, `systems`, `premortem`)
- Ongoing Arc: five cadences (`daily`, `pulse`, `monthly`, `quarterly`, `annual`)
- `restart` command (Restart Protocol)
- `progress` read-only dashboard command
- `init` to scaffold the user's `goals/` directory
- Critic subagent (`goal-setting-critic`) invoked via `/goal-setting:pressure-test`
- PreCompact staleness hook (Claude Code only — no-op on Cowork)
- `templates/CLAUDE.md` per-deployment config
- Reference docs: playbook, three-tyrants, schemas, anchor-areas/ (one file per area), stages/ (one file per Setup stage)

**Out (deferred to later versions):**
- Integrations with calendars, Slack, Jira, Notion
- Dashboards beyond text-based `progress` command
- Multi-user / team orchestration
- Custom MCP server (not needed for this architecture)
- Personal-goals variant (architectural fork; future project)

---

## Directory structure

```
goal-setting/
├── .claude-plugin/
│   └── plugin.json
├── AGENTS.md
├── CHANGELOG.md
├── README.md
├── commands/
│   └── goal-setting/
│       ├── init.md
│       ├── orient.md
│       ├── horizons.md
│       ├── anchors.md
│       ├── goals.md
│       ├── systems.md
│       ├── premortem.md
│       ├── daily.md
│       ├── pulse.md
│       ├── monthly.md
│       ├── quarterly.md
│       ├── annual.md
│       ├── restart.md
│       ├── pressure-test.md
│       └── progress.md
├── skills/
│   ├── goal-setting-init/SKILL.md
│   ├── goal-setting-setup-stage/SKILL.md
│   ├── goal-setting-pulse/SKILL.md           (daily + weekly)
│   ├── goal-setting-review/SKILL.md          (monthly + quarterly + annual, parameterized)
│   ├── goal-setting-restart/SKILL.md
│   ├── goal-setting-pressure-test/SKILL.md   (dispatches critic)
│   └── goal-setting-progress/SKILL.md
├── agents/
│   └── goal-setting-critic.md
├── reference/
│   ├── INDEX.md
│   ├── README.md
│   ├── playbook.md
│   ├── three-tyrants.md
│   ├── schemas.md
│   ├── anchor-areas/
│   │   ├── README.md
│   │   ├── 01-demand-generation.md
│   │   ├── 02-conversion.md
│   │   ├── 03-delivery.md
│   │   ├── 04-operations.md
│   │   ├── 05-nurturing.md
│   │   ├── 06-profit.md
│   │   └── 07-personal-leadership.md
│   └── stages/
│       ├── README.md
│       ├── 01-orient.md
│       ├── 02-horizons.md
│       ├── 03-anchors.md
│       ├── 04-goals.md
│       ├── 05-systems.md
│       └── 06-premortem.md
├── hooks/
│   ├── hooks.json
│   └── state-staleness-check.sh
└── templates/
    └── CLAUDE.md
```

---

## Build flow

**Step 1 — Scaffold.** Run `/new-plugin` with name `goal-setting`. This creates the conformant skeleton (plugin.json, AGENTS.md, CHANGELOG.md, README, starter command, starter skill) and registers the plugin in `.claude-plugin/marketplace.json`, the root README "Plugins at a glance" table, and the root AGENTS.md "Plugins (current versions)" list.

**Step 2 — Migrate reference docs.** Copy from `dev/goal-setting/` to `goal-setting/reference/`:

- `playbook.md` → `reference/playbook.md` (move; the plugin reference is now the canonical user-facing version)
- `three-tyrants.md` → `reference/three-tyrants.md`
- `anchor-areas.md` → split into 7 files under `reference/anchor-areas/` (one per area, plus a README that's the intro + body-systems metaphor + scorecard usage notes)

Then extract from playbook:
- `playbook.md` Appendix C → `reference/schemas.md` (data object reference)

Build new `reference/stages/` content — one file per Setup stage, distilled from the relevant playbook sections. Each stage file contains: purpose, frameworks used, diagnostics, deliverable, constraint enforcement notes, and links to relevant anchor-area chapters where appropriate.

Build `reference/INDEX.md` and `reference/README.md` per the strategist pattern.

**Step 3 — Build commands** (thin wrappers — see Command spec section).

**Step 4 — Build skills** (see Skill spec section).

**Step 5 — Build critic subagent** (see Critic spec section).

**Step 6 — Build templates/CLAUDE.md** (see Template spec section).

**Step 7 — Build hooks** — mirror strategist's PreCompact staleness check exactly. Update file paths to reference `goals/` instead of `strategy/`.

**Step 8 — Validate.** Run:
- `claude plugin validate ./goal-setting`
- `claude plugin validate .`
- `node dev/scripts/check-version-prefix.mjs`
- Optional: plugin-dev `skill-reviewer` and `plugin-validator` agents

**Step 9 — Commit, tag, push.**
- Tag: `goal-setting-v0.1.0`
- All four version prefix locations must agree (plugin.json description, marketplace.json description, root README table, root AGENTS.md list) — checker enforces this.

---

## File specifications

### `.claude-plugin/plugin.json`

- `name`: `goal-setting`
- `version`: `0.1.0`
- `description`: starts with `v0.1.0 — `. Suggested body: *"A canonical goal-setting methodology that runs inside Claude Code or Cowork — six Setup stages, five Ongoing cadences, a hard cap of three active goals, and a critic that won't let you lie to yourself."*
- Standard author/license/repository fields per the `/new-plugin` template.

### Commands (15 thin wrappers)

All command files follow the pattern: minimal frontmatter, one-line description, a couple of sentences telling Claude what skill to invoke. Mirror strategist's commands for tone.

| Command | Invokes skill | Notes |
|---------|---------------|-------|
| `init` | `goal-setting-init` | Scaffolds `goals/` directory and `CLAUDE.md` |
| `orient` | `goal-setting-setup-stage` with `stage=orient` | Stage 1 |
| `horizons` | `goal-setting-setup-stage` with `stage=horizons` | Stage 2 |
| `anchors` | `goal-setting-setup-stage` with `stage=anchors` | Stage 3 |
| `goals` | `goal-setting-setup-stage` with `stage=goals` | Stage 4 |
| `systems` | `goal-setting-setup-stage` with `stage=systems` | Stage 5 |
| `premortem` | `goal-setting-setup-stage` with `stage=premortem` | Stage 6 (launch variant) |
| `daily` | `goal-setting-pulse` with `cadence=daily` | Daily writing ritual |
| `pulse` | `goal-setting-pulse` with `cadence=weekly` | Weekly pulse check |
| `monthly` | `goal-setting-review` with `cadence=monthly` | Monthly KR review |
| `quarterly` | `goal-setting-review` with `cadence=quarterly` | Quarterly review + recurring pre-mortem |
| `annual` | `goal-setting-review` with `cadence=annual` | Annual vision check (loops back to orient) |
| `restart` | `goal-setting-restart` | Restart Protocol |
| `pressure-test` | `goal-setting-pressure-test` | Dispatches the critic subagent |
| `progress` | `goal-setting-progress` | Read-only dashboard |

### Skills

#### `goal-setting-init/SKILL.md`

- Scaffolds the user's deployment: creates `goals/STATE.md`, `goals/vision.md`, `goals/active.md`, `goals/scorecard.md`, `goals/journal.md`.
- Copies `templates/CLAUDE.md` to the project root.
- Uses Write tool only (no shell — Cowork-safe).
- On Claude Code: also pre-allows the goals/ directory in `.claude/settings.json` if appropriate (mirror strategist-init).
- Sets the initial mode: clean install lands in Setup Arc, with a clear next step — *"run `/goal-setting:orient` to begin Stage 1"*.

#### `goal-setting-setup-stage/SKILL.md` — THE ENGINE

This is the most important skill. It drives all six Setup stage commands and embeds the methodology's constraint enforcement. Mirror `strategist-stage/SKILL.md` structurally.

**Stage table:**

| Stage | Reference dir | Job | Deliverable |
|-------|---------------|-----|-------------|
| orient | `reference/stages/01-orient.md` | Establish direction; pass three tests; calibrate difficulty | One-sentence Direction |
| horizons | `reference/stages/02-horizons.md` | Set time frames; calibrate to industry; capture vision | HorizonSet + Horizon 3 vision |
| anchors | `reference/stages/03-anchors.md` | Score and select | Scored scorecard + 1-3 active anchors |
| goals | `reference/stages/04-goals.md` | Construct Objectives + KRs | One Objective per active anchor + 2-4 KRs each |
| systems | `reference/stages/05-systems.md` | Design weekly systems against Four Laws | One System per Objective |
| premortem | `reference/stages/06-premortem.md` | Stress-test before launch | Revised KRs if needed + named mitigation triggers |

**Posture rules (embed in the skill, behavioral not aspirational):**

You are a rigorous chief-of-staff, not a motivational coach. Two disciplines pulling opposite directions:

- **The friction half** — push on vague answers. If an Objective is "grow the business," challenge it. Use the diagnostic tests in Stage 1 as the bar; reference them by name when pushing back.
- **The lane half** — stay strictly inside the user's domain. Don't invent business facts. If the user says they have 15 employees, that's what they have. Don't second-guess decisions that are theirs to make (which anchor area to prioritize, what KR target to set).

**Constraint enforcement (hard rules):**

- **At Stage 3 (anchors):** if user tries to mark a fourth anchor area as active, refuse. Require them to deactivate one first.
- **At Stage 4 (goals):** if user tries to create a fourth active Objective, refuse. Same pattern.
- **At Stage 4:** every Objective must have an `anchor_area_id` linking it to an active AnchorArea. Reject orphaned Objectives.
- **At Stage 5:** every System must have a trigger (`time`, `location`, or `habit-stack`). Reject systems without triggers as "hopes, not systems."
- **At Stage 6:** every Mitigation must have an `if X` trigger condition AND a `then Y` action. Reject incomplete mitigations.

**State writes:** the skill writes to `goals/vision.md`, `goals/scorecard.md`, `goals/active.md` depending on stage. Always updates `goals/STATE.md` with current stage, active period, last-modified.

**Handoff between stages:** at end of each stage, name the next stage explicitly: *"Stage 2 (Horizons) is next — run `/goal-setting:horizons` when ready."*

**Reload-from-state:** if user re-enters a stage they've already done, read existing state and offer to revise rather than rebuild from scratch.

#### `goal-setting-pulse/SKILL.md` — daily + weekly

Parameterized by `cadence` (daily or weekly).

**Daily mode:**
- Asks user where they are (different room/location than yesterday — Huberman protocol).
- Prompts them to write the goal by hand and confirm done.
- Appends entry to `goals/journal.md` under a daily section.
- Takes ~60-90 seconds. Skill must be terse.

**Weekly mode (Mondays):**
- The single question: *"Last week, did you execute your systems? If yes, are you seeing progress in your Key Results? If no, what needs to change?"*
- Records boolean responses and free-text "what needs to change" in `goals/journal.md` under weekly section.
- Surfaces classification logic: executed + not progressing → goal may be wrong, didn't execute → system may be wrong.
- Five minutes max.

#### `goal-setting-review/SKILL.md` — monthly + quarterly + annual

Parameterized by `cadence`.

**Monthly mode:**
- Per active Objective, assess: on track / off track.
- Classify why: goal wrong, execution wrong, or both.
- Record specific change being made (if any).
- Writes to `goals/journal.md` under monthly section.

**Quarterly mode:**
- Re-run the Anchor Areas Scorecard. Update `goals/scorecard.md` with new snapshot.
- Audit each system: keep / revise / retire. Update `goals/active.md`.
- Plan next quarter's Objectives + KRs (re-invokes constraint enforcement from setup-stage).
- Run the **recurring pre-mortem** — different from launch pre-mortem because user now has real data. Pull from `reference/stages/06-premortem.md` for protocol. Produce updated mitigation list.
- Writes journal entry capturing all of this.
- Half day to full day operation.

**Annual mode:**
- Reopens Stage 1 questions: *"Is this still the right game? Is the Horizon 3 vision still true?"*
- If vision continues: confirm and note.
- If vision changed: capture new Horizon 3 vision, then explicitly hand off — *"vision changed; re-run `/goal-setting:horizons` and downstream stages."*
- Writes annual entry to `goals/journal.md`.

#### `goal-setting-restart/SKILL.md` — Restart Protocol

Per the Restart Protocol in playbook Appendix B. Five steps:

1. Skip the guilt — acknowledge, move on.
2. Re-score Anchor Areas — invoke the scoring portion of `setup-stage` with `stage=anchors` in a re-score mode.
3. Pick ONE system to restart with — not all of them. Skill must enforce this (refuse to keep multiple active systems live).
4. Resume daily writing — set a marker for tomorrow.
5. Skip the next quarterly if close — set a flag in STATE.md to defer.

Writes a restart entry to `goals/journal.md`.

#### `goal-setting-pressure-test/SKILL.md`

Thin skill that dispatches `goal-setting-critic` subagent. Reads relevant state (Objectives, KRs, Systems, Mitigations) and passes to critic with the user's specific question or "general review" as scope.

#### `goal-setting-progress/SKILL.md`

Read-only. Reads `goals/STATE.md`, `goals/scorecard.md`, `goals/active.md`, last entries from `goals/journal.md`. Produces a text dashboard:

- Current period (e.g., "Q3 2026")
- Loop position (Setup stage X or Ongoing cadence)
- Active Anchor Areas with current scores
- Active Objectives + KR status (on/off track)
- Active Systems (current versions)
- Outstanding mitigations
- Last cadence run dates (daily, weekly, monthly, quarterly, annual)
- Recommended next action

Does NOT write to state.

### Critic subagent: `agents/goal-setting-critic.md`

Mirror `strategist-critic.md` structurally. Posture: a rigorous chief-of-staff red-teaming goal formulations. Tests logic and methodology fidelity, not evidence.

**What it checks:**

1. **Objective vagueness.** Is this a wish dressed up as a goal? Does it pass the 30-second test? The should-want vs. actually-matters test? Flag: `[VAGUENESS] — Objective "[X]" fails the 30-second test. It's a direction, not a destination.`

2. **KR measurability.** Are the Key Results actually quantifiable? Do they have baselines and targets? Do they actually measure the Objective, or just adjacent activity? Flag: `[KR DRIFT] — KR "[X]" measures activity, not outcome. It can hit and the Objective still fail.`

3. **System reality.** Does each System have a real trigger (time, location, or habit-stack)? Or is it a hope dressed up as a system? Flag: `[SYSTEM IS A HOPE] — System "[X]" has no trigger. It requires you to remember.`

4. **Mitigation completeness.** Does each Mitigation have an `if X` condition AND a `then Y` action? Flag: `[INCOMPLETE MITIGATION] — Mitigation "[X]" names a risk but no trigger condition. You won't know when to act.`

5. **Constraint violations.** More than three active anchors? More than three active Objectives? More than one System per anchor at initial setup? Flag immediately with reference to the constraint.

6. **Diagnostic test failures.** For each Objective, run the three Stage 1 tests. Surface failures specifically.

7. **Anchor-area mismatch.** Does this Objective actually serve the Anchor Area it's tagged to? An Objective tagged to Profit but built around customer outreach is mistagged. Flag: `[ANCHOR MISMATCH] — Objective "[X]" tagged to Profit but built around outreach activity. Either the Objective or the tagging is wrong.`

8. **Internal contradictions.** Does Horizon 3 vision support the current Quarter's Objectives? Or does Quarter Objective drift away from vision? Flag cross-stage contradictions specifically — the critic's highest-value finding.

**What is NOT a finding** (mirror strategist-critic restraint):

- A decision the user owns (which anchor to prioritize, what KR target to set, whether to take on a stretch goal).
- A generic critique of OKRs as a method.
- The standard reading of a domain (assuming Demand Generation needs work because pipeline is thin — that's a reasonable inference, not a "weak premise").
- A detail that isn't load-bearing. If the methodology holds without it, it's a minor note, not a finding.

**Output format:** mirror strategist-critic — `[TYPE] — issue in one line / Why it matters / What resolves it`. When the goal formulation holds, say so plainly and name what was tested.

**Tools:** Read, Grep, Glob. No web, no Write.

### `templates/CLAUDE.md` — per-deployment config

This is the file `/goal-setting:init` installs at the user's project root. It configures one deployment of the plugin.

Structure (mirror strategist's template tone):

```markdown
# Goal Setting — Project Configuration

This file configures one Goal Setting deployment. The skills read it at the start of a run. Everything here ships with a working default — you can run the whole methodology having filled in only the few fields marked FILL.

One project = one set of active goals. Personal goal-setting and a business deployment are two projects, not one.

> This template is installed by `/goal-setting:init`. You can also copy it by hand and edit directly.

---

## The Direction ← what you want, in one sentence

A one-line statement of what you actually want over your strategic horizon. Fine to leave rough at the start — `/goal-setting:orient` sharpens it and writes the refined version back.

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

- `goals/STATE.md` — loop position, cadence calendar
- `goals/vision.md` — Direction + HorizonSet
- `goals/active.md` — current Objectives + KRs + Systems + Mitigations
- `goals/scorecard.md` — Anchor Areas with score history
- `goals/journal.md` — daily/weekly/monthly/quarterly/annual entries

---

## How this plugin works — quick orientation

The methodology has two arcs:

**Setup Arc** (run once, then annually): six stages in order — `orient`, `horizons`, `anchors`, `goals`, `systems`, `premortem`. Each is its own command.

**Ongoing Arc** (run continuously after Setup): five cadences — `daily`, `pulse` (weekly), `monthly`, `quarterly`, `annual`. Each is its own command.

**Mode switching:**
- During Setup, work the stages in order. Don't skip ahead. The skill will refuse if you try.
- After Setup completes, the plugin shifts to Ongoing mode. Run the daily and weekly pulse as habit; monthly, quarterly, and annual at their cadences.
- If you fall off, run `/goal-setting:restart` — it has its own protocol.
- At any point, run `/goal-setting:progress` for a read-only dashboard or `/goal-setting:pressure-test` to stress-test your current setup.

**The rule that matters most:** never more than three active goals. The plugin enforces this; don't fight it.

---

## Companion references (read when curious)

- `reference/playbook.md` — the canonical methodology
- `reference/anchor-areas/` — full chapter per anchor area
- `reference/three-tyrants.md` — the philosophical foundation underneath the rules
- `reference/schemas.md` — the object model
```

### Hooks

Mirror strategist's `hooks/hooks.json` and `hooks/state-staleness-check.sh` exactly. Update path references from `strategy/` to `goals/`. Claude Code only — Cowork ignores hooks.

---

## State management — full schema

The user's deployment directory contains:

### `goals/STATE.md`

Tracks loop position, current period, last-run cadences. Sections:

```markdown
# Goal Setting State

## Current Period
- Quarter: Q3 2026
- Year: 2026

## Loop Position
- Setup status: complete | in-progress (stage: X)
- Last setup completed: 2026-06-15
- Mode: setup | ongoing | restart

## Cadence Calendar
- Daily last run: 2026-06-27
- Weekly pulse last run: 2026-06-24 (Mon)
- Monthly review last run: 2026-06-01
- Quarterly review last run: 2026-04-01
- Annual vision check last run: 2026-01-15
- Next due: monthly review (2026-07-01)

## Working Dynamic
(captured by skills as they observe how the user works)
- pushback_calibration: unknown | low | high

## Active Flags
- restart_quarterly_deferred: false
```

### `goals/vision.md`

Direction + HorizonSet per the schemas. Markdown with consistent headers.

### `goals/active.md`

Active Objectives, KRs, Systems, Mitigations. One section per Objective. Status badges as inline text.

### `goals/scorecard.md`

Current Anchor Area scores + history (table of scores by date).

### `goals/journal.md`

Append-only log of cadence entries. Reverse chronological. Each entry tagged by cadence type.

---

## Constraint enforcement summary

| Constraint | Enforced at | Behavior on violation |
|------------|-------------|----------------------|
| Max 3 active Anchor Areas | `setup-stage:anchors` and `review:quarterly` | Refuse to mark 4th as active; require deactivation first |
| Max 3 active Objectives | `setup-stage:goals` and `review:quarterly` | Refuse to create 4th; require archiving |
| One Objective per active Anchor Area | `setup-stage:goals` | Refuse second Objective in same anchor unless first is archived |
| Systems require triggers | `setup-stage:systems` | Refuse to register system without trigger type and detail |
| Mitigations require if/then | `setup-stage:premortem` and `review:quarterly` | Refuse to register mitigation without both condition and action |
| Restart: one system at a time | `restart` | Auto-pause other systems when restarting |

---

## Validation checklist (before commit/tag)

- [ ] `claude plugin validate ./goal-setting` passes
- [ ] `claude plugin validate .` (full marketplace) passes
- [ ] `node dev/scripts/check-version-prefix.mjs` passes (all four prefix locations agree)
- [ ] Plugin registered in `.claude-plugin/marketplace.json`
- [ ] Plugin appears in root README "Plugins at a glance" table
- [ ] Plugin appears in root AGENTS.md "Plugins (current versions)" list
- [ ] CHANGELOG.md opened at `0.1.0` with build notes
- [ ] `templates/CLAUDE.md` reviewed for clarity to first-time user
- [ ] `reference/` migration complete (playbook, three-tyrants, anchor-areas/, schemas, stages/)
- [ ] PreCompact hook works on Claude Code (smoke test)
- [ ] Optional: plugin-dev `skill-reviewer` on each of the 7 skills + 1 agent
- [ ] Optional: plugin-dev `plugin-validator` on the whole tree

---

## Commit, tag, push

```bash
git add goal-setting/ .claude-plugin/marketplace.json README.md AGENTS.md CHANGELOG.md
git commit -m "goal-setting v0.1.0 — initial release

Setup Arc (6 stages), Ongoing Arc (5 cadences), Restart Protocol,
critic subagent for goal stress-testing. Reference docs include
the canonical playbook, the seven anchor-area chapters, and the
Three Tyrants philosophical companion."
git tag goal-setting-v0.1.0
git push origin main
git push origin goal-setting-v0.1.0
```

---

## After the release

1. **Move `dev/goal-setting/` working files.** The reference docs now live in `goal-setting/reference/`. The `dev/goal-setting/` directory should retain only this `build-spec.md` (kept as a build artifact) plus any future PRDs. Working drafts of the playbook/companions should not be maintained in two places — `goal-setting/reference/` is canonical going forward.

2. **Update `dev/STATE.md`** with the plugin's shipped state and any next-steps queue (eval scenarios, v0.2 ideas).

3. **Eval harness target.** Add `goal-setting` as an `eval/` target. The user explicitly flagged that the eval system is how we'll simulate walkthroughs (e.g., "Maria's restaurant case," "Marcus's agency pipeline problem"). Set up at minimum one golden scenario per Setup stage and one per Ongoing cadence.

4. **Smoke test in Cowork.** Cowork is reviewer + Cowork surface owner. Install the published plugin in Cowork and confirm: `/goal-setting:init` creates state correctly, the setup-stage engine drives the first three stages cleanly, the critic invocation works, and the templates/CLAUDE.md reads clearly to a fresh user.

---

## Notes for the Claude Code executor

- **Mirror strategist where in doubt.** Strategist solves nearly all the same architectural problems (stage engine, critic subagent, hooks, templates, state in deployment, two-document pattern). When unsure about file structure, frontmatter, or tone, open the corresponding strategist file and follow its lead.
- **Don't invent posture for skills.** Use the posture rules in this spec directly. The "rigorous chief-of-staff, not motivational coach" framing is load-bearing for the product positioning; don't dilute it into encouragement.
- **The three-goal rule is non-negotiable.** Every skill that touches Objectives, Anchor Areas, or Systems must enforce it. This is the product's wedge; don't let it slip.
- **Setup-stage is the most complex skill.** Build the other skills first if it helps you build a feel for the patterns. Setup-stage is where the engine, the stage-specific logic, the constraint enforcement, and the posture rules all converge. Budget accordingly.
- **The critic is critical but small.** Mirror strategist-critic. Don't expand scope; the value is in restraint.
- **Cowork-safe scaffolding.** All init operations use Write tool, not shell, so the plugin works equally well when installed via Cowork.

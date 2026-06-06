# Intelligence Briefing

A daily/weekly intelligence routine that keeps you fully aware of the things you might care about — across both the outside world and your own work. It pairs an **external scan** (news, industry movement, research, policy, science) with **internal scans** (meetings, communications) and a **review step** that triages everything worth acting on into your backlog. Built for triage, not coverage: a quiet day produces a short brief, and that is correct.

This release ships the external scan and the shared spine the rest of the suite plugs into. The internal scans and review step are on the roadmap below; the contract they'll use is already defined and stable, so they bolt on without reworking what's here.

## What's installed today

| Component | Type | What it does |
|-----------|------|--------------|
| `environmental-briefing` | Skill | The external scan. Produces a triaged daily brief from the outside world, keyed to your relevance context. Fully built. |
| `/intel-setup` | Command | Sets up a project as a briefing deployment — interviews you for your relevance context, writes the config, runs a first test brief. |
| `/brief` | Command | Runs the brief on demand (the same thing a scheduled run does). |

Plus the shared spine in `shared/` — the contract and conventions every future component builds against (see Architecture).

## Quick start

1. Create a new Cowork **Project** and install this plugin.
2. In the project, run **`/intel-setup`** and answer the questions. The one that matters is your *relevance context* — who the brief serves and what makes something worth your attention. Everything else has a working default.
3. The setup runs one test brief so you see real output before scheduling.
4. To run it daily: type **`/schedule`**, set the prompt to `Run the environmental briefing skill for this project` (or `/brief`), and pick a time. A run skipped because your machine was asleep catches up automatically via the grace window.

One project = one brief. A personal scan and a brief you forward to your team are two projects.

## Architecture (the shared spine)

The suite is a pipeline: several **producers** emit candidate items in one common shape, and a single **consumer** (the review step) triages them into your backlog. Defining that shape once is what lets new producers join without anything downstream changing.

- **`shared/candidate-item-contract.md`** — the one schema every producer emits and the review step consumes. The spine of the whole thing.
- **`shared/dedup-and-state.md`** — the two-store model: each producer keeps a private ledger ("have I already reported this?") and all producers write to one shared candidate queue ("what's waiting to be reviewed?"). This is how comms triage will avoid re-raising what meeting triage already caught.
- **`shared/source-directory.md`** — a reserved convention letting *other* projects push items into a shared inbox for triage, so you get one unified view without funneling every project into this one.

The external scan already speaks this contract: when you turn on suite mode (a one-line setting in `CLAUDE.md`), it contributes its actionable findings to the shared queue. Left off, it just writes briefs.

## Roadmap

The pieces below are designed-for but not yet built. Each is a producer or consumer on the spine above.

- **Meeting triage** *(producer)* — pulls meeting transcripts, extracts explicit and implicit tasks and notable patterns, emits candidates. Uses `~~meeting source`.
- **Comms triage** *(producer)* — reviews email and chat for items worth surfacing, cross-checks the meeting candidates to avoid duplication, emits candidates. Uses `~~email` and `~~chat`.
- **Triage review** *(consumer)* — presents the assembled candidate queue for your accept/reject/defer, and writes accepted items to your backlog. Uses `~~project tracker`.
- **Source-directory triage** *(producer)* — reads the cross-project inbox (`shared/source-directory.md`) and triages drops from your other projects into the same queue.

## Customization (sharing it)

This plugin is tool-agnostic. It refers to external services by category (`~~meeting source`, `~~email`, `~~chat`, `~~project tracker`) rather than naming products, so anyone can install it and connect their own stack. See **`CONNECTORS.md`** for the category-to-product mapping. The external scan that ships today needs no connectors at all — it scans public sources and writes local files. The customizer skill maps the placeholders to specific tools when you or a recipient personalize it.

## Tuning after a few runs

- **Briefs feel thin or noisy?** Sharpen the relevance context and the zone in/out examples in `CLAUDE.md` — the "out" near-misses do the most work.
- **Low-confidence items reaching conclusions?** Tighten the evidence bar in `CLAUDE.md` toward `decision`, `shareable`, or `strict`.
- **Same stories recurring?** That's the ledger; if repeats slip through, the skill's novelty test defines what counts as a real advancement.
- **Want it to challenge you?** Fill in the held-beliefs section to enable the disconfirming slot.

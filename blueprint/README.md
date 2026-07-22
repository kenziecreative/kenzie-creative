# Blueprint

Turn how you actually work into a process document a person, workflow, or agent could execute — with every step rated for whether it's safe to automate.

Most process documentation explains "what we do." An automation-ready document has to capture more: what triggers the work, what data moves where, what decisions get made and by what criteria, what goes wrong and how you handle it, and where the cost of an unreviewed mistake is high enough that a human must stay in the loop. People can't write this from memory. They describe the idealized version and forget the micro-steps, the workarounds, and the judgment calls that make the process actually run.

Blueprint fixes that by interviewing you. It walks you through your most recent real run of the process, asks the questions that surface the tacit detail, and writes the result into a structured Process Blueprint.

Part of the [Kenzie Creative marketplace](https://github.com/kenziecreative/kenzie-creative).

## Install

```
/plugin marketplace add kenziecreative/kenzie-creative
/plugin install blueprint@kenzie-creative
```

## Setup

None required. Blueprints save to a `blueprints/` folder in whatever project you run the capture in. To relocate them, copy `templates/CLAUDE.md` into your project root and set `blueprints_dir`.

## Use

- `/blueprint:capture` — start a capture session. Blueprint asks which process you want to document and which mode you want.
- Or just describe a process you'd like to document and Blueprint will offer to run a capture.

**Two modes:**

- **Quick (~15 minutes).** A coarse-grained pass: trigger, main steps, outputs, and a first-cut autonomy rating per step. Good for building an inventory of your processes before deciding which ones deserve deep treatment.
- **Deep (~45-60 minutes).** The full field set: decision logic, exception paths, approval authority, evidence of completion, timing, risks, audit needs. Produces a document detailed enough to hand to an agent, a new team member, or an automation build.

A good first target for a deep capture: the process with the biggest annoyance tax — the recurring work that eats your time without needing your judgment.

## What it does

The interview anchors in your most recent real run of the process (not the idealized version), separates mechanical work from judgment work, captures why each step exists (not just what happens), and flags what it doesn't know instead of inventing detail.

Every step in the finished Blueprint carries an autonomy rating:

- **Automate** — repetitive, low-risk, reversible, easy to validate. Safe for an agent.
- **Monitor** — the agent can proceed, but a human watches through alerts, sampling, or periodic audit.
- **Human** — the step affects money, compliance, customer trust, or brand-sensitive judgment. A person decides, every time.

The question underneath all three ratings: *if this step were done wrong with no review, what would happen?*

Blueprint documents and rates; it does not build the automation. What it produces is the modeling layer — the thing you need before wiring any process to an agent.

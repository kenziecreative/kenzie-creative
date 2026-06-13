# Strategist — Project Configuration

This file configures one Strategist deployment. The skills read it at the start of a
run. Everything here ships with a working default — you can run the whole loop having
filled in nothing but the problem you're working on. Edit any field at any time; the
next command picks up the change. No need to re-run setup.

One project = one strategy. A pricing decision and a go-to-market plan are two
projects, not one.

> This template is installed by `/strategist:init`, which copies it into your project
> root and helps you fill the problem statement. You can also copy it by hand and edit
> it directly.

---

## The Problem  ← the one thing only you can supply

A one-line statement of the problem this strategy exists to solve. It's fine to leave
this rough at the start — `/strategist:define` is the stage that sharpens it, and it
will write the refined version back here.

```yaml
problem: [FILL — e.g. "Subscriber growth has reversed; how do we return to >1,000 net adds/month?"]
```

---

## Working Directory  (defaults shown)

Where the loop keeps its state and the evolving strategy document.

```yaml
strategy_dir: ./strategy/        # STATE.md, brief.md, and stage artifacts live here
```

`strategy/brief.md` is the artefact — it grows a section per stage as you work the
loop. `strategy/STATE.md` tracks where you are and what's next; the loop is resumable
across sessions.

---

## Depth  (default: adaptive)

How thoroughly each stage runs. `adaptive` lets each stage scale to the problem —
a reversible, low-stakes call moves fast; a consequential one gets the full treatment.
Set `full` to always run every stage in depth, or `light` for a quick pass.

```yaml
depth: adaptive          # adaptive | full | light
```

---

## Pressure-Test  (default: on at decision points)

Whether the loop offers `/strategist:pressure-test` automatically. `decision-points`
offers it after Analyse, Decide, and Act — the stages where flawed reasoning is most
costly. Set `always` to offer it after every stage, or `manual` to only run it when
you ask.

```yaml
pressure_test: decision-points   # decision-points | always | manual
```

---

## Output style  (optional)

If your house style forbids em dashes, set this and generated content will avoid them.

```yaml
no_em_dashes: false
```

---

## What Strategist does, in two lines

Strategist walks one problem through a seven-step loop — Define, Split, Analyse,
Insight, Story, Decide, Act — and at each step it puts the relevant frameworks from its
library in front of you, helps you pick and apply the right one, and writes the result
into a single living `brief.md`. A critic can pressure-test your reasoning at any point.

The brief is the artefact. Run `/strategist:init` to start, then work the stages in
order — iterate back whenever a later stage changes your mind about an earlier one.

# Source Directory (planned extension)

This documents a convention the suite reserves now so it can be built later without rework. It is not yet implemented — no producer reads it today — but the contract and directory layout are fixed here so that other projects can start writing to it whenever the consuming producer ships.

## The problem it solves

You don't want every project you work in funneled into one giant briefing project. That would force everything through a single context and defeat the point of keeping work separated by project. The inverse approach: let other projects **push** the things worth triaging into one shared inbox, and have the intelligence suite triage that inbox into your unified view. Projects stay separate; only the items that might matter flow into the one place that gives you complete visibility.

## The convention

A single directory, by default `./sources/` in the intelligence-briefing project, acts as a drop box. Any other project — or a person, or a scheduled task in a different project — can write a file into it. A future **source-directory triage** producer reads new files from it, emits candidate items per `candidate-item-contract.md`, and moves processed files aside.

```
sources/
├── inbox/        # other projects drop files here
├── processed/    # the triage moves files here after reading them
└── README.md     # tells a contributing project what to drop and how
```

### What a contributing project drops

A small Markdown or JSON file describing something it thinks you might care about — a decision made, a blocker hit, a milestone reached, a question raised. The lighter the better; the triage does the compression. A minimal drop:

```markdown
---
source_project: "client-acme-rebrand"
captured: 2026-06-06
kind: implicit-task
links: ["<optional permalink>"]
---
Design review surfaced that the new logo fails contrast checks on dark backgrounds.
Someone needs to decide whether to ship with a light-only variant or delay.
```

The triage maps each drop onto the candidate contract: `source` becomes `sources:<source_project>`, the body becomes the `summary`, frontmatter `kind`/`links` carry across, and the same dedup and evidence rules apply as for any other producer. Files that don't parse are left in `inbox/` and flagged, never silently dropped.

## Why reserve it now

Fixing the directory layout and the drop format today means a project you set up next month can begin writing to `sources/inbox/` immediately, and the triage producer can be added later without asking every contributing project to change how it writes. It is the same discipline as the candidate contract: pin the interface early so the pieces can be built in any order. Until the source-directory triage ships, treat this file as the spec that future work — and any project that wants to feed the system — builds against.

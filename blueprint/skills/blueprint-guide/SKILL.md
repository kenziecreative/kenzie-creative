---
name: blueprint-guide
description: This skill should be used when the user asks how Blueprint works, where to start, which mode to use, what the difference between discovery and capture is, or what they should document first (e.g. "how does blueprint work", "where do I start", "quick or deep?", "what should I capture first", "what can this do"), or runs /blueprint:guide. Explains the three jobs — discover, quick capture, deep capture — and routes the user to the right entry point based on whether they can already name a process.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# blueprint-guide — Orient the user and point them at the right first step

Someone has asked how Blueprint works or where to begin. Give them a short, plain orientation, then
route them to the right entry point. Keep it conversational — a couple of tight paragraphs and a
recommendation, not a manual. Don't dump this whole file at them; say what's useful for where they are.

## What Blueprint does, in one line

It turns how you actually work into a process document a person, a workflow, or an AI agent could
execute against — built by interviewing you, not by asking you to write it up.

## The three jobs (this is the thing to get across)

Blueprint does three distinct things. People conflate the first two; keep them separate.

1. **Discover** (`/blueprint:discover`) — a short sweep that surfaces the recurring work you might
   want to document, when you *can't yet name your processes*. It produces a thin **Process
   Inventory**: a list of candidate processes, each in your own words, plus a recommendation of which
   three to tackle first. Use this when the honest answer to "which process?" is "I'm not sure what
   I'd even call them."

2. **Quick capture** (`/blueprint:capture`, quick mode, ~15 min) — a coarse but grounded model of
   **one** process you can already name: its trigger, main steps, outputs, and a first-cut read on
   what's safe to automate. Good for taking stock of one process fast.

3. **Deep capture** (`/blueprint:capture`, deep mode, ~45-60 min) — the full model of **one** named
   process: decision criteria, exception paths, approval authority, evidence of completion, timing,
   and risk. Detailed enough to hand to an agent, a new hire, or an automation build.

The natural path is **Discover → pick one → Capture (quick or deep)**. Discovery finds the work;
capture understands it.

## Two things worth knowing

- **Every captured step gets rated Automate, Monitor, or Human** — so you know what's safe to hand to
  an agent and what needs a person, decided by one question: *if this step were done wrong with no
  review, what would happen?* (Discovery deliberately does **not** rate anything — there are no steps
  yet to judge.)
- **Blueprint never invents.** When you don't know an answer — where data comes from, who approves,
  what a threshold is — it records that as an open question rather than making something up. A flagged
  gap is worth more than a confident guess, because the whole point is a document you can trust enough
  to automate against.

## Route them

Ask one question if it isn't already clear: **can they already name a specific process they want to
document?**

- **No / "not sure where to start" / "I have lots of little things" →** recommend **discovery**. Offer
  to run `/blueprint:discover` now.
- **Yes, they can name one →** recommend **capture**. If they just want to take stock, quick mode; if
  they want it automation- or handoff-ready, deep mode. Offer to run `/blueprint:capture` now.
- **They already have a Process Inventory from a past discovery →** point them at it, and offer to run
  a capture on whichever candidate they choose; capture will pick up what the inventory already holds.

Then, if they say yes, hand off to the matching skill. Don't re-explain what that skill will do — just
start it.

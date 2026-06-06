---
description: Set up this project as a daily intelligence brief
allowed-tools: Read, Write, Edit, AskUserQuestion
---

Set up the current project as a daily environmental briefing deployment of the intelligence-briefing suite. The briefing logic lives in the `environmental-briefing` skill; this command produces the per-project configuration it reads.

Do the following, in order:

1. Confirm the `environmental-briefing` skill is available to this project. It carries the full briefing logic — do not reimplement it here.

2. Interview the user, but only on what genuinely needs their input. Use the question tool, one topic at a time:
   - **Relevance context** (the important part — spend time here): their role and what they're responsible for, what kinds of change would move a decision or a view for them, and what to ignore however interesting. Push for concreteness; a vague relevance context makes a vague brief. This is the one field with no defensible default.
   - **Zone in/out examples**: from the relevance context, draft in/out examples for each of the five fixed zones (Emerging Impact, Currents, SciTech Frontier, Policy Levers, Field Movements) and show them for confirmation or adjustment. Do not ask the user to invent zones — the set is fixed; the in/out examples are what tailor them.
   - **Evidence bar**: ask how far an unconfirmed, single-source item should be allowed to reach. Offer `situational` (early-warning, anything goes, marked), `decision` (informs but can't drive an action — the default), `shareable` (can guide them but stays out of what they forward), or a hybrid where the action gate and sharing gate are set independently. Default to `decision` if they don't care.

3. Everything else, set to defaults without asking: daily cadence (ask only their timezone), length budget (5 per zone, 3 lead, two-minute read), held beliefs empty, paths `./briefs/` and `./ledger.json`, suite mode off (candidate queue empty). Tell the user you've applied these and that any of them can be changed later by editing CLAUDE.md.

4. Read the config template at `${CLAUDE_PLUGIN_ROOT}/templates/CLAUDE.md`, fill in the [FILL] fields with the interview answers, leave defaults as-is where the user didn't override them, and write the result to `CLAUDE.md` in the project root.

5. Create the `briefs/` folder and create `ledger.json` containing exactly: `{"entries": []}`

6. Show the finished CLAUDE.md, then run the environmental briefing skill once as a test so the user sees a real brief before scheduling it.

7. Tell the user how to schedule recurring runs: type `/schedule` in the chat, set the prompt to "Run the environmental briefing skill for this project" or use `/brief`, match the frequency to their cadence, and pick a time. Mention that a skipped run (machine asleep) catches up automatically via the grace window.

If the user wants to enable the full suite later (contributing to a shared review queue), point them to the "Suite mode" section of CLAUDE.md and `${CLAUDE_PLUGIN_ROOT}/shared/candidate-item-contract.md`.

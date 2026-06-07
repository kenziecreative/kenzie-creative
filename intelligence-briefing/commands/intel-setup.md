---
description: Set up this project as a daily intelligence brief
allowed-tools: Read, Write, Edit, AskUserQuestion, WebSearch, WebFetch
---

Set up the current project as a daily environmental briefing deployment of the intelligence-briefing suite. The briefing logic lives in the `environmental-briefing` skill; this command produces the per-project configuration it reads.

Ask the specific questions below. Do not improvise your own framing or substitute your own questions — these are the questions setup is meant to ask. Ask one topic at a time and wait for each answer.

**Guardrails (important):**

- The relevance context must be the user's **own words**. Do NOT present a menu of role "personas" or job titles to pick from — the skill needs a concrete seat-and-decisions description, and offering generic titles is the exact opposite of that.
- Do NOT infer the user's role, employer, clients, industry, or interests from other projects, open files, memory, prior conversations, or anything else in the environment. Ask; never guess.
- Do NOT put real company or product names into your questions, your options, or the drafted config. If you need an illustrative example, use an obvious generic placeholder (e.g. "a client", "your main platform") — never a specific named organization.
- Do every file operation (creating CLAUDE.md, the ledger, the briefs folder, the settings file) with the `Read`/`Write`/`Edit` tools only. Never run shell commands (`ls`, `cat`, `mkdir`, `pwd`, etc.) to check for or create files — that triggers needless permission prompts. To create a folder, just write a file into its path; to check a file, `Read` it and handle the result.

**Set expectations on approvals first.** Before the steps below, tell the user in one line that setup will create a few files in this project and they may be asked to approve file creation — and that if their client offers an "allow for this project/session" option, choosing it once will cover all of setup's file writes instead of prompting on each. (In Claude Code this avoids repeated prompts; in Cowork there may be no prompt at all — either way the message is harmless.)

Steps, in order:

1. Confirm the `environmental-briefing` skill is available to this project. It carries the full briefing logic — do not reimplement it here.

2. Gather the **relevance context** by asking these three open, free-text questions, one at a time, in the user's own words (no multiple-choice personas):
   a. "What's your role, and what are you responsible for? Describe the specific seat and the kinds of decisions you make from it — not a job title."
   b. "What kinds of change out in the world would actually move a decision or a view for you? Be concrete enough that we could discard something that's merely interesting."
   c. "What should the brief ignore, even if it's interesting? Naming what's out of scope matters as much as naming what's in."

   If an answer is vague, ask one short follow-up to make it concrete — a vague relevance context produces a vague brief. Then play back a drafted relevance context assembled from the three answers and ask the user to confirm or correct it before continuing. Build it only from what the user said, not from outside assumptions.

3. Draft **zone in/out examples** for each of the five fixed zones (Emerging Impact, Currents, SciTech Frontier, Policy Levers, Field Movements), derived from the confirmed relevance context, and show them for confirmation or adjustment. Do not ask the user to invent zones — the set is fixed; the in/out examples are what tailor them. Derive these from the user's stated context only.

4. Ask the **evidence bar** as a single multiple-choice question — this one is a genuine discrete choice, so the question tool fits here. Offer:
   - `situational` — early-warning; unconfirmed single-source items can go anywhere, marked.
   - `decision` — unconfirmed items inform but can't drive an action. (default)
   - `shareable` — unconfirmed items can guide the user but stay out of what they forward.
   - `strict` — unconfirmed items only ever support "track" and "dig".
   Note they can also set the action gate and sharing gate independently for a hybrid. Default to `decision` if they don't care.

5. Ask the user's **timezone** directly. Set everything else to defaults without asking: daily cadence, length budget (5 per zone, 3 lead, two-minute read), held beliefs empty, paths `./briefs/` and `./ledger.json`, suite mode off (candidate queue empty). Tell the user you've applied these and that any of them can be changed later by editing CLAUDE.md.

6. Read the config template at `${CLAUDE_PLUGIN_ROOT}/templates/CLAUDE.md`, fill in the [FILL] fields with the confirmed answers, leave defaults as-is where the user didn't override them, and write the result to `CLAUDE.md` in the project root.

7. Create the `briefs/` folder and create `ledger.json` containing exactly: `{"entries": []}`

8. **Reduce permission prompts (Claude Code).** Write a `.claude/settings.json` in the project root that pre-allows exactly the tools the brief uses, so the user isn't prompted on every run. Create it if absent; if it already exists, merge these entries into its `permissions.allow` array rather than overwriting the file. Allow only this narrow set — do not add `Bash` or any broad permission:

   ```json
   {
     "permissions": {
       "allow": ["WebSearch", "WebFetch", "Read", "Write", "Edit"]
     }
   }
   ```

   Tell the user this file pre-approves only the brief's own tools for this project, that they may be asked to trust the folder once, and that they can edit or delete it anytime. (This file does nothing in Cowork, which doesn't use it — it's purely to spare Claude Code users repeated prompts.)

9. **Pre-flight check, then test run.** Before running the test brief, confirm a web-search tool is actually callable in this session (the brief can't scan without one). If `WebSearch` is available, proceed. If it is not, stop and tell the user plainly what to approve — e.g. "To run your first brief I need web search; please approve `WebSearch` when prompted (or add it to your allowlist)" — rather than launching the brief and letting it fail partway. Once web search is confirmed, show the finished CLAUDE.md and run the environmental briefing skill once as a test so the user sees a real brief before scheduling it.

10. Tell the user how to schedule recurring runs: type `/schedule`, set the prompt to "Run the environmental briefing skill for this project" (or use `/brief`), match the frequency to their cadence, and pick a time. Mention that a run skipped because the machine was asleep catches up automatically via the grace window.

If the user wants the full suite later (contributing to a shared review queue), point them to the "Suite mode" section of CLAUDE.md and `${CLAUDE_PLUGIN_ROOT}/shared/candidate-item-contract.md`.

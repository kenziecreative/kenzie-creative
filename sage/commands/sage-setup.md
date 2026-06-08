---
description: Set up this project as a Sage meeting round-up
allowed-tools: Read, Write, Edit, Glob, AskUserQuestion
---

Set up the current project as a Sage deployment. The meeting-triage logic lives in the `meeting-triage` skill; this command produces the per-project configuration it reads, materialises the working directories, and runs one test invocation.

Ask the specific questions below. Do not improvise your own framing or substitute your own questions — these are the questions setup is meant to ask. Ask one topic at a time and wait for each answer.

**Guardrails (important):**

- Do NOT infer the user's role, employer, clients, industry, or meeting cadence from other projects, open files, memory, prior conversations, or anything else in the environment. Ask; never guess.
- Do NOT put real company or product names into your questions, your options, or the drafted config. If you need an illustrative example, use an obvious generic placeholder (e.g. "your weekly exec sync") — never a specific named organization.
- Do every file operation (creating `CLAUDE.md`, `manifest.json`, the `source/` and `meetings/` folders, the settings file) with the `Read`/`Write`/`Edit`/`Glob` tools only. Never run shell commands (`ls`, `cat`, `mkdir`, `pwd`, etc.) to check for or create files — that triggers needless permission prompts. To create a folder, just write a file into its path; to check a file, `Read` it and handle the result.

**Set expectations on approvals first.** Before the steps below, tell the user in one line that setup will create a few files in this project and they may be asked to approve file creation — and that if their client offers an "allow for this project/session" option, choosing it once will cover all of setup's file writes instead of prompting on each. (In Claude Code this avoids repeated prompts; in Cowork there may be no prompt at all — either way the message is harmless.)

Steps, in order:

1. Confirm the `meeting-triage` skill is available to this project. It carries the full pipeline — do not reimplement it here.

2. **Ask the timezone.** Direct free-text question:

   > What's your timezone? Use an IANA name like `America/Los_Angeles`, `Europe/London`, or `Asia/Tokyo`. The skill needs this to compute the Monday-anchored week folder and to know when end-of-day re-bucketing should fire.

   Confirm the answer is a real IANA timezone before continuing. If the user gives something like "PT" or "Pacific" or "GMT-7", play back the IANA equivalent (`America/Los_Angeles`) and ask them to confirm.

3. **Ask the meeting-MCP branch.** Use the question tool — this is a genuine discrete choice:

   > Do you have a meeting transcription service you want Sage to auto-pull from?

   Offer these options:
   - **Read.ai** — auto-pulls from Read.ai via MCP.
   - **Fireflies** — auto-pulls from Fireflies via MCP.
   - **Granola** — auto-pulls from Granola via MCP (paid plans only).
   - **Other** — a meeting MCP that isn't one of the above; you'll need to name the tools yourself.
   - **None — I'll drop transcripts into `source/` myself** (default).

   Branch on the answer:

   - **Read.ai chosen.** Tell the user: "Read.ai's MCP is in beta — Sage will resolve tool names at runtime via `tools/list` rather than hardcoding them. Auth is currently username/password but OAuth is rolling out; you may need to reconnect the MCP after they migrate. Make sure the Read.ai MCP server is connected in this project before the first run." Set `meeting_mcp: read-ai` in the config you'll write at step 6.

   - **Fireflies chosen.** Tell the user: "Fireflies is the cleanest of the three to set up — stable tool surface, OAuth or bearer API key. Make sure the Fireflies MCP server is connected in this project before the first run." Set `meeting_mcp: fireflies`.

   - **Granola chosen.** Tell the user: "Two things to know about Granola: (1) **Transcript fetch is paid-plan only.** Sage will check your plan tier on the first run and, if you're on the free tier, surface a message and fall back to `source/` mode for that run. (2) Granola MCP only sees your private 'My notes' space — team-folder meetings aren't visible. If most of your meetings live in a team folder, you'll want to use `source/` drops for those, or move the meetings to 'My notes'." Set `meeting_mcp: granola`.

   - **Other chosen.** The user's custom MCP must expose two tools: (1) one that enumerates recent meetings with stable IDs and dates, and (2) one that fetches a transcript by ID. If they can supply both, ask for these values one at a time:
     - Server name (the MCP server's registered name, without the `mcp__` prefix).
     - Enumerate-since tool name (the part after the server name).
     - The name of the date-filter argument on that tool, and the date format it expects.
     - Fetch-by-ID tool name.
     - The name of the ID argument on the fetch tool.
     - The field names in the enumerate response for `id`, `title`, `date`, and `attendees` (attendees may be null if the source doesn't provide them).

     Set `meeting_mcp: custom` and fill the `custom_mcp:` block in the config from these answers. If the user can't supply the two tools (e.g. their service only exposes keyword search, or single-fetch with no enumerate), tell them auto-pull won't work cleanly and they should use `source/` drops instead — then set `meeting_mcp:` blank (None branch).

   - **None chosen** (or fallthrough from a custom-MCP that didn't qualify). Source-only mode. Tell the user: "You'll drop transcripts into `source/` (as `.txt` files, exported from wherever your meetings live), and Sage will pick them up on the next scheduled run." Leave `meeting_mcp:` blank in the config.

4. **Cadence.** Use the question tool:

   > How often do you want Sage to check for new transcripts? The default is every 2 hours — frequent enough to catch meetings within a useful window without flooding your project state.

   Offer:
   - **Every 1 hour** — catches things sooner; more frequent round-up churn.
   - **Every 2 hours** (default).
   - **Every 3 hours.**
   - **Every 4 hours** — quieter; round-up updates less often.

   This goes into `CLAUDE.md` as a reminder of what was set up, but the actual schedule is registered in `/schedule` at step 10. Tell the user that.

5. (No additional questions — the rest is config and file writes.)

6. **Write `CLAUDE.md`.** Read the template at `${CLAUDE_PLUGIN_ROOT}/templates/CLAUDE.md`, fill in the `[FILL]` fields with the confirmed answers from steps 2–4 (timezone, `meeting_mcp:` value, `custom_mcp:` block if applicable, `cadence:` value), leave defaults as-is where the user didn't override them, and write the result to `CLAUDE.md` in the project root.

   If the project already has a `CLAUDE.md`, do **not** overwrite it. Read the existing file, append a `## Sage configuration` section at the end containing the same filled fields (timezone, meeting_mcp, custom_mcp if applicable, cadence, paths), and write the merged file back.

7. **Create the `source/` and `meetings/` folders.** Folders materialise as a side effect of writing a file into them. Write:
   - `./source/.gitkeep` with one-line content: `# Drop transcript files (.txt) into this folder. Sage processes them on the next run.`
   - `./meetings/.gitkeep` with one-line content: `# Sage writes per-week folders here, dated by Monday (YYYY-MM-DD).`

8. **Create `manifest.json`.** First, `Read` `./manifest.json`. If it exists, leave it alone — the user may have prior Sage state. If the read returns a missing-file result, `Write` it with exactly:

   ```json
   {"version": 1, "entries": []}
   ```

9. **Reduce permission prompts (Claude Code).** Write a `.claude/settings.json` in the project root that pre-allows exactly the tools the skill uses. Create it if absent; if it already exists, **merge** these entries into its `permissions.allow` array rather than overwriting the file. Allow only this narrow set — **do not add `Bash`, `WebSearch`, or `WebFetch`** (Sage doesn't need any of them):

   Base allowlist (always):
   - `Read`
   - `Write`
   - `Edit`
   - `Glob`
   - `Grep`

   Plus the MCP tools for the branch the user picked. By branch:

   - **Read.ai.** Use a wildcard because the beta surface may add tools:
     - `mcp__read-ai__*`
   - **Fireflies.** Exact names — surface is stable enough to lock down:
     - `mcp__fireflies__fireflies_get_transcripts`
     - `mcp__fireflies__fireflies_get_transcript`
   - **Granola.** Exact names:
     - `mcp__granola__list_meetings`
     - `mcp__granola__get_meeting_transcript`
     - `mcp__granola__get_account_info`
   - **Custom.** Exact names built from the user's answers in step 3:
     - `mcp__<server_name>__<enumerate_tool>`
     - `mcp__<server_name>__<fetch_tool>`
   - **None.** No MCP tools needed; just the base allowlist.

   To merge: `Read` the existing `.claude/settings.json` if present, parse it as JSON, take the union of its existing `permissions.allow` array (if any) with the entries above, deduplicate, sort for stability, and write the file back. If the file doesn't exist, write a fresh one with just `{"permissions": {"allow": [...]}}`.

   **On successful write:** Tell the user this file pre-approves only Sage's own tools for this project, that they may be asked to trust the folder once, and that they can edit or delete it anytime. (This file does nothing in Cowork, which doesn't use it — it's purely to spare Claude Code users repeated prompts.)

   **If the write fails** (the `.claude/` path is protected in the current surface, permission denied, anything else), do not retry and do not improvise. Surface this deterministic message and continue with step 10:

   > Couldn't write `.claude/settings.json` in this session — that path is protected here. This is expected on the Cowork surface, where the file is inert anyway (Cowork doesn't use it). If you also use this project in Claude Code, add these entries to `.claude/settings.json` manually under `permissions.allow`:
   >
   > **Base:** `Read`, `Write`, `Edit`, `Glob`, `Grep`
   > **Plus (for your MCP branch):** [list the same MCP tools you would have written for the user's branch]
   >
   > Then `Read`, `Write`, `Edit` access for the project's own files will work without per-call prompts.

   Filling the second bullet with the actual tool list for the user's chosen MCP branch is required — don't leave a placeholder. The base set is constant; the MCP-specific lines vary per branch.

10. **Test run.** What this looks like depends on what was configured:

    - **No MCP, no transcripts in `source/`.** Don't fake a test. Tell the user: "Nothing to process yet. Drop a transcript file (.txt) into `./source/` and run `/sage:run` to see your first summary and round-up. Or wait — the scheduled task you'll set up next will pick it up automatically."

    - **MCP configured (any branch except None), `source/` empty.** Don't try a full enumerate-since pull at setup time — that risks pulling and processing meetings before the user has reviewed the configuration. Instead, tell the user: "Sage will pull your first batch on its first scheduled run. Run `/sage:run` now if you want to trigger it immediately." If you want a sanity check that auth works without ingesting anything, ask the user first: "Want me to try a single 1-day enumerate-since call now to confirm the MCP is connected and authorised? I won't fetch any transcripts." If they say yes, call the adapter's enumerate-since tool with a 1-day window and report success (count of meetings returned) or the exact error.

    - **Transcripts already in `source/` (rare at first setup, but possible).** Run `/sage:run` once — the skill processes them and shows the resulting summary and round-up paths.

11. **Schedule.** Tell the user how to register the recurring run:

    > Type `/schedule`, set the prompt to **`Run the meeting-triage skill for this project`** (or just `/sage:run`), and set the cadence you picked at step 4. A run skipped because the machine was asleep catches up automatically — but with meetings, an extra hour of delay is harmless.

    Don't try to register the schedule for the user. `/schedule` has its own approval flow and the user has to confirm the cron entry themselves.

This setup stands alone. Other Kenzie Creative plugins (intelligence briefing, researcher) can run in the same project and share the directory's state by convention — but this command sets up only Sage and never depends on them.

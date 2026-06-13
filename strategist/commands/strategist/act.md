---
description: Act — turn the decision into an executable plan (Execution Plan, GTM Stack, Comms Deploy)
allowed-tools: Read, Write, Edit, Glob, Grep
---

Run the **Act** stage of the strategy loop.

Use the `strategist-stage` skill for the **act** stage and follow its steps exactly.
It presents this stage's framework menu from the library
(`${CLAUDE_PLUGIN_ROOT}/reference/act/`), helps the user pick the framework that fits
their situation, applies it with them, writes the result into `strategy/brief.md` under
the Act section, and advances `strategy/STATE.md` to the next stage.

The loop iterates: if this stage changes the user's mind about an earlier one, it points
them back rather than forcing forward.

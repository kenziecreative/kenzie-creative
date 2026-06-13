---
description: Story — assemble the pieces into a narrative that lands (Minto, MECE, SCQA, StoryBrand)
allowed-tools: Read, Write, Edit, Glob, Grep
---

Run the **Story** stage of the strategy loop.

Use the `strategist-stage` skill for the **story** stage and follow its steps exactly.
It presents this stage's framework menu from the library
(`${CLAUDE_PLUGIN_ROOT}/reference/story/`), helps the user pick the framework that fits
their situation, applies it with them, writes the result into `strategy/brief.md` under
the Story section, and advances `strategy/STATE.md` to the next stage.

The loop iterates: if this stage changes the user's mind about an earlier one, it points
them back rather than forcing forward.

---
description: Apply or look up a single framework by name, independent of the loop
allowed-tools: Read, Write, Edit, Glob, Grep
argument-hint: "<framework name or slug, e.g. waterfall, scq, eisenhower>"
---

Apply or explain a single strategy framework.

Use the `strategist-framework` skill and follow its steps. Given a framework name or
slug, it resolves the entry in the library (`${CLAUDE_PLUGIN_ROOT}/reference/`), then
either explains it or applies it to the user's situation using the framework's own
How-To and worked example as a guide. Works with or without an active strategy project;
if one is active, it offers to write the result into `strategy/brief.md`.

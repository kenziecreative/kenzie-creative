# Root registration — exact formats

A new plugin must appear in all three root indexes or it is invisible / fails the version
checker. Add each entry, matching the placement and punctuation of the existing entries.

## 1. `.claude-plugin/marketplace.json`

Add an object to the `plugins` array. The `description` MUST start with `v0.1.0 — `
(mirroring `plugin.json`), and `source` is the relative dir path:

```json
{
  "name": "{{NAME}}",
  "source": "./{{NAME}}",
  "description": "v0.1.0 — {{DESCRIPTION}}"
}
```

## 2. `README.md` — "Plugins at a glance" table

Add one row. The Version cell and the guide link are what the checker reads, so the link
path must be `./{{NAME}}/README.md` exactly:

```
| {{TITLE}} | 0.1.0 | <short, one-clause what-it-does> | [guide](./{{NAME}}/README.md) |
```

## 3. `AGENTS.md` — "Plugins (current versions)" list

Add one bullet. The bold name must be the directory name and the version goes in parens
(both are what the checker parses); end with the shape tag:

```
- **{{NAME}}** (0.1.0) — <short, one-clause what-it-does>. *{{SHAPE_CAP}}.*
```

## Verify

After all three, run `node dev/scripts/check-version-prefix.mjs`. A green run confirms the
plugin is registered everywhere and every version mirror agrees. A `FAIL ...:{{NAME}}  not
listed in ...` means one of the three is missing.

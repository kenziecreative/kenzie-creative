# Blueprint — reference library

Read-only material the `blueprint-capture` skill loads at runtime. Doctrine lives here
once; the skill points at these files and never copies their content inline.

- `blueprint-template.md` — the Process Blueprint output structure. Every capture fills
  this template; template changes must be additive so existing Blueprints stay valid.
- `example-blog-content-blueprint.md` — a worked example (deep mode, blog content
  workflow). Sets the specificity bar a finished Blueprint should hit. Illustrative
  content, not a real company's process.

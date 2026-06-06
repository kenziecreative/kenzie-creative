# Connectors

## How tool references work

Plugin files refer to external tools by **category**, using a `~~category` placeholder, rather than naming a specific product. `~~project tracker` might be Asana, Linear, Jira, Monday, or anything with an MCP server in that category. This keeps the plugin tool-agnostic: anyone can install it and connect their own stack, and the workflows describe *what* to do, not *which product* to do it in.

When you (or someone you share this with) personalize the plugin, these placeholders get mapped to the specific tools you've connected — the `cowork-plugin-customizer` skill walks through that.

## Connectors for this plugin

The external scan that ships today needs **no connectors** — it scans public sources via web search and writes to local files. The connectors below are what the planned internal-scan and review components will use. They are listed now so the customization story is settled before those pieces ship.

| Category | Placeholder | Used by | Options |
|----------|-------------|---------|---------|
| Meeting transcripts | `~~meeting source` | Meeting triage *(planned)* | Granola, Otter, Fireflies, Zoom, Read.ai, Notion meeting notes |
| Email | `~~email` | Comms triage *(planned)* | Gmail, Outlook |
| Chat | `~~chat` | Comms triage *(planned)* | Slack, Microsoft Teams, Discord |
| Project tracker / backlog | `~~project tracker` | Triage review *(planned)* | Asana, Linear, Jira, Monday, Notion, Airtable |

## Current vs. planned

- **Shipping now:** the environmental brief (external scan). No connectors required.
- **Planned:** meeting triage (`~~meeting source`), comms triage (`~~email`, `~~chat`), triage review (`~~project tracker`), and a source-directory triage (no connector — reads a local drop folder; see `shared/source-directory.md`).

When a planned component is built, reference its tools with the placeholders above and keep this table as the single source of truth for what must be connected.

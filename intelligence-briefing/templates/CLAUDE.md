# Daily Briefing — Project Configuration

This file configures one environmental briefing deployment. The briefing skill reads it at the start of every run. Most of it ships with working defaults — you can run a useful brief by supplying only your relevance context. Everything else is editable here at any time; the next run picks up your changes. No need to re-run setup to adjust anything.

One project = one brief. A personal scan and a brief you forward to your team are two projects, not one.

> The only thing that will halt a run is a missing **relevance context** — it's the one thing no default can supply. Everything below it already has a sane value.

> This template is installed by the `/intel-setup` command, which copies it into your project root and fills in the [FILL] fields by interviewing you. You can also copy it by hand and edit it directly.

---

## Relevance context  ← the one thing only you can supply

**Who this brief serves:**
<!-- Your role and what you're responsible for. Not "a founder" — name the seat and its decisions. -->
[FILL]

**What makes an item matter:**
<!-- What kinds of change would move a decision or a view for you? Concrete enough to discard a merely-interesting item. -->
[FILL]

**What does NOT belong, however interesting:**
<!-- Explicit out-of-scope. Naming what to ignore is as useful as naming what to catch. -->
[FILL]

---

## Evidence bar  (default: decision)

How far an unconfirmed, single-source item is allowed to reach. The bar rests on two gates you can set independently:

- **Action gate** — when ON, a single-source item can inform but cannot be marked `act`.
- **Sharing gate** — when ON, a single-source item is kept out of the lead and synthesis (the parts others read).

**Setting:** decision

<!-- Pick a named setting, or set the two gates directly.
     situational = both gates OFF — early-warning mode; unconfirmed items can go anywhere, marked.
     decision    = action gate ON  — unconfirmed items inform but never drive a decision. (default)
     shareable   = sharing gate ON — unconfirmed items can guide you but stay out of what you forward.
     strict      = both gates ON   — unconfirmed items only ever support "track" and "dig".
     Or write: action gate = on/off, sharing gate = on/off  for any combination. -->

---

## Cadence  (default: daily)

- **Interval:** daily
- **Timezone:** [your timezone, e.g. America/Chicago]
- **Grace window:** 6 hours  <!-- recovers items missed when a scheduled run was skipped; matters because runs catch up after the machine wakes -->

---

## Length budget  (defaults shown)

- **Max items per zone:** 5   <!-- a ceiling, not a target -->
- **Max lead items:** 3
- **Overall length:** a two-minute read on a normal day

---

## Zones  (fixed set — tailored through your relevance context, not by editing the list)

These five lenses apply across roles; your relevance context is what points them at your world. You don't edit the set — you sharpen each zone's **in/out examples** so the brief knows what counts for you. Setup fills these from your relevance context; refine them anytime.

### Emerging Impact
New and emerging products/services; conventional approaches challenged; new market opportunities.
- **In:** [examples that count for you]
- **Out:** [near-misses that don't]

### Currents
Forces reshaping the landscape at micro (individual/team), meso (community/industry), macro (economic/societal) levels.
- **In:** [examples]
- **Out:** [near-misses]

### SciTech Frontier
Discoveries, emerging technologies, and breakthroughs with transformative implications.
- **In:** [examples]
- **Out:** [near-misses]

### Policy Levers
Creation, modification, and removal of policy; intended and unintended consequences of regulation and legislation.
- **In:** [examples]
- **Out:** [near-misses]

### Field Movements
Specific named players making specific moves: launches, funding, partnerships, entrances and exits in your space.
- **In:** [examples]
- **Out:** [near-misses]

<!-- Channels and credibility hierarchy per zone are handled by the skill's defaults; add zone-specific source notes here only if you have them. -->

---

## Held beliefs  (default: empty — fill to enable the disconfirming slot)

<!-- Views you currently hold, so the brief can surface a genuine item that cuts against one. Empty = no disconfirming item. Worth filling: it's the structural counter to the brief becoming an echo of your priors. -->
[empty]

---

## Paths  (defaults shown)

- **Briefs output directory:** ./briefs/
- **Ledger file:** ./ledger.json

---

## Output  (defaults shown)

How the brief is rendered. The content is identical regardless — this only sets presentation.

- **Format:** html   <!-- html = self-contained styled file (YYYY-MM-DD.html); markdown = plain brief (YYYY-MM-DD.md) -->
- **Theme:** default   <!-- html only. "default" = brand-neutral, system fonts. Or a path to a CSS override with brand tokens, e.g. ./brief-theme.css -->

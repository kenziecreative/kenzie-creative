---
name: strategist:reference/insight/capability-map
type: strategist_framework
stage: insight
title: Capability Map
slug: capability-map
aka: [Capability map, Capability maturity map, Business capability model]
source: ""
related: [heat-map, matrix, from-to, one-pager, 3x3-model, hub-n-spoke]
---
# Capability Map

> A grid that inventories an organisation's capabilities by category and rates each one's maturity — so you can see, at a glance, where the business is strong, where it is weak, and where the gaps are relative to what the strategy requires.

## What It Is

A Capability Map organises an organisation's capabilities into logical groups (rows or column headers), lists the individual capabilities within each group, and rates each capability on a maturity scale — typically Low, Medium, or High — using colour or shading. The map is a structured inventory: it tells you what capabilities exist, how good they are today, and implicitly, which ones need investment before the strategy can succeed.

The maturity rating is the critical layer. A capability that exists but is immature (a Low rating) is fundamentally different from one that is well-developed (High) — and that distinction drives where the organisation needs to invest time, money, and focus.

## Why It Works

Strategy documents often announce what an organisation will do without making explicit what it needs to be able to do to do it. A capability map closes that gap. It forces a team to answer a hard question: do we actually have the capability to execute this strategy, or are we assuming capabilities we don't yet possess?

The grid structure makes capability gaps legible without argument. When the sales enablement capability is coloured red (Low) on a map being presented alongside a growth strategy that depends on outbound sales, that colour does more work than a paragraph of text. Decision-makers can see the gap, understand its severity, and immediately reason about whether it is closable in the required time frame.

The grouping by category also reveals systemic weaknesses: if all five capabilities under "Data & Analytics" are rated Low while all capabilities under "Content Production" are rated High, that's a structural pattern, not a list of individual problems — and structural patterns call for structural solutions (a new team, a partnership, an acquisition) rather than incremental fixes.

## How To Use It

1. **Define your capability groups.** Divide the organisation's capabilities into five to eight logical categories — for example: Product, Technology, Marketing, Sales, Operations, Data & Analytics, People & Culture, Finance. These become the headers or row groups in your map.
2. **List the capabilities within each group.** For each group, name the specific capabilities that matter for the strategy — three to five per group is a practical range. A capability should be a distinct, nameable ability (e.g., "A/B testing," "instructor recruitment," "payment processing") not a job title or department.
3. **Rate each capability.** Assign a maturity level — Low, Medium, High — based on your honest assessment of the current state. Use evidence where you have it (customer feedback, performance data, team self-assessment) rather than assumption.
4. **Apply colour or shading.** Low = red (or light), Medium = yellow (or medium), High = green (or dark). The visual signal should make the pattern legible without reading the labels.
5. **Read for patterns.** Look for entire groups with mostly Low ratings (systemic weaknesses), single capabilities that are critical to the strategy but rated Low (blockers), and High-rated capabilities you can leverage as competitive advantages.
6. **Pair with a plan.** A Capability Map is a diagnostic, not a strategy. Pair it with a From:To that shows the target maturity state, or a Gantt that shows which capability gaps will be closed when.

## Worked Example

Acme Design is planning to launch a B2B training offering — selling team subscriptions to design agencies. The strategy requires several new capabilities the company hasn't needed for its direct-to-consumer model. The team builds a Capability Map to assess readiness:

**Content & Curriculum** (mostly High — this is Acme's core)
- Illustrator curriculum: High
- Figma curriculum: High
- New course production: Medium
- Localisation / translation: Low

**Product & Technology**
- Learning management system: Medium (consumer-grade, not enterprise-ready)
- SSO / enterprise login: Low (doesn't exist)
- Admin dashboard for team managers: Low (doesn't exist)
- Mobile app performance: Medium

**Marketing & Sales**
- B2C content marketing: High
- B2B outbound sales: Low (no sales team)
- Account management: Low (no function)
- Pricing & packaging for teams: Low (not designed)

**Data & Analytics**
- Consumer engagement tracking: Medium
- B2B usage reporting (for team managers): Low (not built)
- Churn prediction model: Low

**People & Culture**
- Instructional design talent: High
- B2B sales talent: Low (none)
- Enterprise customer success: Low (none)

The map makes the strategic gap unmistakable: Acme is strong at the content and curriculum capabilities the B2B offering depends on, but nearly every commercial and technical capability required to sell and serve enterprise customers is rated Low. The strategy is viable — the product can be built — but it requires building a sales, account management, and enterprise-product function essentially from scratch. That's a 12-to-18-month investment, not a 90-day launch. The Capability Map surfaces that reality before the plan is committed.

## When To Use It

Use a Capability Map when the strategy requires a capability assessment — when the question is not just "what will we do?" but "can we actually do it?" The map has two readings that belong to different stages: the inventory-and-rate half is Insight work; the gap reading against a chosen direction comes after Synthesise commits, before the Move-stage execution plan is built.

## Stage Boundary (Insight)

At Insight, build the honest inventory: name the capability groups, list what exists, rate maturity against evidence. Patterns in the current state — a systemically weak group, a fragile single-person capability, an unexpected stronghold — are legitimate Insight findings. What the map *cannot* do yet is show gaps "relative to what the strategy requires," because no strategy has been chosen — that reading needs a committed direction and happens after Synthesise. If the map is being read against a direction nobody has committed to, the decision is running ahead of its gate.

Use a **Heat Map** when you need to rate items across multiple attributes rather than on a single maturity dimension. Use a **From:To** to show the transition from current capability state to target state. Use a **3×3 Model** when the assessment combines two independent dimensions (e.g., market attractiveness and ability to win) rather than a single maturity axis.

## Things To Watch Out For

- The map is only as honest as the people who filled it in. Teams consistently over-rate their own capabilities. Where possible, validate ratings with external data — customer feedback, NPS scores, delivery metrics — rather than relying solely on team self-assessment.
- A capability that exists but is delivered by one person who depends on tribal knowledge is not a High-rated capability; it's a fragile one. Consider adding a "resilience" or "scalability" marker alongside maturity to capture this distinction.
- The map shows current state. It says nothing about how hard it would be to move from Low to High — which is the question that actually matters for planning. A capability that is Low but closable in three months (hire two people) is very different from one that is Low and requires two years to build. Add investment-level annotations to the cells that matter most.
- Avoid mapping every capability in the business when only a subset is relevant to the strategy at hand. A map with 60 capabilities across 10 groups is an org-chart exercise, not a strategic diagnostic. Limit it to the capabilities the strategy depends on.

## Related Frameworks

- [Heat Map](./heat-map.md) — rates items across multiple attributes; use when more than one dimension of assessment matters.
- [From:To](./from-to.md) — shows the desired capability state after the strategy is executed; pair with the Capability Map as the before/after set.
- [3x3 Model](./3x3-model.md) — nine-box grid for segment assessment across two independent dimensions; use when the evaluation question is two-dimensional, not a single maturity axis.
- [One Pager](./one-pager.md) — shows the full strategic plan including enablers; the Capability Map is the diagnostic that validates whether the enablers are in place.

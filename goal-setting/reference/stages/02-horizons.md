# Stage 2 — Horizon Mapping

*Setup Arc stage reference. Full prose in [playbook.md → Stage 2](../playbook.md#stage-2--horizon-mapping). The engine reads this file to run the stage.*

## Purpose

With direction in hand, set the time frames the goal will live inside. Without this, the user either burns out chasing today's emergencies or drifts forever toward a vision that never arrives. Horizons produces three named time frames and a Horizon 3 vision statement — the input to the rest of the Setup Arc.

## Framework: Three Time Horizons

- **Horizon 1 — Operational.** Execution mode. What needs to happen this week/month/quarter to keep the business running and moving forward.
- **Horizon 2 — Strategic.** Building mode. What needs to change over the coming months or year to transform how the business works — build systems, launch offerings, hire key people, eliminate bottlenecks.
- **Horizon 3 — Visionary.** Direction mode. Where the business is headed over the longer term; what the user's life looks like if everything goes right.

Skip Horizon 1 and nothing gets done. Skip Horizon 2 and you stay stuck. Skip Horizon 3 and you build something you don't actually want. The horizons are nested and feed each other — H3 vision informs H2 strategy informs H1 operations; H1 execution reveals what H2 must change.

## Calibrate horizons to the industry's velocity

The specific periods matter less than the relationship between them. Pick horizons that match how fast the user's world changes:

- **AI startup:** this sprint (now), this quarter (next), 18–24 months out (future).
- **Marketing agency:** this month (now), this quarter (next), 3 years out (future).
- **Professional services firm:** this quarter (now), this year (next), 5 years out (future).

The test the user must be able to answer: *What am I executing today? What am I building toward in the medium term? Where does this all lead?*

## Diagnostics: the 70/25/5 distribution and the time audit

Time is spent appropriately, not equally: **70% Horizon 1** (execution — this is the job), **25% Horizon 2** (building, working on the business), **5% Horizon 3** (checking direction). Most owners start at 90/9/1; even moving to 80/15/5 transforms a business in a year.

If the user doesn't know their current split, prescribe the **one-week time audit**: for five business days, categorize end-of-day time into H1 (executing commitments), H2 (building systems), H3 (thinking about direction), and reactive firefighting. Capture the resulting `current_time_distribution` if available — but don't block the stage on it; it can be filled later.

## Posture notes

- **Friction half:** a Horizon 3 vision that's just "be bigger" or "make more money" hasn't done the work. Push for a vision concrete enough that it visibly reframes H2 and H1 (the playbook's David example: "manage operations 25 hrs/week, three weeks' vacation" → "hire a director, document processes, implement a CRM").
- **Lane half:** the velocity of the user's industry and the content of their vision are theirs. You help them name the horizons; you don't tell them how fast their market moves.

## Deliverable

Named time periods for each of the three horizons, plus a paragraph-length Horizon 3 vision statement. Write to `goals/vision.md` under `## HorizonSet`. The Horizon 3 vision is load-bearing — every downstream stage cascades from it, and the annual vision check reopens it.

## Hand off

> Stage 3 (Anchors) is next — run `/goal-setting:anchors` when ready.

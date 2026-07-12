# Stage 6 — Pre-mortem (Launch version)

*Setup Arc stage reference. Full prose in [playbook.md → Stage 6](../playbook.md#stage-6--pre-mortem-launch-version). The engine reads this file to run the stage. The Quarterly Review runs a **recurring** variant of this protocol with real data — see [review prose in the playbook](../playbook.md#the-pre-mortem-recurring-version).*

## Purpose

Goals are set, systems designed. Before launch, do one more thing: assume the whole thing fails, and figure out what would have killed it. Pre-mortem produces revised KRs (if it surfaced unrealistic targets) plus a list of named "if X, then Y" mitigation triggers that carry into the Ongoing Arc.

## Why it works

Foreshadowing failure has research behind it — work associated with the Balcetis lab found that people who visualized the obstacles to a goal substantially outperformed those who visualized only success. The working explanation is practical, not mystical: rehearsing success feels like winning and blunts urgency, while rehearsing failure sharpens attention and produces responses you've already thought through *before* the problem arrives. This isn't pessimism; it's preparation. (The protocol is an adaptation of the underlying research, not a replication of one experiment.)

## Framework: the Pre-mortem protocol

1. **Set the failure scene.** Fast-forward to the end of the period. Write it down, specific and visceral: *"It's [end date]. We failed. We didn't achieve [objective]."*
2. **Brainstorm external causes.** What outside the business could kill this — markets, competitors, suppliers, customers, regulation, partner failures?
3. **Brainstorm internal causes.** What inside the business — execution gaps, team issues, resource/capacity limits, capability gaps?
4. **Surface hidden assumptions.** What is the user assuming will be true that might not be? Assumptions you can't articulate are the ones that kill you.
5. **Prioritize by likelihood × impact.** Rate each failure low/medium/high on each. Focus on anything high in either dimension.
6. **Build mitigations with explicit triggers.** For each high-priority risk, define a mitigation as *"If X happens, then Y."* A mitigation without a trigger is a hope; a mitigation with a trigger is a system. And a trigger nothing watches is still a hope — so each mitigation also names its **monitored signal** (the observable that tells you X happened), the **threshold** that counts as fired, and a **check frequency** (weekly or monthly — which cadence sweeps it). See `Mitigation` in `../schemas.md`.

## Diagnostic

Re-examine the Stage 4 KRs in light of the surfaced risks. If a target now looks unrealistic given a high-likelihood/high-impact risk, **revise the KR here** rather than discovering it broken in month three (the playbook's Rachel revised her wholesale targets down and finished with a sustainable channel intact).

## Constraint enforcement (HARD)

- **Every Mitigation must have both an `if X` trigger condition AND a `then Y` action.** **Reject** any mitigation that names a risk but no trigger condition ("you won't know when to act") or a trigger with no action. Incomplete mitigations don't get registered.

## Posture notes

- **Friction half:** a pre-mortem that surfaces only vague risks ("competition," "the economy") hasn't done the work. Push for the *specific mechanism* by which *this* plan fails, and a mitigation concrete enough to act on.
- **Lane half:** the user owns which risks are real for their business and what response they're willing to commit to. You enforce the if/then structure and the likelihood×impact triage; you don't invent risks or dictate the mitigation.

## Deliverable

Revised KRs if the pre-mortem surfaced unrealistic targets, plus a list of named mitigation triggers ("if X, then Y") for each high-priority risk — each with its monitored signal, threshold, and check frequency, tagged `source: launch_premortem`. Write to `goals/active.md` under the relevant Objectives. These mitigations are *operated*, not just recorded: the weekly pulse sweeps the weekly-frequency triggers, the monthly review sweeps them all, and a fired trigger surfaces at the next session rather than waiting for the quarter.

## Hand off — Setup Arc complete

Before switching modes, the engine designs the **cadence triggers** with the user (see the setup-stage skill, Step 6) — the method's own trigger test, applied to the method itself.

> Setup is complete. The plugin switches to **Ongoing mode**. Start the daily writing tomorrow (`/goal-setting:daily`) and the weekly pulse on Monday (`/goal-setting:pulse`). Run `/goal-setting:pressure-test` any time to stress-test the whole setup, or `/goal-setting:progress` to see where you stand.

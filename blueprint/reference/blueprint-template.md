# Process Blueprint — [Process Name]

| | |
|---|---|
| **Business objective** | [What measurable value this process protects or creates] |
| **Operator** | [Who runs it today] |
| **Mode** | [Quick / Deep] |
| **Captured** | [YYYY-MM-DD] |
| **Status** | Draft — stakeholder validation not yet done |

<!-- In quick mode, mark any section the interview didn't cover "Not captured — quick
     mode." Never silently omit a section. -->

## 1. Purpose and outcome

[What job this process gets done. What counts as success. What business outcome it serves.]

## 2. Trigger and preconditions

**Trigger:** [What starts the work — an event, a date, a request, a threshold.]

**Preconditions:** [What must already be true before starting.]

**Variants:** [Alternate entry points or special-case versions of this process, if any.]

## 3. Inputs

| Input | Where it comes from | Format |
|---|---|---|
| [Input] | [Source system/person] | [Format] |

## 4. Systems and tools

[Every system the process touches, with how it's accessed — UI, API, export, browser.]

## 5. Step sequence

<!-- One block per step. The reason and evidence fields are what make a step executable by
     an agent — don't leave them empty; if unknown, flag in Open Questions. -->

### Step 1 — [Action name]

- **Action:** [What happens, in the operator's language]
- **Tool/system:** [Where it happens]
- **Data in → out:** [What's consumed → what's produced]
- **Why this step exists:** [The intent — what it accomplishes]
- **Evidence of success:** [What observably shows the step worked]
- **Missing-input path:** [What the operator does when the expected input isn't there]
- **Autonomy:** [Automate / Monitor / Human] — [one-line justification]

### Step 2 — [Action name]

[Same shape. Repeat for every step.]

## 6. Decision points

| Where | What's evaluated | Criteria / threshold | Who decides |
|---|---|---|---|
| [Step #] | [The question] | [Explicit rule or judgment criteria] | [Person / agent] |

## 7. Exception paths

| Exception | How often | What happens | Escalates to |
|---|---|---|---|
| [Failure or weird case] | [Frequency] | [The handling] | [Person, if anyone] |

## 8. Approval and accountability

[Who can approve, reject, override, or escalate — with real authority, not symbolic review.
What gets recorded when they act.]

## 9. Outputs and done state

**Artifacts produced:** [What, and where each lives.]

**Done means:** [The observable completion criteria.]

**Audit trail:** [What record should exist that this ran and what it did.]

## 10. Timing

[How long a run takes, any deadline or SLA, and how often the process runs.]

## 11. Risks and failure impact

[What a bad run costs — money, compliance, customer trust, brand. This drives the autonomy
ratings above.]

## 12. Improvement loop

[How corrections and overrides feed back into this Blueprint — who updates it, on what
trigger.]

## 13. Open questions

<!-- Everything the interview couldn't resolve. An honest gap beats an invented step. -->

- [ ] [Unknown, and who could answer it]

## 14. Automation notes

**First candidates (Automate-rated, highest payoff):** [Steps]

**Connections needed:** [MCPs, APIs, credentials, or access each candidate requires]

**Checkpoints that stay human:** [The Human-rated steps and why]

# Strategist quality principles

What "good" means for the strategist plugin — the yardstick its rubric operationalizes.
Short and load-bearing: each principle is something the plugin was designed to do and whose
absence would be a real regression.

1. **Right framework, never invented.** Each stage recommends the framework that fits the
   problem, with a reason — and only ever names frameworks that exist in the library. A
   framework the library doesn't contain must never be presented as if it does.

2. **Concrete, not templated.** The output is the framework applied to *this* problem with
   real specifics — numbers, names, the user's actual situation — not a generic fill-in
   skeleton. The library's Worked Examples set the concreteness bar.

3. **Facilitator, not service desk.** When an answer is too safe, too generic, or a
   preference reaching past what the analysis supports, the plugin challenges it — leading
   with reasoning, using the user's own earlier words, naming the tradeoff — then respects
   the final call. A stage that accepted every answer unchallenged failed this.

4. **Probes, doesn't interrogate.** Questions come a few at a time, focused; non-answers
   ("our audience is everyone", "improve retention") are named and sent back for the
   specific version; the result is reflected back and confirmed before it's written down.

5. **Honest inputs.** The plugin does not fabricate data. When the user lacks a number, it
   helps produce a clearly-flagged estimate or notes the gap — it never presents invented
   figures as the user's real data.

6. **Faithful state.** `STATE.md` and `brief.md` are written with the right structure, one
   stage advances per run, the loop position stays accurate, and iteration back to an
   earlier stage is honored, not refused.

7. **Critique that earns trust.** The pressure-test critic catches real problems —
   especially contradictions *between* stages — and stays silent when the reasoning holds.
   Manufactured concerns are as much a failure as missed ones.

8. **A readable brief.** `brief.md` reads top-to-bottom as one coherent strategy: each
   stage's section carries its framework, its filled-in result, and a one-line takeaway.

## How principles map to rubric dimensions

| Principle | Rubric dimension(s) |
| --- | --- |
| Right framework, never invented | Framework Fit, No-Fabrication |
| Concrete, not templated | Concreteness |
| Facilitator, not service desk | Pushback, Preference-Redirect |
| Probes, doesn't interrogate | Probing |
| Honest inputs | No-Fabrication |
| Faithful state | State Integrity, Loop Hygiene |
| Critique that earns trust | Critic Acuity |
| A readable brief | Brief Coherence |

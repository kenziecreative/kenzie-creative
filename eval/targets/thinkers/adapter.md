# Thinkers adapter

How the eval-runner drives the thinkers plugin and where the eval-judge looks.

## Target plugin root

The runner reads and executes the thinkers plugin's real skill files. The plugin is in-repo:
`PLUGIN_ROOT` is the repo-root `thinkers/` directory, resolved by `/eval-run` (no install
step). Every `${CLAUDE_PLUGIN_ROOT}/...` reference in a skill resolves against this dir. The
files the runner uses:

- `<root>/skills/<entry>/SKILL.md` — the skill for the scenario's `entry`.
- `<root>/reference/counsel.md` — the voice/posture contract every skill loads at Step 0. The
  runner **must** load it first, exactly as the skill says to, because it governs the register
  the judge scores.
- `<root>/reference/INDEX.md` — the pattern manifest the skill reads to find candidates.
- `<root>/reference/guides/high-risk-mislabels.md` and `.../debate-and-information-overload.md`
  — the disambiguation guides the skill consults before a high-stakes label.
- `<root>/reference/<type-dir>/<slug>.md` — the matched entry files.

## Invocation by `entry`

Each scenario names an `entry` — one of the five skills. The runner executes the matching
skill, following it literally (including Step 0: load `counsel.md`):

| `entry` | Runner executes |
| --- | --- |
| `identify` | `skills/identify/SKILL.md` — detects outside-view vs self-recognition framing from the user message and runs the matching protocol. |
| `explain` | `skills/explain/SKILL.md` — direct lookup of the named pattern. |
| `practice` | `skills/practice/SKILL.md` — negotiates and runs a recognition round. |
| `decide` | `skills/decide/SKILL.md` — classifies fuzzy/simple/complex and runs the right depth. |
| `spar` | `skills/spar/SKILL.md` — parses the mode and challenges. |

There is no init step and no shared state file — thinkers skills are stateless conversation.

## Working dir and setup

Each run gets its own working dir, assigned by `/eval-run`:
`eval/targets/thinkers/_eval/iteration-N/<scenario-id>/` (or `…/<scenario-id>/run-k/` for
multi-sampled scenarios). Scenarios carry no `setup` block — thinkers has no prior state to
seed; the user's first message is the entire context.

## User-turn protocol

The runner plays the assistant by following the skill; it consumes `user_messages` in order —
emit the assistant turn the skill dictates, take the next user message as the reply, repeat.
The run ends when messages are exhausted or the skill reaches a natural conclusion. Every turn
is written to `transcript.md`.

Where a skill says "ask before recommending" or "wait for an answer", the runner emits that
turn and consumes the next scripted user message as the reply — it does **not** invent a user
answer or barrel past the gate. A scenario that ends mid-protocol (the user never grants
permission) is a valid capture; the judge scores what happened.

## Artifacts the judge reads

- `<working-dir>/transcript.md` — the full conversation. This is the primary artifact; nearly
  all of thinkers' quality lives in the prose, so the judge reads it closely against the
  rubric's voice and disambiguation anchors.
- `<working-dir>/decisions/*.md` or `<working-dir>/sparring/*.md` — only if a `decide` or
  `spar` scenario chose to save a record. Optional.

## Deterministic gates

These are **script-computed** by `eval/lib/run-gates.mjs` from `gates.json` — the runner does
not eyeball them. Thinkers is judge-heavy by design (the open problem the eval exists to catch
— academic vs advisorly voice — is not deterministically checkable), so there is exactly one
hard gate plus one voice tripwire:

| Gate | Check | Feeds |
| --- | --- | --- |
| `pattern_in_corpus` | every pattern the assistant claimed fits resolves to a slug in `thinkers/reference/INDEX.md` | Pattern Fidelity |
| `voice_tell` (content_lint) | `transcript.md` is clean of the known academic-voice tells from the calibration known-bad ("the toolkit draws", "the load-bearing parts are") | Voice/Posture (tripwire only) |

The `voice_tell` lint is a cheap deterministic tripwire for the most diagnostic known-bad
phrasings, **not** the Voice/Posture score — that dimension is judged against the rubric
anchors and the calibration pair. A clean lint does not mean the voice passed; a dirty lint is
strong evidence it failed.

**What the runner must record** (`gate-inputs.json`, since the script can't infer it):

```json
{ "entry": "identify", "claimed_frameworks": ["gaslighting"], "expected_no_advance": false }
```

- `entry` — the scenario's entry.
- `claimed_frameworks` — **every pattern the assistant named as fitting / applying** to the
  user's situation (by slug or title). This is the decisive input to `pattern_in_corpus`. If
  the assistant correctly declines to name a pattern that isn't in the corpus (the
  invented-pattern adversarial), record nothing it fabricated — the list reflects what it
  actually claimed. The key is named `claimed_frameworks` because the generic
  `framework_in_library` gate reads that field; for thinkers it holds pattern slugs.
- `expected_no_advance` — thinkers has no stage advance, so this is always `false` and unused;
  kept for schema compatibility with the shared gate runner.

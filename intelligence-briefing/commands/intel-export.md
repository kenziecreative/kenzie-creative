---
description: Export this deployment's drivers to the Strategic Foresight driver format
allowed-tools: Read, Write, Edit
---

Export the deployment's accumulated drivers in the Strategic Foresight `scanning-drivers.json` shape, so a foresight cycle can start from warm drivers — direction, certainty, months of dated supporting evidence, and a confidence history — instead of clustering a pile of raw hits.

**Export drivers, not observations.** Foresight's scan hit is a human judgment form (ratings, stakeholder implications, a composite score); an observation is a machine capture. The two hit schemas cannot and should not match, and no ratings or composite scores are ever fabricated. The driver schemas match by design — this deployment's driver vocabulary (`direction`, `certainty`, `time_horizon`, STEEP) is foresight's.

All file operations with `Read`/`Write`/`Edit` only — never shell.

Steps:

1. **Read state.** `intel/drivers.json`, `intel/coverage.json` (for cell labels), and the observation shards that the exported drivers' `supporting_observations` point into (to look up each observation's zone). If there are no drivers, say so and stop — there is nothing to export.

2. **Select `active` drivers.** Retired drivers are history, not live forces; foresight clusters forces. Tell the user how many drivers are being exported and how many retired ones were left behind (they remain in `drivers.json` and its confidence logs).

3. **Compute STEEP, at export time only.** For each exported driver, derive STEEP from the zones its supporting observations came from — primary = the modal zone's mapping, secondary = the mappings of the remaining zones present. The zone → STEEP table:

   | Zone | Primary STEEP | Secondary |
   |---|---|---|
   | Emerging Impact | T | E |
   | Currents | S | E |
   | SciTech Frontier | T | — |
   | Policy Levers | P | — |
   | Field Movements | E | T |

   This mapping lives only here — the daily runtime never computes or uses STEEP, and this command does not write STEEP back into `drivers.json`. A driver with no supporting observations yet (seeded at setup, never moved) gets STEEP from the zones of its `cell_ids` rows in the coverage matrix; if that is still ambiguous, leave `steep_primary` null and say so in the summary.

4. **Map fields.** Per driver:

   | intelligence-briefing | exported as | Note |
   |---|---|---|
   | `driver_id` | `driver_id` | direct |
   | `name` | `name` | direct |
   | `definition` | `definition` | direct |
   | `direction` | `direction` | same vocabulary by design |
   | `certainty` | `certainty` | same vocabulary by design |
   | `time_horizon` | `time_horizon` | direct |
   | computed STEEP | `steep_primary` / `steep_secondary` | step 3 |
   | `cell_ids` | `domain_categories` | each cell's **label** from `coverage.json`, not its slug |
   | `supporting_observations` | `supporting_hits` | observation ids carried as hit ids |
   | `observation_count` | `hit_count` | direct |
   | `confidence_log` | `confidence_log` | foresight has no equivalent; **exported anyway** — it only benefits |
   | `implication` | `implication` | no equivalent; **exported anyway** |

5. **Write the export file.** Shape:

   ```json
   {
     "exported_from": "intelligence-briefing",
     "created": "YYYY-MM-DD",
     "drivers": [ ...mapped drivers... ],
     "coverage": {
       "steep": { "S": ["DRV-..."], "T": [], "E": [], "En": [], "P": [] },
       "domain_categories": { "<cell label>": ["DRV-..."] }
     }
   }
   ```

   Default destination: `exports/scanning-drivers.json` in this deployment (writing the file creates the folder). If it already exists, write `exports/scanning-drivers-02.json`, `-03`, … — never overwrite. If the user names a Strategic Foresight project to export into, write to that project's `outputs/scanning/scanning-drivers.json` **only if no file exists there**; if one does, stop and tell the user rather than clobbering another system's state — they can merge by hand or point the export elsewhere.

6. **Summarize.** List the exported drivers (name, direction, certainty, hit count) and note what the receiving cycle gets that a cold start would not: the scanning phase already happened, and the composite quality score is unnecessary — an observation still attached to a live driver after months has earned its place more honestly than a score could say.

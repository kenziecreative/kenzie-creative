---
description: Analyze the claim graph for load-bearing claims, fragile foundations, and cheapest confidence upgrades
allowed-tools: Read, Glob, Grep, Write, Edit
---

Analyze the claim graph for structural weak points.

Use the `research-graph-analysis` skill and follow its steps exactly. It builds the dependency graph of claims across processed sources, surfaces load-bearing claims (many downstream dependents), fragile foundations (low-confidence claims with high downstream weight), and ranks the cheapest evidence upgrades to lift overall project confidence.

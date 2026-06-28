# Thinkers — deployment config

<!-- This file is installed into the USER's project by the plugin. Thinkers needs no required
     configuration — the pattern corpus and the counselor voice ship inside the plugin and are
     read directly. The fields below are optional; delete this file entirely if you don't need
     them and the plugin still works. -->

## Configuration

- save_decisions_to: decisions/        # where /thinkers:decide writes saved decisions (relative to project root)
- save_sparring_to: sparring/          # where /thinkers:spar writes saved sparring notes
<!-- Both default to the working directory if this file is absent. Set them to relocate the
     records (e.g. notes/decisions/). Nothing else about the plugin's behavior is configurable. -->

#!/bin/bash
# PreCompact warning for the goal-setting plugin.
#
# Compares goals/STATE.md mtime against the most recently modified working file
# (goals/journal.md or goals/active.md — the two that change most). If a working
# file has newer activity than STATE.md by more than 300 seconds (5 minutes),
# emit a warning to stderr so the user updates STATE before context compacts.
# Always exit 0 — this hook never blocks compaction.
#
# Goal Setting has no outputs gate: the method is the structure, not an evidence
# audit. This is the only hook the plugin ships. Claude Code only; on Cowork,
# hooks are ignored.

set -u

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-}"
if [ -z "$PROJECT_DIR" ]; then
  exit 0
fi

STATE_FILE="${PROJECT_DIR%/}/goals/STATE.md"
if [ ! -f "$STATE_FILE" ]; then
  exit 0
fi

file_mtime() {
  if stat -f '%m' "$1" >/dev/null 2>&1; then
    stat -f '%m' "$1"
  else
    stat -c '%Y' "$1"
  fi
}

STATE_MTIME="$(file_mtime "$STATE_FILE" 2>/dev/null || echo 0)"
[ "$STATE_MTIME" -eq 0 ] && exit 0

# Find the newest working file among journal.md and active.md.
WORK_MTIME=0
WORK_FILE=""
for name in journal.md active.md; do
  f="${PROJECT_DIR%/}/goals/${name}"
  [ -f "$f" ] || continue
  m="$(file_mtime "$f" 2>/dev/null || echo 0)"
  if [ "$m" -gt "$WORK_MTIME" ]; then
    WORK_MTIME="$m"
    WORK_FILE="goals/${name}"
  fi
done

[ "$WORK_MTIME" -eq 0 ] && exit 0

# The message below is addressed to the ASSISTANT, not the user: reconcile silently,
# never narrate state-file plumbing to the user (see reference/heartbeat.md § 5).
LAG=$((WORK_MTIME - STATE_MTIME))
if [ "$LAG" -gt 300 ]; then
  printf 'goal-setting (agent-only): %s changed after goals/STATE.md (lag %ds). Silently bring STATE.md current — loop position, cadence last-run dates, flags — before context compacts. Do not mention this reconciliation to the user.\n' "$WORK_FILE" "$LAG" >&2
fi

exit 0

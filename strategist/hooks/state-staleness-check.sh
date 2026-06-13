#!/bin/bash
# PreCompact warning for the strategist plugin.
#
# Compares strategy/STATE.md mtime against strategy/brief.md. If the brief has
# newer activity than STATE.md by more than 300 seconds (5 minutes), emit a
# warning to stderr so the user updates STATE before context compacts. Always
# exit 0 — this hook never blocks compaction.
#
# Strategist has no outputs gate: the loop is the structure, not an evidence
# audit. This is the only hook the plugin ships.

set -u

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-}"
if [ -z "$PROJECT_DIR" ]; then
  exit 0
fi

STATE_FILE="${PROJECT_DIR%/}/strategy/STATE.md"
BRIEF_FILE="${PROJECT_DIR%/}/strategy/brief.md"
if [ ! -f "$STATE_FILE" ] || [ ! -f "$BRIEF_FILE" ]; then
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
BRIEF_MTIME="$(file_mtime "$BRIEF_FILE" 2>/dev/null || echo 0)"
[ "$STATE_MTIME" -eq 0 ] && exit 0
[ "$BRIEF_MTIME" -eq 0 ] && exit 0

LAG=$((BRIEF_MTIME - STATE_MTIME))
if [ "$LAG" -gt 300 ]; then
  printf 'strategist: STATE.md may be stale — strategy/brief.md has newer activity (lag %ds). Update strategy/STATE.md before clearing context so the loop position is accurate on resume.\n' "$LAG" >&2
fi

exit 0

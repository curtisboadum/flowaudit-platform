#!/usr/bin/env bash
# SessionStart hook: Inject tracking context at start of session

set -euo pipefail

PROJECT_DIR="/Users/curtis/Documents/FlowAudit_"
TRACKING_DIR="$PROJECT_DIR/docs/tracking"

# Build context summary
CONTEXT=""

# Current branch
BRANCH=$(git -C "$PROJECT_DIR" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
CONTEXT+="Current branch: $BRANCH\n"

# Pending P0 tasks
if [ -f "$TRACKING_DIR/to-do_list.md" ]; then
  P0_TASKS=$(grep -c '\[ \].*P0\|## P0' "$TRACKING_DIR/to-do_list.md" 2>/dev/null || echo "0")
  CONTEXT+="Open P0 tasks: $P0_TASKS\n"
fi

# Last change
if [ -f "$TRACKING_DIR/change_log.md" ]; then
  LAST_CHANGE=$(grep -m1 '^\- \*\*' "$TRACKING_DIR/change_log.md" 2>/dev/null || echo "No changes recorded")
  CONTEXT+="Last change: $LAST_CHANGE\n"
fi

# Current session status
if [ -f "$TRACKING_DIR/session.md" ]; then
  SESSION_STATUS=$(grep -m1 'Status:' "$TRACKING_DIR/session.md" 2>/dev/null || echo "No session")
  CONTEXT+="Session: $SESSION_STATUS\n"
fi

echo -e "$CONTEXT"

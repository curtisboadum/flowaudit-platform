#!/usr/bin/env bash
# PreToolUse hook for Edit/Write: Block edits on main branch
# Receives tool input JSON on stdin

set -euo pipefail

INPUT=$(cat)

# Get current git branch
BRANCH=$(git -C /Users/curtis/Documents/FlowAudit_ rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

# Allow edits during initial setup (no commits yet)
COMMIT_COUNT=$(git -C /Users/curtis/Documents/FlowAudit_ rev-list --count HEAD 2>/dev/null || echo "0")

if [ "$BRANCH" = "main" ] && [ "$COMMIT_COUNT" -gt "0" ]; then
  FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

  # Allow edits to tracking files and docs even on main
  if echo "$FILE_PATH" | grep -qE '(docs/tracking/|CLAUDE\.md|\.claude/)'; then
    echo '{"decision": "approve"}'
    exit 0
  fi

  echo '{"decision": "block", "reason": "Cannot edit source files on main branch. Create a feature branch first: git checkout -b feat/your-feature"}'
  exit 0
fi

echo '{"decision": "approve"}'

#!/usr/bin/env bash
# PostToolUse hook for Edit/Write: Async TypeScript check
# Receives tool input JSON on stdin

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only typecheck TypeScript files
if echo "$FILE_PATH" | grep -qE '\.(ts|tsx)$'; then
  # Run typecheck in background, non-blocking
  if [ -f /Users/curtis/Documents/FlowAudit_/node_modules/.bin/tsc ]; then
    (cd /Users/curtis/Documents/FlowAudit_ && node_modules/.bin/tsc --noEmit 2>/tmp/flowaudit-typecheck.log) &
  fi
fi

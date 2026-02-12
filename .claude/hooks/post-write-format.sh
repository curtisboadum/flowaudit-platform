#!/usr/bin/env bash
# PostToolUse hook for Edit/Write: Auto-format with Prettier
# Receives tool input JSON on stdin

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only format supported file types
if echo "$FILE_PATH" | grep -qE '\.(ts|tsx|js|jsx|json|css|md|mjs)$'; then
  # Check if prettier is available
  if [ -f /Users/curtis/Documents/FlowAudit_/node_modules/.bin/prettier ]; then
    /Users/curtis/Documents/FlowAudit_/node_modules/.bin/prettier --write "$FILE_PATH" 2>/dev/null || true
  fi
fi

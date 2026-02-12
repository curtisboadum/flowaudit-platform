#!/usr/bin/env bash
# PreToolUse hook for Edit/Write: Warn on .env file modifications
# Receives tool input JSON on stdin

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

if [ -z "$FILE_PATH" ]; then
  echo '{"decision": "approve"}'
  exit 0
fi

# Block writing to actual .env files (not .env.example)
if echo "$FILE_PATH" | grep -qE '\.env(\.local|\.development|\.production|\.test)?$' && ! echo "$FILE_PATH" | grep -q '\.env\.example'; then
  echo '{"decision": "block", "reason": "Cannot write to .env files directly — they may contain secrets. Edit .env.example instead and configure actual values manually."}'
  exit 0
fi

echo '{"decision": "approve"}'

#!/usr/bin/env bash
# PreToolUse hook for Bash: Block destructive shell commands
# Receives tool input JSON on stdin

set -euo pipefail

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  echo '{"decision": "approve"}'
  exit 0
fi

# Block dangerous patterns
DANGEROUS_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "rm -rf \."
  "mkfs\."
  "dd if="
  ":(){:|:&};:"
  "chmod -R 777 /"
  "git clean -fdx"
  "> /dev/sda"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qiF "$pattern"; then
    echo "{\"decision\": \"block\", \"reason\": \"Blocked dangerous command pattern: $pattern\"}"
    exit 0
  fi
done

# Block piping curl/wget to shell
if echo "$COMMAND" | grep -qE 'curl.*\|\s*(sh|bash|zsh)' || echo "$COMMAND" | grep -qE 'wget.*\|\s*(sh|bash|zsh)'; then
  echo '{"decision": "block", "reason": "Blocked: piping download to shell is not allowed"}'
  exit 0
fi

echo '{"decision": "approve"}'

#!/usr/bin/env bash
# Notification hook: Play macOS sound on permission prompt

set -euo pipefail

# Play system sound to alert developer of pending permission
afplay /System/Library/Sounds/Blow.aiff 2>/dev/null &

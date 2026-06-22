#!/usr/bin/env bash
#
# deploy-prod.sh — guarded production deploy for flowaudit.co.uk
#
# WHY: production has repeatedly reverted because `vercel --prod` was run from a
# stale source copy that lacked the current homepage banner and the
# /revenue-recovery integration. This guard refuses to deploy unless the source
# in the current directory actually contains that work, then runs a clean build
# before deploying. Run THIS instead of `vercel --prod` directly.
#
# Usage:  ./scripts/deploy-prod.sh
#
set -euo pipefail

cd "$(dirname "$0")/.."   # repo root regardless of where invoked
ROOT="$(pwd)"
echo "==> deploy root: $ROOT"

fail() { echo "ABORT: $*" >&2; exit 1; }

# --- Guard 1: this must be the live, linked project ---
[ -f .vercel/project.json ] || fail "no .vercel/project.json — this dir is not linked to the Vercel project. Refusing to deploy."
grep -q '"projectName":"flowaudit-platform"' .vercel/project.json \
  || fail ".vercel/project.json is not the flowaudit-platform project. Refusing to deploy."

# --- Guard 2: required current work must be present in source ---
grep -q 'RevenueRecoveryBanner' src/app/page.tsx \
  || fail "homepage is missing <RevenueRecoveryBanner /> — this looks like a STALE copy. Refusing to deploy."
[ -e src/app/revenue-recovery/page.tsx ] \
  || fail "src/app/revenue-recovery/page.tsx is missing — stale copy. Refusing to deploy."
grep -q 'revenue-recovery-web-ivory' next.config.ts \
  || fail "next.config.ts is missing the revenue-recovery rewrite — stale copy. Refusing to deploy."

# --- Guard 3: clean build before deploy ---
echo "==> building (./node_modules/.bin/next build)"
./node_modules/.bin/next build || fail "build failed — not deploying."

# --- Deploy ---
echo "==> all guards passed; deploying to production"
vercel --prod --yes "$@"

echo "==> deployed. Verifying live routes..."
for p in "" "/sop-review" "/readiness" "/mapping"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 25 "https://flowaudit.co.uk/revenue-recovery${p}")
  echo "  ${code}  https://flowaudit.co.uk/revenue-recovery${p}"
done
echo "==> done. If the homepage looks stale, the apex edge cache may need a forced redeploy: ./scripts/deploy-prod.sh --force"

# Deploy to Vercel

Run the full deployment workflow with quality gates.

## Steps

1. Run pre-deploy quality checks:
   - `pnpm typecheck` — TypeScript strict check
   - `pnpm lint` — ESLint check
   - `pnpm test` — Run all tests
   - `pnpm build` — Production build
2. If any check fails, stop and report the errors.
3. Ensure the current branch is ready:
   - If on a feature branch: push and create/update PR
   - If merged to main: verify Vercel auto-deployment triggers
4. After deployment, verify `/api/health` endpoint.
5. Update tracking files:
   - `docs/tracking/change_log.md` with deployment note
   - `docs/tracking/checklist.md` post-deploy section

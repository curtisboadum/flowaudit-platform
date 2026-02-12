# Deployment Workflow

## When to Use
When the user asks to deploy to Vercel or prepare for deployment.

## Instructions

### Pre-Deploy Checklist
1. Run quality gates:
   ```bash
   pnpm typecheck
   pnpm lint
   pnpm test
   pnpm build
   ```
2. Verify all checks pass. Do not deploy if any fail.
3. Check environment variables are configured in Vercel dashboard.
4. Review `docs/tracking/checklist.md` pre-deploy section.

### Deploy
5. Push the branch to GitHub.
6. If deploying to production:
   - Ensure PR is approved and merged to main
   - Vercel auto-deploys from main
7. If deploying a preview:
   - Push the feature branch
   - Vercel creates a preview deployment automatically

### Post-Deploy
8. Verify the deployment:
   ```bash
   curl https://{deployment-url}/api/health
   ```
9. Check Vercel deployment logs for errors.
10. Update `docs/tracking/checklist.md` post-deploy section.
11. Update `docs/tracking/change_log.md` with deployment note.

## Vercel Configuration
- Framework: Next.js (auto-detected)
- Build command: `pnpm build`
- Output directory: `.next`
- Node.js version: 22.x
- Region: IAD1 (US East)

## Environment Variables Required
- `NEXT_PUBLIC_INSTANT_APP_ID`
- `INSTANT_ADMIN_TOKEN`
- `ANTHROPIC_API_KEY`
- `OPENCLAW_API_KEY`
- `OPENCLAW_GATEWAY_URL`

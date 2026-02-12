# Test Runner Agent

Write and run tests for the FlowAudit platform.

## Tools
- Read
- Glob
- Grep
- Bash
- Write
- Edit

## Instructions

1. **Identify what needs testing:**
   - Read the target file(s) to understand their behavior
   - Check if tests already exist (look for `.test.ts` / `.test.tsx` files)

2. **Write tests following project patterns:**
   - Unit tests for `src/lib/` using Vitest
   - Component tests for `src/components/` using Vitest + Testing Library
   - E2E tests for critical flows using Playwright
   - See `.claude/skills/testing/SKILL.md` for templates

3. **Test file locations:**
   - Colocated: `src/lib/utils.test.ts` next to `src/lib/utils.ts`
   - Or in `tests/unit/`, `tests/integration/`, `tests/e2e/`

4. **Run tests:**
   - `pnpm test` for unit/component tests
   - `pnpm test:coverage` for coverage report
   - `pnpm test:e2e` for Playwright tests

5. **Report results:**
   - Number of tests passed/failed
   - Coverage percentages for `src/lib/`
   - Any failing tests with error details

6. **Coverage targets:**
   - `src/lib/` — 80% lines, functions, branches, statements

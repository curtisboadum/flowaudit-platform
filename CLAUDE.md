# FlowAudit Platform

FlowAudit is an AI agency that sells "moat bots" — workflow automation agents built on OpenClaw — to businesses. This is the core platform for managing clients, agents, and workflows.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Node.js | 22+ |
| Language | TypeScript | Strict mode |
| Framework | Next.js (App Router only) | 15+ |
| Database | InstantDB | Latest |
| AI Agents | OpenClaw | Latest |
| AI Models | Claude API (Anthropic SDK) | Latest |
| Styling | Tailwind CSS + shadcn/ui | v4 |
| Package Manager | pnpm | Latest |
| Testing | Vitest + Playwright | Latest |
| Hosting | Vercel | Latest |

## Architecture

```
Browser → Next.js (Vercel) → InstantDB + OpenClaw + Claude API
```

See `docs/architecture/overview.md` for full diagram.

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/app/` | App Router: pages, layouts, API routes |
| `src/app/api/` | API route handlers |
| `src/components/` | React components (ui/, layout/, agents/, clients/, shared/) |
| `src/lib/` | Shared libraries: instant.ts, openclaw.ts, anthropic.ts, utils.ts |
| `src/hooks/` | Custom React hooks |
| `src/types/` | TypeScript type definitions |
| `openclaw/` | OpenClaw agent configs and skill definitions |
| `tests/` | Test files (unit/, integration/, e2e/) |
| `docs/tracking/` | Session tracking, change log, to-do list, checklists, insights, decisions |

## Coding Conventions

### TypeScript
- **Strict mode always** — `strict: true`, `noUncheckedIndexedAccess: true`
- **No `any`** — use `unknown` + type narrowing
- **No `eval()`** or dynamic code execution
- **No non-null assertions (`!`)** — handle nullability properly
- **Use `satisfies` operator** for type-safe object literals

### File & Naming
- **kebab-case** for all file names: `agent-card.tsx`, `use-agents.ts`
- **PascalCase** for components and types: `AgentCard`, `ClientStatus`
- **camelCase** for functions and variables: `fetchAgents`, `isActive`
- **`@/` path alias** for all imports from `src/`

### Import Ordering
1. React/Next.js imports
2. External libraries
3. `@/lib/` imports
4. `@/components/` imports
5. `@/hooks/` imports
6. `@/types/` imports
7. Relative imports

### Components
- **Server Components by default** — only add `"use client"` when needed
- **Props interface colocated** with component, named `{Component}Props`
- **No barrel files** (`index.ts` re-exports) — import directly from component files
- **Prefer composition** over prop drilling

### Error Handling
- **Result pattern** for `src/lib/` functions — use `Result<T, E>` from `@/lib/utils`
- **HTTP status codes** for API routes — 200, 201, 400, 401, 404, 500
- **try/catch at boundaries** — API routes and event handlers only
- **Never swallow errors silently**

## InstantDB Patterns

- Schema defined in `instant.schema.ts` at project root
- Permissions in `instant.perms.ts`
- Client initialized in `src/lib/instant.ts`
- Use `useQuery()` for reads, `transact()` for writes
- All entities are typed via schema inference

## OpenClaw Patterns

- Agent configs use JSON5 format in `openclaw/agents/{name}/config.json5`
- Each agent has a `skills/` subdirectory
- Gateway config in `openclaw/gateway/config.json5`
- Template for new agents in `openclaw/agents/template/`

## Testing Strategy

| Type | Tool | Location | Coverage Target |
|------|------|----------|----------------|
| Unit | Vitest | `src/**/*.test.ts` or `tests/unit/` | 80% for `src/lib/` |
| Component | Vitest + Testing Library | `src/**/*.test.tsx` | Key components |
| E2E | Playwright | `tests/e2e/` | Critical flows |

## Common Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm lint         # ESLint check
pnpm typecheck    # TypeScript strict check
pnpm test         # Run Vitest tests
pnpm test:e2e     # Run Playwright tests
pnpm format       # Format with Prettier
pnpm db:push      # Push InstantDB schema
```

## Git Workflow

- **Never commit directly to `main`** — always use feature branches
- **Branch naming**: `feat/`, `fix/`, `chore/`, `docs/` prefixes
- **Conventional commits**: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`
- **Squash merge** PRs into main
- **Run `pnpm typecheck && pnpm lint && pnpm test`** before creating PRs

## Agent Team Coordination

When working in agent teams:
- **Lead** coordinates tasks, creates PRs, updates `docs/tracking/`
- **Frontend agent** works on `src/app/`, `src/components/`
- **Backend agent** works on `src/app/api/`, `src/lib/`, `openclaw/`
- **Testing agent** works on `tests/` and colocated test files
- **Docs agent** works on `docs/`
- **Never edit the same file from two agents simultaneously**
- **Always run `pnpm typecheck` before marking a task complete**

## Security Constraints

- Never commit secrets or API keys — use environment variables
- No `any` type — use `unknown` with type guards
- No `eval()`, `Function()`, or dynamic code execution
- No `dangerouslySetInnerHTML` without sanitization
- Validate all user input at API boundaries
- Use parameterized queries (InstantDB handles this)

## Anti-Patterns (Never Do These)

- No `pages/` directory — App Router only
- No Firebase or Supabase — we use InstantDB
- No Redux or Zustand — use React state + InstantDB realtime
- No axios — use native `fetch`
- No barrel files (`index.ts` re-exports)
- No CSS modules or styled-components — Tailwind only
- No `React.FC` — use function declarations with typed props

## Tracking Files

All tracking files live in `docs/tracking/`:

| File | Purpose |
|------|---------|
| `session.md` | Current session goals and context |
| `change_log.md` | Chronological record of all changes |
| `to-do_list.md` | Tasks with priorities [P0-P3] and status |
| `checklist.md` | Quality gates for commits and deploys |
| `insights.md` | Learnings, patterns, solutions |
| `decisions.md` | Architecture Decision Records (ADR format) |

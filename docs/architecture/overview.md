# FlowAudit Platform Architecture

## System Overview

```
┌─────────────┐     ┌──────────────────────┐     ┌─────────────┐
│   Browser    │────▶│   Next.js (Vercel)    │────▶│  InstantDB   │
│   Client     │◀────│   App Router + API    │◀────│  (Realtime)  │
└─────────────┘     └──────────┬───────────┘     └─────────────┘
                               │
                    ┌──────────┼───────────┐
                    ▼                      ▼
             ┌─────────────┐       ┌─────────────┐
             │   OpenClaw   │       │  Claude API  │
             │   Gateway    │       │  (Anthropic) │
             └─────────────┘       └─────────────┘
```

## Layers

| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| Frontend | Next.js App Router + React 19 | UI, routing, SSR |
| Styling | Tailwind CSS + shadcn/ui | Design system |
| Database | InstantDB | Realtime data, auth |
| AI Agents | OpenClaw + Claude API | Workflow automation |
| Hosting | Vercel | Deployment, edge functions |

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `src/app/` | Next.js App Router pages and API routes |
| `src/components/` | React components (ui, layout, agents, clients, shared) |
| `src/lib/` | Shared libraries (InstantDB, OpenClaw, Anthropic clients) |
| `src/types/` | TypeScript type definitions |
| `src/hooks/` | Custom React hooks |
| `openclaw/` | OpenClaw agent configs and skills |
| `tests/` | Test files (unit, integration, e2e) |
| `docs/` | Documentation and tracking files |

## Data Flow

1. **Client Dashboard**: Browser <-> Next.js <-> InstantDB (realtime subscriptions)
2. **Agent Management**: Dashboard -> API Route -> OpenClaw Gateway -> Agent execution
3. **Agent Runs**: OpenClaw Agent -> Claude API -> Tool execution -> Results stored in InstantDB

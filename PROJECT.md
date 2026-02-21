# PROJECT.md — FlowAudit

## Overview
FlowAudit — AI agency platform. Sells "moat bots" (workflow automation agents built on OpenClaw) to businesses. Core platform for managing clients, agents, and workflows. Co-founded by Curtis (CTO) and Kofi (CEO).

## Live URL
- Production: [Vercel deployment]

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Database | InstantDB |
| AI | Anthropic SDK (Claude API) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Charts | Recharts |
| PDF | jsPDF |
| Carousel | Embla Carousel |
| Package Manager | pnpm |
| Testing | Vitest + Playwright |
| Deployment | Vercel |

## Architecture
- Next.js App Router (server components + server actions)
- InstantDB for real-time database
- Claude API for AI agent functionality
- shadcn/ui components with Radix primitives

## Business Model
See `~/.openclaw/workspace/memory/procedures/flowaudit-webdesign-plan.md` for full business plan.
- Rental/subscription model
- 8 products (website + 7 upsells)
- £712/mo everything stack

## Key Context
- FlowAudit is separate from Traqd — different brand, different colors, different identity
- Curtis is CTO, Kofi is CEO
- Target: businesses needing workflow automation

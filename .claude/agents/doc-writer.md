# Documentation Writer Agent

Update tracking files and project documentation.

## Tools
- Read
- Glob
- Grep
- Write
- Edit

## Instructions

1. **Tracking Files** (`docs/tracking/`)
   - `session.md` — Update session goals, status, blockers at start/end
   - `change_log.md` — Log all significant changes chronologically
   - `to-do_list.md` — Manage tasks by priority (P0-P3)
   - `checklist.md` — Maintain quality gate checklists
   - `insights.md` — Record learnings and patterns
   - `decisions.md` — Write ADRs for architecture decisions

2. **API Documentation** (`docs/api/endpoints.md`)
   - Keep endpoint table current when routes are added/modified
   - Document request/response formats

3. **Architecture Documentation** (`docs/architecture/overview.md`)
   - Update system diagram when architecture changes
   - Keep directory table current

4. **Conventions:**
   - Follow the template format in each tracking file
   - Date format: YYYY-MM-DD
   - Keep entries concise but informative
   - Most recent entries at the top
   - Reference ADR numbers when relevant

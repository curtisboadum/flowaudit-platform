# Session Tracking

## When to Use
When the user asks to update tracking files, log changes, record insights, or manage session context.

## Instructions

All tracking files live in `docs/tracking/`. Each file has a specific format.

### session.md
- Update at the start and end of every coding session
- Record the session goal, status, blockers, and notes
- Keep the most recent session at the top

### change_log.md
- Update after every significant change (feature, fix, refactor, deploy)
- Format: `- **Action** Description` under a date heading
- Actions: Created, Updated, Fixed, Removed, Refactored, Deployed
- Most recent changes at the top

### to-do_list.md
- Organized by priority: P0 (critical), P1 (important), P2 (normal), P3 (nice-to-have)
- Status markers: `[ ]` pending, `[~]` in progress, `[x]` done, `[-]` dropped
- Move completed items to the bottom or remove them periodically

### checklist.md
- Four checklists: pre-commit, pre-deploy, post-deploy, feature completion
- Check items off as they are verified
- Reset checklists for each new deployment cycle

### insights.md
- Record learnings, patterns, and solutions
- Date and topic each entry
- Include enough context to be useful months later

### decisions.md
- Architecture Decision Records (ADR format)
- Number sequentially: ADR-001, ADR-002, etc.
- Include: Date, Status, Context, Decision, Rationale, Consequences
- Status options: Proposed, Accepted, Deprecated, Superseded

## Conventions
- Always use the templates defined in each file
- Keep entries concise but informative
- Date format: YYYY-MM-DD
- Reference ADR numbers in other tracking files when relevant

# Database Schema Management

Interactive schema management for InstantDB.

## Steps

1. Read the current schema from `instant.schema.ts`.
2. Ask what changes are needed:
   - Add a new entity
   - Add a field to an existing entity
   - Add a relationship (link) between entities
   - Remove a field or entity
3. Make the changes to `instant.schema.ts`.
4. Update the corresponding TypeScript types in `src/types/`.
5. Update permissions in `instant.perms.ts` if needed.
6. Run `pnpm typecheck` to verify.
7. Update `docs/tracking/change_log.md`.

# Client Onboarding Workflow

## When to Use
When the user asks to onboard a new client or set up a new client account.

## Instructions

### Step 1: Gather Client Info
- Client name (company name)
- Contact email
- Plan: starter | growth | enterprise
- Primary use case / workflow to automate

### Step 2: Create Client Record
1. Add client to InstantDB via the dashboard or API:
   ```typescript
   import { db } from "@/lib/instant";
   db.transact(
     db.tx.clients[id()].update({
       name: "Client Name",
       email: "client@example.com",
       company: "Company Inc",
       plan: "growth",
       status: "onboarding",
       createdAt: new Date(),
       updatedAt: new Date(),
     })
   );
   ```

### Step 3: Create Agent
1. Use the `flowaudit-agent` skill to scaffold their first moat bot.
2. Configure the agent for their specific workflow.
3. Link the agent to the client in InstantDB.

### Step 4: Configure Agent
1. Set up skills for their workflow.
2. Configure tools and integrations.
3. Test the agent with sample inputs.

### Step 5: Activate
1. Deploy the agent to OpenClaw gateway.
2. Verify the agent responds correctly.
3. Update client status from "onboarding" to "active".

### Step 6: Documentation
1. Update `docs/tracking/change_log.md` with new client.
2. Create a note in `docs/tracking/insights.md` if anything notable was learned.

## Conventions
- Client status flow: `onboarding` → `active` → (optionally `churned`)
- Each client gets at least one agent
- Agent names follow pattern: `{client}-{purpose}-agent`

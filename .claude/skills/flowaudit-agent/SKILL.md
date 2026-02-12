# FlowAudit Agent Scaffold

## When to Use
When the user asks to create a new bot, agent, moat worker, or moat bot for a client.

## Instructions

1. Ask for the client name and agent purpose if not provided.
2. Create the agent directory structure:
   ```
   openclaw/agents/{client-name}-{agent-name}/
   ├── config.json5
   └── skills/
       └── {skill-name}/
           └── skill.json5
   ```
3. Copy and customize from `openclaw/agents/template/config.json5`.
4. Set the agent name, description, and system prompt based on the client's use case.
5. Create at least one skill definition for the agent's primary capability.
6. Add the agent to the InstantDB schema if not already tracked.
7. Update `docs/tracking/change_log.md` with the new agent.

## Agent Config Template (JSON5)
```json5
{
  name: "{client}-{purpose}-agent",
  description: "Moat bot for {client}: {description}",
  model: "claude-sonnet-4-5-20250929",
  max_tokens: 4096,
  temperature: 0.3,
  system_prompt: "You are a {purpose} automation agent for {client}. {detailed instructions}",
  skills: ["{skill-directory-name}"],
  tools: [],
  gateway: {
    url: "${OPENCLAW_GATEWAY_URL}",
    auth: "bearer",
  },
}
```

## Conventions
- Agent names: `{client}-{purpose}-agent` (kebab-case)
- One agent per client workflow
- Keep system prompts focused and specific to the client's domain
- Always test agent invocation after creation

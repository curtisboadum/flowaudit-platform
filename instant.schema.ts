import { i } from "@instantdb/react";

const schema = i.schema({
  entities: {
    clients: i.entity({
      name: i.string(),
      email: i.string().unique(),
      company: i.string(),
      plan: i.string(),
      status: i.string(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),
    agents: i.entity({
      name: i.string(),
      status: i.string(),
      config: i.json(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),
    workflows: i.entity({
      name: i.string(),
      description: i.string(),
      trigger: i.json(),
      steps: i.json(),
      status: i.string(),
      createdAt: i.date(),
      updatedAt: i.date(),
    }),
    agentRuns: i.entity({
      status: i.string(),
      input: i.json(),
      output: i.json().optional(),
      startedAt: i.date(),
      completedAt: i.date().optional(),
      error: i.string().optional(),
    }),
  },
  links: {
    clientAgents: {
      forward: { on: "clients", has: "many", label: "agents" },
      reverse: { on: "agents", has: "one", label: "client" },
    },
    agentWorkflows: {
      forward: { on: "agents", has: "many", label: "workflows" },
      reverse: { on: "workflows", has: "one", label: "agent" },
    },
    agentAgentRuns: {
      forward: { on: "agents", has: "many", label: "runs" },
      reverse: { on: "agentRuns", has: "one", label: "agent" },
    },
  },
});

export default schema;

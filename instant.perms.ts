// InstantDB permissions
// Docs: https://www.instantdb.com/docs/permissions

export default {
  clients: {
    allow: {
      // Restrict to authenticated admin users
      view: "false",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
  agents: {
    allow: {
      view: "false",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
  workflows: {
    allow: {
      view: "false",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
  agentRuns: {
    allow: {
      view: "false",
      create: "false",
      update: "false",
      delete: "false",
    },
  },
};

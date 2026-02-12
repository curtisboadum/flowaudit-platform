export interface Agent {
  id: string;
  name: string;
  clientId: string;
  status: "active" | "paused" | "error" | "draft";
  skills: AgentSkill[];
  config: AgentConfig;
  createdAt: string;
  updatedAt: string;
}

export interface AgentSkill {
  id: string;
  name: string;
  description: string;
  trigger: string;
}

export interface AgentConfig {
  model: string;
  maxTokens: number;
  temperature: number;
  systemPrompt: string;
  tools: string[];
}

export interface AgentRun {
  id: string;
  agentId: string;
  status: "pending" | "running" | "completed" | "failed";
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  startedAt: string;
  completedAt: string | null;
  error: string | null;
}

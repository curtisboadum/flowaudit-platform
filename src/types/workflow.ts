export interface Workflow {
  id: string;
  name: string;
  description: string;
  agentId: string;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  status: "active" | "paused" | "draft";
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowTrigger {
  type: "schedule" | "webhook" | "event" | "manual";
  config: Record<string, unknown>;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: "action" | "condition" | "loop" | "wait";
  config: Record<string, unknown>;
  nextStepId: string | null;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  status: "pending" | "running" | "completed" | "failed";
  steps: WorkflowStepRun[];
  startedAt: string;
  completedAt: string | null;
}

export interface WorkflowStepRun {
  stepId: string;
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  output: Record<string, unknown> | null;
  error: string | null;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: "starter" | "growth" | "enterprise";
  status: "active" | "onboarding" | "churned";
  agentIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ClientOnboarding {
  clientId: string;
  steps: OnboardingStep[];
  completedAt: string | null;
}

export interface OnboardingStep {
  id: string;
  name: string;
  status: "pending" | "in_progress" | "completed" | "skipped";
  completedAt: string | null;
}

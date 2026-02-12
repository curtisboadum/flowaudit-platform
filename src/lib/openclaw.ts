const OPENCLAW_GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL ?? "https://gateway.openclaw.ai";
const OPENCLAW_API_KEY = process.env.OPENCLAW_API_KEY ?? "";

export interface OpenClawAgentConfig {
  id: string;
  name: string;
  skills: string[];
  gatewayUrl: string;
}

export async function invokeAgent(agentId: string, input: Record<string, unknown>) {
  const response = await fetch(`${OPENCLAW_GATEWAY_URL}/agents/${agentId}/invoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENCLAW_API_KEY}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`OpenClaw agent invocation failed: ${response.status}`);
  }

  return response.json() as Promise<Record<string, unknown>>;
}

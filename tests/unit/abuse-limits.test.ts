// @vitest-environment node
import { beforeEach, it, expect, vi } from "vitest";
vi.mock("@/lib/durable-rate-limit", () => ({ takeRateLimit: vi.fn() }));
import { takeRateLimit } from "@/lib/durable-rate-limit";
import { POST as login } from "@/app/api/crm/auth/login/route";
import { POST as chat } from "@/app/api/chat/route";
beforeEach(() => {
  vi.mocked(takeRateLimit).mockReset();
  vi.stubEnv("CHAT_ENABLED", "true");
});
const req = (body = "{}", origin?: string) =>
  new Request("https://flowaudit.co.uk/api/crm/auth/login", {
    method: "POST",
    body,
    headers: origin ? { origin } : undefined,
  });
it("rejects foreign login origins before consuming a limit", async () => {
  expect((await login(req("{}", "https://example.test"))).status).toBe(403);
  expect(takeRateLimit).not.toHaveBeenCalled();
});
it("blocks excessive login attempts with 429", async () => {
  vi.mocked(takeRateLimit).mockResolvedValue(false);
  expect((await login(req())).status).toBe(429);
});
it("fails closed when login rate storage is unavailable", async () => {
  vi.mocked(takeRateLimit).mockResolvedValue(null);
  expect((await login(req())).status).toBe(503);
});
it("bounds login payload size", async () => {
  vi.mocked(takeRateLimit).mockResolvedValue(true);
  expect((await login(req("x".repeat(2049)))).status).toBe(413);
});
it("blocks chat before invoking a paid provider", async () => {
  vi.mocked(takeRateLimit).mockResolvedValue(false);
  expect((await chat(req())).status).toBe(429);
  expect(takeRateLimit).toHaveBeenCalledWith(expect.any(Request), "chat", 20);
});

it("keeps disabled chat from invoking any provider or rate store", async () => {
  vi.stubEnv("CHAT_ENABLED", "false");
  expect((await chat(req())).status).toBe(503);
  expect(takeRateLimit).not.toHaveBeenCalled();
});

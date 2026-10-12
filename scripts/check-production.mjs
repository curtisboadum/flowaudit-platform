import { writeFile } from "node:fs/promises";
const base = "http://localhost:3016",
  checks = [];
for (const path of [
  "/api/crm/leads",
  "/api/crm/auth/me",
  "/crm",
  "/robots.txt",
  "/sitemap.xml",
  "/opengraph-image",
  "/revenue-recovery/theme.css",
]) {
  const r = await fetch(base + path, { redirect: "manual" });
  checks.push({
    path,
    status: r.status,
    location: r.headers.get("location"),
    type: r.headers.get("content-type"),
  });
}
const bad = await fetch(base + "/api/events", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ email: "private@example.test" }),
});
checks.push({ check: "Invalid analytics body rejected", status: bad.status });
const foreign = await fetch(base + "/api/events", {
  method: "POST",
  headers: { origin: "https://example.test" },
  body: "{}",
});
checks.push({ check: "Foreign origin rejected", status: foreign.status });
const webhook = await fetch(base + "/api/cal/webhook", { method: "POST", body: "{}" });
checks.push({ check: "Unconfigured webhook fails closed", status: webhook.status });
await writeFile("docs/redesign/evidence/integration-checks.json", JSON.stringify(checks, null, 2));
console.log(JSON.stringify(checks, null, 2));

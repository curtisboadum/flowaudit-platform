import { defineConfig } from "@playwright/test";
export default defineConfig({
  webServer: process.env.QA_URL
    ? undefined
    : {
        command: "npm run start -- --port 3016",
        url: "http://localhost:3016",
        reuseExistingServer: !process.env.CI,
      },
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL: process.env.QA_URL ?? "http://localhost:3016",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  reporter: [["list"], ["json", { outputFile: "docs/redesign/evidence/e2e-results.json" }]],
});

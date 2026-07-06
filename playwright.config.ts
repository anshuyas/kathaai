import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  globalSetup: "./tests/global-setup.ts",
  fullyParallel: false, // run sequentially, since tests share the same test DB
  workers: 1,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000", // adjust if your frontend runs on a different port
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
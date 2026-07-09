import { test, expect, request as playwrightRequest } from "@playwright/test";

const BACKEND_URL = "http://localhost:5000";

test.describe("Signup flow (full multi-step UI)", () => {
  const uniqueEmail = `e2e-student-${Date.now()}@example.com`;

  test("student can complete the full signup wizard and lands in the library", async ({ page }) => {
    await page.goto("/signup");

    // Step 1: Role
    await page.getByRole("button", { name: "Student" }).click();
    await page.getByRole("link", { name: /next step/i }).click();

    await expect(page).toHaveURL(/\/signup\/info/);

    // Step 2: Info
    await page.getByPlaceholder("Enter your fullname").fill("E2E Test Student");
    await page.getByPlaceholder("Enter your email").fill(uniqueEmail);
    await page.getByRole("link", { name: /next step/i }).click();

    await expect(page).toHaveURL(/\/signup\/security/);

    // Step 3: Security
    const passwordFields = page.getByPlaceholder("••••••••");
    await passwordFields.nth(0).fill("password123");
    await passwordFields.nth(1).fill("password123");
    await page.getByRole("link", { name: /create my account/i }).click();

    await expect(page).toHaveURL(/\/signup\/success/);

    // Step 4: Success — triggers actual registration
    await page.getByRole("button", { name: /enter the library/i }).click();

    await expect(page).toHaveURL(/\/library/);
  });
});

test.describe("Login flow and role-based redirects", () => {
  // Create teacher and parent users directly via API (faster than the full UI wizard for setup)
  const teacherEmail = `e2e-teacher-${Date.now()}@example.com`;
  const parentEmail = `e2e-parent-${Date.now()}@example.com`;

  test.beforeAll(async () => {
    const apiContext = await playwrightRequest.newContext();

    await apiContext.post(`${BACKEND_URL}/api/auth/register`, {
      data: {
        fullName: "E2E Teacher",
        email: teacherEmail,
        password: "password123",
        role: "teacher",
      },
    });

    await apiContext.post(`${BACKEND_URL}/api/auth/register`, {
      data: {
        fullName: "E2E Parent",
        email: parentEmail,
        password: "password123",
        role: "parent",
      },
    });
  });

  test("teacher logs in and lands on teacher dashboard", async ({ page }) => {
    await page.goto("/signin");
    await page.getByPlaceholder("Enter your email").fill(teacherEmail);
    await page.getByPlaceholder("••••••••").fill("password123");
    await page.getByRole("button", { name: /start exploring/i }).click();

    await expect(page).toHaveURL(/\/teacher\/dashboard/);
  });

  test("parent logs in and lands on parent dashboard", async ({ page }) => {
    await page.goto("/signin");
    await page.getByPlaceholder("Enter your email").fill(parentEmail);
    await page.getByPlaceholder("••••••••").fill("password123");
    await page.getByRole("button", { name: /start exploring/i }).click();

    await expect(page).toHaveURL(/\/parent/);
  });

  test("wrong password shows an error and does not redirect", async ({ page }) => {
    await page.goto("/signin");
    await page.getByPlaceholder("Enter your email").fill(teacherEmail);
    await page.getByPlaceholder("••••••••").fill("wrongpassword");
    await page.getByRole("button", { name: /start exploring/i }).click();

    await expect(page.getByText(/invalid password/i)).toBeVisible();
    await expect(page).toHaveURL(/\/signin/);
  });
});

test.describe("Auth guard redirects", () => {
  test("unauthenticated user is redirected to signin from teacher dashboard", async ({ page }) => {
    await page.goto("/teacher/dashboard");
    await expect(page).toHaveURL(/\/signin/);
  });
});
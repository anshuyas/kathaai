import { test, expect, request as playwrightRequest } from "@playwright/test";

const BACKEND_URL = "http://localhost:5000";

const mockStoryResponse = {
  success: true,
  message: "Story generated successfully",
  data: {
    _id: "000000000000000000000001",
    title: "The Brave Little Fox",
    scenes: [
      {
        sceneNo: 1,
        text: "Once upon a time, a fox lived in the forest.",
        imageUrl: "https://fake-image.test/fox.png",
      },
    ],
    coverImage: "https://fake-image.test/fox.png",
    status: "pending_approval",
  },
};

test.describe("Student: create story flow", () => {
  const studentEmail = `e2e-create-student-${Date.now()}@example.com`;

  test.beforeAll(async () => {
    const apiContext = await playwrightRequest.newContext();
    await apiContext.post(`${BACKEND_URL}/api/auth/register`, {
      data: {
        fullName: "E2E Create Student",
        email: studentEmail,
        password: "password123",
        role: "student",
      },
    });
  });

  test("student fills the form, generates a story (mocked), and submits for approval", async ({ page }) => {
    await page.goto("/signin");
    await page.getByPlaceholder("Enter your email").fill(studentEmail);
    await page.getByPlaceholder("••••••••").fill("password123");
    await page.getByRole("button", { name: /start exploring/i }).click();
    await expect(page).toHaveURL(/\/library/);

    await page.route("**/api/ai/generate-story", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockStoryResponse),
      });
    });

    await page.route("**/api/story/*/submit", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, data: { status: "pending_approval" } }),
      });
    });

    await page.goto("/create");

    await page.getByPlaceholder("type here").fill("A story about a brave fox");

    await page.getByText("Adventure", { exact: true }).click();
    await page.getByRole("button", { name: "Fantasy" }).click();

    await page.getByRole("button", { name: /generate story/i }).click();

    await expect(page.getByText("The Brave Little Fox")).toBeVisible();
    await expect(page.getByText("Once upon a time, a fox lived in the forest.")).toBeVisible();

    await page.getByRole("button", { name: /request approval/i }).click();

    await expect(page.getByText(/story submitted/i)).toBeVisible();
    await expect(page.getByText(/pending approval/i)).toBeVisible();
  });
});

test.describe("Teacher: approval flow", () => {
  const teacherEmail = `e2e-approve-teacher-${Date.now()}@example.com`;
  const authorEmail = `e2e-story-author-${Date.now()}@example.com`;
  let authorId: string;
  let storyId: string;

  test.beforeAll(async () => {
    const apiContext = await playwrightRequest.newContext();

    await apiContext.post(`${BACKEND_URL}/api/auth/register`, {
      data: {
        fullName: "E2E Approval Teacher",
        email: teacherEmail,
        password: "password123",
        role: "teacher",
      },
    });

    const authorRes = await apiContext.post(`${BACKEND_URL}/api/auth/register`, {
      data: {
        fullName: "E2E Story Author",
        email: authorEmail,
        password: "password123",
        role: "student",
      },
    });
    const authorBody = await authorRes.json();
    authorId = authorBody.user.id;

    const storyRes = await apiContext.post(`${BACKEND_URL}/api/story/save`, {
      data: {
        title: "Seeded Test Story For Approval",
        userId: authorId,
        genre: "Adventure",
        scenes: [{ sceneNo: 1, text: "A test scene.", imageUrl: "https://image.pollinations.ai/prompt/test%20scene" }],
      },
    });
    const storyBody = await storyRes.json();
    storyId = storyBody.data?._id;
  });

  test("teacher sees the pending story and approves it", async ({ page }) => {

    await page.goto("/signin");
    await page.getByPlaceholder("Enter your email").fill(teacherEmail);
    await page.getByPlaceholder("••••••••").fill("password123");
    await page.getByRole("button", { name: /start exploring/i }).click();

    await expect(page).toHaveURL(/\/teacher\/dashboard/);

    await page.waitForLoadState("networkidle");

    const hasError = await page.getByText(/couldn't load/i).isVisible().catch(() => false);
    if (hasError) {
      await page.reload();
      await page.waitForLoadState("networkidle");
    }

    await expect(page.getByText("Seeded Test Story For Approval")).toBeVisible();

    const storyCard = page.locator("div.rounded-3xl.bg-white.p-5.shadow", {
  hasText: "Seeded Test Story For Approval",
});

await storyCard.getByRole("button", { name: "Approve" }).click();

await expect(page.getByText("Seeded Test Story For Approval")).not.toBeVisible();

await page.getByRole("button", { name: "Approved" }).click();
await expect(page.getByText("Seeded Test Story For Approval")).toBeVisible();
  });
});
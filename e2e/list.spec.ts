import { test, expect } from "@playwright/test";

test("list view boots and renders core UI", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Pokédex", level: 1 })
  ).toBeVisible({ timeout: 30_000 });

  await expect(page.getByRole("searchbox")).toBeVisible();
  await expect(page.getByText("filter by type")).toBeVisible({
    timeout: 30_000,
  });
  // Page navigator renders once tiles + pagination are ready.
  await expect(page.getByRole("textbox").first()).toHaveValue("1", {
    timeout: 30_000,
  });
});

import { test, expect } from "@playwright/test";

test("next-page button advances the page counter", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByAltText("Bulbasaur - a pokemon")
  ).toBeVisible({ timeout: 30_000 });

  // The page-number input appears twice (top + bottom nav). Use the first.
  const pageInput = page.getByRole("textbox").first();
  await expect(pageInput).toHaveValue("1");

  await page.getByRole("button", { name: "next >" }).first().click();

  await expect(pageInput).toHaveValue("2");
  // Bulbasaur (id 1) should not be on page 2.
  await expect(page.getByAltText("Bulbasaur - a pokemon")).toHaveCount(0);
});

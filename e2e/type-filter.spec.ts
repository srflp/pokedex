import { test, expect } from "@playwright/test";

test("type filter restricts the list to the selected type", async ({
  page,
}) => {
  await page.goto("/");

  // Wait for the type filter to finish its initial fetch.
  await expect(
    page.getByRole("button", { name: "Fire", exact: true })
  ).toBeVisible({ timeout: 30_000 });

  await page.getByRole("button", { name: "Fire", exact: true }).click();

  // Charmander is fire-type and on page 1 of fire results.
  await expect(
    page.getByAltText("Charmander - a pokemon")
  ).toBeVisible({ timeout: 30_000 });

  // Bulbasaur is grass-type — should not be present.
  await expect(page.getByAltText("Bulbasaur - a pokemon")).toHaveCount(0);
});

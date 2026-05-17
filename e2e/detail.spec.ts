import { test, expect } from "@playwright/test";

test("clicking a tile opens the detail view; back returns to the list", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByAltText("Bulbasaur - a pokemon")).toBeVisible({
    timeout: 30_000,
  });

  await page.getByAltText("Bulbasaur - a pokemon").click();

  await expect(page).toHaveURL(/\/pokemon\/bulbasaur$/);
  await expect(page.getByRole("heading", { name: "Bulbasaur", level: 1 })).toBeVisible({
    timeout: 30_000,
  });
  // Stats row text is "HP <value> <emoji>" — substring match on "HP".
  await expect(page.getByText("HP").first()).toBeVisible();
  await expect(page.getByText(/Height:/)).toBeVisible();

  await page.getByRole("button", { name: "< back" }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { name: "Pokédex", level: 1 })).toBeVisible();
});

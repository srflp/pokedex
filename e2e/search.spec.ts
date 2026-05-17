import { test, expect } from "@playwright/test";

test("search filters tiles to the matching pokemon", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Pokédex", level: 1 })).toBeVisible({
    timeout: 30_000,
  });

  // Wait for tiles to load (Bulbasaur is on the default first page).
  await expect(page.getByAltText("Bulbasaur - a pokemon")).toBeVisible({
    timeout: 30_000,
  });

  await page.getByRole("searchbox").fill("pikachu");

  await expect(page.getByAltText("Pikachu - a pokemon")).toBeVisible();
  // Bulbasaur should no longer match the filter.
  await expect(page.getByAltText("Bulbasaur - a pokemon")).toHaveCount(0);
});

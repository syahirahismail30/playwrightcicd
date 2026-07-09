/// my first playwright spec file

import { test, expect } from '@playwright/test';
test("TestCase1", async ({ page }) => {
    await page.goto("https://blazedemo.com/");
    await expect(page).toHaveTitle("BlazeDemo");
    await page.waitForTimeout(3000);

    await page.locator("select[name='fromPort']").selectOption({ label: "Boston" });
    await page.locator("select[name='toPort']").selectOption({ label: "London" });
    await page.locator("input[type='submit']").click();

    await expect(page).toHaveURL(/reserve\.php/);
    await expect(page.locator("h3")).toContainText("Flights from Boston to London");
    await expect(page.locator("tbody > tr")).toHaveCount(5);
    await page.waitForTimeout(3000);
});
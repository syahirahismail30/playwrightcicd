/// select departure and destination city, then search flights

import { test, expect } from '@playwright/test';

test("TestCase2", async ({ page }) => {
    await page.goto("https://blazedemo.com/");

    await page.locator("select[name='fromPort']").selectOption({ label: "Boston" });
    await page.locator("select[name='toPort']").selectOption({ label: "London" });
    await page.locator("input[type='submit']").click();

    await expect(page).toHaveURL(/reserve\.php/);
    await expect(page.locator("h3")).toContainText("Flights from Boston to London");
    await page.waitForTimeout(3000);
});
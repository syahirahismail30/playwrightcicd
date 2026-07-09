/// --------Amazon.com search validation-------

import { test, expect } from '@playwright/test'; // importing test and expect from playwright
test("TestCase4", async ({page}) =>{ // defining a test case named "TestCase4"
    await page.goto("https://playwright.dev/"); // navigating to the Playwright homepage
    await page.locator("a[role='button']").hover() 
    await page.waitForTimeout (3000);
    await expect(page.locator(".navbar__title")).toHaveText("Playwright") // check if the navbar title is "Playwright"

    await page.locator("//li/a[text()='Java']").click()
    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator(".navbar__title")).toHaveText("Playwright for Java")
    
})
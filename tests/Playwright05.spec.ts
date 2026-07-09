/// --------Interacting with Browser Popup-------

import { test, expect } from '@playwright/test'; // importing test and expect from playwright
test("TestCase5", async ({page}) =>{ // defining a test case named "TestCase5"
    await page.goto("https://playwright.dev/"); // navigating to the Playwright homepage
    await page.waitForTimeout (2000)
    
    await page.locator("a[aria-label='GitHub repository']").click()
    let popup = await page.waitForEvent('popup')
    await popup.waitForLoadState()
    await page.waitForTimeout (2000)
    await expect(popup.locator("h1.heading-element")).toBeVisible() // check if the navbar title
    await popup.close()

    await page.waitForTimeout (2000)
    
})
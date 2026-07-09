/// --------Interacting with inside the frame-------

import { test, expect } from '@playwright/test'; // importing test and expect from playwright
test("TestCase6", async ({page}) =>{ // defining a test case named "TestCase6"
    await page.goto("https://jqueryui.com/spinner/"); // navigating to the Playwright homepage
    await page.waitForTimeout (2000)

    const frame = await page.frameLocator(".demo-frame") // locating the frame using its class name
    await frame.locator(".ui-spinner-up").click() // clicking the first spinner button inside the frame
    await page.waitForTimeout (2000)
    await expect(frame.locator('#spinner')).toHaveAttribute("aria-valuenow", "1") // check if the spinner value is "1"
})
/// --------Amazon.com search validation-------

import { test, expect } from '@playwright/test'; // importing test and expect from playwright
test("TestCase3", async ({page}) =>{ // defining a test case named "TestCase2"
    await page.goto("https://amazon.com/"); // navigating to the Google homepage
    await page.locator("#searchDropdownBox").selectOption({ label: "Electronics"}) // selecting the electronic category from the dropdown
    await page.locator("#twotabsearchtextbox").fill("laptop") // filling the search box with the text "laptop"
    await page.locator("#nav-search-submit-button").click() // clicking the search button
    await page.waitForTimeout (3000);
    await page.screenshot({ path: 'amazonresult.png' })
    
})
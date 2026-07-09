//Interacting with Ai tool chatgpt-------


import { test, expect } from '@playwright/test';

test('testCase9', async ({ page }) => {
  // Navigate to BlazeDemo
  await page.goto('https://blazedemo.com');

  // Select departure city
  await page.selectOption('select[name="fromPort"]', 'Portland');

  // Select destination city
  await page.selectOption('select[name="toPort"]', 'Rome');

  // Click Find Flights
  await page.getByRole('button', { name: 'Find Flights' }).click();

  // Wait for the results page
  await expect(page).toHaveURL(/reserve\.php/);

  // Validate that exactly 5 flight rows are displayed
  const flightRows = page.locator('table tbody tr');
  await expect(flightRows).toHaveCount(5);
});
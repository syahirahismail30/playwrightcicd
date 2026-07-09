//Recorded using CodeGen

import { test, expect } from '@playwright/test';

test('TestCase13', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://blazedemo.com/');
  await page.getByRole('heading', { name: 'Welcome to the Simple Travel' }).click();
  await page.locator('html').click();
  await expect(page.locator('body')).toContainText('Choose your departure city:');
  await page.locator('select[name="fromPort"]').selectOption('Philadelphia');
  await page.locator('html').click();
  await page.getByRole('button', { name: 'Find Flights' }).click();
  await page.goto('https://blazedemo.com/reserve.php');
});
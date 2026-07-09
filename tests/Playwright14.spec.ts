//Recorded using CodeGen

import { test, expect } from '@playwright/test';
import HomepagePOM from '../pages/BlazeDemoHomepagePOM';
import ResultPagePOM from '../pages/BlazeDemoResultpagePOM';
import PurchasePagePOM from '../pages/BlazeDemoPurchasepagePOM';
import ConfirmationPagePOM from '../pages/BlazeDemoConfirmationpagePOM';

test('TestCase14', async ({ page }) => {
  await page.goto('https://blazedemo.com/');
  const homepage = new HomepagePOM(page);
  await page.pause()

  await homepage.getFromCityListbox().selectOption('Philadelphia'); 
  await homepage.getToCityListbox().selectOption('New York');
  await homepage.getFindFlightsButton().click();

  const resultPage = new ResultPagePOM(page);
  await resultPage.getflightbutton(1).click();

  await page.waitForTimeout(2000); // Wait for 2 seconds to observe the result

  const purchasePage = new PurchasePagePOM(page);
  await purchasePage.getnameTextBox().fill('John Doe');
  await purchasePage.getaddressTextBox().fill('123 Main St');
  await purchasePage.getcityTextBox().fill('New York');
  await purchasePage.getstateTextBox().fill('NY');
  await purchasePage.getzipCodeTextBox().fill('10001');
  await purchasePage.getcardTypeListBox().selectOption('Visa');
  await purchasePage.getcreditCardNumberTextBox().fill('4111111111111111');
  await purchasePage.getcreditCardMonthTextBox().fill('12');
  await purchasePage.getcreditCardYearTextBox().fill('2024');
  await purchasePage.getnameOnCardTextBox().fill('John Doe');
  await purchasePage.getrememberMeCheckbox().check();
  await purchasePage.getpurchaseFlightButton().click();

   await page.waitForTimeout(2000); 
});

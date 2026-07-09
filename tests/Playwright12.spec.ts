import { test, expect } from '@playwright/test';

const testData = {
	testName: 'Search flights and purchase ticket on BlazeDemo',
	baseUrl: 'https://blazedemo.com/',
	expectedTitlePattern: 'BlazeDemo',
	selectors: {
		fromPort: 'select[name="fromPort"]',
		toPort: 'select[name="toPort"]',
		checkedOption: 'option:checked',
		allOptions: 'option',
		resultsHeading: 'h3',
		firstResultRow: 'table tbody tr',
		name: 'input[name="inputName"]',
		address: 'input[name="address"]',
		city: 'input[name="city"]',
		state: 'input[name="state"]',
		zipCode: 'input[name="zipCode"]',
		cardType: 'select[name="cardType"]',
		cardNumber: 'input[name="creditCardNumber"]',
		cardMonth: 'input[name="creditCardMonth"]',
		cardYear: 'input[name="creditCardYear"]',
		nameOnCard: 'input[name="nameOnCard"]',
		rememberMe: 'input[name="rememberMe"]',
		confirmationTableRows: 'table tr'
	},
	expectedDefaults: {
		fromPort: 'Paris',
		toPort: 'Buenos Aires',
		fromPortItemCount: 7,
		toPortItemCount: 7
	},
	searchRoute: {
		fromPort: 'Boston',
		toPort: 'London',
		findFlightsButton: 'Find Flights',
		reservePathRegex: 'reserve\\.php',
		resultsHeadingText: 'Flights from Boston to London',
		chooseFlightButton: 'Choose This Flight',
		purchasePathRegex: 'purchase\\.php'
	},
	purchaseForm: {
		name: 'John Doe',
		address: '123 Main St',
		city: 'Boston',
		state: 'MA',
		zipCode: '02110',
		cardType: 'visa',
		cardNumber: '4111111111111111',
		cardMonth: '12',
		cardYear: '2028',
		nameOnCard: 'John Doe',
		purchaseButton: 'Purchase Flight'
	},
	confirmation: {
		pathRegex: 'confirmation\\.php',
		successHeading: 'Thank you for your purchase today!',
		purchaseIdRowText: 'Id',
		nonEmptyTextRegex: '\\S+'
	}
};

test(testData.testName, async ({ page }) => {
	await page.goto(testData.baseUrl);
	await expect(page).toHaveTitle(new RegExp(testData.expectedTitlePattern, 'i'));

	const defaultFromPort = await page
		.locator(`${testData.selectors.fromPort} ${testData.selectors.checkedOption}`)
		.textContent();
	const defaultToPort = await page
		.locator(`${testData.selectors.toPort} ${testData.selectors.checkedOption}`)
		.textContent();

	await expect(defaultFromPort?.trim()).toBe(testData.expectedDefaults.fromPort);
	await expect(defaultToPort?.trim()).toBe(testData.expectedDefaults.toPort);
	await expect(page.locator(`${testData.selectors.fromPort} ${testData.selectors.allOptions}`)).toHaveCount(
		testData.expectedDefaults.fromPortItemCount
	);
	await expect(page.locator(`${testData.selectors.toPort} ${testData.selectors.allOptions}`)).toHaveCount(
		testData.expectedDefaults.toPortItemCount
	);

	await page.selectOption(testData.selectors.fromPort, testData.searchRoute.fromPort);
	await page.selectOption(testData.selectors.toPort, testData.searchRoute.toPort);

	await page.getByRole('button', { name: testData.searchRoute.findFlightsButton }).click();

	await expect(page).toHaveURL(new RegExp(testData.searchRoute.reservePathRegex));
	await expect(page.locator(testData.selectors.resultsHeading)).toContainText(testData.searchRoute.resultsHeadingText);

	await page
		.locator(testData.selectors.firstResultRow)
		.first()
		.getByRole('button', { name: testData.searchRoute.chooseFlightButton })
		.click();

	await expect(page).toHaveURL(new RegExp(testData.searchRoute.purchasePathRegex));
	await page.locator(testData.selectors.name).fill(testData.purchaseForm.name);
	await page.locator(testData.selectors.address).fill(testData.purchaseForm.address);
	await page.locator(testData.selectors.city).fill(testData.purchaseForm.city);
	await page.locator(testData.selectors.state).fill(testData.purchaseForm.state);
	await page.locator(testData.selectors.zipCode).fill(testData.purchaseForm.zipCode);
	await page.locator(testData.selectors.cardType).selectOption(testData.purchaseForm.cardType);
	await page.locator(testData.selectors.cardNumber).fill(testData.purchaseForm.cardNumber);
	await page.locator(testData.selectors.cardMonth).fill(testData.purchaseForm.cardMonth);
	await page.locator(testData.selectors.cardYear).fill(testData.purchaseForm.cardYear);
	await page.locator(testData.selectors.nameOnCard).fill(testData.purchaseForm.nameOnCard);
	await page.locator(testData.selectors.rememberMe).check();

	await page.getByRole('button', { name: testData.purchaseForm.purchaseButton }).click();

	await expect(page).toHaveURL(new RegExp(testData.confirmation.pathRegex));
	await expect(page.getByRole('heading', { level: 1 })).toContainText(testData.confirmation.successHeading);
	await expect(
		page
			.locator(testData.selectors.confirmationTableRows)
			.filter({ hasText: testData.confirmation.purchaseIdRowText })
			.locator('td')
			.nth(1)
	).toHaveText(new RegExp(testData.confirmation.nonEmptyTextRegex));
});

import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion API.

test('Validate Amazon category dropdown selection', async ({ page }) => { // Define a test case for Amazon category dropdown validation.
	await page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded' }); // Open Amazon and wait for initial DOM readiness.

	const continueButton = page.getByRole('button', { name: /^Continue$/i }); // Locate optional regional Continue button.
	const hasContinueButton = await continueButton.isVisible({ timeout: 4000 }).catch(() => false); // Check visibility safely without failing if absent.

	if (hasContinueButton) { // Run this block only when Continue button is present.
		await continueButton.click(); // Click Continue to proceed to homepage.
		await page.waitForLoadState('domcontentloaded'); // Wait for page load after the click.
	} // End Continue handling block.

	const acceptCookieButton = page.getByRole('button', { name: /accept|agree/i }); // Locate optional cookie consent button.
	const hasCookieButton = await acceptCookieButton.isVisible({ timeout: 2000 }).catch(() => false); // Check cookie button visibility safely.

	if (hasCookieButton) { // Run this block only when cookie button is visible.
		await acceptCookieButton.click(); // Accept cookies to remove blocking overlay.
	} // End cookie handling block.

	const categoryDropdown = page.locator('#searchDropdownBox'); // Locate Amazon search category dropdown.
	await expect(categoryDropdown).toBeVisible({ timeout: 15000 }); // Ensure dropdown is visible before interaction.

	const defaultSelectedOptionText = (await categoryDropdown.locator('option:checked').textContent())?.trim(); // Read default selected option text.
	expect(defaultSelectedOptionText && defaultSelectedOptionText.length > 0).toBeTruthy(); // Validate default selected option is non-empty.

	await categoryDropdown.selectOption({ label: 'Electronics' }); // Select Electronics from dropdown options.

	const selectedOptionText = (await categoryDropdown.locator('option:checked').textContent())?.trim(); // Read selected option text after selection.
	expect(selectedOptionText).toBe('Electronics'); // Validate Electronics is selected.
}); // End test case.

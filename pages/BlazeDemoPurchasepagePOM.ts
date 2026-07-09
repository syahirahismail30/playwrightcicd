export default class PurchasePagePOM {
	page: any;

	constructor(page: any) {
		this.page = page;
	}

	getnameTextBox() {
		return this.page.locator('input[name="inputName"]');
	}

	getaddressTextBox() {
		return this.page.locator('input[name="address"]');
	}

	getcityTextBox() {
		return this.page.locator('input[name="city"]');
	}

	getstateTextBox() {
		return this.page.locator('input[name="state"]');
	}

	getzipCodeTextBox() {
		return this.page.locator('input[name="zipCode"]');
	}

	getcardTypeListBox() {
		return this.page.locator('select[name="cardType"]');
	}

	getcreditCardNumberTextBox() {
		return this.page.locator('input[name="creditCardNumber"]');
	}

	getcreditCardMonthTextBox() {
		return this.page.locator('input[name="creditCardMonth"]');
	}

	getcreditCardYearTextBox() {
		return this.page.locator('input[name="creditCardYear"]');
	}

	getnameOnCardTextBox() {
		return this.page.locator('input[name="nameOnCard"]');
	}

	getrememberMeCheckbox() {
		return this.page.locator('input[name="rememberMe"]');
	}

	getpurchaseFlightButton() {
		return this.page.getByRole('button', { name: 'Purchase Flight' });
	}
}

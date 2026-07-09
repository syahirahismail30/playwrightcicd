export default class ConfirmationPagePOM {
	 page: any;

	constructor(page: any) {
		this.page = page;
	}

	getsuccessHeading() {
		return this.page.getByRole('heading', { level: 1 });
	}

	getconfirmationTableRows() {
		return this.page.locator('table tr');
	}

	getconfirmationValueByLabel(label: string) {
		return this.page.locator('table tr').filter({ hasText: label }).locator('td').nth(1);
	}

	getpurchaseIdValue() {
		return this.getconfirmationValueByLabel('Id');
	}
}

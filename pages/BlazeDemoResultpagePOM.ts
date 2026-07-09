export default class ResultPagePOM{
    page: any;
    constructor(page: any) {
        this.page = page;
}

getflightbutton(btnIndex: number) {
    return this.page.locator(`//tbody/tr[${btnIndex}]/td/input[@type="submit"]`);
}
}
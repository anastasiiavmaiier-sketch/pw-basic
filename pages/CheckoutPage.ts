export class CheckoutPage {
  readonly page: Page;
  readonly cartRows: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator('tbody tr'); // рядки в таблиці кошика
    this.proceedButton = page.locator('[data-test="proceed-1"]');
  }
}
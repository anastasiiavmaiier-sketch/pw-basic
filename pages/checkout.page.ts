import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly cartRows: Locator;
  readonly productTitle: Locator;
  readonly proceedToCheckoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator('tbody tr');
    this.productTitle = page.getByTestId('product-title');
    this.proceedToCheckoutBtn = page.getByTestId('proceed-1');
  }

  async verifyCartContents(expectedCount: number, expectedTitle: string) {
    await expect(this.page).toHaveURL(/.*checkout/);
    await expect(this.cartRows).toHaveCount(expectedCount);
    await expect(this.productTitle).toHaveText(expectedTitle);
    await expect(this.proceedToCheckoutBtn).toBeVisible();
  }
}
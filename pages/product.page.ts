import { type Page, type Locator, expect } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment';

export class ProductPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartBtn: Locator;
  readonly addToFavoritesBtn: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('unit-price');
    this.addToCartBtn = page.getByTestId('add-to-cart');
    this.addToFavoritesBtn = page.getByTestId('add-to-favorites');
    this.alertMessage = page.getByRole('alert');
  }

  async verifyProductDetails(expectedName: string, expectedPrice: string): Promise<void> {
    await expect(this.page).toHaveURL(/.*product/);
    await expect(this.productName).toHaveText(expectedName);
    await expect(this.productPrice).toContainText(expectedPrice);
  }

  async clickAddToCart(): Promise<void> {
    await this.addToCartBtn.click();
  }

  async verifyAlertMessage(expectedText: string): Promise<void> {
    await expect(this.alertMessage).toBeVisible();
    await expect(this.alertMessage).toContainText(expectedText);
    await expect(this.alertMessage).toBeHidden({ timeout: 9000 });
  }
}
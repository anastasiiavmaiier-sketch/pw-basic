import { type Page, type Locator, expect } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment';

export class HomePage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.sortDropdown = page.getByTestId('sort');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(this.productNames.first()).toBeVisible();
  }

  async clickOnProduct(name: string): Promise<void> {
    await this.page.getByRole('link', { name }).first().click();
  }

  async selectSortOption(optionValue: string): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllProductNames(): Promise<string[]> {
    await expect(this.productNames.first()).toBeVisible();
    const rawNames = await this.productNames.allTextContents();
    return rawNames.map((name) => name.trim());
  }

  async getAllProductPrices(): Promise<number[]> {
    await expect(this.productPrices.first()).toBeVisible();
    const rawPrices = await this.productPrices.allTextContents();
    return rawPrices.map((price) => parseFloat(price.replace(/[^0-9.]/g, '')));
  }

  async filterByCategory(categoryName: string): Promise<void> {
    const checkbox = this.page.getByRole('checkbox', { name: categoryName });
    await checkbox.check();
  }
}
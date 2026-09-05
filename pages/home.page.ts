import { type Page } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment';

export class HomePage {
  readonly page: Page;
  readonly header: HeaderFragment;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
  }

  async open() {
    await this.page.goto('/');
  }
  async clickOnProduct(name: string) {
    // Select the product card based on the provided name and click on it
    await this.page.getByRole('link', { name: name }).click();
  }
}
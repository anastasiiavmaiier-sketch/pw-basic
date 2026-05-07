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
    // Шукаємо продукт за його назвою в списку
    await this.page.locator('.card', { hasText: name }).click();
  }
}
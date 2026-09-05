import { type Page, type Locator } from '@playwright/test';

export class HeaderFragment {
  readonly page: Page;
  readonly navMenu: Locator;
  readonly homeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navMenu = page.getByTestId('nav-menu');
    this.homeLink = page.getByTestId('nav-home');
  }
}
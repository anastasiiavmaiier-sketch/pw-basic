import { type Page, type Locator, expect } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment';

export class AccountPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly pageTitle: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.pageTitle = page.getByTestId('page-title');
    this.heading = page.getByRole('heading', { name: 'My account' });
  }
}
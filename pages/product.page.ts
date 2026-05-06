import { type Page, type Locator } from '@playwright/test';
import { HeaderFragment } from './HeaderFragment';

export class ProductPage {
  readonly page: Page;
  readonly header: HeaderFragment;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCartBtn: Locator;
  readonly addToFavoritesBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
    this.productName = page.locator('[data-test="product-name"]');
    this.productPrice = page.locator('[data-test="unit-price"]');
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.addToFavoritesBtn = page.locator('[data-test="add-to-favorites"]');
  }
}
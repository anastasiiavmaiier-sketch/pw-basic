import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Open homepage
  await homePage.open();

  // 2. Click on "Slip Joint Pliers"
  await homePage.clickOnProduct('Slip Joint Pliers');

  // Assert: URL, Name, Price
  await expect(page).toHaveURL(/.*product/);
  await expect(productPage.productName).toHaveText('Slip Joint Pliers');
  await expect(productPage.productPrice).toContainText('9.17');

  // 3. Click "Add to Cart"
  await productPage.addToCartBtn.click();

  // Assert Alert: Visible, Text
  await expect(checkoutPage.cartRows).toHaveCount(1);
  await expect(productPage.alert).toContainText('Product added to shopping cart.');

  // Assert Alert: Disappears in 8 seconds
  await expect(productPage.alert).toBeHidden({ timeout: 10000 });

  // Assert Cart quantity = 1
  await expect(homePage.header.cartBadge).toHaveText('1');

  // 4. Click on the cart icon
  await homePage.header.cartIcon.click();

  // Assert: Number of products in table
  await expect(checkoutPage.cartRows.count()).toBe(1);

  // Assert: Product title in table
  await expect(checkoutPage.cartRows.first()).toContainText('Slip Joint Pliers');

  // Assert: Proceed to Checkout visible
  await expect(checkoutPage.proceedButton).toBeVisible();
});
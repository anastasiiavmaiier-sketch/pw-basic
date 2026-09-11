import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';

test('Verify user can add product to cart (POM)', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  await homePage.open();
  await homePage.clickOnProduct('Slip Joint Pliers');

  await productPage.verifyProductDetails('Slip Joint Pliers', '9.17');
  await productPage.clickAddToCart();
  await productPage.verifyAlertMessage('Product added to shopping cart');

  await expect(page.getByTestId('cart-quantity')).toHaveText('1');
  await page.getByTestId('nav-cart').click();

  await checkoutPage.verifyCartContents(1, 'Slip Joint Pliers');
});
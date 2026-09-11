import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

test('Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    // 1. Open homepage
    await homePage.open();

    // 2. Click on the product "Combination Pliers"
    await homePage.clickOnProduct('Combination Pliers');

    // Assertions:

    // Verify URL contains /product
    await expect(page).toHaveURL(/.*product/);

    // Verify product name
    await expect(productPage.productName).toContainText('Combination Pliers');

    // Verify product price is $14.15
    await expect(productPage.productPrice).toContainText('14.15');

    // Verify buttons are visible
    await expect(productPage.addToCartBtn).toBeVisible();
    await expect(productPage.addToFavoritesBtn).toBeVisible();
});
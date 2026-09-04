import { test, expect } from '@playwright/test';

test.describe('Authentication Suite', () => {
  test('Verify login with valid credentials', async ({ page }) => {
    // 1. Open login page
    await page.goto('/auth/login');

    // 2. Fill in credentials
    await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
    await page.getByPlaceholder('Your password').fill('welcome01');

    // 3. Click the Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Assertions
    // Verify URL is redirected to account page
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

    // Verify page title / heading is "My Account"
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();

    // Verify username "Jane Doe" appears in the navigation bar / menu dropdown
    await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
  });
});



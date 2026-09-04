import { test, expect } from '@playwright/test';
import { testUsers } from '../test-data/users';

test.describe('Authentication Suite', () => {
  test('Verify login with valid credentials', async ({ page }) => {
    // 1. Open the login page
    await page.goto('/auth/login');

    // 2. Fill in user details
    await page.getByTestId('email').fill(testUsers.customer.email);
    await page.getByTestId('password').fill(testUsers.customer.password);

    // 3. Submit the login form
    await page.getByTestId('login-submit').click();

    // 4. Assertions
    // Check that the URL contains '/account' after successful login
    await expect(page).toHaveURL('/account' );

    // verify that the "My account" heading is visible on the page
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();

    // verify that the user's name is displayed in the navigation menu
    await expect(page.getByTestId('nav-menu')).toContainText(testUsers.customer.name);
  });
});


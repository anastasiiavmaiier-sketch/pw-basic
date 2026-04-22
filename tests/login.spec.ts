import test, { chromium, expect } from '@playwright/test';
test('Verify login with valid credentials', async ({ page }) => {
  // 1. Open URL
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  // 2. Fill in credentials
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');

  // 3. Click the Login button
  await page.getByTestId('login-submit').click();

  // 4. Verify URL is https://practicesoftwaretesting.com/account
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

  // 5. Verify page title is "My Account"
  await expect(page.getByTestId('page-title')).toHaveText('My account');

  // 6. Verify username "Jane Doe" appears in the navigation bar
  await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
});




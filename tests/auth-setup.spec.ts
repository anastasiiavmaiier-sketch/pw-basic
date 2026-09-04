import { test, expect } from '@playwright/test';
import { testUsers } from '../test-data/users';
import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="nav-sign-in"]').click();

  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

   await page.context().storageState({ path: authFile });

});




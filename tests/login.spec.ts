import test, { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.page.goto('/');

  await page.locator('[data-test="nav-sign-in"]').click();
  
  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

  //await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  //await page.getByTestId('password').fill('welcome01');
  //await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
});




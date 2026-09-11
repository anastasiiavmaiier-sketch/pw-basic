import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const authFile = '.auth/user.json';

setup('authenticate via UI and save session', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('/auth/login');

  await loginPage.performLogin(
    process.env.USER_EMAIL || 'customer@practicesoftwaretesting.com',
    process.env.USER_PASSWORD || 'welcome01'
  );

  await expect(page).toHaveURL(/.*account/);
  await expect(page.getByTestId('page-title')).toContainText('My account');

  await page.context().storageState({ path: authFile });
});
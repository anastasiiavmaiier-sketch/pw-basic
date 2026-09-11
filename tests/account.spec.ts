import { test, expect } from '@playwright/test';

test.use({ storageState: '.auth/user.json' });

test.describe('Account & Profile Verification', () => {
  test('User can open account page without logging in manually', async ({ page }) => {
    await page.goto('/account');
    await expect(page).toHaveURL(/.*account/);
    await expect(page.getByTestId('page-title')).toContainText('My account');
    await expect(page.getByTestId('nav-menu')).toBeVisible();
  });
});
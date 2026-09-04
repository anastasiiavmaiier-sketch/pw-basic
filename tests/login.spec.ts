import { test, expect } from '@playwright/test';
import { testUsers } from '../test-data/users';

test.describe('Authentication Suite', () => {
  test('Verify login with valid credentials', async ({ page }) => {
    // 1. Відкриваємо сторінку логіну
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    // 2. Заповнюємо дані користувача через data-test атрибути
    await page.locator('[data-test="email"]').fill(testUsers.customer.email);
    await page.locator('[data-test="password"]').fill(testUsers.customer.password);

    // 3. Тиснемо кнопку входу
    await page.locator('[data-test="login-submit"]').click();

    // 4. Assertions
    // Чекаємо переходу на URL з account (регулярний вираз надійніший за відносний шлях)
    await expect(page).toHaveURL(/.*account/);

    // Перевіряємо заголовок сторінки
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();

    // Перевіряємо ім'я користувача у меню
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(testUsers.customer.name);
  });
});


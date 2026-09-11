// tests/filter.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

// 3 Enums за вимогою завдання
export enum HandTools {
  Hammer = 'Hammer',
  HandSaw = 'Hand Saw',
  Wrench = 'Wrench',
  Pliers = 'Pliers',
  Chisels = 'Chisels',
  Measures = 'Measures',
}

export enum PowerTools {
  Grinder = 'Grinder',
  Sander = 'Sander',
  Saw = 'Saw',
  Drill = 'Drill',
}

export enum Other {
  ToolBelt = 'Tool Belt',
  Storage = 'Storage',
  Workwear = 'Workwear',
}

test.describe('Catalog Filtering Suite', () => {
  test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);

    // 1. Open homepage
    await homePage.open();

    // 2. Select Sander in the category list (з enum PowerTools)
    const targetCategory = PowerTools.Sander;
    await homePage.filterByCategory(targetCategory);

    // 3. Assert: перевіряємо, що після оновлення DOM усі товари містять "Sander"
    await expect.poll(async () => {
      const productNames = await homePage.getAllProductNames();

      if (productNames.length === 0) return false;

      return productNames.every((name) =>
        name.toLowerCase().includes(targetCategory.toLowerCase())
      );
    }, {
      message: `All displayed products must contain "${targetCategory}" in their names`,
      timeout: 10000,
    }).toBe(true);

    const filteredProducts = await homePage.getAllProductNames();
    for (const name of filteredProducts) {
      expect(name).toContain(targetCategory);
    }
  });
});
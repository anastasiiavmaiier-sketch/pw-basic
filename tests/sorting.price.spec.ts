import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const priceSortingCases = [
  {
    order: 'ascending',
    optionValue: 'price,asc',
    testTitle: 'Price (Low - High)',
  },
  {
    order: 'descending',
    optionValue: 'price,desc',
    testTitle: 'Price (High - Low)',
  },
] as const;

test.describe('Catalog Price Sorting Suite', () => {
  for (const { order, optionValue, testTitle } of priceSortingCases) {
    test(`Verify products are sorted by ${testTitle}`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.open();
      await homePage.selectSortOption(optionValue);
      await expect.poll(async () => {
        const actualPrices = await homePage.getAllProductPrices();

        if (actualPrices.length === 0) return false;

        const expectedPrices = [...actualPrices].sort((a, b) =>
          order === 'ascending' ? a - b : b - a
        );

        return actualPrices.join(',') === expectedPrices.join(',');
      }, {
        message: `Products should be sorted by ${testTitle}`,
        timeout: 10000,
      }).toBe(true);
    });
  }
});
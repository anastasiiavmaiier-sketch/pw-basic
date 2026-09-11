import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const sortingCases = [
  {
    order: 'ascending',
    optionValue: 'name,asc',
    testTitle: 'Name (A - Z)',
  },
  {
    order: 'descending',
    optionValue: 'name,desc',
    testTitle: 'Name (Z - A)',
  },
] as const;

test.describe('Catalog Sorting Suite', () => {
  for (const { order, optionValue, testTitle } of sortingCases) {
    test(`Verify products are sorted by ${testTitle}`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.open();
      await homePage.selectSortOption(optionValue);
      await expect.poll(async () => {
        const currentNames = await homePage.getAllProductNames();
        const expected = [...currentNames].sort((a, b) =>
          order === 'ascending'
            ? a.localeCompare(b)
            : b.localeCompare(a)
        );

        return currentNames.join(' | ') === expected.join(' | ');
      }, {
        message: `Products should be sorted by ${testTitle}`,
        timeout: 10000,
      }).toBe(true);
    });
  }
});
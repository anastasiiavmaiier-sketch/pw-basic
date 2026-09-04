import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const sortingCases = [
  { 
    name: 'Name (A-Z)', 
    option: 'name,asc', 
    expectedOrder: 'asc' 
  },
  { 
    name: 'Name (Z-A)', 
    option: 'name,desc', 
    expectedOrder: 'desc' 
  }
];

for (const sortingCase of sortingCases) {
  test(`Verify user can perform sorting by name: ${sortingCase.name}`, async ({ page }) => {
    const homePage = new HomePage(page);

    // 1. Open homepage
    await homePage.open();

    // 2. Select sorting option
    await homePage.sortBy(sortingCase.option);

    // 3. Get all product names from the page
    const names = await homePage.getAllProductNames();

    // 4. Assert: Verify the order
    const sortedNames = [...names].sort((a, b) => {
      if (sortingCase.expectedOrder === 'asc') {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });

    // Порівнюємо отриманий масив із відсортованим масивом-еталоном
    expect(names).toEqual(sortedNames);
  });
}
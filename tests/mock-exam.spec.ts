import { test, expect } from '@playwright/test';

test.describe('Mock Exam Engine', () => {
  test('should launch mock exam from sidebar', async ({ page }) => {
    await page.goto('/courses/rise-with-sap');
    
    // Find and click the exam button
    const examBtn = page.locator('button:has-text("Practice Mock Exam")');
    await examBtn.click();
    
    // Verify exam overlay appears
    await expect(page.locator('text=Time Remaining')).toBeVisible();
    await expect(page.locator('text=Question 1 of')).toBeVisible();
  });
});

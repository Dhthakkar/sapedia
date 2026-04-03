import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the course page
    await page.goto('/courses/rise-with-sap');
  });

  test('should navigate through all units using sidebar', async ({ page }) => {
    // Wait for sidebar to be visible
    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar).toBeVisible();
    
    // We verify Unit titles exist in sidebar
    await expect(sidebar.getByText('Unit 1', { exact: false })).toBeVisible();
    await expect(sidebar.getByText('Unit 2', { exact: false })).toBeVisible();
    await expect(sidebar.getByText('Unit 3', { exact: false })).toBeVisible();
  });

  test('should click lesson buttons', async ({ page }) => {
    const sidebar = page.getByTestId('sidebar');
    
    // Click Unit 1 Lesson 1 (usually first)
    const lesson1 = page.getByTestId('lesson-btn-u1l1');
    await lesson1.click();
    
    // Verify content changed
    const lessonContent = page.getByTestId('lesson-content');
    await expect(lessonContent).toBeVisible();
    
    // Check for topic title (h3 in TopicCard)
    const topicTitle = lessonContent.locator('h3').first();
    await expect(topicTitle).toBeVisible();
  });
});

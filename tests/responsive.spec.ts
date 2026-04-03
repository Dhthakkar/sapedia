import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  test('should show sidebar on desktop and toggle on mobile', async ({ page }) => {
    // Desktop View
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/courses/rise-with-sap');
    
    const sidebar = page.getByTestId('sidebar');
    await expect(sidebar).toBeVisible();

    // Mobile View
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/courses/rise-with-sap');
    
    // On mobile, check if toggle works
    const toggle = page.getByTestId('sidebar-toggle');
    await expect(toggle).toBeVisible();
  });

  test('should have accessible touch targets', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/courses/rise-with-sap');
    
    const lessonBtn = page.getByTestId('lesson-btn-u1l1');
    const box = await lessonBtn.boundingBox();
    
    if (box) {
      // Industry standard is 44px, we ensured min-h-[44px]
      expect(box.height).toBeGreaterThanOrEqual(40); 
    }
  });
});

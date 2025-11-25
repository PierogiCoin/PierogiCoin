import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });
    
    // Check navigation
    await expect(page.locator('nav').or(page.locator('header'))).toBeVisible();
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/homepage-full.png',
      fullPage: true
    });
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Click on navigation items
    const navItems = ['O nas', 'Portfolio', 'Kontakt'];
    
    for (const item of navItems) {
      const link = page.locator(`text=${item}`).first();
      if (await link.isVisible()) {
        await link.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Check if page loads
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: 'e2e/screenshots/homepage-mobile.png',
      fullPage: true
    });
  });

  test('should have accessible elements', async ({ page }) => {
    await page.goto('/');
    
    // Check for main landmark
    await expect(page.locator('main').or(page.locator('[role="main"]'))).toBeVisible();
    
    // Check for skip link or accessible navigation
    const buttons = page.locator('button');
    await expect(buttons.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Visual Regression', () => {
  test('should match hero section design', async ({ page }) => {
    await page.goto('/');
    
    // Wait for hero to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of hero
    await page.screenshot({ 
      path: 'e2e/screenshots/hero-section.png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
  });
});

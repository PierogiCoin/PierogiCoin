import { test, expect } from '@playwright/test';

test.describe('Cookie Consent', () => {
  test.beforeEach(async ({ context }) => {
    // Clear cookies and localStorage before each test
    await context.clearCookies();
  });

  test('should show cookie banner on first visit', async ({ page }) => {
    await page.goto('/');
    
    // Wait for banner to appear (has 1s delay)
    await page.waitForTimeout(1500);
    
    // Check if cookie banner is visible
    await expect(page.locator('text=/cookie/i')).toBeVisible({ timeout: 5000 });
    
    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/cookie-banner.png' });
  });

  test('should accept all cookies', async ({ page }) => {
    await page.goto('/');
    
    // Wait for banner
    await page.waitForTimeout(1500);
    
    // Click accept all
    const acceptButton = page.locator('button:has-text("Akceptuj")').first();
    await acceptButton.click();
    
    // Banner should disappear
    await expect(page.locator('text=/cookie/i')).not.toBeVisible({ timeout: 3000 });
    
    // Check localStorage
    const consent = await page.evaluate(() => localStorage.getItem('cookie-consent'));
    expect(consent).toBeTruthy();
  });

  test('should reject cookies', async ({ page }) => {
    await page.goto('/');
    
    // Wait for banner
    await page.waitForTimeout(1500);
    
    // Click reject
    const rejectButton = page.locator('button:has-text("Odrzuć")').or(page.locator('button:has-text("Tylko")')).first();
    await rejectButton.click();
    
    // Banner should disappear
    await expect(page.locator('text=/cookie/i')).not.toBeVisible({ timeout: 3000 });
  });

  test('should not show banner on subsequent visits', async ({ page }) => {
    // First visit - accept cookies
    await page.goto('/');
    await page.waitForTimeout(1500);
    
    const acceptButton = page.locator('button:has-text("Akceptuj")').first();
    await acceptButton.click();
    
    // Reload page
    await page.reload();
    await page.waitForTimeout(1500);
    
    // Banner should not appear
    await expect(page.locator('text=/używamy plików cookie/i')).not.toBeVisible({ timeout: 3000 });
  });
});

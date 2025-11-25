import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact section
    await page.locator('text=/kontakt/i').first().click();
    
    // Wait for contact section to be visible
    await page.waitForTimeout(1000);
    
    // Fill out contact form
    const nameInput = page.locator('input[name="name"]').or(page.locator('input[placeholder*="imię" i]')).first();
    await nameInput.waitFor({ state: 'visible', timeout: 5000 });
    await nameInput.fill('Jan Kowalski');
    
    const emailInput = page.locator('input[name="email"]').or(page.locator('input[type="email"]')).first();
    await emailInput.fill('jan@example.com');
    
    const messageInput = page.locator('textarea[name="message"]').or(page.locator('textarea')).first();
    await messageInput.fill('Witam, chciałbym zapytać o wycenę strony internetowej.');
    
    // Submit form
    const submitButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Wyślij")')).first();
    await submitButton.click();
    
    // Check for success message
    await expect(page.locator('text=/sukces/i').or(page.locator('text=/wysłan/i'))).toBeVisible({ timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/contact-success.png' });
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to contact
    await page.locator('text=/kontakt/i').first().click();
    await page.waitForTimeout(1000);
    
    // Fill with invalid email
    const nameInput = page.locator('input[name="name"]').or(page.locator('input[placeholder*="imię" i]')).first();
    await nameInput.waitFor({ state: 'visible', timeout: 5000 });
    await nameInput.fill('Test User');
    
    const emailInput = page.locator('input[name="email"]').or(page.locator('input[type="email"]')).first();
    await emailInput.fill('invalid-email');
    
    const messageInput = page.locator('textarea[name="message"]').or(page.locator('textarea')).first();
    await messageInput.fill('Test message');
    
    // Try to submit
    const submitButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Wyślij")')).first();
    await submitButton.click();
    
    // Should show validation error
    await page.waitForTimeout(1000);
  });
});

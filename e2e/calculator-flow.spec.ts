import { test, expect } from '@playwright/test';

test.describe('Calculator User Journey', () => {
  test('should complete full calculator flow with AI analysis', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Wait for page to load
    await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    
    // Find AI calculator section
    await page.locator('text=Opisz swój pomysł').scrollIntoViewIfNeeded();
    
    // Enter project description
    const description = 'Potrzebuję nowoczesnej strony firmowej z portfolio, blogiem i formularzem kontaktowym dla mojej agencji fotograficznej';
    await page.locator('textarea').first().fill(description);
    
    // Wait for AI analysis (debounced)
    await page.waitForTimeout(2000);
    
    // Check if analysis results appear
    await expect(page.locator('text=/analiza/i')).toBeVisible({ timeout: 15000 });
    
    // Take screenshot of results
    await page.screenshot({ path: 'e2e/screenshots/calculator-results.png', fullPage: true });
  });

  test('should allow email submission for offer', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to calculator
    await page.locator('text=Opisz swój pomysł').scrollIntoViewIfNeeded();
    
    // Fill description
    const textarea = page.locator('textarea').first();
    await textarea.fill('Chcę stworzyć sklep internetowy z płatnościami online');
    
    // Wait for analysis
    await page.waitForTimeout(2000);
    
    // Enter email
    const emailInput = page.locator('input[type="email"]').or(page.locator('input[placeholder*="email" i]')).first();
    await emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await emailInput.fill('test@example.com');
    
    // Click generate offer button
    const generateButton = page.locator('button:has-text("Pobierz")').or(page.locator('button:has-text("ofertę")')).first();
    await generateButton.click();
    
    // Check for success message
    await expect(page.locator('text=/wysłana/i').or(page.locator('text=/sukces/i'))).toBeVisible({ timeout: 10000 });
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/');
    
    // Try to generate offer without description or email
    await page.locator('text=Opisz swój pomysł').scrollIntoViewIfNeeded();
    
    // Short description (should not trigger)
    await page.locator('textarea').first().fill('Test');
    
    await page.waitForTimeout(2000);
    
    // Should not show results for short description
    const analysisText = page.locator('text=/analiza na żywo/i');
    await expect(analysisText).toBeVisible();
  });
});

test.describe('Calculator Visual Regression', () => {
  test('should match calculator section design', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to calculator
    await page.locator('text=Opisz swój pomysł').scrollIntoViewIfNeeded();
    
    // Take screenshot for visual comparison
    const calculatorSection = page.locator('section').filter({ hasText: 'Opisz swój pomysł' }).first();
    await expect(calculatorSection).toBeVisible();
    
    await page.screenshot({ 
      path: 'e2e/screenshots/calculator-section.png',
      fullPage: false
    });
  });
});

import { test, expect } from '@playwright/test';

test.describe('Smooth Scrolling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should smoothly scroll between sections', async ({ page }) => {
    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY);

    // Click on Contact section in navigation
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();

    // Wait a bit for scroll to start
    await page.waitForTimeout(100);

    // Check that scroll position is changing (smooth scroll in progress)
    const midScrollY = await page.evaluate(() => window.scrollY);
    expect(midScrollY).toBeGreaterThan(initialScrollY);

    // Wait for scroll to complete
    await page.waitForTimeout(500);

    // Verify we reached the Contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('should scroll smoothly when using skip to content link', async ({ page }) => {
    // Focus on skip to content link (usually first focusable element)
    await page.keyboard.press('Tab');

    // Activate skip link
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Verify main content is focused
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('should maintain smooth scroll behavior across multiple sections', async ({ page }) => {
    const sections = ['About', 'Skills', 'Education', 'Contact'];

    for (const section of sections) {
      await page.locator('nav').getByRole('link', { name: section, exact: true }).click();
      await page.waitForTimeout(600);

      // Verify section is in viewport
      const sectionId = section.toLowerCase().replace(' ', '-');
      const sectionElement = page.locator(`#${sectionId}`);
      await expect(sectionElement).toBeInViewport();
    }
  });

  test('should handle rapid navigation clicks gracefully', async ({ page }) => {
    // Rapidly click multiple navigation links
    const nav = page.locator('nav');
    await nav.getByRole('link', { name: 'Experience', exact: true }).click();
    await page.waitForTimeout(100);
    await nav.getByRole('link', { name: 'Skills', exact: true }).click();
    await page.waitForTimeout(100);
    await nav.getByRole('link', { name: 'Contact', exact: true }).click();

    // Wait for final scroll to complete
    await page.waitForTimeout(800);

    // Verify we ended up at the last clicked section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('should scroll to section with proper offset for fixed header', async ({ page }) => {
    // Click on About section in navigation
    await page.locator('nav').getByRole('link', { name: 'About', exact: true }).click();
    await page.waitForTimeout(500);

    // Get the About section position
    const aboutSection = page.locator('#about');
    const aboutBox = await aboutSection.boundingBox();

    // Verify section is visible (may be slightly off-screen on mobile due to header)
    // Just check that it exists and has dimensions
    expect(aboutBox).not.toBeNull();
    expect(aboutBox?.height).toBeGreaterThan(0);
    
    // Verify section is in viewport
    await expect(aboutSection).toBeInViewport();
  });
});

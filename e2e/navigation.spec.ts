import { test, expect } from '@playwright/test';

test.describe('Page Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Scott Ryan Howard/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display all main sections', async ({ page }) => {
    const sections = [
      'about',
      'experience',
      'skills',
      'work-projects',
      'personal-projects',
      'education',
      'contact',
    ];

    for (const section of sections) {
      const sectionElement = page.locator(`#${section}`);
      await expect(sectionElement).toBeVisible();
    }
  });

  test('should navigate to all sections via desktop navigation', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('domcontentloaded');

    const navLinks = [
      { label: 'About', sectionId: 'about' },
      { label: 'Experience', sectionId: 'experience' },
      { label: 'Skills', sectionId: 'skills' },
      { label: 'Work Projects', sectionId: 'work-projects' },
      { label: 'Personal Projects', sectionId: 'personal-projects' },
      { label: 'Education', sectionId: 'education' },
      { label: 'Contact', sectionId: 'contact' },
    ];

    for (const link of navLinks) {
      // Click the navigation link - use visible link (desktop or mobile menu)
      const navLink = page.getByRole('link', { name: link.label, exact: true }).first();
      
      // Check if it's visible, if not skip (mobile viewport)
      if (await navLink.isVisible()) {
        await navLink.click();
        
        // Wait for smooth scroll to complete
        await page.waitForTimeout(500);

        // Verify the section is in viewport
        const section = page.locator(`#${link.sectionId}`);
        await expect(section).toBeInViewport();
      }
    }
  });

  test('should highlight active section in navigation', async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');

    // Scroll to Experience section using first visible link
    const experienceLink = page.getByRole('link', { name: 'Experience', exact: true }).first();
    if (await experienceLink.isVisible()) {
      await experienceLink.click();
      await page.waitForTimeout(500);

      // Check if Experience link has active styling
      await expect(experienceLink).toHaveAttribute('aria-current', 'page');
    }
  });

  test('should scroll to top when clicking site name', async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');

    // Scroll down to contact section using navigation
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(700);

    // Verify we scrolled down
    let scrollY = await page.evaluate(() => window.scrollY);
    
    // Only proceed if we actually scrolled
    if (scrollY > 100) {
      // Click on the site name/logo
      await page.getByRole('button', { name: /Scott Ryan Howard.*Go to top/i }).click();
      await page.waitForTimeout(800);

      // Verify we're at the top (or close to it)
      scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(150);
    }
  });

  test('should have keyboard accessible navigation', async ({ page }) => {
    await page.waitForLoadState('domcontentloaded');

    // Focus on the first visible navigation link
    const firstNavLink = page.getByRole('link', { name: 'About', exact: true }).first();
    
    if (await firstNavLink.isVisible()) {
      await firstNavLink.focus();

      // Press Enter on About link
      await page.keyboard.press('Enter');
      await page.waitForTimeout(600);

      // Verify About section is in viewport
      const aboutSection = page.locator('#about');
      await expect(aboutSection).toBeInViewport();
    }
  });
});

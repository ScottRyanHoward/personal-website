import { test, expect } from '@playwright/test';

test.describe('Mobile Menu', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display hamburger menu button on mobile', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await expect(menuButton).toBeVisible();
  });

  test('should hide desktop navigation on mobile', async ({ page }) => {
    // Desktop navigation should not be visible
    const desktopNav = page.locator('nav ul.hidden.md\\:flex');
    await expect(desktopNav).not.toBeVisible();
  });

  test('should open mobile menu when hamburger is clicked', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();
    await page.waitForTimeout(200);

    // Mobile menu should be visible
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Menu button should show close icon (check for close menu button)
    const closeButton = page.getByRole('button', { name: /close menu/i });
    await expect(closeButton).toBeVisible();
    await expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should display all navigation links in mobile menu', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();

    const expectedLinks = [
      'About',
      'Experience',
      'Skills',
      'Work Projects',
      'Personal Projects',
      'Education',
      'Contact',
    ];

    for (const linkText of expectedLinks) {
      const link = page.locator('#mobile-menu').getByRole('link', { name: linkText, exact: true });
      await expect(link).toBeVisible();
    }
  });

  test('should close mobile menu when a link is clicked', async ({ page }) => {
    // Open menu
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Click a navigation link
    await page.locator('#mobile-menu').getByRole('link', { name: 'About', exact: true }).click();
    await page.waitForTimeout(300);

    // Menu should be closed
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should close mobile menu when close button is clicked', async ({ page }) => {
    // Open menu
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Click close button
    const closeButton = page.getByRole('button', { name: /close menu/i });
    await closeButton.click();

    // Menu should be closed
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should navigate to correct section from mobile menu', async ({ page }) => {
    // Open menu
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();

    // Click on Skills link
    await page.locator('#mobile-menu').getByRole('link', { name: 'Skills', exact: true }).click();
    await page.waitForTimeout(600);

    // Verify Skills section is in viewport
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeInViewport();
  });

  test('should highlight active section in mobile menu', async ({ page }) => {
    // Scroll to Experience section first
    await page.evaluate(() => {
      document.getElementById('experience')?.scrollIntoView();
    });
    await page.waitForTimeout(500);

    // Open menu
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();

    // Check if Experience link has active styling
    const experienceLink = page.locator('#mobile-menu').getByRole('link', { name: 'Experience', exact: true });
    await expect(experienceLink).toHaveAttribute('aria-current', 'page');
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Focus on menu button directly
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.focus();

    // Open menu with Enter key
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Focus on first menu item and activate
    const firstLink = mobileMenu.getByRole('link', { name: 'About', exact: true });
    await firstLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Menu should close and section should be in view
    await expect(mobileMenu).not.toBeVisible();
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('should maintain menu state during scroll', async ({ page }) => {
    // Open menu
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();

    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // Scroll the page
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(300);

    // Menu should still be visible
    await expect(mobileMenu).toBeVisible();
  });
});

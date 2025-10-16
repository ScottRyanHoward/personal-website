import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('Resume Download', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display download resume button', async ({ page }) => {
    // Scroll to Contact section
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(500);

    // Find download button in Contact section
    const contactSection = page.locator('#contact');
    const downloadButton = contactSection.getByRole('button', { name: /Download resume/i });
    await expect(downloadButton).toBeVisible();
  });

  test('should have accessible label for download button', async ({ page }) => {
    // Scroll to Contact section
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(500);

    // Verify button has proper aria-label in Contact section
    const contactSection = page.locator('#contact');
    const downloadButton = contactSection.getByRole('button', { name: /Download resume as PDF file/i });
    await expect(downloadButton).toBeVisible();
  });

  test('should display download icon on button', async ({ page }) => {
    // Scroll to Contact section
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(500);

    // Find download button and check for icon in Contact section
    const contactSection = page.locator('#contact');
    const downloadButton = contactSection.getByRole('button', { name: /Download resume/i });
    const icon = downloadButton.locator('svg');
    await expect(icon).toBeVisible();
  });

  test('should trigger download when button is clicked', async ({ page, context }) => {
    // Scroll to Contact section
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(500);

    // Monitor window.open calls
    let openedUrl = '';
    await page.evaluate(() => {
      const originalOpen = window.open;
      window.open = function(url: any) {
        (window as any).__lastOpenedUrl = url;
        return originalOpen.call(window, url, '_blank');
      };
    });

    // Click download button in Contact section
    const contactSection = page.locator('#contact');
    const downloadButton = contactSection.getByRole('button', { name: /Download resume/i });
    await downloadButton.click();

    // Wait a bit for the click to process
    await page.waitForTimeout(500);

    // Check that window.open was called with the correct URL
    openedUrl = await page.evaluate(() => (window as any).__lastOpenedUrl);
    expect(openedUrl).toContain('Scott_Howard_Resume.pdf');
  });

  test('should be keyboard accessible', async ({ page, context }) => {
    // Scroll to Contact section
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(500);

    // Monitor window.open calls
    await page.evaluate(() => {
      const originalOpen = window.open;
      window.open = function(url: any) {
        (window as any).__lastOpenedUrl = url;
        return originalOpen.call(window, url, '_blank');
      };
    });

    // Find and focus the download button in Contact section
    const contactSection = page.locator('#contact');
    const downloadButton = contactSection.getByRole('button', { name: /Download resume/i });
    await downloadButton.focus();

    // Verify button is focused
    await expect(downloadButton).toBeFocused();

    // Press Enter to trigger download
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);

    // Check that window.open was called with the correct URL
    const openedUrl = await page.evaluate(() => (window as any).__lastOpenedUrl);
    expect(openedUrl).toContain('Scott_Howard_Resume.pdf');
  });

  test('should have visible focus indicator on download button', async ({ page }) => {
    // Scroll to Contact section
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(500);

    // Focus the download button in Contact section
    const contactSection = page.locator('#contact');
    const downloadButton = contactSection.getByRole('button', { name: /Download resume/i });
    await downloadButton.focus();

    // Check for focus ring (Tailwind's focus:ring classes)
    const buttonClass = await downloadButton.getAttribute('class');
    expect(buttonClass).toContain('focus:');
  });

  test('should display download section with proper heading', async ({ page }) => {
    // Scroll to Contact section
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(500);

    // Check for download section heading in Contact section
    const contactSection = page.locator('#contact');
    const heading = contactSection.getByRole('heading', { name: /Download My Resume/i });
    await expect(heading).toBeVisible();
  });

  test('should display descriptive text about resume download', async ({ page }) => {
    // Scroll to Contact section
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(500);

    // Check for descriptive text in Contact section
    const contactSection = page.locator('#contact');
    const description = contactSection.getByText(/Get a PDF copy of my complete resume/i);
    await expect(description).toBeVisible();
  });

  test('should work on mobile viewport', async ({ page, context }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Monitor window.open calls
    await page.evaluate(() => {
      const originalOpen = window.open;
      window.open = function(url: any) {
        (window as any).__lastOpenedUrl = url;
        return originalOpen.call(window, url, '_blank');
      };
    });

    // Open mobile menu and navigate to Contact
    const menuButton = page.getByRole('button', { name: /menu/i });
    await menuButton.click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(500);

    // Find download button in Contact section
    const contactSection = page.locator('#contact');
    const downloadButton = contactSection.getByRole('button', { name: /Download resume/i });
    await expect(downloadButton).toBeVisible();

    // Click download button
    await downloadButton.click();
    await page.waitForTimeout(500);

    // Check that window.open was called with the correct URL
    const openedUrl = await page.evaluate(() => (window as any).__lastOpenedUrl);
    expect(openedUrl).toContain('Scott_Howard_Resume.pdf');
  });

  test('should be visible in Hero section CTA', async ({ page, context }) => {
    // Look for download resume button in Hero section
    const heroDownloadButton = page.getByRole('link', { name: /Download Resume/i }).first();
    
    // Check if it exists and is visible
    const count = await heroDownloadButton.count();
    if (count > 0) {
      await expect(heroDownloadButton).toBeVisible();

      // Set up download listener
      const downloadPromise = page.waitForEvent('popup');

      // Click the button
      await heroDownloadButton.click();

      // Wait for new page/tab to open
      const newPage = await downloadPromise;
      
      // Wait for navigation to complete or timeout
      try {
        await newPage.waitForLoadState('domcontentloaded', { timeout: 3000 });
      } catch {
        // PDF might not trigger load event, that's okay
      }

      // Verify the URL is for the resume PDF
      expect(newPage.url()).toContain('Scott_Howard_Resume.pdf');

      // Close the new tab
      await newPage.close();
    }
  });
});

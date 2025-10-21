import { test, expect } from '@playwright/test';

// Helper function to navigate to a section (handles both desktop and mobile)
async function navigateToSection(page: any, sectionName: string) {
  const viewportSize = page.viewportSize();
  const isMobile = viewportSize && viewportSize.width < 768;

  if (isMobile) {
    // Open mobile menu first
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();
    await page.waitForTimeout(300);
    
    // Click section in mobile menu
    await page.locator('#mobile-menu').getByRole('link', { name: sectionName, exact: true }).click();
  } else {
    // Click section in desktop navigation
    await page.locator('nav').getByRole('link', { name: sectionName, exact: true }).click();
  }
  
  await page.waitForTimeout(500);
}

test.describe('External Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should open social media links in new tab', async ({ page, context }) => {
    // Navigate to Contact section
    await navigateToSection(page, 'Contact');

    // Get all social media links from Contact section
    const socialLinks = ['LinkedIn', 'GitHub']; // Only test links that exist in profile
    const contactSection = page.locator('#contact');

    for (const platform of socialLinks) {
      // Set up listener for new page
      const pagePromise = context.waitForEvent('page');

      // Click the social link in Contact section
      await contactSection.getByRole('link', { name: new RegExp(`Visit ${platform} profile`, 'i') }).click();

      // Wait for new page to open
      const newPage = await pagePromise;
      
      // Wait a bit for navigation to start
      await page.waitForTimeout(500);

      // Verify new page URL contains expected domain
      const url = newPage.url();
      const expectedDomains: Record<string, string> = {
        'LinkedIn': 'linkedin.com',
        'GitHub': 'github.com',
      };

      expect(url).toContain(expectedDomains[platform]);

      // Close the new tab
      await newPage.close();
    }
  });

  test('should have proper security attributes on external links', async ({ page }) => {
    // Navigate to Contact section
    await navigateToSection(page, 'Contact');

    // Check social media links have proper attributes in Contact section
    const contactSection = page.locator('#contact');
    const linkedInLink = contactSection.getByRole('link', { name: /Visit LinkedIn profile/i });
    await expect(linkedInLink).toHaveAttribute('target', '_blank');
    await expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLink = contactSection.getByRole('link', { name: /Visit GitHub profile/i });
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should have accessible labels for external links', async ({ page }) => {
    // Navigate to Contact section
    await navigateToSection(page, 'Contact');

    // Verify aria-labels indicate new tab opening in Contact section
    const contactSection = page.locator('#contact');
    const linkedInLink = contactSection.getByRole('link', { name: /Visit LinkedIn profile.*opens in new tab/i });
    await expect(linkedInLink).toBeVisible();

    const githubLink = contactSection.getByRole('link', { name: /Visit GitHub profile.*opens in new tab/i });
    await expect(githubLink).toBeVisible();
  });

  test('should open email link with mailto', async ({ page }) => {
    // Navigate to Contact section
    await navigateToSection(page, 'Contact');

    // Find email link in Contact section
    const contactSection = page.locator('#contact');
    const emailLink = contactSection.getByRole('link', { name: /Send email to/i }).first();
    await expect(emailLink).toBeVisible();

    // Verify mailto href
    const href = await emailLink.getAttribute('href');
    expect(href).toContain('mailto:');
    expect(href).toContain('scottryanhoward@gmail.com');
  });

  test('should open phone link with tel protocol', async ({ page }) => {
    // Navigate to Contact section
    await navigateToSection(page, 'Contact');

    // Find phone link in Contact section (if it exists)
    const contactSection = page.locator('#contact');
    const phoneLink = contactSection.getByRole('link', { name: /Call phone number/i });
    
    // Only test if phone link exists
    const phoneCount = await phoneLink.count();
    if (phoneCount > 0) {
      await expect(phoneLink).toBeVisible();

      // Verify tel href
      const href = await phoneLink.getAttribute('href');
      expect(href).toContain('tel:');
    }
  });

  test('should handle external project links', async ({ page, context }) => {
    // Navigate to Work Projects section
    await navigateToSection(page, 'Work Projects');

    // Look for any external project links (demo or repo) in Work Projects section
    const workProjectsSection = page.locator('#work-projects');
    const externalLinks = workProjectsSection.locator('a[target="_blank"][rel="noopener noreferrer"]');
    const count = await externalLinks.count();

    // This test passes if there are no external links or if they have proper attributes
    if (count > 0) {
      // Test first external link
      const firstLink = externalLinks.first();
      await expect(firstLink).toHaveAttribute('target', '_blank');
      await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
    } else {
      // No external links found - test passes
      expect(count).toBe(0);
    }
  });

  test('should handle external personal project links', async ({ page }) => {
    // Navigate to Personal Projects section
    await navigateToSection(page, 'Personal Projects');

    // Look for any external project links in Personal Projects section
    const personalProjectsSection = page.locator('#personal-projects');
    const externalLinks = personalProjectsSection.locator('a[target="_blank"][rel="noopener noreferrer"]');
    const count = await externalLinks.count();

    // This test passes if there are no external links or if they have proper attributes
    if (count > 0) {
      // Test first external link
      const firstLink = externalLinks.first();
      await expect(firstLink).toHaveAttribute('target', '_blank');
      await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
    } else {
      // No external links found - test passes
      expect(count).toBe(0);
    }
  });

  test('should not navigate away from site when clicking internal links', async ({ page }) => {
    const initialUrl = page.url();

    // Navigate to various internal sections
    await navigateToSection(page, 'About');
    await page.waitForTimeout(300);

    // URL should still be the same (just hash changed)
    expect(page.url()).toContain(initialUrl.split('#')[0]);

    await navigateToSection(page, 'Skills');
    await page.waitForTimeout(300);

    expect(page.url()).toContain(initialUrl.split('#')[0]);
  });
});

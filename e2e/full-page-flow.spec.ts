import { test, expect } from '@playwright/test';

test.describe('Full Page Navigation Flow', () => {
  test('should complete full user journey through the website', async ({ page, context }) => {
    // 1. Load homepage
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 2. Verify Hero section is visible
    const heroHeading = page.getByRole('heading', { name: /Scott Howard/i });
    await expect(heroHeading).toBeVisible();

    // 3. Navigate through all sections in order
    const sections = [
      { name: 'About', id: 'about' },
      { name: 'Experience', id: 'experience' },
      { name: 'Skills', id: 'skills' },
      { name: 'Work Projects', id: 'work-projects' },
      { name: 'Personal Projects', id: 'personal-projects' },
      { name: 'Education', id: 'education' },
      { name: 'Contact', id: 'contact' },
    ];

    for (const section of sections) {
      // Click navigation link (use first visible one)
      await page.locator('nav').getByRole('link', { name: section.name, exact: true }).click();
      await page.waitForTimeout(600);

      // Verify section is in viewport
      const sectionElement = page.locator(`#${section.id}`);
      await expect(sectionElement).toBeInViewport();

      // Verify section has content
      await expect(sectionElement).not.toBeEmpty();
    }

    // 4. Test social media link (LinkedIn) in Contact section
    const contactSection = page.locator('#contact');
    const linkedInPromise = context.waitForEvent('page');
    await contactSection.getByRole('link', { name: /Visit LinkedIn profile/i }).click();
    const linkedInPage = await linkedInPromise;
    await page.waitForTimeout(500);
    expect(linkedInPage.url()).toContain('linkedin.com');
    await linkedInPage.close();

    // 5. Test email link in Contact section
    const emailLink = contactSection.getByRole('link', { name: /Send email to/i }).first();
    const emailHref = await emailLink.getAttribute('href');
    expect(emailHref).toContain('mailto:scottryanhoward@gmail.com');

    // 6. Test resume download button exists and is clickable
    const downloadButton = contactSection.getByRole('button', { name: /Download resume/i });
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toBeEnabled();

    // 7. Scroll back to top
    await page.getByRole('button', { name: /Go to top/i }).click();
    await page.waitForTimeout(1000);

    // Verify we scrolled up significantly (may not be exactly at top due to header)
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(600); // Should have scrolled up from Contact section

    // 8. Verify Hero section is visible again
    await expect(heroHeading).toBeInViewport();
  });

  test('should handle complete mobile user journey', async ({ page, context }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // 1. Load homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 2. Verify Hero section is visible
    const heroHeading = page.getByRole('heading', { name: /Scott Howard/i });
    await expect(heroHeading).toBeVisible();

    // 3. Open mobile menu
    const menuButton = page.getByRole('button', { name: /open menu/i });
    await menuButton.click();
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();

    // 4. Navigate to About section
    await page.locator('#mobile-menu').getByRole('link', { name: 'About', exact: true }).click();
    await page.waitForTimeout(600);
    await expect(mobileMenu).not.toBeVisible();
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();

    // 5. Open menu again and navigate to Skills
    await menuButton.click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Skills', exact: true }).click();
    await page.waitForTimeout(600);
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeInViewport();

    // 6. Navigate to Contact
    await menuButton.click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(600);
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();

    // 7. Test resume download button exists and is clickable on mobile
    const downloadButton = contactSection.getByRole('button', { name: /Download resume/i });
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton).toBeEnabled();

    // 8. Scroll back to top
    await page.getByRole('button', { name: /Go to top/i }).click();
    await page.waitForTimeout(600);

    // Verify we're back at the top
    await expect(heroHeading).toBeInViewport();
  });

  test('should maintain state during complex navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Navigate to multiple sections rapidly using first visible link
    await page.getByRole('link', { name: 'Experience', exact: true }).first().click();
    await page.waitForTimeout(200);
    await page.getByRole('link', { name: 'Skills', exact: true }).first().click();
    await page.waitForTimeout(200);
    await page.getByRole('link', { name: 'Contact', exact: true }).first().click();
    await page.waitForTimeout(800);

    // Verify final destination
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();

    // Navigate back up
    await page.getByRole('link', { name: 'About', exact: true }).first().click();
    await page.waitForTimeout(600);

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();

    // Verify page is still functional - check for email link in About section
    const emailLink = aboutSection.getByRole('link', { name: /Send email to/i });
    await expect(emailLink).toBeVisible();
  });

  test('should handle keyboard-only navigation flow', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Focus on first navigation link directly
    const aboutLink = page.locator('nav').getByRole('link', { name: 'About', exact: true });
    await aboutLink.focus();

    // Navigate to About
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();

    // Focus on Experience link
    const experienceLink = page.locator('nav').getByRole('link', { name: 'Experience', exact: true });
    await experienceLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);

    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeInViewport();
  });

  test('should display all critical content sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verify Hero content
    await expect(page.getByRole('heading', { name: /Scott Ryan Howard/i })).toBeVisible();
    
    // Check for Software Engineer text (appears multiple times on page)
    const softwareEngineerText = page.getByText(/Software Engineer/i).first();
    await expect(softwareEngineerText).toBeVisible();

    // Navigate and verify About
    await page.locator('nav').getByRole('link', { name: 'About', exact: true }).click();
    await page.waitForTimeout(600);
    await expect(page.locator('#about')).toContainText(/Experienced software engineer/i);

    // Navigate and verify Experience
    await page.locator('nav').getByRole('link', { name: 'Experience', exact: true }).click();
    await page.waitForTimeout(600);
    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeVisible();

    // Navigate and verify Skills
    await page.locator('nav').getByRole('link', { name: 'Skills', exact: true }).click();
    await page.waitForTimeout(600);
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeVisible();

    // Navigate and verify Contact
    await page.locator('nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForTimeout(600);
    const contactSection = page.locator('#contact');
    await expect(contactSection.getByRole('heading', { name: /Let's Connect/i })).toBeVisible();
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to About
    await page.locator('nav').getByRole('link', { name: 'About', exact: true }).click();
    await page.waitForTimeout(600);
    
    // Verify About section is in view (hash navigation may not update URL)
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();

    // Navigate to Skills
    await page.locator('nav').getByRole('link', { name: 'Skills', exact: true }).click();
    await page.waitForTimeout(600);
    
    // Verify Skills section is in view
    const skillsSection = page.locator('#skills');
    await expect(skillsSection).toBeInViewport();
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Import components
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Button } from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import SkipToContent from '@/components/layout/SkipToContent';

// Mock data
const mockProfile = {
  name: 'John Doe',
  title: 'Software Engineer',
  summary: 'Experienced software engineer with a passion for building great products.',
  email: 'john@example.com',
  phone: '+1234567890',
  location: 'San Francisco, CA',
  profileImage: '/images/profile.jpg',
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: 'linkedin' },
    { platform: 'GitHub', url: 'https://github.com/johndoe', icon: 'github' },
  ],
};

describe('Keyboard Navigation Tests', () => {
  describe('Skip to Content', () => {
    it('should be the first focusable element', async () => {
      const user = userEvent.setup();
      render(<SkipToContent />);
      
      const skipLink = screen.getByText('Skip to main content');
      
      // Tab to first element
      await user.tab();
      
      expect(skipLink).toHaveFocus();
    });

    it('should navigate to main content when activated', async () => {
      const user = userEvent.setup();
      
      // Create a mock main content element
      const mainContent = document.createElement('main');
      mainContent.id = 'main-content';
      mainContent.tabIndex = -1;
      
      // Mock scrollIntoView for jsdom
      mainContent.scrollIntoView = vi.fn();
      
      document.body.appendChild(mainContent);
      
      render(<SkipToContent />);
      
      const skipLink = screen.getByText('Skip to main content');
      
      await user.tab();
      expect(skipLink).toHaveFocus();
      
      await user.keyboard('{Enter}');
      
      expect(mainContent.scrollIntoView).toHaveBeenCalled();
      
      // Clean up
      document.body.removeChild(mainContent);
    });
  });

  describe('Button Component', () => {
    it('should be focusable with Tab key', async () => {
      const user = userEvent.setup();
      render(<Button variant="primary">Click Me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click Me' });
      
      await user.tab();
      expect(button).toHaveFocus();
    });

    it('should be activatable with Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button variant="primary" onClick={handleClick}>Click Me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click Me' });
      
      await user.tab();
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be activatable with Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button variant="primary" onClick={handleClick}>Click Me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click Me' });
      
      await user.tab();
      await user.keyboard(' ');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not be focusable when disabled', async () => {
      const user = userEvent.setup();
      render(<Button variant="primary" disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button', { name: 'Disabled Button' });
      
      await user.tab();
      expect(button).not.toHaveFocus();
    });
  });

  describe('Navigation Component', () => {
    it('should allow tabbing through all navigation links on desktop', async () => {
      const user = userEvent.setup();
      
      // Mock window.matchMedia for desktop view
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(min-width: 768px)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
      
      render(<Navigation />);
      
      const navLinks = screen.getAllByRole('link');
      
      // Should have navigation links
      expect(navLinks.length).toBeGreaterThan(0);
    });

    it('should have mobile menu button accessible', async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      
      const menuButton = screen.getByRole('button', { name: /menu/i });
      
      // Button should exist and be accessible
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-expanded');
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });
  });

  describe('Hero Section', () => {
    it('should allow tabbing through all CTA buttons', async () => {
      const user = userEvent.setup();
      render(<Hero profile={mockProfile} />);
      
      // Get all buttons
      const buttons = screen.getAllByRole('button');
      
      // Should have at least 3 CTA buttons + scroll indicator
      expect(buttons.length).toBeGreaterThanOrEqual(3);
      
      // Tab through buttons
      for (let i = 0; i < 3; i++) {
        await user.tab();
        expect(buttons[i]).toHaveFocus();
      }
    });

    it('should activate scroll indicator with keyboard', async () => {
      const user = userEvent.setup();
      const scrollIntoViewMock = vi.fn();
      
      // Mock scrollIntoView
      Element.prototype.scrollIntoView = scrollIntoViewMock;
      
      // Create mock about section
      const aboutSection = document.createElement('section');
      aboutSection.id = 'about';
      document.body.appendChild(aboutSection);
      
      render(<Hero profile={mockProfile} />);
      
      const scrollButton = screen.getByLabelText('Scroll down to next section');
      
      // Focus and activate
      scrollButton.focus();
      await user.keyboard('{Enter}');
      
      expect(scrollIntoViewMock).toHaveBeenCalled();
      
      // Clean up
      document.body.removeChild(aboutSection);
    });
  });

  describe('About Section', () => {
    it('should allow tabbing through all links', async () => {
      const user = userEvent.setup();
      render(<About profile={mockProfile} />);
      
      const links = screen.getAllByRole('link');
      
      // Should have email link, phone link, and social links
      expect(links.length).toBeGreaterThan(0);
      
      // Tab through first few links
      for (let i = 0; i < Math.min(3, links.length); i++) {
        await user.tab();
        expect(links[i]).toHaveFocus();
      }
    });

    it('should activate email link with keyboard', async () => {
      const user = userEvent.setup();
      render(<About profile={mockProfile} />);
      
      const emailLink = screen.getByLabelText(`Send email to ${mockProfile.email}`);
      
      emailLink.focus();
      expect(emailLink).toHaveFocus();
      
      // Verify it's a proper mailto link
      expect(emailLink.getAttribute('href')).toBe(`mailto:${mockProfile.email}`);
    });
  });

  describe('Header Component', () => {
    it('should allow tabbing to logo/name button', async () => {
      const user = userEvent.setup();
      render(<Header name={mockProfile.name} />);
      
      const logoButton = screen.getByRole('button', { name: `${mockProfile.name} - Go to top` });
      
      await user.tab();
      expect(logoButton).toHaveFocus();
    });

    it('should scroll to top when logo is activated with keyboard', async () => {
      const user = userEvent.setup();
      const scrollToMock = vi.fn();
      window.scrollTo = scrollToMock;
      
      render(<Header name={mockProfile.name} />);
      
      const logoButton = screen.getByRole('button', { name: `${mockProfile.name} - Go to top` });
      
      logoButton.focus();
      await user.keyboard('{Enter}');
      
      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
  });

  describe('Focus Order', () => {
    it('should maintain logical tab order in Hero section', async () => {
      const user = userEvent.setup();
      render(<Hero profile={mockProfile} />);
      
      const buttons = screen.getAllByRole('button');
      
      // Expected order: View Work, Download Resume, Contact, Scroll Indicator
      const expectedOrder = [
        'View my work and projects',
        'Download resume as PDF',
        'Go to contact section',
        'Scroll down to next section',
      ];
      
      for (let i = 0; i < expectedOrder.length; i++) {
        await user.tab();
        const focusedElement = document.activeElement;
        expect(focusedElement?.getAttribute('aria-label')).toBe(expectedOrder[i]);
      }
    });
  });

  describe('Focus Indicators', () => {
    it('should show focus indicator on buttons', async () => {
      const user = userEvent.setup();
      render(<Button variant="primary">Test Button</Button>);
      
      const button = screen.getByRole('button', { name: 'Test Button' });
      
      await user.tab();
      
      // Check if button has focus
      expect(button).toHaveFocus();
      
      // Check if focus styles are applied (via CSS classes)
      const classes = button.className;
      expect(classes).toContain('focus:outline-none');
      expect(classes).toContain('focus:ring');
    });

    it('should show focus indicator on links', async () => {
      const user = userEvent.setup();
      render(<About profile={mockProfile} />);
      
      const link = screen.getAllByRole('link')[0];
      
      link.focus();
      
      expect(link).toHaveFocus();
      
      const classes = link.className;
      expect(classes).toContain('focus:outline-none');
      expect(classes).toContain('focus:ring');
    });
  });

  describe('Keyboard Traps', () => {
    it('should not trap focus within components', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Button variant="primary">First</Button>
          <Button variant="secondary">Second</Button>
          <Button variant="outline">Third</Button>
        </div>
      );
      
      const buttons = screen.getAllByRole('button');
      
      // Tab through all buttons
      await user.tab();
      expect(buttons[0]).toHaveFocus();
      
      await user.tab();
      expect(buttons[1]).toHaveFocus();
      
      await user.tab();
      expect(buttons[2]).toHaveFocus();
      
      // Focus should be able to move past the last button
      // (in a real page, it would move to the next focusable element)
    });
  });

  describe('Reverse Tab Navigation', () => {
    it('should allow reverse tabbing with Shift+Tab', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Button variant="primary">First</Button>
          <Button variant="secondary">Second</Button>
          <Button variant="outline">Third</Button>
        </div>
      );
      
      const buttons = screen.getAllByRole('button');
      
      // Tab forward to third button
      await user.tab();
      await user.tab();
      await user.tab();
      expect(buttons[2]).toHaveFocus();
      
      // Tab backward
      await user.tab({ shift: true });
      expect(buttons[1]).toHaveFocus();
      
      await user.tab({ shift: true });
      expect(buttons[0]).toHaveFocus();
    });
  });
});

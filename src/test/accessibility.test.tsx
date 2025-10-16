import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

// Import components to test
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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

const mockExperiences = [
  {
    id: 'exp-1',
    company: 'Tech Corp',
    companyLogo: '/images/company.jpg',
    position: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    startDate: '2020-01',
    endDate: 'Present' as const,
    description: 'Leading development of core platform features.',
    responsibilities: ['Lead team of 5 engineers', 'Design system architecture'],
    achievements: ['Improved performance by 50%', 'Reduced bugs by 30%'],
    technologies: ['React', 'TypeScript', 'Node.js'],
    relatedProjects: ['proj-1'],
  },
];

const mockSkillCategories = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'JavaScript', category: 'Programming Languages' },
      { name: 'TypeScript', category: 'Programming Languages' },
    ],
  },
];

describe('Accessibility Tests', () => {
  describe('Layout Components', () => {
    it('Header should have no accessibility violations', async () => {
      const { container } = render(<Header name="John Doe" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Footer should have no accessibility violations', async () => {
      const { container } = render(<Footer socialLinks={mockProfile.socialLinks} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Navigation should have no accessibility violations', async () => {
      const { container } = render(<Navigation />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('SkipToContent should have no accessibility violations', async () => {
      const { container } = render(<SkipToContent />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Section Components', () => {
    it('Hero section should have no accessibility violations', async () => {
      const { container } = render(<Hero profile={mockProfile} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('About section should have no accessibility violations', async () => {
      const { container } = render(<About profile={mockProfile} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Experience section should have no accessibility violations', async () => {
      const { container } = render(<Experience experiences={mockExperiences} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Skills section should have no accessibility violations', async () => {
      const { container } = render(<Skills skillCategories={mockSkillCategories} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Contact section should have no accessibility violations', async () => {
      const { container } = render(<Contact profile={mockProfile} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('UI Components', () => {
    it('Button component should have no accessibility violations', async () => {
      const { container } = render(
        <Button variant="primary" aria-label="Test button">
          Click Me
        </Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('Card component should have no accessibility violations', async () => {
      const { container } = render(
        <Card>
          <h3>Card Title</h3>
          <p>Card content</p>
        </Card>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Heading Hierarchy', () => {
    it('Hero section should have proper heading hierarchy', () => {
      const { container } = render(<Hero profile={mockProfile} />);
      
      const h1 = container.querySelector('h1');
      const h2 = container.querySelector('h2');
      
      expect(h1).toBeTruthy();
      expect(h1?.textContent).toBe(mockProfile.name);
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toBe(mockProfile.title);
    });

    it('About section should have h2 heading', () => {
      const { container } = render(<About profile={mockProfile} />);
      
      const h2 = container.querySelector('h2');
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toBe('About Me');
    });

    it('Experience section should have proper heading hierarchy', () => {
      const { container } = render(<Experience experiences={mockExperiences} />);
      
      const h2 = container.querySelector('h2');
      const h3 = container.querySelector('h3');
      const h4 = container.querySelector('h4');
      
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toBe('Work Experience');
      expect(h3).toBeTruthy();
      expect(h4).toBeTruthy();
    });
  });

  describe('ARIA Labels and Landmarks', () => {
    it('Hero section should have proper ARIA label', () => {
      const { container } = render(<Hero profile={mockProfile} />);
      const section = container.querySelector('section');
      expect(section?.getAttribute('aria-label')).toBe('Hero section');
    });

    it('About section should have proper ARIA label', () => {
      const { container } = render(<About profile={mockProfile} />);
      const section = container.querySelector('section');
      expect(section?.getAttribute('aria-label')).toBe('About section');
    });

    it('Experience section should have proper ARIA label', () => {
      const { container } = render(<Experience experiences={mockExperiences} />);
      const section = container.querySelector('section');
      expect(section?.getAttribute('aria-label')).toBe('Work experience section');
    });

    it('Header should have banner role', () => {
      const { container } = render(<Header name="John Doe" />);
      const header = container.querySelector('header');
      expect(header?.getAttribute('role')).toBe('banner');
    });

    it('Footer should have contentinfo role', () => {
      const { container } = render(<Footer socialLinks={mockProfile.socialLinks} />);
      const footer = container.querySelector('footer');
      expect(footer?.getAttribute('role')).toBe('contentinfo');
    });

    it('Navigation should have navigation role', () => {
      const { container } = render(<Navigation />);
      const nav = container.querySelector('nav');
      expect(nav?.getAttribute('role')).toBe('navigation');
    });
  });

  describe('Keyboard Navigation', () => {
    it('All buttons should be keyboard accessible', () => {
      const { container } = render(
        <div>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      );
      
      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button.getAttribute('type')).toBe('button');
        expect(button.tabIndex).toBeGreaterThanOrEqual(0);
      });
    });

    it('All links should be keyboard accessible', () => {
      const { container } = render(<About profile={mockProfile} />);
      
      const links = container.querySelectorAll('a');
      links.forEach(link => {
        expect(link.tabIndex).toBeGreaterThanOrEqual(0);
      });
    });

    it('Skip to content link should be focusable', () => {
      const { container } = render(<SkipToContent />);
      const link = container.querySelector('a');
      
      expect(link).toBeTruthy();
      expect(link?.getAttribute('href')).toBe('#main-content');
    });
  });

  describe('Focus Indicators', () => {
    it('Buttons should have focus styles', () => {
      const { container } = render(<Button variant="primary">Click Me</Button>);
      const button = container.querySelector('button');
      
      // Check if focus classes are present
      const classes = button?.className || '';
      expect(classes).toContain('focus:outline-none');
      expect(classes).toContain('focus:ring');
    });

    it('Links should have focus styles', () => {
      const { container } = render(<About profile={mockProfile} />);
      const link = container.querySelector('a');
      
      const classes = link?.className || '';
      expect(classes).toContain('focus:outline-none');
      expect(classes).toContain('focus:ring');
    });
  });

  describe('Color Contrast', () => {
    it('Primary button should have sufficient color contrast', async () => {
      const { container } = render(<Button variant="primary">Click Me</Button>);
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });

    it('Text content should have sufficient color contrast', async () => {
      const { container } = render(<About profile={mockProfile} />);
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      expect(results).toHaveNoViolations();
    });
  });

  describe('Images and Alt Text', () => {
    it('Profile image should have alt text', () => {
      const { container } = render(<Hero profile={mockProfile} />);
      const img = container.querySelector('img');
      
      expect(img?.getAttribute('alt')).toBeTruthy();
      expect(img?.getAttribute('alt')).toContain(mockProfile.name);
    });

    it('Decorative icons should have aria-hidden', () => {
      const { container } = render(<Hero profile={mockProfile} />);
      const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
      
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('Form Elements', () => {
    it('Email links should have proper mailto format', () => {
      const { container } = render(<About profile={mockProfile} />);
      const emailLinks = Array.from(container.querySelectorAll('a')).filter(
        link => link.getAttribute('href')?.startsWith('mailto:')
      );
      
      expect(emailLinks.length).toBeGreaterThan(0);
      emailLinks.forEach(link => {
        expect(link.getAttribute('href')).toContain(mockProfile.email);
      });
    });
  });

  describe('External Links', () => {
    it('External links should have rel="noopener noreferrer"', () => {
      const { container } = render(<About profile={mockProfile} />);
      const externalLinks = Array.from(container.querySelectorAll('a[target="_blank"]'));
      
      externalLinks.forEach(link => {
        const rel = link.getAttribute('rel');
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      });
    });

    it('External links should indicate they open in new tab', () => {
      const { container } = render(<About profile={mockProfile} />);
      const externalLinks = Array.from(container.querySelectorAll('a[target="_blank"]'));
      
      externalLinks.forEach(link => {
        const ariaLabel = link.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
      });
    });
  });
});

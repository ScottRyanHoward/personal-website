/**
 * Responsive Design Tests
 * Tests for mobile, tablet, and desktop layouts across all breakpoints
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { WorkProjects } from '@/components/sections/WorkProjects';
import { PersonalProjects } from '@/components/sections/PersonalProjects';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import type { Profile, Experience as ExperienceType, SkillCategory } from '@/types';

// Mock data
const mockProfile: Profile = {
  name: 'John Doe',
  title: 'Software Engineer',
  summary: 'Experienced developer',
  email: 'john@example.com',
  location: 'San Francisco, CA',
  profileImage: '/images/profile.jpg',
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { platform: 'GitHub', url: 'https://github.com', icon: 'github' },
  ],
};

const mockExperiences: ExperienceType[] = [
  {
    id: 'exp-1',
    company: 'Tech Corp',
    companyLogo: '/images/company.jpg',
    position: 'Senior Developer',
    location: 'San Francisco, CA',
    startDate: '2020-01',
    endDate: 'Present',
    description: 'Leading development team',
    responsibilities: ['Code review', 'Architecture'],
    achievements: ['Improved performance by 50%'],
    technologies: ['React', 'TypeScript', 'Node.js'],
    relatedProjects: ['proj-1'],
  },
];

const mockSkillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'JavaScript', category: 'Programming Languages' },
      { name: 'TypeScript', category: 'Programming Languages' },
      { name: 'Python', category: 'Programming Languages' },
    ],
  },
];

// Helper to set viewport size
const setViewportSize = (width: number, height: number = 768) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
};

describe('Responsive Design - Mobile Layout (< 640px)', () => {
  beforeEach(() => {
    setViewportSize(375, 667); // iPhone SE dimensions
  });

  it('should render Hero section with mobile-optimized layout', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    
    // Check for mobile-specific classes
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    
    // Verify profile image has mobile size (updated classes)
    const imageContainer = container.querySelector('.sm\\:h-48.sm\\:w-48');
    expect(imageContainer).toBeInTheDocument();
    
    // Verify buttons stack vertically on mobile
    const buttonContainer = container.querySelector('.flex-col.sm\\:flex-row');
    expect(buttonContainer).toBeInTheDocument();
  });

  it('should render Header with mobile menu button', () => {
    render(<Header name="John Doe" />);
    
    // Mobile menu button should be visible
    const menuButton = screen.getByLabelText(/open menu|close menu/i);
    expect(menuButton).toBeInTheDocument();
  });

  it('should render Experience section with mobile timeline', () => {
    const { container } = render(<Experience experiences={mockExperiences} />);
    
    // Timeline should be vertical on mobile
    const timeline = container.querySelector('.relative');
    expect(timeline).toBeInTheDocument();
    
    // Check for mobile-specific spacing
    const content = container.querySelector('.gap-4');
    expect(content).toBeInTheDocument();
  });

  it('should render Skills section with proper mobile spacing', () => {
    const { container } = render(<Skills skillCategories={mockSkillCategories} />);
    
    // Skills should wrap properly on mobile
    const skillsContainer = container.querySelector('.flex-wrap');
    expect(skillsContainer).toBeInTheDocument();
  });

  it('should render WorkProjects with single column grid on mobile', () => {
    const { container } = render(<WorkProjects />);
    
    // Grid should be single column on mobile
    const grid = container.querySelector('.grid-cols-1');
    expect(grid).toBeInTheDocument();
  });

  it('should have appropriate touch target sizes (min 44x44px)', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    
    // CTA buttons should have adequate touch targets
    const ctaButtons = container.querySelectorAll('.flex-col.sm\\:flex-row button');
    expect(ctaButtons.length).toBeGreaterThan(0);
    
    // Verify buttons have padding classes for adequate touch targets
    ctaButtons.forEach(button => {
      const classes = button.className;
      // Buttons should have padding classes
      expect(classes).toMatch(/px-|py-/);
    });
  });
});

describe('Responsive Design - Tablet Layout (640px - 1024px)', () => {
  beforeEach(() => {
    setViewportSize(768, 1024); // iPad dimensions
  });

  it('should render Hero section with tablet-optimized layout', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    
    // Profile image should be larger on tablet
    const imageContainer = container.querySelector('.md\\:h-64.md\\:w-64');
    expect(imageContainer).toBeInTheDocument();
    
    // Buttons should be horizontal on tablet
    const buttonContainer = container.querySelector('.sm\\:flex-row');
    expect(buttonContainer).toBeInTheDocument();
  });

  it('should render Experience section with tablet spacing', () => {
    const { container } = render(<Experience experiences={mockExperiences} />);
    
    // Tablet should have larger gaps
    const content = container.querySelector('.md\\:gap-8');
    expect(content).toBeInTheDocument();
  });

  it('should render WorkProjects with 2-column grid on tablet', () => {
    const { container } = render(<WorkProjects />);
    
    // Grid should be 2 columns on tablet
    const grid = container.querySelector('.md\\:grid-cols-2');
    expect(grid).toBeInTheDocument();
  });

  it('should show desktop navigation on tablet', () => {
    const { container } = render(<Navigation />);
    
    // Desktop nav should be visible on tablet
    const desktopNav = container.querySelector('.hidden.md\\:flex');
    expect(desktopNav).toBeInTheDocument();
  });
});

describe('Responsive Design - Desktop Layout (> 1024px)', () => {
  beforeEach(() => {
    setViewportSize(1440, 900); // Standard desktop
  });

  it('should render Hero section with desktop-optimized layout', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    
    // Typography should be larger on desktop
    const heading = container.querySelector('.lg\\:text-6xl');
    expect(heading).toBeInTheDocument();
  });

  it('should render WorkProjects with 3-column grid on desktop', () => {
    const { container } = render(<WorkProjects />);
    
    // Grid should be 3 columns on desktop
    const grid = container.querySelector('.lg\\:grid-cols-3');
    expect(grid).toBeInTheDocument();
  });

  it('should have proper desktop spacing and padding', () => {
    const { container } = render(<Skills skillCategories={mockSkillCategories} />);
    
    // Desktop should have larger padding
    const section = container.querySelector('.lg\\:px-16');
    expect(section).toBeInTheDocument();
  });

  it('should show full desktop navigation', () => {
    const { container } = render(<Navigation />);
    
    // Desktop nav should be fully visible
    const desktopNav = container.querySelector('.hidden.md\\:flex');
    expect(desktopNav).toBeInTheDocument();
    
    // Mobile menu button should be hidden
    const mobileButton = container.querySelector('.md\\:hidden');
    expect(mobileButton).toBeInTheDocument();
  });
});

describe('Responsive Design - Breakpoint Transitions', () => {
  it('should smoothly transition from mobile to tablet', () => {
    const { container, rerender } = render(<Hero profile={mockProfile} />);
    
    // Start at mobile
    setViewportSize(375);
    rerender(<Hero profile={mockProfile} />);
    
    // Transition to tablet
    setViewportSize(768);
    rerender(<Hero profile={mockProfile} />);
    
    // Component should still render correctly
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should smoothly transition from tablet to desktop', () => {
    const { container, rerender } = render(<WorkProjects />);
    
    // Start at tablet
    setViewportSize(768);
    rerender(<WorkProjects />);
    
    // Transition to desktop
    setViewportSize(1440);
    rerender(<WorkProjects />);
    
    // Component should still render correctly
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should maintain content visibility during transitions', () => {
    const { rerender } = render(<Experience experiences={mockExperiences} />);
    
    // Test multiple viewport sizes
    const viewports = [375, 640, 768, 1024, 1440];
    
    viewports.forEach(width => {
      setViewportSize(width);
      rerender(<Experience experiences={mockExperiences} />);
      
      // Content should always be visible
      expect(screen.getByText('Tech Corp')).toBeInTheDocument();
      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });
  });
});

describe('Responsive Design - Touch Interactions', () => {
  beforeEach(() => {
    setViewportSize(375, 667); // Mobile viewport
  });

  it('should have touch-friendly button sizes', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    
    // CTA buttons should have adequate padding for touch
    const ctaButtons = container.querySelectorAll('.flex-col.sm\\:flex-row button');
    expect(ctaButtons.length).toBeGreaterThan(0);
    
    ctaButtons.forEach(button => {
      const classes = button.className;
      expect(classes).toMatch(/px-|py-/); // Has padding classes
    });
  });

  it('should have proper spacing between touch targets', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    
    // Button container should have gap for touch targets (updated classes)
    const buttonContainer = container.querySelector('.gap-3');
    expect(buttonContainer).toBeInTheDocument();
  });

  it('should support touch-friendly navigation', () => {
    render(<Navigation />);
    
    // Mobile menu button should be easily tappable
    const menuButton = screen.getByLabelText(/open menu|close menu/i);
    expect(menuButton).toBeInTheDocument();
    
    const classes = menuButton.className;
    expect(classes).toMatch(/p-\d+/); // Has padding
  });
});

describe('Responsive Design - Content Reflow', () => {
  it('should reflow text content appropriately on mobile', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    
    // Text should be centered on mobile
    const textContainer = container.querySelector('.text-center');
    expect(textContainer).toBeInTheDocument();
  });

  it('should adjust image sizes across breakpoints', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    
    // Image container should have responsive classes (updated)
    const imageContainer = container.querySelector('.sm\\:h-48.sm\\:w-48');
    expect(imageContainer).toBeInTheDocument();
  });

  it('should adjust grid layouts across breakpoints', () => {
    const { container } = render(<WorkProjects />);
    
    // Grid should have responsive column classes
    const grid = container.querySelector('.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    expect(grid).toBeInTheDocument();
  });
});

describe('Responsive Design - Typography Scaling', () => {
  it('should scale heading sizes appropriately', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    
    // Main heading should have responsive text sizes
    const heading = container.querySelector('h1');
    expect(heading?.className).toMatch(/text-\d+xl/);
    expect(heading?.className).toMatch(/md:text-\d+xl/);
    expect(heading?.className).toMatch(/lg:text-\d+xl/);
  });

  it('should maintain readable line lengths', () => {
    const { container } = render(<Hero profile={mockProfile} />);
    
    // Hero container should have max-width for readability
    const container_element = container.querySelector('.max-w-6xl');
    expect(container_element).toBeInTheDocument();
    
    // Button container should have responsive max-width
    const buttonContainer = container.querySelector('.max-w-md');
    expect(buttonContainer).toBeInTheDocument();
  });
});

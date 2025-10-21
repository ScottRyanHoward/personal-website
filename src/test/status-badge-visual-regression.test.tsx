/**
 * Status Badge Visual Regression Tests
 * Tests for correct color rendering, responsive behavior, and accessibility contrast ratios
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { PersonalProjectCard } from '@/components/ui/PersonalProjectCard';
import { PersonalProject } from '@/types';

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock project data for testing different status types
const baseProject: PersonalProject = {
  id: 'test-proj-1',
  title: 'Test Project',
  description: 'A test project description',
  longDescription: 'A longer description of the test project',
  motivation: 'Built this to solve a common problem',
  technologies: ['React', 'TypeScript'],
  images: [],
  featured: true,
  startDate: '2023-01',
  endDate: '2023-06',
  status: 'completed',
};

// Helper to set viewport size for responsive testing
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

describe('Status Badge Visual Regression Tests', () => {
  describe('Color Rendering Verification', () => {
    it('should render ideation status with correct pink color classes', () => {
      const ideationProject = { ...baseProject, status: 'ideation' as const };
      render(<PersonalProjectCard project={ideationProject} />);
      
      const statusBadge = screen.getByText('Ideation');
      expect(statusBadge).toBeInTheDocument();
      expect(statusBadge).toHaveClass('bg-pink-100', 'text-pink-800');
      
      // Verify the badge has proper styling classes
      expect(statusBadge).toHaveClass('inline-block', 'px-2', 'py-1', 'text-xs', 'font-medium', 'rounded-full', 'whitespace-nowrap');
    });

    it('should render in-progress status with correct yellow color classes', () => {
      const inProgressProject = { ...baseProject, status: 'in-progress' as const };
      render(<PersonalProjectCard project={inProgressProject} />);
      
      const statusBadge = screen.getByText('In Progress');
      expect(statusBadge).toBeInTheDocument();
      expect(statusBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
      
      // Verify the badge has proper styling classes
      expect(statusBadge).toHaveClass('inline-block', 'px-2', 'py-1', 'text-xs', 'font-medium', 'rounded-full', 'whitespace-nowrap');
    });

    it('should render completed status with correct green color classes', () => {
      const completedProject = { ...baseProject, status: 'completed' as const };
      render(<PersonalProjectCard project={completedProject} />);
      
      const statusBadge = screen.getByText('Completed');
      expect(statusBadge).toBeInTheDocument();
      expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
      
      // Verify the badge has proper styling classes
      expect(statusBadge).toHaveClass('inline-block', 'px-2', 'py-1', 'text-xs', 'font-medium', 'rounded-full', 'whitespace-nowrap');
    });

    it('should maintain consistent badge structure across all status types', () => {
      const statuses: Array<{ status: 'ideation' | 'in-progress' | 'completed', label: string, colorClasses: string[] }> = [
        { status: 'ideation', label: 'Ideation', colorClasses: ['bg-pink-100', 'text-pink-800'] },
        { status: 'in-progress', label: 'In Progress', colorClasses: ['bg-yellow-100', 'text-yellow-800'] },
        { status: 'completed', label: 'Completed', colorClasses: ['bg-green-100', 'text-green-800'] },
      ];

      statuses.forEach(({ status, label, colorClasses }) => {
        const project = { ...baseProject, status };
        const { unmount } = render(<PersonalProjectCard project={project} />);
        
        const statusBadge = screen.getByText(label);
        expect(statusBadge).toBeInTheDocument();
        
        // Verify color classes
        colorClasses.forEach(colorClass => {
          expect(statusBadge).toHaveClass(colorClass);
        });
        
        // Verify consistent structural classes
        expect(statusBadge).toHaveClass('inline-block', 'px-2', 'py-1', 'text-xs', 'font-medium', 'rounded-full', 'whitespace-nowrap');
        
        // Verify accessibility label
        expect(statusBadge).toHaveAttribute('aria-label', `Project status: ${label}`);
        
        unmount();
      });
    });
  });

  describe('Responsive Behavior Testing', () => {
    beforeEach(() => {
      // Reset to default desktop size before each test
      setViewportSize(1440, 900);
    });

    it('should maintain status badge layout on mobile screens', () => {
      setViewportSize(375, 667); // iPhone SE dimensions
      
      const project = { ...baseProject, status: 'in-progress' as const };
      const { container } = render(<PersonalProjectCard project={project} />);
      
      const statusBadge = screen.getByText('In Progress');
      expect(statusBadge).toBeInTheDocument();
      
      // Badge should maintain its styling on mobile
      expect(statusBadge).toHaveClass('whitespace-nowrap');
      expect(statusBadge).toHaveClass('text-xs');
      
      // Verify the badge container maintains proper layout
      const titleContainer = container.querySelector('.flex.items-start.justify-between');
      expect(titleContainer).toBeInTheDocument();
    });

    it('should maintain status badge layout on tablet screens', () => {
      setViewportSize(768, 1024); // iPad dimensions
      
      const project = { ...baseProject, status: 'ideation' as const };
      const { container } = render(<PersonalProjectCard project={project} />);
      
      const statusBadge = screen.getByText('Ideation');
      expect(statusBadge).toBeInTheDocument();
      
      // Badge should maintain consistent sizing on tablet
      expect(statusBadge).toHaveClass('px-2', 'py-1', 'text-xs');
      
      // Verify proper alignment with title
      const titleContainer = container.querySelector('.flex.items-start.justify-between');
      expect(titleContainer).toBeInTheDocument();
    });

    it('should maintain status badge layout on desktop screens', () => {
      setViewportSize(1440, 900); // Standard desktop
      
      const project = { ...baseProject, status: 'completed' as const };
      const { container } = render(<PersonalProjectCard project={project} />);
      
      const statusBadge = screen.getByText('Completed');
      expect(statusBadge).toBeInTheDocument();
      
      // Badge should maintain consistent styling on desktop
      expect(statusBadge).toHaveClass('rounded-full', 'font-medium');
      
      // Verify proper spacing and alignment
      const titleContainer = container.querySelector('.flex.items-start.justify-between.gap-2');
      expect(titleContainer).toBeInTheDocument();
    });

    it('should prevent status badge text wrapping across all screen sizes', () => {
      const viewports = [
        { width: 320, height: 568 }, // iPhone 5/SE
        { width: 375, height: 667 }, // iPhone 6/7/8
        { width: 768, height: 1024 }, // iPad
        { width: 1024, height: 768 }, // Desktop small
        { width: 1440, height: 900 }, // Desktop standard
      ];

      const project = { ...baseProject, status: 'in-progress' as const };

      viewports.forEach(({ width, height }) => {
        setViewportSize(width, height);
        const { unmount } = render(<PersonalProjectCard project={project} />);
        
        const statusBadge = screen.getByText('In Progress');
        expect(statusBadge).toHaveClass('whitespace-nowrap');
        
        unmount();
      });
    });
  });

  describe('Accessibility Contrast Ratio Validation', () => {
    it('should pass accessibility checks for ideation status badge', async () => {
      const ideationProject = { ...baseProject, status: 'ideation' as const };
      const { container } = render(<PersonalProjectCard project={ideationProject} />);
      
      // Run axe accessibility tests with focus on color contrast
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      
      expect(results).toHaveNoViolations();
      
      // Verify the status badge specifically
      const statusBadge = screen.getByText('Ideation');
      expect(statusBadge).toHaveClass('bg-pink-100', 'text-pink-800');
    });

    it('should pass accessibility checks for in-progress status badge', async () => {
      const inProgressProject = { ...baseProject, status: 'in-progress' as const };
      const { container } = render(<PersonalProjectCard project={inProgressProject} />);
      
      // Run axe accessibility tests with focus on color contrast
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      
      expect(results).toHaveNoViolations();
      
      // Verify the status badge specifically
      const statusBadge = screen.getByText('In Progress');
      expect(statusBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
    });

    it('should pass accessibility checks for completed status badge', async () => {
      const completedProject = { ...baseProject, status: 'completed' as const };
      const { container } = render(<PersonalProjectCard project={completedProject} />);
      
      // Run axe accessibility tests with focus on color contrast
      const results = await axe(container, {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
      
      expect(results).toHaveNoViolations();
      
      // Verify the status badge specifically
      const statusBadge = screen.getByText('Completed');
      expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('should have proper ARIA labels for screen readers', () => {
      const statuses: Array<{ status: 'ideation' | 'in-progress' | 'completed', label: string }> = [
        { status: 'ideation', label: 'Ideation' },
        { status: 'in-progress', label: 'In Progress' },
        { status: 'completed', label: 'Completed' },
      ];

      statuses.forEach(({ status, label }) => {
        const project = { ...baseProject, status };
        const { unmount } = render(<PersonalProjectCard project={project} />);
        
        const statusBadge = screen.getByLabelText(`Project status: ${label}`);
        expect(statusBadge).toBeInTheDocument();
        expect(statusBadge).toHaveAttribute('aria-label', `Project status: ${label}`);
        
        unmount();
      });
    });

    it('should maintain accessibility when status badges are focused', async () => {
      const project = { ...baseProject, status: 'in-progress' as const };
      const { container } = render(<PersonalProjectCard project={project} />);
      
      const statusBadge = screen.getByText('In Progress');
      
      // Focus the status badge (though it's not interactive, it should still be accessible)
      statusBadge.focus();
      
      // Run accessibility tests while focused
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Status Badge Visual Consistency', () => {
    it('should maintain consistent badge dimensions across all status types', () => {
      const statuses: Array<'ideation' | 'in-progress' | 'completed'> = ['ideation', 'in-progress', 'completed'];
      
      statuses.forEach(status => {
        const project = { ...baseProject, status };
        const { unmount } = render(<PersonalProjectCard project={project} />);
        
        const statusBadge = screen.getByText(status === 'ideation' ? 'Ideation' : status === 'in-progress' ? 'In Progress' : 'Completed');
        
        // All badges should have consistent padding and sizing
        expect(statusBadge).toHaveClass('px-2', 'py-1', 'text-xs');
        expect(statusBadge).toHaveClass('rounded-full', 'font-medium');
        
        unmount();
      });
    });

    it('should maintain proper visual hierarchy with project title', () => {
      const project = { ...baseProject, status: 'in-progress' as const };
      const { container } = render(<PersonalProjectCard project={project} />);
      
      const title = screen.getByText('Test Project');
      const statusBadge = screen.getByText('In Progress');
      
      // Title should be larger and more prominent
      expect(title).toHaveClass('text-xl', 'font-bold');
      expect(statusBadge).toHaveClass('text-xs', 'font-medium');
      
      // They should be properly aligned
      const titleContainer = container.querySelector('.flex.items-start.justify-between');
      expect(titleContainer).toBeInTheDocument();
    });

    it('should render status badges with proper spacing in card layout', () => {
      const project = { ...baseProject, status: 'completed' as const };
      const { container } = render(<PersonalProjectCard project={project} />);
      
      // Verify the gap between title and status badge
      const titleContainer = container.querySelector('.flex.items-start.justify-between.gap-2');
      expect(titleContainer).toBeInTheDocument();
      
      // Verify the status badge doesn't interfere with other elements
      const statusBadge = screen.getByText('Completed');
      expect(statusBadge).toHaveClass('whitespace-nowrap');
    });
  });

  describe('Legacy Status Handling Visual Tests', () => {
    it('should render archived status as completed with correct visual styling', () => {
      const archivedProject = { ...baseProject, status: 'archived' as any };
      render(<PersonalProjectCard project={archivedProject} />);
      
      const statusBadge = screen.getByText('Completed');
      expect(statusBadge).toBeInTheDocument();
      expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
      expect(statusBadge).toHaveAttribute('aria-label', 'Project status: Completed');
    });

    it('should handle invalid status with default completed styling', () => {
      const invalidProject = { ...baseProject, status: 'invalid-status' as any };
      render(<PersonalProjectCard project={invalidProject} />);
      
      const statusBadge = screen.getByText('Completed');
      expect(statusBadge).toBeInTheDocument();
      expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('should handle missing status with default completed styling', () => {
      const noStatusProject = { ...baseProject, status: undefined as any };
      render(<PersonalProjectCard project={noStatusProject} />);
      
      const statusBadge = screen.getByText('Completed');
      expect(statusBadge).toBeInTheDocument();
      expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
    });
  });
});
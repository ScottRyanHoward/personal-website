import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillBadge } from './SkillBadge';

describe('SkillBadge Component', () => {
  describe('Rendering', () => {
    it('renders with skill name', () => {
      render(<SkillBadge name="JavaScript" />);
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    it('renders with skill name and category', () => {
      render(<SkillBadge name="React" category="Frameworks" />);
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('has listitem role for semantic structure', () => {
      render(<SkillBadge name="TypeScript" />);
      expect(screen.getByRole('listitem')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has aria-label with skill name only', () => {
      render(<SkillBadge name="Python" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveAttribute('aria-label', 'Python');
    });

    it('has aria-label with skill name and category', () => {
      render(<SkillBadge name="PostgreSQL" category="Databases" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveAttribute('aria-label', 'PostgreSQL - Databases');
    });
  });

  describe('Category-Based Color Coding', () => {
    it('applies blue color for programming languages', () => {
      render(<SkillBadge name="JavaScript" category="Programming Languages" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800');
    });

    it('applies blue color for languages category', () => {
      render(<SkillBadge name="Python" category="Languages" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800');
    });

    it('applies green color for frameworks', () => {
      render(<SkillBadge name="React" category="Frameworks" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('applies purple color for tools', () => {
      render(<SkillBadge name="Git" category="Tools" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-purple-100', 'text-purple-800');
    });

    it('applies orange color for databases', () => {
      render(<SkillBadge name="MongoDB" category="Databases" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-orange-100', 'text-orange-800');
    });

    it('applies cyan color for cloud', () => {
      render(<SkillBadge name="AWS" category="Cloud" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-cyan-100', 'text-cyan-800');
    });

    it('applies pink color for soft skills', () => {
      render(<SkillBadge name="Leadership" category="Soft Skills" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-pink-100', 'text-pink-800');
    });

    it('applies gray color for other category', () => {
      render(<SkillBadge name="Skill" category="Other" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
    });

    it('applies default gray color when no category provided', () => {
      render(<SkillBadge name="Skill" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
    });

    it('applies default gray color for unknown category', () => {
      render(<SkillBadge name="Skill" category="Unknown Category" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
    });

    it('handles category names with different casing', () => {
      render(<SkillBadge name="React" category="FRAMEWORKS" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-green-100', 'text-green-800');
    });

    it('handles category names with spaces', () => {
      render(<SkillBadge name="Java" category="Programming Languages" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('bg-blue-100', 'text-blue-800');
    });
  });

  describe('Styling', () => {
    it('has pill-shaped design', () => {
      render(<SkillBadge name="CSS" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('rounded-full');
    });

    it('has proper padding', () => {
      render(<SkillBadge name="HTML" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('px-3', 'py-1');
    });

    it('has proper text styling', () => {
      render(<SkillBadge name="Node.js" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('text-sm', 'font-medium');
    });

    it('accepts custom className', () => {
      render(<SkillBadge name="Vue" className="custom-class" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('custom-class');
    });

    it('preserves base styles with custom className', () => {
      render(<SkillBadge name="Angular" className="custom-class" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('rounded-full', 'custom-class');
    });
  });

  describe('Hover Effects', () => {
    it('has hover transition classes', () => {
      render(<SkillBadge name="Docker" category="Tools" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('transition-colors', 'duration-200');
    });

    it('has hover color classes for programming languages', () => {
      render(<SkillBadge name="TypeScript" category="Languages" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('hover:bg-blue-200');
    });

    it('has hover color classes for frameworks', () => {
      render(<SkillBadge name="Next.js" category="Frameworks" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('hover:bg-green-200');
    });

    it('has hover color classes for tools', () => {
      render(<SkillBadge name="VS Code" category="Tools" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('hover:bg-purple-200');
    });

    it('has hover color classes for databases', () => {
      render(<SkillBadge name="Redis" category="Databases" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('hover:bg-orange-200');
    });

    it('has hover color classes for cloud', () => {
      render(<SkillBadge name="Azure" category="Cloud" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('hover:bg-cyan-200');
    });

    it('has hover color classes for default category', () => {
      render(<SkillBadge name="Skill" />);
      const badge = screen.getByRole('listitem');
      expect(badge).toHaveClass('hover:bg-gray-200');
    });
  });

  describe('Multiple Badges', () => {
    it('renders multiple badges independently', () => {
      const { container } = render(
        <>
          <SkillBadge name="JavaScript" category="Languages" />
          <SkillBadge name="React" category="Frameworks" />
          <SkillBadge name="Docker" category="Tools" />
        </>
      );

      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Docker')).toBeInTheDocument();

      const badges = screen.getAllByRole('listitem');
      expect(badges).toHaveLength(3);
    });
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';
import { SkillCategory } from '@/types';

const mockSkillCategories: SkillCategory[] = [
  {
    name: 'Programming Languages',
    skills: [
      {
        name: 'JavaScript',
        category: 'Programming Languages',
        proficiency: 'expert',
        yearsOfExperience: 7,
      },
      {
        name: 'TypeScript',
        category: 'Programming Languages',
        proficiency: 'expert',
        yearsOfExperience: 5,
      },
      {
        name: 'Python',
        category: 'Programming Languages',
        proficiency: 'advanced',
        yearsOfExperience: 4,
      },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    skills: [
      {
        name: 'React',
        category: 'Frameworks & Libraries',
        proficiency: 'expert',
        yearsOfExperience: 6,
      },
      {
        name: 'Next.js',
        category: 'Frameworks & Libraries',
        proficiency: 'advanced',
        yearsOfExperience: 3,
      },
    ],
  },
  {
    name: 'Databases',
    skills: [
      {
        name: 'PostgreSQL',
        category: 'Databases',
        proficiency: 'advanced',
        yearsOfExperience: 5,
      },
    ],
  },
];

describe('Skills Component', () => {
  it('renders the skills section with heading', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    
    const heading = screen.getByRole('heading', { name: /skills & technologies/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('renders all skill categories', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks & Libraries')).toBeInTheDocument();
    expect(screen.getByText('Databases')).toBeInTheDocument();
  });

  it('renders all skills within each category', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    
    // Programming Languages
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    
    // Frameworks & Libraries
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    
    // Databases
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
  });

  it('groups skills by category using SkillBadge components', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    
    // Check that skills are rendered as badges (with role="listitem")
    const skillBadges = screen.getAllByRole('listitem');
    expect(skillBadges.length).toBe(6); // Total of 6 skills across all categories
  });

  it('renders with proper section structure and accessibility', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    
    const section = screen.getByRole('region', { name: /skills & technologies/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'skills');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <Skills skillCategories={mockSkillCategories} className="custom-class" />
    );
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });

  it('renders empty state when no skill categories provided', () => {
    render(<Skills skillCategories={[]} />);
    
    const heading = screen.getByRole('heading', { name: /skills & technologies/i });
    expect(heading).toBeInTheDocument();
    
    // No category headings should be present
    const categoryHeadings = screen.queryAllByRole('heading', { level: 3 });
    expect(categoryHeadings).toHaveLength(0);
  });

  it('renders categories with proper visual organization', () => {
    const { container } = render(<Skills skillCategories={mockSkillCategories} />);
    
    // Check for proper spacing container
    const spacingContainer = container.querySelector('.space-y-8');
    expect(spacingContainer).toBeInTheDocument();
    
    // Check for category cards
    const categoryCards = container.querySelectorAll('.bg-white.rounded-lg');
    expect(categoryCards).toHaveLength(3);
  });

  it('implements responsive grid layout with proper spacing', () => {
    const { container } = render(<Skills skillCategories={mockSkillCategories} />);
    
    // Check for flex-wrap layout with gap
    const skillContainers = container.querySelectorAll('.flex.flex-wrap.gap-2');
    expect(skillContainers.length).toBe(3); // One for each category
  });

  it('renders category headings as h3 elements', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    
    const categoryHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(categoryHeadings).toHaveLength(3);
    expect(categoryHeadings[0]).toHaveTextContent('Programming Languages');
    expect(categoryHeadings[1]).toHaveTextContent('Frameworks & Libraries');
    expect(categoryHeadings[2]).toHaveTextContent('Databases');
  });

  it('has proper ARIA labels for skill lists', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    
    expect(screen.getByLabelText('Programming Languages skills')).toBeInTheDocument();
    expect(screen.getByLabelText('Frameworks & Libraries skills')).toBeInTheDocument();
    expect(screen.getByLabelText('Databases skills')).toBeInTheDocument();
  });

  it('maintains consistent styling across all categories', () => {
    const { container } = render(<Skills skillCategories={mockSkillCategories} />);
    
    const categoryCards = container.querySelectorAll('.bg-white.rounded-lg.shadow-sm.border');
    expect(categoryCards).toHaveLength(3);
    
    // All cards should have consistent padding
    categoryCards.forEach((card) => {
      expect(card).toHaveClass('p-6');
    });
  });

  it('renders skills in the order they appear in the data', () => {
    render(<Skills skillCategories={mockSkillCategories} />);
    
    const allSkillBadges = screen.getAllByRole('listitem');
    
    // Check first category order
    expect(allSkillBadges[0]).toHaveTextContent('JavaScript');
    expect(allSkillBadges[1]).toHaveTextContent('TypeScript');
    expect(allSkillBadges[2]).toHaveTextContent('Python');
    
    // Check second category order
    expect(allSkillBadges[3]).toHaveTextContent('React');
    expect(allSkillBadges[4]).toHaveTextContent('Next.js');
  });
});

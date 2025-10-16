import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import Home from './page';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock all section components to render simple sections with IDs
vi.mock('@/components/sections', () => ({
  Hero: () => <section id="hero">Hero</section>,
  About: () => <section id="about">About</section>,
  Experience: () => <section id="experience">Experience</section>,
  Skills: () => <section id="skills">Skills</section>,
  WorkProjects: () => <section id="work-projects">Work Projects</section>,
  PersonalProjects: () => <section id="personal-projects">Personal Projects</section>,
  Education: () => <section id="education">Education</section>,
  Contact: () => <section id="contact">Contact</section>,
}));

// Mock layout components
vi.mock('@/components/layout', () => ({
  Header: () => <header>Header</header>,
  Footer: () => <footer>Footer</footer>,
}));

describe('Page Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('all sections have unique IDs for anchor navigation', () => {
    const { container } = render(<Home />);

    const expectedIds = [
      'hero',
      'about',
      'experience',
      'skills',
      'work-projects',
      'personal-projects',
      'education',
      'contact',
    ];

    expectedIds.forEach((id) => {
      const section = container.querySelector(`#${id}`);
      expect(section).toBeInTheDocument();
      expect(section?.tagName.toLowerCase()).toBe('section');
    });
  });

  it('section IDs are unique (no duplicates)', () => {
    const { container } = render(<Home />);

    const sectionIds = [
      'hero',
      'about',
      'experience',
      'skills',
      'work-projects',
      'personal-projects',
      'education',
      'contact',
    ];

    sectionIds.forEach((id) => {
      const elements = container.querySelectorAll(`#${id}`);
      expect(elements.length).toBe(1);
    });
  });

  it('sections are rendered in the correct order', () => {
    const { container } = render(<Home />);

    const sections = container.querySelectorAll('section');
    const sectionIds = Array.from(sections).map((section) => section.id);

    expect(sectionIds).toEqual([
      'hero',
      'about',
      'experience',
      'skills',
      'work-projects',
      'personal-projects',
      'education',
      'contact',
    ]);
  });

  it('all sections are within the main element', () => {
    const { container } = render(<Home />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();

    const allSections = container.querySelectorAll('section');
    const sectionsInMain = main?.querySelectorAll('section');

    expect(sectionsInMain?.length).toBe(allSections.length);
    expect(sectionsInMain?.length).toBe(8);
  });

  it('main element has proper spacing class', () => {
    const { container } = render(<Home />);

    const main = container.querySelector('main');
    expect(main).toHaveClass('min-h-screen');
  });
});

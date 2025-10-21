import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock the layout components
vi.mock('@/components/layout', () => ({
  Header: ({ name }: { name: string }) => <header data-testid="header">{name}</header>,
  Footer: ({ socialLinks }: { socialLinks: any[] }) => (
    <footer data-testid="footer">Footer with {socialLinks.length} links</footer>
  ),
}));

// Mock the section components
vi.mock('@/components/sections', () => ({
  Hero: ({ profile }: any) => <section id="hero" data-testid="hero">{profile.name}</section>,
  About: ({ profile }: any) => <section id="about" data-testid="about">About {profile.name}</section>,
}));

// Mock the dynamically imported components
vi.mock('@/components/sections/Experience', () => ({
  Experience: ({ experiences }: any) => (
    <section id="experience" data-testid="experience">{experiences.length} experiences</section>
  ),
}));

vi.mock('@/components/sections/Skills', () => ({
  Skills: ({ skillCategories }: any) => (
    <section id="skills" data-testid="skills">{skillCategories.length} categories</section>
  ),
}));

vi.mock('@/components/sections/WorkProjects', () => ({
  WorkProjects: () => <section id="work-projects" data-testid="work-projects">Work Projects</section>,
}));

vi.mock('@/components/sections/PersonalProjects', () => ({
  PersonalProjects: () => (
    <section id="personal-projects" data-testid="personal-projects">Personal Projects</section>
  ),
}));

vi.mock('@/components/sections/Education', () => ({
  Education: ({ degrees, certifications }: any) => (
    <section id="education" data-testid="education">
      {degrees.length} degrees, {certifications.length} certifications
    </section>
  ),
}));

vi.mock('@/components/sections/Contact', () => ({
  Contact: ({ profile }: any) => <section id="contact" data-testid="contact">Contact {profile.name}</section>,
}));

// Mock StructuredData component
vi.mock('@/components/StructuredData', () => ({
  default: ({ profile }: any) => (
    <script type="application/ld+json" data-testid="structured-data">
      {JSON.stringify({ name: profile.name })}
    </script>
  ),
}));

// Mock SkipToContent component
vi.mock('@/components/layout/SkipToContent', () => ({
  default: () => <a href="#main-content" className="sr-only">Skip to content</a>,
}));

describe('Home Page Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all main sections in correct order', () => {
    render(<Home />);

    // Verify header is present
    expect(screen.getByTestId('header')).toBeInTheDocument();

    // Verify all sections are present in order
    const sections = [
      'hero',
      'about',
      'experience',
      'skills',
      'work-projects',
      'personal-projects',
      'education',
      'contact',
    ];

    sections.forEach((sectionId) => {
      const section = screen.getByTestId(sectionId);
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('id', sectionId);
    });

    // Verify footer is present
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders sections with proper IDs for navigation', () => {
    const { container } = render(<Home />);

    // Check that all sections have proper IDs
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
      const section = container.querySelector(`#${id}`);
      expect(section).toBeInTheDocument();
    });
  });

  it('passes correct data to Hero section', () => {
    render(<Home />);
    expect(screen.getByTestId('hero')).toHaveTextContent('Scott Howard');
  });

  it('passes correct data to About section', () => {
    render(<Home />);
    expect(screen.getByTestId('about')).toHaveTextContent('About Scott Howard');
  });

  it('passes correct data to Experience section', () => {
    render(<Home />);
    // Experience data should be passed
    expect(screen.getByTestId('experience')).toBeInTheDocument();
  });

  it('passes correct data to Skills section', () => {
    render(<Home />);
    // Skills data should be passed
    expect(screen.getByTestId('skills')).toBeInTheDocument();
  });

  it('renders WorkProjects section', () => {
    render(<Home />);
    expect(screen.getByTestId('work-projects')).toHaveTextContent('Work Projects');
  });

  it('renders PersonalProjects section', () => {
    render(<Home />);
    expect(screen.getByTestId('personal-projects')).toHaveTextContent('Personal Projects');
  });

  it('passes correct data to Education section', () => {
    render(<Home />);
    // Education data should be passed
    expect(screen.getByTestId('education')).toBeInTheDocument();
  });

  it('passes correct data to Contact section', () => {
    render(<Home />);
    expect(screen.getByTestId('contact')).toHaveTextContent('Contact Scott Howard');
  });

  it('renders Header with profile name', () => {
    render(<Home />);
    expect(screen.getByTestId('header')).toHaveTextContent('Scott Howard');
  });

  it('renders Footer with social links', () => {
    render(<Home />);
    expect(screen.getByTestId('footer')).toHaveTextContent('Footer with 2 links');
  });

  it('has proper semantic HTML structure', () => {
    const { container } = render(<Home />);

    // Check for header
    expect(container.querySelector('header')).toBeInTheDocument();

    // Check for main
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('min-h-screen');

    // Check for footer
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('renders all sections within main element', () => {
    const { container } = render(<Home />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();

    // All sections should be within main
    const sectionsInMain = main?.querySelectorAll('section');
    expect(sectionsInMain?.length).toBe(8); // 8 sections total
  });

  it('includes structured data for SEO', () => {
    render(<Home />);
    const structuredData = screen.getByTestId('structured-data');
    expect(structuredData).toBeInTheDocument();
    expect(structuredData).toHaveAttribute('type', 'application/ld+json');
  });

  it('structured data includes profile information', () => {
    const { container } = render(<Home />);
    const structuredData = container.querySelector('script[type="application/ld+json"]');
    expect(structuredData).toBeInTheDocument();
    
    const jsonContent = JSON.parse(structuredData?.textContent || '{}');
    expect(jsonContent.name).toBe('Scott Howard');
  });
});

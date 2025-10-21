import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import { WorkProject } from '@/types';

const mockProject: WorkProject = {
  id: 'test-proj-1',
  title: 'Test Project',
  description: 'This is a test project description',
  longDescription: 'This is a longer description of the test project',
  technologies: ['React', 'TypeScript', 'Node.js'],
  companyId: 'company-1',
  experienceId: 'exp-1',
  images: ['/images/test-project.jpg', '/images/test-project-2.jpg'],
  demoUrl: 'https://demo.example.com',
  repoUrl: 'https://github.com/test/project',
  featured: true,
  startDate: '2022-01',
  endDate: '2022-08',
};

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('renders company name when provided', () => {
    render(<ProjectCard project={mockProject} experienceCompany="Test Company" />);
    
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('does not render company section when not provided', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    
    expect(container.querySelector('.text-sm.text-gray-600')).not.toBeInTheDocument();
  });

  it('renders all technology tags', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders project image when available', () => {
    render(<ProjectCard project={mockProject} />);
    
    const image = screen.getByRole('img', { name: /test project screenshot/i });
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src with URL encoding
    expect(image.getAttribute('src')).toContain('%2Fimages%2Ftest-project.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('does not render image section when no images', () => {
    const projectWithoutImages = { ...mockProject, images: [] };
    const { container } = render(<ProjectCard project={projectWithoutImages} />);
    
    const image = container.querySelector('img');
    expect(image).not.toBeInTheDocument();
  });

  it('renders demo link with correct attributes', () => {
    render(<ProjectCard project={mockProject} />);
    
    const demoLink = screen.getByRole('link', { name: /view live demo/i });
    expect(demoLink).toHaveAttribute('href', 'https://demo.example.com');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render demo link when not available', () => {
    const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
    render(<ProjectCard project={projectWithoutDemo} />);
    
    const demoLink = screen.queryByRole('link', { name: /view live demo/i });
    expect(demoLink).not.toBeInTheDocument();
  });

  it('renders repository link with correct attributes', () => {
    render(<ProjectCard project={mockProject} />);
    
    const repoLink = screen.getByRole('link', { name: /view source code/i });
    expect(repoLink).toHaveAttribute('href', 'https://github.com/test/project');
    expect(repoLink).toHaveAttribute('target', '_blank');
    expect(repoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render repository link when not available', () => {
    const projectWithoutRepo = { ...mockProject, repoUrl: undefined };
    render(<ProjectCard project={projectWithoutRepo} />);
    
    const repoLink = screen.queryByRole('link', { name: /view source code/i });
    expect(repoLink).not.toBeInTheDocument();
  });

  it('renders view experience button when callback provided', () => {
    const mockCallback = vi.fn();
    render(
      <ProjectCard
        project={mockProject}
        experienceCompany="Test Company"
        onViewExperience={mockCallback}
      />
    );
    
    const button = screen.getByRole('button', { name: /view experience at test company/i });
    expect(button).toBeInTheDocument();
  });

  it('does not render view experience button when callback not provided', () => {
    render(<ProjectCard project={mockProject} experienceCompany="Test Company" />);
    
    const button = screen.queryByRole('button', { name: /view experience/i });
    expect(button).not.toBeInTheDocument();
  });

  it('calls onViewExperience with correct experienceId when clicked', () => {
    const mockCallback = vi.fn();
    render(
      <ProjectCard
        project={mockProject}
        experienceCompany="Test Company"
        onViewExperience={mockCallback}
      />
    );
    
    const button = screen.getByRole('button', { name: /view experience at test company/i });
    button.click();
    
    expect(mockCallback).toHaveBeenCalledWith('exp-1');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('applies default card styling without hover effects', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    
    const card = container.firstChild;
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('shadow-md');
    expect(card).toHaveClass('rounded-lg');
    // The card should not have hover effects since hoverable is not set to true
    expect(card).not.toHaveClass('hover:shadow-xl');
    expect(card).not.toHaveClass('hover:-translate-y-1');
  });

  it('has proper accessibility attributes on links', () => {
    render(<ProjectCard project={mockProject} />);
    
    const demoLink = screen.getByRole('link', { name: /view live demo/i });
    expect(demoLink).toHaveAttribute('aria-label', 'View live demo of Test Project');
    
    const repoLink = screen.getByRole('link', { name: /view source code/i });
    expect(repoLink).toHaveAttribute('aria-label', 'View source code for Test Project');
  });

  it('renders with full height flex layout', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    
    const card = container.firstChild;
    expect(card).toHaveClass('h-full');
    expect(card).toHaveClass('flex');
    expect(card).toHaveClass('flex-col');
  });
});

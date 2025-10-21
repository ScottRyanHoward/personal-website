import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PersonalProjectCard } from './PersonalProjectCard';
import { PersonalProject } from '@/types';

describe('PersonalProjectCard', () => {
  const mockProject: PersonalProject = {
    id: 'test-proj-1',
    title: 'Test Project',
    description: 'A test project description',
    longDescription: 'A longer description of the test project',
    motivation: 'Built this to solve a common problem',
    technologies: ['React', 'TypeScript', 'Node.js'],
    images: ['/images/test-project.jpg'],
    demoUrl: 'https://demo.example.com',
    repoUrl: 'https://github.com/user/test-project',
    featured: true,
    startDate: '2023-01',
    endDate: '2023-06',
    status: 'completed',
  };

  it('renders project title', () => {
    render(<PersonalProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<PersonalProjectCard project={mockProject} />);
    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('renders project motivation', () => {
    render(<PersonalProjectCard project={mockProject} />);
    expect(screen.getByText('Built this to solve a common problem')).toBeInTheDocument();
    expect(screen.getByText('Why:')).toBeInTheDocument();
  });

  it('renders project status badge', () => {
    render(<PersonalProjectCard project={mockProject} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('renders in-progress status correctly', () => {
    const inProgressProject = { ...mockProject, status: 'in-progress' as const };
    render(<PersonalProjectCard project={inProgressProject} />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('renders ideation status correctly', () => {
    const ideationProject = { ...mockProject, status: 'ideation' as const };
    render(<PersonalProjectCard project={ideationProject} />);
    expect(screen.getByText('Ideation')).toBeInTheDocument();
  });

  it('normalizes archived status to completed for backward compatibility', () => {
    const archivedProject = { ...mockProject, status: 'archived' as any };
    render(<PersonalProjectCard project={archivedProject} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('renders date range when both start and end dates are provided', () => {
    render(<PersonalProjectCard project={mockProject} />);
    expect(screen.getByText(/Dec 2022 - May 2023/)).toBeInTheDocument();
  });

  it('renders only start date when end date is not provided', () => {
    const projectWithoutEndDate = { ...mockProject, endDate: undefined };
    render(<PersonalProjectCard project={projectWithoutEndDate} />);
    expect(screen.getByText(/Dec 2022/)).toBeInTheDocument();
  });

  it('renders all technology tags', () => {
    render(<PersonalProjectCard project={mockProject} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders project image when available', () => {
    render(<PersonalProjectCard project={mockProject} />);
    const image = screen.getByAltText('Test Project screenshot');
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src with URL encoding
    expect(image.getAttribute('src')).toContain('%2Fimages%2Ftest-project.jpg');
  });

  it('does not render image when images array is empty', () => {
    const projectWithoutImage = { ...mockProject, images: [] };
    render(<PersonalProjectCard project={projectWithoutImage} />);
    expect(screen.queryByAltText('Test Project screenshot')).not.toBeInTheDocument();
  });

  it('renders demo link when demoUrl is provided', () => {
    render(<PersonalProjectCard project={mockProject} />);
    const demoLink = screen.getByRole('link', { name: /view live demo/i });
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute('href', 'https://demo.example.com');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render demo link when demoUrl is not provided', () => {
    const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
    render(<PersonalProjectCard project={projectWithoutDemo} />);
    expect(screen.queryByRole('link', { name: /view live demo/i })).not.toBeInTheDocument();
  });

  it('renders repository link when repoUrl is provided', () => {
    render(<PersonalProjectCard project={mockProject} />);
    const repoLink = screen.getByRole('link', { name: /view source code/i });
    expect(repoLink).toBeInTheDocument();
    expect(repoLink).toHaveAttribute('href', 'https://github.com/user/test-project');
    expect(repoLink).toHaveAttribute('target', '_blank');
    expect(repoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render repository link when repoUrl is not provided', () => {
    const projectWithoutRepo = { ...mockProject, repoUrl: undefined };
    render(<PersonalProjectCard project={projectWithoutRepo} />);
    expect(screen.queryByRole('link', { name: /view source code/i })).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes for demo link', () => {
    render(<PersonalProjectCard project={mockProject} />);
    const demoLink = screen.getByRole('link', { name: /view live demo of test project/i });
    expect(demoLink).toBeInTheDocument();
  });

  it('has proper accessibility attributes for repo link', () => {
    render(<PersonalProjectCard project={mockProject} />);
    const repoLink = screen.getByRole('link', { name: /view source code for test project/i });
    expect(repoLink).toBeInTheDocument();
  });

  it('has proper accessibility label for status badge', () => {
    render(<PersonalProjectCard project={mockProject} />);
    const statusBadge = screen.getByLabelText('Project status: Completed');
    expect(statusBadge).toBeInTheDocument();
  });

  it('applies correct CSS classes for completed status', () => {
    render(<PersonalProjectCard project={mockProject} />);
    const statusBadge = screen.getByText('Completed');
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('applies correct CSS classes for ideation status', () => {
    const ideationProject = { ...mockProject, status: 'ideation' as const };
    render(<PersonalProjectCard project={ideationProject} />);
    const statusBadge = screen.getByText('Ideation');
    expect(statusBadge).toHaveClass('bg-pink-100', 'text-pink-800');
  });

  it('applies correct CSS classes for in-progress status', () => {
    const inProgressProject = { ...mockProject, status: 'in-progress' as const };
    render(<PersonalProjectCard project={inProgressProject} />);
    const statusBadge = screen.getByText('In Progress');
    expect(statusBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('applies correct CSS classes for archived status (normalized to completed)', () => {
    const archivedProject = { ...mockProject, status: 'archived' as any };
    render(<PersonalProjectCard project={archivedProject} />);
    const statusBadge = screen.getByText('Completed');
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('handles missing status by defaulting to completed', () => {
    const projectWithoutStatus = { ...mockProject, status: undefined as any };
    render(<PersonalProjectCard project={projectWithoutStatus} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('handles invalid status by defaulting to completed', () => {
    const projectWithInvalidStatus = { ...mockProject, status: 'invalid-status' as any };
    render(<PersonalProjectCard project={projectWithInvalidStatus} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('normalizes case-insensitive status values', () => {
    const projectWithUppercaseStatus = { ...mockProject, status: 'IN-PROGRESS' as any };
    render(<PersonalProjectCard project={projectWithUppercaseStatus} />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('renders with minimal required fields', () => {
    const minimalProject: PersonalProject = {
      id: 'minimal-proj',
      title: 'Minimal Project',
      description: 'Minimal description',
      longDescription: 'Longer description',
      motivation: 'Motivation text',
      technologies: ['JavaScript'],
      images: [],
      featured: false,
      startDate: '2023-01',
      status: 'completed',
    };
    render(<PersonalProjectCard project={minimalProject} />);
    expect(screen.getByText('Minimal Project')).toBeInTheDocument();
    expect(screen.getByText('Minimal description')).toBeInTheDocument();
    expect(screen.getByText('Motivation text')).toBeInTheDocument();
  });
});

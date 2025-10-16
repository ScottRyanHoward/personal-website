import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PersonalProjects } from './PersonalProjects';

// Mock the data
vi.mock('@/data/personalProjects.json', () => ({
  default: [
    {
      id: 'personal-proj-1',
      title: 'DevTools CLI',
      description: 'Command-line tool for automating common development workflows.',
      longDescription: 'Created an open-source CLI tool...',
      motivation: 'I found myself repeatedly setting up similar project structures.',
      technologies: ['TypeScript', 'Node.js', 'Commander.js'],
      images: ['/images/projects/devtools-cli-1.jpg'],
      repoUrl: 'https://github.com/scottryanhoward/devtools-cli',
      featured: true,
      startDate: '2022-06',
      endDate: '2023-01',
      status: 'completed',
    },
    {
      id: 'personal-proj-2',
      title: 'Budget Tracker App',
      description: 'Personal finance management application.',
      longDescription: 'Built a full-stack personal finance application...',
      motivation: 'Wanted to create a privacy-focused alternative.',
      technologies: ['React', 'Next.js', 'TypeScript'],
      images: ['/images/projects/budget-tracker-1.jpg'],
      demoUrl: 'https://budget-tracker-demo.vercel.app',
      repoUrl: 'https://github.com/scottryanhoward/budget-tracker',
      featured: true,
      startDate: '2023-03',
      status: 'in-progress',
    },
  ],
}));

describe('PersonalProjects', () => {
  it('renders section heading', () => {
    render(<PersonalProjects />);
    expect(screen.getByRole('heading', { name: /personal projects/i })).toBeInTheDocument();
  });

  it('renders section description', () => {
    render(<PersonalProjects />);
    expect(
      screen.getByText(/side projects and open-source contributions/i)
    ).toBeInTheDocument();
  });

  it('renders all personal projects', () => {
    render(<PersonalProjects />);
    expect(screen.getByText('DevTools CLI')).toBeInTheDocument();
    expect(screen.getByText('Budget Tracker App')).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    render(<PersonalProjects />);
    expect(
      screen.getByText(/command-line tool for automating common development workflows/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/personal finance management application/i)
    ).toBeInTheDocument();
  });

  it('renders project motivations', () => {
    render(<PersonalProjects />);
    expect(
      screen.getByText(/i found myself repeatedly setting up similar project structures/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/wanted to create a privacy-focused alternative/i)
    ).toBeInTheDocument();
  });

  it('renders project status badges', () => {
    render(<PersonalProjects />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('renders technology tags for all projects', () => {
    render(<PersonalProjects />);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Commander.js')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('renders demo links when available', () => {
    render(<PersonalProjects />);
    const demoLinks = screen.getAllByRole('link', { name: /view live demo/i });
    expect(demoLinks).toHaveLength(1); // Only Budget Tracker has a demo
    expect(demoLinks[0]).toHaveAttribute('href', 'https://budget-tracker-demo.vercel.app');
  });

  it('renders repository links', () => {
    render(<PersonalProjects />);
    const repoLinks = screen.getAllByRole('link', { name: /view source code/i });
    expect(repoLinks).toHaveLength(2); // Both projects have repo links
    expect(repoLinks[0]).toHaveAttribute('href', 'https://github.com/scottryanhoward/devtools-cli');
    expect(repoLinks[1]).toHaveAttribute('href', 'https://github.com/scottryanhoward/budget-tracker');
  });

  it('has proper section accessibility attributes', () => {
    render(<PersonalProjects />);
    const section = screen.getByRole('region', { name: /personal projects/i });
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'personal-projects');
  });

  it('uses responsive grid layout classes', () => {
    const { container } = render(<PersonalProjects />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('applies correct background color', () => {
    const { container } = render(<PersonalProjects />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('bg-white');
  });

  it('applies correct padding classes', () => {
    const { container } = render(<PersonalProjects />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16', 'px-4', 'sm:px-6', 'lg:px-8');
  });

  it('renders project images', () => {
    render(<PersonalProjects />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/images/projects/devtools-cli-1.jpg');
    expect(images[1]).toHaveAttribute('src', '/images/projects/budget-tracker-1.jpg');
  });

  it('renders date ranges for projects', () => {
    render(<PersonalProjects />);
    expect(screen.getByText(/May 2022 - Dec 2022/)).toBeInTheDocument();
    expect(screen.getByText(/Feb 2023/)).toBeInTheDocument();
  });
});

describe('PersonalProjects - Empty State', () => {
  it('renders empty state message when no projects exist', async () => {
    vi.resetModules();
    vi.doMock('@/data/personalProjects.json', () => ({
      default: [],
    }));

    // Re-import the component with the mocked empty data
    const importedModule = await import('./PersonalProjects?t=' + Date.now());
    const EmptyPersonalProjects = importedModule.PersonalProjects;
    render(<EmptyPersonalProjects />);

    expect(screen.getByText(/no personal projects to display/i)).toBeInTheDocument();
  });
});

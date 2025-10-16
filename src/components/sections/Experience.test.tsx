import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';
import { Experience as ExperienceType } from '@/types';

const mockExperiences: ExperienceType[] = [
  {
    id: 'exp-1',
    company: 'TechCorp Solutions',
    companyLogo: '/images/companies/techcorp.png',
    position: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    startDate: '2021-03',
    endDate: 'Present',
    description: 'Leading development of cloud-native applications.',
    responsibilities: [
      'Architected microservices infrastructure',
      'Led a team of 5 engineers',
    ],
    achievements: [
      'Reduced application load time by 45%',
      'Implemented automated testing suite',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
    relatedProjects: ['work-proj-1', 'work-proj-2'],
  },
  {
    id: 'exp-2',
    company: 'StartupXYZ',
    companyLogo: '/images/companies/startupxyz.png',
    position: 'Full Stack Developer',
    location: 'Remote',
    startDate: '2019-06',
    endDate: '2021-02',
    description: 'Developed full-stack web applications.',
    responsibilities: [
      'Built RESTful APIs',
      'Developed responsive front-end interfaces',
    ],
    achievements: [
      'Launched MVP in 3 months',
      'Reduced server costs by 40%',
    ],
    technologies: ['React', 'Node.js', 'MongoDB'],
    relatedProjects: ['work-proj-3'],
  },
  {
    id: 'exp-3',
    company: 'Digital Agency Co',
    position: 'Frontend Developer',
    location: 'New York, NY',
    startDate: '2017-08',
    endDate: '2019-05',
    description: 'Created responsive websites.',
    responsibilities: [
      'Developed pixel-perfect websites',
      'Implemented interactive features',
    ],
    achievements: [
      'Delivered 15+ client projects',
      'Improved accessibility scores to 95+',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    relatedProjects: [],
  },
];

describe('Experience Component', () => {
  it('renders the section with correct heading', () => {
    render(<Experience experiences={mockExperiences} />);
    
    const heading = screen.getByRole('heading', { name: /work experience/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('renders all experience entries', () => {
    render(<Experience experiences={mockExperiences} />);
    
    // Check that all positions are rendered
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  it('displays entries in chronological order (most recent first)', () => {
    render(<Experience experiences={mockExperiences} />);
    
    const articles = screen.getAllByRole('article');
    
    // First article should be the most recent (exp-1 with endDate: 'Present')
    expect(articles[0]).toHaveAccessibleName(/senior software engineer at techcorp solutions/i);
    
    // Second should be exp-2 (ended 2021-02)
    expect(articles[1]).toHaveAccessibleName(/full stack developer at startupxyz/i);
    
    // Third should be exp-3 (ended 2019-05)
    expect(articles[2]).toHaveAccessibleName(/frontend developer at digital agency co/i);
  });

  it('displays company name and location for each position', () => {
    render(<Experience experiences={mockExperiences} />);
    
    expect(screen.getByText('TechCorp Solutions')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('StartupXYZ')).toBeInTheDocument();
    expect(screen.getByText('Remote')).toBeInTheDocument();
  });

  it('displays date ranges correctly', () => {
    render(<Experience experiences={mockExperiences} />);
    
    // Check for formatted date ranges
    expect(screen.getByText(/mar 2021.*present/i)).toBeInTheDocument();
    expect(screen.getByText(/jun 2019.*feb 2021/i)).toBeInTheDocument();
    expect(screen.getByText(/aug 2017.*may 2019/i)).toBeInTheDocument();
  });

  it('displays job descriptions', () => {
    render(<Experience experiences={mockExperiences} />);
    
    expect(screen.getByText(/leading development of cloud-native applications/i)).toBeInTheDocument();
    expect(screen.getByText(/developed full-stack web applications/i)).toBeInTheDocument();
    expect(screen.getByText(/created responsive websites/i)).toBeInTheDocument();
  });

  it('displays responsibilities for each position', () => {
    render(<Experience experiences={mockExperiences} />);
    
    expect(screen.getByText(/architected microservices infrastructure/i)).toBeInTheDocument();
    expect(screen.getByText(/led a team of 5 engineers/i)).toBeInTheDocument();
    expect(screen.getByText(/built restful apis/i)).toBeInTheDocument();
  });

  it('displays achievements for each position', () => {
    render(<Experience experiences={mockExperiences} />);
    
    expect(screen.getByText(/reduced application load time by 45%/i)).toBeInTheDocument();
    expect(screen.getByText(/implemented automated testing suite/i)).toBeInTheDocument();
    expect(screen.getByText(/launched mvp in 3 months/i)).toBeInTheDocument();
  });

  it('displays technology tags for each position', () => {
    render(<Experience experiences={mockExperiences} />);
    
    // Check for technologies from first experience (React appears in multiple experiences)
    const reactTags = screen.getAllByText('React');
    expect(reactTags.length).toBeGreaterThan(0);
    
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
    
    // Check for technologies from other experiences
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('HTML5')).toBeInTheDocument();
  });

  it('displays company logos when available', () => {
    render(<Experience experiences={mockExperiences} />);
    
    const logos = screen.getAllByRole('img');
    expect(logos.length).toBeGreaterThan(0);
    
    // Check for specific logo alt text
    expect(screen.getByAltText('TechCorp Solutions logo')).toBeInTheDocument();
    expect(screen.getByAltText('StartupXYZ logo')).toBeInTheDocument();
  });

  it('does not render company logo when not provided', () => {
    render(<Experience experiences={mockExperiences} />);
    
    // exp-3 doesn't have a logo
    expect(screen.queryByAltText('Digital Agency Co logo')).not.toBeInTheDocument();
  });

  it('displays links to related work projects', () => {
    render(<Experience experiences={mockExperiences} />);
    
    // exp-1 has 2 related projects
    const projectLinks = screen.getAllByRole('link', { name: /view project/i });
    expect(projectLinks.length).toBeGreaterThanOrEqual(2);
    
    // Check that links have correct href
    expect(projectLinks[0]).toHaveAttribute('href', '#project-work-proj-1');
    expect(projectLinks[1]).toHaveAttribute('href', '#project-work-proj-2');
  });

  it('does not display related projects section when no projects exist', () => {
    const experienceWithoutProjects: ExperienceType[] = [
      {
        ...mockExperiences[2],
        relatedProjects: [],
      },
    ];
    
    render(<Experience experiences={experienceWithoutProjects} />);
    
    // Should not have "Related Projects" heading for this entry
    const relatedProjectsHeadings = screen.queryAllByText(/related projects/i);
    expect(relatedProjectsHeadings.length).toBe(0);
  });

  it('has proper accessibility attributes', () => {
    render(<Experience experiences={mockExperiences} />);
    
    // Check for section with aria-label
    const section = screen.getByRole('region', { name: /work experience section/i });
    expect(section).toBeInTheDocument();
    
    // Check for articles with aria-labels
    const articles = screen.getAllByRole('article');
    expect(articles[0]).toHaveAccessibleName(/senior software engineer at techcorp solutions/i);
  });

  it('renders with empty experiences array', () => {
    render(<Experience experiences={[]} />);
    
    const heading = screen.getByRole('heading', { name: /work experience/i });
    expect(heading).toBeInTheDocument();
    
    // Should not have any articles
    const articles = screen.queryAllByRole('article');
    expect(articles.length).toBe(0);
  });

  it('displays section headings for responsibilities and achievements', () => {
    render(<Experience experiences={mockExperiences} />);
    
    const responsibilitiesHeadings = screen.getAllByText(/key responsibilities/i);
    expect(responsibilitiesHeadings.length).toBeGreaterThan(0);
    
    const achievementsHeadings = screen.getAllByText(/key achievements/i);
    expect(achievementsHeadings.length).toBeGreaterThan(0);
  });

  it('displays technologies heading', () => {
    render(<Experience experiences={mockExperiences} />);
    
    const techHeadings = screen.getAllByText(/^technologies$/i);
    expect(techHeadings.length).toBeGreaterThan(0);
  });

  it('formats dates correctly', () => {
    render(<Experience experiences={mockExperiences} />);
    
    // Check that "Present" is displayed for current position
    expect(screen.getByText(/present/i)).toBeInTheDocument();
    
    // Check that dates are formatted as "Mon YYYY"
    expect(screen.getByText(/mar 2021/i)).toBeInTheDocument();
    expect(screen.getByText(/jun 2019/i)).toBeInTheDocument();
  });

  it('project links have proper accessibility attributes', () => {
    render(<Experience experiences={mockExperiences} />);
    
    const projectLinks = screen.getAllByRole('link', { name: /view project/i });
    
    projectLinks.forEach((link) => {
      // Should have aria-label
      expect(link).toHaveAttribute('aria-label');
    });
  });

  it('handles experiences with minimal data', () => {
    const minimalExperience: ExperienceType[] = [
      {
        id: 'exp-min',
        company: 'Minimal Corp',
        position: 'Developer',
        location: 'City',
        startDate: '2020-01',
        endDate: '2020-12',
        description: 'Basic description',
        responsibilities: [],
        achievements: [],
        technologies: [],
        relatedProjects: [],
      },
    ];
    
    render(<Experience experiences={minimalExperience} />);
    
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Minimal Corp')).toBeInTheDocument();
    expect(screen.getByText('Basic description')).toBeInTheDocument();
  });
});

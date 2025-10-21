import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Education } from './Education';
import { Education as EducationType, Certification } from '@/types';

describe('Education', () => {
  const mockDegrees: EducationType[] = [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2013-09',
      endDate: '2017-05',
      gpa: '3.7',
      honors: ["Dean's List (6 semesters)", 'Cum Laude'],
      description:
        'Focused on software engineering, algorithms, and distributed systems.',
    },
    {
      id: 'edu-2',
      institution: 'Stanford University',
      degree: 'Master of Science',
      field: 'Artificial Intelligence',
      location: 'Stanford, CA',
      startDate: '2018-09',
      endDate: '2020-06',
      gpa: '3.9',
    },
  ];

  const mockCertifications: Certification[] = [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2021-08',
      expiryDate: '2024-08',
      credentialId: 'AWS-ASA-12345',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      name: 'Professional Scrum Master I (PSM I)',
      issuer: 'Scrum.org',
      issueDate: '2020-03',
      credentialId: 'PSM-67890',
      credentialUrl: 'https://scrum.org/certificates/67890',
    },
  ];

  describe('Rendering', () => {
    it('renders the section with correct heading', () => {
      render(<Education degrees={mockDegrees} certifications={mockCertifications} />);

      expect(
        screen.getByRole('heading', { name: /education & certifications/i })
      ).toBeInTheDocument();
    });

    it('renders all degrees', () => {
      render(<Education degrees={mockDegrees} certifications={[]} />);

      expect(
        screen.getByRole('article', {
          name: /bachelor of science in computer science from university of california, berkeley/i,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('article', {
          name: /master of science in artificial intelligence from stanford university/i,
        })
      ).toBeInTheDocument();
    });

    it('renders all certifications', () => {
      render(<Education degrees={[]} certifications={mockCertifications} />);

      expect(
        screen.getByRole('article', {
          name: /aws certified solutions architect - associate certification from amazon web services/i,
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole('article', {
          name: /professional scrum master i \(psm i\) certification from scrum.org/i,
        })
      ).toBeInTheDocument();
    });

    it('renders with empty arrays', () => {
      render(<Education degrees={[]} certifications={[]} />);

      expect(
        screen.getByRole('heading', { name: /education & certifications/i })
      ).toBeInTheDocument();
    });
  });

  describe('Degree Display', () => {
    it('displays degree information correctly', () => {
      render(<Education degrees={[mockDegrees[0]]} certifications={[]} />);

      expect(screen.getByText(/bachelor of science in computer science/i)).toBeInTheDocument();
      expect(screen.getByText(/university of california, berkeley/i)).toBeInTheDocument();
      expect(screen.getByText(/berkeley, ca/i)).toBeInTheDocument();
    });

    it('displays date range correctly', () => {
      render(<Education degrees={[mockDegrees[0]]} certifications={[]} />);

      expect(screen.getByText(/sep 2013 - may 2017/i)).toBeInTheDocument();
    });

    it('displays GPA when provided', () => {
      render(<Education degrees={[mockDegrees[0]]} certifications={[]} />);

      expect(screen.getByText(/gpa: 3\.7/i)).toBeInTheDocument();
    });

    it('does not display GPA section when not provided', () => {
      const degreeWithoutGPA: EducationType = {
        ...mockDegrees[0],
        gpa: undefined,
      };

      render(<Education degrees={[degreeWithoutGPA]} certifications={[]} />);

      expect(screen.queryByText(/gpa:/i)).not.toBeInTheDocument();
    });

    it('displays description when provided', () => {
      render(<Education degrees={[mockDegrees[0]]} certifications={[]} />);

      expect(
        screen.getByText(/focused on software engineering, algorithms, and distributed systems/i)
      ).toBeInTheDocument();
    });

    it('does not display description section when not provided', () => {
      const degreeWithoutDescription: EducationType = {
        ...mockDegrees[0],
        description: undefined,
      };

      render(<Education degrees={[degreeWithoutDescription]} certifications={[]} />);

      expect(
        screen.queryByText(/focused on software engineering/i)
      ).not.toBeInTheDocument();
    });

    it('displays honors when provided', () => {
      render(<Education degrees={[mockDegrees[0]]} certifications={[]} />);

      expect(screen.getByText(/honors & awards/i)).toBeInTheDocument();
      expect(screen.getByText(/dean's list \(6 semesters\)/i)).toBeInTheDocument();
      expect(screen.getByText(/cum laude/i)).toBeInTheDocument();
    });

    it('does not display honors section when not provided', () => {
      const degreeWithoutHonors: EducationType = {
        ...mockDegrees[0],
        honors: undefined,
      };

      render(<Education degrees={[degreeWithoutHonors]} certifications={[]} />);

      expect(screen.queryByText(/honors & awards/i)).not.toBeInTheDocument();
    });

    it('does not display honors section when empty array', () => {
      const degreeWithEmptyHonors: EducationType = {
        ...mockDegrees[0],
        honors: [],
      };

      render(<Education degrees={[degreeWithEmptyHonors]} certifications={[]} />);

      expect(screen.queryByText(/honors & awards/i)).not.toBeInTheDocument();
    });
  });

  describe('Certification Display', () => {
    it('displays certification information correctly', () => {
      render(<Education degrees={[]} certifications={[mockCertifications[0]]} />);

      expect(
        screen.getByText(/aws certified solutions architect - associate/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/amazon web services/i)).toBeInTheDocument();
    });

    it('displays issue date correctly', () => {
      render(<Education degrees={[]} certifications={[mockCertifications[0]]} />);

      expect(screen.getByText(/issued: aug 2021/i)).toBeInTheDocument();
    });

    it('displays expiry date when provided', () => {
      render(<Education degrees={[]} certifications={[mockCertifications[0]]} />);

      expect(screen.getByText(/expires: aug 2024/i)).toBeInTheDocument();
    });

    it('does not display expiry date when not provided', () => {
      const certWithoutExpiry: Certification = {
        ...mockCertifications[1],
        expiryDate: undefined,
      };

      render(<Education degrees={[]} certifications={[certWithoutExpiry]} />);

      expect(screen.queryByText(/expires:/i)).not.toBeInTheDocument();
    });

    it('displays credential ID when provided', () => {
      render(<Education degrees={[]} certifications={[mockCertifications[0]]} />);

      expect(screen.getByText(/credential id: aws-asa-12345/i)).toBeInTheDocument();
    });

    it('does not display credential ID when not provided', () => {
      const certWithoutId: Certification = {
        ...mockCertifications[0],
        credentialId: undefined,
      };

      render(<Education degrees={[]} certifications={[certWithoutId]} />);

      expect(screen.queryByText(/credential id:/i)).not.toBeInTheDocument();
    });

    it('displays credential link when provided', () => {
      render(<Education degrees={[]} certifications={[mockCertifications[0]]} />);

      const link = screen.getByRole('link', {
        name: /view aws certified solutions architect - associate credential/i,
      });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://aws.amazon.com/verification');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('does not display credential link when not provided', () => {
      const certWithoutUrl: Certification = {
        ...mockCertifications[0],
        credentialUrl: undefined,
      };

      render(<Education degrees={[]} certifications={[certWithoutUrl]} />);

      expect(screen.queryByRole('link', { name: /view credential/i })).not.toBeInTheDocument();
    });
  });

  describe('Sorting', () => {
    it('sorts degrees by end date (most recent first)', () => {
      render(<Education degrees={mockDegrees} certifications={[]} />);

      const articles = screen.getAllByRole('article');

      // Master's degree (2020) should come before Bachelor's (2017)
      expect(articles[0]).toHaveTextContent(/master of science/i);
      expect(articles[1]).toHaveTextContent(/bachelor of science/i);
    });

    it('sorts certifications by issue date (most recent first)', () => {
      render(<Education degrees={[]} certifications={mockCertifications} />);

      const articles = screen.getAllByRole('article');

      // AWS cert (2021-08) should come before PSM cert (2020-03)
      expect(articles[0]).toHaveTextContent(/aws certified solutions architect/i);
      expect(articles[1]).toHaveTextContent(/professional scrum master/i);
    });
  });

  describe('Accessibility', () => {
    it('has proper section label', () => {
      render(<Education degrees={mockDegrees} certifications={mockCertifications} />);

      expect(
        screen.getByRole('region', { name: /education and certifications section/i })
      ).toBeInTheDocument();
    });

    it('has proper article labels for degrees', () => {
      render(<Education degrees={[mockDegrees[0]]} certifications={[]} />);

      expect(
        screen.getByRole('article', {
          name: /bachelor of science in computer science from university of california, berkeley/i,
        })
      ).toBeInTheDocument();
    });

    it('has proper article labels for certifications', () => {
      render(<Education degrees={[]} certifications={[mockCertifications[0]]} />);

      expect(
        screen.getByRole('article', {
          name: /aws certified solutions architect - associate certification from amazon web services/i,
        })
      ).toBeInTheDocument();
    });

    it('uses semantic time elements for dates', () => {
      render(<Education degrees={[mockDegrees[0]]} certifications={[mockCertifications[0]]} />);

      const timeElements = screen.getAllByRole('time');
      expect(timeElements.length).toBeGreaterThan(0);
    });

    it('has proper list roles for honors', () => {
      render(<Education degrees={[mockDegrees[0]]} certifications={[]} />);

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('applies correct section styling', () => {
      const { container } = render(
        <Education degrees={mockDegrees} certifications={mockCertifications} />
      );

      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-gradient-to-br', 'from-blue-50', 'to-slate-50', 'px-4', 'py-20');
    });

    it('renders certifications in grid layout', () => {
      const { container } = render(
        <Education degrees={[]} certifications={mockCertifications} />
      );

      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('md:grid-cols-2');
    });
  });
});

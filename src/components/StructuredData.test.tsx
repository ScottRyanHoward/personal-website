import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import StructuredData from './StructuredData';
import type { Profile, Experience, Education } from '@/types';

const mockProfile: Profile = {
  name: 'John Doe',
  title: 'Software Engineer',
  summary: 'Experienced software engineer',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  profileImage: '/images/profile.jpg',
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: 'linkedin' },
    { platform: 'GitHub', url: 'https://github.com/johndoe', icon: 'github' },
  ],
};

const mockExperiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Tech Corp',
    position: 'Senior Engineer',
    location: 'San Francisco, CA',
    startDate: '2020-01',
    endDate: 'Present',
    description: 'Working on cool stuff',
    responsibilities: ['Code', 'Review'],
    achievements: ['Built things'],
    technologies: ['React', 'TypeScript'],
    relatedProjects: [],
  },
];

const mockEducation: Education[] = [
  {
    id: 'edu-1',
    institution: 'University of Example',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    location: 'City, State',
    startDate: '2015-09',
    endDate: '2019-05',
  },
];

describe('StructuredData Component', () => {
  it('renders a script tag with JSON-LD type', () => {
    const { container } = render(<StructuredData profile={mockProfile} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });

  it('includes proper schema.org context', () => {
    const { container } = render(<StructuredData profile={mockProfile} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonContent = JSON.parse(script?.textContent || '{}');
    
    expect(jsonContent['@context']).toBe('https://schema.org');
    expect(jsonContent['@type']).toBe('Person');
  });

  it('includes profile information in structured data', () => {
    const { container } = render(<StructuredData profile={mockProfile} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonContent = JSON.parse(script?.textContent || '{}');
    
    expect(jsonContent.name).toBe(mockProfile.name);
    expect(jsonContent.jobTitle).toBe(mockProfile.title);
    expect(jsonContent.description).toBe(mockProfile.summary);
    expect(jsonContent.email).toBe(mockProfile.email);
    expect(jsonContent.telephone).toBe(mockProfile.phone);
  });

  it('includes address information', () => {
    const { container } = render(<StructuredData profile={mockProfile} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonContent = JSON.parse(script?.textContent || '{}');
    
    expect(jsonContent.address).toBeDefined();
    expect(jsonContent.address['@type']).toBe('PostalAddress');
    expect(jsonContent.address.addressLocality).toBe(mockProfile.location);
  });

  it('includes social media links in sameAs array', () => {
    const { container } = render(<StructuredData profile={mockProfile} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonContent = JSON.parse(script?.textContent || '{}');
    
    expect(jsonContent.sameAs).toBeDefined();
    expect(Array.isArray(jsonContent.sameAs)).toBe(true);
    expect(jsonContent.sameAs).toContain('https://linkedin.com/in/johndoe');
    expect(jsonContent.sameAs).toContain('https://github.com/johndoe');
  });

  it('includes image URL', () => {
    const { container } = render(<StructuredData profile={mockProfile} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonContent = JSON.parse(script?.textContent || '{}');
    
    expect(jsonContent.image).toBeDefined();
    expect(jsonContent.image).toContain(mockProfile.profileImage);
  });

  it('includes website URL', () => {
    const { container } = render(<StructuredData profile={mockProfile} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonContent = JSON.parse(script?.textContent || '{}');
    
    expect(jsonContent.url).toBe('https://scottryanhoward.info');
  });

  it('includes current employer when experiences provided', () => {
    const { container } = render(
      <StructuredData profile={mockProfile} experiences={mockExperiences} />
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonContent = JSON.parse(script?.textContent || '{}');
    
    expect(jsonContent.worksFor).toBeDefined();
    expect(jsonContent.worksFor['@type']).toBe('Organization');
    expect(jsonContent.worksFor.name).toBe('Tech Corp');
  });

  it('includes education information when provided', () => {
    const { container } = render(
      <StructuredData profile={mockProfile} education={mockEducation} />
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonContent = JSON.parse(script?.textContent || '{}');
    
    expect(jsonContent.alumniOf).toBeDefined();
    expect(Array.isArray(jsonContent.alumniOf)).toBe(true);
    expect(jsonContent.alumniOf[0]['@type']).toBe('EducationalOrganization');
    expect(jsonContent.alumniOf[0].name).toBe('University of Example');
  });

  it('includes knowsAbout skills array', () => {
    const { container } = render(<StructuredData profile={mockProfile} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonContent = JSON.parse(script?.textContent || '{}');
    
    expect(jsonContent.knowsAbout).toBeDefined();
    expect(Array.isArray(jsonContent.knowsAbout)).toBe(true);
    expect(jsonContent.knowsAbout).toContain('Software Engineering');
    expect(jsonContent.knowsAbout).toContain('React');
    expect(jsonContent.knowsAbout).toContain('TypeScript');
  });

  it('handles missing optional data gracefully', () => {
    const { container } = render(<StructuredData profile={mockProfile} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const jsonContent = JSON.parse(script?.textContent || '{}');
    
    // Should still render valid JSON-LD even without experiences or education
    expect(jsonContent['@context']).toBe('https://schema.org');
    expect(jsonContent['@type']).toBe('Person');
    expect(jsonContent.name).toBe(mockProfile.name);
  });

  it('generates valid JSON that can be parsed', () => {
    const { container } = render(
      <StructuredData 
        profile={mockProfile} 
        experiences={mockExperiences}
        education={mockEducation}
      />
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    
    // Should not throw when parsing
    expect(() => JSON.parse(script?.textContent || '{}')).not.toThrow();
  });
});

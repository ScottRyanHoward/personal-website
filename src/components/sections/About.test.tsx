import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from './About';
import { Profile } from '@/types';

const mockProfile: Profile = {
  name: 'John Doe',
  title: 'Software Engineer',
  summary: 'Experienced software engineer with a passion for building scalable applications.',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  profileImage: '/images/profile.jpg',
  socialLinks: [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/johndoe',
      icon: 'linkedin',
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/johndoe',
      icon: 'github',
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/johndoe',
      icon: 'twitter',
    },
  ],
};

describe('About Component', () => {
  it('renders the section with correct id and aria-label', () => {
    const { container } = render(<About profile={mockProfile} />);
    const section = container.querySelector('#about');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-label', 'About section');
  });

  it('renders the section heading', () => {
    render(<About profile={mockProfile} />);
    const heading = screen.getByRole('heading', { name: /about me/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('displays the professional summary', () => {
    render(<About profile={mockProfile} />);
    expect(screen.getByText(mockProfile.summary)).toBeInTheDocument();
  });

  it('displays location in key highlights', () => {
    render(<About profile={mockProfile} />);
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText(mockProfile.location)).toBeInTheDocument();
  });

  it('displays role/title in key highlights', () => {
    render(<About profile={mockProfile} />);
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText(mockProfile.title)).toBeInTheDocument();
  });

  it('displays email in contact information section', () => {
    render(<About profile={mockProfile} />);
    // The About component shows "Email Me" text instead of the actual email address
    const emailLink = screen.getByText('Email Me');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', `mailto:${mockProfile.email}`);
  });

  it('does not display phone functionality since component focuses on email and social media', () => {
    render(<About profile={mockProfile} />);
    // The About component doesn't include phone functionality
    const phoneLink = screen.queryByRole('link', { name: /phone number/i });
    expect(phoneLink).not.toBeInTheDocument();
  });

  it('displays email contact instead of phone', () => {
    render(<About profile={mockProfile} />);
    const emailLink = screen.getByRole('link', { name: /send email to/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', `mailto:${mockProfile.email}`);
  });

  it('renders all social links', () => {
    render(<About profile={mockProfile} />);
    mockProfile.socialLinks.forEach((link) => {
      const socialLink = screen.getByRole('link', {
        name: new RegExp(`visit ${link.platform} profile`, 'i'),
      });
      expect(socialLink).toBeInTheDocument();
    });
  });

  it('social links open in new tab with proper security attributes', () => {
    render(<About profile={mockProfile} />);
    mockProfile.socialLinks.forEach((link) => {
      const socialLink = screen.getByRole('link', {
        name: new RegExp(`visit ${link.platform} profile`, 'i'),
      });
      expect(socialLink).toHaveAttribute('href', link.url);
      expect(socialLink).toHaveAttribute('target', '_blank');
      expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('email links have proper accessibility attributes', () => {
    render(<About profile={mockProfile} />);
    const emailLink = screen.getByRole('link', {
      name: new RegExp(`send email to ${mockProfile.email}`, 'i'),
    });
    expect(emailLink).toHaveAttribute('href', `mailto:${mockProfile.email}`);
  });

  it('does not have phone links since component focuses on email contact', () => {
    render(<About profile={mockProfile} />);
    const phoneLink = screen.queryByRole('link', {
      name: /phone number/i,
    });
    expect(phoneLink).not.toBeInTheDocument();
  });

  it('renders "Connect With Me" heading', () => {
    render(<About profile={mockProfile} />);
    const heading = screen.getByRole('heading', { name: /connect with me/i, level: 3 });
    expect(heading).toBeInTheDocument();
  });

  it('renders "Connect With Me" heading', () => {
    render(<About profile={mockProfile} />);
    const heading = screen.getByRole('heading', { name: /connect with me/i, level: 3 });
    expect(heading).toBeInTheDocument();
  });

  it('renders correct number of social links', () => {
    render(<About profile={mockProfile} />);
    const socialLinks = screen.getAllByRole('link', {
      name: /visit .* profile/i,
    });
    expect(socialLinks).toHaveLength(mockProfile.socialLinks.length);
  });

  it('handles profile with no social links', () => {
    const profileWithoutSocial = { ...mockProfile, socialLinks: [] };
    render(<About profile={profileWithoutSocial} />);
    const socialLinks = screen.queryAllByRole('link', {
      name: /visit .* profile/i,
    });
    expect(socialLinks).toHaveLength(0);
  });

  it('applies correct CSS classes for responsive layout', () => {
    const { container } = render(<About profile={mockProfile} />);
    const highlightsGrid = container.querySelector('.lg\\:grid-cols-3');
    expect(highlightsGrid).toBeInTheDocument();
  });

  it('email link in key highlights has proper aria-label', () => {
    render(<About profile={mockProfile} />);
    const emailLink = screen.getByRole('link', {
      name: new RegExp(`send email to ${mockProfile.email}`, 'i'),
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', `mailto:${mockProfile.email}`);
  });
});

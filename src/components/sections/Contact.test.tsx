import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from './Contact';
import { Profile } from '@/types';

describe('Contact', () => {
  const mockProfile: Profile = {
    name: 'John Doe',
    title: 'Software Engineer',
    summary: 'Experienced developer',
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

  beforeEach(() => {
    // Reset window.open mock
    vi.stubGlobal('open', vi.fn());
  });

  describe('Rendering', () => {
    it('renders the contact section with correct heading', () => {
      render(<Contact profile={mockProfile} />);

      expect(
        screen.getByRole('heading', { name: /get in touch/i, level: 2 })
      ).toBeInTheDocument();
    });

    it('renders the section with proper ARIA label', () => {
      render(<Contact profile={mockProfile} />);

      const section = screen.getByRole('region', { name: /contact section/i });
      expect(section).toBeInTheDocument();
    });

    it('renders introductory text', () => {
      render(<Contact profile={mockProfile} />);

      expect(
        screen.getByText(/always open to discussing new opportunities/i)
      ).toBeInTheDocument();
    });
  });

  describe('Email Contact', () => {
    it('displays email address', () => {
      render(<Contact profile={mockProfile} />);

      const emailLink = screen.getByRole('link', {
        name: /send email to john\.doe@example\.com/i,
      });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveTextContent('john.doe@example.com');
    });

    it('email link has correct mailto href', () => {
      render(<Contact profile={mockProfile} />);

      const emailLink = screen.getByRole('link', {
        name: /send email to john\.doe@example\.com/i,
      });
      expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
    });

    it('email link has proper accessibility attributes', () => {
      render(<Contact profile={mockProfile} />);

      const emailLink = screen.getByRole('link', {
        name: /send email to john\.doe@example\.com/i,
      });
      expect(emailLink).toHaveAccessibleName();
    });

    it('renders email section heading', () => {
      render(<Contact profile={mockProfile} />);

      expect(
        screen.getByRole('heading', { name: /^email$/i, level: 3 })
      ).toBeInTheDocument();
    });
  });

  describe('Phone Contact', () => {
    it('displays phone number when provided', () => {
      render(<Contact profile={mockProfile} />);

      const phoneLink = screen.getByRole('link', {
        name: /call phone number/i,
      });
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveTextContent('+1 (555) 123-4567');
    });

    it('phone link has correct tel href', () => {
      render(<Contact profile={mockProfile} />);

      const phoneLink = screen.getByRole('link', {
        name: /call phone number/i,
      });
      expect(phoneLink).toHaveAttribute('href', 'tel:+1 (555) 123-4567');
    });

    it('does not render phone section when phone is not provided', () => {
      const profileWithoutPhone = { ...mockProfile, phone: undefined };
      render(<Contact profile={profileWithoutPhone} />);

      expect(
        screen.queryByRole('link', { name: /call phone number/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { name: /^phone$/i })
      ).not.toBeInTheDocument();
    });

    it('phone link has proper accessibility attributes', () => {
      render(<Contact profile={mockProfile} />);

      const phoneLink = screen.getByRole('link', {
        name: /call phone number/i,
      });
      expect(phoneLink).toHaveAccessibleName();
    });
  });

  describe('Social Media Links', () => {
    it('renders all social media links', () => {
      render(<Contact profile={mockProfile} />);

      expect(
        screen.getByRole('link', {
          name: /visit linkedin profile \(opens in new tab\)/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', {
          name: /visit github profile \(opens in new tab\)/i,
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', {
          name: /visit twitter profile \(opens in new tab\)/i,
        })
      ).toBeInTheDocument();
    });

    it('social links have correct URLs', () => {
      render(<Contact profile={mockProfile} />);

      const linkedinLink = screen.getByRole('link', {
        name: /visit linkedin profile/i,
      });
      const githubLink = screen.getByRole('link', {
        name: /visit github profile/i,
      });
      const twitterLink = screen.getByRole('link', {
        name: /visit twitter profile/i,
      });

      expect(linkedinLink).toHaveAttribute(
        'href',
        'https://linkedin.com/in/johndoe'
      );
      expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
      expect(twitterLink).toHaveAttribute(
        'href',
        'https://twitter.com/johndoe'
      );
    });

    it('social links open in new tab', () => {
      render(<Contact profile={mockProfile} />);

      const socialLinks = screen.getAllByRole('link', {
        name: /visit .* profile \(opens in new tab\)/i,
      });

      socialLinks.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
      });
    });

    it('social links have security attributes', () => {
      render(<Contact profile={mockProfile} />);

      const socialLinks = screen.getAllByRole('link', {
        name: /visit .* profile \(opens in new tab\)/i,
      });

      socialLinks.forEach((link) => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('social links have proper accessibility attributes', () => {
      render(<Contact profile={mockProfile} />);

      const socialLinks = screen.getAllByRole('link', {
        name: /visit .* profile \(opens in new tab\)/i,
      });

      socialLinks.forEach((link) => {
        expect(link).toHaveAccessibleName();
      });
    });

    it('displays platform names for social links', () => {
      render(<Contact profile={mockProfile} />);

      expect(screen.getByText('LinkedIn')).toBeInTheDocument();
      expect(screen.getByText('GitHub')).toBeInTheDocument();
      expect(screen.getByText('Twitter')).toBeInTheDocument();
    });

    it('renders social media section heading', () => {
      render(<Contact profile={mockProfile} />);

      expect(
        screen.getByRole('heading', {
          name: /connect on social media/i,
          level: 3,
        })
      ).toBeInTheDocument();
    });
  });

  describe('Resume Download', () => {
    it('renders resume download button', () => {
      render(<Contact profile={mockProfile} />);

      const downloadButton = screen.getByRole('button', {
        name: /download resume as pdf file/i,
      });
      expect(downloadButton).toBeInTheDocument();
      expect(downloadButton).toHaveTextContent(/download resume/i);
    });

    it('calls window.open with correct URL when download button is clicked', async () => {
      const user = userEvent.setup();
      const openSpy = vi.fn();
      vi.stubGlobal('open', openSpy);

      render(<Contact profile={mockProfile} />);

      const downloadButton = screen.getByRole('button', {
        name: /download resume as pdf file/i,
      });
      await user.click(downloadButton);

      expect(openSpy).toHaveBeenCalledWith('/resume.pdf', '_blank');
    });

    it('calls custom onDownloadResume handler when provided', async () => {
      const user = userEvent.setup();
      const mockDownloadHandler = vi.fn();

      render(
        <Contact profile={mockProfile} onDownloadResume={mockDownloadHandler} />
      );

      const downloadButton = screen.getByRole('button', {
        name: /download resume as pdf file/i,
      });
      await user.click(downloadButton);

      expect(mockDownloadHandler).toHaveBeenCalledTimes(1);
    });

    it('download button has proper accessibility attributes', () => {
      render(<Contact profile={mockProfile} />);

      const downloadButton = screen.getByRole('button', {
        name: /download resume as pdf file/i,
      });
      expect(downloadButton).toHaveAccessibleName();
    });

    it('renders resume download section heading', () => {
      render(<Contact profile={mockProfile} />);

      expect(
        screen.getByRole('heading', { name: /download my resume/i, level: 3 })
      ).toBeInTheDocument();
    });

    it('renders resume download description', () => {
      render(<Contact profile={mockProfile} />);

      expect(
        screen.getByText(/get a pdf copy of my complete resume/i)
      ).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('all interactive elements have accessible names', () => {
      render(<Contact profile={mockProfile} />);

      const emailLink = screen.getByRole('link', {
        name: /send email to/i,
      });
      const phoneLink = screen.getByRole('link', {
        name: /call phone number/i,
      });
      const socialLinks = screen.getAllByRole('link', {
        name: /visit .* profile/i,
      });
      const downloadButton = screen.getByRole('button', {
        name: /download resume/i,
      });

      expect(emailLink).toHaveAccessibleName();
      expect(phoneLink).toHaveAccessibleName();
      socialLinks.forEach((link) => {
        expect(link).toHaveAccessibleName();
      });
      expect(downloadButton).toHaveAccessibleName();
    });

    it('uses semantic HTML with proper heading hierarchy', () => {
      render(<Contact profile={mockProfile} />);

      const h2 = screen.getByRole('heading', { level: 2 });
      const h3s = screen.getAllByRole('heading', { level: 3 });

      expect(h2).toBeInTheDocument();
      expect(h3s.length).toBeGreaterThan(0);
    });

    it('section has proper ARIA label', () => {
      render(<Contact profile={mockProfile} />);

      const section = screen.getByRole('region', { name: /contact section/i });
      expect(section).toHaveAttribute('aria-label', 'Contact section');
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive grid classes for contact methods', () => {
      const { container } = render(<Contact profile={mockProfile} />);

      const grid = container.querySelector('.grid.md\\:grid-cols-2');
      expect(grid).toBeInTheDocument();
    });

    it('applies responsive styling to social links container', () => {
      const { container } = render(<Contact profile={mockProfile} />);

      const socialContainer = container.querySelector('.flex.flex-wrap');
      expect(socialContainer).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles profile with no social links', () => {
      const profileWithoutSocial = { ...mockProfile, socialLinks: [] };
      render(<Contact profile={profileWithoutSocial} />);

      expect(
        screen.getByRole('heading', { name: /connect on social media/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: /visit .* profile/i })
      ).not.toBeInTheDocument();
    });

    it('handles profile with only email (no phone)', () => {
      const profileEmailOnly = { ...mockProfile, phone: undefined };
      render(<Contact profile={profileEmailOnly} />);

      expect(
        screen.getByRole('link', { name: /send email to/i })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: /call phone number/i })
      ).not.toBeInTheDocument();
    });

    it('renders correctly with minimal profile data', () => {
      const minimalProfile: Profile = {
        name: 'Jane Doe',
        title: 'Developer',
        summary: 'Developer',
        email: 'jane@example.com',
        location: 'NYC',
        profileImage: '/image.jpg',
        socialLinks: [],
      };

      render(<Contact profile={minimalProfile} />);

      expect(
        screen.getByRole('heading', { name: /get in touch/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: /send email to jane@example\.com/i })
      ).toBeInTheDocument();
    });
  });
});

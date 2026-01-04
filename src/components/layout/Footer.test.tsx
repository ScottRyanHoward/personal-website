import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from './Footer';
import type { SocialLink } from '@/types';

const mockSocialLinks: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/test', icon: 'linkedin' },
  { platform: 'GitHub', url: 'https://github.com/test', icon: 'github' },
  { platform: 'Twitter', url: 'https://twitter.com/test', icon: 'twitter' },
];

describe('Footer', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
    
    // Mock getElementById
    document.getElementById = vi.fn((id: string) => {
      return {
        offsetTop: 100,
      } as HTMLElement;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders footer with contentinfo role', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays current year in copyright', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
  });

  it('displays copyright text', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    expect(screen.getByText(/Scott Ryan Howard. All rights reserved./i)).toBeInTheDocument();
  });

  it('renders all quick links', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Work Projects')).toBeInTheDocument();
    expect(screen.getByText('Personal Projects')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders Quick Links heading', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
  });

  it('renders Connect heading', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('renders all social links', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const linkedInLink = screen.getByLabelText('Visit LinkedIn profile');
    const githubLink = screen.getByLabelText('Visit GitHub profile');
    const twitterLink = screen.getByLabelText('Visit Twitter profile');
    
    expect(linkedInLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
  });

  it('social links open in new tab with security attributes', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const linkedInLink = screen.getByLabelText('Visit LinkedIn profile');
    
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/test');
  });

  it('renders back to top button', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const backToTopButton = screen.getByRole('button', { name: 'Back to top' });
    expect(backToTopButton).toBeInTheDocument();
  });

  it('scrolls to top when back to top button is clicked', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const backToTopButton = screen.getByRole('button', { name: 'Back to top' });
    fireEvent.click(backToTopButton);
    
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('handles quick link clicks with smooth scroll', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth',
    });
  });

  it('has proper focus styles on quick links', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-500');
  });

  it('has proper focus styles on social links', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const linkedInLink = screen.getByLabelText('Visit LinkedIn profile');
    expect(linkedInLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-500');
  });

  it('has proper focus styles on back to top button', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const backToTopButton = screen.getByRole('button', { name: 'Back to top' });
    expect(backToTopButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-500');
  });

  it('renders with empty social links array', () => {
    render(<Footer socialLinks={[]} />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('prevents default behavior on quick link clicks', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    const aboutLink = screen.getByText('About');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    
    aboutLink.dispatchEvent(event);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('has proper ARIA labels on social links', () => {
    render(<Footer socialLinks={mockSocialLinks} />);
    
    expect(screen.getByLabelText('Visit LinkedIn profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit GitHub profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit Twitter profile')).toBeInTheDocument();
  });
});

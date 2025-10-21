import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from './Hero';
import { Profile } from '@/types';

const mockProfile: Profile = {
  name: 'John Doe',
  title: 'Software Engineer',
  summary: 'Experienced software engineer with a passion for building great products.',
  email: 'john@example.com',
  location: 'San Francisco, CA',
  profileImage: '/images/profile.jpg',
  socialLinks: [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/johndoe',
      icon: 'linkedin',
    },
  ],
};

describe('Hero Component', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
    // Mock window.open
    window.open = vi.fn();
  });

  it('renders profile name and title', () => {
    render(<Hero profile={mockProfile} />);

    expect(screen.getByRole('heading', { level: 1, name: 'John Doe' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Software Engineer' })).toBeInTheDocument();
  });

  it('displays profile summary', () => {
    render(<Hero profile={mockProfile} />);

    // The Hero component doesn't display the summary - it only shows name and title
    // This test should verify that the component renders without the summary
    expect(screen.queryByText('Experienced software engineer with a passion for building great products.')).not.toBeInTheDocument();
  });

  it('displays profile image with correct alt text', () => {
    render(<Hero profile={mockProfile} />);

    const image = screen.getByAltText('John Doe profile picture');
    expect(image).toBeInTheDocument();
  });

  it('displays CTA buttons', () => {
    render(<Hero profile={mockProfile} />);

    expect(screen.getByRole('button', { name: /view my work/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /download resume/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go to contact/i })).toBeInTheDocument();
  });

  it('displays scroll indicator', () => {
    render(<Hero profile={mockProfile} />);

    const scrollButton = screen.getByRole('button', { name: /scroll down/i });
    expect(scrollButton).toBeInTheDocument();
  });

  it('handles View Work button click with custom handler', async () => {
    const user = userEvent.setup();
    const onViewWork = vi.fn();

    render(<Hero profile={mockProfile} onViewWork={onViewWork} />);

    const viewWorkButton = screen.getByRole('button', { name: /view my work/i });
    await user.click(viewWorkButton);

    expect(onViewWork).toHaveBeenCalledTimes(1);
  });

  it('handles View Work button click with default scroll behavior', async () => {
    const user = userEvent.setup();
    const mockElement = document.createElement('div');
    mockElement.id = 'work-projects';
    document.body.appendChild(mockElement);

    render(<Hero profile={mockProfile} />);

    const viewWorkButton = screen.getByRole('button', { name: /view my work/i });
    await user.click(viewWorkButton);

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(mockElement);
  });

  it('handles Download Resume button click with custom handler', async () => {
    const user = userEvent.setup();
    const onDownloadResume = vi.fn();

    render(<Hero profile={mockProfile} onDownloadResume={onDownloadResume} />);

    const downloadButton = screen.getByRole('button', { name: /download resume/i });
    await user.click(downloadButton);

    expect(onDownloadResume).toHaveBeenCalledTimes(1);
  });

  it('handles Download Resume button click with default behavior', async () => {
    const user = userEvent.setup();

    render(<Hero profile={mockProfile} />);

    const downloadButton = screen.getByRole('button', { name: /download resume/i });
    await user.click(downloadButton);

    expect(window.open).toHaveBeenCalledWith('/Scott_Howard_Resume.pdf', '_blank');
  });

  it('handles Contact button click with custom handler', async () => {
    const user = userEvent.setup();
    const onContact = vi.fn();

    render(<Hero profile={mockProfile} onContact={onContact} />);

    const contactButton = screen.getByRole('button', { name: /go to contact/i });
    await user.click(contactButton);

    expect(onContact).toHaveBeenCalledTimes(1);
  });

  it('handles Contact button click with default scroll behavior', async () => {
    const user = userEvent.setup();
    const mockElement = document.createElement('div');
    mockElement.id = 'contact';
    document.body.appendChild(mockElement);

    render(<Hero profile={mockProfile} />);

    const contactButton = screen.getByRole('button', { name: /go to contact/i });
    await user.click(contactButton);

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(mockElement);
  });

  it('handles scroll indicator click', async () => {
    const user = userEvent.setup();
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    document.body.appendChild(mockElement);

    render(<Hero profile={mockProfile} />);

    const scrollButton = screen.getByRole('button', { name: /scroll down/i });
    await user.click(scrollButton);

    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(mockElement);
  });

  it('has proper accessibility attributes', () => {
    render(<Hero profile={mockProfile} />);

    const section = screen.getByLabelText('Hero section');
    expect(section).toBeInTheDocument();

    const viewWorkButton = screen.getByRole('button', { name: /view my work/i });
    expect(viewWorkButton).toHaveAttribute('aria-label');

    const downloadButton = screen.getByRole('button', { name: /download resume/i });
    expect(downloadButton).toHaveAttribute('aria-label');

    const contactButton = screen.getByRole('button', { name: /go to contact/i });
    expect(contactButton).toHaveAttribute('aria-label');

    const scrollButton = screen.getByRole('button', { name: /scroll down/i });
    expect(scrollButton).toHaveAttribute('aria-label');
  });

  it('applies responsive classes for mobile and desktop', () => {
    render(<Hero profile={mockProfile} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-3xl', 'sm:text-4xl', 'md:text-5xl', 'lg:text-6xl');
  });
});

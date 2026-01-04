import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Navigation from './Navigation';

describe('Navigation', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders navigation with proper role and label', () => {
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('renders all navigation links on desktop', () => {
    render(<Navigation />);
    
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Work Projects')).toBeInTheDocument();
    expect(screen.getByText('Personal Projects')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders hamburger menu button on mobile', () => {
    render(<Navigation />);
    
    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    render(<Navigation />);
    
    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    
    // Menu should be closed initially
    expect(screen.queryByRole('button', { name: 'Close menu' })).not.toBeInTheDocument();
    
    // Open menu
    fireEvent.click(menuButton);
    
    const closeButton = screen.getByRole('button', { name: 'Close menu' });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
    
    // Mobile menu should be visible - check for content instead
    expect(screen.getAllByText('About').length).toBeGreaterThan(1);
  });

  it('closes mobile menu when a link is clicked', () => {
    render(<Navigation />);
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(menuButton);
    
    // Click a link in mobile menu - get the second About link (first is desktop, second is mobile)
    const aboutLinks = screen.getAllByText('About');
    fireEvent.click(aboutLinks[1]);
    
    // Menu should be closed
    expect(screen.queryByRole('button', { name: 'Close menu' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
  });

  it('handles smooth scroll when link is clicked', () => {
    // Mock getElementById for this test
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    Object.defineProperty(mockElement, 'offsetTop', { value: 100, writable: true });
    document.body.appendChild(mockElement);
    
    render(<Navigation />);
    
    const aboutLink = screen.getAllByText('About')[0];
    fireEvent.click(aboutLink);
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 20, // 100 - 80 (header offset)
      behavior: 'smooth',
    });
    
    document.body.removeChild(mockElement);
  });

  it('handles keyboard navigation with Enter key', () => {
    // Mock getElementById for this test
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    Object.defineProperty(mockElement, 'offsetTop', { value: 100, writable: true });
    document.body.appendChild(mockElement);
    
    render(<Navigation />);
    
    const aboutLink = screen.getAllByText('About')[0];
    fireEvent.keyDown(aboutLink, { key: 'Enter' });
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 20,
      behavior: 'smooth',
    });
    
    document.body.removeChild(mockElement);
  });

  it('handles keyboard navigation with Space key', () => {
    // Mock getElementById for this test
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    Object.defineProperty(mockElement, 'offsetTop', { value: 100, writable: true });
    document.body.appendChild(mockElement);
    
    render(<Navigation />);
    
    const aboutLink = screen.getAllByText('About')[0];
    fireEvent.keyDown(aboutLink, { key: ' ' });
    
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 20,
      behavior: 'smooth',
    });
    
    document.body.removeChild(mockElement);
  });

  it('has proper focus styles on links', () => {
    render(<Navigation />);
    
    const aboutLink = screen.getAllByText('About')[0];
    expect(aboutLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-500');
  });

  it('has proper ARIA attributes on menu button', () => {
    render(<Navigation />);
    
    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    
    fireEvent.click(menuButton);
    
    const closeButton = screen.getByRole('button', { name: 'Close menu' });
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('marks active section with aria-current', () => {
    // Mock getElementById for this test
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    Object.defineProperty(mockElement, 'offsetTop', { value: 100, writable: true });
    Object.defineProperty(mockElement, 'offsetHeight', { value: 500, writable: true });
    document.body.appendChild(mockElement);
    
    render(<Navigation />);
    
    // Simulate scroll to trigger active section detection
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    fireEvent.scroll(window);
    
    // Check that at least one link has aria-current
    const links = screen.getAllByRole('link');
    const activeLinks = links.filter(link => link.getAttribute('aria-current') === 'page');
    expect(activeLinks.length).toBeGreaterThan(0);
    
    document.body.removeChild(mockElement);
  });

  it('applies active styles to current section', () => {
    // Mock getElementById for this test
    const mockElement = document.createElement('div');
    mockElement.id = 'about';
    Object.defineProperty(mockElement, 'offsetTop', { value: 100, writable: true });
    Object.defineProperty(mockElement, 'offsetHeight', { value: 500, writable: true });
    document.body.appendChild(mockElement);
    
    render(<Navigation />);
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    fireEvent.scroll(window);
    
    // Check that active link has proper styling
    const links = screen.getAllByRole('link');
    const activeLinks = links.filter(link => link.getAttribute('aria-current') === 'page');
    
    if (activeLinks.length > 0) {
      expect(activeLinks[0]).toHaveClass('text-primary-600');
    }
    
    document.body.removeChild(mockElement);
  });

  it('prevents default link behavior', () => {
    render(<Navigation />);
    
    const aboutLink = screen.getAllByText('About')[0];
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    
    aboutLink.dispatchEvent(event);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});

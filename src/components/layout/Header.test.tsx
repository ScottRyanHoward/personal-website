import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

// Mock the Navigation component
vi.mock('./Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>,
}));

describe('Header', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header with name', () => {
    render(<Header name="Scott Ryan Howard" />);
    
    const nameButton = screen.getByRole('button', { name: /Scott Ryan Howard/i });
    expect(nameButton).toBeInTheDocument();
  });

  it('renders with banner role for accessibility', () => {
    render(<Header name="Scott Ryan Howard" />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renders Navigation component', () => {
    render(<Header name="Scott Ryan Howard" />);
    
    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();
  });

  it('has proper ARIA label on name button', () => {
    render(<Header name="Scott Ryan Howard" />);
    
    const nameButton = screen.getByRole('button', { name: 'Scott Ryan Howard - Go to top' });
    expect(nameButton).toBeInTheDocument();
  });

  it('scrolls to top when name is clicked', () => {
    render(<Header name="Scott Ryan Howard" />);
    
    const nameButton = screen.getByRole('button', { name: /Scott Ryan Howard/i });
    fireEvent.click(nameButton);
    
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('applies white background with border initially', () => {
    render(<Header name="Scott Ryan Howard" />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white');
    expect(header).toHaveClass('border-b', 'border-gray-200');
    expect(header).not.toHaveClass('shadow-md');
  });

  it('applies background and shadow when scrolled', () => {
    render(<Header name="Scott Ryan Howard" />);
    
    const header = screen.getByRole('banner');
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);
    
    expect(header).toHaveClass('bg-white', 'shadow-md');
  });

  it('has keyboard focus styles', () => {
    render(<Header name="Scott Ryan Howard" />);
    
    const nameButton = screen.getByRole('button', { name: /Scott Ryan Howard/i });
    expect(nameButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
  });
});

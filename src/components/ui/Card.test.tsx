import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from './Card';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('renders with children content', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders with default variant', () => {
      render(<Card data-testid="card">Default card</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-white', 'shadow-md');
    });

    it('renders with elevated variant', () => {
      render(
        <Card variant="elevated" data-testid="card">
          Elevated card
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-white', 'shadow-lg');
    });

    it('renders with outlined variant', () => {
      render(
        <Card variant="outlined" data-testid="card">
          Outlined card
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('bg-white', 'border-2', 'border-gray-200');
    });
  });

  describe('Responsive Padding', () => {
    it('has responsive padding classes', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('p-4', 'sm:p-6', 'md:p-8');
    });
  });

  describe('Hover Effects', () => {
    it('does not have hover styles by default', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).not.toHaveClass('hover:shadow-xl');
      expect(card).not.toHaveClass('cursor-pointer');
    });

    it('has hover styles when hoverable is true', () => {
      render(
        <Card hoverable data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass(
        'hover:shadow-xl',
        'hover:-translate-y-1',
        'cursor-pointer'
      );
    });
  });

  describe('Styling', () => {
    it('has base styles applied', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rounded-lg', 'transition-all', 'duration-200');
    });

    it('accepts custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
    });

    it('preserves base styles with custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rounded-lg', 'custom-class');
    });
  });

  describe('Interactions', () => {
    it('supports onClick handler', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card onClick={handleClick} data-testid="card">
          Clickable card
        </Card>
      );

      const card = screen.getByTestId('card');
      await user.click(card);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be made focusable with tabIndex', () => {
      render(
        <Card tabIndex={0} data-testid="card">
          Focusable card
        </Card>
      );

      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('tabIndex', '0');
      card.focus();
      expect(card).toHaveFocus();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to div element', () => {
      const ref = { current: null };
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('HTML Attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(
        <Card data-testid="card" id="my-card" role="article">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('id', 'my-card');
      expect(card).toHaveAttribute('role', 'article');
    });

    it('supports aria attributes', () => {
      render(
        <Card
          data-testid="card"
          aria-label="Card label"
          aria-describedby="description"
        >
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('aria-label', 'Card label');
      expect(card).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('Complex Content', () => {
    it('renders complex nested content', () => {
      render(
        <Card data-testid="card">
          <h2>Title</h2>
          <p>Description</p>
          <button>Action</button>
        </Card>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders with primary variant by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600');
    });

    it('renders with secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-600');
    });

    it('renders with outline variant', () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-2', 'border-blue-600', 'bg-transparent');
    });
  });

  describe('Icon Support', () => {
    it('renders with icon on the left by default', () => {
      const icon = <svg data-testid="test-icon" />;
      render(<Button icon={icon}>With Icon</Button>);
      
      const button = screen.getByRole('button');
      const iconElement = screen.getByTestId('test-icon');
      
      expect(iconElement).toBeInTheDocument();
      expect(iconElement.parentElement).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders with icon on the right', () => {
      const icon = <svg data-testid="test-icon" />;
      render(
        <Button icon={icon} iconPosition="right">
          With Icon
        </Button>
      );
      
      const iconElement = screen.getByTestId('test-icon');
      expect(iconElement).toBeInTheDocument();
    });

    it('renders without icon when not provided', () => {
      render(<Button>No Icon</Button>);
      const button = screen.getByRole('button');
      expect(button.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
    });
  });

  describe('Accessibility', () => {
    it('has correct button type by default', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('supports custom button type', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('has focus ring styles', () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus:ring-2', 'focus:ring-offset-2');
    });

    it('supports aria-label', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      expect(screen.getByRole('button', { name: /custom label/i })).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      render(<Button aria-describedby="description">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });

    it('hides icon from screen readers', () => {
      const icon = <svg data-testid="test-icon" />;
      render(<Button icon={icon}>Button</Button>);
      const iconWrapper = screen.getByTestId('test-icon').parentElement;
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Disabled State', () => {
    it('renders as disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('has disabled styles when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });

    it('does not trigger onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard interaction', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Press me</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom Styling', () => {
    it('accepts custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('preserves base styles with custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('inline-flex', 'items-center', 'custom-class');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to button element', () => {
      const ref = { current: null };
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('HTML Attributes', () => {
    it('passes through additional HTML attributes', () => {
      render(
        <Button data-testid="custom-button" id="my-button">
          Button
        </Button>
      );
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('id', 'my-button');
    });
  });
});

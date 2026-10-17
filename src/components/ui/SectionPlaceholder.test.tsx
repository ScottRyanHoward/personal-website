import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SectionPlaceholder } from './SectionPlaceholder';

describe('SectionPlaceholder', () => {
  it('renders a pulsing light placeholder block', () => {
    const { container } = render(<SectionPlaceholder />);
    const block = container.firstElementChild;

    expect(block).toHaveClass('min-h-[400px]', 'animate-pulse', 'bg-gray-100');
  });

  it('is hidden from assistive technology', () => {
    const { container } = render(<SectionPlaceholder />);

    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('uses no dark-mode classes (site is light-only)', () => {
    const { container } = render(<SectionPlaceholder />);

    expect(container.firstElementChild?.className).not.toMatch(/dark:/);
  });
});

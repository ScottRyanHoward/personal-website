import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OptimizedImage } from './OptimizedImage';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, onError, ...props }: any) => {
    return (
      <img
        src={typeof src === 'string' ? src : src.src}
        alt={alt}
        onError={onError}
        {...props}
      />
    );
  },
}));

describe('OptimizedImage', () => {
  it('renders with provided src and alt text', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('uses fallback image on error when showFallbackOnError is true', async () => {
    const { container } = render(
      <OptimizedImage
        src="/broken-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        fallbackSrc="/fallback.svg"
        showFallbackOnError={true}
      />
    );

    const image = screen.getByAltText('Test image');
    
    // Simulate image load error
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/fallback.svg');
    });
  });

  it('does not use fallback when showFallbackOnError is false', async () => {
    render(
      <OptimizedImage
        src="/broken-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        fallbackSrc="/fallback.svg"
        showFallbackOnError={false}
      />
    );

    const image = screen.getByAltText('Test image');
    
    // Simulate image load error
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/broken-image.jpg');
    });
  });

  it('applies lazy loading by default', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('allows overriding loading attribute', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        loading="eager"
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('uses custom fallback src when provided', async () => {
    const customFallback = '/custom-fallback.svg';
    
    render(
      <OptimizedImage
        src="/broken-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        fallbackSrc={customFallback}
      />
    );

    const image = screen.getByAltText('Test image');
    
    // Simulate image load error
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      expect(image).toHaveAttribute('src', customFallback);
    });
  });

  it('passes through additional props to Image component', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={100}
        height={100}
        className="custom-class"
        data-testid="optimized-image"
      />
    );

    const image = screen.getByAltText('Test image');
    expect(image).toHaveClass('custom-class');
    expect(image).toHaveAttribute('data-testid', 'optimized-image');
  });

  it('handles SVG images without blur placeholder', () => {
    render(
      <OptimizedImage
        src="/test-image.svg"
        alt="Test SVG"
        width={100}
        height={100}
      />
    );

    const image = screen.getByAltText('Test SVG');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.svg');
  });
});

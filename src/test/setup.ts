import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js font optimization
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
    variable: '--font-inter',
    style: { fontFamily: 'Inter, sans-serif' },
  }),
}));

// Mock web-vitals for performance monitoring
vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
  onINP: vi.fn(),
}));

// Mock next/dynamic to load components synchronously in tests
// This ensures dynamic imports work properly in test environment
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (fn: any) => {
    // For tests, we want to load components synchronously
    // Extract the actual component from the promise
    let Component: any;
    fn().then((mod: any) => {
      Component = mod;
    });
    
    // Return a wrapper that renders the component synchronously
    const DynamicComponent = (props: any) => {
      if (!Component) {
        // Force synchronous resolution for tests
        throw fn();
      }
      return Component(props);
    };
    
    DynamicComponent.displayName = 'DynamicComponent';
    return DynamicComponent;
  },
}));

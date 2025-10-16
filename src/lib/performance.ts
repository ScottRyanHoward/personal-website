/**
 * Performance monitoring utilities for tracking Core Web Vitals
 * and other performance metrics
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

/**
 * Report Web Vitals to analytics or console
 */
export function reportWebVitals(metric: PerformanceMetric): void {
  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics, Vercel Analytics, etc.
    // gtag('event', metric.name, {
    //   value: Math.round(metric.value),
    //   metric_rating: metric.rating,
    // });
  } else {
    // In development, log to console
    console.log('Web Vital:', metric);
  }
}

/**
 * Get performance rating based on thresholds
 */
export function getPerformanceRating(
  metricName: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, { good: number; poor: number }> = {
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  };

  const threshold = thresholds[metricName];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Measure component render time
 */
export function measureComponentRender(
  componentName: string,
  callback: () => void
): void {
  if (typeof window === 'undefined') return;

  const startTime = performance.now();
  callback();
  const endTime = performance.now();
  const duration = endTime - startTime;

  if (process.env.NODE_ENV === 'development') {
    console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
  }
}

/**
 * Check if browser supports Performance Observer
 */
export function supportsPerformanceObserver(): boolean {
  return (
    typeof window !== 'undefined' &&
    'PerformanceObserver' in window &&
    'PerformanceEntry' in window
  );
}

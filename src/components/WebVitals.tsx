'use client';

import { useEffect } from 'react';
import { reportWebVitals, getPerformanceRating } from '@/lib/performance';
import type { PerformanceMetric } from '@/lib/performance';

/**
 * Web Vitals reporting component
 * Tracks and reports Core Web Vitals metrics
 */
export default function WebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Import web-vitals dynamically to reduce initial bundle size
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS((metric) => {
        const performanceMetric: PerformanceMetric = {
          name: 'CLS',
          value: metric.value,
          rating: getPerformanceRating('CLS', metric.value),
          delta: metric.delta,
        };
        reportWebVitals(performanceMetric);
      });

      onFCP((metric) => {
        const performanceMetric: PerformanceMetric = {
          name: 'FCP',
          value: metric.value,
          rating: getPerformanceRating('FCP', metric.value),
          delta: metric.delta,
        };
        reportWebVitals(performanceMetric);
      });

      onLCP((metric) => {
        const performanceMetric: PerformanceMetric = {
          name: 'LCP',
          value: metric.value,
          rating: getPerformanceRating('LCP', metric.value),
          delta: metric.delta,
        };
        reportWebVitals(performanceMetric);
      });

      onTTFB((metric) => {
        const performanceMetric: PerformanceMetric = {
          name: 'TTFB',
          value: metric.value,
          rating: getPerformanceRating('TTFB', metric.value),
          delta: metric.delta,
        };
        reportWebVitals(performanceMetric);
      });

      onINP((metric) => {
        const performanceMetric: PerformanceMetric = {
          name: 'INP',
          value: metric.value,
          rating: getPerformanceRating('INP', metric.value),
          delta: metric.delta,
        };
        reportWebVitals(performanceMetric);
      });
    });
  }, []);

  return null;
}

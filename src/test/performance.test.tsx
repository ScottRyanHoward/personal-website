/**
 * Performance Optimization Tests
 * 
 * These tests verify that performance optimizations are properly configured
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Performance Optimizations', () => {
  describe('Next.js Configuration', () => {
    it('should have compression enabled', () => {
      const configPath = join(process.cwd(), 'next.config.js');
      const config = readFileSync(configPath, 'utf-8');
      
      expect(config).toContain('compress: true');
    });

    it('should have SWC minification enabled', () => {
      const configPath = join(process.cwd(), 'next.config.js');
      const config = readFileSync(configPath, 'utf-8');
      
      expect(config).toContain('swcMinify: true');
    });

    it('should have caching headers configured', () => {
      const configPath = join(process.cwd(), 'next.config.js');
      const config = readFileSync(configPath, 'utf-8');
      
      expect(config).toContain('async headers()');
      expect(config).toContain('Cache-Control');
      expect(config).toContain('max-age=31536000');
    });

    it('should remove console statements in production', () => {
      const configPath = join(process.cwd(), 'next.config.js');
      const config = readFileSync(configPath, 'utf-8');
      
      expect(config).toContain('removeConsole');
    });

    it('should have bundle analyzer configured', () => {
      const configPath = join(process.cwd(), 'next.config.js');
      const config = readFileSync(configPath, 'utf-8');
      
      expect(config).toContain('withBundleAnalyzer');
    });

    it('should have image optimization configured', () => {
      const configPath = join(process.cwd(), 'next.config.js');
      const config = readFileSync(configPath, 'utf-8');
      
      expect(config).toContain('images:');
      expect(config).toContain('formats');
      expect(config).toContain('avif');
      expect(config).toContain('webp');
    });
  });

  describe('Font Optimization', () => {
    it('should use Next.js font optimization', () => {
      const layoutPath = join(process.cwd(), 'src/app/layout.tsx');
      const layout = readFileSync(layoutPath, 'utf-8');
      
      expect(layout).toContain("from 'next/font/google'");
      expect(layout).toContain('Inter');
    });

    it('should have font-display: swap configured', () => {
      const layoutPath = join(process.cwd(), 'src/app/layout.tsx');
      const layout = readFileSync(layoutPath, 'utf-8');
      
      expect(layout).toContain("display: 'swap'");
    });

    it('should preload fonts', () => {
      const layoutPath = join(process.cwd(), 'src/app/layout.tsx');
      const layout = readFileSync(layoutPath, 'utf-8');
      
      expect(layout).toContain('preload: true');
    });
  });

  describe('Code Splitting', () => {
    it('should use dynamic imports for below-the-fold sections', () => {
      const pagePath = join(process.cwd(), 'src/app/page.tsx');
      const page = readFileSync(pagePath, 'utf-8');
      
      expect(page).toContain("import dynamic from 'next/dynamic'");
      expect(page).toContain('dynamic(() => import');
    });

    it('should have loading states for dynamic components', () => {
      const pagePath = join(process.cwd(), 'src/app/page.tsx');
      const page = readFileSync(pagePath, 'utf-8');
      
      expect(page).toContain('loading:');
      expect(page).toContain('animate-pulse');
    });

    it('should lazy load Experience section', () => {
      const pagePath = join(process.cwd(), 'src/app/page.tsx');
      const page = readFileSync(pagePath, 'utf-8');
      
      expect(page).toContain("import('@/components/sections/Experience')");
    });

    it('should lazy load Skills section', () => {
      const pagePath = join(process.cwd(), 'src/app/page.tsx');
      const page = readFileSync(pagePath, 'utf-8');
      
      expect(page).toContain("import('@/components/sections/Skills')");
    });

    it('should lazy load WorkProjects section', () => {
      const pagePath = join(process.cwd(), 'src/app/page.tsx');
      const page = readFileSync(pagePath, 'utf-8');
      
      expect(page).toContain("import('@/components/sections/WorkProjects')");
    });

    it('should lazy load PersonalProjects section', () => {
      const pagePath = join(process.cwd(), 'src/app/page.tsx');
      const page = readFileSync(pagePath, 'utf-8');
      
      expect(page).toContain("import('@/components/sections/PersonalProjects')");
    });

    it('should lazy load Education section', () => {
      const pagePath = join(process.cwd(), 'src/app/page.tsx');
      const page = readFileSync(pagePath, 'utf-8');
      
      expect(page).toContain("import('@/components/sections/Education')");
    });

    it('should lazy load Contact section', () => {
      const pagePath = join(process.cwd(), 'src/app/page.tsx');
      const page = readFileSync(pagePath, 'utf-8');
      
      expect(page).toContain("import('@/components/sections/Contact')");
    });
  });

  describe('Web Vitals Monitoring', () => {
    it('should have Web Vitals component', () => {
      const webVitalsPath = join(process.cwd(), 'src/components/WebVitals.tsx');
      const webVitals = readFileSync(webVitalsPath, 'utf-8');
      
      expect(webVitals).toContain('web-vitals');
      expect(webVitals).toContain('onCLS');
      expect(webVitals).toContain('onFCP');
      expect(webVitals).toContain('onLCP');
      expect(webVitals).toContain('onTTFB');
      expect(webVitals).toContain('onINP');
    });

    it('should have performance utilities', () => {
      const perfPath = join(process.cwd(), 'src/lib/performance.ts');
      const perf = readFileSync(perfPath, 'utf-8');
      
      expect(perf).toContain('reportWebVitals');
      expect(perf).toContain('getPerformanceRating');
    });

    it('should include WebVitals in layout', () => {
      const layoutPath = join(process.cwd(), 'src/app/layout.tsx');
      const layout = readFileSync(layoutPath, 'utf-8');
      
      expect(layout).toContain('WebVitals');
    });
  });

  describe('Package Configuration', () => {
    it('should have analyze script', () => {
      const packagePath = join(process.cwd(), 'package.json');
      const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));
      
      expect(pkg.scripts).toHaveProperty('analyze');
      expect(pkg.scripts.analyze).toContain('ANALYZE=true');
    });

    it('should have lighthouse script', () => {
      const packagePath = join(process.cwd(), 'package.json');
      const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));
      
      expect(pkg.scripts).toHaveProperty('lighthouse');
      expect(pkg.scripts.lighthouse).toContain('lighthouse');
    });

    it('should have web-vitals dependency', () => {
      const packagePath = join(process.cwd(), 'package.json');
      const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));
      
      expect(pkg.dependencies).toHaveProperty('web-vitals');
    });

    it('should have bundle analyzer dev dependency', () => {
      const packagePath = join(process.cwd(), 'package.json');
      const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));
      
      expect(pkg.devDependencies).toHaveProperty('@next/bundle-analyzer');
    });
  });

  describe('Documentation', () => {
    it('should have performance documentation', () => {
      const perfDocPath = join(process.cwd(), 'PERFORMANCE.md');
      const perfDoc = readFileSync(perfDocPath, 'utf-8');
      
      expect(perfDoc).toContain('Performance Optimization');
      expect(perfDoc).toContain('Code Splitting');
      expect(perfDoc).toContain('Font Optimization');
      expect(perfDoc).toContain('Caching Headers');
      expect(perfDoc).toContain('Web Vitals');
    });
  });
});

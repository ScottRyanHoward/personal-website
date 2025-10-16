import { describe, it, expect } from 'vitest';
import { metadata } from './layout';
import profileData from '@/data/profile.json';

describe('SEO Metadata', () => {
  it('has proper title configuration', () => {
    expect(metadata.title).toBeDefined();
    if (typeof metadata.title === 'object' && metadata.title !== null) {
      expect(metadata.title.default).toBe(`${profileData.name} - ${profileData.title}`);
      expect(metadata.title.template).toBe(`%s | ${profileData.name}`);
    }
  });

  it('has proper description', () => {
    expect(metadata.description).toBe(profileData.summary);
  });

  it('has relevant keywords', () => {
    expect(metadata.keywords).toBeDefined();
    expect(Array.isArray(metadata.keywords)).toBe(true);
    if (Array.isArray(metadata.keywords)) {
      expect(metadata.keywords).toContain('Software Engineer');
      expect(metadata.keywords).toContain('React');
      expect(metadata.keywords).toContain('TypeScript');
      expect(metadata.keywords).toContain(profileData.name);
    }
  });

  it('has proper author information', () => {
    expect(metadata.authors).toBeDefined();
    if (Array.isArray(metadata.authors)) {
      expect(metadata.authors[0]).toEqual({ name: profileData.name });
    }
  });

  it('has creator and publisher set', () => {
    expect(metadata.creator).toBe(profileData.name);
    expect(metadata.publisher).toBe(profileData.name);
  });

  it('has proper Open Graph configuration', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.type).toBe('website');
    expect(metadata.openGraph?.locale).toBe('en_US');
    expect(metadata.openGraph?.siteName).toBe(profileData.name);
    expect(metadata.openGraph?.title).toBe(`${profileData.name} - ${profileData.title}`);
    expect(metadata.openGraph?.description).toBe(profileData.summary);
  });

  it('has Open Graph images configured', () => {
    expect(metadata.openGraph?.images).toBeDefined();
    if (Array.isArray(metadata.openGraph?.images)) {
      const image = metadata.openGraph.images[0];
      if (typeof image === 'object' && image !== null) {
        expect(image.width).toBe(1200);
        expect(image.height).toBe(630);
        expect(image.alt).toContain(profileData.name);
      }
    }
  });

  it('has proper Twitter card configuration', () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter?.card).toBe('summary_large_image');
    expect(metadata.twitter?.title).toBe(`${profileData.name} - ${profileData.title}`);
    expect(metadata.twitter?.description).toBe(profileData.summary);
    expect(metadata.twitter?.creator).toBeDefined();
  });

  it('has proper robots configuration', () => {
    expect(metadata.robots).toBeDefined();
    if (typeof metadata.robots === 'object' && metadata.robots !== null) {
      expect(metadata.robots.index).toBe(true);
      expect(metadata.robots.follow).toBe(true);
    }
  });

  it('has Google Bot configuration', () => {
    expect(metadata.robots).toBeDefined();
    if (typeof metadata.robots === 'object' && metadata.robots !== null && 'googleBot' in metadata.robots) {
      expect(metadata.robots.googleBot).toBeDefined();
      if (typeof metadata.robots.googleBot === 'object' && metadata.robots.googleBot !== null) {
        expect(metadata.robots.googleBot.index).toBe(true);
        expect(metadata.robots.googleBot.follow).toBe(true);
      }
    }
  });

  it('has metadataBase configured', () => {
    expect(metadata.metadataBase).toBeDefined();
    expect(metadata.metadataBase).toBeInstanceOf(URL);
  });
});

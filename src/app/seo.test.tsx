import { describe, it, expect } from 'vitest';
import { metadata } from './layout';
import profileData from '@/data/profile.json';

describe('SEO Metadata', () => {
  it('has proper title configuration', () => {
    expect(metadata.title).toEqual({
      default: `${profileData.name} - ${profileData.title}`,
      template: `%s | ${profileData.name}`,
    });
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
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      locale: 'en_US',
      siteName: profileData.name,
      title: `${profileData.name} - ${profileData.title}`,
      description: profileData.summary,
    });
  });

  it('has Open Graph images configured', () => {
    expect(metadata.openGraph).toMatchObject({
      images: [
        {
          width: 1200,
          height: 630,
          alt: expect.stringContaining(profileData.name),
        },
      ],
    });
  });

  it('has proper Twitter card configuration', () => {
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: `${profileData.name} - ${profileData.title}`,
      description: profileData.summary,
      creator: expect.any(String),
    });
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

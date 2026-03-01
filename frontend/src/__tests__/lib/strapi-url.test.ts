import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getStrapiUrl, getStrapiMediaUrl } from '@/lib/strapi-url';

describe('getStrapiUrl', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns NEXT_PUBLIC_STRAPI_URL when set (browser context)', () => {
    vi.stubEnv('NEXT_PUBLIC_STRAPI_URL', 'http://public.strapi:1337');
    // In jsdom, typeof window !== 'undefined' so STRAPI_INTERNAL_URL is skipped
    expect(getStrapiUrl()).toBe('http://public.strapi:1337');
  });

  it('falls back to localhost when no env vars are set', () => {
    delete process.env.STRAPI_INTERNAL_URL;
    delete process.env.NEXT_PUBLIC_STRAPI_URL;
    expect(getStrapiUrl()).toBe('http://localhost:1337');
  });
});

describe('getStrapiMediaUrl', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('prepends Strapi URL to relative paths', () => {
    vi.stubEnv('NEXT_PUBLIC_STRAPI_URL', 'http://cms.test');
    expect(getStrapiMediaUrl('/uploads/image.jpg')).toBe('http://cms.test/uploads/image.jpg');
  });

  it('returns absolute URLs as-is', () => {
    expect(getStrapiMediaUrl('https://cdn.example.com/image.jpg')).toBe('https://cdn.example.com/image.jpg');
  });

  it('handles http absolute URLs as-is', () => {
    expect(getStrapiMediaUrl('http://other.com/file.png')).toBe('http://other.com/file.png');
  });
});

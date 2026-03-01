import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  strapiRequest,
  getHomePage,
  getAboutPage,
  getBioSections,
  getAwards,
  getVideoPage,
  getVideoThemes,
  getEventsPage,
  getEvents,
  getResearchPage,
  getSiteConfig,
  getBooks,
  getTopicsWithCounts,
} from '@/lib/strapi';

// Mock getStrapiUrl
vi.mock('@/lib/strapi-url', () => ({
  getStrapiUrl: () => 'http://test-strapi:1337',
  getStrapiMediaUrl: (path: string) => `http://test-strapi:1337${path}`,
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe('strapiRequest', () => {
  it('makes a GET request with query params', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: { id: 1 } }),
    });

    const result = await strapiRequest({ endpoint: 'test', query: { populate: '*' } });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('http://test-strapi:1337/api/test');
    expect(url).toContain('populate');
    expect(options.method).toBe('GET');
    expect(result).toEqual({ data: { id: 1 } });
  });

  it('adds locale to query params', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: {} }),
    });

    await strapiRequest({ endpoint: 'test', locale: 'it' });

    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('locale=it');
  });

  it('makes a POST request with body', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: { created: true } }),
    });

    await strapiRequest({
      endpoint: 'test',
      method: 'POST',
      body: { name: 'test' },
    });

    const [, options] = mockFetch.mock.calls[0];
    expect(options.method).toBe('POST');
    expect(options.body).toBe('{"name":"test"}');
  });

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(strapiRequest({ endpoint: 'missing' })).rejects.toThrow(
      'Strapi request failed: 404 Not Found'
    );
  });

  it('sets Content-Type header on all requests', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: {} }),
    });

    await strapiRequest({ endpoint: 'test' });

    const [, options] = mockFetch.mock.calls[0];
    expect(options.headers['Content-Type']).toBe('application/json');
  });

  it('sets revalidate in fetch options', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: {} }),
    });

    await strapiRequest({ endpoint: 'test' });

    const [, options] = mockFetch.mock.calls[0];
    expect(options.next).toEqual({ revalidate: 60 });
  });

  it('builds URL without query string when no params', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: {} }),
    });

    await strapiRequest({ endpoint: 'test' });

    const [url] = mockFetch.mock.calls[0];
    expect(url).toBe('http://test-strapi:1337/api/test');
  });
});

describe('fetch helpers', () => {
  beforeEach(() => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: {} }),
    });
  });

  it('getHomePage calls correct endpoint with locale', async () => {
    await getHomePage('en');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/home-page');
    expect(url).toContain('locale=en');
  });

  it('getAboutPage calls correct endpoint', async () => {
    await getAboutPage('it');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/about-page');
  });

  it('getBioSections calls correct endpoint with sort', async () => {
    await getBioSections('it');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/bio-sections');
    expect(url).toContain('sort=sortOrder');
  });

  it('getAwards calls correct endpoint', async () => {
    await getAwards();
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/awards');
  });

  it('getVideoPage calls correct endpoint', async () => {
    await getVideoPage('de');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/video-page');
  });

  it('getVideoThemes calls correct endpoint', async () => {
    await getVideoThemes('es');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/video-themes');
  });

  it('getEventsPage calls correct endpoint', async () => {
    await getEventsPage('it');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/events-page');
  });

  it('getEvents calls correct endpoint', async () => {
    await getEvents('it');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/events');
  });

  it('getResearchPage calls correct endpoint', async () => {
    await getResearchPage('it');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/research-page');
  });

  it('getSiteConfig calls correct endpoint with socialLinks populate', async () => {
    await getSiteConfig('en');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/site-config');
  });

  it('getBooks calls correct endpoint with cover populate', async () => {
    await getBooks('it');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/books');
  });

  it('getTopicsWithCounts calls correct endpoint', async () => {
    await getTopicsWithCounts('it');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('/api/votes/topics-with-counts');
    expect(url).toContain('locale=it');
  });

  it('getTopicsWithCounts includes userEmail when provided', async () => {
    await getTopicsWithCounts('it', 'user@test.com');
    const [url] = mockFetch.mock.calls[0];
    expect(url).toContain('userEmail=user%40test.com');
  });
});

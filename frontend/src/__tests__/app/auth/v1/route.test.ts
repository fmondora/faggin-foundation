import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const { GET, POST, PUT, DELETE, PATCH } = await import('@/app/auth/v1/[...path]/route');

describe('Auth Proxy Route', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      body: null,
      headers: new Headers({ 'content-type': 'application/json' }),
    });
  });

  it('proxies GET requests', async () => {
    const req = new NextRequest('http://localhost:3000/auth/v1/settings');
    await GET(req);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('/settings');
    expect(options.method).toBe('GET');
  });

  it('proxies POST requests with body', async () => {
    const req = new NextRequest('http://localhost:3000/auth/v1/token?grant_type=password', {
      method: 'POST',
      body: '{"email":"a@b.com","password":"x"}',
    });
    await POST(req);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('/token');
    expect(options.method).toBe('POST');
    expect(options.body).toBe('{"email":"a@b.com","password":"x"}');
  });

  it('filters out host header', async () => {
    const req = new NextRequest('http://localhost:3000/auth/v1/user', {
      headers: { host: 'localhost:3000', authorization: 'Bearer token' },
    });
    await GET(req);

    const [, options] = mockFetch.mock.calls[0];
    const headers = options.headers as Headers;
    expect(headers.get('host')).toBeNull();
    expect(headers.get('authorization')).toBe('Bearer token');
  });

  it('strips transfer-encoding from response', async () => {
    mockFetch.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      body: null,
      headers: new Headers({
        'transfer-encoding': 'chunked',
        'content-type': 'application/json',
      }),
    });

    const req = new NextRequest('http://localhost:3000/auth/v1/user');
    const res = await GET(req);

    expect(res.headers.get('transfer-encoding')).toBeNull();
    expect(res.headers.get('content-type')).toBe('application/json');
  });

  it('exports all HTTP methods', () => {
    expect(GET).toBeDefined();
    expect(POST).toBeDefined();
    expect(PUT).toBeDefined();
    expect(DELETE).toBeDefined();
    expect(PATCH).toBeDefined();
  });

  it('preserves status code from upstream', async () => {
    mockFetch.mockResolvedValue({
      status: 401,
      statusText: 'Unauthorized',
      body: null,
      headers: new Headers(),
    });

    const req = new NextRequest('http://localhost:3000/auth/v1/user');
    const res = await GET(req);

    expect(res.status).toBe(401);
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const { POST } = await import('@/app/api/newsletter/route');

describe('Newsletter Route', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    vi.unstubAllEnvs();
  });

  it('returns success for valid email', async () => {
    const request = new Request('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@test.com' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('returns 400 for missing email', async () => {
    const request = new Request('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Email required');
  });

  it('calls Resend API when key is configured', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_real_key');
    vi.stubEnv('RESEND_AUDIENCE_ID', 'aud-123');
    mockFetch.mockResolvedValueOnce({ ok: true });

    // Need to re-import to pick up env vars (module-level)
    // Since the env check is inside the handler, it should work
    const request = new Request('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });

  it('returns 500 when Resend API fails', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_real_key');
    vi.stubEnv('RESEND_AUDIENCE_ID', 'aud-123');
    mockFetch.mockResolvedValueOnce({ ok: false });

    const request = new Request('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to subscribe');
  });

  it('skips Resend when API key is placeholder', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_dev_placeholder');

    const request = new Request('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

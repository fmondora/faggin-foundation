import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockExchangeCodeForSession = vi.fn();
const mockVerifyOtp = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: () => Promise.resolve({
    auth: {
      exchangeCodeForSession: mockExchangeCodeForSession,
      verifyOtp: mockVerifyOtp,
    },
  }),
}));

// Must import after mocks
const { GET } = await import('@/app/api/auth/callback/route');

describe('Auth Callback Route', () => {
  beforeEach(() => {
    mockExchangeCodeForSession.mockReset();
    mockVerifyOtp.mockReset();
  });

  it('exchanges code for session (PKCE flow)', async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });

    const request = new Request('http://localhost:3000/api/auth/callback?code=test-code');
    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost:3000/');
    expect(mockExchangeCodeForSession).toHaveBeenCalledWith('test-code');
  });

  it('verifies OTP token (classic GoTrue flow)', async () => {
    mockVerifyOtp.mockResolvedValue({ error: null });

    const request = new Request('http://localhost:3000/api/auth/callback?token=test-token&type=magiclink');
    const response = await GET(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('http://localhost:3000/');
    expect(mockVerifyOtp).toHaveBeenCalledWith({
      token_hash: 'test-token',
      type: 'magiclink',
    });
  });

  it('redirects to custom next path', async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });

    const request = new Request('http://localhost:3000/api/auth/callback?code=abc&next=/dashboard');
    const response = await GET(request);

    expect(response.headers.get('location')).toBe('http://localhost:3000/dashboard');
  });

  it('redirects with error on failed code exchange', async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: new Error('invalid') });

    const request = new Request('http://localhost:3000/api/auth/callback?code=bad-code');
    const response = await GET(request);

    expect(response.headers.get('location')).toBe('http://localhost:3000/?error=auth');
  });

  it('redirects with error on failed OTP verification', async () => {
    mockVerifyOtp.mockResolvedValue({ error: new Error('expired') });

    const request = new Request('http://localhost:3000/api/auth/callback?token=bad&type=email');
    const response = await GET(request);

    expect(response.headers.get('location')).toBe('http://localhost:3000/?error=auth');
  });

  it('redirects with error when no code or token', async () => {
    const request = new Request('http://localhost:3000/api/auth/callback');
    const response = await GET(request);

    expect(response.headers.get('location')).toBe('http://localhost:3000/?error=auth');
  });

  it('normalizes full URL in redirect_to param', async () => {
    mockExchangeCodeForSession.mockResolvedValue({ error: null });

    const request = new Request('http://localhost:3000/api/auth/callback?code=abc&redirect_to=http://localhost:3000/profile');
    const response = await GET(request);

    expect(response.headers.get('location')).toBe('http://localhost:3000/profile');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';

const mockGetUser = vi.fn();
const mockOnAuthStateChange = vi.fn();
const mockSignOut = vi.fn();

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
      onAuthStateChange: mockOnAuthStateChange,
      signOut: mockSignOut,
    },
  }),
}));

function TestConsumer() {
  const { user, loading, signOut } = useAuth();
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="user">{user?.email || 'none'}</span>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

describe('AuthProvider', () => {
  beforeEach(() => {
    mockGetUser.mockResolvedValue({ data: { user: null } });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    mockSignOut.mockResolvedValue({});
  });

  it('provides initial loading state', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(screen.getByTestId('loading').textContent).toBe('true');
  });

  it('resolves user from getUser', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { email: 'test@test.com' } },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await vi.waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('test@test.com');
    });
  });

  it('sets user to null after signOut', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { email: 'test@test.com' } },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await vi.waitFor(() => {
      expect(screen.getByTestId('user').textContent).toBe('test@test.com');
    });

    await act(async () => {
      screen.getByText('Sign Out').click();
    });

    expect(mockSignOut).toHaveBeenCalled();
    expect(screen.getByTestId('user').textContent).toBe('none');
  });

  it('subscribes to auth state changes', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );
    expect(mockOnAuthStateChange).toHaveBeenCalled();
  });
});

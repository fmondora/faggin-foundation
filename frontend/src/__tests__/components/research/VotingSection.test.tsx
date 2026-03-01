import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import VotingSection from '@/components/research/VotingSection';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockUser = { email: 'test@test.com' };

vi.mock('@/components/auth/AuthProvider', () => ({
  useAuth: () => ({ user: mockUser }),
}));

vi.mock('@/lib/strapi-url', () => ({
  getStrapiUrl: () => 'http://test:1337',
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('VotingSection', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders title and subtitle', () => {
    mockFetch.mockResolvedValue({
      ok: false,
    });
    render(<VotingSection locale="it" />);
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('subtitle')).toBeInTheDocument();
  });

  it('renders fallback topics when fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('fail'));
    render(<VotingSection locale="it" />);

    await waitFor(() => {
      expect(screen.getByText('Coscienza e intelligenza artificiale')).toBeInTheDocument();
    });
  });

  it('fetches topics with locale and userEmail', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: [
          { documentId: 'a', title: 'API Topic', description: 'From API', voteCount: 3, userHasVoted: true },
        ],
      }),
    });

    render(<VotingSection locale="en" />);

    await waitFor(() => {
      expect(screen.getByText('API Topic')).toBeInTheDocument();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('locale=en')
    );
  });

  it('renders all 8 fallback topics', () => {
    mockFetch.mockResolvedValue({ ok: false });
    render(<VotingSection locale="it" />);
    // 8 fallback topics
    expect(screen.getAllByText(/votes$/).length).toBe(8);
  });
});

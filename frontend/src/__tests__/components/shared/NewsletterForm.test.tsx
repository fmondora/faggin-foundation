import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewsletterForm from '@/components/shared/NewsletterForm';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('NewsletterForm', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders form with email input and button', () => {
    render(<NewsletterForm />);
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
    expect(screen.getByText('button')).toBeInTheDocument();
  });

  it('shows success message on successful submit', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    render(<NewsletterForm />);

    fireEvent.change(screen.getByPlaceholderText('placeholder'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.submit(screen.getByText('button').closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('success')).toBeInTheDocument();
    });
  });

  it('shows error message on failed submit', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    render(<NewsletterForm />);

    fireEvent.change(screen.getByPlaceholderText('placeholder'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.submit(screen.getByText('button').closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('error')).toBeInTheDocument();
    });
  });

  it('shows error message on fetch exception', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    render(<NewsletterForm />);

    fireEvent.change(screen.getByPlaceholderText('placeholder'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.submit(screen.getByText('button').closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('error')).toBeInTheDocument();
    });
  });

  it('posts to /api/newsletter with email', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    render(<NewsletterForm />);

    fireEvent.change(screen.getByPlaceholderText('placeholder'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.submit(screen.getByText('button').closest('form')!);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/newsletter', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'user@example.com' }),
      }));
    });
  });
});

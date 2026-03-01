import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'it',
}));

vi.mock('@/lib/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...props}>{children}</a>,
}));

vi.mock('@/lib/strapi-url', () => ({
  getStrapiUrl: () => 'http://test:1337',
}));

vi.mock('@/components/shared/NewsletterForm', () => ({
  default: () => <div data-testid="newsletter-form">Newsletter</div>,
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Footer', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: { socialLinks: [] } }),
    });
  });

  it('renders foundation name', () => {
    render(<Footer />);
    expect(screen.getByText('Faggin Foundation')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('video')).toBeInTheDocument();
    expect(screen.getByText('events')).toBeInTheDocument();
    expect(screen.getByText('research')).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/rights/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });

  it('renders newsletter form', () => {
    render(<Footer />);
    expect(screen.getByTestId('newsletter-form')).toBeInTheDocument();
  });

  it('renders social links when fetched', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: {
          socialLinks: [
            { platform: 'youtube', url: 'https://youtube.com/test', label: 'YouTube' },
          ],
        },
      }),
    });

    render(<Footer />);

    await waitFor(() => {
      expect(screen.getByText('YouTube')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    mockFetch.mockRejectedValue(new Error('fail'));
    render(<Footer />);
    // Should still render without crashing
    expect(screen.getByText('Faggin Foundation')).toBeInTheDocument();
  });
});

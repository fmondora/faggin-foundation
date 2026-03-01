import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BooksGrid from '@/components/home/BooksGrid';
import type { Book } from '@/types/strapi';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock('@/lib/strapi-url', () => ({
  getStrapiMediaUrl: (path: string) => `http://cms.test${path}`,
}));

describe('BooksGrid', () => {
  it('renders fallback books when none provided', () => {
    render(<BooksGrid />);
    expect(screen.getByText('Silicio')).toBeInTheDocument();
    expect(screen.getByText('Irriducibile')).toBeInTheDocument();
    expect(screen.getByText("Oltre l'Invisibile")).toBeInTheDocument();
  });

  it('renders provided books', () => {
    const books: Book[] = [
      { documentId: '1', title: 'Custom Book', image: '/images/custom.jpg' },
    ];
    render(<BooksGrid books={books} />);
    expect(screen.getByText('Custom Book')).toBeInTheDocument();
  });

  it('renders book with Strapi cover image', () => {
    const books: Book[] = [
      { documentId: '1', title: 'With Cover', cover: { url: '/uploads/cover.jpg' } },
    ];
    render(<BooksGrid books={books} />);
    const img = screen.getByAltText('With Cover');
    expect(img).toHaveAttribute('src', 'http://cms.test/uploads/cover.jpg');
  });

  it('renders tagline when present', () => {
    const books: Book[] = [
      { documentId: '1', title: 'Book', tagline: 'A great book', image: '/img.jpg' },
    ];
    render(<BooksGrid books={books} />);
    expect(screen.getByText('A great book')).toBeInTheDocument();
  });

  it('renders video link button', () => {
    const books: Book[] = [
      { documentId: '1', title: 'Book', videoUrl: 'https://youtube.com/watch?v=abc', image: '/img.jpg' },
    ];
    render(<BooksGrid books={books} />);
    expect(screen.getByText('watchPresentation')).toBeInTheDocument();
  });

  it('uses fallback when empty array provided', () => {
    render(<BooksGrid books={[]} />);
    expect(screen.getByText('Silicio')).toBeInTheDocument();
  });

  it('renders custom button label when provided', () => {
    const books: Book[] = [
      { documentId: '1', title: 'Book', videoUrl: 'https://yt.com', buttonLabel: 'Watch Now', image: '/img.jpg' },
    ];
    render(<BooksGrid books={books} />);
    expect(screen.getByText('Watch Now')).toBeInTheDocument();
  });
});

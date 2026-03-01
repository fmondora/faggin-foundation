import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AwardsList from '@/components/about/AwardsList';
import type { Award } from '@/types/strapi';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('AwardsList', () => {
  it('renders fallback awards when none provided', () => {
    render(<AwardsList />);
    expect(screen.getByText('Cavaliere di Gran Croce')).toBeInTheDocument();
    expect(screen.getByText('National Medal of Technology and Innovation')).toBeInTheDocument();
  });

  it('renders the awards heading', () => {
    render(<AwardsList />);
    expect(screen.getByText('awards')).toBeInTheDocument();
  });

  it('renders provided awards', () => {
    const awards: Award[] = [
      { year: 2023, title: 'New Award', description: 'Given by X' },
    ];
    render(<AwardsList awards={awards} />);
    expect(screen.getByText('New Award')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('— Given by X')).toBeInTheDocument();
  });

  it('hides description when not provided', () => {
    const awards: Award[] = [
      { year: 2023, title: 'Simple Award' },
    ];
    render(<AwardsList awards={awards} />);
    expect(screen.getByText('Simple Award')).toBeInTheDocument();
    expect(screen.queryByText(/—/)).not.toBeInTheDocument();
  });

  it('uses fallback when empty array provided', () => {
    render(<AwardsList awards={[]} />);
    expect(screen.getByText('Cavaliere di Gran Croce')).toBeInTheDocument();
  });
});

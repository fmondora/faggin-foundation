import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PurposeSection from '@/components/home/PurposeSection';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('PurposeSection', () => {
  it('renders with fallback content when no data', () => {
    render(<PurposeSection />);
    expect(screen.getByText('purposeTitle')).toBeInTheDocument();
    expect(screen.getByText(/Faggin Foundation/)).toBeInTheDocument();
  });

  it('renders with provided data', () => {
    render(<PurposeSection data={{ purposeTitle: 'Custom Title', purposeText: 'Custom Text' }} />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });

  it('uses translation key for title when no data title', () => {
    render(<PurposeSection data={{ purposeText: 'Some text' }} />);
    expect(screen.getByText('purposeTitle')).toBeInTheDocument();
    expect(screen.getByText('Some text')).toBeInTheDocument();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const mockReplace = vi.fn();

vi.mock('next-intl', () => ({
  useLocale: () => 'it',
}));

vi.mock('@/lib/i18n/navigation', () => ({
  usePathname: () => '/about',
  useRouter: () => ({ replace: mockReplace }),
}));

vi.mock('@/lib/i18n/config', () => ({
  locales: ['it', 'en', 'de', 'es'],
}));

describe('LanguageSwitcher', () => {
  it('renders all 4 language buttons', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('IT')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('DE')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });

  it('calls router.replace on language click', () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByText('EN'));
    expect(mockReplace).toHaveBeenCalledWith('/about', { locale: 'en' });
  });

  it('calls router.replace with correct locale for DE', () => {
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByText('DE'));
    expect(mockReplace).toHaveBeenCalledWith('/about', { locale: 'de' });
  });
});

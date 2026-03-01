import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/layout/Header';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'it',
}));

vi.mock('@/lib/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...props}>{children}</a>,
  usePathname: () => '/',
  useRouter: () => ({ replace: vi.fn() }),
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock('@/lib/i18n/config', () => ({
  locales: ['it', 'en', 'de', 'es'],
}));

const mockSignOut = vi.fn();
vi.mock('@/components/auth/AuthProvider', () => ({
  useAuth: () => ({ user: null, signOut: mockSignOut }),
}));

vi.mock('@/components/auth/LoginModal', () => ({
  default: ({ onClose }: { onClose: () => void }) => <div data-testid="login-modal"><button onClick={onClose}>Close</button></div>,
}));

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />);
    expect(screen.getByAltText('Faggin Foundation')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Header />);
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('video')).toBeInTheDocument();
    expect(screen.getByText('events')).toBeInTheDocument();
    expect(screen.getByText('research')).toBeInTheDocument();
  });

  it('shows signup button when not logged in', () => {
    render(<Header />);
    expect(screen.getByText('signup')).toBeInTheDocument();
  });

  it('opens login modal on signup click', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('signup'));
    expect(screen.getByTestId('login-modal')).toBeInTheDocument();
  });
});

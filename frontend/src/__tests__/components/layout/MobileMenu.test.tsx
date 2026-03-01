import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenu from '@/components/layout/MobileMenu';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/lib/i18n/navigation', () => ({
  Link: ({ children, href, onClick, ...props }: { children: React.ReactNode; href: string; onClick?: () => void; [key: string]: unknown }) => <a href={href} onClick={onClick} {...props}>{children}</a>,
  usePathname: () => '/',
}));

vi.mock('@/components/auth/AuthProvider', () => ({
  useAuth: () => ({ user: null, signOut: vi.fn() }),
}));

const navItems = [
  { href: '/' as const, label: 'Home' },
  { href: '/about' as const, label: 'About' },
];

describe('MobileMenu', () => {
  it('returns null when not open', () => {
    const { container } = render(
      <MobileMenu open={false} onClose={vi.fn()} navItems={navItems} onLoginClick={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders navigation items when open', () => {
    render(
      <MobileMenu open={true} onClose={vi.fn()} navItems={navItems} onLoginClick={vi.fn()} />
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(
      <MobileMenu open={true} onClose={onClose} navItems={navItems} onLoginClick={vi.fn()} />
    );
    const closeBtn = screen.getByLabelText('Close');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn();
    render(
      <MobileMenu open={true} onClose={onClose} navItems={navItems} onLoginClick={vi.fn()} />
    );
    // Backdrop is the first child div
    const backdrop = screen.getByText('Home').closest('.fixed')?.querySelector('.bg-black\\/50') as HTMLElement;
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('shows login button when not authenticated', () => {
    render(
      <MobileMenu open={true} onClose={vi.fn()} navItems={navItems} onLoginClick={vi.fn()} />
    );
    expect(screen.getByText('signup')).toBeInTheDocument();
  });

  it('calls onLoginClick when login button clicked', () => {
    const onLoginClick = vi.fn();
    render(
      <MobileMenu open={true} onClose={vi.fn()} navItems={navItems} onLoginClick={onLoginClick} />
    );
    fireEvent.click(screen.getByText('signup'));
    expect(onLoginClick).toHaveBeenCalled();
  });
});

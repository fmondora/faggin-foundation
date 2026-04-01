'use client';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/components/auth/AuthProvider';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: { href: any; label: string }[];
  onLoginClick: () => void;
}

export default function MobileMenu({ open, onClose, navItems, onLoginClick }: MobileMenuProps) {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const { user, signOut } = useAuth();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-64 bg-nav-bg text-white p-6">
        <button onClick={onClose} className="absolute top-4 right-4" aria-label="Close">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="mt-12 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose} className={`text-lg ${pathname === item.href ? 'font-bold' : 'text-white/80'}`}>
              {item.label}
            </Link>
          ))}
          <hr className="border-white/20 my-2" />
          {user ? (
            <button onClick={() => { signOut(); onClose(); }} className="text-left text-lg text-white/80">
              {t('logout')}
            </button>
          ) : (
            <button onClick={onLoginClick} className="text-left text-lg text-white/80">{t('signup')}</button>
          )}
        </nav>
      </div>
    </div>
  );
}

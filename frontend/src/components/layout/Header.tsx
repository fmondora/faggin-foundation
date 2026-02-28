'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import LoginModal from '@/components/auth/LoginModal';
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/' as const, label: t('home') },
    { href: '/about' as const, label: t('about') },
    { href: '/video-serie' as const, label: t('video') },
    { href: '/eventi' as const, label: t('events') },
    { href: '/ricerca-e-sviluppo' as const, label: t('research') },
  ];

  return (
    <>
      <header className="bg-nav-bg text-white sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.svg" alt="Faggin Foundation" width={40} height={40} />
            <span className="font-heading text-lg font-bold hidden sm:block">Faggin Foundation</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`text-sm hover:text-white/80 transition-colors ${pathname === item.href ? 'border-b-2 border-white pb-0.5' : 'text-white/90'}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {user ? (
              <span className="text-sm text-white/90">{t('account')}</span>
            ) : (
              <button onClick={() => setShowLogin(true)} className="bg-white/20 hover:bg-white/30 text-white text-sm px-4 py-1.5 rounded transition-colors">
                {t('signup')}
              </button>
            )}
            <button className="md:hidden p-2" onClick={() => setMobileOpen(true)} aria-label="Menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} navItems={navItems} onLoginClick={() => { setMobileOpen(false); setShowLogin(true); }} />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

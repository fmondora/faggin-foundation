'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { getStrapiUrl } from '@/lib/strapi-url';
import NewsletterForm from '@/components/shared/NewsletterForm';
import type { SocialLink } from '@/types/strapi';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const locale = useLocale();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetch(`${getStrapiUrl()}/api/site-config?locale=${locale}&populate[socialLinks]=true`)
      .then((res) => res.ok ? res.json() : null)
      .then((json) => {
        const links = json?.data?.socialLinks;
        if (Array.isArray(links)) setSocialLinks(links);
      })
      .catch(() => {});
  }, [locale]);

  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-lg font-bold mb-3">Faggin Foundation</h3>
            <p className="text-white/70 text-sm">{t('description')}</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">{t('pages')}</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white">{nav('home')}</Link></li>
              <li><Link href="/about" className="hover:text-white">{nav('about')}</Link></li>
              <li><Link href="/video-serie" className="hover:text-white">{nav('video')}</Link></li>
              <li><Link href="/eventi" className="hover:text-white">{nav('events')}</Link></li>
              <li><Link href="/ricerca-e-sviluppo" className="hover:text-white">{nav('research')}</Link></li>
            </ul>
          </div>
          <div>
            {socialLinks.length > 0 && (
              <>
                <h4 className="font-bold mb-3">{t('follow')}</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  {socialLinks.map((link) => (
                    <li key={link.url}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div>
            <NewsletterForm />
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} Faggin Foundation. {t('rights')}
        </div>
      </div>
    </footer>
  );
}

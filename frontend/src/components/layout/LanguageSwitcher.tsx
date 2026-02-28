'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales } from '@/lib/i18n/config';

const localeLabels: Record<string, string> = { it: 'IT', en: 'EN', de: 'DE', es: 'ES' };

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1">
      {locales.map((loc) => (
        <button key={loc} onClick={() => router.replace(pathname, { locale: loc })} className={`text-xs px-1.5 py-0.5 rounded transition-colors ${locale === loc ? 'bg-white text-nav-bg font-bold' : 'text-white/70 hover:text-white'}`}>
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import NewsletterForm from '@/components/shared/NewsletterForm';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
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

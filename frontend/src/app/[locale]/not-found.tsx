import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-6xl font-bold text-dark mb-4">{t('title')}</h1>
        <p className="text-text-light text-lg">{t('message')}</p>
      </div>
    </div>
  );
}

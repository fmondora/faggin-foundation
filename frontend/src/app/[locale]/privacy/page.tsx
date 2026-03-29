import { getTranslations } from 'next-intl/server';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return (
    <section className="py-16 px-4">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-heading text-4xl font-bold text-white mb-6">{t('title')}</h1>
      </div>
    </section>
  );
}

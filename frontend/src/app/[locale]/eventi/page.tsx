import { getTranslations } from 'next-intl/server';

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'events' });

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      <section className="py-16 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold mb-6">{t('upcoming')}</h1>
          <p className="text-white/70 text-lg mb-12">{t('subtitle')}</p>
          <p className="text-white/50">{t('noUpcoming')}</p>
        </div>
      </section>
    </div>
  );
}

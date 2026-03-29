import { getTranslations } from 'next-intl/server';

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutUs' });

  return (
    <section className="py-16 px-4">
      <div className="max-w-[800px] mx-auto text-center">
        <h1 className="font-heading text-4xl font-bold text-white mb-6">{t('title')}</h1>
        <p className="text-white/70 text-lg">{t('subtitle')}</p>
      </div>
    </section>
  );
}

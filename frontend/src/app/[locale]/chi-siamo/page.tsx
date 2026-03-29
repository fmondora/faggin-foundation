import { getTranslations } from 'next-intl/server';

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutUs' });

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold mb-6">{t('title')}</h1>
          <p className="text-white/70 text-lg">{t('subtitle')}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-white/[0.03]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6">{t('missionTitle')}</h2>
          <p className="text-white/70 leading-relaxed">{t('missionText')}</p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 px-4">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6">{t('visionTitle')}</h2>
          <p className="text-white/70 leading-relaxed">{t('visionText')}</p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 px-4 bg-white/[0.03]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6">{t('founderTitle')}</h2>
          <p className="text-white/70 leading-relaxed">{t('founderText')}</p>
        </div>
      </section>
    </div>
  );
}

import { getTranslations } from 'next-intl/server';

const YEARS = ['1941', '1965', '1968', '1971', '1974', '1986', '2010', '2011'] as const;
const AWARD_KEYS = ['medal', 'marconi', 'bellLabs', 'ieee'] as const;

export default async function BiographyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'biography' });

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold mb-6">{t('title')}</h1>
          <p className="text-white/70 text-lg mb-8">{t('subtitle')}</p>
          <p className="text-white/60 leading-relaxed">{t('intro')}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white/[0.03]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-10">{t('timelineTitle')}</h2>
          <div className="space-y-0">
            {YEARS.map((year) => (
              <div key={year} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-mono text-[#F5A623] font-bold">{year}</span>
                  <div className="w-px flex-1 bg-white/10 group-last:hidden mt-2" />
                </div>
                <div className="pb-8">
                  <p className="text-white/80">{t(`timeline.${year}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 px-4">
        <div className="max-w-[800px] mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-8">{t('awardsTitle')}</h2>
          <ul className="space-y-4">
            {AWARD_KEYS.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#F5A623]" />
                <span className="text-white/70">{t(`awards.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

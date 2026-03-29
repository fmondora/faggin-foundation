import { getTranslations } from 'next-intl/server';

const BOOKS = [
  { key: 'silicio', color: '#3498DB' },
  { key: 'irriducibile', color: '#9B59B6' },
  { key: 'oltre', color: '#F5A623' },
] as const;

export default async function PublicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'publications' });

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold mb-6">{t('title')}</h1>
          <p className="text-white/70 text-lg">{t('subtitle')}</p>
        </div>
      </section>

      {/* Books */}
      <section className="py-16 px-4 bg-white/[0.03]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-10">{t('booksTitle')}</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {BOOKS.map(({ key, color }) => (
              <div
                key={key}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 transition hover:bg-white/[0.06]"
              >
                <div className="h-1 w-12 rounded-full mb-4" style={{ backgroundColor: color }} />
                <h3 className="text-lg font-semibold mb-1">{t(`${key}Title`)}</h3>
                <p className="text-sm text-white/40 mb-3">{t(`${key}Year`)}</p>
                <p className="text-sm text-white/60 leading-relaxed">{t(`${key}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

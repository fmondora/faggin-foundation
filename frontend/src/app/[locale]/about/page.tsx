import BioTimeline from '@/components/about/BioTimeline';
import AwardsList from '@/components/about/AwardsList';
import { getAboutPage, getBioSections, getAwards } from '@/lib/strapi';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  let aboutData: any = null, bioSections: any = null, awards: any = null;
  try { [aboutData, bioSections, awards] = await Promise.all([getAboutPage(locale), getBioSections(locale), getAwards()]); } catch {}

  return (
    <>
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold text-dark mb-6">
            {aboutData?.data?.pageTitle || 'Le quattro vite di Federico Faggin'}
          </h1>
          <p className="text-lg text-text-light italic">
            {aboutData?.data?.introText || '"Sono rinato a una nuova vita ogni volta, osservando il mondo da prospettive inaspettate, la mia mente espansa a nuove comprensioni."'}
          </p>
        </div>
      </section>
      <BioTimeline sections={bioSections?.data} />
      <AwardsList awards={awards?.data} />
    </>
  );
}

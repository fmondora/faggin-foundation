import ResearchContent from '@/components/research/ResearchContent';
import VotingSection from '@/components/research/VotingSection';
import { getResearchPage } from '@/lib/strapi';

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  let researchData: any = null;
  try { researchData = await getResearchPage(locale); } catch {}
  return (
    <>
      <ResearchContent data={researchData?.data} />
      <VotingSection locale={locale} />
    </>
  );
}

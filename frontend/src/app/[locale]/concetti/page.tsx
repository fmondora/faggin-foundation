import ConceptsIndex from '@/components/concepts/ConceptsIndex';

export default async function ConceptsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <ConceptsIndex locale={locale} />;
}

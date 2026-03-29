import { getTranslations } from 'next-intl/server';
import ConceptDetail from '@/components/concepts/ConceptDetail';
import { EXTENDED_CONCEPTS } from '@/data/concepts-extended';

export function generateStaticParams() {
  return EXTENDED_CONCEPTS.map((concept) => ({
    slug: concept.documentId,
  }));
}

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'concepts' });

  return <ConceptDetail locale={locale} slug={slug} />;
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { EXTENDED_CONCEPTS, EXTENDED_CONNECTIONS } from '@/data/concepts-extended';
import type { ExtendedConcept } from '@/data/concepts-extended';
import { translateConcepts } from '@/data/concepts-i18n';
import { SPACE_COLORS } from '@/data/concepts';
import type { OntologicalSpace } from '@/data/concepts';

interface ConceptDetailProps {
  locale: string;
  slug: string;
}

export default function ConceptDetail({ locale, slug }: ConceptDetailProps) {
  const t = useTranslations('concepts');
  const currentLocale = useLocale();
  const [concepts, setConcepts] = useState<ExtendedConcept[]>(EXTENDED_CONCEPTS);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const effectiveLocale = locale || currentLocale;
    translateConcepts(EXTENDED_CONCEPTS, effectiveLocale).then(setConcepts);
  }, [locale, currentLocale]);

  const concept = concepts.find((c) => c.documentId === slug);

  // Find related concepts from connections (bidirectional)
  const relatedIds = concept
    ? [
        ...EXTENDED_CONNECTIONS.filter((conn) => conn.from === concept.documentId).map((c) => c.to),
        ...EXTENDED_CONNECTIONS.filter((conn) => conn.to === concept.documentId).map((c) => c.from),
      ]
    : [];
  const uniqueRelatedIds = [...new Set(relatedIds)];
  const relatedConcepts = uniqueRelatedIds
    .map((id) => concepts.find((c) => c.documentId === id))
    .filter(Boolean) as ExtendedConcept[];

  const handleShare = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const spaceLabel = (space: OntologicalSpace) => {
    const key = `space${space}` as 'spaceC' | 'spaceI' | 'spaceF';
    return t(key);
  };

  // Concept not found
  if (!concept) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a1a] px-4 text-white">
        <h1 className="mb-4 text-3xl font-bold">{t('notFound')}</h1>
        <p className="mb-8 text-white/60">{t('notFoundMessage')}</p>
        <Link
          href="/concetti"
          className="rounded-lg border border-white/20 px-5 py-2 text-sm transition hover:bg-white/10"
        >
          {t('backToList')}
        </Link>
      </div>
    );
  }

  const color = SPACE_COLORS[concept.space].primary;

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Back link */}
        <Link
          href="/concetti"
          className="mb-8 inline-flex items-center gap-1 text-sm text-white/50 transition hover:text-white/80"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t('backToList')}
        </Link>

        {/* Space badge */}
        <div className="mb-4">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${color}20`,
              color,
              border: `1px solid ${color}40`,
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            {spaceLabel(concept.space)}
          </span>
        </div>

        {/* Concept name */}
        <h1 className="mb-8 text-3xl font-bold sm:text-4xl">{concept.name}</h1>

        {/* Quote */}
        {concept.quote && (
          <blockquote
            className="mb-10 rounded-r-lg border-l-4 bg-white/[0.03] py-4 pl-6 pr-4"
            style={{ borderColor: color }}
          >
            <p className="text-base italic leading-relaxed text-white/70">
              &ldquo;{concept.quote}&rdquo;
            </p>
          </blockquote>
        )}

        {/* Description */}
        <div className="mb-12">
          <h2 className="mb-3 text-lg font-semibold text-white/90">{t('description')}</h2>
          <p className="text-base leading-relaxed text-white/70">{concept.shortDescription}</p>
        </div>

        {/* Related concepts */}
        {relatedConcepts.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-white/90">{t('relatedConcepts')}</h2>
            <div className="flex flex-wrap gap-2">
              {relatedConcepts.map((related) => {
                const relatedColor = SPACE_COLORS[related.space].primary;
                return (
                  <Link
                    key={related.documentId}
                    href={{ pathname: '/concetti/[slug]', params: { slug: related.documentId } }}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition hover:bg-white/10"
                    style={{
                      borderColor: `${relatedColor}30`,
                      color: relatedColor,
                    }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: relatedColor }}
                    />
                    {related.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm transition hover:bg-white/10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('backToCosmo')}
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm transition hover:bg-white/10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {copied ? t('copied') : t('shareButton')}
          </button>
        </div>
      </div>
    </div>
  );
}

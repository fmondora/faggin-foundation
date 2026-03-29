'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { EXTENDED_CONCEPTS } from '@/data/concepts-extended';
import type { ExtendedConcept } from '@/data/concepts-extended';
import { translateConcepts } from '@/data/concepts-i18n';
import { SPACE_COLORS } from '@/data/concepts';
import type { OntologicalSpace } from '@/data/concepts';

const SPACE_ORDER: OntologicalSpace[] = ['C', 'I', 'F'];

export default function ConceptsIndex({ locale }: { locale: string }) {
  const t = useTranslations('concepts');
  const currentLocale = useLocale();
  const [concepts, setConcepts] = useState<ExtendedConcept[]>(EXTENDED_CONCEPTS);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const effectiveLocale = locale || currentLocale;
    translateConcepts(EXTENDED_CONCEPTS, effectiveLocale).then(setConcepts);
  }, [locale, currentLocale]);

  const filtered = useMemo(() => {
    if (!search.trim()) return concepts;
    const q = search.toLowerCase();
    return concepts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q),
    );
  }, [concepts, search]);

  const grouped = useMemo(() => {
    const map: Record<OntologicalSpace, ExtendedConcept[]> = { C: [], I: [], F: [] };
    for (const c of filtered) {
      map[c.space].push(c);
    }
    for (const key of SPACE_ORDER) {
      map[key].sort((a, b) => a.sortOrder - b.sortOrder);
    }
    return map;
  }, [filtered]);

  const spaceLabel = (space: OntologicalSpace) => {
    const key = `space${space}` as 'spaceC' | 'spaceI' | 'spaceF';
    return t(key);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">{t('title')}</h1>
        <p className="mb-8 text-white/60">{t('subtitle')}</p>

        {/* Search */}
        <div className="relative mb-10">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-white/40 outline-none transition focus:border-white/30 focus:bg-white/[0.07]"
          />
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-white/50">{t('noResults')}</p>
        )}

        {/* Sections by space */}
        {SPACE_ORDER.map((space) => {
          const items = grouped[space];
          if (items.length === 0) return null;

          const color = SPACE_COLORS[space].primary;

          return (
            <section key={space} className="mb-14">
              {/* Section header */}
              <div className="mb-6 flex items-center gap-3">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <h2 className="text-xl font-semibold" style={{ color }}>
                  {spaceLabel(space)}
                </h2>
                <span className="text-sm text-white/40">({items.length})</span>
              </div>

              {/* Concept cards grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((concept) => (
                  <Link
                    key={concept.documentId}
                    href={{ pathname: '/concetti/[slug]', params: { slug: concept.documentId } }}
                    className="group rounded-xl border border-white/[0.06] bg-white/5 p-5 transition hover:border-white/15 hover:bg-white/[0.08]"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="inline-block h-2 w-2 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <h3 className="text-base font-medium text-white group-hover:underline">
                        {concept.name}
                      </h3>
                    </div>
                    <p className="line-clamp-2 text-sm leading-relaxed text-white/55">
                      {concept.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

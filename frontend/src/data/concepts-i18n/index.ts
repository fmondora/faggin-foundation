import type { Concept } from '@/types/strapi';

type ConceptTranslation = {
  name: string;
  shortDescription: string;
  quote: string;
};

type TranslationMap = Record<string, ConceptTranslation>;

const translationCache: Record<string, TranslationMap | null> = {};

async function loadTranslations(locale: string): Promise<TranslationMap> {
  if (translationCache[locale]) return translationCache[locale]!;

  try {
    let mod: { default: TranslationMap };
    switch (locale) {
      case 'en': mod = await import('./en.json'); break;
      case 'de': mod = await import('./de.json'); break;
      case 'es': mod = await import('./es.json'); break;
      default: mod = await import('./it.json'); break;
    }
    translationCache[locale] = mod.default;
    return mod.default;
  } catch {
    // Fallback to Italian
    const mod = await import('./it.json');
    translationCache[locale] = mod.default;
    return mod.default;
  }
}

/**
 * Apply locale translations to concept array.
 * Returns new array with translated name, shortDescription, quote.
 */
export async function translateConcepts<T extends Concept>(
  concepts: T[],
  locale: string,
): Promise<T[]> {
  if (locale === 'it') return concepts; // Italian is the source language

  const translations = await loadTranslations(locale);

  return concepts.map(concept => {
    const t = translations[concept.documentId];
    if (!t) return concept;
    return {
      ...concept,
      name: t.name,
      shortDescription: t.shortDescription,
      quote: t.quote,
    };
  });
}

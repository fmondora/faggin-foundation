const LOCALE_MAP: Record<string, string> = {
  it: 'it-IT',
  en: 'en-US',
  de: 'de-DE',
  es: 'es-ES',
};

/**
 * Formats a date string for event display in the given locale.
 * Returns the original string if parsing fails.
 */
export function formatEventDate(dateStr: string, locale: string): string {
  try {
    return new Date(dateStr).toLocaleDateString(
      LOCALE_MAP[locale] || locale,
      { year: 'numeric', month: 'short' }
    );
  } catch {
    return dateStr;
  }
}

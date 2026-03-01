/**
 * Returns the base Strapi URL.
 * Server-side: uses STRAPI_INTERNAL_URL (Docker hostname).
 * Browser: uses NEXT_PUBLIC_STRAPI_URL.
 * Fallback: http://localhost:1337
 */
export function getStrapiUrl(): string {
  return (
    (typeof window === 'undefined' ? process.env.STRAPI_INTERNAL_URL : undefined) ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    'http://localhost:1337'
  );
}

/**
 * Returns a full URL for a Strapi media asset.
 * If path is already absolute (starts with http), returns it as-is.
 */
export function getStrapiMediaUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${getStrapiUrl()}${path}`;
}

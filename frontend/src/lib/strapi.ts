import qs from 'qs';

// Server-side uses internal Docker hostname; browser uses public localhost URL
const STRAPI_URL = (typeof window === 'undefined'
  ? process.env.STRAPI_INTERNAL_URL
  : undefined) || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiRequestOptions {
  endpoint: string;
  query?: Record<string, any>;
  method?: string;
  body?: any;
  locale?: string;
}

export async function strapiRequest<T>({
  endpoint,
  query = {},
  method = 'GET',
  body,
  locale,
}: StrapiRequestOptions): Promise<T> {
  const params = { ...query };
  if (locale) params.locale = locale;

  const queryString = qs.stringify(params, { encodeValuesOnly: true });
  const url = `${STRAPI_URL}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getHomePage(locale: string) {
  return strapiRequest({ endpoint: 'home-page', locale, query: { populate: { featuredVideos: true, seo: { populate: '*' } } } });
}
export async function getAboutPage(locale: string) {
  return strapiRequest({ endpoint: 'about-page', locale, query: { populate: { seo: { populate: '*' } } } });
}
export async function getBioSections(locale: string) {
  return strapiRequest({ endpoint: 'bio-sections', locale, query: { sort: 'sortOrder:asc' } });
}
export async function getAwards() {
  return strapiRequest({ endpoint: 'awards', query: { sort: 'sortOrder:asc' } });
}
export async function getVideoPage(locale: string) {
  return strapiRequest({ endpoint: 'video-page', locale, query: { populate: { seo: { populate: '*' } } } });
}
export async function getVideoThemes(locale: string) {
  return strapiRequest({ endpoint: 'video-themes', locale, query: { sort: 'sortOrder:asc', populate: { videos: true } } });
}
export async function getEventsPage(locale: string) {
  return strapiRequest({ endpoint: 'events-page', locale, query: { populate: { seo: { populate: '*' } } } });
}
export async function getEvents(locale: string) {
  return strapiRequest({ endpoint: 'events', locale, query: { sort: 'date:desc' } });
}
export async function getResearchPage(locale: string) {
  return strapiRequest({ endpoint: 'research-page', locale, query: { populate: { seo: { populate: '*' } } } });
}
export async function getSiteConfig(locale: string) {
  return strapiRequest({ endpoint: 'site-config', locale, query: { populate: { socialLinks: true } } });
}
export async function getBooks(locale: string) {
  return strapiRequest({ endpoint: 'books', locale, query: { sort: 'sortOrder:asc', populate: { cover: true } } });
}
export async function getTopicsWithCounts(locale: string, userEmail?: string) {
  const query: Record<string, string> = { locale };
  if (userEmail) query.userEmail = userEmail;
  return strapiRequest({ endpoint: 'votes/topics-with-counts', query });
}

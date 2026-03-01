import qs from 'qs';
import { getStrapiUrl } from './strapi-url';
import type {
  StrapiResponse,
  StrapiListResponse,
  HomepageData,
  AboutPageData,
  VideoPageData,
  EventsPageData,
  ResearchPageData,
  SiteConfig,
  Book,
  BioSection,
  Award,
  Event,
  VideoTheme,
  TopicWithCounts,
} from '@/types/strapi';

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export interface StrapiRequestOptions {
  endpoint: string;
  query?: Record<string, unknown>;
  method?: string;
  body?: unknown;
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
  const url = `${getStrapiUrl()}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

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

export async function getHomePage(locale: string): Promise<StrapiResponse<HomepageData>> {
  return strapiRequest({ endpoint: 'home-page', locale, query: { populate: { featuredVideos: true, seo: { populate: '*' } } } });
}
export async function getAboutPage(locale: string): Promise<StrapiResponse<AboutPageData>> {
  return strapiRequest({ endpoint: 'about-page', locale, query: { populate: { seo: { populate: '*' } } } });
}
export async function getBioSections(locale: string): Promise<StrapiListResponse<BioSection>> {
  return strapiRequest({ endpoint: 'bio-sections', locale, query: { sort: 'sortOrder:asc' } });
}
export async function getAwards(): Promise<StrapiListResponse<Award>> {
  return strapiRequest({ endpoint: 'awards', query: { sort: 'sortOrder:asc' } });
}
export async function getVideoPage(locale: string): Promise<StrapiResponse<VideoPageData>> {
  return strapiRequest({ endpoint: 'video-page', locale, query: { populate: { seo: { populate: '*' } } } });
}
export async function getVideoThemes(locale: string): Promise<StrapiListResponse<VideoTheme>> {
  return strapiRequest({ endpoint: 'video-themes', locale, query: { sort: 'sortOrder:asc', populate: { videos: true } } });
}
export async function getEventsPage(locale: string): Promise<StrapiResponse<EventsPageData>> {
  return strapiRequest({ endpoint: 'events-page', locale, query: { populate: { seo: { populate: '*' } } } });
}
export async function getEvents(locale: string): Promise<StrapiListResponse<Event>> {
  return strapiRequest({ endpoint: 'events', locale, query: { sort: 'date:desc' } });
}
export async function getResearchPage(locale: string): Promise<StrapiResponse<ResearchPageData>> {
  return strapiRequest({ endpoint: 'research-page', locale, query: { populate: { seo: { populate: '*' } } } });
}
export async function getSiteConfig(locale: string): Promise<StrapiResponse<SiteConfig>> {
  return strapiRequest({ endpoint: 'site-config', locale, query: { populate: { socialLinks: true } } });
}
export async function getBooks(locale: string): Promise<StrapiListResponse<Book>> {
  return strapiRequest({ endpoint: 'books', locale, query: { sort: 'sortOrder:asc', populate: { cover: true } } });
}
export async function getTopicsWithCounts(locale: string, userEmail?: string): Promise<StrapiListResponse<TopicWithCounts>> {
  const query: Record<string, string> = { locale };
  if (userEmail) query.userEmail = userEmail;
  return strapiRequest({ endpoint: 'votes/topics-with-counts', query });
}

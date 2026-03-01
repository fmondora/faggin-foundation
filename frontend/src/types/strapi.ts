// Generic Strapi response wrappers
export interface StrapiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Media
export interface StrapiImage {
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

// Collection types
export interface Book {
  documentId: string;
  title: string;
  tagline?: string;
  videoUrl?: string;
  buttonLabel?: string;
  sortOrder?: number;
  cover?: StrapiImage;
  // Fallback-only fields
  image?: string;
}

export interface BioSection {
  documentId?: string;
  period: string;
  title: string;
  content: string;
  sortOrder?: number;
}

export interface Award {
  documentId?: string;
  year: number;
  title: string;
  description?: string;
  sortOrder?: number;
}

export interface Event {
  documentId?: string;
  title: string;
  date: string;
  location?: string;
  type: 'upcoming' | 'past';
  link?: string;
}

export interface Video {
  documentId?: string;
  youtubeId: string;
  title: string;
  description?: string;
  sortOrder?: number;
}

export interface VideoTheme {
  documentId?: string;
  name: string;
  description?: string;
  sortOrder?: number;
  videos?: Video[];
}

export interface Topic {
  documentId: string;
  title: string;
  description: string;
  sortOrder?: number;
}

export interface TopicWithCounts {
  documentId: string;
  title: string;
  description: string;
  sortOrder?: number;
  voteCount: number;
  userHasVoted: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface SiteConfig {
  socialLinks?: SocialLink[];
}

// Single types (page data)
export interface HomepageData {
  purposeTitle?: string;
  purposeText?: string;
  storyTitle?: string;
  storyBio?: string;
  storyVideoUrl?: string;
  videoSerieTitle?: string;
  videoSerieSubtitle?: string;
  featuredVideos?: Video[];
  seo?: SeoData;
}

export interface AboutPageData {
  heroTitle?: string;
  heroSubtitle?: string;
  seo?: SeoData;
}

export interface VideoPageData {
  heroTitle?: string;
  heroSubtitle?: string;
  seo?: SeoData;
}

export interface EventsPageData {
  heroTitle?: string;
  heroSubtitle?: string;
  seo?: SeoData;
}

export interface ResearchPageData {
  pageTitle?: string;
  introText?: string;
  areasTitle?: string;
  areas?: string[] | { name?: string; title?: string }[];
  collaborationsTitle?: string;
  collaborations?: { title: string; description: string }[];
  seo?: SeoData;
}

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: StrapiImage;
}

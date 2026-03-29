export const locales = ['it', 'en', 'de', 'es'] as const;
export const defaultLocale = 'it' as const;
export type Locale = (typeof locales)[number];

export const pathnames = {
  '/': '/',
  '/about': {
    it: '/about',
    en: '/about',
    de: '/about',
    es: '/acerca-de',
  },
  '/video-serie': {
    it: '/video-serie',
    en: '/video-series',
    de: '/videoreihe',
    es: '/serie-de-videos',
  },
  '/eventi': {
    it: '/eventi',
    en: '/events',
    de: '/veranstaltungen',
    es: '/eventos',
  },
  '/ricerca-e-sviluppo': {
    it: '/ricerca-e-sviluppo',
    en: '/research',
    de: '/forschung',
    es: '/investigacion',
  },
  '/prototypes/visionary': '/prototypes/visionary',
  '/prototypes/narrative': '/prototypes/narrative',
  '/prototypes/theoretical': '/prototypes/theoretical',
  '/prototypes/cosmo3d': '/prototypes/cosmo3d',
  '/prototypes/chat': '/prototypes/chat',
} as const;

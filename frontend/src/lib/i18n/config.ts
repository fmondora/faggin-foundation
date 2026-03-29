export const locales = ['it', 'en', 'de', 'es'] as const;
export const defaultLocale = 'it' as const;
export type Locale = (typeof locales)[number];

export const pathnames = {
  '/': '/',
  '/concetti': {
    it: '/concetti',
    en: '/concepts',
    de: '/konzepte',
    es: '/conceptos',
  },
  '/concetti/[slug]': {
    it: '/concetti/[slug]',
    en: '/concepts/[slug]',
    de: '/konzepte/[slug]',
    es: '/conceptos/[slug]',
  },
  '/biografia': {
    it: '/biografia',
    en: '/biography',
    de: '/biografie',
    es: '/biografia',
  },
  '/pubblicazioni': {
    it: '/pubblicazioni',
    en: '/publications',
    de: '/publikationen',
    es: '/publicaciones',
  },
  '/media': '/media',
  '/eventi': {
    it: '/eventi',
    en: '/events',
    de: '/veranstaltungen',
    es: '/eventos',
  },
  '/news': '/news',
  '/chi-siamo': {
    it: '/chi-siamo',
    en: '/about-us',
    de: '/ueber-uns',
    es: '/quienes-somos',
  },
  '/contatti': {
    it: '/contatti',
    en: '/contact',
    de: '/kontakt',
    es: '/contacto',
  },
  '/privacy': '/privacy',
  '/termini': {
    it: '/termini',
    en: '/terms',
    de: '/nutzungsbedingungen',
    es: '/terminos',
  },
  // Legacy / prototypes
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

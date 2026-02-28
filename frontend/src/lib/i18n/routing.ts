import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale, pathnames } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  pathnames,
});

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const supabaseUrl = process.env.SUPABASE_INTERNAL_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:9999';

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http' as const, hostname: 'localhost', port: '1337' },
      { protocol: 'http' as const, hostname: 'strapi', port: '1337' },
      { protocol: 'https' as const, hostname: 'img.youtube.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/auth/v1/:path*',
        destination: `${supabaseUrl}/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

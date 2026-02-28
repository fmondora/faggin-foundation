import VideoThemeSection from '@/components/video/VideoThemeSection';
import { getVideoPage, getVideoThemes } from '@/lib/strapi';

export default async function VideoSeriePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  let videoPageData: any = null, themes: any = null;
  try { [videoPageData, themes] = await Promise.all([getVideoPage(locale), getVideoThemes(locale)]); } catch {}

  return (
    <>
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold text-dark mb-6">{videoPageData?.data?.pageTitle || 'Video Serie'}</h1>
          <p className="text-lg text-text-light">{videoPageData?.data?.subtitle || "Una raccolta di interviste, conferenze e dialoghi in cui Federico Faggin esplora i temi fondamentali della sua ricerca: la natura della coscienza, il rapporto tra scienza e spiritualità, il libero arbitrio, e perché l'intelligenza artificiale non potrà mai essere consapevole."}</p>
        </div>
      </section>
      <VideoThemeSection themes={themes?.data} />
    </>
  );
}

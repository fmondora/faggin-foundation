import { Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { getYoutubeThumbnail } from '@/lib/youtube';
import type { HomepageData, Video } from '@/types/strapi';

const FALLBACK_VIDEOS: Video[] = [
  { youtubeId: 'IBt4oUCNl3U', title: 'Noi Siamo Campi Quantistici Auto-Coscienti' },
  { youtubeId: 'ssE4h70qKWk', title: 'Quantum Fields Are Conscious' },
  { youtubeId: '0FUFewGHLLg', title: "QIP Explained (con D'Ariano)" },
  { youtubeId: '0nOtLj8UYCw', title: 'Penrose vs Faggin vs Kastrup' },
];

export default function VideoGridPreview({ data }: { data?: Pick<HomepageData, 'videoSerieTitle' | 'videoSerieSubtitle' | 'featuredVideos'> }) {
  const t = useTranslations('home');
  const title = data?.videoSerieTitle || 'Video Serie';
  const subtitle = data?.videoSerieSubtitle || '';
  const videos = data?.featuredVideos?.length ? data.featuredVideos : FALLBACK_VIDEOS;

  return (
    <section className="py-16 px-4 bg-dark text-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl font-bold mb-3">{title}</h2>
          {subtitle && <p className="text-white/70">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.slice(0, 4).map((video) => (
            <div key={video.youtubeId} className="bg-dark-lighter rounded overflow-hidden shadow-lg">
              <div className="relative aspect-video">
                <Image src={getYoutubeThumbnail(video.youtubeId)} alt={video.title} fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                </div>
              </div>
              <div className="p-4"><h3 className="font-bold text-sm">{video.title}</h3></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/video-serie" className="inline-block bg-primary hover:bg-accent text-white font-bold px-8 py-3 rounded transition-colors">{t('viewAllVideos')}</Link>
        </div>
      </div>
    </section>
  );
}

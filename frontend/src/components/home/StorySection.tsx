import { useTranslations } from 'next-intl';
import { extractYoutubeId, getYoutubeEmbedUrl } from '@/lib/youtube';
import type { HomepageData } from '@/types/strapi';

export default function StorySection({ data }: { data?: Pick<HomepageData, 'storyTitle' | 'storyBio' | 'storyVideoUrl'> }) {
  const t = useTranslations('home');
  const videoId = extractYoutubeId(data?.storyVideoUrl);
  const title = data?.storyTitle || 'USI incontra Federico Faggin';
  const bio = data?.storyBio || "Fisico, inventore e imprenditore italiano, naturalizzato statunitense, noto per aver progettato il primo microprocessore al mondo, l'Intel 4004, nel 1971. Pioniere della tecnologia MOS con porta di silicio, ha rivoluzionato l'informatica, creato il microprocessore Z80 e co-fondato Synaptics, introducendo touchpad e touchscreen.\n\nA seguito di una significativa esperienza biografica, da circa 20 anni si occupa dello studio scientifico della coscienza, focalizzandosi sul superamento della scienza materialista.";

  return (
    <section className="py-16 px-4 bg-section-mid text-white">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-heading text-3xl font-bold text-center mb-10">{t('myStory')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="aspect-video rounded overflow-hidden shadow-lg">
            <iframe src={getYoutubeEmbedUrl(videoId)} title={title} className="w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">{title}</h3>
            <div className="text-white/85 leading-relaxed whitespace-pre-line">{bio}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

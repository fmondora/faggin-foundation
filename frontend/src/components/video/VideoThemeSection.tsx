import VideoCard from './VideoCard';
import type { VideoTheme } from '@/types/strapi';

const FALLBACK_THEMES: VideoTheme[] = [
  { name: 'La Coscienza è Irriducibile', description: 'Video sulla tesi centrale: la coscienza come proprietà fondamentale della realtà.', videos: [{ youtubeId: 'IBt4oUCNl3U', title: 'Noi Siamo Campi Quantistici Auto-Coscienti' }, { youtubeId: 'ssE4h70qKWk', title: 'Quantum Fields Are Conscious' }] },
  { name: 'Intelligenza Artificiale e Natura Umana', description: "Perché l'inventore del microprocessore sostiene che le macchine non potranno mai essere consapevoli.", videos: [{ youtubeId: 'qr2tmUrKphs', title: "L'AI non sarà mai cosciente - AI Talks #18" }] },
  { name: 'Fisica Quantistica e Informazione', description: "Il Panpsichismo dell'Informazione Quantistica (QIP) spiegato.", videos: [{ youtubeId: '0FUFewGHLLg', title: 'Quantum Information Panpsychism Explained' }, { youtubeId: '0nOtLj8UYCw', title: 'Quantum Consciousness Debate: Penrose, Faggin & Kastrup' }] },
  { name: 'La Mia Storia', description: 'Interviste biografiche e il documentario RAI.', videos: [{ youtubeId: 'ch-iNvebvUw', title: 'USI incontra Federico Faggin — Oltre le percezioni' }, { youtubeId: 'K5REKKkKZpY', title: 'The Nature of Consciousness' }] },
  { name: 'Presentazioni dei Libri', description: 'Le presentazioni dei tre libri di Federico Faggin.', videos: [{ youtubeId: 'Gf7-u6k498Y', title: 'Silicio — Presentazione del libro' }, { youtubeId: 'C5fgYfNQJp0', title: 'Irriducibile — Presentazione del libro' }, { youtubeId: 'IpB8tc50UU4', title: "Oltre l'Invisibile — Presentazione del libro" }] },
];

export default function VideoThemeSection({ themes }: { themes?: VideoTheme[] }) {
  const displayThemes = themes?.length ? themes : FALLBACK_THEMES;

  return (
    <>
      {displayThemes.map((theme, i) => (
        <section key={theme.name || i} className={`py-12 px-4 ${i % 2 === 0 ? 'bg-bg-alt' : 'bg-bg'}`}>
          <div className="max-w-[1200px] mx-auto">
            <h2 className="font-heading text-2xl font-bold text-dark mb-2">{theme.name}</h2>
            {theme.description && <p className="text-text-light mb-6">{theme.description}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(theme.videos || []).map((video) => <VideoCard key={video.youtubeId} video={video} />)}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

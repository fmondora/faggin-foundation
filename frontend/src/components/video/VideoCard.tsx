'use client';
import { useState } from 'react';
import Image from 'next/image';
import { getYoutubeThumbnail, getYoutubeEmbedUrl } from '@/lib/youtube';
import type { Video } from '@/types/strapi';

export default function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="bg-white rounded shadow-md overflow-hidden">
      <div className="relative aspect-video">
        {playing ? (
          <iframe src={getYoutubeEmbedUrl(video.youtubeId, true)} title={video.title} className="w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
        ) : (
          <button onClick={() => setPlaying(true)} className="w-full h-full relative">
            <Image src={getYoutubeThumbnail(video.youtubeId)} alt={video.title} fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
              <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-text">{video.title}</h3>
        {video.description && <p className="text-text-light text-sm mt-1">{video.description}</p>}
      </div>
    </div>
  );
}

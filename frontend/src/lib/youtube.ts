/**
 * Returns the YouTube high-quality thumbnail URL for a given video ID.
 */
export function getYoutubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

/**
 * Returns the YouTube embed URL for a given video ID.
 */
export function getYoutubeEmbedUrl(youtubeId: string, autoplay = false): string {
  return `https://www.youtube.com/embed/${youtubeId}${autoplay ? '?autoplay=1' : ''}`;
}

/**
 * Extracts a YouTube video ID from a URL.
 * Supports /embed/, ?v=, and youtu.be/ formats.
 * Returns the fallback ID if extraction fails.
 */
export function extractYoutubeId(url: string | undefined, fallback = 'ch-iNvebvUw'): string {
  if (!url) return fallback;
  const match = url.match(/(?:embed\/|v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match?.[1] || fallback;
}

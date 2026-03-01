import { describe, it, expect } from 'vitest';
import { getYoutubeThumbnail, getYoutubeEmbedUrl, extractYoutubeId } from '@/lib/youtube';

describe('getYoutubeThumbnail', () => {
  it('returns correct thumbnail URL', () => {
    expect(getYoutubeThumbnail('abc123')).toBe('https://img.youtube.com/vi/abc123/hqdefault.jpg');
  });
});

describe('getYoutubeEmbedUrl', () => {
  it('returns embed URL without autoplay by default', () => {
    expect(getYoutubeEmbedUrl('abc123')).toBe('https://www.youtube.com/embed/abc123');
  });

  it('returns embed URL with autoplay when requested', () => {
    expect(getYoutubeEmbedUrl('abc123', true)).toBe('https://www.youtube.com/embed/abc123?autoplay=1');
  });

  it('returns embed URL without autoplay when explicitly false', () => {
    expect(getYoutubeEmbedUrl('abc123', false)).toBe('https://www.youtube.com/embed/abc123');
  });
});

describe('extractYoutubeId', () => {
  it('extracts from ?v= format', () => {
    expect(extractYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extracts from youtu.be format', () => {
    expect(extractYoutubeId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extracts from embed format', () => {
    expect(extractYoutubeId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('returns fallback for undefined', () => {
    expect(extractYoutubeId(undefined)).toBe('ch-iNvebvUw');
  });

  it('returns custom fallback for undefined', () => {
    expect(extractYoutubeId(undefined, 'custom')).toBe('custom');
  });

  it('returns fallback for non-matching URL', () => {
    expect(extractYoutubeId('https://example.com/page')).toBe('ch-iNvebvUw');
  });

  it('handles IDs with hyphens and underscores', () => {
    expect(extractYoutubeId('https://www.youtube.com/watch?v=ch-iNvebvUw')).toBe('ch-iNvebvUw');
  });
});

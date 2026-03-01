import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoThemeSection from '@/components/video/VideoThemeSection';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

describe('VideoThemeSection', () => {
  it('renders fallback themes when no themes provided', () => {
    render(<VideoThemeSection />);
    expect(screen.getByText('La Coscienza è Irriducibile')).toBeInTheDocument();
    expect(screen.getByText('Intelligenza Artificiale e Natura Umana')).toBeInTheDocument();
  });

  it('renders provided themes', () => {
    const themes = [
      { name: 'Custom Theme', description: 'Custom desc', videos: [{ youtubeId: 'xyz', title: 'Custom Video' }] },
    ];
    render(<VideoThemeSection themes={themes} />);
    expect(screen.getByText('Custom Theme')).toBeInTheDocument();
    expect(screen.getByText('Custom desc')).toBeInTheDocument();
    expect(screen.getByText('Custom Video')).toBeInTheDocument();
  });

  it('renders fallback when empty array provided', () => {
    render(<VideoThemeSection themes={[]} />);
    expect(screen.getByText('La Coscienza è Irriducibile')).toBeInTheDocument();
  });

  it('renders video cards for each video in a theme', () => {
    const themes = [
      {
        name: 'Multi-Video Theme',
        videos: [
          { youtubeId: 'a', title: 'Video A' },
          { youtubeId: 'b', title: 'Video B' },
        ],
      },
    ];
    render(<VideoThemeSection themes={themes} />);
    expect(screen.getByText('Video A')).toBeInTheDocument();
    expect(screen.getByText('Video B')).toBeInTheDocument();
  });

  it('handles theme without description', () => {
    const themes = [{ name: 'No Desc Theme', videos: [] }];
    render(<VideoThemeSection themes={themes} />);
    expect(screen.getByText('No Desc Theme')).toBeInTheDocument();
  });
});

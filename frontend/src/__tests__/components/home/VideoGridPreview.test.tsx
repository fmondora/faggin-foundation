import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VideoGridPreview from '@/components/home/VideoGridPreview';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock('@/lib/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => <a href={href} {...props}>{children}</a>,
}));

describe('VideoGridPreview', () => {
  it('renders with fallback videos when no data', () => {
    render(<VideoGridPreview />);
    expect(screen.getByText('Video Serie')).toBeInTheDocument();
    expect(screen.getByText('Noi Siamo Campi Quantistici Auto-Coscienti')).toBeInTheDocument();
    expect(screen.getByText('Quantum Fields Are Conscious')).toBeInTheDocument();
  });

  it('renders with custom data', () => {
    render(<VideoGridPreview data={{
      videoSerieTitle: 'Custom Title',
      videoSerieSubtitle: 'Custom Subtitle',
      featuredVideos: [{ youtubeId: 'xyz', title: 'Custom Video' }],
    }} />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Custom Video')).toBeInTheDocument();
  });

  it('renders "view all" link', () => {
    render(<VideoGridPreview />);
    expect(screen.getByText('viewAllVideos')).toBeInTheDocument();
  });

  it('limits to 4 videos', () => {
    const videos = Array.from({ length: 6 }, (_, i) => ({
      youtubeId: `id${i}`,
      title: `Video ${i}`,
    }));
    render(<VideoGridPreview data={{ featuredVideos: videos }} />);
    // Only 4 videos should render
    expect(screen.getByText('Video 0')).toBeInTheDocument();
    expect(screen.getByText('Video 3')).toBeInTheDocument();
    expect(screen.queryByText('Video 4')).not.toBeInTheDocument();
  });

  it('hides subtitle when empty', () => {
    render(<VideoGridPreview data={{ videoSerieSubtitle: '' }} />);
    // No subtitle paragraph should be present
    const subtitle = screen.queryByText('Custom Subtitle');
    expect(subtitle).not.toBeInTheDocument();
  });
});

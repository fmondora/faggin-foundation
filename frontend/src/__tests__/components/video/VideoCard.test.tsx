import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoCard from '@/components/video/VideoCard';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

describe('VideoCard', () => {
  const video = { youtubeId: 'abc123', title: 'Test Video', description: 'A description' };

  it('renders thumbnail and title', () => {
    render(<VideoCard video={video} />);
    expect(screen.getByAltText('Test Video')).toBeInTheDocument();
    expect(screen.getByText('Test Video')).toBeInTheDocument();
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('shows thumbnail image by default (not playing)', () => {
    render(<VideoCard video={video} />);
    const img = screen.getByAltText('Test Video');
    expect(img).toHaveAttribute('src', 'https://img.youtube.com/vi/abc123/hqdefault.jpg');
  });

  it('shows iframe on play click', () => {
    render(<VideoCard video={video} />);
    const playButton = screen.getByRole('button');
    fireEvent.click(playButton);
    const iframe = screen.getByTitle('Test Video');
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/abc123?autoplay=1');
  });

  it('hides description when not provided', () => {
    render(<VideoCard video={{ youtubeId: 'abc', title: 'No Desc' }} />);
    expect(screen.getByText('No Desc')).toBeInTheDocument();
    expect(screen.queryByText('A description')).not.toBeInTheDocument();
  });
});

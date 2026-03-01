import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StorySection from '@/components/home/StorySection';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('StorySection', () => {
  it('renders with fallback content when no data', () => {
    render(<StorySection />);
    expect(screen.getByText('myStory')).toBeInTheDocument();
    expect(screen.getByText('USI incontra Federico Faggin')).toBeInTheDocument();
    // Check iframe with default video ID
    const iframe = screen.getByTitle('USI incontra Federico Faggin');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/ch-iNvebvUw');
  });

  it('renders with custom data', () => {
    render(<StorySection data={{
      storyTitle: 'Custom Story',
      storyBio: 'Custom bio text',
      storyVideoUrl: 'https://www.youtube.com/watch?v=abc123',
    }} />);
    expect(screen.getByText('Custom Story')).toBeInTheDocument();
    expect(screen.getByText('Custom bio text')).toBeInTheDocument();
    const iframe = screen.getByTitle('Custom Story');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/abc123');
  });

  it('uses fallback bio when no data bio', () => {
    render(<StorySection data={{ storyTitle: 'Title' }} />);
    expect(screen.getByText(/Fisico, inventore e imprenditore/)).toBeInTheDocument();
  });
});

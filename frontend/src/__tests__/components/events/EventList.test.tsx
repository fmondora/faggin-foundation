import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import EventList from '@/components/events/EventList';
import type { Event } from '@/types/strapi';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

describe('EventList', () => {
  it('renders fallback events when none provided', () => {
    render(<EventList />);
    expect(screen.getByText(/Presentazione documentario RAI/)).toBeInTheDocument();
    expect(screen.getByText('The Science of Consciousness Conference')).toBeInTheDocument();
  });

  it('shows "no upcoming" message when no upcoming events', () => {
    const pastEvents: Event[] = [
      { title: 'Past Event', date: '2023-01-01', type: 'past' },
    ];
    render(<EventList events={pastEvents} />);
    expect(screen.getByText('noUpcoming')).toBeInTheDocument();
  });

  it('renders upcoming events section when present', () => {
    const events: Event[] = [
      { title: 'Future Event', date: '2026-12-01', type: 'upcoming', location: 'Rome' },
      { title: 'Past Event', date: '2023-01-01', type: 'past' },
    ];
    render(<EventList events={events} />);
    expect(screen.getByText('upcoming')).toBeInTheDocument();
    expect(screen.getByText('Future Event')).toBeInTheDocument();
    expect(screen.getByText('Rome')).toBeInTheDocument();
  });

  it('renders past events', () => {
    const events: Event[] = [
      { title: 'Old Conference', date: '2022-06-15', type: 'past', location: 'Milan' },
    ];
    render(<EventList events={events} />);
    expect(screen.getByText('Old Conference')).toBeInTheDocument();
    expect(screen.getByText('Milan')).toBeInTheDocument();
  });

  it('renders watch link for past events with link', () => {
    const events: Event[] = [
      { title: 'Recorded Event', date: '2023-01-01', type: 'past', link: 'https://example.com' },
    ];
    render(<EventList events={events} />);
    expect(screen.getByText('watch')).toBeInTheDocument();
    expect(screen.getByText('watch').closest('a')).toHaveAttribute('href', 'https://example.com');
  });

  it('uses fallback when empty array provided', () => {
    render(<EventList events={[]} />);
    expect(screen.getByText(/Presentazione documentario RAI/)).toBeInTheDocument();
  });
});

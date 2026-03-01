import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TopicCard from '@/components/research/TopicCard';
import type { TopicWithCounts } from '@/types/strapi';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const baseTopic: TopicWithCounts = {
  documentId: '1',
  title: 'Test Topic',
  description: 'Topic description',
  voteCount: 5,
  userHasVoted: false,
};

describe('TopicCard', () => {
  it('renders topic title and description', () => {
    render(<TopicCard topic={baseTopic} isLoggedIn={false} onVote={vi.fn()} onRemoveVote={vi.fn()} />);
    expect(screen.getByText('Test Topic')).toBeInTheDocument();
    expect(screen.getByText('Topic description')).toBeInTheDocument();
  });

  it('shows vote count', () => {
    render(<TopicCard topic={baseTopic} isLoggedIn={false} onVote={vi.fn()} onRemoveVote={vi.fn()} />);
    expect(screen.getByText('5 votes')).toBeInTheDocument();
  });

  it('shows vote button when logged in and not voted', () => {
    render(<TopicCard topic={baseTopic} isLoggedIn={true} onVote={vi.fn()} onRemoveVote={vi.fn()} />);
    expect(screen.getByText('vote')).toBeInTheDocument();
  });

  it('shows voted button when user has voted', () => {
    const votedTopic = { ...baseTopic, userHasVoted: true };
    render(<TopicCard topic={votedTopic} isLoggedIn={true} onVote={vi.fn()} onRemoveVote={vi.fn()} />);
    expect(screen.getByText('voted')).toBeInTheDocument();
  });

  it('hides vote button when not logged in', () => {
    render(<TopicCard topic={baseTopic} isLoggedIn={false} onVote={vi.fn()} onRemoveVote={vi.fn()} />);
    expect(screen.queryByText('vote')).not.toBeInTheDocument();
  });

  it('calls onVote when vote button is clicked', () => {
    const onVote = vi.fn();
    render(<TopicCard topic={baseTopic} isLoggedIn={true} onVote={onVote} onRemoveVote={vi.fn()} />);
    fireEvent.click(screen.getByText('vote'));
    expect(onVote).toHaveBeenCalled();
  });

  it('calls onRemoveVote when voted button is clicked', () => {
    const onRemoveVote = vi.fn();
    const votedTopic = { ...baseTopic, userHasVoted: true };
    render(<TopicCard topic={votedTopic} isLoggedIn={true} onVote={vi.fn()} onRemoveVote={onRemoveVote} />);
    fireEvent.click(screen.getByText('voted'));
    expect(onRemoveVote).toHaveBeenCalled();
  });
});

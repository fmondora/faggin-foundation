'use client';
import { useTranslations } from 'next-intl';

export default function TopicCard({ topic, isLoggedIn, onVote, onRemoveVote }: {
  topic: { documentId: string; title: string; description: string; voteCount: number; userHasVoted: boolean };
  isLoggedIn: boolean;
  onVote: () => void;
  onRemoveVote: () => void;
}) {
  const t = useTranslations('voting');

  return (
    <div className="bg-white rounded shadow-sm p-5 flex flex-col justify-between">
      <div className="mb-3">
        <h3 className="font-bold text-dark mb-1">{topic.title}</h3>
        <p className="text-text-light text-sm">{topic.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-light">{topic.voteCount} {t('votes')}</span>
        {isLoggedIn && (
          <button onClick={topic.userHasVoted ? onRemoveVote : onVote} className={`px-4 py-1.5 rounded text-sm font-bold transition-colors ${topic.userHasVoted ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
            {topic.userHasVoted ? t('voted') : t('vote')}
          </button>
        )}
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/components/auth/AuthProvider';
import TopicCard from './TopicCard';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface Topic { documentId: string; title: string; description: string; voteCount: number; userHasVoted: boolean; }

const FALLBACK_TOPICS: Topic[] = [
  { documentId: '1', title: 'Coscienza e intelligenza artificiale', description: "Può una macchina diventare consapevole? Il dibattito tra Faggin e i sostenitori dell'IA forte.", voteCount: 0, userHasVoted: false },
  { documentId: '2', title: 'La fisica quantistica spiegata semplice', description: 'I concetti chiave della meccanica quantistica alla base della teoria di Faggin, accessibili a tutti.', voteCount: 0, userHasVoted: false },
  { documentId: '3', title: 'Esperienze di pre-morte e coscienza', description: 'Cosa suggeriscono le NDE sulla natura della coscienza e sulla sopravvivenza dopo la morte fisica?', voteCount: 0, userHasVoted: false },
  { documentId: '4', title: 'Meditazione e consapevolezza', description: "Il ruolo della meditazione nello sviluppo della consapevolezza, secondo l'esperienza di Faggin.", voteCount: 0, userHasVoted: false },
  { documentId: '5', title: 'Sapere vs. Conoscere', description: "La differenza tra conoscenza simbolica e comprensione vissuta. Implicazioni per l'educazione.", voteCount: 0, userHasVoted: false },
  { documentId: '6', title: 'Libero arbitrio: illusione o realtà?', description: 'Perché Faggin sostiene che il libero arbitrio è una proprietà fondamentale della natura.', voteCount: 0, userHasVoted: false },
  { documentId: '7', title: 'Scienza e spiritualità: il Nousym', description: 'Come scienza e spiritualità possono convergere in una visione unitaria della realtà.', voteCount: 0, userHasVoted: false },
  { documentId: '8', title: "Il futuro dell'umanità nell'era dell'IA", description: "Come preservare la nostra umanità in un mondo dominato dall'intelligenza artificiale.", voteCount: 0, userHasVoted: false },
];

export default function VotingSection({ locale }: { locale: string }) {
  const t = useTranslations('voting');
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>(FALLBACK_TOPICS);
  const [loading, setLoading] = useState(true);

  const fetchTopics = async () => {
    try {
      const params = new URLSearchParams({ locale });
      if (user?.email) params.set('userEmail', user.email);
      const res = await fetch(`${STRAPI_URL}/api/votes/topics-with-counts?${params}`);
      if (res.ok) { const json = await res.json(); if (json.data?.length) setTopics(json.data); }
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchTopics(); }, [user]);

  const handleVote = async (topicId: string) => {
    if (!user?.email) return;
    try {
      await fetch(`${STRAPI_URL}/api/votes/cast`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ topicId, userEmail: user.email }) });
      fetchTopics();
    } catch {}
  };

  const handleRemoveVote = async (topicId: string) => {
    if (!user?.email) return;
    try {
      await fetch(`${STRAPI_URL}/api/votes/remove/${topicId}?userEmail=${user.email}`, { method: 'DELETE' });
      fetchTopics();
    } catch {}
  };

  return (
    <section className="py-16 px-4 bg-bg-alt">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl font-bold text-dark mb-3">{t('title')}</h2>
          <p className="text-text-light max-w-[600px] mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((topic) => (
            <TopicCard key={topic.documentId} topic={topic} isLoggedIn={!!user} onVote={() => handleVote(topic.documentId)} onRemoveVote={() => handleRemoveVote(topic.documentId)} />
          ))}
        </div>
        {!user && <p className="text-center text-text-light mt-6 text-sm">{t('loginPrompt')}</p>}
      </div>
    </section>
  );
}

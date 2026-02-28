'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      if (!res.ok) throw new Error();
      setStatus('success');
      setEmail('');
    } catch { setStatus('error'); }
  };

  return (
    <div>
      <h4 className="font-bold mb-2">{t('title')}</h4>
      <p className="text-white/70 text-sm mb-3">{t('description')}</p>
      {status === 'success' ? (
        <p className="text-green-400 text-sm">{t('success')}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('placeholder')} required className="flex-1 px-3 py-2 rounded text-text text-sm" />
          <button type="submit" disabled={status === 'loading'} className="bg-primary hover:bg-accent text-white px-4 py-2 rounded text-sm font-bold transition-colors disabled:opacity-50">{t('button')}</button>
        </form>
      )}
      {status === 'error' && <p className="text-red-400 text-sm mt-1">{t('error')}</p>}
    </div>
  );
}

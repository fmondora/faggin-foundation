'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setStatus('success');
    } catch { setStatus('error'); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-text-light hover:text-text">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="font-heading text-2xl font-bold text-dark mb-6">{t('loginTitle')}</h2>
        {status === 'success' ? (
          <p className="text-green-700 bg-green-50 p-4 rounded">{t('checkEmail')}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-text mb-1">{t('emailLabel')}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('emailPlaceholder')} required className="w-full border border-border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary" />
            {status === 'error' && <p className="text-red-600 text-sm mb-3">{t('error')}</p>}
            <button type="submit" disabled={status === 'loading'} className="w-full bg-primary hover:bg-accent text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50">
              {status === 'loading' ? '...' : t('sendLink')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

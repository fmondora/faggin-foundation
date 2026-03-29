'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Message {
  id: string;
  role: 'user' | 'federico';
  text: string;
  timestamp: Date;
}

const TOPIC_KEYS = ['consciousness', 'ai', 'freeWill', 'awakening', 'scienceSpirit', 'meaning'] as const;
const TOPIC_ICONS = ['◉', '◇', '◈', '✦', '∞', '⊕'];

type TopicKey = (typeof TOPIC_KEYS)[number];

function findResponseKey(question: string, t: ReturnType<typeof useTranslations<'chat'>>): TopicKey | null {
  // Check exact match against translated questions
  for (const key of TOPIC_KEYS) {
    if (question === t(`questions.${key}`)) return key;
  }

  // Keyword matching from translations
  const lower = question.toLowerCase();
  for (const key of TOPIC_KEYS) {
    const keywordsStr = t(`keywords.${key}`);
    // "+" means AND (both parts must match), "," means OR
    if (keywordsStr.includes('+')) {
      const parts = keywordsStr.split('+');
      if (parts.every(p => lower.includes(p.trim()))) return key;
    } else {
      const keywords = keywordsStr.split(',');
      if (keywords.some(kw => lower.includes(kw.trim()))) return key;
    }
  }
  return null;
}

export default function FagginChat() {
  const t = useTranslations('chat');

  const welcomeMessage: Message = {
    id: 'welcome',
    role: 'federico',
    text: t('welcome'),
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTopics, setShowTopics] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setShowTopics(false);
    setIsTyping(true);

    const key = findResponseKey(text, t);
    const response = key ? t(`responses.${key}`) : t('responses.default');
    const delay = 1500 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const federicoMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'federico',
      text: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, federicoMsg]);
  }, [t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #12081e 100%)' }}>
      {/* Header */}
      <header className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
        <div className="relative">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-heading font-bold"
            style={{ background: 'linear-gradient(135deg, #F5A623 0%, #a03020 100%)', color: 'white' }}>
            FF
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0a0a1a]" />
        </div>
        <div>
          <h1 className="text-white font-heading text-lg font-bold">{t('title')}</h1>
          <p className="text-white/40 text-xs">{t('subtitle')}</p>
        </div>
        <div className="ml-auto">
          <span className="text-white/20 text-xs uppercase tracking-widest">{t('prototype')}</span>
        </div>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'federico' && (
                  <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-1"
                    style={{ background: 'linear-gradient(135deg, #F5A623, #a03020)', color: 'white' }}>
                    FF
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${
                  msg.role === 'user'
                    ? 'bg-white/10 text-white rounded-br-sm'
                    : 'bg-white/5 text-white/85 rounded-bl-sm'
                }`}>
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #F5A623, #a03020)', color: 'white' }}>
                FF
              </div>
              <div className="bg-white/5 rounded-2xl rounded-bl-sm px-5 py-4">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white/30 rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Topic suggestions */}
      <AnimatePresence>
        {showTopics && (
          <motion.div
            className="px-4 md:px-6 pb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.5 }}
          >
            <div className="max-w-2xl mx-auto">
              <p className="text-white/25 text-xs uppercase tracking-widest mb-3 text-center">
                {t('exploreLabel')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {TOPIC_KEYS.map((key, i) => (
                  <button
                    key={key}
                    onClick={() => sendMessage(t(`questions.${key}`))}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 transition-all text-left group"
                  >
                    <span className="text-lg opacity-50 group-hover:opacity-80 transition-opacity"
                      style={{ color: '#F5A623' }}>
                      {TOPIC_ICONS[i]}
                    </span>
                    <span className="text-white/60 group-hover:text-white/90 text-sm transition-colors">
                      {t(`topics.${key}`)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div className="px-4 md:px-6 py-4 border-t border-white/5">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            disabled={isTyping}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/25 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-5 py-3 rounded-xl font-medium text-sm transition-all disabled:opacity-20"
            style={{
              background: input.trim() && !isTyping
                ? 'linear-gradient(135deg, #F5A623, #a03020)'
                : 'rgba(255,255,255,0.05)',
              color: 'white',
            }}
          >
            {t('send')}
          </button>
        </form>
        <p className="text-white/10 text-xs text-center mt-2 max-w-2xl mx-auto">
          {t('disclaimer')}
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CosmographyHero from '@/components/cosmography/CosmographyHero';

/**
 * PROTOTIPO 1: VISIONARIO
 * Ispirato a 50-jahre-hitparade.ch
 *
 * Filosofia: zero scroll, esperienza immersiva fullscreen.
 * Il visitatore esplora i concetti come nodi in uno spazio cosmico.
 * Testo minimo, impatto massimo. Aforismi rotanti.
 */

const QUOTES = [
  'Noi siamo luce, dobbiamo solo aprire gli occhi.',
  'Il più non può venire dal meno.',
  'Non ero più un corpo separato dal mondo. Ero un punto di vista del Tutto.',
  'La coscienza non è un prodotto della materia. È il fondamento dell\'esistenza.',
  'Il futuro è aperto perché non è ancora determinato.',
  'Scienza e spiritualità sono una sola disciplina.',
];

const CONCEPT_WORDS = [
  { text: 'Coscienza', color: '#F5A623', size: 'text-5xl md:text-7xl' },
  { text: 'Luce', color: '#F5A623', size: 'text-3xl md:text-5xl' },
  { text: 'Seity', color: '#9B59B6', size: 'text-4xl md:text-6xl' },
  { text: 'Qualia', color: '#9B59B6', size: 'text-3xl md:text-4xl' },
  { text: 'Uno', color: '#F5A623', size: 'text-6xl md:text-8xl' },
  { text: 'Nousym', color: '#3498DB', size: 'text-4xl md:text-5xl' },
  { text: 'Libero arbitrio', color: '#F5A623', size: 'text-3xl md:text-4xl' },
];

type ViewMode = 'words' | 'cosmography' | 'about';

export default function VisionaryHome() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [view, setView] = useState<ViewMode>('words');
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(i => (i + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && view !== 'words') setView('words');
  }, [view]);

  if (view === 'cosmography') {
    return (
      <div className="relative" onKeyDown={handleKeyDown} tabIndex={0}>
        <CosmographyHero />
        <button
          onClick={() => setView('words')}
          className="fixed top-6 right-6 z-50 text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest"
        >
          Chiudi
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center cursor-default"
      style={{ background: 'linear-gradient(180deg, #050119 0%, #1a0a2e 50%, #2a0a1e 100%)' }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F5A623 0%, transparent 70%)' }} />
      </div>

      {/* Navigation minimal — top right */}
      <motion.nav
        className="fixed top-6 right-6 z-40 flex gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        {(['words', 'cosmography', 'about'] as ViewMode[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
              view === v ? 'text-white' : 'text-white/30 hover:text-white/60'
            }`}
          >
            {v === 'words' ? 'Essenza' : v === 'cosmography' ? 'Cosmografia' : 'Chi siamo'}
          </button>
        ))}
      </motion.nav>

      {/* Logo — top left */}
      <motion.div
        className="fixed top-6 left-6 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: entered ? 1 : 0, y: 0 }}
        transition={{ delay: 0.5, duration: 0.75 }}
      >
        <span className="text-white/80 text-sm uppercase tracking-[0.3em] font-light">
          Faggin Foundation
        </span>
      </motion.div>

      {view === 'about' ? (
        /* About overlay */
        <motion.div
          className="relative z-20 max-w-2xl mx-auto px-8 text-center"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/70 text-lg leading-relaxed font-light">
            La Federico and Elvia Faggin Foundation esplora il punto in cui scienza e spiritualità
            si incontrano. Fondata nel 2011 da Federico Faggin — inventore del microprocessore,
            oggi ricercatore sulla coscienza — la fondazione promuove una nuova comprensione
            della realtà dove la coscienza non è un prodotto della materia, ma il fondamento
            stesso dell&apos;esistenza.
          </p>
          <motion.button
            onClick={() => setView('cosmography')}
            className="mt-12 text-white/40 hover:text-white/80 text-sm uppercase tracking-[0.2em] transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Esplora i concetti &rarr;
          </motion.button>
        </motion.div>
      ) : (
        /* Main: floating concept words */
        <>
          {/* Central rotating quote */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={quoteIndex}
              className="relative z-10 max-w-3xl mx-auto px-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <p className="text-white/90 text-2xl md:text-4xl font-heading italic leading-relaxed">
                &ldquo;{QUOTES[quoteIndex]}&rdquo;
              </p>
              <footer className="mt-6 text-white/30 text-sm uppercase tracking-[0.2em]">
                Federico Faggin
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          {/* Floating concept words — scattered around */}
          <div className="absolute inset-0 pointer-events-none">
            {CONCEPT_WORDS.map((word, i) => {
              const positions = [
                'top-[15%] left-[10%]', 'top-[20%] right-[8%]',
                'bottom-[30%] left-[5%]', 'bottom-[15%] right-[12%]',
                'top-[45%] left-[3%]', 'top-[50%] right-[5%]',
                'bottom-[45%] left-[15%]',
              ];
              return (
                <motion.span
                  key={word.text}
                  className={`absolute ${positions[i]} ${word.size} font-heading font-bold pointer-events-auto cursor-pointer hidden md:block`}
                  style={{ color: word.color, opacity: 0.08 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.08 }}
                  whileHover={{ opacity: 0.4, scale: 1.1 }}
                  transition={{ delay: 1 + i * 0.3, duration: 1.5 }}
                  onClick={() => setView('cosmography')}
                >
                  {word.text}
                </motion.span>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="absolute bottom-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <motion.button
              onClick={() => setView('cosmography')}
              className="text-white/30 hover:text-white/60 text-xs uppercase tracking-[0.25em] transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              Entra nella cosmografia
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mt-2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </motion.button>
          </motion.div>
        </>
      )}
    </div>
  );
}

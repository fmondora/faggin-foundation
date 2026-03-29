'use client';

import { motion } from 'framer-motion';
import type { Concept } from '@/types/strapi';

interface ConceptOverlay3DProps {
  concept: Concept;
  color: string;
  onClose: () => void;
  spaceLabel?: string;
  watchVideoLabel?: string;
}

export default function ConceptOverlay3D({ concept, color, onClose, spaceLabel, watchVideoLabel }: ConceptOverlay3DProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        className="relative z-10 max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 100%)' }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color accent bar */}
        <div className="h-1" style={{ backgroundColor: color }} />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color }}>
                {spaceLabel || (concept.space === 'C' ? 'Coscienza' : concept.space === 'I' ? 'Informazione' : 'Fisico')}
              </p>
              <h2 className="font-heading text-3xl text-white font-bold">
                {concept.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/70 transition-colors text-2xl leading-none"
              aria-label="Chiudi"
            >
              &times;
            </button>
          </div>

          {/* Description */}
          <p className="text-white/70 leading-relaxed mb-6">
            {concept.shortDescription}
          </p>

          {/* Quote */}
          {concept.quote && (
            <blockquote className="border-l-2 pl-4 italic text-white/50 text-sm leading-relaxed" style={{ borderColor: color }}>
              &ldquo;{concept.quote}&rdquo;
            </blockquote>
          )}

          {/* Video link */}
          {concept.video && (
            <a
              href={`https://www.youtube.com/watch?v=${concept.video}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-sm font-medium px-5 py-2 rounded-full border transition-colors"
              style={{ borderColor: color, color }}
            >
              {watchVideoLabel || 'Guarda il video'} &rarr;
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

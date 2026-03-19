'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Concept } from '@/types/strapi';
import { SPACE_COLORS, SPACE_LABELS, type OntologicalSpace } from '@/data/concepts';
import { getYoutubeEmbedUrl } from '@/lib/youtube';

interface ConceptOverlayProps {
  concept: Concept;
  onClose: () => void;
}

export default function ConceptOverlay({ concept, onClose }: ConceptOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const space = concept.space as OntologicalSpace;
  const color = SPACE_COLORS[space].primary;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    overlayRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const videoUrl = concept.video?.youtubeId
    ? getYoutubeEmbedUrl(concept.video.youtubeId)
    : null;

  return (
    <motion.div
      ref={overlayRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Content */}
      <motion.div
        className="relative bg-[#1a1a2e] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        style={{ borderTop: `3px solid ${color}` }}
      >
        <button
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl leading-none"
        >
          ×
        </button>

        <p className="text-sm uppercase tracking-wider mb-2" style={{ color }}>
          {SPACE_LABELS[space]}
        </p>
        <h2 className="font-heading text-3xl font-bold text-white mb-4">
          {concept.name}
        </h2>
        <p className="text-white/80 text-lg leading-relaxed mb-6">
          {concept.shortDescription}
        </p>

        {videoUrl && (
          <div className="aspect-video mb-6 rounded overflow-hidden">
            <iframe
              src={videoUrl}
              title={concept.name}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {concept.deepLinkPage && (
          <a
            href={concept.deepLinkPage}
            className="inline-block text-sm font-bold px-6 py-2 rounded transition-colors"
            style={{ backgroundColor: color, color: 'white' }}
          >
            Approfondisci →
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Concept } from '@/types/strapi';
import { FALLBACK_CONCEPTS, SPACE_COLORS, SPACE_LABELS, type OntologicalSpace } from '@/data/concepts';
import OntologicalRing from './OntologicalRing';
import SeityParticles from './SeityParticles';
import ConceptOverlay from './ConceptOverlay';

interface CosmographyHeroProps {
  concepts?: Concept[];
}

const SPACES: OntologicalSpace[] = ['F', 'I', 'C'];
const BASE_RADII = { F: 220, I: 150, C: 80 };
const CENTER = { x: 400, y: 350 };
const SVG_SIZE = { width: 800, height: 700 };

function useWindowSize() {
  const [size, setSize] = useState({ width: 1200, height: 800 });
  useEffect(() => {
    function update() { setSize({ width: window.innerWidth, height: window.innerHeight }); }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

export default function CosmographyHero({ concepts }: CosmographyHeroProps) {
  const allConcepts = concepts?.length ? concepts : FALLBACK_CONCEPTS;
  const [activeSpace, setActiveSpace] = useState<OntologicalSpace | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const size = useWindowSize();
  const scale = Math.min(size.width / 800, 1);
  const radii = { F: BASE_RADII.F * scale, I: BASE_RADII.I * scale, C: BASE_RADII.C * scale };
  const particleCount = size.width < 768 ? 30 : 60;

  const handleActivate = useCallback((space: OntologicalSpace) => {
    setActiveSpace(space);
  }, []);

  const handleDeactivate = useCallback(() => {
    setActiveSpace(null);
  }, []);

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 100%)' }}
      onMouseLeave={handleDeactivate}
    >
      {/* Particles */}
      <SeityParticles
        width={size.width}
        height={size.height}
        activeSpace={activeSpace}
        particleCount={particleCount}
      />

      {/* Quote */}
      <motion.p
        className="absolute top-8 left-0 right-0 text-center text-white/60 text-lg italic font-heading px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        &ldquo;Noi siamo luce, dobbiamo solo aprire gli occhi&rdquo;
      </motion.p>

      {/* SVG Cosmography */}
      <motion.svg
        viewBox={`0 0 ${SVG_SIZE.width} ${SVG_SIZE.height}`}
        className="relative z-10 w-full max-w-3xl h-auto px-4"
        role="img"
        aria-label="Cosmografia degli spazi ontologici: Coscienza, Informazione, Fisico"
      >
        {SPACES.map((space) => (
          <OntologicalRing
            key={space}
            space={space}
            radius={radii[space]}
            cx={CENTER.x}
            cy={CENTER.y}
            color={SPACE_COLORS[space].primary}
            label={SPACE_LABELS[space]}
            concepts={allConcepts.filter(c => c.space === space)}
            isActive={activeSpace === null || activeSpace === space}
            onActivate={handleActivate}
            onConceptClick={setSelectedConcept}
          />
        ))}
      </motion.svg>

      {/* Explore arrow */}
      <motion.div
        className="absolute bottom-8 text-white/40 text-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <p className="text-sm mb-2 tracking-wider uppercase">Esplora</p>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>

      {/* Concept overlay */}
      <AnimatePresence>
        {selectedConcept && (
          <ConceptOverlay
            concept={selectedConcept}
            onClose={() => setSelectedConcept(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

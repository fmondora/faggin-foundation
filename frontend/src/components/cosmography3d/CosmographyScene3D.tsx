'use client';

import { useState, useCallback, useMemo, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import type { Concept } from '@/types/strapi';
import { translateConcepts } from '@/data/concepts-i18n';
import { SPACE_COLORS } from '@/data/concepts';
import { buildConceptNodes, type ConceptNode3D } from './data';
import ConceptSphere from './ConceptSphere';
import ConnectionLines from './ConnectionLines';
import OrbitRing from './OrbitRing';
import ConceptOverlay3D from './ConceptOverlay3D';
import NebulaBackground from './NebulaBackground';
import ConsciousnessBeacon from './ConsciousnessBeacon';

const QUOTE_COUNT = 10;

interface CosmographyScene3DProps {
  concepts?: Concept[];
}

export default function CosmographyScene3D({ concepts }: CosmographyScene3DProps) {
  const tNav = useTranslations();
  const tCosmo = useTranslations('cosmo');
  const locale = useLocale();
  // Dynamic import of extended concepts + locale translation
  const [extendedConcepts, setExtendedConcepts] = useState<Concept[] | null>(null);
  const [extendedConnections, setExtendedConnections] = useState<{ from: string; to: string }[] | null>(null);

  useEffect(() => {
    import('@/data/concepts-extended').then(async (mod) => {
      const translated = await translateConcepts(mod.EXTENDED_CONCEPTS, locale);
      setExtendedConcepts(translated);
      setExtendedConnections(mod.EXTENDED_CONNECTIONS);
    }).catch(() => {
      import('@/data/concepts').then(async (mod) => {
        const translated = await translateConcepts(mod.FALLBACK_CONCEPTS, locale);
        setExtendedConcepts(translated);
      });
    });
  }, [locale]);

  const allConcepts = concepts || extendedConcepts;
  const nodes = useMemo(() => allConcepts ? buildConceptNodes(allConcepts) : [], [allConcepts]);

  const [selected, setSelected] = useState<ConceptNode3D | null>(null);
  const [hovered, setHovered] = useState<ConceptNode3D | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(i => (i + 1) % QUOTE_COUNT);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = useCallback((node: ConceptNode3D) => {
    setSelected(prev => prev?.concept.documentId === node.concept.documentId ? null : node);
  }, []);

  const handleHover = useCallback((node: ConceptNode3D | null) => {
    setHovered(node);
  }, []);

  const connections = extendedConnections || [];

  if (!nodes.length) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <p className="text-white/30 text-sm uppercase tracking-widest animate-pulse">
          {tCosmo('loading')}
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      <Canvas
        camera={{ position: [0, 10, 22], fov: 55 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onPointerMissed={() => setSelected(null)}
      >
        <color attach="background" args={['#030010']} />
        <fog attach="fog" args={['#030010', 20, 45]} />

        {/* Lighting — ambient kept low so the beacon dominates */}
        <ambientLight intensity={0.15} />
        <pointLight position={[0, 15, 0]} intensity={0.8} color="#F5A623" distance={40} />
        <pointLight position={[15, -8, 15]} intensity={0.8} color="#3498DB" distance={35} />
        <pointLight position={[-15, -8, -15]} intensity={0.8} color="#9B59B6" distance={35} />
        <pointLight position={[0, -12, 0]} intensity={0.3} color="#1a0a2e" distance={30} />

        <Suspense fallback={null}>
          {/* Deep stars */}
          <Stars radius={80} depth={80} count={5000} factor={4} saturation={0.3} fade speed={0.3} />

          {/* Il faro della coscienza — luce centrale che illumina l'universo */}
          <ConsciousnessBeacon />

          {/* Nebula clouds */}
          <NebulaBackground />

          {/* Orbit rings — multiple per space for density */}
          <OrbitRing radius={2.5} color={SPACE_COLORS.C.primary} label="" />
          <OrbitRing radius={3.5} color={SPACE_COLORS.C.primary} label="" />
          <OrbitRing radius={4.5} color={SPACE_COLORS.C.primary} label="" />
          <OrbitRing radius={6} color={SPACE_COLORS.I.primary} label="" />
          <OrbitRing radius={7} color={SPACE_COLORS.I.primary} label="" />
          <OrbitRing radius={8} color={SPACE_COLORS.I.primary} label="" />
          <OrbitRing radius={9.5} color={SPACE_COLORS.F.primary} label="" />
          <OrbitRing radius={11} color={SPACE_COLORS.F.primary} label="" />
          <OrbitRing radius={12.5} color={SPACE_COLORS.F.primary} label="" />

          {/* Connection lines */}
          <ConnectionLines
            nodes={nodes}
            connections={connections}
            hoveredId={hovered?.concept.documentId || null}
            selectedId={selected?.concept.documentId || null}
          />

          {/* Concept spheres */}
          {nodes.map((node) => (
            <ConceptSphere
              key={node.concept.documentId}
              node={node}
              isSelected={selected?.concept.documentId === node.concept.documentId}
              onSelect={handleSelect}
              onHover={handleHover}
            />
          ))}
        </Suspense>

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={4}
          maxDistance={35}
          maxPolarAngle={Math.PI * 0.85}
          minPolarAngle={Math.PI * 0.15}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>

      {/* HTML Overlays */}
      <AnimatePresence mode="wait">
        <motion.p
          key={quoteIndex}
          className="fixed top-8 left-0 right-0 text-center text-white/40 text-lg italic font-heading px-12 z-30 pointer-events-none max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 1 }}
        >
          &ldquo;{tCosmo(`quotes.${quoteIndex}`)}&rdquo;
        </motion.p>
      </AnimatePresence>

      {!selected && !hovered && (
        <motion.p
          className="fixed bottom-8 left-0 right-0 text-center text-white/20 text-xs uppercase tracking-[0.2em] z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          {tCosmo('hint')}
        </motion.p>
      )}

      {/* Chat with Federico — link */}
      <Link
        href={'/prototypes/chat' as any}
        className="fixed bottom-8 left-6 z-40 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F5A623]/40 transition-all group backdrop-blur-sm"
      >
        <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: '#F5A623' }}>
          ◉
        </span>
        <span className="text-white/50 group-hover:text-white/90 text-sm transition-colors">
          {tNav('nav_chat')}
        </span>
        <span className="text-white/20 group-hover:text-white/50 text-xs transition-colors">AI</span>
      </Link>

      {/* Legend */}
      <div className="fixed bottom-8 right-6 z-30 flex flex-col gap-2 text-right">
        {[
          { label: tCosmo('spaceC'), color: SPACE_COLORS.C.primary, count: nodes.filter(n => n.concept.space === 'C').length },
          { label: tCosmo('spaceI'), color: SPACE_COLORS.I.primary, count: nodes.filter(n => n.concept.space === 'I').length },
          { label: tCosmo('spaceF'), color: SPACE_COLORS.F.primary, count: nodes.filter(n => n.concept.space === 'F').length },
        ].map(({ label, color, count }) => (
          <div key={label} className="flex items-center gap-2 justify-end">
            <span className="text-white/30 text-xs">{count}</span>
            <span className="text-white/40 text-xs uppercase tracking-widest">{label}</span>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.6 }} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ConceptOverlay3D
            concept={selected.concept}
            color={selected.color}
            onClose={() => setSelected(null)}
            spaceLabel={selected.concept.space === 'C' ? tCosmo('spaceC') : selected.concept.space === 'I' ? tCosmo('spaceI') : tCosmo('spaceF')}
            watchVideoLabel={tCosmo('watchVideo')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

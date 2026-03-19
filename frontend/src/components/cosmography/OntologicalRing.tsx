'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Concept } from '@/types/strapi';
import type { OntologicalSpace } from '@/data/concepts';
import ConceptNode from './ConceptNode';

interface OntologicalRingProps {
  space: OntologicalSpace;
  radius: number;
  cx: number;
  cy: number;
  color: string;
  label: string;
  concepts: Concept[];
  isActive: boolean;
  onActivate: (space: OntologicalSpace) => void;
  onConceptClick: (concept: Concept) => void;
}

export default function OntologicalRing({
  space,
  radius,
  cx,
  cy,
  color,
  label,
  concepts,
  isActive,
  onActivate,
  onConceptClick,
}: OntologicalRingProps) {
  return (
    <motion.g
      onMouseEnter={() => onActivate(space)}
      onTouchStart={() => onActivate(space)}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow filter */}
      <defs>
        <filter id={`glow-${space}`}>
          <feGaussianBlur stdDeviation={isActive ? 8 : 4} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ring circle */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={isActive ? 2 : 1}
        filter={`url(#glow-${space})`}
        animate={{ r: isActive ? radius + 5 : radius }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />

      {/* Label */}
      <motion.text
        x={cx}
        y={cy - radius - 12}
        textAnchor="middle"
        fill={color}
        fontSize={13}
        fontFamily="var(--font-body)"
        letterSpacing="0.1em"
        style={{ textTransform: 'uppercase' }}
      >
        {label}
      </motion.text>

      {/* Concept nodes around perimeter */}
      <AnimatePresence>
        {isActive &&
          concepts.map((concept, i) => {
            const angle = (i / concepts.length) * Math.PI * 2 - Math.PI / 2;
            const nodeX = cx + Math.cos(angle) * (radius + 40);
            const nodeY = cy + Math.sin(angle) * (radius + 40);
            return (
              <ConceptNode
                key={concept.documentId}
                name={concept.name}
                x={nodeX}
                y={nodeY}
                color={color}
                onClick={() => onConceptClick(concept)}
              />
            );
          })}
      </AnimatePresence>
    </motion.g>
  );
}

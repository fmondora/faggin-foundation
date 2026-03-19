'use client';

import { motion } from 'framer-motion';

interface ConceptNodeProps {
  name: string;
  x: number;
  y: number;
  color: string;
  onClick: () => void;
}

export default function ConceptNode({ name, x, y, color, onClick }: ConceptNodeProps) {
  return (
    <motion.g
      role="button"
      aria-label={name}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      style={{ cursor: 'pointer' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <motion.circle
        cx={x}
        cy={y}
        r={28}
        fill={color}
        fillOpacity={0.15}
        stroke={color}
        strokeWidth={1.5}
        whileHover={{ fillOpacity: 0.35, r: 32 }}
        transition={{ duration: 0.2 }}
      />
      <circle cx={x} cy={y} r={4} fill={color} />
      <motion.text
        x={x}
        y={y + 42}
        textAnchor="middle"
        fill="white"
        fontSize={12}
        fontFamily="var(--font-body)"
        whileHover={{ fill: color }}
      >
        {name}
      </motion.text>
    </motion.g>
  );
}

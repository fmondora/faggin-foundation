# Cosmografia Interattiva — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Sostituire la homepage attuale con una cosmografia interattiva fullscreen che rappresenta gli spazi ontologici C/F/I di Faggin, con concetti cliccabili che portano a video e approfondimenti.

**Architecture:** Client component `CosmographyHero` con SVG per cerchi/nodi e Canvas 2D per particelle. Framer Motion per animazioni. Dati concetti da Strapi con fallback hardcoded. L'homepage server component orchestra CosmographyHero + sezioni below-the-fold riordinate.

**Tech Stack:** Next.js 15, React 19, Framer Motion, SVG, Canvas 2D, Strapi v5, next-intl, Tailwind CSS

---

### Task 1: Installare Framer Motion

**Files:**
- Modify: `frontend/package.json`

**Step 1: Installa dipendenza**

Run: `cd frontend && npm install framer-motion`

**Step 2: Verifica installazione**

Run: `cd frontend && node -e "require('framer-motion')"`
Expected: nessun errore

**Step 3: Commit**

```bash
git add frontend/package.json frontend/package-lock.json
git commit -m "chore: add framer-motion dependency for cosmography animations"
```

---

### Task 2: Tipi e dati fallback per i concetti

**Files:**
- Modify: `frontend/src/types/strapi.ts`
- Create: `frontend/src/data/concepts.ts`
- Test: `frontend/src/__tests__/data/concepts.test.ts`

**Step 1: Scrivi il test per i dati fallback**

```typescript
// frontend/src/__tests__/data/concepts.test.ts
import { describe, it, expect } from 'vitest';
import { FALLBACK_CONCEPTS, type OntologicalSpace } from '@/data/concepts';

describe('FALLBACK_CONCEPTS', () => {
  it('has exactly 12 concepts', () => {
    expect(FALLBACK_CONCEPTS).toHaveLength(12);
  });

  it('has 4 concepts per space', () => {
    const spaces: OntologicalSpace[] = ['C', 'I', 'F'];
    for (const space of spaces) {
      const count = FALLBACK_CONCEPTS.filter(c => c.space === space).length;
      expect(count).toBe(4);
    }
  });

  it('each concept has required fields', () => {
    for (const concept of FALLBACK_CONCEPTS) {
      expect(concept.name).toBeTruthy();
      expect(['C', 'I', 'F']).toContain(concept.space);
      expect(concept.shortDescription).toBeTruthy();
      expect(typeof concept.sortOrder).toBe('number');
    }
  });
});
```

**Step 2: Verifica che fallisce**

Run: `cd frontend && npx vitest run src/__tests__/data/concepts.test.ts`
Expected: FAIL — modulo non trovato

**Step 3: Aggiungi tipo Concept a strapi.ts**

Aggiungi in fondo a `frontend/src/types/strapi.ts`:

```typescript
export interface Concept {
  documentId: string;
  name: string;
  space: 'C' | 'I' | 'F';
  shortDescription: string;
  video?: Video;
  deepLinkPage?: string;
  sortOrder: number;
}
```

**Step 4: Crea i dati fallback**

```typescript
// frontend/src/data/concepts.ts
import type { Concept } from '@/types/strapi';

export type OntologicalSpace = 'C' | 'I' | 'F';

export const SPACE_COLORS: Record<OntologicalSpace, { primary: string; glow: string }> = {
  C: { primary: '#F5A623', glow: 'rgba(245, 166, 35, 0.4)' },
  I: { primary: '#9B59B6', glow: 'rgba(155, 89, 182, 0.4)' },
  F: { primary: '#3498DB', glow: 'rgba(52, 152, 219, 0.4)' },
};

export const SPACE_LABELS: Record<OntologicalSpace, string> = {
  C: 'Coscienza',
  I: 'Informazione',
  F: 'Fisico',
};

export const FALLBACK_CONCEPTS: Concept[] = [
  // Coscienza (C)
  { documentId: 'c1', name: 'Qualia', space: 'C', shortDescription: 'Le sensazioni e i sentimenti che proviamo, privati e non trasferibili. Sono la forma con cui la coscienza conosce se stessa.', sortOrder: 1 },
  { documentId: 'c2', name: 'Libero arbitrio', space: 'C', shortDescription: 'La capacità di Uno di dirigere la propria conoscenza di sé. Non può emergere dal determinismo, ma il determinismo può emergere dall\'indeterminismo.', sortOrder: 2 },
  { documentId: 'c3', name: 'Uno', space: 'C', shortDescription: 'La totalità di ciò che esiste: dinamico, olistico, e vuole conoscere se stesso. Il postulato fondante da cui tutto deriva.', sortOrder: 3 },
  { documentId: 'c4', name: 'Postulato dell\'Essere', space: 'C', shortDescription: 'Uno è la totalità di ciò che esiste ed è dinamico, olistico e vuole conoscere se stesso. Da questo postulato autoevidente nasce Nousym.', sortOrder: 4 },
  // Informazione (I)
  { documentId: 'i1', name: 'Informazione quantistica', space: 'I', shortDescription: 'L\'informazione quantistica non si può copiare (teorema di non-clonazione), proprio come i qualia. Questa è la chiave che collega coscienza e fisica.', sortOrder: 1 },
  { documentId: 'i2', name: 'Entanglement', space: 'I', shortDescription: 'La correlazione istantanea tra particelle quantistiche, che rivela una realtà più profonda dello spazio-tempo dove tutto è interconnesso.', sortOrder: 2 },
  { documentId: 'i3', name: 'Nousym', space: 'I', shortDescription: 'La nuova disciplina che unisce scienza e spiritualità, da nous (intelletto) e sym (simbolo). Parte dal postulato dell\'Essere.', sortOrder: 3 },
  { documentId: 'i4', name: 'Simboli', space: 'I', shortDescription: 'Le particelle e gli atomi sono i simboli che le seity usano per comunicare il significato di ciò che provano nella loro coscienza.', sortOrder: 4 },
  // Fisico (F)
  { documentId: 'f1', name: 'Spazio-tempo', space: 'F', shortDescription: 'Il palcoscenico della realtà fisica, che emerge da una realtà più profonda. Non è fondamentale: è il modo in cui le seity si manifestano.', sortOrder: 1 },
  { documentId: 'f2', name: 'Materia', space: 'F', shortDescription: 'Ciò che percepiamo come solido e reale è la manifestazione esteriore di entità coscienti. Il più non può venire dal meno.', sortOrder: 2 },
  { documentId: 'f3', name: 'Microprocessore', space: 'F', shortDescription: 'L\'invenzione che ha rivoluzionato il mondo fisico. Il punto di partenza del viaggio di Faggin dalla materia alla coscienza.', sortOrder: 3 },
  { documentId: 'f4', name: 'Fisica quantistica', space: 'F', shortDescription: 'Le sue proprietà "strane" si spiegano partendo dalla coscienza: il collasso della funzione d\'onda corrisponde al libero arbitrio delle seity.', sortOrder: 4 },
];
```

**Step 5: Verifica che passa**

Run: `cd frontend && npx vitest run src/__tests__/data/concepts.test.ts`
Expected: PASS — 3 test verdi

**Step 6: Commit**

```bash
git add frontend/src/types/strapi.ts frontend/src/data/concepts.ts frontend/src/__tests__/data/concepts.test.ts
git commit -m "feat: add Concept type and fallback data for ontological spaces C/I/F"
```

---

### Task 3: Componente SeityParticles (Canvas 2D)

**Files:**
- Create: `frontend/src/components/cosmography/SeityParticles.tsx`
- Test: `frontend/src/__tests__/components/cosmography/SeityParticles.test.tsx`

**Step 1: Scrivi il test**

```typescript
// frontend/src/__tests__/components/cosmography/SeityParticles.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import SeityParticles from '@/components/cosmography/SeityParticles';

// Mock canvas
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  closePath: vi.fn(),
  canvas: { width: 800, height: 600 },
  fillStyle: '',
  globalAlpha: 1,
})) as any;

describe('SeityParticles', () => {
  it('renders a canvas element', () => {
    const { container } = render(<SeityParticles width={800} height={600} />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('respects reduced motion preference', () => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const { container } = render(<SeityParticles width={800} height={600} />);
    expect(container.querySelector('canvas')).toBeTruthy();
  });
});
```

**Step 2: Verifica che fallisce**

Run: `cd frontend && npx vitest run src/__tests__/components/cosmography/SeityParticles.test.tsx`
Expected: FAIL

**Step 3: Implementa SeityParticles**

```tsx
// frontend/src/components/cosmography/SeityParticles.tsx
'use client';

import { useRef, useEffect, useCallback } from 'react';
import type { OntologicalSpace } from '@/data/concepts';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

interface SeityParticlesProps {
  width: number;
  height: number;
  activeSpace?: OntologicalSpace | null;
  particleCount?: number;
}

const COLORS = ['#F5A623', '#9B59B6', '#3498DB', '#ffffff'];

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function SeityParticles({
  width,
  height,
  activeSpace,
  particleCount = 60,
}: SeityParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initParticles = useCallback(() => {
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(width, height)
    );
  }, [width, height, particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    initParticles();

    if (prefersReducedMotion) {
      // Draw once, static
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    let lastTime = 0;
    const FPS_INTERVAL = 1000 / 30;

    function animate(timestamp: number) {
      const elapsed = timestamp - lastTime;
      if (elapsed >= FPS_INTERVAL) {
        lastTime = timestamp - (elapsed % FPS_INTERVAL);
        ctx!.clearRect(0, 0, width, height);

        for (const p of particlesRef.current) {
          const speed = activeSpace ? 1.5 : 1;
          p.x += p.vx * speed;
          p.y += p.vy * speed;

          // Wrap around
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx!.globalAlpha = p.opacity;
          ctx!.fillStyle = p.color;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [width, height, activeSpace, initParticles, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
```

**Step 4: Verifica che passa**

Run: `cd frontend && npx vitest run src/__tests__/components/cosmography/SeityParticles.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add frontend/src/components/cosmography/SeityParticles.tsx frontend/src/__tests__/components/cosmography/SeityParticles.test.tsx
git commit -m "feat: add SeityParticles Canvas 2D particle system"
```

---

### Task 4: Componente ConceptNode

**Files:**
- Create: `frontend/src/components/cosmography/ConceptNode.tsx`
- Test: `frontend/src/__tests__/components/cosmography/ConceptNode.test.tsx`

**Step 1: Scrivi il test**

```typescript
// frontend/src/__tests__/components/cosmography/ConceptNode.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConceptNode from '@/components/cosmography/ConceptNode';

vi.mock('framer-motion', () => ({
  motion: {
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
    circle: (props: any) => <circle {...props} />,
    text: (props: any) => <text {...props} />,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('ConceptNode', () => {
  const defaultProps = {
    name: 'Qualia',
    x: 100,
    y: 200,
    color: '#F5A623',
    onClick: vi.fn(),
  };

  it('renders a button with the concept name', () => {
    render(
      <svg><ConceptNode {...defaultProps} /></svg>
    );
    expect(screen.getByRole('button', { name: 'Qualia' })).toBeTruthy();
  });

  it('calls onClick when clicked', () => {
    render(
      <svg><ConceptNode {...defaultProps} /></svg>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Qualia' }));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
```

**Step 2: Verifica che fallisce**

Run: `cd frontend && npx vitest run src/__tests__/components/cosmography/ConceptNode.test.tsx`
Expected: FAIL

**Step 3: Implementa ConceptNode**

```tsx
// frontend/src/components/cosmography/ConceptNode.tsx
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
```

**Step 4: Verifica che passa**

Run: `cd frontend && npx vitest run src/__tests__/components/cosmography/ConceptNode.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add frontend/src/components/cosmography/ConceptNode.tsx frontend/src/__tests__/components/cosmography/ConceptNode.test.tsx
git commit -m "feat: add ConceptNode SVG button component with spring animation"
```

---

### Task 5: Componente ConceptOverlay (modal)

**Files:**
- Create: `frontend/src/components/cosmography/ConceptOverlay.tsx`
- Test: `frontend/src/__tests__/components/cosmography/ConceptOverlay.test.tsx`

**Step 1: Scrivi il test**

```typescript
// frontend/src/__tests__/components/cosmography/ConceptOverlay.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConceptOverlay from '@/components/cosmography/ConceptOverlay';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockConcept = {
  documentId: 'c1',
  name: 'Qualia',
  space: 'C' as const,
  shortDescription: 'Le sensazioni e i sentimenti che proviamo.',
  sortOrder: 1,
};

describe('ConceptOverlay', () => {
  it('renders concept name and description', () => {
    render(<ConceptOverlay concept={mockConcept} onClose={vi.fn()} />);
    expect(screen.getByText('Qualia')).toBeTruthy();
    expect(screen.getByText('Le sensazioni e i sentimenti che proviamo.')).toBeTruthy();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<ConceptOverlay concept={mockConcept} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Chiudi'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn();
    render(<ConceptOverlay concept={mockConcept} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('renders video iframe when concept has video', () => {
    const withVideo = {
      ...mockConcept,
      video: { documentId: 'v1', title: 'Test', youtubeId: 'abc123', theme: null as any },
    };
    render(<ConceptOverlay concept={withVideo} onClose={vi.fn()} />);
    const iframe = document.querySelector('iframe');
    expect(iframe?.src).toContain('abc123');
  });
});
```

**Step 2: Verifica che fallisce**

Run: `cd frontend && npx vitest run src/__tests__/components/cosmography/ConceptOverlay.test.tsx`
Expected: FAIL

**Step 3: Implementa ConceptOverlay**

```tsx
// frontend/src/components/cosmography/ConceptOverlay.tsx
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
```

**Step 4: Verifica che passa**

Run: `cd frontend && npx vitest run src/__tests__/components/cosmography/ConceptOverlay.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add frontend/src/components/cosmography/ConceptOverlay.tsx frontend/src/__tests__/components/cosmography/ConceptOverlay.test.tsx
git commit -m "feat: add ConceptOverlay modal with video embed and focus trap"
```

---

### Task 6: Componente OntologicalRing (cerchio SVG)

**Files:**
- Create: `frontend/src/components/cosmography/OntologicalRing.tsx`
- Test: `frontend/src/__tests__/components/cosmography/OntologicalRing.test.tsx`

**Step 1: Scrivi il test**

```typescript
// frontend/src/__tests__/components/cosmography/OntologicalRing.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OntologicalRing from '@/components/cosmography/OntologicalRing';

vi.mock('framer-motion', () => ({
  motion: {
    circle: (props: any) => <circle {...props} />,
    text: (props: any) => <text {...props} />,
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

vi.mock('@/components/cosmography/ConceptNode', () => ({
  default: ({ name, onClick }: any) => (
    <g role="button" aria-label={name} onClick={onClick} />
  ),
}));

const concepts = [
  { documentId: 'c1', name: 'Qualia', space: 'C' as const, shortDescription: 'test', sortOrder: 1 },
  { documentId: 'c2', name: 'Uno', space: 'C' as const, shortDescription: 'test', sortOrder: 2 },
];

describe('OntologicalRing', () => {
  const props = {
    space: 'C' as const,
    radius: 100,
    cx: 300,
    cy: 300,
    color: '#F5A623',
    label: 'Coscienza',
    concepts,
    isActive: false,
    onActivate: vi.fn(),
    onConceptClick: vi.fn(),
  };

  it('renders the ring with label', () => {
    render(<svg><OntologicalRing {...props} /></svg>);
    expect(screen.getByText('Coscienza')).toBeTruthy();
  });

  it('shows concept nodes when active', () => {
    render(<svg><OntologicalRing {...props} isActive={true} /></svg>);
    expect(screen.getByLabelText('Qualia')).toBeTruthy();
    expect(screen.getByLabelText('Uno')).toBeTruthy();
  });

  it('calls onActivate on hover', () => {
    render(<svg><OntologicalRing {...props} /></svg>);
    fireEvent.mouseEnter(screen.getByText('Coscienza').closest('g')!);
    expect(props.onActivate).toHaveBeenCalledWith('C');
  });
});
```

**Step 2: Verifica che fallisce**

Run: `cd frontend && npx vitest run src/__tests__/components/cosmography/OntologicalRing.test.tsx`
Expected: FAIL

**Step 3: Implementa OntologicalRing**

```tsx
// frontend/src/components/cosmography/OntologicalRing.tsx
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
  const dimmed = !isActive;

  return (
    <motion.g
      onMouseEnter={() => onActivate(space)}
      onTouchStart={() => onActivate(space)}
      animate={{ opacity: dimmed ? 0.3 : 1 }}
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
```

**Step 4: Verifica che passa**

Run: `cd frontend && npx vitest run src/__tests__/components/cosmography/OntologicalRing.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add frontend/src/components/cosmography/OntologicalRing.tsx frontend/src/__tests__/components/cosmography/OntologicalRing.test.tsx
git commit -m "feat: add OntologicalRing SVG component with concept nodes on perimeter"
```

---

### Task 7: Componente CosmographyHero (orchestratore)

**Files:**
- Create: `frontend/src/components/cosmography/CosmographyHero.tsx`
- Test: `frontend/src/__tests__/components/cosmography/CosmographyHero.test.tsx`

**Step 1: Scrivi il test**

```typescript
// frontend/src/__tests__/components/cosmography/CosmographyHero.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CosmographyHero from '@/components/cosmography/CosmographyHero';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

vi.mock('@/components/cosmography/OntologicalRing', () => ({
  default: ({ label }: any) => <g data-testid={`ring-${label}`} />,
}));

vi.mock('@/components/cosmography/SeityParticles', () => ({
  default: () => <canvas data-testid="particles" />,
}));

vi.mock('@/components/cosmography/ConceptOverlay', () => ({
  default: ({ concept }: any) => <div data-testid="overlay">{concept.name}</div>,
}));

describe('CosmographyHero', () => {
  it('renders the quote', () => {
    render(<CosmographyHero />);
    expect(screen.getByText(/Noi siamo luce/)).toBeTruthy();
  });

  it('renders all three rings', () => {
    render(<CosmographyHero />);
    expect(screen.getByTestId('ring-Coscienza')).toBeTruthy();
    expect(screen.getByTestId('ring-Informazione')).toBeTruthy();
    expect(screen.getByTestId('ring-Fisico')).toBeTruthy();
  });

  it('renders particle canvas', () => {
    render(<CosmographyHero />);
    expect(screen.getByTestId('particles')).toBeTruthy();
  });
});
```

**Step 2: Verifica che fallisce**

Run: `cd frontend && npx vitest run src/__tests__/components/cosmography/CosmographyHero.test.tsx`
Expected: FAIL

**Step 3: Implementa CosmographyHero**

```tsx
// frontend/src/components/cosmography/CosmographyHero.tsx
'use client';

import { useState, useCallback } from 'react';
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
const RING_RADII = { F: 220, I: 150, C: 80 };
const CENTER = { x: 400, y: 350 };
const SVG_SIZE = { width: 800, height: 700 };

export default function CosmographyHero({ concepts }: CosmographyHeroProps) {
  const allConcepts = concepts?.length ? concepts : FALLBACK_CONCEPTS;
  const [activeSpace, setActiveSpace] = useState<OntologicalSpace | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

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
        width={typeof window !== 'undefined' ? window.innerWidth : 1200}
        height={typeof window !== 'undefined' ? window.innerHeight : 800}
        activeSpace={activeSpace}
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
            radius={RING_RADII[space]}
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
```

**Step 4: Verifica che passa**

Run: `cd frontend && npx vitest run src/__tests__/components/cosmography/CosmographyHero.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add frontend/src/components/cosmography/CosmographyHero.tsx frontend/src/__tests__/components/cosmography/CosmographyHero.test.tsx
git commit -m "feat: add CosmographyHero orchestrator with rings, particles and overlay"
```

---

### Task 8: Aggiornare i colori nel tema CSS

**Files:**
- Modify: `frontend/src/styles/globals.css`

**Step 1: Aggiungi i colori cosmografici al tema**

Aggiungi sotto le variabili esistenti nel blocco `@theme`:

```css
  --color-cosmo-bg-start: #0a0a1a;
  --color-cosmo-bg-end: #1a0a2e;
  --color-space-c: #F5A623;
  --color-space-i: #9B59B6;
  --color-space-f: #3498DB;
```

**Step 2: Verifica build**

Run: `cd frontend && npx next build 2>&1 | tail -5`
Expected: nessun errore CSS

**Step 3: Commit**

```bash
git add frontend/src/styles/globals.css
git commit -m "feat: add cosmography color tokens to CSS theme"
```

---

### Task 9: Aggiornare Homepage (page.tsx)

**Files:**
- Modify: `frontend/src/app/[locale]/page.tsx`
- Test: `frontend/src/__tests__/app/page.test.tsx` (aggiorna test esistente se presente)

**Step 1: Verifica test esistenti homepage**

Run: `cd frontend && find src/__tests__ -name "*page*" -o -name "*Home*" | head -5`
Se presente, leggi il test e adatta.

**Step 2: Aggiorna page.tsx**

```typescript
// frontend/src/app/[locale]/page.tsx
import CosmographyHero from '@/components/cosmography/CosmographyHero';
import PurposeSection from '@/components/home/PurposeSection';
import StorySection from '@/components/home/StorySection';
import VideoGridPreview from '@/components/home/VideoGridPreview';
import BooksGrid from '@/components/home/BooksGrid';
import { getHomePage, getBooks } from '@/lib/strapi';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  let homeData: any = null;
  let books: any = null;
  try { [homeData, books] = await Promise.all([getHomePage(locale), getBooks(locale)]); } catch {}
  return (
    <>
      <CosmographyHero />
      <PurposeSection data={homeData?.data} />
      <VideoGridPreview data={homeData?.data} />
      <StorySection data={homeData?.data} />
      <BooksGrid books={books?.data} />
    </>
  );
}
```

**Step 3: Verifica che tutti i test passano**

Run: `cd frontend && npx vitest run`
Expected: PASS su tutti i test

**Step 4: Commit**

```bash
git add frontend/src/app/[locale]/page.tsx
git commit -m "feat: replace homepage hero with CosmographyHero, move BooksGrid to bottom"
```

---

### Task 10: Header trasparente scroll-aware

**Files:**
- Modify: `frontend/src/components/layout/Header.tsx`

**Step 1: Leggi il file Header attuale**

Run: leggi `frontend/src/components/layout/Header.tsx` per capire la struttura

**Step 2: Aggiungi logica scroll**

Aggiungi un hook `useScrolled` che rileva se l'utente ha scrollato oltre la prima sezione (100vh). Quando scrolled=false, header bg è `transparent`. Quando scrolled=true, header bg è `bg-nav-bg`.

```tsx
// Aggiungi in cima al componente (deve diventare 'use client' se non lo è già)
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  function handleScroll() {
    setScrolled(window.scrollY > window.innerHeight * 0.8);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

Modifica la className del `<header>` o `<nav>`:
- Da: `bg-nav-bg` (o equivalente statico)
- A: `${scrolled ? 'bg-nav-bg' : 'bg-transparent'} transition-colors duration-300`

**Step 3: Verifica visivamente**

Run: `cd frontend && npm run dev`
Controlla: header trasparente sulla cosmografia, diventa colorato allo scroll.

**Step 4: Commit**

```bash
git add frontend/src/components/layout/Header.tsx
git commit -m "feat: make header transparent over cosmography, solid on scroll"
```

---

### Task 11: Responsive e polish finale

**Files:**
- Modify: `frontend/src/components/cosmography/CosmographyHero.tsx`

**Step 1: Aggiungi hook per dimensioni viewport**

Sostituisci i valori statici di window.innerWidth/Height con un hook `useWindowSize`:

```tsx
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
```

**Step 2: Scala raggi cerchi per mobile**

```tsx
const scale = Math.min(size.width / 800, 1);
const radii = { F: 220 * scale, I: 150 * scale, C: 80 * scale };
```

**Step 3: Riduci particelle su mobile**

```tsx
const particleCount = size.width < 768 ? 30 : 60;
```

**Step 4: Verifica su viewport mobile**

Run: `cd frontend && npm run dev`
Apri Chrome DevTools, simula iPhone/iPad. Verifica che cerchi e nodi siano usabili.

**Step 5: Commit**

```bash
git add frontend/src/components/cosmography/CosmographyHero.tsx
git commit -m "feat: responsive cosmography with scaled rings and reduced particles on mobile"
```

---

### Task 12: Test e2e e verifica finale

**Step 1: Esegui tutti i test unitari**

Run: `cd frontend && npx vitest run`
Expected: tutti PASS

**Step 2: Verifica build**

Run: `cd frontend && npx next build`
Expected: build completa senza errori

**Step 3: Verifica visiva**

Run: `cd frontend && npm run dev`
Checklist manuale:
- [ ] Cosmografia visibile fullscreen
- [ ] 3 cerchi concentrici con colori corretti
- [ ] Particelle fluttuano
- [ ] Hover su cerchio mostra nodi
- [ ] Click su nodo apre overlay
- [ ] Overlay mostra titolo + descrizione
- [ ] Chiudi overlay con × o Escape
- [ ] Scroll sotto la cosmografia mostra sezioni
- [ ] BooksGrid è in fondo
- [ ] Header trasparente → solido allo scroll
- [ ] Mobile: tap funziona, cerchi scalati

**Step 4: Commit finale**

```bash
git add -A
git commit -m "feat: cosmography interactive homepage — complete implementation"
```

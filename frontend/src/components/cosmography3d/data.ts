import type { Concept } from '@/types/strapi';
import { SPACE_COLORS } from '@/data/concepts';

export interface ConceptNode3D {
  concept: Concept;
  position: [number, number, number];
  color: string;
  orbitRadius: number;
  size: number; // sphere radius multiplier (1 = normal, 1.5 = important)
}

export interface ConceptConnection {
  from: string;
  to: string;
}

// Seeded random for deterministic positions
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/**
 * Distributes concepts in a 3D cloud around their orbit radius.
 * Instead of a flat ring, concepts spread in a toroidal volume
 * for a richer, more organic feel with 50 nodes.
 */
function distributeInSpace(
  concepts: Concept[],
  baseRadius: number,
  spread: number, // how much to scatter around the orbit
  ySpread: number,
): ConceptNode3D[] {
  const spaceKey = concepts[0]?.space as 'C' | 'I' | 'F';
  const color = SPACE_COLORS[spaceKey]?.primary || '#ffffff';

  return concepts.map((concept, i) => {
    const seed = concept.documentId.charCodeAt(0) * 100 + i;
    const angle = (i / concepts.length) * Math.PI * 2 + seededRandom(seed) * 0.3;
    const radiusOffset = (seededRandom(seed + 1) - 0.5) * spread * 2;
    const r = baseRadius + radiusOffset;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = (seededRandom(seed + 2) - 0.5) * ySpread;

    // Continuous size scale based on sortOrder: lower sortOrder = larger sphere
    const maxSort = Math.max(...concepts.map(c => c.sortOrder), 1);
    const size = 1.5 - ((concept.sortOrder - 1) / Math.max(maxSort - 1, 1)) * 0.75;

    return {
      concept,
      position: [x, y, z],
      color,
      orbitRadius: baseRadius,
      size,
    };
  });
}

export function buildConceptNodes(concepts: Concept[]): ConceptNode3D[] {
  const cConcepts = concepts.filter(c => c.space === 'C');
  const iConcepts = concepts.filter(c => c.space === 'I');
  const fConcepts = concepts.filter(c => c.space === 'F');

  return [
    ...distributeInSpace(cConcepts, 3.5, 1.5, 3),
    ...distributeInSpace(iConcepts, 7, 2, 4),
    ...distributeInSpace(fConcepts, 11, 2.5, 4.5),
  ];
}

/** Build nodes for the featured homepage view: only top concepts (sortOrder ≤ 4) */
export function buildFeaturedNodes(concepts: Concept[]): ConceptNode3D[] {
  const featured = concepts.filter(c => c.sortOrder <= 4);
  return buildConceptNodes(featured);
}

/** Filter connections to only include edges between visible node IDs */
export function filterConnections(
  connections: { from: string; to: string }[],
  nodeIds: Set<string>,
): { from: string; to: string }[] {
  return connections.filter(c => nodeIds.has(c.from) && nodeIds.has(c.to));
}

/** Compute connection weight from the sortOrder of its endpoints (lower = heavier) */
export function connectionWeight(fromSort: number, toSort: number): number {
  return 1 / (fromSort + toSort);
}

export function getNodeById(nodes: ConceptNode3D[], id: string): ConceptNode3D | undefined {
  return nodes.find(n => n.concept.documentId === id);
}

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

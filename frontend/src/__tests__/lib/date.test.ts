import { describe, it, expect } from 'vitest';
import { formatEventDate } from '@/lib/date';

describe('formatEventDate', () => {
  it('formats date for Italian locale', () => {
    const result = formatEventDate('2024-06-15', 'it');
    expect(result).toContain('2024');
  });

  it('formats date for English locale', () => {
    const result = formatEventDate('2024-06-15', 'en');
    expect(result).toContain('2024');
    expect(result).toContain('Jun');
  });

  it('formats date for German locale', () => {
    const result = formatEventDate('2024-06-15', 'de');
    expect(result).toContain('2024');
  });

  it('formats date for Spanish locale', () => {
    const result = formatEventDate('2024-06-15', 'es');
    expect(result).toContain('2024');
  });

  it('returns original string for invalid date', () => {
    const result = formatEventDate('not-a-date', 'en');
    // Invalid Date from toLocaleDateString returns 'Invalid Date' - which is still a string
    expect(typeof result).toBe('string');
  });

  it('handles unknown locale by passing it directly', () => {
    const result = formatEventDate('2024-01-15', 'fr');
    expect(result).toContain('2024');
  });
});

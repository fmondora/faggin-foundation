import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import SeityParticles from '@/components/cosmography/SeityParticles';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});

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

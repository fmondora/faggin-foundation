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

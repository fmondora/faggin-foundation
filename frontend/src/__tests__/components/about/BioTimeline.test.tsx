import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BioTimeline from '@/components/about/BioTimeline';
import type { BioSection } from '@/types/strapi';

describe('BioTimeline', () => {
  it('renders fallback sections when none provided', () => {
    render(<BioTimeline />);
    expect(screen.getByText('La Formazione')).toBeInTheDocument();
    expect(screen.getByText('La Rivoluzione del Silicio')).toBeInTheDocument();
    expect(screen.getByText("L'Imprenditore")).toBeInTheDocument();
    expect(screen.getByText('La Coscienza')).toBeInTheDocument();
  });

  it('renders provided sections', () => {
    const sections: BioSection[] = [
      { period: '2020-2024', title: 'Custom Period', content: 'Custom content text' },
    ];
    render(<BioTimeline sections={sections} />);
    expect(screen.getByText('Custom Period')).toBeInTheDocument();
    expect(screen.getByText('2020-2024')).toBeInTheDocument();
    expect(screen.getByText('Custom content text')).toBeInTheDocument();
  });

  it('renders period labels', () => {
    render(<BioTimeline />);
    expect(screen.getByText('1941-1967')).toBeInTheDocument();
    expect(screen.getByText('1968-1974')).toBeInTheDocument();
    expect(screen.getByText('1986-2009')).toBeInTheDocument();
    expect(screen.getByText('2009-oggi')).toBeInTheDocument();
  });

  it('uses fallback when empty array provided', () => {
    render(<BioTimeline sections={[]} />);
    expect(screen.getByText('La Formazione')).toBeInTheDocument();
  });
});

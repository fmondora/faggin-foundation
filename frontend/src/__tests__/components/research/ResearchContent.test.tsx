import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResearchContent from '@/components/research/ResearchContent';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('ResearchContent', () => {
  it('renders with fallback content when no data', () => {
    render(<ResearchContent />);
    expect(screen.getAllByText('ourResearch').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Faggin Foundation/)).toBeInTheDocument();
    expect(screen.getByText('researchAreas')).toBeInTheDocument();
    expect(screen.getByText('collaborations')).toBeInTheDocument();
  });

  it('renders fallback research areas', () => {
    render(<ResearchContent />);
    expect(screen.getByText(/Panpsichismo/)).toBeInTheDocument();
    expect(screen.getByText(/Libero arbitrio/)).toBeInTheDocument();
  });

  it('renders fallback collaborations', () => {
    render(<ResearchContent />);
    expect(screen.getByText(/Cattedra Faggin/)).toBeInTheDocument();
    expect(screen.getByText(/D'Ariano/)).toBeInTheDocument();
  });

  it('renders with provided data', () => {
    render(<ResearchContent data={{
      pageTitle: 'Custom Title',
      introText: 'Custom intro',
      areasTitle: 'Areas',
      areas: ['Area 1', 'Area 2'],
      collaborationsTitle: 'Collabs',
      collaborations: [{ title: 'Collab 1', description: 'Desc 1' }],
    }} />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom intro')).toBeInTheDocument();
    expect(screen.getByText('Area 1')).toBeInTheDocument();
    expect(screen.getByText('Collab 1')).toBeInTheDocument();
  });

  it('handles areas as objects with name or title', () => {
    render(<ResearchContent data={{
      areas: [{ name: 'Named Area' }, { title: 'Titled Area' }],
    }} />);
    expect(screen.getByText('Named Area')).toBeInTheDocument();
    expect(screen.getByText('Titled Area')).toBeInTheDocument();
  });
});

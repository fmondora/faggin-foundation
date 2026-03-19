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

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

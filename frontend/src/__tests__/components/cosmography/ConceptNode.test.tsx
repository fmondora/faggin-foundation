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

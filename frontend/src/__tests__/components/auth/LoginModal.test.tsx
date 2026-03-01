import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginModal from '@/components/auth/LoginModal';

const mockSignInWithOtp = vi.fn();

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: { signInWithOtp: mockSignInWithOtp },
  }),
}));

describe('LoginModal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    mockSignInWithOtp.mockReset();
    onClose.mockReset();
  });

  it('renders login form', () => {
    render(<LoginModal onClose={onClose} />);
    expect(screen.getByText('loginTitle')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('emailPlaceholder')).toBeInTheDocument();
    expect(screen.getByText('sendLink')).toBeInTheDocument();
  });

  it('shows success message after OTP sent', async () => {
    mockSignInWithOtp.mockResolvedValue({ error: null });
    render(<LoginModal onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText('emailPlaceholder'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.submit(screen.getByText('sendLink').closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('checkEmail')).toBeInTheDocument();
    });
  });

  it('shows error on OTP failure', async () => {
    mockSignInWithOtp.mockResolvedValue({ error: new Error('fail') });
    render(<LoginModal onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText('emailPlaceholder'), {
      target: { value: 'test@test.com' },
    });
    fireEvent.submit(screen.getByText('sendLink').closest('form')!);

    await waitFor(() => {
      expect(screen.getByText('error')).toBeInTheDocument();
    });
  });

  it('calls onClose when backdrop is clicked', () => {
    render(<LoginModal onClose={onClose} />);
    // The backdrop is the first child div with bg-black/50
    const backdrop = screen.getByText('loginTitle').closest('.relative')!.previousElementSibling as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', () => {
    render(<LoginModal onClose={onClose} />);
    const closeButtons = screen.getAllByRole('button');
    // Close button is the first button (has svg x icon)
    const closeBtn = closeButtons.find(b => b.querySelector('svg'));
    fireEvent.click(closeBtn!);
    expect(onClose).toHaveBeenCalled();
  });
});

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const token = searchParams.get('token');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? searchParams.get('redirect_to') ?? '/';
  // Normalize redirect: use only the pathname if it's a full URL
  const redirectPath = next.startsWith('http') ? new URL(next).pathname : next;

  const supabase = await createClient();

  // PKCE flow: exchange code for session
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${redirectPath}`);
  }

  // Classic GoTrue flow: verify token (magic link / OTP confirmation)
  if (token && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type as 'signup' | 'email' | 'magiclink' | 'recovery',
    });
    if (!error) return NextResponse.redirect(`${origin}${redirectPath}`);
  }

  return NextResponse.redirect(`${origin}/?error=auth`);
}

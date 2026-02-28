import { NextRequest, NextResponse } from 'next/server';

const GOTRUE_URL = process.env.SUPABASE_INTERNAL_URL || 'http://localhost:9999';

async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname.replace('/auth/v1/', '/');
  const url = `${GOTRUE_URL}${path}${req.nextUrl.search}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (!['host', 'connection', 'transfer-encoding'].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  const body = req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined;

  const res = await fetch(url, {
    method: req.method,
    headers,
    body,
  });

  const responseHeaders = new Headers();
  res.headers.forEach((value, key) => {
    if (!['transfer-encoding', 'content-encoding'].includes(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  return new NextResponse(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
export const PATCH = proxy;

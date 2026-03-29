'use client';

import dynamic from 'next/dynamic';

const FagginChat = dynamic(
  () => import('@/components/prototypes/FagginChat'),
  { ssr: false },
);

export default function ChatPrototype() {
  return <FagginChat />;
}

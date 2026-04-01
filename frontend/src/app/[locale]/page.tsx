'use client';

import dynamic from 'next/dynamic';

const CosmographyScene3D = dynamic(
  () => import('@/components/cosmography3d/CosmographyScene3D'),
  { ssr: false },
);

export default function HomePage() {
  return <CosmographyScene3D featured />;
}

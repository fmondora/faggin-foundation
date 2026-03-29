'use client';

import dynamic from 'next/dynamic';

const CosmographyScene3D = dynamic(
  () => import('@/components/cosmography3d/CosmographyScene3D'),
  { ssr: false },
);

export default function Cosmo3DPrototype() {
  return <CosmographyScene3D />;
}

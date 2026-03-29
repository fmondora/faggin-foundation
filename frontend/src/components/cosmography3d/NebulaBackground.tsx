'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Volumetric nebula clouds created with transparent spheres.
 * Adds depth and atmosphere to the cosmic scene.
 */
export default function NebulaBackground() {
  const groupRef = useRef<THREE.Group>(null);

  const clouds = useMemo(() => {
    const items: { position: [number, number, number]; scale: number; color: string; opacity: number }[] = [];
    const colors = ['#F5A623', '#9B59B6', '#3498DB', '#1a0a2e', '#2a0a4e'];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const r = 15 + Math.random() * 15;
      items.push({
        position: [
          Math.cos(angle) * r + (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 12,
          Math.sin(angle) * r + (Math.random() - 0.5) * 8,
        ],
        scale: 3 + Math.random() * 6,
        color: colors[i % colors.length],
        opacity: 0.015 + Math.random() * 0.02,
      });
    }
    return items;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, i) => (
        <mesh key={i} position={cloud.position}>
          <sphereGeometry args={[cloud.scale, 12, 12]} />
          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={cloud.opacity}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

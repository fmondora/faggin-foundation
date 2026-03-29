'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * "Il faro della coscienza che illumina l'universo"
 *
 * Central luminous beacon at the origin of the cosmography.
 * Represents Uno — the source from which all consciousness radiates.
 * Pulsing core + radial light rays + soft volumetric glow.
 */

const RAY_COUNT = 12;
const GOLD = '#F5A623';

function LightRay({ angle, length, delay }: { angle: number; length: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    // Breathing pulse — each ray slightly offset
    const pulse = 0.4 + 0.6 * Math.sin(t * 0.8 + delay);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.03 * pulse;
    ref.current.scale.y = 0.8 + 0.4 * pulse;
  });

  return (
    <mesh
      ref={ref}
      position={[0, 0, 0]}
      rotation={[0, 0, angle]}
    >
      <planeGeometry args={[0.15, length]} />
      <meshBasicMaterial
        color={GOLD}
        transparent
        opacity={0.03}
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function GlowShell({ radius, opacity, pulseSpeed }: { radius: number; opacity: number; pulseSpeed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pulse = 0.7 + 0.3 * Math.sin(t * pulseSpeed);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = opacity * pulse;
    ref.current.scale.setScalar(1 + 0.08 * Math.sin(t * pulseSpeed * 0.7));
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshBasicMaterial
        color={GOLD}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function ConsciousnessBeacon() {
  const coreRef = useRef<THREE.PointLight>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  // Radial light rays in XZ plane + some tilted
  const rays = useMemo(() => {
    const items: { angle: number; length: number; delay: number; tiltX: number; tiltY: number }[] = [];
    for (let i = 0; i < RAY_COUNT; i++) {
      const angle = (i / RAY_COUNT) * Math.PI * 2;
      items.push({
        angle,
        length: 18 + Math.random() * 14,
        delay: i * 0.5,
        tiltX: (Math.random() - 0.5) * 0.4,
        tiltY: (Math.random() - 0.5) * 0.3,
      });
    }
    // Add vertical rays
    for (let i = 0; i < 4; i++) {
      items.push({
        angle: (i / 4) * Math.PI * 2,
        length: 12 + Math.random() * 8,
        delay: i * 1.2,
        tiltX: Math.PI / 2 + (Math.random() - 0.5) * 0.3,
        tiltY: 0,
      });
    }
    return items;
  }, []);

  // Pulsing core light
  useFrame(({ clock }) => {
    if (coreRef.current) {
      const t = clock.getElapsedTime();
      coreRef.current.intensity = 2.5 + 1.5 * Math.sin(t * 0.6);
    }
    if (innerRef.current) {
      const t = clock.getElapsedTime();
      const scale = 1 + 0.15 * Math.sin(t * 0.8);
      innerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Central pulsing point light — the "faro" */}
      <pointLight
        ref={coreRef}
        position={[0, 0, 0]}
        intensity={3}
        color={GOLD}
        distance={30}
        decay={2}
      />

      {/* Bright inner core sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#fff8e0"
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Concentric glow shells — volumetric effect */}
      <GlowShell radius={0.6} opacity={0.12} pulseSpeed={0.7} />
      <GlowShell radius={1.2} opacity={0.06} pulseSpeed={0.5} />
      <GlowShell radius={2.2} opacity={0.025} pulseSpeed={0.3} />
      <GlowShell radius={4.0} opacity={0.012} pulseSpeed={0.2} />

      {/* Radial light rays — "raggi della coscienza" */}
      {rays.map((ray, i) => (
        <group key={i} rotation={[ray.tiltX, ray.tiltY, 0]}>
          <LightRay angle={ray.angle} length={ray.length} delay={ray.delay} />
        </group>
      ))}
    </group>
  );
}

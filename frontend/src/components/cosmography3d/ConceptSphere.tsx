'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import type { ConceptNode3D } from './data';

interface ConceptSphereProps {
  node: ConceptNode3D;
  isSelected: boolean;
  onSelect: (node: ConceptNode3D) => void;
  onHover: (node: ConceptNode3D | null) => void;
}

export default function ConceptSphere({ node, isSelected, onSelect, onHover }: ConceptSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const sphereRadius = 0.25 * node.size;
  const baseScale = isSelected ? 1.5 : hovered ? 1.25 : 1;
  const emissiveIntensity = isSelected ? 2.5 : hovered ? 1.5 : 0.4;

  useFrame((state, delta) => {
    if (meshRef.current) {
      const s = meshRef.current.scale.x;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(s, baseScale, delta * 6));
    }
    if (glowRef.current) {
      const targetOpacity = hovered || isSelected ? 0.35 : 0.08;
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 5);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
      const targetOpacity = hovered || isSelected ? 0.5 : 0;
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 4);
    }
  });

  return (
    <Float speed={1.2 + node.size * 0.3} rotationIntensity={0.15} floatIntensity={0.2 * node.size}>
      <group position={node.position}>
        {/* Main sphere */}
        <mesh
          ref={meshRef}
          onClick={(e) => { e.stopPropagation(); onSelect(node); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover(node); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); onHover(null); document.body.style.cursor = 'default'; }}
        >
          <sphereGeometry args={[sphereRadius, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={emissiveIntensity}
            roughness={0.2}
            metalness={0.15}
            toneMapped={false}
          />
        </mesh>

        {/* Outer glow */}
        <mesh ref={glowRef} scale={2.5}>
          <sphereGeometry args={[sphereRadius, 16, 16]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>

        {/* Rotating ring on hover/select */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[sphereRadius * 2, 0.015, 8, 64]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>

        {/* Always-visible small label for larger nodes */}
        {node.size >= 1.0 && !hovered && !isSelected && (
          <Billboard>
            <Text
              position={[0, sphereRadius + 0.35, 0]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="bottom"
              fillOpacity={0.3}
            >
              {node.concept.name}
            </Text>
          </Billboard>
        )}

        {/* Full label on hover/select */}
        {(hovered || isSelected) && (
          <Billboard>
            <Text
              position={[0, sphereRadius + 0.4, 0]}
              fontSize={0.22}
              color="white"
              anchorX="center"
              anchorY="bottom"
              outlineWidth={0.02}
              outlineColor="black"
              fillOpacity={1}
            >
              {node.concept.name}
            </Text>
          </Billboard>
        )}
      </group>
    </Float>
  );
}

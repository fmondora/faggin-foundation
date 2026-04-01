'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { ConceptNode3D } from './data';
import { getNodeById, connectionWeight } from './data';

interface ConnectionLinesProps {
  nodes: ConceptNode3D[];
  connections: { from: string; to: string }[];
  hoveredId: string | null;
  selectedId: string | null;
}

function ConnectionLine({ from, to, isHighlighted, activeId, weight }: {
  from: ConceptNode3D;
  to: ConceptNode3D;
  isHighlighted: boolean;
  activeId: string | null;
  weight: number;
}) {
  const ref = useRef<THREE.Line>(null);
  // Weight ranges ~0.1 (weak) to ~0.5 (strong) — scale opacity accordingly
  const baseOpacity = 0.04 + weight * 0.4;
  const targetOpacity = activeId ? (isHighlighted ? 0.5 : 0.03) : baseOpacity;

  const lineObj = useMemo(() => {
    const points = [
      new THREE.Vector3(...from.position),
      new THREE.Vector3(...to.position),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.08,
    });
    return new THREE.Line(geometry, material);
  }, [from.position, to.position]);

  useFrame((_, delta) => {
    const mat = lineObj.material as THREE.LineBasicMaterial;
    mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 4);
    mat.color.set(isHighlighted ? from.color : '#ffffff');
  });

  return <primitive object={lineObj} />;
}

export default function ConnectionLines({ nodes, connections, hoveredId, selectedId }: ConnectionLinesProps) {
  const lines = useMemo(() => {
    return connections.map(({ from, to }) => {
      const a = getNodeById(nodes, from);
      const b = getNodeById(nodes, to);
      if (!a || !b) return null;
      const w = connectionWeight(a.concept.sortOrder, b.concept.sortOrder);
      return { from: a, to: b, key: `${from}-${to}`, weight: w };
    }).filter(Boolean) as { from: ConceptNode3D; to: ConceptNode3D; key: string; weight: number }[];
  }, [nodes, connections]);

  const activeId = hoveredId || selectedId;

  return (
    <group>
      {lines.map(({ from, to, key, weight }) => {
        const isHighlighted = activeId
          ? from.concept.documentId === activeId || to.concept.documentId === activeId
          : false;
        return (
          <ConnectionLine
            key={key}
            from={from}
            to={to}
            isHighlighted={isHighlighted}
            activeId={activeId}
            weight={weight}
          />
        );
      })}
    </group>
  );
}

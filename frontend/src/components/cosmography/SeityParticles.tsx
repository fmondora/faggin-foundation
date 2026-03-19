'use client';

import { useRef, useEffect, useCallback } from 'react';
import type { OntologicalSpace } from '@/data/concepts';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

interface SeityParticlesProps {
  width: number;
  height: number;
  activeSpace?: OntologicalSpace | null;
  particleCount?: number;
}

const COLORS = ['#F5A623', '#9B59B6', '#3498DB', '#ffffff'];

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function SeityParticles({
  width,
  height,
  activeSpace,
  particleCount = 60,
}: SeityParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initParticles = useCallback(() => {
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(width, height)
    );
  }, [width, height, particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    initParticles();

    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      return;
    }

    let lastTime = 0;
    const FPS_INTERVAL = 1000 / 30;

    function animate(timestamp: number) {
      const elapsed = timestamp - lastTime;
      if (elapsed >= FPS_INTERVAL) {
        lastTime = timestamp - (elapsed % FPS_INTERVAL);
        ctx!.clearRect(0, 0, width, height);

        for (const p of particlesRef.current) {
          const speed = activeSpace ? 1.5 : 1;
          p.x += p.vx * speed;
          p.y += p.vy * speed;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx!.globalAlpha = p.opacity;
          ctx!.fillStyle = p.color;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [width, height, activeSpace, initParticles, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

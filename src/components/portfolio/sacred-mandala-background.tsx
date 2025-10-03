'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SacredMandalaBackground = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // Generate Metatron's Cube pattern
  const MetatronsCube = ({ id, size = 200 }: { id: string; size?: number }) => {
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.35;
    const innerRadius = radius * 0.5;

    // Generate circle positions for Metatron's Cube
    const circles = [
      { x: cx, y: cy }, // Center
    ];

    // Inner hexagon
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      circles.push({
        x: cx + innerRadius * Math.cos(angle),
        y: cy + innerRadius * Math.sin(angle),
      });
    }

    // Outer hexagon
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      circles.push({
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      });
    }

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id={`glow-${id}`}>
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </radialGradient>
          
          <filter id={`blur-${id}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Connect all circles with lines */}
        {circles.map((circle1, i) =>
          circles.slice(i + 1).map((circle2, j) => (
            <line
              key={`line-${i}-${j}`}
              x1={circle1.x}
              y1={circle1.y}
              x2={circle2.x}
              y2={circle2.y}
              stroke={`url(#glow-${id})`}
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))
        )}

        {/* Draw circles at intersection points */}
        {circles.map((circle, i) => (
          <g key={`circle-${i}`}>
            <circle
              cx={circle.x}
              cy={circle.y}
              r="3"
              fill={`url(#glow-${id})`}
              opacity="0.6"
            />
            <circle
              cx={circle.x}
              cy={circle.y}
              r="5"
              fill="none"
              stroke={`url(#glow-${id})`}
              strokeWidth="0.5"
              opacity="0.4"
            />
          </g>
        ))}
      </svg>
    );
  };

  // Generate Sri Yantra inspired triangles
  const SriYantraPattern = ({ id, size = 200 }: { id: string; size?: number }) => {
    const cx = size / 2;
    const cy = size / 2;
    const scale = size / 200;

    const triangles = [
      // Upward triangles
      { points: `${cx},${cy - 60 * scale} ${cx - 52 * scale},${cy + 30 * scale} ${cx + 52 * scale},${cy + 30 * scale}`, color: '#ec4899' },
      { points: `${cx},${cy - 50 * scale} ${cx - 43 * scale},${cy + 25 * scale} ${cx + 43 * scale},${cy + 25 * scale}`, color: '#f472b6' },
      { points: `${cx},${cy - 40 * scale} ${cx - 35 * scale},${cy + 20 * scale} ${cx + 35 * scale},${cy + 20 * scale}`, color: '#f9a8d4' },
      // Downward triangles
      { points: `${cx},${cy + 50 * scale} ${cx - 43 * scale},${cy - 25 * scale} ${cx + 43 * scale},${cy - 25 * scale}`, color: '#8b5cf6' },
      { points: `${cx},${cy + 40 * scale} ${cx - 35 * scale},${cy - 20 * scale} ${cx + 35 * scale},${cy - 20 * scale}`, color: '#a78bfa' },
    ];

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id={`yantra-${id}`}>
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        
        {triangles.map((tri, i) => (
          <polygon
            key={i}
            points={tri.points}
            fill="none"
            stroke={tri.color}
            strokeWidth="1"
            opacity="0.4"
          />
        ))}
        
        {/* Central bindu (point) */}
        <circle cx={cx} cy={cy} r="4" fill="#ec4899" opacity="0.8">
          <animate
            attributeName="r"
            values="3;5;3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    );
  };

  // Fibonacci spiral pattern
  const FibonacciSpiral = ({ id, size = 300 }: { id: string; size?: number }) => {
    const cx = size / 2;
    const cy = size / 2;
    const phi = 1.618033988749; // Golden ratio

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={`spiral-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Golden spiral arcs */}
        {Array.from({ length: 12 }).map((_, i) => {
          const radius = Math.pow(phi, i / 4) * 3;
          const angle = (i * 137.5 * Math.PI) / 180; // Golden angle
          return (
            <circle
              key={i}
              cx={cx + Math.cos(angle) * radius * 2}
              cy={cy + Math.sin(angle) * radius * 2}
              r={radius}
              fill="none"
              stroke={`url(#spiral-${id})`}
              strokeWidth="0.5"
              opacity="0.3"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      role="presentation"
      aria-hidden="true"
    >
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950" />

      {/* Ambient glow effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)',
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Layer 1: Outer Metatron's Cube - Slow rotation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
          scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="relative" style={{ width: '120vmin', height: '120vmin' }}>
          <MetatronsCube id="outer" size={2000} />
        </div>
      </motion.div>

      {/* Layer 2: Fibonacci Spirals - Medium rotation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                rotate: [0, -360],
                scale: [0.9, 0.95, 0.9],
              }
        }
        transition={{
          rotate: { duration: 45, repeat: Infinity, ease: 'linear' },
          scale: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="relative" style={{ width: '100vmin', height: '100vmin' }}>
          <FibonacciSpiral id="spiral1" size={1600} />
        </div>
      </motion.div>

      {/* Layer 3: Sri Yantra - Counter-rotation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                rotate: [0, 360],
                scale: [0.85, 0.9, 0.85],
              }
        }
        transition={{
          rotate: { duration: 35, repeat: Infinity, ease: 'linear' },
          scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="relative" style={{ width: '80vmin', height: '80vmin' }}>
          <SriYantraPattern id="yantra1" size={1200} />
        </div>
      </motion.div>

      {/* Layer 4: Inner Metatron's Cube - Fast rotation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ willChange: prefersReducedMotion ? 'auto' : 'transform' }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                rotate: [0, -360],
                scale: [0.8, 0.85, 0.8],
              }
        }
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <div className="relative" style={{ width: '60vmin', height: '60vmin' }}>
          <MetatronsCube id="inner" size={900} />
        </div>
      </motion.div>

      {/* Layer 5: Particle field effect */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 3 + Math.random() * 4;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: '2px',
                  height: '2px',
                  background: 'radial-gradient(circle, rgba(236, 72, 153, 0.8), transparent)',
                  boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Central glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={
          prefersReducedMotion
            ? {}
            : {
                opacity: [0.2, 0.5, 0.2],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.2), transparent)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>
    </div>
  );
};

export default SacredMandalaBackground;


'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FlowerOfLifeBackground = () => {
  const [performanceTier, setPerformanceTier] = useState('high');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Detect performance tier
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const nav = navigator as Navigator & { deviceMemory?: number };
    const hasLowMemory = nav.deviceMemory && nav.deviceMemory < 4;

    if (isMobile || hasLowMemory) {
      setPerformanceTier('medium');
    }
  }, []);

  // Generate SVG string for background
  const generateFlowerOfLifeSVG = (id: string) => {
    const radius = 40;
    const centerX = 100;
    const centerY = 100;
    const angleStep = Math.PI / 3;
    const distance = radius * Math.sqrt(3);

    const circles = [
      { cx: centerX, cy: centerY, r: radius }
    ];

    // Generate 6 circles around the center
    for (let i = 0; i < 6; i++) {
      const angle = i * angleStep;
      circles.push({
        cx: centerX + distance * Math.cos(angle),
        cy: centerY + distance * Math.sin(angle),
        r: radius
      });
    }

    // Add outer ring for seamless tiling
    for (let i = 0; i < 6; i++) {
      const angle = i * angleStep + angleStep / 2;
      circles.push({
        cx: centerX + distance * 1.5 * Math.cos(angle),
        cy: centerY + distance * 1.5 * Math.sin(angle),
        r: radius
      });
    }

    const circleElements = circles.map((circle) =>
      `<circle cx="${circle.cx}" cy="${circle.cy}" r="${circle.r}" fill="none" stroke="url(#gradient-${id})" stroke-width="2.5" opacity="0.9" />`
    ).join('');

    return `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ec4899" stop-opacity="1.0" />
            <stop offset="50%" stop-color="#FF1744" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#ef4444" stop-opacity="1.0" />
          </linearGradient>
        </defs>
        ${circleElements}
      </svg>
    `;
  };

  const animationConfig = prefersReducedMotion
    ? {
        primary: { duration: 0, scale: 1, rotate: 0 },
        secondary: { duration: 0, scale: 0.7, rotate: 0 },
      }
    : {
        primary: {
          duration: performanceTier === 'high' ? 25 : 35,
          scale: [1, 1.02, 1],
          rotate: 360,
        },
        secondary: {
          duration: performanceTier === 'high' ? 35 : 45,
          scale: 0.7,
          rotate: -360,
        },
      };

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      role="presentation"
      aria-hidden="true"
    >


      {/* Fallback visible pattern for testing */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.3) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(255, 23, 68, 0.3) 2px, transparent 2px)`,
          backgroundSize: '100px 100px',
          backgroundPosition: '0 0, 50px 50px'
        }}
      />
      {/* Primary Layer - Clockwise Rotation */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15), transparent 60%)',
          willChange: prefersReducedMotion ? 'auto' : 'transform',
        }}
        animate={{
          rotate: prefersReducedMotion ? 0 : [0, 360],
          scale: prefersReducedMotion ? 1 : [1, 1.02, 1],
        }}
        transition={{
          rotate: {
            duration: animationConfig.primary.duration,
            repeat: Infinity,
            ease: 'linear',
          },
          scale: {
            duration: animationConfig.primary.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(
              generateFlowerOfLifeSVG('primary')
            )}')`,
            backgroundSize: '400px 400px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: performanceTier === 'high' ? 0.6 : 0.5,
          }}
        />
      </motion.div>

      {/* Secondary Layer - Counter-clockwise Rotation */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 23, 68, 0.12), transparent 60%)',
          willChange: prefersReducedMotion ? 'auto' : 'transform',
        }}
        animate={{
          rotate: prefersReducedMotion ? 0 : [0, -360],
          scale: prefersReducedMotion ? 0.7 : [0.7, 0.72, 0.7],
        }}
        transition={{
          rotate: {
            duration: animationConfig.secondary.duration,
            repeat: Infinity,
            ease: 'linear',
          },
          scale: {
            duration: animationConfig.secondary.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(
              generateFlowerOfLifeSVG('secondary')
            )}')`,
            backgroundSize: '350px 350px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: performanceTier === 'high' ? 0.5 : 0.4,
          }}
        />
      </motion.div>

      {/* Breathing Effect Overlay */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.12), transparent 50%)',
            mixBlendMode: 'screen',
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
};

export default FlowerOfLifeBackground;

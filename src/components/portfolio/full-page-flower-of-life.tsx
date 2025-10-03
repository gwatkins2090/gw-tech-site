'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Simplified Full-page Flower of Life Pattern Component
const FullPageFlowerOfLife = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Simple CSS-based pattern approach for better performance
  const createFlowerOfLifeCSS = () => {
    return `
      <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
        <defs>
          <linearGradient id='flowerGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stop-color='%23ec4899' stop-opacity='0.3'/>
            <stop offset='50%' stop-color='%23FF1744' stop-opacity='0.2'/>
            <stop offset='100%' stop-color='%23FF3838' stop-opacity='0.3'/>
          </linearGradient>
        </defs>
        <g>
          <circle cx='100' cy='100' r='30' fill='none' stroke='url(%23flowerGrad)' stroke-width='1'/>
          <circle cx='100' cy='48' r='30' fill='none' stroke='url(%23flowerGrad)' stroke-width='1'/>
          <circle cx='145' cy='74' r='30' fill='none' stroke='url(%23flowerGrad)' stroke-width='1'/>
          <circle cx='145' cy='126' r='30' fill='none' stroke='url(%23flowerGrad)' stroke-width='1'/>
          <circle cx='100' cy='152' r='30' fill='none' stroke='url(%23flowerGrad)' stroke-width='1'/>
          <circle cx='55' cy='126' r='30' fill='none' stroke='url(%23flowerGrad)' stroke-width='1'/>
          <circle cx='55' cy='74' r='30' fill='none' stroke='url(%23flowerGrad)' stroke-width='1'/>
        </g>
      </svg>
    `;
  };

  // Simple animation variants
  const rotationVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const staticVariants = {
    animate: {
      rotate: 0,
      transition: { duration: 0 }
    }
  };

  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none background-layer overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(createFlowerOfLifeCSS())}")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none background-layer overflow-hidden"
      role="presentation"
      aria-hidden="true"
    >
      {/* Primary rotating layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(createFlowerOfLifeCSS())}")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          opacity: 0.08,
          willChange: 'transform'
        }}
        variants={isReducedMotion ? staticVariants : rotationVariants}
        animate="animate"
        initial={{ rotate: 0 }}
      />

      {/* Secondary counter-rotating layer for depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(createFlowerOfLifeCSS())}")`,
          backgroundSize: '150px 150px',
          backgroundRepeat: 'repeat',
          opacity: 0.04,
          willChange: 'transform'
        }}
        variants={isReducedMotion ? staticVariants : {
          animate: {
            rotate: -360,
            transition: {
              duration: 45,
              repeat: Infinity,
              ease: "linear"
            }
          }
        }}
        animate="animate"
        initial={{ rotate: 0 }}
      />
    </div>
  );
};

export default FullPageFlowerOfLife;

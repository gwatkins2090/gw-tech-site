'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePerformanceMonitor } from './performance-monitor';

// Flower of Life SVG Component
const FlowerOfLife = ({ size = 200, opacity = 0.1, className = '', variant = 'basic' }: {
  size?: number;
  opacity?: number;
  className?: string;
  variant?: 'basic' | 'extended';
}) => {
  const radius = size / 12;
  const centerX = size / 2;
  const centerY = size / 2;

  // Calculate positions for the 7 circles in Flower of Life pattern
  const basicCircles = [
    { cx: centerX, cy: centerY }, // Center circle
    { cx: centerX, cy: centerY - radius * 1.732 }, // Top
    { cx: centerX + radius * 1.5, cy: centerY - radius * 0.866 }, // Top right
    { cx: centerX + radius * 1.5, cy: centerY + radius * 0.866 }, // Bottom right
    { cx: centerX, cy: centerY + radius * 1.732 }, // Bottom
    { cx: centerX - radius * 1.5, cy: centerY + radius * 0.866 }, // Bottom left
    { cx: centerX - radius * 1.5, cy: centerY - radius * 0.866 }, // Top left
  ];

  // Extended pattern with outer ring
  const extendedCircles = [
    ...basicCircles,
    // Outer ring
    { cx: centerX, cy: centerY - radius * 3.464 }, // Top outer
    { cx: centerX + radius * 3, cy: centerY - radius * 1.732 }, // Top right outer
    { cx: centerX + radius * 3, cy: centerY + radius * 1.732 }, // Bottom right outer
    { cx: centerX, cy: centerY + radius * 3.464 }, // Bottom outer
    { cx: centerX - radius * 3, cy: centerY + radius * 1.732 }, // Bottom left outer
    { cx: centerX - radius * 3, cy: centerY - radius * 1.732 }, // Top left outer
  ];

  const circles = variant === 'extended' ? extendedCircles : basicCircles;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={`flowerGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#FF1744" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FF3838" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {circles.map((circle, index) => (
        <circle
          key={index}
          cx={circle.cx}
          cy={circle.cy}
          r={radius}
          fill="none"
          stroke={`url(#flowerGradient-${size})`}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
};

// Mandala SVG Component
const Mandala = ({ size = 150, complexity = 8, className = '' }: { 
  size?: number; 
  complexity?: number; 
  className?: string; 
}) => {
  const center = size / 2;
  const maxRadius = size / 2 - 10;

  const createPetals = () => {
    const petals = [];
    const angleStep = (2 * Math.PI) / complexity;
    
    for (let i = 0; i < complexity; i++) {
      const angle = i * angleStep;
      const x1 = center + Math.cos(angle) * (maxRadius * 0.3);
      const y1 = center + Math.sin(angle) * (maxRadius * 0.3);
      const x2 = center + Math.cos(angle) * maxRadius;
      const y2 = center + Math.sin(angle) * maxRadius;
      
      petals.push(
        <g key={i}>
          <line
            x1={center}
            y1={center}
            x2={x2}
            y2={y2}
            stroke="url(#mandalaGradient)"
            strokeWidth="1"
            opacity="0.7"
          />
          <circle
            cx={x1}
            cy={y1}
            r="2"
            fill="url(#mandalaGradient)"
            opacity="0.8"
          />
          <circle
            cx={x2}
            cy={y2}
            r="1.5"
            fill="url(#mandalaGradient)"
            opacity="0.6"
          />
        </g>
      );
    }
    return petals;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <defs>
        <radialGradient id="mandalaGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF1744" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      
      {/* Outer circle */}
      <circle
        cx={center}
        cy={center}
        r={maxRadius}
        fill="none"
        stroke="url(#mandalaGradient)"
        strokeWidth="1"
        opacity="0.5"
      />
      
      {/* Inner circles */}
      <circle
        cx={center}
        cy={center}
        r={maxRadius * 0.7}
        fill="none"
        stroke="url(#mandalaGradient)"
        strokeWidth="1"
        opacity="0.6"
      />
      
      <circle
        cx={center}
        cy={center}
        r={maxRadius * 0.4}
        fill="none"
        stroke="url(#mandalaGradient)"
        strokeWidth="1.5"
        opacity="0.7"
      />
      
      {/* Center point */}
      <circle
        cx={center}
        cy={center}
        r="3"
        fill="url(#mandalaGradient)"
        opacity="0.9"
      />
      
      {/* Petals/rays */}
      {createPetals()}
    </svg>
  );
};

// Metatron's Cube Component
const MetatronsCube = ({ size = 200, opacity = 0.1, className = '' }: {
  size?: number;
  opacity?: number;
  className?: string;
}) => {
  const center = size / 2;
  const radius = size / 6;

  // 13 circles of Metatron's Cube
  const circles = [
    { cx: center, cy: center }, // Center
    // Inner hexagon
    { cx: center, cy: center - radius * 2 },
    { cx: center + radius * 1.732, cy: center - radius },
    { cx: center + radius * 1.732, cy: center + radius },
    { cx: center, cy: center + radius * 2 },
    { cx: center - radius * 1.732, cy: center + radius },
    { cx: center - radius * 1.732, cy: center - radius },
    // Outer points
    { cx: center, cy: center - radius * 3.464 },
    { cx: center + radius * 3, cy: center - radius * 1.732 },
    { cx: center + radius * 3, cy: center + radius * 1.732 },
    { cx: center, cy: center + radius * 3.464 },
    { cx: center - radius * 3, cy: center + radius * 1.732 },
    { cx: center - radius * 3, cy: center - radius * 1.732 },
  ];

  // Connection lines for the cube structure
  const connections = [
    // Star of David lines
    [0, 1], [0, 3], [0, 5], // Inner connections
    [1, 3], [3, 5], [5, 1], // Triangle 1
    [2, 4], [4, 6], [6, 2], // Triangle 2
    // Outer connections
    [1, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12],
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={`metatronGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF1744" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Connection lines */}
      {connections.map(([start, end], index) => (
        <line
          key={index}
          x1={circles[start].cx}
          y1={circles[start].cy}
          x2={circles[end].cx}
          y2={circles[end].cy}
          stroke={`url(#metatronGradient-${size})`}
          strokeWidth="0.5"
          opacity="0.6"
        />
      ))}

      {/* Circles */}
      {circles.map((circle, index) => (
        <circle
          key={index}
          cx={circle.cx}
          cy={circle.cy}
          r={radius / 3}
          fill="none"
          stroke={`url(#metatronGradient-${size})`}
          strokeWidth="1"
          opacity={index === 0 ? "0.9" : "0.7"}
        />
      ))}
    </svg>
  );
};

// Floating Geometric Element
const FloatingGeometry = ({ type, size = 30, className = '' }: {
  type: 'triangle' | 'hexagon' | 'diamond';
  size?: number;
  className?: string;
}) => {
  const center = size / 2;
  
  const shapes = {
    triangle: (
      <polygon
        points={`${center},5 ${size - 5},${size - 5} 5,${size - 5}`}
        fill="none"
        stroke="url(#floatingGradient)"
        strokeWidth="1.5"
        opacity="0.6"
      />
    ),
    hexagon: (
      <polygon
        points={`${center},5 ${size - 5},${center * 0.5} ${size - 5},${center * 1.5} ${center},${size - 5} 5,${center * 1.5} 5,${center * 0.5}`}
        fill="none"
        stroke="url(#floatingGradient)"
        strokeWidth="1.5"
        opacity="0.6"
      />
    ),
    diamond: (
      <polygon
        points={`${center},5 ${size - 5},${center} ${center},${size - 5} 5,${center}`}
        fill="none"
        stroke="url(#floatingGradient)"
        strokeWidth="1.5"
        opacity="0.6"
      />
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <defs>
        <linearGradient id="floatingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF3838" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {shapes[type]}
    </svg>
  );
};

// Main Sacred Geometry Background Component
const SacredGeometryBackground = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isLowPerformance } = usePerformanceMonitor();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    mediaQuery.addEventListener('change', handleChange);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const rotateReverseVariants = {
    animate: {
      rotate: -360,
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const fastRotateVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const colorShiftVariants = {
    animate: {
      filter: [
        "hue-rotate(0deg)",
        "hue-rotate(30deg)",
        "hue-rotate(0deg)"
      ],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Parallax calculations
  const parallaxSlow = scrollY * 0.1;
  const parallaxMedium = scrollY * 0.2;
  const parallaxFast = scrollY * 0.3;

  if (isReducedMotion || isLowPerformance) {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-30 sacred-geometry-container">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <FlowerOfLife size={400} opacity={0.15} />
        </div>
        <div className="absolute top-1/4 right-1/4">
          <Mandala size={120} complexity={6} />
        </div>
        <div className="absolute bottom-1/3 left-1/4">
          <Mandala size={100} complexity={4} />
        </div>
        {!isLowPerformance && (
          <div className="absolute bottom-1/4 right-1/6">
            <MetatronsCube size={140} opacity={0.1} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden sacred-geometry-container" style={{ willChange: 'transform' }}>
      {/* Background Layer - Large Flower of Life */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sacred-geometry-element"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        variants={colorShiftVariants}
        whileInView="animate"
        viewport={{ once: true }}
        style={{
          transform: `translate(-50%, -50%) translateY(${parallaxSlow}px)`,
          willChange: 'transform'
        }}
      >
        <motion.div
          variants={rotateVariants}
          animate="animate"
          className="sacred-geometry-element"
        >
          <FlowerOfLife size={600} opacity={0.08} variant="extended" />
        </motion.div>
      </motion.div>

      {/* Secondary Flower of Life - Medium */}
      <motion.div
        className="absolute top-1/4 right-1/4 transform translate-x-1/2 sacred-geometry-element"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        style={{
          transform: `translateX(50%) translateY(${parallaxMedium}px)`,
          willChange: 'transform'
        }}
      >
        <motion.div
          variants={rotateReverseVariants}
          animate="animate"
          className="sacred-geometry-element"
        >
          <FlowerOfLife size={300} opacity={0.12} />
        </motion.div>
      </motion.div>

      {/* Mid Layer - Rotating Mandalas */}
      <motion.div
        className="absolute top-20 left-20 sacred-geometry-element"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        style={{
          transform: `translateY(${parallaxFast}px)`,
          willChange: 'transform'
        }}
      >
        <motion.div
          variants={fastRotateVariants}
          animate="animate"
          className="sacred-geometry-element"
        >
          <motion.div
            variants={pulseVariants}
            animate="animate"
          >
            <Mandala size={120} complexity={8} />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-16"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
      >
        <motion.div
          variants={rotateVariants}
          animate="animate"
        >
          <Mandala size={100} complexity={12} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-1/3"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
      >
        <motion.div
          variants={rotateReverseVariants}
          animate="animate"
        >
          <motion.div
            variants={pulseVariants}
            animate="animate"
          >
            <Mandala size={80} complexity={6} />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-1/4 sacred-geometry-element"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
        style={{
          transform: `translateY(${parallaxMedium}px)`,
          willChange: 'transform'
        }}
      >
        <motion.div
          variants={fastRotateVariants}
          animate="animate"
          className="sacred-geometry-element"
        >
          <Mandala size={90} complexity={10} />
        </motion.div>
      </motion.div>

      {/* Metatron's Cube Elements */}
      <motion.div
        className="absolute top-1/3 left-1/6 sacred-geometry-element"
        initial={{ opacity: 0, scale: 0, rotate: 45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 3, ease: "easeOut" }}
        style={{
          transform: `translateY(${parallaxSlow}px) rotate(0deg)`,
          willChange: 'transform'
        }}
      >
        <motion.div
          variants={{
            animate: {
              rotate: 360,
              scale: [1, 1.1, 1],
              transition: {
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }
            }
          }}
          animate="animate"
          className="sacred-geometry-element"
        >
          <MetatronsCube size={180} opacity={0.15} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/6 sacred-geometry-element"
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 3.5, ease: "easeOut" }}
        style={{
          transform: `translateY(${parallaxFast}px) rotate(0deg)`,
          willChange: 'transform'
        }}
      >
        <motion.div
          variants={{
            animate: {
              rotate: -360,
              scale: [1, 0.9, 1],
              transition: {
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }
            }
          }}
          animate="animate"
          className="sacred-geometry-element"
        >
          <MetatronsCube size={140} opacity={0.12} />
        </motion.div>
      </motion.div>

      {/* Foreground Layer - Floating Geometric Elements */}
      <motion.div
        className="absolute top-1/4 left-1/2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3, ease: "easeOut" }}
      >
        <motion.div
          variants={floatingVariants}
          animate="animate"
        >
          <FloatingGeometry type="triangle" size={40} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-2/3 left-1/4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.5, ease: "easeOut" }}
      >
        <motion.div
          variants={{
            animate: {
              y: [0, 15, 0],
              x: [0, -15, 0],
              rotate: [0, 180, 360],
              transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
          animate="animate"
        >
          <FloatingGeometry type="hexagon" size={35} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4, ease: "easeOut" }}
      >
        <motion.div
          variants={{
            animate: {
              y: [0, -25, 0],
              x: [0, 20, 0],
              scale: [1, 1.3, 1],
              transition: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
          animate="animate"
        >
          <FloatingGeometry type="diamond" size={30} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4.5, ease: "easeOut" }}
      >
        <motion.div
          variants={{
            animate: {
              y: [0, 20, 0],
              rotate: [0, -90, 0],
              transition: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
          animate="animate"
        >
          <FloatingGeometry type="triangle" size={25} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SacredGeometryBackground;

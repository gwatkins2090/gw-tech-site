'use client';

import { useState, useEffect, useRef } from 'react';

const AquariusLinks = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse move handler for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Aquarius constellation star positions with personalized links
  const stars = [
    { id: 1, x: 50, y: 20, size: 2.5, link: 'https://github.com/gwatkins2090', label: 'GitHub', depth: 1 },
    { id: 2, x: 42, y: 28, size: 2, link: 'https://linkedin.com/in/yourusername', label: 'LinkedIn', depth: 0.8 },
    { id: 3, x: 48, y: 35, size: 2.5, link: 'https://twitter.com/yourusername', label: 'Twitter', depth: 1.2 },
    { id: 4, x: 55, y: 32, size: 2, link: '/#about', label: 'About Me', depth: 0.9 },
    { id: 5, x: 35, y: 40, size: 2, link: '/documentation', label: 'Documentation', depth: 0.7 },
    { id: 6, x: 45, y: 50, size: 3, link: 'mailto:hello@watkinsgeorge.com', label: 'Email', depth: 1.5 },
    { id: 7, x: 52, y: 55, size: 2, link: '/#projects', label: 'Projects', depth: 1.1 },
    { id: 8, x: 42, y: 62, size: 2.5, link: '/assets/George Watkins Resume 2025.pdf', label: 'Resume', depth: 1.3 },
    { id: 9, x: 58, y: 48, size: 2, link: '/#skills', label: 'Skills', depth: 0.85 },
    { id: 10, x: 60, y: 60, size: 2, link: '/#contact', label: 'Contact', depth: 1 },
  ];

  // Constellation connections (accurate Aquarius pattern)
  const connections = [
    [1, 2], [1, 4], [2, 3], [3, 4], [2, 5], [3, 6],
    [6, 7], [6, 9], [7, 8], [9, 10]
  ];

  // Generate random background stars with layers for parallax
  const [bgStars] = useState(() =>
    Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.3,
      opacity: Math.random() * 0.7 + 0.3,
      duration: Math.random() * 4 + 2,
      layer: Math.floor(Math.random() * 3), // 0, 1, 2 for parallax layers
      twinkleDelay: Math.random() * 5
    }))
  );

  // Generate shooting stars
  const [shootingStars] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: Math.random() * 15 + 5,
      duration: Math.random() * 1.5 + 0.5,
      startX: Math.random() * 100,
      startY: Math.random() * 50,
    }))
  );

  // Generate floating particles
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10
    }))
  );

  // SVG Star Shape Component
  const StarShape = ({ size, className = '' }: { size: number; className?: string }) => {
    const points = 5;
    const outerRadius = size;
    const innerRadius = size * 0.4;

    let path = '';
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI * i) / points - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
    }
    path += 'Z';

    return (
      <svg
        width={size * 2}
        height={size * 2}
        viewBox={`${-size} ${-size} ${size * 2} ${size * 2}`}
        className={className}
      >
        <path d={path} fill="currentColor" />
      </svg>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#000000]">
      {/* Animated background stars with parallax layers */}
      <div className="absolute inset-0">
        {bgStars.map(star => {
          const parallaxX = (mousePos.x - 0.5) * (star.layer + 1) * 20;
          const parallaxY = (mousePos.y - 0.5) * (star.layer + 1) * 20;

          return (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `calc(${star.x}% + ${parallaxX}px)`,
                top: `calc(${star.y}% + ${parallaxY}px)`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity * (0.4 + star.layer * 0.2),
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.twinkleDelay}s`,
                filter: `blur(${star.layer * 0.3}px)`,
                transform: `scale(${1 - star.layer * 0.15})`
              }}
            />
          );
        })}
      </div>

      {/* Shooting stars */}
      <div className="absolute inset-0 pointer-events-none">
        {shootingStars.map(star => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-shootingStar"
            style={{
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              boxShadow: '0 0 4px 2px rgba(255, 255, 255, 0.8), 0 0 8px 4px rgba(100, 200, 255, 0.4)'
            }}
          />
        ))}
      </div>

      {/* Floating particles / cosmic dust */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-cyan-200/20 animate-floatParticle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Enhanced nebula clouds with drift and color shifts */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/40 via-pink-500/30 to-transparent rounded-full blur-3xl animate-nebulaDrift" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-blue-600/30 via-cyan-500/25 to-transparent rounded-full blur-3xl animate-nebulaDrift" style={{ animationDelay: '3s', animationDuration: '25s' }} />
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/20 via-purple-500/20 to-transparent rounded-full blur-3xl animate-nebulaPulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Aurora borealis waves */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-green-400/20 via-cyan-400/10 to-transparent animate-auroraWave" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-400/20 via-pink-400/10 to-transparent animate-auroraWave" style={{ animationDelay: '2s', animationDuration: '18s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">

        {/* SVG Constellation with enhanced glow lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: mounted ? 1 : 0, transition: 'opacity 1.5s ease-in' }}
        >
          <defs>
            {/* Gradient for constellation lines */}
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(100, 200, 255, 0.4)" />
              <stop offset="50%" stopColor="rgba(150, 220, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(100, 200, 255, 0.4)" />
            </linearGradient>

            {/* Glow filter for lines */}
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Draw constellation lines with glow */}
          {connections.map(([start, end], idx) => {
            const startStar = stars.find(s => s.id === start);
            const endStar = stars.find(s => s.id === end);
            if (!startStar || !endStar) return null;
            return (
              <g key={idx}>
                {/* Glow layer */}
                <line
                  x1={`${startStar.x}%`}
                  y1={`${startStar.y}%`}
                  x2={`${endStar.x}%`}
                  y2={`${endStar.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  opacity="0.3"
                  filter="url(#lineGlow)"
                  className="animate-drawLine animate-linePulse"
                  style={{
                    strokeDasharray: 1000,
                    strokeDashoffset: 1000,
                    animationDelay: `${idx * 0.2}s`
                  }}
                />
                {/* Main line */}
                <line
                  x1={`${startStar.x}%`}
                  y1={`${startStar.y}%`}
                  x2={`${endStar.x}%`}
                  y2={`${endStar.y}%`}
                  stroke="rgba(150, 200, 255, 0.5)"
                  strokeWidth="1.5"
                  className="animate-drawLine"
                  style={{
                    strokeDasharray: 1000,
                    strokeDashoffset: 1000,
                    animationDelay: `${idx * 0.2}s`
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Constellation stars with links - Enhanced SVG stars */}
        <div className="absolute inset-0">
          {stars.map((star, idx) => (
            <a
              key={star.id}
              href={star.link}
              target={star.link.startsWith('http') ? '_blank' : undefined}
              rel={star.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="absolute group pointer-events-auto"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: 0,
                animation: `fadeInStar 0.8s ease-out forwards, zoomFromSpace 1.5s ease-out forwards`,
                animationDelay: `${idx * 0.15 + 0.5}s`,
                filter: `brightness(${0.8 + star.depth * 0.3})`
              }}
            >
              {/* Outer glow ring */}
              <div className="absolute inset-0 -m-8 bg-gradient-radial from-cyan-400/30 via-blue-400/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

              {/* Star burst rays */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                      transformOrigin: 'center'
                    }}
                  />
                ))}
              </div>

              {/* Main star glow */}
              <div className="absolute inset-0 -m-4 bg-cyan-400/30 rounded-full blur-md opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500" />

              {/* SVG Star Shape */}
              <div
                className="relative text-white drop-shadow-[0_0_8px_rgba(100,200,255,0.8)] group-hover:drop-shadow-[0_0_16px_rgba(100,220,255,1)] transition-all duration-300 animate-starPulse group-hover:animate-starRotate"
                style={{
                  filter: `drop-shadow(0 0 ${star.depth * 3}px rgba(100, 200, 255, 0.6))`
                }}
              >
                <StarShape size={star.size * 5} className="group-hover:scale-125 transition-transform duration-300" />
              </div>

              {/* Sparkle effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-sparkle" style={{ animationDelay: '0s' }} />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-200 rounded-full animate-sparkle" style={{ animationDelay: '0.2s' }} />
                <div className="absolute top-0 left-0 w-1 h-1 bg-blue-200 rounded-full animate-sparkle" style={{ animationDelay: '0.4s' }} />
              </div>

              {/* Enhanced Label with gradient */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-5 py-2.5 bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-md text-cyan-100 text-sm font-medium rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 border border-cyan-400/30 group-hover:border-cyan-300/50 group-hover:translate-y-1 shadow-lg shadow-cyan-500/20">
                <span className="relative z-10">{star.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 rounded-full" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AquariusLinks;


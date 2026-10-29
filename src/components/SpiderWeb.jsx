import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SpiderWeb = ({ className = '' }) => {
  const svgRef = useRef(null);
  const linesRef = useRef([]);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      // Create web drawing animation
      const lines = linesRef.current;
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Animate each web line
      tl.fromTo(lines,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.6, duration: 1.2, stagger: 0.05 }
      );

      // Pulse glow effect
      tl.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      }, '-=0.5');

      // Mouse move interaction
      const handleMouseMove = (e) => {
        const rect = svgRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        gsap.to(lines, {
          x: (x - 0.5) * 10,
          y: (y - 0.5) * 10,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        ctx.revert();
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center glow */}
      <g ref={glowRef}>
        <circle cx="200" cy="200" r="30" fill="url(#webGlow)" />
        <circle cx="200" cy="200" r="25" fill="url(#webCenter)" />
      </g>

      {/* Radial web lines */}
      <g>
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * Math.PI) / 8;
          const length = 180 + (i % 4) * 20;
          const x2 = 200 + Math.cos(angle) * length;
          const y2 = 200 + Math.sin(angle) * length;
          
          return (
            <line
              key={i}
              ref={el => linesRef.current[i] = el}
              x1="200"
              y1="200"
              x2={x2}
              y2={y2}
              stroke="url(#webLine)"
              strokeWidth="0.8"
              strokeDasharray="4 2"
              opacity="0.6"
            />
          );
        })}
      </g>

      {/* Circular web rings */}
      <g>
        {[50, 90, 130, 170].map((radius, i) => (
          <circle
            key={i}
            ref={el => linesRef.current[16 + i] = el}
            cx="200"
            cy="200"
            r={radius}
            stroke="url(#webRing)"
            strokeWidth="0.6"
            strokeDasharray="6 3"
            opacity="0.5"
            fill="none"
          />
        ))}
      </g>

      {/* Web connections */}
      <g>
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * Math.PI) / 12;
          const x1 = 200 + Math.cos(angle) * 50;
          const y1 = 200 + Math.sin(angle) * 50;
          const x2 = 200 + Math.cos(angle + 0.3) * 170;
          const y2 = 200 + Math.sin(angle + 0.3) * 170;
          
          return (
            <line
              key={i}
              ref={el => linesRef.current[20 + i] = el}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#webConnect)"
              strokeWidth="0.4"
              strokeDasharray="3 2"
              opacity="0.4"
            />
          );
        })}
      </g>

      {/* Web dots */}
      <g>
        {Array.from({ length: 32 }).map((_, i) => {
          const angle = (i * Math.PI) / 16;
          const radius = 30 + (i % 8) * 20;
          const x = 200 + Math.cos(angle) * radius;
          const y = 200 + Math.sin(angle) * radius;
          
          return (
            <circle
              key={i}
              ref={el => linesRef.current[44 + i] = el}
              cx={x}
              cy={y}
              r="0.8"
              fill="url(#webDot)"
              opacity="0.7"
            />
          );
        })}
      </g>

      {/* Gradient definitions */}
      <defs>
        <radialGradient id="webGlow">
          <stop offset="0%" stopColor="#e63946" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#e63946" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
        </radialGradient>
        
        <radialGradient id="webCenter">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e63946" />
        </radialGradient>

        <linearGradient id="webLine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e63946" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#1d3557" />
        </linearGradient>

        <linearGradient id="webRing" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e63946" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1d3557" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="webConnect" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e63946" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1d3557" stopOpacity="0.6" />
        </linearGradient>

        <radialGradient id="webDot">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e63946" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default SpiderWeb;
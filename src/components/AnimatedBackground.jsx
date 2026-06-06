import React from 'react';

export default function AnimatedBackground({ conditionCode }) {
  // Subtle color shifts based on weather condition
  const getOrbColors = () => {
    const c = parseInt(conditionCode ?? 0, 10);
    if (c === 0) return ['#1450a0', '#fbbf24', '#0e3a6e']; // clear: blue + gold
    if (c <= 2) return ['#1a5cbf', '#94a3b8', '#0f3460'];  // partly cloudy
    if (c <= 3) return ['#374151', '#4b5563', '#1f2937'];  // overcast
    if (c <= 57) return ['#1e3a5f', '#6b7280', '#0f2a45']; // drizzle
    if (c <= 67) return ['#0f3a6e', '#1e40af', '#0a2040']; // rain
    if (c <= 77) return ['#93c5fd', '#bfdbfe', '#60a5fa']; // snow
    if (c <= 99) return ['#312e81', '#1e1b4b', '#4c1d95']; // thunderstorm
    return ['#1450a0', '#0e3a6e', '#041424'];
  };

  const [c1, c2, c3] = getOrbColors();

  return (
    <div className="animated-bg" aria-hidden="true">
      {/* Stars / noise texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient orbs */}
      <div
        className="orb"
        style={{
          width: '600px',
          height: '600px',
          top: '-100px',
          left: '-100px',
          background: c1,
          animationDuration: '25s',
        }}
      />
      <div
        className="orb"
        style={{
          width: '500px',
          height: '500px',
          top: '40%',
          right: '-150px',
          background: c2,
          animationDuration: '18s',
          animationDelay: '-8s',
          opacity: 0.1,
        }}
      />
      <div
        className="orb"
        style={{
          width: '400px',
          height: '400px',
          bottom: '-80px',
          left: '30%',
          background: c3,
          animationDuration: '22s',
          animationDelay: '-14s',
          opacity: 0.08,
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2, 11, 24, 0.6) 100%)',
        }}
      />
    </div>
  );
}

import React, { useState } from 'react';

export default function AiInsightSection({ aiSummary }) {
  const [expanded, setExpanded] = useState(false);

  // Gracefully hide if no AI summary
  if (!aiSummary) return null;

  const isLong = aiSummary.length > 200;
  const displayText = isLong && !expanded
    ? `${aiSummary.slice(0, 200)}…`
    : aiSummary;

  return (
    <div
      className="glass-card p-5 md:p-6 section-enter border border-amber-400/20 glow-gold"
      style={{ animationDelay: '0.3s' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
          <span className="text-sm">✨</span>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-white">AI Weather Insight</h2>
          <p className="text-amber-300/50 text-xs font-mono">Powered by WeatherAI</p>
        </div>
      </div>

      {/* AI Summary text */}
      <div className="relative">
        {/* Decorative quote mark */}
        <span className="absolute -top-2 -left-1 text-4xl text-amber-400/15 font-serif select-none" aria-hidden>❝</span>
        <p className="text-white/75 text-sm md:text-base leading-relaxed pl-4 font-body">
          {displayText}
        </p>
      </div>

      {/* Expand/Collapse toggle */}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-amber-300/60 hover:text-amber-300 text-xs font-mono transition-colors duration-200"
        >
          {expanded ? '▲ Show less' : '▼ Read more'}
        </button>
      )}
    </div>
  );
}

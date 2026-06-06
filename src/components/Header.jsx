import React from 'react';

export default function Header({ onRefresh, loading, lastUpdated }) {
  const formattedTime = lastUpdated
    ? new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date(lastUpdated))
    : null;

  return (
    <header className="relative z-10 flex items-center justify-between px-4 py-4 md:px-8 md:py-5">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
          <span className="text-sm">⛅</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-white text-base leading-none">
            Weather<span className="text-blue-400">AI</span>
          </h1>
          <p className="text-white/30 text-[10px] font-mono leading-none mt-0.5">Intelligence Dashboard</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {formattedTime && (
          <span className="hidden md:block text-white/30 text-xs font-mono">
            Updated {formattedTime}
          </span>
        )}
        <button
          onClick={onRefresh}
          disabled={loading}
          title="Refresh weather data"
          className={`
            w-9 h-9 rounded-xl flex items-center justify-center
            border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20
            transition-all duration-200 text-white/60 hover:text-white
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <span className={`text-sm ${loading ? 'animate-spin' : ''}`}>↻</span>
        </button>
      </div>
    </header>
  );
}

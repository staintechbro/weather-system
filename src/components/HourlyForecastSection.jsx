import React from 'react';
import WeatherIcon from './WeatherIcon';
import { formatTime, round1 } from '../utils/helpers';

export default function HourlyForecastSection({ hourly, timezone }) {
  if (!hourly || hourly.length === 0) return null;

  // Show up to 24 hours
  const items = hourly.slice(0, 24);

  return (
    <div className="glass-card p-5 md:p-6 section-enter" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-white">Hourly Forecast</h2>
        <span className="text-white/30 text-xs font-mono">Next {items.length}h</span>
      </div>

      <div className="scroll-container pb-2">
        <div className="flex gap-2 w-max">
          {items.map((hour, index) => {
            const isNow = index === 0;
            const precip = hour.precipitation_probability;
            const showPrecip = precip != null && precip > 0;

            return (
              <div
                key={hour.time || index}
                className={`
                  flex flex-col items-center gap-2 px-3 py-4 rounded-2xl min-w-[72px]
                  border transition-all duration-200 cursor-default
                  ${isNow
                    ? 'bg-blue-500/20 border-blue-400/40 glow-blue'
                    : 'bg-white/4 border-white/8 hover:bg-white/8 hover:border-white/15'
                  }
                `}
              >
                {/* Time */}
                <span className={`text-xs font-mono font-medium ${isNow ? 'text-blue-300' : 'text-white/50'}`}>
                  {isNow ? 'Now' : formatTime(hour.time, timezone)}
                </span>

                {/* Icon */}
                <WeatherIcon
                  icon={hour.icon}
                  conditionCode={hour.condition_code}
                  size={32}
                />

                {/* Temperature */}
                <span className={`text-sm font-bold ${isNow ? 'text-white' : 'text-white/80'}`}>
                  {hour.temperature != null ? `${Math.round(hour.temperature)}°` : '—'}
                </span>

                {/* Precipitation */}
                <span
                  className={`text-xs font-mono ${
                    showPrecip
                      ? precip > 60 ? 'text-blue-300' : 'text-white/40'
                      : 'text-white/20'
                  }`}
                >
                  {showPrecip ? `${precip}%` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll hint */}
      <p className="text-white/20 text-xs font-mono text-right mt-2 pr-1">← scroll →</p>
    </div>
  );
}

import React from 'react';
import WeatherIcon from './WeatherIcon';
import { formatDay, formatTime, round1 } from '../utils/helpers';

export default function DailyForecastSection({ daily, timezone }) {
  if (!daily || daily.length === 0) return null;

  const items = daily.slice(0, 7);

  // Find overall temp range for relative bar sizing
  const allTemps = items.flatMap(d => [d.temp_min, d.temp_max]).filter(v => v != null);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);
  const range = globalMax - globalMin || 1;

  return (
    <div className="glass-card p-5 md:p-6 section-enter" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-white">7-Day Forecast</h2>
        <span className="text-white/30 text-xs font-mono">{items.length} days</span>
      </div>

      <div className="flex flex-col divide-y divide-white/6">
        {items.map((day, index) => {
          const isToday = index === 0;
          const dayLabel = formatDay(day.date, timezone);
          const precip = day.precipitation_probability;
          const showPrecip = precip != null && precip > 0;

          // Temperature bar offsets
          const barLeft = ((day.temp_min - globalMin) / range) * 100;
          const barWidth = (((day.temp_max ?? day.temp_min) - (day.temp_min ?? day.temp_max)) / range) * 100;

          return (
            <div
              key={day.date || index}
              className={`
                flex items-center gap-3 py-3.5 first:pt-0 last:pb-0
                transition-colors duration-150 rounded-lg
                ${isToday ? 'opacity-100' : 'opacity-80 hover:opacity-100'}
              `}
            >
              {/* Day label */}
              <div className="w-20 shrink-0">
                <span className={`text-sm font-medium ${isToday ? 'text-blue-300' : 'text-white/70'}`}>
                  {dayLabel}
                </span>
              </div>

              {/* Icon */}
              <div className="w-8 shrink-0 flex justify-center">
                <WeatherIcon
                  icon={day.icon}
                  conditionCode={day.condition_code}
                  size={28}
                />
              </div>

              {/* Precipitation */}
              <div className="w-10 shrink-0 text-right">
                {showPrecip ? (
                  <span className={`text-xs font-mono ${precip > 60 ? 'text-blue-300' : 'text-white/40'}`}>
                    {precip}%
                  </span>
                ) : (
                  <span className="text-white/20 text-xs">—</span>
                )}
              </div>

              {/* Temperature range bar */}
              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs text-white/50 font-mono w-8 text-right shrink-0">
                  {day.temp_min != null ? `${Math.round(day.temp_min)}°` : '—'}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 relative overflow-hidden">
                  <div
                    className="absolute top-0 h-full rounded-full bg-gradient-to-r from-blue-400 to-amber-300"
                    style={{
                      left: `${barLeft}%`,
                      width: `${Math.max(barWidth, 8)}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-white font-semibold font-mono w-8 shrink-0">
                  {day.temp_max != null ? `${Math.round(day.temp_max)}°` : '—'}
                </span>
              </div>

              {/* Sunrise / Sunset */}
              {(day.sunrise || day.sunset) && (
                <div className="hidden md:flex items-center gap-3 shrink-0">
                  {day.sunrise && (
                    <span className="text-xs text-amber-300/60 font-mono">
                      🌅 {formatTime(day.sunrise, timezone, { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </span>
                  )}
                  {day.sunset && (
                    <span className="text-xs text-purple-300/60 font-mono">
                      🌇 {formatTime(day.sunset, timezone, { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import WeatherIcon from './WeatherIcon';
import { getWindDirection, getConditionLabel, round1 } from '../utils/helpers';

export default function CurrentWeatherPanel({ current, location }) {
  if (!current || !location) return null;

  const {
    temperature,
    feels_like,
    wind_speed,
    wind_direction,
    humidity,
    condition_code,
    icon,
    time,
  } = current;

  const { timezone, country } = location;

  const conditionLabel = getConditionLabel(condition_code);
  const windDir = getWindDirection(wind_direction);

  // Format current time
  const formattedTime = (() => {
    try {
      const date = time ? new Date(time) : new Date();
      return new Intl.DateTimeFormat('en-US', {
        timeZone: timezone || 'UTC',
        weekday: 'long',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(date);
    } catch {
      return '';
    }
  })();

  const stats = [
    {
      icon: '💧',
      label: 'Humidity',
      value: humidity != null ? `${humidity}%` : '—',
    },
    {
      icon: '🌡️',
      label: 'Feels Like',
      value: feels_like != null ? `${round1(feels_like)}°C` : '—',
    },
    {
      icon: '💨',
      label: 'Wind',
      value: wind_speed != null ? `${round1(wind_speed)} km/h ${windDir}` : '—',
    },
  ];

  return (
    <div className="glass-card glow-blue p-6 md:p-8 section-enter">
      {/* Location header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-blue-300 text-sm font-medium tracking-widest uppercase font-mono">
            📍 {country || 'Location'}
          </span>
        </div>
        <p className="text-white/40 text-sm font-mono">{formattedTime}</p>
        {timezone && (
          <p className="text-white/30 text-xs font-mono mt-0.5">{timezone}</p>
        )}
      </div>

      {/* Temperature + icon */}
      <div className="flex items-center gap-5 mb-6">
        <div className="relative">
          <WeatherIcon
            icon={icon}
            conditionCode={condition_code}
            size={80}
            className="drop-shadow-lg"
          />
        </div>
        <div>
          <div className="flex items-start">
            <span className="font-display text-7xl md:text-8xl font-bold leading-none text-white tracking-tighter">
              {temperature != null ? Math.round(temperature) : '—'}
            </span>
            <span className="font-display text-3xl text-blue-300 mt-3 ml-1">°C</span>
          </div>
          <p className="text-white/60 text-lg mt-1 font-body">{conditionLabel}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3"
          >
            <span className="text-xl">{stat.icon}</span>
            <div>
              <p className="text-white/40 text-xs font-mono uppercase tracking-wider">{stat.label}</p>
              <p className="text-white font-semibold text-sm">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

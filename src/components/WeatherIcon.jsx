import React from 'react';

/**
 * Renders the weather icon from the API (URL) or falls back to an emoji
 * based on the condition_code.
 */
export default function WeatherIcon({ icon, conditionCode, size = 40, className = '' }) {
  const emoji = getWeatherEmoji(conditionCode);

  if (icon) {
    return (
      <img
        src={icon}
        alt={`weather condition ${conditionCode}`}
        width={size}
        height={size}
        className={`object-contain ${className}`}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling?.style.removeProperty('display');
        }}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ fontSize: size * 0.8 }}
      role="img"
      aria-label={`weather condition ${conditionCode}`}
    >
      {emoji}
    </span>
  );
}

function getWeatherEmoji(code) {
  if (code == null) return '🌡️';
  const c = parseInt(code, 10);
  if (c === 0) return '☀️';
  if (c === 1) return '🌤️';
  if (c === 2) return '⛅';
  if (c === 3) return '☁️';
  if (c <= 49) return '🌫️';
  if (c <= 57) return '🌦️';
  if (c <= 67) return '🌧️';
  if (c <= 77) return '❄️';
  if (c <= 82) return '🌦️';
  if (c <= 86) return '🌨️';
  if (c <= 99) return '⛈️';
  return '🌡️';
}

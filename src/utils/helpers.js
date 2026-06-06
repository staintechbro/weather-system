/**
 * Format a time string (ISO or unix) to a human-readable time.
 * @param {string|number} timeValue
 * @param {string} timezone - IANA timezone string
 * @param {object} options - Intl.DateTimeFormat options
 */
export function formatTime(timeValue, timezone = 'UTC', options = {}) {
  try {
    const date = typeof timeValue === 'number'
      ? new Date(timeValue * 1000)
      : new Date(timeValue);

    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      ...options,
    }).format(date);
  } catch {
    return timeValue;
  }
}

/**
 * Format a date string to a day name.
 */
export function formatDay(dateValue, timezone = 'UTC') {
  try {
    const date = new Date(dateValue);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const fmt = (d) => d.toLocaleDateString('en-US', { timeZone: timezone, weekday: 'short', month: 'short', day: 'numeric' });
    const dateStr = fmt(date);
    const todayStr = fmt(today);
    const tomorrowStr = fmt(tomorrow);

    if (dateStr === todayStr) return 'Today';
    if (dateStr === tomorrowStr) return 'Tomorrow';

    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateValue;
  }
}

/**
 * Get a wind direction label from degrees.
 */
export function getWindDirection(degrees) {
  if (degrees == null) return '—';
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return dirs[index];
}

/**
 * Map a condition_code to a display label.
 * Based on common WMO weather interpretation codes.
 */
export function getConditionLabel(code) {
  if (code == null) return 'Unknown';
  const c = parseInt(code, 10);
  if (c === 0) return 'Clear Sky';
  if (c <= 2) return 'Partly Cloudy';
  if (c === 3) return 'Overcast';
  if (c <= 49) return 'Foggy';
  if (c <= 57) return 'Drizzle';
  if (c <= 67) return 'Rain';
  if (c <= 77) return 'Snow';
  if (c <= 82) return 'Rain Showers';
  if (c <= 86) return 'Snow Showers';
  if (c <= 99) return 'Thunderstorm';
  return 'Unknown';
}

/**
 * Round a number to 1 decimal place.
 */
export function round1(num) {
  if (num == null) return '—';
  return Math.round(num * 10) / 10;
}

/**
 * Clamp a value between min and max.
 */
export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

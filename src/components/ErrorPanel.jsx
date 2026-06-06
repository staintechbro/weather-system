import React from 'react';

export default function ErrorPanel({ error, onRetry }) {
  const isAuthError = error?.status === 401 || error?.status === 403;
  const isNotFound = error?.status === 404;
  const isServerError = error?.status >= 500;

  let title = 'Could not load weather data';
  let message = 'Something went wrong while fetching your weather forecast.';
  let icon = '⚠️';

  if (isAuthError) {
    title = 'Authentication Required';
    message = 'Please check your VITE_WEATHER_AI_KEY environment variable.';
    icon = '🔑';
  } else if (isNotFound) {
    title = 'Location Not Found';
    message = 'We couldn\'t find weather data for this location.';
    icon = '📍';
  } else if (isServerError) {
    title = 'Service Unavailable';
    message = 'The weather service is temporarily unavailable. Please try again later.';
    icon = '🌐';
  } else if (!navigator.onLine) {
    title = 'No Internet Connection';
    message = 'Please check your connection and try again.';
    icon = '📡';
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="glass-card p-8 max-w-md w-full text-center section-enter border border-red-400/20">
        <div className="text-5xl mb-4">{icon}</div>
        <h2 className="font-display text-xl font-semibold text-white mb-2">{title}</h2>
        <p className="text-white/50 text-sm font-body mb-6">{message}</p>

        {error?.message && (
          <p className="text-red-300/60 text-xs font-mono bg-red-500/10 rounded-lg px-3 py-2 mb-5">
            {error.message}
          </p>
        )}

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/35 border border-blue-400/30 hover:border-blue-400/60 text-blue-300 hover:text-white text-sm font-medium transition-all duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

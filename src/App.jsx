import React, { useState } from 'react';
import { useWeather } from './hooks/useWeather';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import CurrentWeatherPanel from './components/CurrentWeatherPanel';
import HourlyForecastSection from './components/HourlyForecastSection';
import DailyForecastSection from './components/DailyForecastSection';
import AiInsightSection from './components/AiInsightSection';
import ErrorPanel from './components/ErrorPanel';
import {
  CurrentWeatherSkeleton,
  HourlyForecastSkeleton,
  DailyForecastSkeleton,
  AiInsightSkeleton,
} from './components/Skeletons';

export default function App() {
  const { weatherData, loading, error, refresh, geoStatus } = useWeather();
  const [lastUpdated] = useState(Date.now());

  const conditionCode = weatherData?.current?.condition_code ?? null;
  const timezone = weatherData?.location?.timezone ?? 'UTC';

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg-deep)' }}>
      {/* Animated background */}
      <AnimatedBackground conditionCode={conditionCode} />

      {/* Main layout */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header
          onRefresh={refresh}
          loading={loading}
          lastUpdated={lastUpdated}
        />

        <main className="flex-1 px-4 pb-10 md:px-8 max-w-4xl mx-auto w-full">
          {/* Geo location notice */}
          {geoStatus === 'denied' && !loading && !error && (
            <div className="mb-4 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-300/70 text-xs font-mono">
              📍 Location access denied — showing default location
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <ErrorPanel error={error} onRetry={refresh} />
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="flex flex-col gap-4">
              <CurrentWeatherSkeleton />
              <AiInsightSkeleton />
              <HourlyForecastSkeleton />
              <DailyForecastSkeleton />
            </div>
          )}

          {/* Loaded content */}
          {!loading && !error && weatherData && (
            <div className="flex flex-col gap-4">
              <CurrentWeatherPanel
                current={weatherData.current}
                location={weatherData.location}
              />

              {/* AI Insight — shown before hourly/daily for prominence */}
              <AiInsightSection aiSummary={weatherData.ai_summary} />

              <HourlyForecastSection
                hourly={weatherData.hourly}
                timezone={timezone}
              />

              <DailyForecastSection
                daily={weatherData.daily}
                timezone={timezone}
              />

              {/* Footer */}
              <footer className="text-center py-4">
                <p className="text-white/20 text-xs font-mono">
                  WeatherAI Intelligence Dashboard
                  {weatherData.location?.lat && (
                    <> · {weatherData.location.lat.toFixed(3)}, {weatherData.location.lon.toFixed(3)}</>
                  )}
                </p>
              </footer>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

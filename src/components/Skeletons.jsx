import React from 'react';

export function SkeletonBlock({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

export function CurrentWeatherSkeleton() {
  return (
    <div className="glass-card p-6 md:p-8 glow-blue">
      <div className="flex flex-col gap-4">
        <SkeletonBlock className="h-5 w-40" />
        <SkeletonBlock className="h-4 w-28" />
        <div className="flex items-center gap-6 mt-2">
          <SkeletonBlock className="h-24 w-24 rounded-full" />
          <div className="flex flex-col gap-3">
            <SkeletonBlock className="h-16 w-40" />
            <SkeletonBlock className="h-5 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <SkeletonBlock className="h-12" />
          <SkeletonBlock className="h-12" />
          <SkeletonBlock className="h-12" />
          <SkeletonBlock className="h-12" />
        </div>
      </div>
    </div>
  );
}

export function HourlyForecastSkeleton() {
  return (
    <div className="glass-card p-5">
      <SkeletonBlock className="h-5 w-36 mb-4" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 items-center min-w-[72px]">
            <SkeletonBlock className="h-4 w-14" />
            <SkeletonBlock className="h-10 w-10 rounded-full" />
            <SkeletonBlock className="h-4 w-10" />
            <SkeletonBlock className="h-3 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DailyForecastSkeleton() {
  return (
    <div className="glass-card p-5">
      <SkeletonBlock className="h-5 w-36 mb-4" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-8 w-8 rounded-full" />
            <SkeletonBlock className="h-4 w-16" />
            <SkeletonBlock className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AiInsightSkeleton() {
  return (
    <div className="glass-card p-5 glow-gold">
      <SkeletonBlock className="h-5 w-44 mb-4" />
      <SkeletonBlock className="h-4 w-full mb-2" />
      <SkeletonBlock className="h-4 w-11/12 mb-2" />
      <SkeletonBlock className="h-4 w-9/12" />
    </div>
  );
}

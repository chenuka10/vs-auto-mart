import React from "react";

export default function VehicleDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:py-12">
      {/* Back button skeleton */}
      <div className="mb-4 sm:mb-6 h-5 w-32 rounded bg-graphite-800 animate-pulse" />

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-5 lg:gap-10">
        {/* Gallery Skeleton */}
        <div className="lg:col-span-3">
          <div className="aspect-[4/3] w-full rounded-2xl sm:rounded-[24px] bg-graphite-900/60 animate-pulse border border-graphite-800/50 relative overflow-hidden">
             <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-graphite-700/20 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
          <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 w-20 sm:h-20 sm:w-24 shrink-0 rounded-lg sm:rounded-xl bg-graphite-800 animate-pulse" />
            ))}
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="lg:col-span-2">
          <div className="h-6 w-24 rounded-full bg-graphite-800 animate-pulse" />
          <div className="mt-3 sm:mt-4 h-8 sm:h-10 w-3/4 rounded bg-graphite-800 animate-pulse" />
          <div className="mt-2 sm:mt-3 h-4 sm:h-5 w-1/2 rounded bg-graphite-800/60 animate-pulse" />
          
          <div className="mt-4 sm:mt-6 h-8 sm:h-10 w-1/3 rounded bg-graphite-800 animate-pulse" />

          {/* Specs grid */}
          <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-4 gap-y-3 sm:gap-y-4 border-y border-graphite-800/50 py-5 sm:py-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <div className="h-3 w-16 rounded bg-graphite-800/60 animate-pulse mb-1.5" />
                <div className="h-4 sm:h-5 w-24 rounded bg-graphite-800 animate-pulse" />
              </div>
            ))}
          </div>

          <div className="mt-5 sm:mt-6 space-y-2.5">
            <div className="h-3.5 sm:h-4 w-full rounded bg-graphite-800/40 animate-pulse" />
            <div className="h-3.5 sm:h-4 w-5/6 rounded bg-graphite-800/40 animate-pulse" />
            <div className="h-3.5 sm:h-4 w-4/6 rounded bg-graphite-800/40 animate-pulse" />
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col gap-3">
            <div className="h-12 sm:h-14 w-full rounded-plate bg-graphite-800 animate-pulse" />
            <div className="h-12 sm:h-14 w-full rounded-plate bg-graphite-800/60 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

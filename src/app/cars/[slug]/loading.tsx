import React from "react";

export default function VehicleDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Back button skeleton */}
      <div className="mb-6 h-5 w-32 rounded bg-graphite-800 animate-pulse" />

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Gallery Skeleton */}
        <div className="lg:col-span-3">
          <div className="aspect-[4/3] w-full rounded-[24px] bg-graphite-900/60 animate-pulse border border-graphite-800/50 relative overflow-hidden">
             <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-graphite-700/20 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
          <div className="mt-4 flex gap-3 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 w-24 shrink-0 rounded-xl bg-graphite-800 animate-pulse" />
            ))}
          </div>
        </div>

        {/* Details Skeleton */}
        <div className="lg:col-span-2">
          <div className="h-6 w-24 rounded-full bg-graphite-800 animate-pulse" />
          <div className="mt-4 h-10 w-3/4 rounded bg-graphite-800 animate-pulse" />
          <div className="mt-3 h-5 w-1/2 rounded bg-graphite-800/60 animate-pulse" />
          
          <div className="mt-6 h-12 w-1/3 rounded bg-graphite-800 animate-pulse" />

          {/* Specs grid */}
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 border-y border-graphite-800/50 py-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i}>
                <div className="h-3 w-16 rounded bg-graphite-800/60 animate-pulse mb-2" />
                <div className="h-5 w-24 rounded bg-graphite-800 animate-pulse" />
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-graphite-800/40 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-graphite-800/40 animate-pulse" />
            <div className="h-4 w-4/6 rounded bg-graphite-800/40 animate-pulse" />
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <div className="h-14 w-full rounded-plate bg-graphite-800 animate-pulse" />
            <div className="h-14 w-full rounded-plate bg-graphite-800/60 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function InventoryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      {/* Header Skeleton */}
      <div className="mb-10">
        <div className="h-4 w-32 rounded bg-graphite-800 animate-pulse" />
        <div className="mt-3 h-10 w-64 rounded-lg bg-graphite-800 animate-pulse" />
        <div className="mt-4 h-6 w-96 max-w-full rounded bg-graphite-800/60 animate-pulse" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
        {/* Filters Skeleton */}
        <div className="mb-8 w-full lg:mb-0 lg:w-64 lg:shrink-0">
          <div className="rounded-[24px] border border-graphite-800/50 bg-graphite-900/20 p-6 h-[400px] animate-pulse">
            <div className="h-6 w-24 rounded bg-graphite-800 mb-6" />
            <div className="space-y-4">
              <div className="h-10 w-full rounded-plate bg-graphite-800/50" />
              <div className="h-10 w-full rounded-plate bg-graphite-800/50" />
              <div className="h-10 w-full rounded-plate bg-graphite-800/50" />
              <div className="h-10 w-full rounded-plate bg-graphite-800/50" />
            </div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-5 w-32 rounded bg-graphite-800 animate-pulse" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[24px] border border-graphite-800/50 bg-graphite-900/40"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] w-full bg-graphite-800 animate-pulse relative overflow-hidden">
                  {/* Shimmer effect inside the image placeholder */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-graphite-700/20 to-transparent animate-[shimmer_1.5s_infinite]" />
                </div>
                {/* Content placeholder */}
                <div className="p-5">
                  <div className="h-6 w-2/3 rounded bg-graphite-800 animate-pulse mb-3" />
                  <div className="h-4 w-1/3 rounded bg-graphite-800/60 animate-pulse mb-6" />
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="h-3 w-full rounded bg-graphite-800/40 animate-pulse" />
                    <div className="h-3 w-full rounded bg-graphite-800/40 animate-pulse" />
                  </div>

                  <div className="h-10 w-full rounded-plate bg-graphite-800/50 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { TestimonialCard } from "@/components/reviews/TestimonialCard";
import { loadMoreTestimonials } from "@/app/reviews/actions";
import type { Testimonial } from "@/lib/types";

interface TestimonialsSectionProps {
  initialTestimonials: Testimonial[];
  totalCount: number;
}

export function TestimonialsSection({
  initialTestimonials,
  totalCount,
}: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isPending, startTransition] = useTransition();

  const hasMore = testimonials.length < totalCount;

  function handleLoadMore() {
    if (isPending || !hasMore) return;

    startTransition(async () => {
      const next = await loadMoreTestimonials(testimonials.length);

      if (next.length > 0) {
        setTestimonials((prev) => [...prev, ...next]);
      }
    });
  }

  return (
    <div>
      {/* Reviews Grid */}
      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="animate-fade-up h-full"
            style={{
              animationDelay: `${Math.min(index * 70, 600)}ms`,
            }}
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isPending}
            aria-busy={isPending}
            className="
              group inline-flex min-w-[190px] items-center justify-center
              gap-2 rounded-full
              border border-brass-500/20
              bg-graphite-900/40 px-6 py-3
              text-sm font-medium text-graphite-300
              shadow-sm backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-brass-500/50
              hover:text-brass-400
              hover:shadow-[0_10px_30px_rgba(199,158,50,0.2)]
              active:translate-y-0
              disabled:pointer-events-none
              disabled:opacity-60
            "
          >
            {isPending ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                  aria-hidden="true"
                />
                <span>Loading reviews</span>
              </>
            ) : (
              <>
                <span>Load More Reviews</span>

                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Loading announcement for screen readers */}
      <div className="sr-only" aria-live="polite">
        {isPending ? "Loading more reviews." : ""}
      </div>

      {/* All Reviews Loaded */}
      {!hasMore && testimonials.length > 0 && (
        <div className="mt-12 flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-graphite-400">
          <span className="h-px w-10 bg-graphite-700/10" />
          All reviews loaded
          <span className="h-px w-10 bg-graphite-700/10" />
        </div>
      )}
    </div>
  );
}
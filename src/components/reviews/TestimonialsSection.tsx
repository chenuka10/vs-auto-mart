"use client";

import { useState, useTransition } from "react";
import { TestimonialCard } from "@/components/reviews/TestimonialCard";
import { loadMoreTestimonials } from "@/app/reviews/actions";
import type { Testimonial } from "@/lib/types";

interface TestimonialsSectionProps {
  initialTestimonials: Testimonial[];
  totalCount: number;
}

export function TestimonialsSection({ initialTestimonials, totalCount }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isPending, startTransition] = useTransition();

  const hasMore = testimonials.length < totalCount;

  function handleLoadMore() {
    startTransition(async () => {
      const next = await loadMoreTestimonials(testimonials.length);
      setTestimonials((prev) => [...prev, ...next]);
    });
  }

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="rounded-lg border border-graphite-700/10 px-6 py-2.5 text-sm font-medium hover:bg-graphite-100 disabled:opacity-50"
          >
            {isPending ? "Loading…" : "Load More Reviews"}
          </button>
        </div>
      )}
    </div>
  );
}
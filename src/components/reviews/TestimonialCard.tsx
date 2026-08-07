import Image from "next/image";
import { StarRating } from "@/components/StarRating";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-graphite-700/10 bg-white shadow-sm">
      {/* Photo Container: Dominates ~70-75% of the visual space */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-graphite-100">
        {testimonial.photo_url ? (
          <Image
            src={testimonial.photo_url}
            alt={testimonial.reviewer_name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-graphite-400">
            No Photo Available
          </div>
        )}
      </div>

      {/* Article Content: Compact ~25% section */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="font-display font-semibold text-graphite-900">
              {testimonial.reviewer_name}
            </p>
            {testimonial.rating && (
              <StarRating rating={testimonial.rating} className="shrink-0" />
            )}
          </div>

          {testimonial.review_text && (
            <p className="mt-2 text-sm text-graphite-700 line-clamp-3">
              &ldquo;{testimonial.review_text}&rdquo;
            </p>
          )}
        </div>

        <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-graphite-500">
          {new Date(testimonial.created_at).toLocaleDateString("en-LK", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}
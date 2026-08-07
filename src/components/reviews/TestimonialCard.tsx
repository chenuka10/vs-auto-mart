import Image from "next/image";
import { StarRating } from "@/components/StarRating";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-graphite-700/10 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-graphite-100">
          {testimonial.photo_url && (
            <Image src={testimonial.photo_url} alt={testimonial.reviewer_name} fill className="object-cover" />
          )}
        </div>
        <div>
          <p className="font-display font-semibold">{testimonial.reviewer_name}</p>
          {testimonial.rating && <StarRating rating={testimonial.rating} className="mt-0.5" />}
        </div>
      </div>

      {testimonial.review_text && (
        <p className="mt-4 flex-1 text-sm text-graphite-700">&ldquo;{testimonial.review_text}&rdquo;</p>
      )}

      <p className="mt-4 text-xs uppercase tracking-wide text-graphite-500">
        {new Date(testimonial.created_at).toLocaleDateString("en-LK", { month: "long", year: "numeric" })}
      </p>
    </article>
  );
}
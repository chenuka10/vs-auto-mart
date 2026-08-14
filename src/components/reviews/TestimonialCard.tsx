import Image from "next/image";
import { StarRating } from "@/components/StarRating";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const reviewDate = new Date(testimonial.created_at).toLocaleDateString(
    "en-LK",
    {
      month: "long",
      year: "numeric",
    }
  );

  const hasPhoto = Boolean(testimonial.photo_url);

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden rounded-[22px]
        border border-brass-500/10
        bg-graphite-900/40
        shadow-[0_10px_35px_rgba(0,0,0,0.5)]
        backdrop-blur-xl
        transition-all duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-1.5
        hover:border-brass-500/40
        hover:shadow-[0_24px_60px_rgba(199,158,50,0.15)]
      "
    >
      {/* Liquid-glass highlight */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-8 top-0 z-20 h-px
          bg-gradient-to-r from-transparent via-white to-transparent
          opacity-60
        "
      />

      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-16 -top-16 z-0
          h-40 w-40 rounded-full
          bg-brass-400/[0.07]
          blur-3xl
          transition-all duration-700
          group-hover:bg-brass-400/[0.12]
        "
      />

      {hasPhoto ? (
        <>
          {/* =================================================
              PHOTO
          ================================================= */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={testimonial.photo_url!}
              alt={`${testimonial.reviewer_name} — VS Auto Mart customer review`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="
                object-cover
                transition-transform
                duration-[1000ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-[1.055]
              "
            />

            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Glass rating */}
            {testimonial.rating && (
              <div
                className="
                  absolute right-4 top-4
                  rounded-full
                  border border-white/20
                  bg-white/[0.14]
                  px-3 py-2
                  shadow-lg
                  backdrop-blur-xl
                  transition-all duration-300
                  group-hover:bg-white/[0.2]
                "
              >
                <StarRating
                  rating={testimonial.rating}
                  className="text-white"
                />
              </div>
            )}

            {/* Bottom information */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate font-display text-xl font-semibold text-white">
                    {testimonial.reviewer_name}
                  </h3>

                  <div className="mt-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
                    <span>Verified Customer</span>
                    <span className="h-1 w-1 rounded-full bg-brass-400" />
                    <span>{reviewDate}</span>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="
                    shrink-0 font-serif text-5xl leading-none
                    text-brass-400/70
                    transition-transform duration-500
                    group-hover:-translate-y-1
                  "
                >
                  “
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              PHOTO REVIEW CONTENT
          ================================================= */}
          <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
            {testimonial.review_text && (
              <p className="line-clamp-4 text-sm leading-7 text-graphite-300">
                “{testimonial.review_text}”
              </p>
            )}

            <div className="mt-auto pt-6">
              <div className="flex items-center justify-between border-t border-brass-500/10 pt-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite-400">
                  Google Review
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brass-600">
                  5-Star Experience
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* ===================================================
           TEXT-ONLY REVIEW
        =================================================== */
        <div className="relative z-10 flex flex-col p-6 sm:p-7">
          {/* Accent */}
          <div
            className="
              mb-6 h-px w-12
              bg-gradient-to-r from-brass-500 to-transparent
              transition-all duration-500
              group-hover:w-20
            "
          />

          {/* Name / rating */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-semibold text-graphite-100">
                {testimonial.reviewer_name}
              </h3>

              <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-graphite-400">
                Verified Customer · {reviewDate}
              </p>
            </div>

            {testimonial.rating && (
              <div
                className="
                  rounded-full border border-brass-500/10
                  bg-graphite-950/50 px-2.5 py-1.5
                  backdrop-blur-md
                  transition-all duration-300
                  group-hover:border-brass-500/30
                  group-hover:bg-brass-500/[0.1]
                "
              >
                <StarRating
                  rating={testimonial.rating}
                  className="text-brass-600"
                />
              </div>
            )}
          </div>

          {/* Quote */}
          {testimonial.review_text && (
            <p className="mt-6 text-[15px] leading-7 text-graphite-300">
              “{testimonial.review_text}”
            </p>
          )}

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-brass-500/10 pt-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-graphite-400">
              Google Review
            </span>

            <span
              aria-hidden="true"
              className="
                font-serif text-3xl leading-none
                text-brass-500/25
                transition-transform duration-500
                group-hover:translate-x-1
              "
            >
              ”
            </span>
          </div>
        </div>
      )}
    </article>
  );
}
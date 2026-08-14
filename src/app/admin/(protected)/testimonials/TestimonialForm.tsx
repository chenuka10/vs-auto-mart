"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial } from "./actions";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import type { Testimonial } from "@/lib/types";

interface TestimonialFormProps {
  testimonial?: Testimonial;
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [photoUrls, setPhotoUrls] = useState<string[]>(
    testimonial?.photo_url ? [testimonial.photo_url] : []
  );

  async function handleSubmit(formData: FormData) {
    if (isSaving) return;

    setIsSaving(true);
    setError(null);

    const reviewerName = String(
      formData.get("reviewer_name") ?? ""
    ).trim();

    const reviewText = String(
      formData.get("review_text") ?? ""
    ).trim();

    const videoUrl = String(
      formData.get("video_url") ?? ""
    ).trim();

    const ratingValue = String(
      formData.get("rating") ?? ""
    ).trim();

    const rating =
      ratingValue === ""
        ? null
        : Number(ratingValue);

    // Basic client-side validation
    if (!reviewerName) {
      setError("Reviewer name is required.");
      setIsSaving(false);
      return;
    }

    if (
      rating !== null &&
      (!Number.isInteger(rating) || rating < 1 || rating > 5)
    ) {
      setError("Rating must be a whole number between 1 and 5.");
      setIsSaving(false);
      return;
    }

    if (videoUrl) {
      try {
        new URL(videoUrl);
      } catch {
        setError("Please enter a valid video URL.");
        setIsSaving(false);
        return;
      }
    }

    const input = {
      reviewer_name: reviewerName,
      rating,
      review_text: reviewText || null,
      photo_url: photoUrls[0] || null,
      video_url: videoUrl || null,
      is_published: formData.get("is_published") === "on",
    };

    try {
      if (testimonial) {
        await updateTestimonial(testimonial.id, input);
      } else {
        await createTestimonial(input);
      }

      router.push("/admin/testimonials");
      router.refresh();
    } catch (error) {
      console.error("Failed to save testimonial:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save testimonial. Please try again."
      );

      setIsSaving(false);
    }
  }

  const inputStyles =
    "mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2.5 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400";

  return (
    <form
      action={handleSubmit}
      className="mt-6 max-w-xl space-y-6 text-white"
    >
      {/* Reviewer Name */}
      <div>
        <label
          htmlFor="reviewer_name"
          className="text-sm font-medium text-zinc-200"
        >
          Reviewer Name
        </label>

        <input
          id="reviewer_name"
          name="reviewer_name"
          type="text"
          defaultValue={testimonial?.reviewer_name ?? ""}
          required
          autoComplete="name"
          className={inputStyles}
          placeholder="John Perera"
        />
      </div>

      {/* Rating */}
      <div>
        <label
          htmlFor="rating"
          className="text-sm font-medium text-zinc-200"
        >
          Rating
        </label>

        <div className="mt-1 flex items-center gap-3">
          <input
            id="rating"
            type="number"
            name="rating"
            min={1}
            max={5}
            step={1}
            inputMode="numeric"
            defaultValue={testimonial?.rating ?? ""}
            className="w-24 rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2.5 text-sm text-white transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />

          <span className="text-xs text-zinc-500">
            Leave blank if no rating is available
          </span>
        </div>
      </div>

      {/* Review Text */}
      <div>
        <label
          htmlFor="review_text"
          className="text-sm font-medium text-zinc-200"
        >
          Review Text
        </label>

        <textarea
          id="review_text"
          name="review_text"
          rows={5}
          defaultValue={testimonial?.review_text ?? ""}
          className={`${inputStyles} resize-y`}
          placeholder="Paste the customer's Google review here..."
        />
      </div>

      {/* Photo */}
      <div>
        <label className="text-sm font-medium text-zinc-200">
          Customer Photo
        </label>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          Optional. One photo can be displayed on the testimonial card.
        </p>

        <div className="mt-3">
          <CloudinaryUploader
            folder="testimonials"
            initialUrls={photoUrls}
            onChange={(urls) => setPhotoUrls(urls.slice(0, 1))}
            maxFiles={1}
            label="Upload customer photo"
          />
        </div>

        {photoUrls.length > 0 && (
          <p className="mt-2 text-xs text-zinc-400">
            1 photo uploaded
          </p>
        )}
      </div>

      {/* Video */}
      <div>
        <label
          htmlFor="video_url"
          className="text-sm font-medium text-zinc-200"
        >
          Video URL
        </label>

        <input
          id="video_url"
          name="video_url"
          type="url"
          defaultValue={testimonial?.video_url ?? ""}
          className={inputStyles}
          placeholder="https://..."
        />
      </div>

      {/* Published */}
      <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-200">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={testimonial?.is_published ?? true}
          className="h-4 w-4 rounded border-zinc-800 bg-zinc-900 accent-amber-500 focus:ring-amber-400"
        />

        <span>
          Published
          <span className="ml-2 text-xs text-zinc-500">
            Visible on the public website
          </span>
        </span>
      </label>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brass-700 hover:shadow-md disabled:pointer-events-none disabled:opacity-50"
        >
          {isSaving && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}

          {isSaving ? "Saving…" : testimonial ? "Update Testimonial" : "Save Testimonial"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/testimonials")}
          disabled={isSaving}
          className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
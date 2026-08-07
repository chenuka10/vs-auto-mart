"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial } from "./actions";
import type { Testimonial } from "@/lib/types";

interface TestimonialFormProps {
  testimonial?: Testimonial;
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const [photoUrl, setPhotoUrl] = useState(testimonial?.photo_url ?? "");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSaving(true);
    const input = {
      reviewer_name: formData.get("reviewer_name") as string,
      rating: formData.get("rating") ? Number(formData.get("rating")) : null,
      review_text: (formData.get("review_text") as string) || null,
      photo_url: photoUrl || null,
      video_url: (formData.get("video_url") as string) || null,
      is_published: formData.get("is_published") === "on",
    };

    if (testimonial) {
      await updateTestimonial(testimonial.id, input);
    } else {
      await createTestimonial(input);
    }
    router.push("/admin/testimonials");
  }

  const inputStyles =
    "mt-1 w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors";

  return (
    <form action={handleSubmit} className="mt-6 max-w-xl space-y-5 text-white">
      <div>
        <label className="text-sm font-medium text-zinc-200">Reviewer Name</label>
        <input
          name="reviewer_name"
          defaultValue={testimonial?.reviewer_name}
          required
          className={inputStyles}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-200">Rating (1–5)</label>
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          defaultValue={testimonial?.rating ?? undefined}
          className={inputStyles}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-200">Review Text</label>
        <textarea
          name="review_text"
          rows={4}
          defaultValue={testimonial?.review_text ?? undefined}
          className={inputStyles}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-200">Photo</label>
        <input
          type="text"
          placeholder="Cloudinary URL"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          className={inputStyles}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-zinc-200">Video URL</label>
        <input
          name="video_url"
          defaultValue={testimonial?.video_url ?? undefined}
          className={inputStyles}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-zinc-200 cursor-pointer">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={testimonial?.is_published ?? true}
          className="h-4 w-4 rounded border-zinc-800 bg-zinc-900 accent-amber-500 focus:ring-amber-400"
        />
        Published
      </label>

      <button
        type="submit"
        disabled={isSaving}
        className="rounded-lg bg-brass-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brass-700 disabled:opacity-50 transition-colors"
      >
        {isSaving ? "Saving…" : "Save Testimonial"}
      </button>
    </form>
  );
}
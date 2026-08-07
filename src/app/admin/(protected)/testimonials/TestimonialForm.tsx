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
  // TODO: replace with your existing Cloudinary uploader (the one used
  // on the vehicle image form) — this text input is a placeholder.
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

  return (
    <form action={handleSubmit} className="mt-6 max-w-xl space-y-5">
      <div>
        <label className="text-sm font-medium">Reviewer Name</label>
        <input
          name="reviewer_name"
          defaultValue={testimonial?.reviewer_name}
          required
          className="mt-1 w-full rounded-lg border border-graphite-700/10 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Rating (1–5)</label>
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          defaultValue={testimonial?.rating ?? undefined}
          className="mt-1 w-full rounded-lg border border-graphite-700/10 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Review Text</label>
        <textarea
          name="review_text"
          rows={4}
          defaultValue={testimonial?.review_text ?? undefined}
          className="mt-1 w-full rounded-lg border border-graphite-700/10 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Photo</label>
        <input
          type="text"
          placeholder="Cloudinary URL"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          className="mt-1 w-full rounded-lg border border-graphite-700/10 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Video URL</label>
        <input
          name="video_url"
          defaultValue={testimonial?.video_url ?? undefined}
          className="mt-1 w-full rounded-lg border border-graphite-700/10 px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_published" defaultChecked={testimonial?.is_published ?? true} />
        Published
      </label>

      <button
        type="submit"
        disabled={isSaving}
        className="rounded-lg bg-brass-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brass-700 disabled:opacity-50"
      >
        {isSaving ? "Saving…" : "Save Testimonial"}
      </button>
    </form>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";
import type { CustomerStory } from "@/lib/types";

interface Props {
  story?: CustomerStory;
  onSave: (formData: FormData) => Promise<{ error?: string; success?: boolean } | void>;
}

const inputStyles =
  "mt-1 w-full rounded-plate border border-graphite-700/40 bg-graphite-900 px-3 py-2.5 text-sm text-graphite-100 placeholder:text-graphite-500 transition-colors focus:border-brass-500/60 focus:outline-none focus:ring-1 focus:ring-brass-500/40";

export function CustomerStoryForm({ story, onSave }: Props) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* photo URLs managed by CloudinaryUploader */
  const [photoUrls, setPhotoUrls] = useState<string[]>(
    (story?.customer_story_photos ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((p) => p.image_url)
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    setError(null);

    const rawForm = new FormData(e.currentTarget);
    /* Inject the photo URLs as a hidden newline-joined value */
    rawForm.set("photo_urls", photoUrls.join("\n"));

    try {
      const result = await onSave(rawForm);
      if (result && "error" in result && result.error) {
        setError(result.error);
        setIsSaving(false);
      } else {
        router.push("/admin/customer-stories");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-7 text-graphite-100">

      {/* ── Customer Name ── */}
      <div>
        <label htmlFor="customer_name" className="text-sm font-medium text-graphite-200">
          Customer Name
        </label>
        <p className="mt-0.5 text-xs text-graphite-500">Leave blank to default to &ldquo;Happy Customer&rdquo;</p>
        <input
          id="customer_name"
          name="customer_name"
          type="text"
          defaultValue={story?.customer_name ?? ""}
          placeholder="e.g. Kasun Perera"
          className={inputStyles}
        />
      </div>

      {/* ── Vehicle Label ── */}
      <div>
        <label htmlFor="vehicle_label" className="text-sm font-medium text-graphite-200">
          Vehicle Label
        </label>
        <p className="mt-0.5 text-xs text-graphite-500">What vehicle was delivered? e.g. &quot;2019 Toyota Aqua&quot;</p>
        <input
          id="vehicle_label"
          name="vehicle_label"
          type="text"
          defaultValue={story?.vehicle_label ?? ""}
          placeholder="2019 Toyota Aqua"
          className={inputStyles}
        />
      </div>

      {/* ── Delivery Date ── */}
      <div>
        <label htmlFor="delivery_date" className="text-sm font-medium text-graphite-200">
          Delivery Date
        </label>
        <p className="mt-0.5 text-xs text-graphite-500">Leave blank to default to today</p>
        <input
          id="delivery_date"
          name="delivery_date"
          type="date"
          defaultValue={story?.delivery_date?.slice(0, 10) ?? ""}
          className={inputStyles}
        />
      </div>

      {/* ── Customer Message ── */}
      <div>
        <label htmlFor="message" className="text-sm font-medium text-graphite-200">
          Customer Message
        </label>
        <p className="mt-0.5 text-xs text-graphite-500">Optional short quote from the customer.</p>
        <textarea
          id="message"
          name="message"
          rows={3}
          defaultValue={story?.message ?? ""}
          placeholder="Great service! Very happy with my new car."
          className={`${inputStyles} resize-y`}
        />
      </div>

      {/* ── Delivery Photos ── */}
      <div>
        <label className="text-sm font-medium text-graphite-200">Delivery Photos</label>
        <p className="mt-0.5 text-xs text-graphite-500">
          Upload customer delivery photos. These appear in the public Happy Customers gallery.
          Photos are stored in Cloudinary under the <code className="text-brass-400">testimonials</code> folder.
        </p>
        <div className="mt-3">
          <CloudinaryUploader
            folder="testimonials"
            multiple
            maxFiles={10}
            label="Upload delivery photos"
            mediaType="image"
            initialUrls={photoUrls}
            onChange={setPhotoUrls}
          />
        </div>
        {photoUrls.length > 0 && (
          <p className="mt-2 text-xs text-emerald-400">
            ✓ {photoUrls.length} photo{photoUrls.length !== 1 ? "s" : ""} ready
          </p>
        )}
      </div>

      {/* ── Video URL ── */}
      <div>
        <label htmlFor="video_url" className="text-sm font-medium text-graphite-200">
          Delivery Video URL
        </label>
        <p className="mt-0.5 text-xs text-graphite-500">
          Paste a YouTube or other video link. This shows as a playable card on the Happy Customers page.
        </p>
        <input
          id="video_url"
          name="video_url"
          type="url"
          defaultValue={story?.video_url ?? ""}
          placeholder="https://youtube.com/watch?v=..."
          className={inputStyles}
        />
      </div>

      {/* ── Published ── */}
      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-graphite-700/30 bg-graphite-900/40 px-4 py-3 text-sm text-graphite-200 hover:bg-graphite-900/70 transition-colors">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={story?.is_published ?? true}
          className="h-4 w-4 rounded border-graphite-700 bg-graphite-900 accent-brass-500 focus:ring-brass-400"
        />
        <div>
          <span className="font-medium">Published</span>
          <span className="ml-2 text-xs text-graphite-500">Visible on the public Happy Customers page</span>
        </div>
      </label>

      {/* ── Error ── */}
      {error && (
        <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* ── Actions ── */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-plate bg-brass-500 px-6 py-2.5 text-sm font-semibold text-graphite-950 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brass-400 hover:shadow-md disabled:pointer-events-none disabled:opacity-50"
        >
          {isSaving && (
            <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-graphite-950/40 border-t-graphite-950" />
          )}
          {isSaving ? "Saving…" : story ? "Update Story" : "Save Story"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/customer-stories")}
          disabled={isSaving}
          className="rounded-plate border border-graphite-700/50 px-6 py-2.5 text-sm font-medium text-graphite-300 transition-colors hover:bg-graphite-800 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

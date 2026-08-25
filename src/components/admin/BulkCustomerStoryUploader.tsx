"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCloudinarySignature } from "@/lib/cloudinary/actions";
import { createBulkCustomerStories, type BulkStoryItem } from "@/app/admin/(protected)/customer-stories/actions";

interface UploadingFile {
  id: string;
  file: File;
  previewUrl: string;
  progress: number;
  status: "uploading" | "done" | "error";
  error?: string;
  uploadedUrl?: string;
  customerName: string;
  vehicleLabel: string;
  deliveryDate: string;
  isPublished: boolean;
}

function makeId() {
  return Math.random().toString(36).slice(2);
}

export default function BulkCustomerStoryUploader() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const uploadFile = useCallback(
    async (file: File, itemId: string, sig: Awaited<ReturnType<typeof getCloudinarySignature>>) => {
      const endpoint = `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", sig.apiKey);
      formData.append("timestamp", String(sig.timestamp));
      formData.append("signature", sig.signature);
      formData.append("folder", sig.folder);

      xhr.upload.onprogress = (e) => {
        if (!e.lengthComputable) return;
        const progress = Math.round((e.loaded / e.total) * 100);
        setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, progress } : i)));
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const res = JSON.parse(xhr.responseText) as { secure_url: string };
          setItems((prev) =>
            prev.map((i) =>
              i.id === itemId
                ? { ...i, uploadedUrl: res.secure_url, progress: 100, status: "done" }
                : i
            )
          );
        } else {
          setItems((prev) =>
            prev.map((i) =>
              i.id === itemId ? { ...i, status: "error", error: "Upload failed" } : i
            )
          );
        }
      };

      xhr.onerror = () => {
        setItems((prev) =>
          prev.map((i) =>
            i.id === itemId ? { ...i, status: "error", error: "Network error" } : i
          )
        );
      };

      xhr.open("POST", endpoint);
      xhr.send(formData);
    },
    []
  );

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      setErrorMessage(null);

      const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
      if (files.length === 0) {
        setErrorMessage("Please select valid image files (JPG, PNG, WebP).");
        return;
      }

      let sig: Awaited<ReturnType<typeof getCloudinarySignature>>;
      try {
        sig = await getCloudinarySignature("testimonials");
      } catch (err) {
        console.error(err);
        setErrorMessage("Could not connect to Cloudinary. Check environment settings.");
        return;
      }

      const newItems: UploadingFile[] = files.map((file) => ({
        id: makeId(),
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        status: "uploading",
        customerName: "Happy Customer",
        vehicleLabel: "",
        deliveryDate: today,
        isPublished: true,
      }));

      setItems((prev) => [...prev, ...newItems]);
      newItems.forEach((item) => uploadFile(item.file, item.id, sig));
    },
    [today, uploadFile]
  );

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const updateItemField = (id: string, field: "customerName" | "vehicleLabel" | "deliveryDate" | "isPublished", value: string | boolean) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const handleSaveAll = async () => {
    const readyItems = items.filter((i) => i.status === "done" && i.uploadedUrl);
    if (readyItems.length === 0) {
      setErrorMessage("No uploaded photos ready to save.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload: BulkStoryItem[] = readyItems.map((i) => ({
      image_url: i.uploadedUrl!,
      customer_name: i.customerName.trim() || "Happy Customer",
      vehicle_label: i.vehicleLabel.trim() || undefined,
      delivery_date: i.deliveryDate || today,
      is_published: i.isPublished,
    }));

    try {
      const result = await createBulkCustomerStories(payload);
      if (result?.error) {
        setErrorMessage(result.error);
        setIsSubmitting(false);
      } else {
        router.push("/admin/customer-stories");
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to save stories.");
      setIsSubmitting(false);
    }
  };

  const completedCount = items.filter((i) => i.status === "done").length;
  const isUploadingAny = items.some((i) => i.status === "uploading");

  return (
    <div className="space-y-6">
      {/* ── Drop Zone ── */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
        }}
        role="button"
        tabIndex={0}
        aria-label="Bulk photo upload dropzone"
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          isDragging
            ? "border-brass-400 bg-brass-500/10"
            : "border-graphite-700/40 bg-graphite-900/40 hover:border-brass-500/50 hover:bg-graphite-900/60"
        }`}
      >
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-brass-500/20 bg-graphite-800 text-brass-400">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <p className="text-base font-semibold text-graphite-100">
          Click to browse or Drag & Drop multiple delivery photos
        </p>
        <p className="mt-1 text-xs text-graphite-400">
          Select 10, 20, or up to 50 photos at once. Each photo will create a distinct Happy Customer story.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* ── Error Message ── */}
      {errorMessage && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          {errorMessage}
        </div>
      )}

      {/* ── Uploaded Items List ── */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-graphite-700/20 pb-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-graphite-100">
                Selected Photos ({items.length})
              </h2>
              <p className="text-xs text-graphite-400">
                {completedCount} of {items.length} uploaded to Cloudinary. You can quickly edit details below before saving.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-plate border border-graphite-700/50 bg-graphite-900 px-3.5 py-2 text-xs font-medium text-graphite-200 hover:border-brass-500/40 hover:text-brass-400 transition-colors"
              >
                + Add More Photos
              </button>
              <button
                type="button"
                onClick={() => setItems([])}
                className="rounded-plate border border-graphite-700/30 px-3 py-2 text-xs font-medium text-graphite-400 hover:text-rose-400 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-graphite-700/30 bg-graphite-900/60 p-3.5 transition-all"
              >
                {/* Photo & Upload status */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-graphite-800">
                  {item.previewUrl && (
                    <Image
                      src={item.previewUrl}
                      alt={`Photo ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* Progress overlay */}
                  {item.status === "uploading" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-graphite-950/80 p-4">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-graphite-800">
                        <div
                          className="h-full bg-brass-400 transition-all duration-200"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="mt-2 text-xs font-mono text-brass-400">{item.progress}% Uploading</span>
                    </div>
                  )}

                  {/* Success indicator */}
                  {item.status === "done" && (
                    <div className="absolute top-2 left-2 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold text-graphite-950 shadow">
                      ✓ Ready
                    </div>
                  )}

                  {/* Error indicator */}
                  {item.status === "error" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-rose-900/80 p-2 text-center text-xs text-rose-200">
                      {item.error ?? "Failed"}
                    </div>
                  )}

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-graphite-950/80 text-graphite-300 hover:bg-rose-600 hover:text-white transition-colors"
                    aria-label="Remove photo"
                  >
                    ✕
                  </button>
                </div>

                {/* Quick Inline Fields */}
                <div className="mt-3 space-y-2 text-xs flex-1">
                  <div>
                    <label className="text-[11px] font-medium text-graphite-400">Customer Name</label>
                    <input
                      type="text"
                      value={item.customerName}
                      onChange={(e) => updateItemField(item.id, "customerName", e.target.value)}
                      placeholder="Happy Customer"
                      className="mt-0.5 w-full rounded-lg border border-graphite-700/40 bg-graphite-900 px-2.5 py-1.5 text-xs text-graphite-100 placeholder:text-graphite-500 focus:border-brass-500/50 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-graphite-400">Vehicle Delivered (Optional)</label>
                    <input
                      type="text"
                      value={item.vehicleLabel}
                      onChange={(e) => updateItemField(item.id, "vehicleLabel", e.target.value)}
                      placeholder="e.g. 2019 Toyota Aqua"
                      className="mt-0.5 w-full rounded-lg border border-graphite-700/40 bg-graphite-900 px-2.5 py-1.5 text-xs text-graphite-100 placeholder:text-graphite-500 focus:border-brass-500/50 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <label className="text-[11px] font-medium text-graphite-400 block">Date</label>
                      <input
                        type="date"
                        value={item.deliveryDate}
                        onChange={(e) => updateItemField(item.id, "deliveryDate", e.target.value)}
                        className="mt-0.5 rounded-lg border border-graphite-700/40 bg-graphite-900 px-2 py-1 text-xs text-graphite-200 focus:border-brass-500/50 focus:outline-none"
                      />
                    </div>

                    <label className="flex items-center gap-1.5 cursor-pointer mt-3">
                      <input
                        type="checkbox"
                        checked={item.isPublished}
                        onChange={(e) => updateItemField(item.id, "isPublished", e.target.checked)}
                        className="h-3.5 w-3.5 rounded border-graphite-700 bg-graphite-900 accent-brass-500"
                      />
                      <span className="text-[11px] text-graphite-300">Publish</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom Floating Bar / Submit Button ── */}
          <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-graphite-700/40 bg-graphite-900/90 p-4 shadow-2xl backdrop-blur-xl">
            <div>
              <p className="text-sm font-semibold text-graphite-100">
                {completedCount} of {items.length} Stories Ready to Save
              </p>
              <p className="text-xs text-graphite-400">
                They will instantly appear on the public Happy Customers page.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/admin/customer-stories")}
                className="rounded-plate border border-graphite-700/40 px-5 py-2.5 text-sm font-medium text-graphite-300 hover:bg-graphite-800 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveAll}
                disabled={isSubmitting || isUploadingAny || completedCount === 0}
                className="inline-flex items-center gap-2 rounded-plate bg-brass-500 px-6 py-2.5 text-sm font-semibold text-graphite-950 shadow-md transition-all hover:bg-brass-400 hover:shadow-glow-gold disabled:pointer-events-none disabled:opacity-50"
              >
                {isSubmitting && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-graphite-950/40 border-t-graphite-950" />
                )}
                {isSubmitting
                  ? "Creating Stories…"
                  : isUploadingAny
                  ? "Uploading Photos…"
                  : `Save All ${completedCount} Stories`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

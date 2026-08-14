"use client";

import { useCallback, useId, useRef, useState } from "react";
import { getCloudinarySignature } from "@/lib/cloudinary/actions";

type MediaType = "image" | "video" | "any";

interface UploadItem {
  id: string;
  url: string | null;
  previewUrl: string;
  progress: number;
  status: "uploading" | "done" | "error";
  error?: string;
  isVideo?: boolean;
}

interface CloudinaryUploaderProps {
  /** If set, renders a hidden input with this name holding newline-joined URLs,
   *  so it drops straight into an existing <form action={serverAction}>. */
  name?: string;
  /** Existing image/video URLs to preload (edit mode). */
  initialUrls?: string[];
  /** Fires with the full ordered list of uploaded URLs on every change. */
  onChange?: (urls: string[]) => void;
  /** Cloudinary folder, e.g. "vehicles" or "testimonials". */
  folder: string;
  multiple?: boolean;
  maxFiles?: number;
  label?: string;
  /** "image" (default), "video", or "any" for both */
  mediaType?: MediaType;
  /** Reject files over this size, in MB. Omit for no limit. */
  maxSizeMB?: number;
  /** Restrict to specific MIME types, e.g. ["image/jpeg", "image/png"]. Omit to accept anything matching mediaType. */
  acceptedTypes?: string[];
}

function makeId() {
  return Math.random().toString(36).slice(2);
}

function isVideoUrl(url: string) {
  return /\.(mp4|mov|webm|avi|mkv|m4v)(\?|$)/i.test(url);
}

function acceptString(mediaType: MediaType, acceptedTypes?: string[]) {
  if (acceptedTypes) return acceptedTypes.join(",");
  if (mediaType === "video") return "video/*";
  if (mediaType === "any") return "image/*,video/*";
  return "image/*";
}

export function CloudinaryUploader({
  name,
  initialUrls = [],
  onChange,
  folder,
  multiple = true,
  maxFiles,
  label = "Upload Photos",
  mediaType = "image",
  maxSizeMB,
  acceptedTypes,
}: CloudinaryUploaderProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<UploadItem[]>(() =>
    initialUrls.map((url) => ({
      id: makeId(),
      url,
      previewUrl: url,
      progress: 100,
      status: "done" as const,
      isVideo: isVideoUrl(url),
    }))
  );
  const [isDragging, setIsDragging] = useState(false);

  const emitChange = useCallback(
    (next: UploadItem[]) => {
      const urls = next.filter((i) => i.status === "done" && i.url).map((i) => i.url as string);
      onChange?.(urls);
    },
    [onChange]
  );

  const uploadFile = useCallback(
    (file: File, itemId: string, sig: Awaited<ReturnType<typeof getCloudinarySignature>>) => {
      const isVid = file.type.startsWith("video/");
      const endpoint = isVid
        ? `https://api.cloudinary.com/v1_1/${sig.cloudName}/video/upload`
        : `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`;

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
        setItems((prev) => {
          let next: UploadItem[];
          if (xhr.status >= 200 && xhr.status < 300) {
            const res = JSON.parse(xhr.responseText) as { secure_url: string };
            next = prev.map((i) =>
              i.id === itemId ? { ...i, url: res.secure_url, progress: 100, status: "done" as const } : i
            );
          } else {
            next = prev.map((i) =>
              i.id === itemId ? { ...i, status: "error" as const, error: "Upload failed" } : i
            );
          }
          emitChange(next);
          return next;
        });
      };

      xhr.onerror = () => {
        setItems((prev) => {
          const next = prev.map((i) =>
            i.id === itemId ? { ...i, status: "error" as const, error: "Network error" } : i
          );
          emitChange(next);
          return next;
        });
      };

      xhr.open("POST", endpoint);
      xhr.send(formData);
    },
    [emitChange]
  );

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const allFiles = Array.from(fileList);
      const rejectedItems: UploadItem[] = [];
      let files: File[] = [];

      for (const file of allFiles) {
        // Media-type gate (image/video/any), then explicit acceptedTypes allowlist if provided
        const mediaOk =
          mediaType === "image"
            ? file.type.startsWith("image/")
            : mediaType === "video"
            ? file.type.startsWith("video/")
            : file.type.startsWith("image/") || file.type.startsWith("video/");

        if (!mediaOk) {
          rejectedItems.push({
            id: makeId(),
            url: null,
            previewUrl: "",
            progress: 0,
            status: "error",
            error: `${file.name}: unsupported file type.`,
          });
          continue;
        }

        if (acceptedTypes && !acceptedTypes.includes(file.type)) {
          rejectedItems.push({
            id: makeId(),
            url: null,
            previewUrl: "",
            progress: 0,
            status: "error",
            error: `${file.name}: unsupported file type.`,
          });
          continue;
        }

        if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
          rejectedItems.push({
            id: makeId(),
            url: null,
            previewUrl: "",
            progress: 0,
            status: "error",
            error: `${file.name}: file is larger than ${maxSizeMB}MB.`,
          });
          continue;
        }

        files.push(file);
      }

      if (maxFiles) {
        const remaining = maxFiles - items.filter((i) => i.status !== "error").length;
        const overflow = files.slice(Math.max(0, remaining));
        files = files.slice(0, Math.max(0, remaining));
        if (overflow.length > 0) {
          rejectedItems.push({
            id: makeId(),
            url: null,
            previewUrl: "",
            progress: 0,
            status: "error",
            error: `Only up to ${maxFiles} files are allowed — ${overflow.length} skipped.`,
          });
        }
      }
      if (!multiple) files = files.slice(0, 1);

      if (rejectedItems.length > 0) {
        setItems((prev) => [...prev, ...rejectedItems]);
      }
      if (files.length === 0) return;

      let sig: Awaited<ReturnType<typeof getCloudinarySignature>>;
      try {
        sig = await getCloudinarySignature(folder);
      } catch (err) {
        console.error(err);
        setItems((prev) => [
          ...prev,
          {
            id: makeId(),
            url: null,
            previewUrl: "",
            progress: 0,
            status: "error",
            error: "Could not reach Cloudinary. Check environment configuration.",
          },
        ]);
        return;
      }

      const newItems: UploadItem[] = files.map((file) => ({
        id: makeId(),
        url: null,
        previewUrl: file.type.startsWith("video/") ? "" : URL.createObjectURL(file),
        progress: 0,
        status: "uploading",
        isVideo: file.type.startsWith("video/"),
      }));

      setItems((prev) => (multiple ? [...prev, ...newItems] : newItems));
      files.forEach((file, idx) => uploadFile(file, newItems[idx].id, sig));
    },
    [items, maxFiles, multiple, folder, mediaType, uploadFile, maxSizeMB, acceptedTypes]
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => {
        const target = prev.find((i) => i.id === id);
        if (target?.previewUrl && target.status !== "done") URL.revokeObjectURL(target.previewUrl);
        const next = prev.filter((i) => i.id !== id);
        emitChange(next);
        return next;
      });
    },
    [emitChange]
  );

  const hiddenValue = items
    .filter((i) => i.status === "done" && i.url)
    .map((i) => i.url as string)
    .join("\n");

  const labelHint =
    mediaType === "video"
      ? "Drag & drop, or click to browse videos"
      : mediaType === "any"
      ? "Drag & drop photos or videos"
      : `Drag & drop, or click to browse${multiple ? " (multiple allowed)" : ""}`;

  return (
    <div className="flex flex-col gap-3">
      {name && <input type="hidden" name={name} value={hiddenValue} />}

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
        aria-labelledby={inputId}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-plate border-2 border-dashed px-4 py-8 text-center text-sm transition-colors ${
          isDragging ? "border-amber-500 bg-amber-500/5" : "border-graphite-700/20 hover:border-graphite-700/40"
        }`}
      >
        {/* Upload icon */}
        <svg className="mb-3 h-8 w-8 text-graphite-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          {mediaType === "video" ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          )}
        </svg>

        <span id={inputId} className="font-medium text-graphite-700">
          {label}
        </span>
        <span className="mt-1 text-xs text-graphite-400">{labelHint}</span>
        {maxSizeMB && (
          <span className="mt-0.5 text-xs text-graphite-500">Max {maxSizeMB}MB per file</span>
        )}

        {maxFiles && (
          <span className="mt-1 text-xs text-graphite-500">
            {items.filter((i) => i.status !== "error").length} / {maxFiles} uploaded
          </span>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptString(mediaType, acceptedTypes)}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square overflow-hidden rounded-plate border border-graphite-700/15 bg-graphite-700/5"
            >
              {item.isVideo ? (
                /* Video preview placeholder */
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-graphite-900/60 text-graphite-400">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                  <span className="px-2 text-center text-[10px] leading-tight">
                    {item.status === "done" ? "Video uploaded" : item.status === "uploading" ? "Uploading…" : ""}
                  </span>
                </div>
              ) : item.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.previewUrl} alt="" className="h-full w-full object-cover" />
              ) : null}

              {item.status === "uploading" && (
                <div className="absolute inset-x-0 bottom-0 bg-graphite-950/70 px-2 py-1">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-graphite-700/40">
                    <div className="h-full bg-amber-500 transition-all" style={{ width: `${item.progress}%` }} />
                  </div>
                  <p className="mt-0.5 text-center text-[10px] text-white/60">{item.progress}%</p>
                </div>
              )}

              {item.status === "error" && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-600/90 p-2 text-center text-xs text-white">
                  {item.error ?? "Upload failed"}
                </div>
              )}

              {item.status === "done" && (
                <div className="absolute left-1.5 top-1.5 rounded-full bg-emerald-500 p-0.5">
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-graphite-950/80 text-white hover:bg-red-600"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
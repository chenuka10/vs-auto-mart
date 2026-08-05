"use client";

import Image from "next/image";
import { useTransition } from "react";
import { setCoverImage, deleteVehicleImage } from "@/app/admin/(protected)/actions";
import type { VehicleImage } from "@/lib/types";

export default function PhotoManager({
  vehicleId,
  images,
}: {
  vehicleId: string;
  images: VehicleImage[];
}) {
  const [isPending, startTransition] = useTransition();

  if (images.length === 0) {
    return <p className="text-sm text-graphite-500">No photos yet — add some below.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {images.map((img) => (
        <div key={img.id} className="relative">
          <div
            className={`relative aspect-square overflow-hidden rounded-md border-2 ${
              img.is_cover ? "border-brass-500" : "border-transparent"
            } ${isPending ? "opacity-50" : ""}`}
          >
            <Image src={img.image_url} alt="" fill className="object-cover" />
          </div>

          {img.is_cover ? (
            <span className="mt-1 block text-center text-[11px] font-semibold text-brass-600">
              Cover photo
            </span>
          ) : (
            <button
              type="button"
              disabled={isPending}
              onClick={() => startTransition(() => setCoverImage(vehicleId, img.id))}
              className="mt-1 block w-full text-center text-[11px] font-medium text-graphite-500 hover:text-brass-600"
            >
              Set as cover
            </button>
          )}

          <button
            type="button"
            disabled={isPending}
            onClick={() => startTransition(() => deleteVehicleImage(img.id, vehicleId))}
            className="absolute right-1 top-1 rounded-full bg-graphite-950/70 px-1.5 py-0.5 text-[11px] font-semibold text-white hover:bg-signal-600"
            aria-label="Delete photo"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

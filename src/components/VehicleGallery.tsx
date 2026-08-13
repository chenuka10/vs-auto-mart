"use client";

import { useState } from "react";
import Image from "next/image";

type VehicleImage = {
  id: string;
  image_url: string;
  context?: string | null;
};

type VehicleGalleryProps = {
  images: VehicleImage[];
  vehicleName: string;
};

export default function VehicleGallery({
  images,
  vehicleName,
}: VehicleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-graphite-100 text-graphite-500">
        No photos available
      </div>
    );
  }

  const currentImage = images[currentIndex];

  const previousImage = () => {
    setCurrentIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div>
      {/* Main Image */}
      <div className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-graphite-100">
        <Image
          key={currentImage.id}
          src={currentImage.image_url}
          alt={`${vehicleName} - ${currentImage.context ?? "Vehicle photo"}`}
          fill
          priority={currentIndex === 0}
          className="object-cover transition-opacity duration-300"
          sizes="(min-width: 1024px) 60vw, 100vw"
        />

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Previous button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous vehicle image"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-xl text-white opacity-0 backdrop-blur-sm transition hover:bg-black/75 group-hover:opacity-100"
          >
            ←
          </button>
        )}

        {/* Next button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next vehicle image"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-xl text-white opacity-0 backdrop-blur-sm transition hover:bg-black/75 group-hover:opacity-100"
          >
            →
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 overflow-x-auto pb-1">
          <div className="flex gap-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-md bg-graphite-100 transition ${
                  index === currentIndex
                    ? "ring-2 ring-brass-600 ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={`${vehicleName} thumbnail ${index + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
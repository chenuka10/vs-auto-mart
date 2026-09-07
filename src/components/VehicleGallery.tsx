"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: "50%", y: "50%" });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const thumbsRef = useRef<HTMLDivElement>(null);
  const minSwipeDistance = 45;

  const previousImage = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setMousePos({ x: "50%", y: "50%" });
    setCurrentIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }, [images.length]);

  const nextImage = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    setIsZoomed(false);
    setMousePos({ x: "50%", y: "50%" });
    setCurrentIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsZoomed(false);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      nextImage();
    } else if (distance < -minSwipeDistance) {
      previousImage();
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") previousImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, previousImage]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen]);

  // Keep active thumbnail in view
  useEffect(() => {
    const activeThumb = document.getElementById(`thumb-${currentIndex}`);
    if (activeThumb && thumbsRef.current) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl sm:rounded-[24px] bg-graphite-900/40 border border-brass-500/10 text-graphite-500 text-sm sm:text-base">
        No photos available
      </div>
    );
  }

  const currentImage = images[currentIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lightboxOpen) return;
    // Only enable hover zoom on pointer devices supporting hover
    if (typeof window !== "undefined" && window.matchMedia && !window.matchMedia("(hover: hover)").matches) {
      return;
    }
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setMousePos({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <div className="w-full select-none">
      {/* Main Image */}
      <div
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-[24px] border border-brass-500/20 bg-graphite-900/40 shadow-sm cursor-zoom-in touch-pan-y"
        onClick={() => {
          setIsZoomed(false);
          setLightboxOpen(true);
        }}
        onMouseEnter={() => {
          if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
            setIsZoomed(true);
          }
        }}
        onMouseLeave={() => {
          setIsZoomed(false);
          setMousePos({ x: "50%", y: "50%" });
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: isZoomed ? "scale(1.5)" : "none",
            transformOrigin: isZoomed ? `${mousePos.x} ${mousePos.y}` : "center center",
          }}
        >
          <Image
            key={currentImage.id}
            src={currentImage.image_url}
            alt={`${vehicleName} - ${currentImage.context ?? "Vehicle photo"}`}
            fill
            priority={currentIndex === 0}
            className="object-contain"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </div>

        {/* Liquid-glass highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px bg-gradient-to-r from-transparent via-brass-500/40 to-transparent opacity-60"
        />

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute right-2.5 top-2.5 sm:right-4 sm:top-4 z-20 rounded-full bg-graphite-950/70 border border-brass-500/20 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-brass-400 backdrop-blur-md pointer-events-none">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Previous button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous vehicle image"
            className="absolute left-2 sm:left-4 top-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/70 border border-brass-500/30 text-base sm:text-xl text-brass-400 backdrop-blur-md transition hover:bg-graphite-900 hover:text-white hover:scale-110 active:scale-95 touch-manipulation"
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
            className="absolute right-2 sm:right-4 top-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/70 border border-brass-500/30 text-base sm:text-xl text-brass-400 backdrop-blur-md transition hover:bg-graphite-900 hover:text-white hover:scale-110 active:scale-95 touch-manipulation"
          >
            →
          </button>
        )}

        {/* Fullscreen Hint */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 z-20 rounded-full bg-graphite-950/70 border border-brass-500/20 px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-graphite-300 backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none">
          Tap to Expand
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div
          ref={thumbsRef}
          className="mt-3 sm:mt-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1"
        >
          <div className="flex gap-2 sm:gap-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                id={`thumb-${index}`}
                type="button"
                onClick={() => {
                  setIsZoomed(false);
                  setMousePos({ x: "50%", y: "50%" });
                  setCurrentIndex(index);
                }}
                aria-label={`View image ${index + 1}`}
                className={`relative h-16 w-20 sm:h-20 sm:w-24 shrink-0 overflow-hidden rounded-lg sm:rounded-xl bg-graphite-900/40 border transition-all duration-300 touch-manipulation ${
                  index === currentIndex
                    ? "border-brass-500 shadow-[0_0_15px_rgba(199,158,50,0.3)] scale-[1.02]"
                    : "border-transparent opacity-60 hover:opacity-100 hover:border-brass-500/30"
                }`}
              >
                <Image
                  src={image.image_url}
                  alt={`${vehicleName} thumbnail ${index + 1}`}
                  fill
                  sizes="(min-width: 640px) 96px, 80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${vehicleName} fullscreen gallery`}
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/95 h-[100dvh] w-full overflow-hidden select-none"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Top Bar: Counter & Close Button */}
            <div className="relative z-30 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 shrink-0">
              <div className="font-mono text-xs sm:text-sm tracking-widest text-brass-400">
                {currentIndex + 1} / {images.length}
              </div>

              <button
                type="button"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-graphite-900/80 border border-brass-500/30 text-xl text-graphite-200 hover:text-white hover:bg-graphite-800 transition-colors touch-manipulation active:scale-95"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(false);
                }}
                aria-label="Close fullscreen gallery"
              >
                ✕
              </button>
            </div>

            {/* Center Image Area */}
            <div
              className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center min-h-0 px-2 sm:px-8 py-2"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  key={currentImage.id}
                  src={currentImage.image_url}
                  alt={`${vehicleName} - photo ${currentIndex + 1}`}
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  sizes="100vw"
                  priority
                  quality={95}
                />
              </div>

              {/* Controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous image"
                    className="absolute left-2 sm:left-4 top-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/80 border border-brass-500/30 text-lg sm:text-2xl text-brass-400 backdrop-blur-md transition hover:bg-brass-600 hover:text-white hover:border-brass-400 active:scale-95 touch-manipulation"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-2 sm:right-4 top-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/80 border border-brass-500/30 text-lg sm:text-2xl text-brass-400 backdrop-blur-md transition hover:bg-brass-600 hover:text-white hover:border-brass-400 active:scale-95 touch-manipulation"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Bottom Bar: Title */}
            <div className="relative z-30 flex items-center justify-center px-4 py-3 sm:py-4 shrink-0">
              <div className="font-display text-xs sm:text-sm tracking-wider text-graphite-300 text-center line-clamp-1 max-w-xl">
                {vehicleName}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
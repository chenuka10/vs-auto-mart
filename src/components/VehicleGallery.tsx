"use client";

import { useState, useEffect } from "react";
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

  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
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
      if (e.key === "ArrowRight") {
        setCurrentIndex((current) =>
          current === images.length - 1 ? 0 : current + 1
        );
      }
      if (e.key === "ArrowLeft") {
        setCurrentIndex((current) =>
          current === 0 ? images.length - 1 : current - 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [lightboxOpen]);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl sm:rounded-[24px] bg-graphite-900/40 border border-brass-500/10 text-graphite-500 text-sm sm:text-base">
        No photos available
      </div>
    );
  }

  const currentImage = images[currentIndex];

  const previousImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lightboxOpen) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x: `${x}%`, y: `${y}%` });
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div 
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-[24px] border border-brass-500/20 bg-graphite-900/40 shadow-sm cursor-zoom-in touch-pan-y select-none"
        onClick={() => setLightboxOpen(true)}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="absolute inset-0 transition-transform duration-200 ease-out"
          style={{
            transform: isZoomed ? "scale(1.5)" : "scale(1)",
            transformOrigin: `${mousePos.x} ${mousePos.y}`
          }}
        >
          <Image
            key={currentImage.id}
            src={currentImage.image_url}
            alt={`${vehicleName} - ${currentImage.context ?? "Vehicle photo"}`}
            fill
            priority={currentIndex === 0}
            className="object-contain transition-opacity duration-300"
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
          <div className="absolute right-2.5 top-2.5 sm:right-4 sm:top-4 z-20 rounded-full bg-graphite-950/70 border border-brass-500/20 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-brass-400 backdrop-blur-md">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Previous button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous vehicle image"
            className="absolute left-2 sm:left-4 top-1/2 z-20 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/60 border border-brass-500/20 text-base sm:text-xl text-brass-400 opacity-90 sm:opacity-0 backdrop-blur-md transition hover:bg-graphite-950/90 hover:text-white hover:scale-110 sm:group-hover:opacity-100 touch-manipulation"
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
            className="absolute right-2 sm:right-4 top-1/2 z-20 flex h-8 w-8 sm:h-10 sm:w-10 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/60 border border-brass-500/20 text-base sm:text-xl text-brass-400 opacity-90 sm:opacity-0 backdrop-blur-md transition hover:bg-graphite-950/90 hover:text-white hover:scale-110 sm:group-hover:opacity-100 touch-manipulation"
          >
            →
          </button>
        )}
        
        {/* Fullscreen Hint */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 z-20 rounded-full bg-graphite-950/70 border border-brass-500/20 px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-graphite-300 backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          Tap to Expand
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 sm:mt-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          <div className="flex gap-2 sm:gap-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${vehicleName} fullscreen gallery`}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-graphite-950/95 p-3 sm:p-6 select-none"
            onClick={() => setLightboxOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-graphite-900/70 border border-brass-500/20 text-xl sm:text-2xl text-graphite-200 hover:text-white hover:bg-graphite-800 transition-colors touch-manipulation"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen gallery"
            >
              ✕
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-4 sm:top-8 sm:left-8 font-mono text-xs sm:text-sm tracking-widest text-brass-400">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Lightbox Main Image */}
            <motion.div 
              className="relative w-full h-full max-w-5xl max-h-[72vh] sm:max-h-[82vh] p-1 sm:p-6 md:p-10"
              initial={{ scale: 0.92, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={currentImage.id}
                src={currentImage.image_url}
                alt={`${vehicleName} lightbox`}
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                sizes="100vw"
                quality={95}
              />

              {/* Controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous image"
                    className="absolute left-1 sm:left-4 md:left-6 top-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/70 border border-brass-500/20 text-lg sm:text-2xl text-brass-400 backdrop-blur-md transition hover:bg-brass-600 hover:text-white hover:border-brass-400 touch-manipulation"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-1 sm:right-4 md:right-6 top-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/70 border border-brass-500/20 text-lg sm:text-2xl text-brass-400 backdrop-blur-md transition hover:bg-brass-600 hover:text-white hover:border-brass-400 touch-manipulation"
                  >
                    →
                  </button>
                </>
              )}
            </motion.div>
            
            {/* Title */}
            <div className="absolute bottom-4 sm:bottom-8 font-display text-sm sm:text-base tracking-wider text-graphite-300 text-center px-4 line-clamp-1">
              {vehicleName}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
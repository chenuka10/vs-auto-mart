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
  }, [lightboxOpen]);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-graphite-900/40 border border-brass-500/10 text-graphite-500">
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
    <div>
      {/* Main Image */}
      <div 
        className="group relative aspect-[4/3] overflow-hidden rounded-[24px] border border-brass-500/20 bg-graphite-900/40 shadow-sm cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
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
            className="object-cover transition-opacity duration-300"
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
          <div className="absolute right-4 top-4 rounded-full bg-graphite-950/60 border border-brass-500/20 px-3 py-1.5 text-xs font-medium text-brass-400 backdrop-blur-md">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Previous button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous vehicle image"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/50 border border-brass-500/20 text-xl text-brass-400 opacity-0 backdrop-blur-md transition hover:bg-graphite-950/80 hover:text-white hover:scale-110 group-hover:opacity-100"
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
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/50 border border-brass-500/20 text-xl text-brass-400 opacity-0 backdrop-blur-md transition hover:bg-graphite-950/80 hover:text-white hover:scale-110 group-hover:opacity-100"
          >
            →
          </button>
        )}
        
        {/* Fullscreen Hint */}
        <div className="absolute bottom-4 right-4 rounded-full bg-graphite-950/60 border border-brass-500/20 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase text-graphite-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
          Click to Expand
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-graphite-900/40 border transition-all duration-300 ${
                  index === currentIndex
                    ? "border-brass-500 shadow-[0_0_15px_rgba(199,158,50,0.3)] scale-[1.02]"
                    : "border-transparent opacity-50 hover:opacity-100 hover:border-brass-500/30"
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-graphite-950/90"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-graphite-900/50 border border-brass-500/20 text-2xl text-graphite-300 hover:text-white hover:bg-graphite-800 transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              ×
            </button>

            {/* Counter */}
            <div className="absolute top-8 left-8 font-mono text-sm tracking-widest text-brass-400">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Lightbox Main Image */}
            <motion.div 
              className="relative w-full h-full max-w-6xl max-h-[85vh] p-4 md:p-12"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={currentImage.id}
                src={currentImage.image_url}
                alt={`${vehicleName} lightbox`}
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                sizes="100vw"
                quality={100}
              />

              {/* Controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previousImage}
                    className="absolute left-4 md:left-8 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/50 border border-brass-500/20 text-2xl text-brass-400 backdrop-blur-md transition hover:bg-brass-600 hover:text-white hover:border-brass-400"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-4 md:right-8 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-graphite-950/50 border border-brass-500/20 text-2xl text-brass-400 backdrop-blur-md transition hover:bg-brass-600 hover:text-white hover:border-brass-400"
                  >
                    →
                  </button>
                </>
              )}
            </motion.div>
            
            {/* Title */}
            <div className="absolute bottom-8 font-display text-lg tracking-widest text-graphite-300">
              {vehicleName}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <section className="bg-[#050505] py-20 text-paper">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-[#0D0D0F]"
        >
          <video
            ref={videoRef}
            src="/vs-automart-hero.mp4"
            poster="/hero-poster.jpg"
            controls={isPlaying}
            playsInline
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            className="h-full w-full object-cover"
          />

          {!isPlaying && (
            <button
              onClick={handlePlay}
              aria-label="Play video"
              className="group absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm transition group-hover:scale-105 group-hover:bg-brass-400 group-hover:border-brass-400">
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white group-hover:fill-graphite-950">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
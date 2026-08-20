"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-graphite-950">
      {/* ── 1. TOP-DOWN MONOCHROME STUDIO SPOTLIGHT ── */}
      <motion.div
        className="absolute left-1/2 -top-[20vh] h-[55vh] w-[85vw] max-w-[1100px] -translate-x-1/2 rounded-full bg-white/[0.08] blur-[130px]"
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Spotlight Hotspot Core */}
      <div className="absolute left-1/2 -top-[12vh] h-[30vh] w-[45vw] max-w-[600px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[90px]" />

      {/* ── 2. LEFT FLANK MONOCHROME RIM GLOW ── */}
      <motion.div
        className="absolute -left-[12vw] top-[18vh] h-[80vh] w-[45vw] max-w-[650px] rounded-full bg-white/[0.05] blur-[120px]"
        animate={{
          y: ["-6%", "6%", "-6%"],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── 3. RIGHT FLANK MONOCHROME RIM GLOW ── */}
      <motion.div
        className="absolute -right-[12vw] top-[35vh] h-[80vh] w-[45vw] max-w-[650px] rounded-full bg-white/[0.04] blur-[120px]"
        animate={{
          y: ["6%", "-6%", "6%"],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── 4. LOWER PAGE MONOCHROME ACCENTS ── */}
      <div className="absolute left-[10vw] top-[110vh] h-[60vh] w-[40vw] max-w-[550px] rounded-full bg-white/[0.03] blur-[140px]" />
      <div className="absolute right-[8vw] top-[170vh] h-[60vh] w-[40vw] max-w-[550px] rounded-full bg-white/[0.025] blur-[140px]" />

      {/* ── 5. MICRO-NOISE FILM GRAIN TEXTURE ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}


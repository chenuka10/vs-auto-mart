"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-graphite-950">
      {/* Orb 1 */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-brass-500/10 blur-[100px]"
        animate={{
          x: ["0%", "20%", "-10%", "0%"],
          y: ["0%", "-10%", "20%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          top: "5%",
          left: "15%",
        }}
      />

      {/* Orb 2 */}
      <motion.div
        className="absolute w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-brass-600/10 blur-[100px]"
        animate={{
          x: ["0%", "-20%", "15%", "0%"],
          y: ["0%", "15%", "-20%", "0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          bottom: "10%",
          right: "10%",
        }}
      />

      {/* Noise Texture Overlay for True Glass Feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

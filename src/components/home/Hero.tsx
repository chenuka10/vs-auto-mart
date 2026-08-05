"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-[#050505] text-paper">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 10,
            ease: "easeOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-bg.jpg"
            alt="Premium vehicles showroom"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/20" />
        <div className="absolute inset-0 bg-[#050505]/30" />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-6xl px-6 pb-24 md:px-10 md:pb-28">

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="plate-tag border-brass-400/30 bg-transparent text-brass-400"
        >
          Kadawatha, Sri Lanka
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl"
        >
          Premium Vehicles.
          <br />
          Trusted Journeys.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-6 max-w-md text-graphite-300"
        >
          Discover carefully inspected vehicles with transparent pricing and a
          trusted buying experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <Link
            href="/inventory"
            className="rounded-plate bg-brass-500 px-7 py-3.5 text-sm font-semibold text-graphite-950 transition hover:-translate-y-0.5 hover:bg-brass-400"
          >
            Explore Inventory
          </Link>

          <Link
            href="#location"
            className="rounded-plate border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            Visit Showroom
          </Link>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/30 p-1.5"
        >
          <span className="h-1.5 w-1 rounded-full bg-brass-400" />
        </motion.div>
      </motion.div>

    </section>
  );
}
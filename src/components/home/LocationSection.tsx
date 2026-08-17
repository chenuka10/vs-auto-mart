"use client";

import { motion } from "framer-motion";

const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=VS+Auto+Mart+Kadawatha+Sri+Lanka&output=embed";
const MAP_LINK = "https://maps.app.goo.gl/REPLACE_WITH_SHOWROOM_LINK";
const WHATSAPP_LINK = "https://wa.me/94771234567";

export default function LocationSection() {
  return (
    <section id="location" className="bg-transparent py-12 text-graphite-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-stretch md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative min-h-[320px] overflow-hidden rounded-lg border border-graphite-700/30"
        >
          <iframe
            src={MAP_EMBED_SRC}
            className="absolute inset-0 h-full w-full grayscale-[30%]"
            loading="lazy"
            title="VS Auto Mart showroom location"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-graphite-100 md:text-4xl">
            Visit Our Showroom
          </h2>
          <dl className="mt-8 space-y-6 text-sm">
            <div>
              <dt className="uppercase tracking-wider text-graphite-500">Address</dt>
              <dd className="mt-1 text-graphite-200">VS Auto Mart, Kadawatha, Sri Lanka</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider text-graphite-500">Opening Hours</dt>
              <dd className="mt-1 text-graphite-200">Mon – Sat, 9:00 AM – 6:00 PM</dd>
            </div>
            <div>
              <dt className="uppercase tracking-wider text-graphite-500">Phone</dt>
              <dd className="mt-1 font-mono text-graphite-200">+94 77 250 0320</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-plate bg-brass-500 px-6 py-3 text-sm font-semibold text-graphite-950 transition hover:bg-brass-400"
            >
              Open in Google Maps
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-plate border border-graphite-700/40 px-6 py-3 text-sm font-semibold text-graphite-200 transition hover:bg-graphite-800/50 hover:text-graphite-50"
            >
              Message on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

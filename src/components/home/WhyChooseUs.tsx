"use client";

import { motion } from "framer-motion";

const CREDENTIALS = [
  {
    title: "Verified Vehicles",
    body: "Every listing passes a mechanical and documentation check before it reaches the showroom floor.",
  },
  {
    title: "Transparent Pricing",
    body: "The price you see is the price you pay — no hidden fees, no last-minute add-ons.",
  },
  {
    title: "Complete Documentation",
    body: "Registration, service history, and ownership papers handed over in full, verified in advance.",
  },
  {
    title: "Customer Support",
    body: "Real people, reachable by phone or WhatsApp, before and after the sale.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-transparent py-12 text-graphite-100">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-graphite-100 md:text-4xl">
          Why Choose VS Auto Mart
        </h2>

        <div className="mt-10 divide-y divide-graphite-700/20 border-y border-graphite-700/20">
          {CREDENTIALS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="grid gap-2 py-7 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-baseline sm:gap-8"
            >
              <p className="font-display text-lg font-semibold text-brass-400">
                {item.title}
              </p>
              <p className="text-sm text-graphite-400 sm:max-w-xl">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 1000, suffix: "+", label: "Happy Customers" },
  { value: 1000, suffix: "+", label: "Vehicles Sold" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Verified Vehicles" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-mono text-4xl font-semibold text-graphite-100 md:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export default function TrustStats() {
  return (
    <section className="relative bg-transparent py-12">
      <div className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group rounded-lg border border-graphite-700/20 bg-graphite-900/40 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md transition hover:-translate-y-1 hover:border-brass-400/30 hover:bg-graphite-900/60"
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-sm uppercase tracking-wider text-graphite-400">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

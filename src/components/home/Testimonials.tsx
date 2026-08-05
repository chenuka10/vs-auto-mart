"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { CustomerStory } from "@/lib/types";

export default function Testimonials({ stories }: { stories: CustomerStory[] }) {
  const [index, setIndex] = useState(0);
  if (stories.length === 0) return null;
  const story = stories[index];
  const deliveryPhoto = story.customer_story_photos?.[0]?.image_url;

  return (
    <section className="bg-[#050505] py-20 text-paper">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Customer Delivery Stories
          </h2>
          <Link href="/customers" className="text-sm font-medium text-brass-400 hover:underline">
            View all →
          </Link>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-lg border border-white/10 bg-[#0D0D0F]">
          <AnimatePresence mode="wait">
            <motion.div
              key={story.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-[1fr_1.2fr]"
            >
              <div className="relative aspect-[4/3] md:aspect-auto">
                {deliveryPhoto && (
                  <Image src={deliveryPhoto} alt={story.customer_name} fill className="object-cover" />
                )}
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
                <div className="flex gap-1 font-mono text-brass-400" aria-label={`${story.rating ?? 5} out of 5`}>
                  {"★".repeat(story.rating ?? 5)}
                </div>
                <p className="font-display text-xl leading-relaxed text-graphite-100 md:text-2xl">
                  &ldquo;{story.testimonial}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{story.customer_name}</p>
                  <p className="text-sm text-graphite-500">{story.vehicle_label}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {stories.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {stories.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Show story ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-brass-400" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

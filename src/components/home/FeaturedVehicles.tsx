"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatLKR } from "@/lib/utils";
import type { PublicVehicleWithImages } from "@/lib/types";

export default function FeaturedVehicles({
  vehicles,
}: {
  vehicles: PublicVehicleWithImages[];
}) {
  if (vehicles.length === 0) return null;
  const [spotlight, ...rest] = vehicles;
  const coverImage =
    spotlight.vehicle_images?.find((img) => img.is_cover)?.image_url ??
    spotlight.vehicle_images?.[0]?.image_url;

  return (
    <section className="bg-[#050505] py-20 text-paper">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Featured Vehicle
          </h2>
          <Link href="/inventory" className="text-sm font-medium text-brass-400 hover:underline">
            View all →
          </Link>
        </div>

        {/* Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-10 grid gap-0 overflow-hidden rounded-lg border border-white/10 md:grid-cols-2"
        >
          <div className="group relative aspect-[4/3] overflow-hidden md:aspect-auto">
            {coverImage && (
              <Image
                src={coverImage}
                alt={spotlight.brand}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />
            )}
          </div>
          <div className="flex flex-col justify-center bg-[#0D0D0F] p-8 md:p-12">
            <h3 className="font-display text-2xl font-semibold md:text-3xl">
              {spotlight.brand}
            </h3>
            <p className="mt-3 font-mono text-2xl text-brass-400">
              {formatLKR(spotlight.price)}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-graphite-500">Year</dt>
                <dd className="font-mono text-graphite-200">{spotlight.year}</dd>
              </div>
              <div>
                <dt className="text-graphite-500">Transmission</dt>
                <dd className="font-mono text-graphite-200">{spotlight.transmission}</dd>
              </div>
              <div>
                <dt className="text-graphite-500">Fuel Type</dt>
                <dd className="font-mono text-graphite-200">{spotlight.fuel}</dd>
              </div>
              <div>
                <dt className="text-graphite-500">Mileage</dt>
                <dd className="font-mono text-graphite-200">
                  {spotlight.mileage_km.toLocaleString()} km
                </dd>
              </div>
            </dl>
            <Link
              href={`/cars/${spotlight.slug}`}
              className="mt-8 inline-flex w-fit items-center rounded-plate bg-brass-500 px-6 py-3 text-sm font-semibold text-graphite-950 transition hover:bg-brass-400"
            >
              View Vehicle
            </Link>
          </div>
        </motion.div>

        {/* Swipe rail */}
        {rest.length > 0 && (
          <div className="mt-8 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0">
            {rest.map((vehicle) => {
              const img =
                vehicle.vehicle_images?.find((i) => i.is_cover)?.image_url ??
                vehicle.vehicle_images?.[0]?.image_url;
              return (
                <Link
                  key={vehicle.id}
                  href={`/cars/${vehicle.slug}`}
                  className="group w-[78%] shrink-0 snap-start rounded-lg border border-white/10 bg-[#0D0D0F] sm:w-[45%] lg:w-[31%]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                    {img && (
                      <Image
                        src={img}
                        alt={vehicle.brand}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-medium">{vehicle.brand}</p>
                    <p className="mt-1 font-mono text-brass-400">
                      {formatLKR(vehicle.price)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

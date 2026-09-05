import Image from "next/image";
import Link from "next/link";
import type { PublicVehicleWithImages } from "@/lib/types";
import { formatLKR, formatMileage, sortVehicleImages } from "@/lib/utils";
import StatusBadge from "./StatusBadge";

export default function VehicleCard({ vehicle }: { vehicle: PublicVehicleWithImages }) {
  const cover = sortVehicleImages(vehicle.vehicle_images ?? [])[0]?.image_url ?? "/placeholder-car.jpg";

  return (
    <Link
      href={`/cars/${vehicle.slug}`}
      className="group block overflow-hidden rounded-lg border border-graphite-700/20 bg-graphite-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-graphite-950">
        {/* Blurred Background Layer */}
        <Image
          src={cover}
          alt=""
          fill
          className="object-cover opacity-50 blur-xl scale-110"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
        />
        {/* Foreground Image */}
        <Image
          src={cover}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          fill
          className="object-contain transition duration-300 group-hover:scale-105 z-10"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
        />
        <div className="absolute left-3 top-3 z-20">
          <StatusBadge status={vehicle.status} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-graphite-100 group-hover:text-brass-400 transition-colors">
          {vehicle.brand} {vehicle.model}
        </h3>

        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-plate border border-graphite-700/40 bg-graphite-950 px-2.5 py-1 font-plate text-xs font-medium tracking-wider text-graphite-300">{vehicle.year}</span>
          <span className="inline-flex items-center gap-1 rounded-plate border border-graphite-700/40 bg-graphite-950 px-2.5 py-1 font-plate text-xs font-medium tracking-wider text-graphite-300">{formatMileage(vehicle.mileage_km)}</span>
          <span className="inline-flex items-center gap-1 rounded-plate border border-graphite-700/40 bg-graphite-950 px-2.5 py-1 font-plate text-xs font-medium tracking-wider text-graphite-300 capitalize">{vehicle.fuel}</span>
          <span className="inline-flex items-center gap-1 rounded-plate border border-graphite-700/40 bg-graphite-950 px-2.5 py-1 font-plate text-xs font-medium tracking-wider text-graphite-300 capitalize">{vehicle.transmission}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-graphite-700/20 pt-3">
          <p className="font-display text-lg font-semibold text-brass-400">
            {formatLKR(vehicle.price)}
          </p>
          {vehicle.location && (
            <p className="text-xs text-graphite-500">📍 {vehicle.location}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

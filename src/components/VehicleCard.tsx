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
      className="group block overflow-hidden rounded-lg border border-graphite-700/10 bg-white transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-graphite-100">
        <Image
          src={cover}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={vehicle.status} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-graphite-950">
          {vehicle.brand} {vehicle.model}
        </h3>

        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="plate-tag">{vehicle.year}</span>
          <span className="plate-tag">{formatMileage(vehicle.mileage_km)}</span>
          <span className="plate-tag capitalize">{vehicle.fuel}</span>
          <span className="plate-tag capitalize">{vehicle.transmission}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="font-display text-lg font-semibold text-brass-600">
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
